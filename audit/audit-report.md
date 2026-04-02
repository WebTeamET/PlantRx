# PlantRx Project Audit Report

**Date:** 2026-04-02  
**Auditor:** Claude Code (claude-sonnet-4-6)  
**Project Root:** `/Users/chetanjograjiya/Chetan/Projects/Github/Crea8ivedev/PlantRx`  
**Scope:** Full-stack security, performance, scalability, code quality, and app flow review

---

## Executive Summary

PlantRx is a feature-rich wellness/herbology platform with significant ambition: AI-powered symptom analysis, Shopify integration, Stripe subscriptions, Firebase auth, community features, and a large remedy database. The codebase shows rapid, iterative growth — many features have been added in quick succession.

**Critical risks that demand immediate attention:**

1. **Plaintext passwords stored and compared in the database** — the login handler at `server/routes.ts:1003` compares `user.password !== password` with no hashing whatsoever.
2. **AI API keys exposed in the browser bundle** — `client/src/utils/aiContentGenerator.ts` uses `dangerouslyAllowBrowser: true` with `VITE_OPENAI_API_KEY` and `VITE_GEMINI_API_KEY`, putting secret keys into the compiled client JavaScript.
3. **Publicly accessible `/api/auth/test-login` endpoint** (routes.ts:1018) that logs in any caller as hardcoded user ID 55 with no credentials required.
4. **Authentication bypass via `userId || 1` pattern** — at least 10 routes fall back to user ID 1 when no session exists, silently exposing user-1's data to unauthenticated callers.
5. **No CSRF protection applied** — the `csrfProtection` middleware exists in `server/enhanced-security.ts` but is never registered in `server/index.ts`.

The overall security posture is **insufficient for a production application handling payment and health data**. The architecture has a solid foundation, but the pace of feature development has outrun security hardening.

---

## Project Structure Overview

```
PlantRx/
├── client/src/
│   ├── pages/          ~67 route pages (lazy-loaded)
│   ├── components/     ~60+ reusable components
│   ├── contexts/       CartContext, SubscriptionContext, TranslationContext, TextSizeContext
│   ├── lib/            queryClient, authGate, shopify, firebase
│   └── utils/          aiContentGenerator (problematic — see Security)
├── server/
│   ├── index.ts        Express app setup, session config, sitemaps (~833 lines)
│   ├── routes.ts       ALL API routes in one file (7,113 lines)
│   ├── storage.ts      Storage interface + MemStorage + HybridStorage (~1,937 lines)
│   ├── database-storage.ts  DatabaseStorage class + seed data (~1,724 lines)
│   ├── middleware/security.ts  Security headers, bot filter
│   ├── firebase-admin.ts
│   ├── shopify-client.ts / shopify-sync.ts
│   ├── mailerlite-service.ts
│   └── 20+ other service/pdf files
├── shared/schema.ts    Drizzle ORM schema + Zod validation (~600 lines)
├── api/index.ts        Vercel serverless entry
└── migrations/         Drizzle migration files
```

**Key observation:** The server-side logic is monolithic. `server/routes.ts` at **7,113 lines** is among the largest single Express route files in any production application. This alone is a maintenance and onboarding liability.

---

## Architecture Analysis

### Strengths

- **Shared schema** (`shared/schema.ts`) as single source of truth for DB + Zod types is excellent practice.
- **Drizzle ORM** with parameterized queries prevents SQL injection in all ORM-generated queries.
- **Stripe webhook signature verification** is correctly implemented in `server/index.ts:167`.
- **Firebase ID token verification** on the server side (`verifyFirebaseIdToken`) is correctly implemented.
- **Lazy-loaded pages** via `React.lazy()` for good initial bundle splitting.
- **TanStack React Query** with 5-minute stale time and credential inclusion is properly configured.
- **Session cookie** is `httpOnly: true` and `secure: true` in production.
- **Static asset** cache headers (`Cache-Control: public, max-age=31536000, immutable`) are correct.
- **Stripe Price IDs** are hardcoded constants rather than user-supplied, preventing tier escalation via API.

### Weaknesses

