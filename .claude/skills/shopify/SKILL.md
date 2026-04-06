---
name: shopify-integration
description: Use this skill for all Shopify-related work including metafields, GraphQL queries, product sections, cart logic, schema discovery, and API integration. Trigger whenever the user asks to add metafields, build product sections, modify Shopify queries, wire up cart functionality, map Shopify data, update TypeScript types for Shopify, or consume Shopify data in React components. Also use when working with server/shopify-client.ts, server/routes.ts, CartContext, or any Shopify Storefront API integration.
---

========== SHOPIFY INTEGRATION RULES ==========

This skill governs all Shopify-related work in PlantRx: adding new metafields, building product sections, modifying queries, or wiring up cart logic. Follow every rule in this file exactly.

========== ACCOUNT GOVERNANCE RULES (CRITICAL) ==========

1. DO NOT make any changes to the Shopify Admin account, including but not limited to:
  - Creating or modifying metafields
  - Creating or modifying metaobjects
  - Changing product data
  - Editing variants
  - Modifying theme settings
  - Changing store configuration
  - Adding apps
  - Editing Shopify settings
2. The integration layer is READ-ONLY by default unless explicitly instructed otherwise.
3. If any Shopify Admin change is required (example: new metafield definition, metaobject schema change, file upload, product configuration change), you MUST:
  - Clearly explain what change is needed
  - Explain why it is required
  - Wait for the developer to make the change manually
4. Never assume permission to modify store structure.
5. If a requested feature cannot be implemented without Shopify Admin changes:
  - Stop implementation
  - Document the required change
  - Continue only after confirmation
6. Any required Shopify configuration must be provided in this format:

Example:
  Required Shopify Change:
  Create metafield, Metaobject

Never attempt workarounds that bypass proper Shopify data modeling.

========== SECURITY RULES ==========

1. NEVER expose Shopify credentials on the client side. The following env vars must only exist server-side and must never be referenced in any file under client/:
  - SHOPIFY_STORE_DOMAIN
  - SHOPIFY_STOREFRONT_ACCESS_TOKEN
