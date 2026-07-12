# Korkmaz İnşaat Web - Project Conventions

Corporate website for Korkmaz İnşaat, a construction company in Gönen/Balıkesir.
Public site (projects, blog, contact) + admin panel, backed by Supabase.

## Tech Stack
- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui
- Supabase (Postgres + Storage) as backend — no separate API server
- framer-motion (animations), embla-carousel (hero/gallery), react-hook-form + zod (forms), sonner (toasts)
- Auth: custom JWT session via `jose` (no Supabase Auth)

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
- `src/app/` - App Router pages: `/` (home), `/projeler`, `/projeler/[slug]`, `/blog`, `/blog/[slug]`, `/hakkimizda`, `/iletisim`, plus `/admin/*` and `/api/*`
- `src/components/ui/` - shadcn/ui primitives (auto-generated, don't manually edit)
- `src/components/layout/` - Navbar, Footer, Container, SectionWrapper, ConditionalFooter
- `src/components/shared/` - Reusable domain components (ProjectCard, BlogCard, ContactForm...)
- `src/components/admin/` - Admin panel components (ProjectForm, BlogForm, ImageManager...)
- `src/components/motion/` - framer-motion wrappers (ScrollReveal, StaggerContainer, CountUp, ParallaxImage)
- `src/components/seo/` - JSON-LD schema components (Organization, FAQ, BlogPost, Project, Breadcrumb)
- `src/sections/` - Page-level section compositions (not reusable between pages): `home/`, `about/`, `blog/`, `contact/`, `projects/`
- `src/services/` - Data layer, all `import 'server-only'` (projects.ts, blog.ts, storage.ts)
- `src/types/` - Domain types + DB row types + row→domain mappers
- `src/constants/` - Static content (company, team, services, faq, navigation, seo) — team/services/faq are still static by design
- `src/lib/` - supabase clients, auth/session, metadata helpers, fonts, validations
- `src/config/site.ts` - Site-wide config (name, URL, contact info, geo, social)

## Data Layer (Supabase)
- Tables: `projects` (+ `project_images` child table, cascade delete), `blog_posts`, `site_settings` (key/jsonb value; holds `blog_visible` flag read in root layout — admin toggle at `/admin` hides blog from navbar/footer, 404s `/blog/*`, drops it from sitemap)
- Storage bucket: `project-images` (public URLs; path pattern `<slug>/<timestamp>-<name>.<ext>`)
- Migration/setup docs: `supabase/migrations/blog_posts.sql`, `SUPABASE_SETUP.md`
- Three clients in `src/lib/supabase/`:
  - `server.ts` — anon key + cookies, for public reads (RLS applies)
  - `admin.ts` — service_role key, for admin writes AND cookieless contexts (sitemap, generateStaticParams)
  - `client.ts` — browser client
- **Row mapper pattern**: DB rows are snake_case (`ProjectRow`), domain types camelCase (`Project`). Always map via `mapProjectRow` / `mapBlogPostRow` in `src/types/`. New DB columns need: Row type + domain type + mapper + `ProjectInput`.
- `projects.features` supports a legacy `{key: true}` object shape, normalized to array in `normalizeFeatures`
- Spec/feature catalogs (icons + Turkish labels) live in `src/types/project.ts` (`PROJECT_SPEC_TYPES`, `PROJECT_FEATURES`)

## Rendering Strategy
- Public listing/detail pages (`/projeler`, `/blog` + slugs) use `dynamic = 'force-dynamic'` + `revalidate = 0` — content edited in admin must appear immediately, no ISR
- Admin pages use `revalidate = 0`
- `sitemap.ts` is `force-dynamic` and uses the admin client (cookieless)

## Admin Panel & Auth
- Routes: `/admin` (project list), `/admin/projeler/yeni`, `/admin/projeler/[id]`, `/admin/yazilar/*` (blog), `/admin/login`
- API: `/api/admin/projects/*` (CRUD + images + thumbnail), `/api/admin/blog/*` (CRUD + upload), `/api/admin/auth/*`
- Auth: single shared password (`ADMIN_PASSWORD` env) → HS256 JWT in `korkmaz_admin_session` cookie (7 days), signed with `ADMIN_SESSION_SECRET`. Logic in `src/lib/auth/session.ts`.
- `src/middleware.ts` guards `/admin/*` (redirect to login) and `/api/admin/*` (401 JSON)
- Hero carousel is DB-driven: projects with `show_in_hero = true` (managed from admin)

## Environment Variables (.env.local)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`
- `NEXT_PUBLIC_APP_URL`

## SEO
- `createMetadata()` helper in `src/lib/metadata.ts` for per-page metadata
- JSON-LD via `src/components/seo/` components; `robots.ts` + `sitemap.ts` in `src/app/`
- Target keywords: "Gönen inşaat", "satılık daire", region Gönen/Balıkesir

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

## Gotchas
- `/api/debug/projects` route exists — dev-only helper, should not ship to production
- `next.config.ts` whitelists `images.unsplash.com` and the Supabase storage host for `next/image`
- Contact form posts to `/api/contact`