- **Dual storage layer confusion:** `storage.ts` exports a `HybridStorage` class that internally creates `DatabaseStorage` instances. There are also `MemStorage` and `SimpleStorage` classes throughout the same file. Only `HybridStorage` is used in production, but the other classes are never removed, causing confusion and dead code.
- **Dynamic imports inside route handlers** (e.g., `routes.ts:1989–2036`): `await import('./db')` and `await import('../shared/schema')` are called on every request inside route handlers instead of importing at the top of the file. This defeats module caching optimization and adds latency.
- **Dual authentication systems** (Express sessions + Firebase) are combined ad-hoc. There is no unified auth middleware — every route individually checks `req.session?.userId`, leading to inconsistency.
- **No middleware abstraction** for "require authentication" — the same auth-check pattern (`if (!req.session?.userId) return 401`) is copy-pasted ~40 times.
- **Vercel configuration** (`vercel.json`) rewrites all routes to `/api` with a single serverless function. A 7,113-line `routes.ts` loaded into a single Vercel function will hit cold-start and bundle-size limits rapidly.

---

## Security Audit

### Authentication & Authorization

#### CRITICAL: Plaintext Password Storage and Comparison

**File:** `server/routes.ts`, lines 1000–1005  
**File:** `server/storage.ts`, lines 806, 838 (MemStorage `createCustomer`/`createExpert`)

```typescript
// routes.ts:1003
if (!user || user.password !== password) {
  return res.status(401).json({ message: "Invalid credentials" });
}
```

Passwords are stored in the `users` table in plaintext and compared with direct string equality. A database breach would expose every user's password immediately. There is **zero use of bcrypt, argon2, scrypt, or any hashing** anywhere in the codebase.

**Recommendation:** Immediately integrate `bcrypt` or `argon2`. Hash passwords at registration time; use `bcrypt.compare()` at login. Run a migration to re-hash existing passwords on next login (force password resets for legacy accounts).

#### CRITICAL: Unauthenticated Test Login Endpoint

**File:** `server/routes.ts`, lines 1018–1047

```typescript
app.post("/api/auth/test-login", async (req, res) => {
  const user = await storage.getUserById(55);
  // ... no credentials required, sets session to user 55
```

This endpoint requires no credentials and logs the caller in as user ID 55. It is accessible in production. Any person who discovers this endpoint (trivially, via browser devtools or source) can impersonate user 55 and access all their data.

**Recommendation:** Delete this endpoint entirely. If needed for local development, gate it behind `if (process.env.NODE_ENV !== 'production')`.

#### CRITICAL: Authentication Bypass via `userId || 1`

**File:** `server/routes.ts`, lines 3926, 3969, 3981, 3993, 4719, 4730, 5066, 5148, 5371, 5626

```typescript
const userId = req.session?.userId || 1; // Default user for demo
```

At least 10 routes (workout sessions, workout progress, recent sessions, recommendations, community features, profile update) silently fall back to user ID 1 when no session is present. This means:
- Unauthenticated users can read and **write** data attributed to user 1.
- The `PATCH /api/user/profile` at line 5626 uses `|| 1` fallback, meaning any unauthenticated user can modify user 1's privacy settings.

**Recommendation:** Remove all `|| 1` fallbacks. Return 401 for unauthenticated requests to user-specific endpoints.

#### HIGH: No CSRF Protection

**File:** `server/enhanced-security.ts`, lines 135–150 (CSRF middleware defined but unused)  
**File:** `server/index.ts` (no import of `csrfProtection`)

The `csrfProtection` function exists but is never registered in the Express middleware chain. All state-changing POST/PATCH/DELETE routes that use session cookies are vulnerable to cross-site request forgery attacks.

**Recommendation:** Register `csrfProtection` in `server/index.ts` after session middleware, or adopt a modern approach: use `SameSite: 'strict'` cookie attribute (already in `enhanced-security.ts:131`) but note that `server/index.ts` sessions do NOT set `sameSite`, creating a gap.

#### HIGH: Missing `sameSite` on Session Cookie

**File:** `server/index.ts`, lines 260–279

The session cookie configuration in `server/index.ts` sets `httpOnly` and `secure` but **omits `sameSite`**, leaving the app partially vulnerable to CSRF. The `enhanced-security.ts` has `sameSite: 'strict'` in `sessionConfig`, but that config object is never used — `server/index.ts` uses its own inline configuration.

#### MEDIUM: Expert Status Update Lacks Admin Check

**File:** `server/routes.ts`, lines 1896–1904

