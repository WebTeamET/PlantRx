---
name: design
description: Use this skill for all frontend design and component creation tasks in this project. Trigger whenever the user asks to create components, write HTML, add CSS, work on styling, build layouts, create buttons or inputs, handle animations, set up responsive design, or work with Tailwind CSS. Also use when setting up CSS files (base.css, component.css, layout.css, utilities.css, style.css), configuring design tokens, or converting Figma designs to code.
---

# Design Skill

This skill governs all frontend design, component creation, HTML structure, CSS architecture, and animation rules for this project.

---

## Project File Structure

- All new components go in `/client/src/`
- CSS files: `style.css`, `base.css`, `component.css`, `layout.css`, `utilities.css`, `index.css`
- Framer Motion variants: `/client/framerMotionVariants.tsx`

---

## Component Rules

1. Place all new components in `/client/src/`
2. Store all content and images dynamically via JSON variables — never use static/hardcoded content directly in JSX

---

## Animation Rules

1. Use **Framer Motion** for all animations
2. Reuse existing variants from `/client/framerMotionVariants.tsx`
3. For new animations not in the variants file, define them inside the component itself

---

## HTML Rules

1. **No classes on body/html/header/footer tags** — style these only via CSS selectors in the appropriate CSS files using `@apply`
2. **No inline styles** — never use the `style` attribute on any element; all styling goes in CSS files via `@apply`
3. **`<a>` tags** must include all of these attributes, each on its own line:
   ```html
   <a
     href=""
     role="link"
     target=""
     aria-label=""
   >
   ```
4. **`<button>` tags** must include, each on its own line:
   ```html
   <button
     type="button"
     aria-label=""
   >
   ```
5. **`<section>` elements** must have two classes — a descriptive section class and `general-padding`:
   ```html
   <section class="hero-section general-padding">
   ```
   Section class name must reflect the actual section from Figma.
6. **`<img>` tags** must include, each on its own line:
   ```html
   <img
     width=""
     height=""
     alt="Meaningful descriptive text"
   />
   ```
   `alt` must never be blank.
7. **Headings (h1–h6)** must be wrapped in `.title` + color modifier class. Never apply classes directly on heading tags:
   ```html
   <div class="title title-black">
     <h1>Heading text</h1>
   </div>
   ```
   Color modifier (e.g. `title-black`) is generated dynamically from Figma colors.
8. **`<p>` elements** must be wrapped in `.content` + color modifier class:
   ```html
   <div class="content content-black">
     <p>Paragraph text</p>
   </div>
   ```
9. **Phone/email links** — use correct protocols:
   - Phone: `href="tel:+1234567890"`
   - Email: `href="mailto:user@example.com"`
10. All `<section>` elements must be inside `<main>`
11. **Allowed Tailwind classes directly in HTML**: `p-*`, `m-*`, `max-w-*`, `flex`, `flex-col`, `flex-row`, `grid`, `grid-cols-*`, `gap-*` only. All other styling goes in CSS files.
12. **Input fields** must have an associated `<label>` with matching `for` / `id` attributes
13. Follow **SEO best practices**: semantic elements, proper heading hierarchy, accessibility attributes
14. All code must be **pixel-perfect** to the provided Figma design
15. Maintain clean indentation and formatting throughout

---

## CSS Architecture

### File Responsibilities

| File | Contains |
|------|----------|
| `style.css` | `@import` of all CSS files (in order), `@theme{}` with all design tokens |
| `base.css` | Global/foundational styles: html, body, headings, paragraphs, containers, general-padding, title/content color classes |
| `component.css` | Buttons, inputs, textareas, selects |
| `layout.css` | Header and footer styles |
| `utilities.css` | Section styles and extra helper classes |
| `index.css` | Necessary CSS for the `/client` folder |

### Core CSS Rules

1. **All styles use `@apply`** with Tailwind utility classes — no raw CSS properties anywhere
2. **No `@layer` directives** — write rules directly in the file, not inside `@layer base {}`, etc.
3. **No CSS variables in `:root`** — all variables are defined in `style.css` inside `@theme{}` and must be reused, never reduplicated
4. **No fixed heights** (`h-*`, `min-h-*`) on sections or elements — use `h-full` only if needed
5. **No fixed widths** (`w-*`, `min-w-*`) on sections or elements — use `w-full` only if needed
6. **No `[]` arbitrary values** — e.g. avoid `text-[20px]`, `max-w-[452px]`; use design tokens instead
7. **Tailwind version is v3** — use v3 class names only
8. **Responsive breakpoints** go inside the same `@apply` line, using `max-*` / `min-*` prefixes:
   ```css
   h1, .h1 {
     @apply text-heading-1 max-768:text-22;
   }
   ```
9. **No traditional `@media` queries** — always use Tailwind breakpoint utilities

---

## style.css Structure

Must include (in this exact order):
```css
@import './base.css';
@import './component.css';
@import './layout.css';
@import './utilities.css';
```

Then inside `@theme {}`:

- **Breakpoints** (always use these):
  ```
  --breakpoint-1920, --breakpoint-1600, --breakpoint-1512, --breakpoint-1440,
  --breakpoint-1366, --breakpoint-1199, --breakpoint-1024, --breakpoint-992,
  --breakpoint-768, --breakpoint-640, --breakpoint-576, --breakpoint-425, --breakpoint-375
  ```
- **Spacing**: `--spacing: 1px`
- **Font families**: fetched dynamically from Figma (e.g. `--font-inter: "Inter", sans-serif`)
- **Colors**: fetched dynamically from Figma (e.g. `--color-white: #FFFFFF`)
- **Font sizes**:
  - Headings `--text-heading-1` through `--text-heading-6` (sorted largest → smallest)
  - Other sizes as `--text-{value}` (e.g. `--text-20`, `--text-16`)

All values must come from Figma — no hardcoded examples.

---

## base.css Structure

### Headings
```css
h1, .h1 { @apply text-heading-1 max-768:text-22; }
/* ... h2 through h6 */
```

### Paragraphs
```css
.content p { @apply text-16; }
.content p + p { @apply mt-10; }
```

### Title Color Classes (generated from Figma colors)
```css
.title-{color} h1,
.title-{color} h2,
/* ... h3–h6 */
.title-{color} h6 { @apply text-{color}; }
```

### Content Color Classes (generated from Figma colors)
```css
.content-{color} p { @apply text-{color}; }
```

### Containers (padding from Figma X-axis spacing, no max-width)
```css
.container-fluid { @apply px-50; }
.container-fluid-md { @apply px-80; }
```

### General Padding (from Figma Y-axis section spacing)
```css
.general-padding { @apply py-100 max-1199:py-50 max-768:py-30; }
```

---

## component.css Structure

### Buttons
- Base class `.btn` with common styles
- Variants `.btn-{color}` based on Figma button designs
- All button variants must include hover effects with transitions
```css
.btn { @apply px-16 py-8 inline-flex text-center rounded-10 border-1 border-solid cursor-pointer; }
.btn-black { @apply text-white bg-black border-black hover:bg-white hover:text-black transition-all; }
```

### Inputs / Textarea / Select
- Match Figma design exactly (colors, font-size, spacing, borders)
- All styles via `@apply` in `component.css`

---

## layout.css Structure

- Contains all **header** and **footer** styles
- Navigation within header goes here too
- Use `@apply` with Tailwind classes only

---

## utilities.css Structure

- Contains **section-specific CSS** and extra helper/utility classes
- Anything that doesn't belong in base, component, or layout
- Use `@apply` with Tailwind classes only