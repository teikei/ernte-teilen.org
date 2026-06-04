# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/content website for the *ernte-teilen.org* solidarity-farming (Solawi) project, built with **Astro 5** (static output). This repo is **content + presentation only**. The interactive map and data-management tools at `/karte` are a separate application (the [teikei](https://github.com/teikei/teikei) repo) that is injected at runtime — see "Teikei map embed" below.

> The site was migrated from Gatsby to Astro in 2026. See [`ASTRO_MIGRATION.md`](./ASTRO_MIGRATION.md) for the rationale and the deliberate "out of scope" cleanups still pending (notably: the SCSS still depends on the Carbon grid/mixins, kept as-is on purpose).

## Commands

- `npm install` — install deps (Node 20.x / 22.x / 26.x)
- `npm run dev` — Astro dev server on **http://localhost:3000** (port set in `astro.config.mjs` to match the test map server's CORS allowlist). Dev uses `.env.development` (preview map/API hosts).
- `npm run build` — production build into `dist/` (uses `.env.production`)
- `npm run preview` — serve the production build locally
- `npm test` — no-op (`echo "no tests"`); wired into CI, must stay green

There is **no test suite** and no linter configured. CI (`.github/workflows/site-ci.yml`) runs `npm run build` as the gate before deploy.

## Architecture

### Pages come from Markdown, not Astro file routes
Page content is authored as Markdown in `src/content/pages/*.md` (a content collection defined in `src/content.config.ts`). A single catch-all route, `src/pages/[...slug].astro`, generates every page: `getStaticPaths` maps each entry to its URL (`index.md` → `/`, everything else → `/<id>/`) and selects a **layout from the `template:` frontmatter field**. **To add a page, add a Markdown file** — do not add `.astro` files under `src/pages/`.

### Layouts (`src/layouts/`)
The `template:` frontmatter value maps to a layout:
- *(none)* → `DefaultLayout.astro` — frontmatter `title` + Markdown body in standard chrome (legal pages)
- `home` → `HomeLayout.astro` — landing page; composes Hero/Search/Teasers/CardCarousel/Testimonials/Partners from frontmatter
- `about` → `AboutLayout.astro`, `featured` → `FeaturedLayout.astro` — listing layouts with a Hero + Markdown body
- `teikei` → `TeikeiLayout.astro` — the `/karte` page; renders the empty `#teikei-app` placeholder the external map hydrates

All layouts wrap `BaseLayout.astro`, which holds the `<html>` shell, `<head>` meta tags (the old `PageMeta`/`html.js` equivalent), and the page chrome (`Header`, `OffCanvasMenu`). `[...slug].astro` renders the Markdown `<Content />` into the layout's default slot.

### Components (`src/components/<Name>/index.astro`)
Presentational `.astro` components, each with a colocated `styles.scss` imported for global (un-scoped) CSS. There are **no UI-framework islands**; the two interactive pieces — `CardCarousel` and `OffCanvasMenu` — are small vanilla-JS `<script>`s inside their components.

### Teikei map embed (the cross-app boundary)
`TeikeiBundle.astro` renders a `<link>` + `<script async>` pointing at `${PUBLIC_TEIKEI_BUNDLES_URL}/main.{css,js}`. It's included by the homepage `Search` embed (`#teikei-search`) and the `karte` page (`#teikei-app`). The map app reads its config from `data-*` attributes on those divs (`data-api-base-url`, `data-assets-base-url`, etc.). The site bundles no map code. URLs come from `PUBLIC_TEIKEI_*` env vars (`.env.development` = preview hosts, `.env.production` = production); see `src/config/site.ts`.

### Images
Content images live in `src/assets/**` and render through `astro:assets` (`<Image>`). `src/lib/images.ts` eagerly globs them and keys them by `<folder>/<slug>` (replacing Gatsby's `allFile` queries). Markdown body images and static assets (favicons, logo, social images, `_redirects`) live in `public/` and are served verbatim.

### Styling
Sass (built into Astro/Vite). **Still built on the IBM Carbon grid/mixins** (`carbon-components` is a dependency; Vite's Sass `loadPaths` is set to the project root in `astro.config.mjs` so `@import 'node_modules/carbon-components/...'` resolves). Carbon grid classes (`bx--grid`, `bx--row`, `bx--col-*`) appear in markup; project styles use the `et--` prefix. Global styles in `src/styles/`; component styles colocated. Decoupling from Carbon is a planned follow-up (see `ASTRO_MIGRATION.md`).

### Config & i18n
The site is **German only** — there is no i18n layer. UI strings and navigation live inline in `src/config/navigation.ts`; site metadata in `src/config/site.ts`.

### Fonts
Self-hosted via `@fontsource/*` packages (OFL-1.1). `src/styles/_fonts.scss` keeps **custom `@font-face` declarations** rather than importing `@fontsource`'s CSS, because the design maps a single `'Roboto'` family where the **bold weight is actually Roboto Condensed 700**. Font files are referenced by relative `node_modules` path (Vite fingerprints them); no font binaries are committed.

## Conventions
- Components live in `src/components/<Name>/index.astro` with a colocated `styles.scss`.
- Component `styles.scss` files `@import '../../styles/theme'` (Carbon functions/mixins + project variables); some also import Carbon button mixins by relative `node_modules` path.
- Prettier-style formatting (no semicolons, single quotes, 2-space) is used in the `.ts`/`.astro` frontmatter but not enforced by a hook.

## Deployment
CI (`.github/workflows/site-ci.yml`) builds on every branch, then deploys via **Dokku** based on branch: `preview` → teikei-site-preview, `next` → teikei-site-next, `main` → production (teikei-site). Each Dokku app's predeploy step is `npm run build` (`app.json`), producing `dist/`, which the heroku static buildpack serves (`static.json` `root: dist/`). Env vars per environment are the committed `.env.development` / `.env.production` (`PUBLIC_TEIKEI_*`).