```typescript
app.put("/api/experts/:id/status", async (req, res) => {
  const { status } = req.body;
  const expert = await storage.updateExpertStatus(parseInt(req.params.id), status);
```

Any authenticated user (or unauthenticated, per the `|| 1` fallback) can set any expert's status to `approved` or `rejected`. There is no admin role check on this route.

#### MEDIUM: Business Review Without Auth Check

**File:** `server/routes.ts`, lines 1874–1885

The `POST /api/businesses/:id/reviews` route does not check session authentication — any unauthenticated caller can submit reviews attributed to `userId` from the request body.

#### MEDIUM: `GET /api/users/:id` Returns Sensitive User Data

**File:** `server/routes.ts`, lines 1375–1385

Any caller can retrieve any user's record by ID (with password already stripped, but subscription data, health data, location, and other PII is returned). No auth check, no ownership check.

---

### Input Validation & Sanitization

#### HIGH: AI API Keys Exposed in Browser Bundle

**File:** `client/src/utils/aiContentGenerator.ts`, lines 9–22

```typescript
openai = new OpenAI({ 
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true   // <-- explicitly acknowledged as dangerous
});
```

Both `VITE_OPENAI_API_KEY` and `VITE_GEMINI_API_KEY` are Vite public env vars, meaning they are compiled directly into the JavaScript bundle served to all users. Anyone can open DevTools and extract these keys, then use them to make unlimited AI API calls billed to the project owner.

**Recommendation:** Remove all AI API calls from the client. Route all AI requests through the Express backend, which already has the server-side keys properly set as `OPENAI_API_KEY` and `GEMINI_API_KEY`.

#### MEDIUM: No Input Length Limits on Free-Text Fields

Routes accept arbitrary-length text in `content`, `message`, `symptoms`, and other fields. The body parser limit is set to 50MB (`express.json({ limit: "50mb" })`), which is excessive for most endpoints and could allow payload flooding.

**Recommendation:** Set appropriate per-route limits. Most text endpoints need <100KB. Only media upload endpoints need large limits.

#### MEDIUM: Search Parameter Used in LIKE Without Escaping

**File:** `server/routes.ts`, lines 1993–1998  
**File:** `server/database-storage.ts`, line 984

```typescript
like(remedies.name, `%${search}%`)
```

While Drizzle ORM parameterizes the value, the `%` and `_` wildcard characters within `search` itself are not escaped. A user searching for `%` will match all records. A search for `%_` creates an expensive full-table scan. This is not SQL injection but is a ReDoS/DoS concern.

---

### API Security

#### HIGH: No Rate Limiting on Any Endpoint

There is no rate limiting anywhere. The following expensive endpoints are fully open:
- `POST /api/ai/symptom-finder` — calls OpenAI/Gemini on every request
- `POST /api/ai/generate-remedy` — calls GPT-4o on every request
- `POST /api/auth/login` — no brute-force protection
- `POST /api/auth/register` — unlimited account creation

**Recommendation:** Add `express-rate-limit` middleware. Apply strict limits (e.g., 5/min) to auth endpoints, and per-user limits on AI endpoints.

#### MEDIUM: Stack Traces Exposed in Error Responses

**File:** `server/routes.ts`, line 6890

```typescript
const errorPayload = { 
  error: "PDF generation failed", 
  message: e.message, 
  stack: e.stack  // Full stack trace returned to client
};
res.status(500).json(errorPayload);
```

Stack traces expose internal file paths and library versions. This is repeated in multiple places.

**Recommendation:** Log full stack traces server-side only. Return generic error messages to clients in production.

#### LOW: Robots.txt Discloses Sensitive Path Structure

**File:** `server/index.ts`, lines 609–660

The robots.txt disallows `/api/admin/`, `/api/auth/`, `/dashboard/`, `/settings/`, etc. While robots.txt is not a security control, explicitly listing these paths tells attackers exactly where to probe.

---

### Secrets Management

#### CRITICAL: AI API Keys in Browser Bundle

(Covered above under Input Validation)

#### HIGH: Session Secret Fallback to Hardcoded String

**File:** `server/enhanced-security.ts`, line 124

```typescript
secret: process.env.SESSION_SECRET || 'plantrx-dev-secret-key-change-in-production',
```

