---
name: error-handling
description: Use this skill for all error handling work in this project. Trigger whenever the user asks to add error handling, fix error states, handle API failures, add loading/error UI, wrap components in error boundaries, handle form errors, handle async errors, or improve resilience in any part of the stack (React frontend, Express backend, Drizzle DB, TanStack Query, Stripe, Firebase, Shopify).
---

# Error Handling Skill

This skill governs all error handling patterns across the PlantRx stack: React frontend, Express backend, TanStack Query, Drizzle ORM, and third-party integrations (Stripe, Firebase, Shopify).

---

## When NOT to Use This Skill

Do not use for:
- Feature development without error changes
- Styling changes
- Refactoring unrelated logic
- Performance optimization

## Guiding Principles
1. **Only validate at system boundaries** — user input, external APIs, webhooks. Trust internal code and framework guarantees.
2. **No speculative error handling** — don't add try/catch for scenarios that can't happen.
3. **Fail loudly in dev, gracefully in prod** — surface full errors during development; show user-safe messages in production.
4. **Never swallow errors silently** — always log or re-throw; empty catch blocks are forbidden.

## Logging Standard
Always prefix logs:
[route]
[service]
[shopify]
[stripe]
[auth]
[query]

Example:
console.error("[shopify:getProducts]", error);

---

## Backend — Express (`server/routes.ts`, `server/*-service.ts`)

### Standard API error response shape

All error responses must use this shape so the frontend can handle them uniformly:

```ts
res.status(statusCode).json({ message: string, code?: string });
```

### HTTP status codes

| Scenario | Status |
|---|---|
| Validation failure (Zod, missing fields) | 400 |
| Unauthenticated | 401 |
| Forbidden (wrong tier, ownership) | 403 |
| Resource not found | 404 |
| Conflict (duplicate, already exists) | 409 |
| Unexpected server error | 500 |

### Try/catch in route handlers

Wrap only the async DB/service call, not the whole handler. Re-throw or respond — never both:

```ts
try {
  const result = await someService.doThing(id);
  res.json(result);
} catch (err) {
  console.error("[route:doThing]", err);
  res.status(500).json({ message: "Internal server error" });
}
```

### Zod validation errors

Validate with `.safeParse()` at the route boundary, return 400 on failure:

```ts
const parsed = schema.safeParse(req.body);
if (!parsed.success) {
  return res.status(400).json({ message: parsed.error.issues[0].message });
}
```

### Drizzle ORM errors

Catch at the service layer, not in routes. Map known DB errors (unique constraint, not found) to meaningful messages before bubbling up:

```ts
// In *-service.ts
try {
  return await db.insert(table).values(data).returning();
} catch (err: any) {
  if (err.code === "23505") throw new Error("Already exists");
  throw err;
}
```

### Firebase Admin errors

Check `err.code` (e.g. `auth/user-not-found`, `auth/id-token-expired`) and map to HTTP 401/403:

```ts
import { FirebaseError } from "firebase-admin";
if (err instanceof FirebaseError) {
  if (err.code === "auth/id-token-expired") return res.status(401).json({ message: "Session expired" });
  if (err.code === "auth/user-not-found") return res.status(401).json({ message: "User not found" });
}
```

### Stripe errors

Check `err.type` and map to user-safe messages:

```ts
import Stripe from "stripe";
if (err instanceof Stripe.errors.StripeError) {
  if (err.type === "card_error") return res.status(400).json({ message: err.message });
  return res.status(500).json({ message: "Payment processing failed" });
}
```

---

## Frontend — TanStack Query (`client/src/`)

### Query error handling

Use `isError` + `error` from `useQuery`. Display a user-safe message, never raw error objects:

```tsx
const { data, isLoading, isError, error } = useQuery({ ... });

if (isError) return <p className="text-red-500">Something went wrong. Please try again.</p>;
```

For mutations, use `onError` callback in `useMutation`:

```tsx
const mutation = useMutation({
  mutationFn: async (data) => apiRequest("POST", "/api/...", data),
  onError: (err: Error) => {
    toast({ title: "Error", description: err.message, variant: "destructive" });
  },
});
```

### Parsing API errors

`apiRequest` from `client/src/lib/queryClient.ts` throws on non-2xx. Parse the JSON body to surface the `message` field:

```ts
// Pattern for handling errors from apiRequest in onError:
const message = err instanceof Error ? err.message : "Something went wrong";
```

### Toast notifications

Use Shadcn `useToast` for all user-facing error feedback:

```tsx
import { useToast } from "@/components/ui/use-toast";
const { toast } = useToast();

toast({ title: "Error", description: message, variant: "destructive" });
```

### Form errors (React Hook Form + Zod)

Use `zodResolver` for schema validation. Display field errors inline using `formState.errors`:

```tsx
<p className="text-sm text-red-500">{errors.fieldName?.message}</p>
```

Never show errors before the user has touched a field — use `touchedFields` or `formState.isSubmitted` guards.

---

## Frontend — Error Boundaries (`client/src/`)

### When to add an Error Boundary

- Wrap each major page section that fetches its own data independently.
- Do **not** wrap every small component — use boundaries at meaningful fault isolation points.

### Minimal Error Boundary pattern

```tsx
import { Component, ReactNode } from "react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <p className="text-red-500">Something went wrong.</p>;
    }
    return this.props.children;
  }
}
```

Place in `client/src/components/ErrorBoundary.tsx` if it doesn't exist.

---

## Frontend — Async / Event Handler Errors

Promise rejections in event handlers are silent by default. Always `.catch()` or use `try/catch` in `async` handlers:

```tsx
// Correct
const handleSubmit = async () => {
  try {
    await mutation.mutateAsync(data);
  } catch {
    // onError in useMutation handles UI feedback — no duplicate toast here
  }
};

// Wrong — unhandled rejection
const handleSubmit = () => { mutation.mutateAsync(data); };
```

---

## Subscription / Auth Gate Errors

When a feature is gated by subscription tier, return 403 with a clear `message`. On the frontend, redirect to the upgrade page or show a modal — don't show a generic error:

```ts
// Backend
if (!hasAccess(user, requiredTier)) {
  return res.status(403).json({ message: "Upgrade required", code: "UPGRADE_REQUIRED" });
}

// Frontend — check code field
if (err.code === "UPGRADE_REQUIRED") navigate("/pricing");
```

Refer to `client/src/lib/authGate.ts` and `SubscriptionContext` for tier logic.

---

## Shopify Storefront API Errors

GraphQL errors come back as `{ errors: [...] }` even on HTTP 200. Always check:

```ts
const result = await shopifyFetch(query, variables);
if (result.errors?.length) {
  throw new Error(result.errors[0].message);
}
```
---

## Checklist Before Finishing

- [ ] Every `async` route handler has a `try/catch`
- [ ] All errors are logged with a `[context]` prefix before responding
- [ ] No empty `catch` blocks
- [ ] All user-visible error messages are safe (no stack traces, no raw DB errors)
- [ ] Mutations use `onError` for toast feedback
- [ ] Forms show inline validation errors via `formState.errors`
- [ ] No duplicate error feedback (don't toast + throw + console.error all at once at the same layer)