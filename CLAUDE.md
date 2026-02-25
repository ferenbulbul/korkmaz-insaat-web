# Korkmaz İnşaat Web - Project Conventions

## Tech Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui

## Critical Rules
1. `@/` path alias maps to `src/`
2. **Tailwind v4**: All custom CSS in `globals.css` MUST be inside `@layer base {}`. Unlayered CSS overrides ALL Tailwind utility classes.
3. **Server Components by default** - only add `'use client'` when needed (event handlers, hooks, browser APIs)
4. Use `cn()` from `@/lib/utils` for class merging
5. Always use `next/image` for images with explicit width/height
6. Always use `next/link` for internal navigation
7. Use `import type` for type-only imports
8. Turkish UI text, English code and comments

## Architecture
- `src/components/ui/` - shadcn/ui primitives (auto-generated, don't manually edit)
- `src/components/layout/` - Navbar, Footer, Container, SectionWrapper
- `src/components/shared/` - Reusable domain components
- `src/sections/` - Page-level section compositions (not reusable between pages)
- `src/services/` - API layer (axios-based, backend-ready)
- `src/types/` - TypeScript type definitions
- `src/constants/` - Static mock data (will be replaced by API calls)
- `src/hooks/` - Custom React hooks
- `src/config/` - Site-wide configuration

## Component Pattern
- Arrow function components, one per file, default export
- Props as interface above the component
- Use `cn()` for conditional classes

## Color System (Ferah / Airy Palette)
- Background: #FAFAF9 (warm white) — Cards: #FFFFFF (pure white float on subtle bg)
- Foreground: #1C1917 (warm charcoal) — NOT dark brown
- Primary: #292524 (stone-800) — used for dark sections, buttons
- Accent: #B8962E (logo gold) — CTAs, highlights, sparingly used
- Gold scale: gold-50 through gold-700 for gradient variations
- Secondary/Muted: #F5F5F4 (stone-100) — alternating section backgrounds
- Border: #E7E5E4 (stone-200) — ultra-light, barely visible
- Footer: #1C1917 (stone-900) — refined charcoal
- Hero overlays: #0C0A09 (stone-950) gradient — NOT brown
- Navbar: White/glass with backdrop-blur, dark text, gold CTA
- Font: Sora (geometric sans-serif, --font-sora)
- All colors defined as CSS custom properties in globals.css