Note: `server/index.ts` generates a random secret with `require('crypto').randomBytes(32)` as fallback, which is better. However, since `enhanced-security.ts:sessionConfig` is never used (the inline config in `index.ts` is used), the hardcoded fallback in `enhanced-security.ts` is dead code — but represents poor practice if that file is ever reactivated.

#### MEDIUM: Firebase User Placeholder Password

**File:** `server/routes.ts`, line 1089

```typescript
password: 'firebase-auth', // Placeholder for Firebase users
```

Firebase users are stored with the literal string `'firebase-auth'` as their password. While Firebase users authenticate via Firebase (not password), this means anyone who discovers this string can log in as any Firebase user via the `/api/auth/login` endpoint.

---

### OWASP Top 10 Checklist

| # | Category | Status | Notes |
|---|----------|--------|-------|
| A01 | Broken Access Control | **FAIL** | userId||1 bypass, missing admin checks, unauthenticated user data exposure |
| A02 | Cryptographic Failures | **FAIL** | Plaintext passwords, AI keys in browser bundle |
| A03 | Injection | PASS | Drizzle ORM parameterizes queries; no raw SQL with user input |
| A04 | Insecure Design | **WARN** | Test login endpoint, placeholder 'firebase-auth' password |
| A05 | Security Misconfiguration | **WARN** | CSRF disabled, no `sameSite`, 50MB body limit, stack traces exposed |
| A06 | Vulnerable Components | **WARN** | No automated dependency scanning; `puppeteer` and several heavy deps present |
| A07 | Auth & Identity Failures | **FAIL** | No password hashing, no rate limiting on login, test endpoint |
| A08 | Software & Data Integrity | PASS | Stripe webhook signature verified; Firebase token verified |
| A09 | Logging & Monitoring | **WARN** | Verbose logging (session data logged in plain), no structured/centralized logging |
| A10 | SSRF | PASS | No obvious server-side URL fetching from user input |

---

## Performance Analysis

### Frontend Performance

#### Positive
- React.lazy() code splitting on all 67 pages is correctly implemented.
- 5-minute stale time in React Query prevents unnecessary refetches.
- Static asset immutable cache headers are correctly configured.
- `web-vitals` package is included for monitoring.

#### Concerns

**MEDIUM: No Bundle Size Analysis in CI**  
`rollup-plugin-visualizer` is installed but there is no automated check on bundle size. With 20+ Radix UI components, Three.js, Framer Motion, Swiper, jsPDF, PDFKit, Puppeteer types, and multiple AI SDKs, the bundle is almost certainly large.

**MEDIUM: Duplicate Dynamic Imports Inside Route Handlers**  
`routes.ts` repeatedly executes `await import('./db')` and `await import('../shared/schema')` inside individual route handlers (lines 1989, 2001, 2028, 2056, etc.). While Node.js caches ESM modules after first import, the `await import()` call itself adds overhead on the hot path and makes the intent unclear. These should all be static imports at the top of the file.

**LOW: Three.js and Puppeteer in Production Bundle**  
`three` (3D graphics) and `puppeteer` (headless Chrome) are in `dependencies`, not `devDependencies`. Puppeteer downloads a full Chrome binary (~170MB). This significantly increases cold-start time on Vercel serverless. Puppeteer should be lazily imported and only used server-side in PDF generation.

**LOW: Missing React.memo / useMemo on Heavy Components**  
Community feed, remedy lists, and health dashboard components re-render frequently. No evidence of memoization strategies in key components.

### Backend Performance

**HIGH: N+1 Query Pattern in Review Fetching**  
**File:** `server/routes.ts`, lines 3185–3193

```typescript
const reviewsWithUsernames = await Promise.all(
  filteredReviews.map(async (review) => {
    const user = await storage.getUserById(review.userId); // One DB query per review
    return { ...review, username: user?.username || 'Anonymous User' };
  })
);
```

For a remedy with 50 reviews, this issues 50 sequential DB queries. Use a single JOIN query instead.

**MEDIUM: Full Table Scans on Popular Endpoints**  
`GET /api/remedies` with no query string fetches all active remedies with no pagination. As the remedy count grows, this will become expensive. No `LIMIT`/`OFFSET` is applied.

**MEDIUM: `searchRemedies` Uses `LIKE '%query%'` Without Index**  
**File:** `server/database-storage.ts`, line 984

