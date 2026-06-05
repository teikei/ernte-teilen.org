# ernte-teilen.org Website

This file provides guidance to AI agents when working with this repository.

## What this is

This is the website for the _ernte-teilen.org_ solidarity-farming (Solawi) project, built with **Astro 5** (static output). This repo is **content + presentation only**. The interactive map and data-management tools at `/karte` are a separate application (the [teikei](https://github.com/teikei/teikei) repo) that is injected at runtime — see "Teikei map embed" below.

> The site was migrated from Gatsby to Astro in 2026, and subsequently decoupled from the IBM Carbon dependency. See [`docs/migrations/ASTRO_MIGRATION.md`](./docs/migrations/ASTRO_MIGRATION.md) for the rationale and the record of the post-launch cleanups (Carbon removal, the local grid, the `@use` migration, and the decision to keep SCSS).

## Commands

- `npm install` — install deps (Node 24.x)
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

- _(none)_ → `DefaultLayout.astro` — frontmatter `title` + Markdown body in standard chrome (legal pages)
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

Sass (built into Astro/Vite, using the modern `@use`/`@forward` module system — no `@import`, no deprecated globals), **no Carbon dependency**. The layout grid is a small local 12-column flex grid in `src/styles/_grid.scss` (`et--grid`/`et--row`/`et--col-*`/`et--offset-*`), generated to reproduce the exact output of the IBM Carbon classic grid it replaced. Design tokens, breakpoints, and the former Carbon button/typography mixins live in `src/styles/_theme.scss`, which other files load via `@use '../../styles/theme' as *`. A global reset (`src/styles/_reset.scss`, the Eric-Meyer reset + `box-sizing: border-box` Carbon used to provide) is imported first in `src/styles/index.scss`. All project styles use the `et--` prefix; component styles are colocated.

### Config & i18n

The site is **German only** — there is no i18n layer. UI strings and navigation live inline in `src/config/navigation.ts`; site metadata in `src/config/site.ts`.

### Fonts

Self-hosted via `@fontsource/*` packages (OFL-1.1). `src/styles/_fonts.scss` keeps **custom `@font-face` declarations** rather than importing `@fontsource`'s CSS, because the design maps a single `'Roboto'` family where the **bold weight is actually Roboto Condensed 700**. Font files are referenced by relative `node_modules` path (Vite fingerprints them); no font binaries are committed.

## Conventions

- Components live in `src/components/<Name>/index.astro` with a colocated `styles.scss`.
- Component `styles.scss` files `@import '../../styles/theme'` (Carbon functions/mixins + project variables); some also import Carbon button mixins by relative `node_modules` path.
- Prettier-style formatting (no semicolons, single quotes, 2-space) is used in the `.ts`/`.astro` frontmatter but not enforced by a hook.

## Deployment

CI (`.github/workflows/site-ci.yml`) builds (`npm run build`) on every branch, then deploys via **Dokku** based on branch: `preview` → teikei-site-preview, `main` → production (teikei-site). A separate manual workflow (`deploy-to-production.yml`, `workflow_dispatch`) fast-forward-merges `preview` → `main` and dispatches the production deploy.

Each Dokku app builds with two buildpacks (`.buildpacks` / `app.json`): the **nodejs** buildpack runs `npm ci` and auto-runs the `build` script (`astro build`) during compile → `dist/`; then **`dokku/buildpack-nginx`** relocates the project into `www/` and serves `root /app/www/$NGINX_ROOT`. So each app needs the Dokku config var **`NGINX_ROOT=dist`**, and an empty **`.static`** file in the repo triggers that buildpack's detection. There is **no `app.json` predeploy** — the build must happen during the nodejs compile (before the `www/` move), not at release time.

Env vars: the committed `.env.development` (preview hosts, used by `astro dev`) and `.env.production` (production hosts, used by `astro build`) provide `PUBLIC_TEIKEI_*`. Because `astro build` always runs in production mode, it would otherwise bake the **production** URLs into every environment — so each Dokku app overrides them at build time with per-app **`PUBLIC_TEIKEI_*`** config vars (a real env var takes precedence over `.env.production`). This is how the preview app builds against the preview hosts. (Astro only exposes `PUBLIC_`-prefixed vars; the old `GATSBY_*` names are ignored.)
