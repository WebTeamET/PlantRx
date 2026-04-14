# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start dev server (Express + Vite HMR on port 5000)

# Build & Production
npm run build        # Build client (Vite) + server (esbuild) → dist/
npm run start        # Run production build

# Database
npm run db:push      # Push Drizzle schema changes to PostgreSQL
```

No test runner is configured.

## Architecture

PlantRx is a full-stack wellness/herbology platform with a React SPA frontend and Express REST API backend.

**Stack:**
- **Frontend:** React 18 + Vite, routed with Wouter (not React Router), UI built on Shadcn/ui + Radix UI, styled with Tailwind CSS
- **Backend:** Express.js with a single large `server/routes.ts` (~271KB) containing all API endpoints
- **Database:** PostgreSQL via Drizzle ORM — schema lives in `shared/schema.ts`, shared between client and server
- **Auth:** Express sessions (connect-pg-simple) + Firebase (client auth + admin SDK)
- **Payments:** Stripe + Shopify Storefront API

**Key directories:**
- `client/src/pages/` — 67 route pages, lazy-loaded via `React.lazy()`
- `client/src/components/` — reusable components, with subdirs for `ui/`, `essentialOil/`, `supplement/`, `strips/`, `Category/`
- `client/src/contexts/` — global state: `CartContext`, `SubscriptionContext`, `TranslationContext`, `TextSizeContext`
- `server/` — Express backend; service modules follow `*-service.ts` naming, storage/seeding as `*-storage.ts`
- `shared/schema.ts` — single source of truth for DB schema and Zod validation types (drizzle-zod)

**Path aliases (configured in vite.config.ts and tsconfig.json):**
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

**Data fetching pattern:** TanStack React Query with `queryClient` (5-min stale time). API calls use `apiRequest()` and `getQueryFn()` from `client/src/lib/queryClient.ts`, which include credentials.

**Deployment:** Vercel (vercel.json configured). Client builds to `dist/public/`, server bundles to `dist/index.js` via esbuild ESM format.

## Environment Variables

A `.env` file is required. Key variables:
- `DATABASE_URL` — PostgreSQL connection string
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `VITE_STRIPE_PUBLIC_KEY`
- `OPENAI_API_KEY`, `GEMINI_API_KEY` / `GOOGLE_API_KEY`
- `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, `FIREBASE_ADMIN_PRIVATE_KEY`
- `VITE_FIREBASE_*` — client-side Firebase config
- `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `MAILERLITE_API_KEY`

## Tailwind Theme

Custom color tokens: `gold`, `cream`, `green` (CSS variables). Custom fonts: **Plus Jakarta Sans** (body), **Ltt Recoleta** (headings). Dark mode uses `class` strategy. Use these theme tokens rather than arbitrary Tailwind colors.

## Subscription Tiers

The platform has **Bronze / Silver / Gold** subscription tiers that gate features. Check `SubscriptionContext` and auth gates (`client/src/lib/authGate.ts`) when adding gated functionality.