A leading wildcard `LIKE '%query%'` cannot use a B-tree index. For a growing database, this requires a full table scan on every search. Consider PostgreSQL full-text search (`tsvector`/`tsquery`) or a search service (Algolia, Meilisearch).

**LOW: AI Search Sends Full Remedy Corpus to OpenAI**  
**File:** `server/routes.ts`, lines 2748–2758

```typescript
const prompt = `
  Analyze this health concern: "${query}"
  Available remedies: ${JSON.stringify(allRemedies.map(r => ...))}
```

All remedies are serialized and sent to OpenAI on every search. This is expensive in tokens and adds latency. With 133+ remedies (and growing), this prompt will regularly exceed context limits.

### Database Performance

**MEDIUM: No Database Indexes Defined**  
`shared/schema.ts` defines no explicit indexes beyond primary keys and the `unique()` constraints on `username`, `email`, and `slug`. High-frequency queries on `userId`, `remedyId`, `category`, `isActive`, and `createdAt` columns have no index support.

**LOW: Health Dashboard Parallel Queries Not Fully Optimized**  
The dashboard endpoint uses `Promise.all()` which is good, but some sub-queries themselves contain nested `Promise.all()` calls that could be collapsed into single JOIN queries.

---

## Scalability Assessment

### Current Architecture Limits

1. **Single Vercel Serverless Function:** `vercel.json` routes everything to `/api` (mapped to `api/index.ts`). A 7,113-line routes file loaded into one function creates a large cold-start payload. Vercel functions have a 50MB compressed bundle limit; with Puppeteer, this may already be at risk.

2. **Single PostgreSQL Pool, No Read Replicas:** All reads and writes go to one pool. As traffic grows, read-heavy endpoints (remedy browsing, search) will contend with write-heavy operations (community posts, logging).

3. **Synchronous AI Calls in Request/Response Cycle:** All AI calls (OpenAI, Gemini) are awaited synchronously. A slow AI response (3–30 seconds) holds the HTTP connection open and blocks the Node.js event loop thread. This will time out under load.

4. **No Caching Layer (Redis/Memcached):** Frequently accessed, rarely changing data (featured remedies, remedy categories, expert lists) is fetched from the database on every request. A Redis cache could serve these in microseconds.

5. **Remedy Sitemap is Hardcoded:** `server/index.ts` line 347 contains a hardcoded list of remedy slugs for the sitemap. Adding new remedies requires a code deployment to update the sitemap.

6. **No Job Queue for Background Work:** PDF generation, email notifications, and AI content generation all run synchronously in the request cycle. These should be offloaded to a job queue (Bull, BullMQ) to prevent timeouts and improve throughput.

### Scalability Recommendations

- Split `routes.ts` into domain-specific router files (`auth.router.ts`, `remedies.router.ts`, `community.router.ts`, etc.) and compose them in `index.ts`.
- Add Redis for session store (replace `connect-pg-simple`) and API response caching.
- Move AI generation and PDF creation to background jobs.
- Add database indexes on foreign keys and filter columns.
- Generate sitemaps dynamically from the database, or cache them periodically.

---

## Code Quality & Maintainability

### Technical Debt

1. **`server/routes.ts` (7,113 lines):** This is the single greatest maintainability risk. Adding a feature requires scrolling thousands of lines to find the right location. Debugging requires understanding the full middleware chain in one file. The file has no consistent section ordering — Stripe checkout (line 5661), health plans (line 4005), community features (line 4300), and Shopify (line 6900) are interleaved without logical grouping.

2. **Multiple Overlapping Storage Implementations:** `storage.ts` contains `MemStorage` (in-memory, ~800 lines), `SimpleStorage`, `HybridStorage`, and `DatabaseStorage` — all in different files. It is not clear from the code which is used in what context (though `HybridStorage` is exported as `storage`). The others are dead weight.

3. **Commented-Out Code:** `vite.config.ts` has 23 lines of commented-out config. `server/db.ts` has 18 lines of commented-out code. This should be removed; version control provides history.

4. **Unused `enhanced-security.ts`:** The file defines session config, CSRF middleware, and other security utilities that are never imported or used. It creates a false sense that these protections are active.

5. **PDF Generation Proliferation:** The server directory contains 10+ PDF-related files: `advanced-pdf-generator.ts`, `ai-pdf-generator.ts`, `comprehensive-pdf-generator.ts`, `comprehensive-pdf-system.ts`, `premium-pdf-generator.ts`, `simple-pdf-generator.ts`, `specialized-pdf-generator.ts`, `working-pdf-generator.ts`. Only one is used. The others represent abandoned iterations that should be deleted.

6. **Multiple Seed Files:** `comment-seed.ts`, `comment-seeding.ts`, `seed-additional-content-translations.ts`, `seed-comprehensive-translations.ts`, `seed-content-translations.ts`, `translation-seeding.ts` all appear to do overlapping work. Seeding logic should be consolidated.

### Anti-patterns

- **God Route File:** `routes.ts` violates Single Responsibility Principle.
- **`any` Type Abuse:** `const updateData: any = {}` (routes.ts:1331) and similar patterns throughout disable TypeScript's benefits in critical data paths.
- **Magic User ID (1):** Hardcoded user ID `1` as fallback is a magic constant with dangerous production implications.
- **Sync imports inside async handlers:** `await import('./db')` inside route handlers.
- **`console.log(req.session)` in production:** routes.ts:1189 logs the full session object including `userId` — PII in logs.

### Dead Code / Unused Dependencies

- `passport` and `passport-local` are in `dependencies` but there is no Passport.js configuration or usage in the codebase.
- `openid-client` is installed but not used (Firebase handles OIDC).
- `memorystore` is installed but `connect-pg-simple` is used for sessions.
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-runtime-error-modal` are Replit-specific dev plugins present in `vite.config.ts` imports but are not in the current vite config (they were in the commented-out version).
- `yargs` is a CLI argument parser — unclear what it's used for in this web app.
- 8+ abandoned PDF generator files in `server/`.