2. ALL Shopify Storefront API calls must go through the Express server (server/shopify-client.ts or server/routes.ts). The client MUST only talk to internal /api/shopify/* endpoints — never directly to:
https://{store}.myshopify.com
3. When adding a new API route for Shopify data in server/routes.ts, always validate and sanitize path parameters (example: handle, cartId, lineItemId) before passing them to Shopify.
Use:
  - validation
  - sanitization
  - encodeURIComponent on client URLs
4. Cart IDs are opaque Shopify tokens. Treat them as sensitive:
  - Never log full cart IDs
  - Never expose full tokens in responses
  - Mask when debugging
5. Never hardcode Shopify API versions in new files.
Use the existing version:
2024-01

If upgrading:
Update in ONE place only:
server/shopify-client.ts

========== MCP-DRIVEN SCHEMA DISCOVERY ==========

1) Before adding any new metafield query, ALWAYS use the Shopify Dev MCP to introspect the live schema first:
   - Use `mcp__shopify-dev-mcp__introspect_graphql_schema` to verify the type, namespace, and key exist.
   - Use `mcp__shopify-dev-mcp__learn_shopify_api` to understand the metafield type system (e.g., `metaobject_reference`, `list.file_reference`, `rich_text`, `json`).
   - Use `mcp__shopify-dev-mcp__search_docs_chunks` if you need to understand how nested Metaobject fields resolve.

2) When a metafield has type `metaobject_reference` or `list.metaobject_reference`, you MUST resolve its fields inline in the GraphQL query using the `Metaobject` fragment pattern. Never leave them as bare `value` strings.

3) When a metafield has type `file_reference` or `list.file_reference`, you MUST resolve using `... on MediaImage { image { url altText } }` and/or `... on GenericFile { url }` in the query.

4) Use `mcp__shopify-dev-mcp__validate_graphql_codeblocks` to validate any new GraphQL query fragments before adding them to `server/shopify-client.ts`.

---

========== GRAPHQL QUERY RULES ==========

1) All product fields (core fields + metafields) must be defined in the `PRODUCT_FIELDS_FRAGMENT` constant in `server/shopify-client.ts`. Never duplicate the fragment — reference it in all queries.

2) The fragment follows this nested structure for Metaobject metafields:
   ```graphql
   metafieldAlias: metafield(namespace: "custom", key: "metafield_key") {
     reference {
       ... on Metaobject {
         fields {
           key
           value
           reference {
             ... on MediaImage {
               image { url altText }
             }
           }
           references(first: 10) {
             edges {
               node {
                 ... on Metaobject {
                   fields {
                     key
                     value
                     reference {
                       ... on MediaImage {
                         image { url }
                       }
                     }
                   }
                 }
               }
             }
           }
         }
       }
     }
   }
   ```

3) For list-type metafields (e.g., `list.metaobject_reference`), use `references(first: N)` instead of `reference`. Default to `first: 10` unless more items are required.

4) For `list.file_reference` metafields (like `product_ingredients`, `side_ingredient`), always include BOTH `... on MediaImage` and `... on GenericFile` fragments:
   ```graphql
   references(first: 10) {
     edges {
       node {
         ... on MediaImage { image { url altText } }
         ... on GenericFile { url }
       }
     }
   }
   ```

5) Always alias metafields with camelCase names that match their corresponding TypeScript property on `ShopifyProduct` (e.g., `heroBanner: metafield(namespace: "custom", key: "hero_banner")`).

6) Do NOT fetch metafields in the client-side `PRODUCT_QUERY` in `client/src/lib/shopify.ts` — that query is a reference/unused. All actual fetching goes through the server GraphQL queries in `server/shopify-client.ts`.

7) STRICT SCOPE RULE: Fetch ONLY metafields; do NOT add or fetch ANY additional Shopify core product fields unless the task explicitly instructs to fetch that specific core field.

---

========== DATA MAPPING RULES ==========

1) All raw Shopify GraphQL response → typed `ShopifyProduct` mapping happens in the `mapShopifyProduct()` function in `server/shopify-client.ts`. When adding a new metafield:
   - Add it to `PRODUCT_FIELDS_FRAGMENT`
   - Add a mapped property in `mapShopifyProduct()` using the correct mapper
   - Add the TypeScript type to `ShopifyProduct` in BOTH `server/shopify-client.ts` AND `client/src/lib/shopify.ts`

2) Use these mapping helpers for consistent nested data extraction:
   - `mapMetaobject(metafield)` — maps a single `metaobject_reference` metafield to a flat key/value object
   - `mapMetaobjectsList(metafield)` — maps a `list.metaobject_reference` metafield to an array of flat objects
   - `parseRichText(input)` — converts Shopify RichText JSON to plain string
   - `parseJsonList(jsonString)` — safely parses JSON array strings (for marquee-style fields)

3) The `mapMetaobject` helper recursively resolves:
   - Nested `MediaImage` references → extracts `url`
   - Nested `Metaobject` sub-references → recursively maps to flat object
   - `list.metaobject_reference` within a field → maps each node to flat object
   - `rich_text` values → runs through `parseRichText`
   - JSON array strings → runs through `parseJsonList`

4) The `colors` metafield is a special Metaobject. After mapping, its keys become direct properties on `product.colors` (e.g., `product.colors.background_color`, `product.colors.primary_color`, `product.colors.secondary_color`). Follow this pattern for any new color-type metafields.

5) Never use `any` for new metafield properties on `ShopifyProduct`. Define a proper TypeScript interface for each new structured metafield type.

---

========== CLIENT-SIDE DATA ACCESS RULES ==========

1) The frontend MUST always fetch products via `shopifyService.fetchProducts()` in `client/src/lib/shopify.ts`, which calls `/api/shopify/products`. Never bypass this.

2) To get a single product by handle on the client, use `shopifyService.fetchProductByHandle(handle)`. This currently fetches all products and filters — if a dedicated `/api/shopify/products/:handle` endpoint is added server-side, update this method to use it.

3) When consuming metafield data in React components:
   - Always check for null/undefined before accessing nested properties (e.g., `product.heroSection?.image_url`)
   - Use the helper functions from `client/src/lib/shopify.ts`:
     - `getMetafieldImage(product, namespace, key)` for image metafields
     - `getMetafieldValue(product, namespace, key)` for value metafields
     - `getProductIngredients(product)` for ingredient image arrays
     - `getSideIngredients(product)` for side ingredient image arrays
     - `getMetaobjectField(metaobject, key)` for fields on a mapped Metaobject
     - `getMetaobjectsList(metafield)` for lists of Metaobjects

4) The `colors` object from product data should be used to drive dynamic inline CSS variables on product pages. Example pattern:
   ```tsx
   style={{
     '--bg-color': product.colors?.background_color,
     '--primary-color': product.colors?.primary_color,
   } as React.CSSProperties}
   ```

---

========== CART RULES ==========

1) Cart state is managed globally in `CartContext` (`client/src/contexts/CartContext.tsx`). Always use `useCart()` hook — never manage cart state locally in a component.

2) Cart API flow:
   - Create: `POST /api/shopify/cart` → `shopifyService.createCart()`
   - Add item: `POST /api/shopify/cart/:cartId/items` → `shopifyService.addToCart(cartId, variantId, quantity)`
   - Update quantity: `PUT /api/shopify/cart/:cartId/items/:lineItemId` → `shopifyService.updateCartItem(cartId, lineItemId, quantity)`
   - Remove item: `DELETE /api/shopify/cart/:cartId/items/:lineItemId` → `shopifyService.removeFromCart(cartId, lineItemId)`
   - Fetch: `GET /api/shopify/cart/:cartId` → `shopifyService.fetchCart(cartId)`

3) Always use the `variantId` (not `productId`) when adding to cart. Products can have multiple variants — always show a variant selector if `product.variants.length > 1`.

4) The `webUrl` property of a cart is the Shopify checkout URL. When redirecting to checkout, use `window.location.href = cart.webUrl` — do not open in a new tab unless explicitly required by design.

---

========== ADDING A NEW METAFIELD — STEP-BY-STEP ==========

When a new custom metafield needs to be displayed, follow this exact sequence:

**Step 1 — Discover via MCP**
```
mcp__shopify-dev-mcp__introspect_graphql_schema  → confirm field exists
mcp__shopify-dev-mcp__learn_shopify_api          → understand field type
```

**Step 2 — Add to server GraphQL fragment**
In `server/shopify-client.ts`, add the field to `PRODUCT_FIELDS_FRAGMENT` following the correct structure for its type (see GRAPHQL QUERY RULES above).

**Step 3 — Validate the query**
```
mcp__shopify-dev-mcp__validate_graphql_codeblocks → validate the new fragment
```

**Step 4 — Add mapping in `mapShopifyProduct()`**
Use the appropriate mapper helper. Add the field to the returned object.

**Step 5 — Update TypeScript types**
Add the new property to `ShopifyProduct` in:
- `server/shopify-client.ts`
- `client/src/lib/shopify.ts`

**Step 6 — Consume in component**
Access via the mapped property. Use null checks. Follow existing patterns in components that already use metafields.

---

========== FALLBACK / ERROR HANDLING RULES ==========

1) `fetchProductsWithGraphQL()` already has a fallback to `fetchProductsWithSDK()` if GraphQL fails. Do not remove this fallback.

2) When the SDK fallback is used, new metafields will be empty objects/arrays. Components must handle this gracefully — never crash if a metafield is missing.

3) All server-side Shopify service methods must have `try/catch`. On failure, return `null` (for single items) or `[]` (for lists) — never throw to the caller.

4) On the client, `shopifyService.*` methods catch errors internally and return `null`/`[]`. Components must handle these null returns — show loading states and error messages as needed.

---

========== WHAT NOT TO DO ==========

- Do NOT call the Shopify Storefront API directly from the frontend
- Do NOT add the Storefront Access Token to `VITE_*` env vars (would expose it in the client bundle)
- Do NOT expose Shopify tokens or sensitive identifiers
- Do NOT bypass the server API layer for Shopify requests

- Do NOT duplicate `PRODUCT_FIELDS_FRAGMENT` — maintain a single source of truth
- Do NOT add new metafield types without first validating them via Shopify MCP
- Do NOT use the shopify-buy SDK client for new metafield fetching — use GraphQL only
- Do NOT assume Shopify schema changes are allowed without confirmation

- Do NOT modify Shopify Admin data directly
- Do NOT make any Shopify configuration changes without developer approval
- If Shopify changes are required, document the required changes and ask the developer to implement them

- Do NOT skip null checks on metafield data in React components
- Do NOT access nested metafield properties without validation
- Do NOT store the entire product list in localStorage — it's too large; use React Query cache only
- Do NOT bypass established `shopifyService` data access patterns