---

## App Flow Analysis

### User Registration & Login

1. **Registration (email/password):** `POST /api/auth/register` → validates with `insertUserSchema` → checks for duplicate email/username → calls `storage.createUser()` → stores **plaintext** password → returns user object (with `password: undefined`).
2. **Registration (Firebase):** Firebase client SDK handles auth → client calls `POST /api/auth/firebase-sync` with Bearer token → server verifies token → creates/updates user with `password: 'firebase-auth'` → sets Express session.
3. **Login (email/password):** `POST /api/auth/login` → fetches user by email → compares `user.password !== password` (plaintext) → sets session.
4. **Login (test):** `POST /api/auth/test-login` → always logs in as user ID 55 — **should not exist**.

**Flow Issue:** Two parallel registration/auth paths (email+password and Firebase) result in users potentially having both a `password` row and Firebase credentials. The `firebase-sync` endpoint can create a new user without checking for a matching email+password account, potentially creating duplicate users with the same email if Firebase auth uses a different email casing.

### Subscription Flow

1. User visits `/pricing` → selects tier → `POST /api/subscription/checkout` → server creates Stripe Checkout session → user redirected to Stripe.
2. Payment completes → Stripe sends `checkout.session.completed` webhook → `server/index.ts` handles it → `storage.updateUser()` sets `subscriptionTier`, `subscriptionStatus`, `stripeSubscriptionId`, `hasEverPaidSubscription: true`.
3. On frontend, `SubscriptionContext` bootstraps from localStorage, then re-validates with `GET /api/user/me` which computes effective tier (accounting for 24h trial).

**Flow Issue:** The subscription context reads from localStorage first (fast paint), then overwrites with the backend response. If localStorage is stale (e.g., subscription expired), the UI briefly shows wrong tier. The `isLoading` state should prevent feature-gated actions during this window, but only if consuming components check it.

### Cart & Shopping Flow

1. `CartContext` creates a Shopify cart on mount via Shopify Storefront API.
2. Cart ID is persisted in `localStorage` as `shopify_cart_id`.
3. Cart operations (add, update, remove) call the Shopify Storefront API directly from the client.
4. Checkout redirects to Shopify's hosted checkout page.

**Flow Issue:** Cart operations go directly from the browser to Shopify Storefront API — this is intentional and correct for Shopify's architecture. However, if the Storefront token is exposed in the client bundle, malicious actors could use it to enumerate products and create carts programmatically. Storefront tokens have limited permissions by design, so risk is low.

### AI Health Chat Flow

1. User types symptom → `POST /api/ai/health-chat` with messages array.
2. Server calls `generateIntelligentHealthAdvice()` — which is entirely hardcoded pattern-matching (no actual AI call for this endpoint).
3. Simultaneously calls `getHealthAdvice()` which falls through to `generateIntelligentHealthAdvice()` again.
4. Result is returned as markdown text.

**Flow Issue:** The AI health chat endpoint (`/api/ai/health-chat`) does not actually call any AI API. The comment at line 2882 reads `// AI health advice disabled for performance`. The `advice` variable is set to a static string and then ignored. The function `getHealthAdvice()` is called but also returns hardcoded responses. Users believe they are receiving AI-powered responses but are getting static pattern-matched text. This is potentially misleading.

---

## Critical Issues (Prioritized)

### Critical

| # | Issue | File | Lines | Impact |
|---|-------|------|-------|--------|
| C1 | Plaintext password storage and comparison | `server/routes.ts`, `server/storage.ts` | 1003, 806, 838 | Full credential exposure on DB breach |
| C2 | Unauthenticated test-login endpoint in production | `server/routes.ts` | 1018–1047 | Account takeover of user 55 |
| C3 | AI API keys exposed in browser JavaScript bundle | `client/src/utils/aiContentGenerator.ts` | 9–22 | Unlimited API spend by any user |
| C4 | Auth bypass via `userId || 1` on mutation routes | `server/routes.ts` | 3926, 5066, 5148, 5626, etc. | Unauthenticated data write to user 1 |

### High

| # | Issue | File | Lines | Impact |
|---|-------|------|-------|--------|
| H1 | No rate limiting on login, register, AI endpoints | `server/routes.ts` | All | Brute force, account enumeration, AI cost abuse |
| H2 | No CSRF protection despite middleware being defined | `server/enhanced-security.ts` | 136 | CSRF attacks on all state-changing actions |
| H3 | Missing `sameSite` on session cookie | `server/index.ts` | 260–279 | Partial CSRF exposure |
| H4 | Expert status update has no admin check | `server/routes.ts` | 1896–1904 | Any user can approve/reject experts |
| H5 | N+1 query pattern fetching usernames for reviews | `server/routes.ts` | 3185–3193 | DB overload at scale |
| H6 | Business review endpoint has no auth check | `server/routes.ts` | 1874–1885 | Spam/fake reviews by unauthenticated users |

### Medium

| # | Issue | File | Lines | Impact |
|---|-------|------|-------|--------|
| M1 | Firebase users stored with `password: 'firebase-auth'` | `server/routes.ts` | 1089 | Password login as any Firebase user |
| M2 | Stack traces returned in error responses | `server/routes.ts` | 6890 | Information disclosure to attackers |
| M3 | `GET /api/users/:id` returns PII without auth | `server/routes.ts` | 1375–1385 | User data enumeration |
| M4 | `console.log(req.session)` logging session data | `server/routes.ts` | 1189 | PII in server logs |
| M5 | Full remedy corpus sent to OpenAI on each search | `server/routes.ts` | 2748 | High token cost, context overflow |
| M6 | No pagination on `GET /api/remedies` | `server/routes.ts` | 1983 | Memory exhaustion as data grows |
| M7 | Dynamic `import()` inside route handlers | `server/routes.ts` | 1989, 2001, 2028 | Extra overhead per request |
| M8 | No DB indexes beyond PKs and unique constraints | `shared/schema.ts` | All tables | Query performance degradation |
| M9 | 50MB JSON body limit applied globally | `server/index.ts` | 249 | DoS potential via large payloads |

### Low

| # | Issue | File | Lines | Impact |
|---|-------|------|-------|--------|
| L1 | Hardcoded sitemap slug list | `server/index.ts` | 347–528 | Sitemap goes stale with new remedies |
| L2 | `passport` / `openid-client` / `memorystore` unused deps | `package.json` | — | Bundle bloat, supply chain surface |
| L3 | 8+ abandoned PDF generator files | `server/` | — | Maintenance confusion |
| L4 | Commented-out code in `vite.config.ts`, `db.ts` | Multiple | — | Code clarity |
| L5 | AI health chat is hardcoded pattern matching | `server/routes.ts` | 2882–2883 | Misleading UX, not a security risk |

---

## Recommendations & Improvements

### Immediate (Fix Before Any Production Traffic)

1. **Hash passwords with bcrypt/argon2.**  
   Install `bcrypt`. Hash in `createUser`, `createCustomer`, `createExpert`. Compare with `bcrypt.compare()` in login. Force password resets for existing users.

2. **Delete `/api/auth/test-login`.**  
   No exceptions. Use proper test user seeding in dev environments only.

3. **Remove AI API calls from client.**  
   Delete `client/src/utils/aiContentGenerator.ts` or move all its calls to server-side endpoints. Remove `VITE_OPENAI_API_KEY` and `VITE_GEMINI_API_KEY` from Vite public env.

4. **Replace all `userId || 1` with proper 401 responses.**  
   Audit every occurrence (grep: `req.session?.userId || 1`) and return `401` instead.

5. **Add rate limiting.**  
   ```bash
   npm install express-rate-limit
   ```
   Apply 5 req/min to `/api/auth/login`, `/api/auth/register`. Apply 10 req/min per IP to all AI endpoints.

### Short-term (Within 2 Weeks)

6. **Activate CSRF protection** or ensure `SameSite: 'strict'` is set on the actual session cookie in `server/index.ts`.

7. **Add admin role check** to `PUT /api/experts/:id/status`.

8. **Add auth check** to `POST /api/businesses/:id/reviews` and `GET /api/users/:id`.

9. **Change Firebase user placeholder password** from `'firebase-auth'` to a long random string (`crypto.randomBytes(32).toString('hex')`) so it cannot be used for password login.

10. **Fix N+1 review query** — use a single JOIN to fetch usernames with reviews.

11. **Add pagination** to `GET /api/remedies` and other listing endpoints.

### Medium-term (Within 1 Month)

12. **Split `server/routes.ts`** into domain routers: `auth.router.ts`, `remedies.router.ts`, `community.router.ts`, `subscriptions.router.ts`, `ai.router.ts`, `shopify.router.ts`.

13. **Create a reusable auth middleware:**
    ```typescript
    export function requireAuth(req, res, next) {
      if (!req.session?.userId) return res.status(401).json({ message: "Auth required" });
      next();
    }
    ```

14. **Add database indexes** on: `users.email`, `remedies.category`, `remedies.isActive`, `savedRemedies.userId`, `chatSessions.userId`, `communityPosts.authorId`, `orders.userId`.

15. **Generate sitemap dynamically** from the database. Cache the XML for 1 hour in Redis or on disk.

16. **Replace AI pattern-matching with real AI** in the health chat endpoint, or clearly label responses as "suggested guidance" not AI analysis.

17. **Remove dead code** — delete 7+ unused PDF generators, unused storage classes, `passport`, `openid-client`, `memorystore` packages.

18. **Move Puppeteer PDF generation to background jobs** using BullMQ with Redis.

### Long-term (Within 3 Months)

19. **Add Redis** for session storage and API response caching.

20. **Implement full-text search** via PostgreSQL `tsvector` for remedy and community searches.

21. **Add structured logging** (Pino or Winston) with log levels; remove `console.log(req.session)`.

22. **Add automated dependency scanning** (Snyk or GitHub Dependabot alerts).

23. **Add comprehensive TypeScript types** — eliminate `any` in route handlers, particularly `updateData: any`.

24. **Add integration tests** — no test runner is configured. At minimum, add auth flow tests and payment webhook tests.

---

## Conclusion

PlantRx has strong product vision and a solid foundational architecture: Drizzle ORM with a shared schema, React Query with proper caching, Firebase server-side token verification, and correctly implemented Stripe webhook signature checks demonstrate real architectural competence.

However, the speed of feature development has created severe technical debt and several critical security vulnerabilities. **The combination of plaintext password storage, a test login backdoor, and AI API keys in the browser bundle represents unacceptable risk for a platform that handles health data and payments.**

The most urgent priority is addressing the Critical and High severity issues before exposing the platform to additional users. These can be fixed in hours to days — the required changes are well-understood and the codebase is sufficiently clean that the fixes are straightforward to implement.

The longer-term architectural work — splitting the 7,113-line routes file, removing dead code, adding indexes, and adding background job processing — will dramatically improve maintainability and prepare the platform for scale.

**Overall Risk Rating: HIGH**  
**Recommended Action: Address Critical issues before production launch; schedule High/Medium remediations for next sprint.**
