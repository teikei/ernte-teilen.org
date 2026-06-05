# Astro Migration Plan

Status: **✅ COMPLETE — Astro is live in production** · Last updated: 2026-06-05

> **Migration complete. The Astro site is live.** The cutover landed on `main`
> (PR #213, "Cut over to Astro: promote astro/ to repo root, retire Gatsby"):
> the Gatsby root files were removed and the Astro app promoted from `astro/` to
> the repo root, `npm run build` outputs to `dist/`, and the Dokku deploy was
> switched to the nodejs + `dokku/buildpack-nginx` buildpacks serving the static
> `dist/`. The preview deploy validated the build, and production followed. The
> pre-cutover Gatsby state is preserved at the **`gatsby-final`** tag for
> rollback; everything below is retained as a historical record of how the
> migration was carried out.
>
> All 10 routes ship with URL parity, both teikei embeds (map at `/karte` and
> the homepage search) are wired and mount against the external bundle, and
> `astro build` / `astro dev` run clean. The 2026-06-04 manual review confirmed
> every page is visually identical to the old production site. See
> "Implementation notes & deviations" for where the rebuild intentionally
> departs from a literal port, and "Out of scope" for the follow-ups (chiefly
> the Carbon/SCSS decoupling) deliberately left for after the cutover.

This document records the decision to migrate the ernte-teilen.org website from
Gatsby to Astro, the rationale, and the migration steps that were carried out.
It is kept as a historical reference now that the migration has shipped.

## Goal

Radically simplify the architecture of this **marketing/content website** while
keeping its core functionality:

- Static pages rendered from Markdown.
- Embeds of interactive SPA apps (the map at `/karte` and the homepage search)
  that are maintained in a **separate repository** ([teikei](https://github.com/teikei/teikei))
  and injected at runtime as a JS bundle + CSS + a target `<div>`.

The current stack (Gatsby 4, React 16, an internal GraphQL data layer, Carbon
Design System, ~30 prod dependencies incl. a native `libvips`/`sharp` toolchain)
is hard to maintain and the team no longer has Gatsby/GraphQL knowledge.

## Why this migration is low-risk (key findings)

A full read of the codebase showed the intimidating parts are shallow:

- **The SPA embeds contain zero app logic in this repo.** They are empty
  `<div id="teikei-app" data-*="…">` / `#teikei-search` elements plus
  `gatsby-browser.js` injecting `main.js`/`main.css` from
  `GATSBY_TEIKEI_BUNDLES_URL` on route change. In Astro this is a plain `<div>`
  + one `<script>` tag. Not coupled to Gatsby.
- **Carbon is CSS-only here.** No `carbon-components-react` components are
  imported in JS — only ~4 SCSS files use Carbon's grid (`bx--grid/row/col`) and
  theme variables. React + Carbon-React can be dropped entirely.
- **GraphQL is incidental, not architectural.** Used only internally by Gatsby
  for (a) Markdown → pages and (b) `locales/*.yml` → a `t` prop. Nothing queries
  an external GraphQL API. Both disappear in Astro.

Scope: 10 Markdown pages, 5 templates, 17 small presentational components,
~1,400 LOC JS, ~1,460 LOC SCSS.

## Agreed solution

- **Astro, static output** (`output: 'static'`) — matches what the site already
  produces.
- **Markdown content collections** for pages. Keep the existing `template:`
  frontmatter field to select a layout, replicating today's `gatsby-node.js`
  logic.
- **React islands only if a specific widget needs one — likely none.** The
  embeds do not need React.
- **Embeds = div + script.** Reproduce the target `<div>`, its `data-*`
  attributes, and the external bundle/CSS URLs exactly so the separately
  maintained map/search app mounts unchanged.
- **No localization.** The site is German-only and will stay that way. Drop
  `en.yml` and all locale/`t`-prop machinery; inline the German strings.
- **Migrate styles and templates as-is first.** Bring SCSS over nearly verbatim
  (Astro supports Sass natively). Decoupling from the Carbon grid / moving to
  plain CSS is an **explicit follow-up, out of scope** for the migration, to
  avoid the scope creep that derailed past attempts.
- **URLs must match current production paths** (`/solawi`, `/betriebe`,
  `/karte`, the legal pages, etc.) as closely as possible for SEO and link
  compatibility. Preserve `static/_redirects` behavior.

## Repo & cutover strategy

Single repo, dedicated migration branch, **new app in a temporary subfolder** —
**not** a monorepo/workspaces (only one app ever ships; workspace tooling would
be pure overhead).

During migration, on branch `feat/astro-migration` (or similar):

```
/                  ← Gatsby app stays here, untouched, runnable for reference
  package.json
  gatsby-*.js
  src/...
  astro/           ← new app, fully self-contained (own package.json, lockfile)
    package.json
    astro.config.mjs
    src/...
```

Keeping the old app side-by-side avoids package.json/node_modules collisions and
lets you diff old vs. new page-by-page.

**Cutover (single commit on the branch):**

1. `git tag gatsby-final` before deleting anything (git history is the archive;
   no dead files kept in-tree).
2. Delete the Gatsby files at root (`gatsby-*.js`, old `src/`, root
   `package.json`, lockfile, etc.).
3. Move everything from `astro/` up to the repo root.
4. Update deploy config: `app.json` predeploy `gatsby build` → `astro build`;
   `static.json` root `public/` → `dist/`.

Final tree is Astro-at-root, which is what the Dokku buildpack expects.

**Deploy approach (agreed):** no preview from the subfolder. Test locally /
via `astro build` output until the layout is finished. The **cutover commit is
the first thing deployed to the `preview` branch** — that is the first real
preview deploy. Merge to `main` (production) only after the preview passes a
page-by-page diff against current production.

Existing CI/CD (`.github/workflows/site-ci.yml`) deploys per branch via Dokku:
`preview` → teikei-site-preview, `next` → teikei-site-next, `main` →
production. This flow is unchanged except the build command.

## Broad migration steps

1. **Branch & scaffold.** Create the migration branch. Scaffold a static Astro
   app in `astro/`.
2. **Content collection + layout routing.** Configure a content collection for
   `src/pages/*.md`. Implement layout selection from the `template:` frontmatter
   (the `gatsby-node.js` replacement), defaulting to the `default` layout.
3. **Port one page end-to-end first.** Take a simple page (e.g. `solawi.md`)
   through the `default` layout as a proven pattern, then replicate.
4. **Port layouts.** Recreate the 5 templates (`default`, `home`, `about`,
   `featured`, `teikei`) as Astro layouts.
5. **Port components.** Convert the 17 presentational components from JSX to
   `.astro` (near-mechanical). Drop the GraphQL fragments; inline German strings
   where `t` was used.
6. **Wire the embeds.** Reproduce `#teikei-app` (`/karte`) and `#teikei-search`
   (homepage) divs with their exact `data-*` attributes; inject the external
   bundle + CSS via a `<script>`/`<link>`. Verify the contract against the
   separate `teikei` repo's mount code if available.
7. **Migrate styles.** Bring SCSS over as-is; confirm the Carbon grid renders
   (keep Carbon's CSS-only grid for now if needed).
8. **Images & static assets.** Port `src/assets/**` to Astro's `<Image>`; copy
   `static/img` and `static/_redirects` verbatim to the public dir.
9. **URL & redirect parity.** Map every page to its current production path 1:1;
   verify `_redirects`. Legal pages (`impressum`, `datenschutz`,
   `nutzungsbedingungen`) must render byte-faithfully (German legal obligation).
10. **Local verification.** Build and diff rendered HTML/routes page-by-page
    against current production.
11. **Cutover commit.** Execute the cutover steps above (tag, delete, promote,
    update deploy config).
12. **Preview deploy & validate.** Push to `preview`; validate the live preview.
13. **Production.** Merge to `main` once preview passes. Keep `gatsby-final` tag
    as the rollback point.

## Implementation notes & deviations

How the built `astro/` app maps to the old code, and where it intentionally
differs from a literal port:

- **Structure.** `src/content/pages/*.md` (the old `src/pages/*.md`) →
  rendered by `src/pages/[...slug].astro`, which picks a layout from the
  `template` frontmatter via `src/content.config.ts`. The five Gatsby templates
  became `src/layouts/*Layout.astro` over a shared `BaseLayout.astro` (html
  shell + `<head>` meta, replacing `html.js` + `PageMeta`). The 17 components
  were ported 1:1 to `src/components/<Name>/index.astro`, keeping the original
  folder layout so each `styles.scss` `@import '../../styles/theme'` resolves
  unchanged.
- **Styles are verbatim.** All SCSS was copied as-is, including the Carbon
  grid/mixins. `carbon-components` is a dependency and Vite's Sass `loadPaths`
  is set to the project root so `@import 'node_modules/carbon-components/...'`
  resolves exactly as it did under gatsby-plugin-sass. Carbon's pre-Dart-Sass
  deprecation noise is silenced via `quietDeps`/`silenceDeprecations`.
- **Fonts.** The webpack `~typeface-*` URL imports don't work under Vite, so the
  woff/woff2 files were copied into `public/fonts/` and `_fonts.scss` now points
  at `/fonts/...`. The `typeface-*` packages are no longer runtime deps.
- **i18n removed.** `de.yml`/`en.yml` and the `t`-prop plumbing are gone; German
  strings live inline in `src/config/navigation.ts`.
- **GraphQL removed.** Image lookups (the old `allFile` queries + lodash
  `zipObject`) are replaced by `src/lib/images.ts`, which globs `src/assets/**`
  and keys images by `<folder>/<slug>`. Images render via `astro:assets`.
- **CardCarousel** was reimplemented as a small vanilla-JS carousel (no React,
  no `react-responsive-carousel`); its former CSS layout classes were inlined
  into the component's `styles.scss`.
- **OffCanvasMenu** was reimplemented as a vanilla slide-in (no
  `react-burger-menu`); the positioning/overlay CSS that the library used to
  inject is now in the component's `styles.scss`.
- **Embeds.** `gatsby-browser.js`'s runtime script injection became a static
  `TeikeiBundle.astro` (`<link>` + `<script async>`), included by the homepage
  `Search` embed and the `karte` page. Bundle/API/assets URLs come from
  `PUBLIC_TEIKEI_*` env vars in `.env.development` (the *preview* map hosts, used
  by `astro dev`) and `.env.production` (production, used by `astro build`). This
  matches the old behavior: every Dokku deploy ran `gatsby build` = production
  URLs; the non-production hosts only appear in local `astro dev`. (The
  non-production environment was renamed from "staging" to "preview".)
- **One latent bug fixed.** The old `Features` component passed the whole image
  collection to every item (`getImage(featureImages)`), so feature images were
  effectively broken. The Astro version keys feature images by slug
  (`producers`/`support`/`consumers`), which the asset filenames already match.

## Out of scope (deliberate follow-ups)

- Removing the Carbon grid / migrating SCSS to plain CSS.
- Any visual redesign or content changes.
- Re-introducing localization.

Do these only after the Astro site is at feature parity and shipped.

## Verification checklist (all confirmed — site is live)

Items were confirmed during the 2026-06-04 manual review (dev server +
`astro build` output inspection) and the subsequent preview/production deploys.

- [x] Every current URL resolves to the equivalent page; no path changes.
- [x] `static/_redirects` behavior preserved (copied verbatim to `public/`).
- [x] Map (`/karte`) mounts and works against the external bundle.
- [x] Homepage search mounts and works.
- [x] Legal pages render faithfully.
- [x] Meta tags / social images (`PageMeta` equivalent) present per page.
- [x] Dokku build succeeds with `npm run build` and serves the static `dist/`
      via `dokku/buildpack-nginx` (`NGINX_ROOT=dist`) — confirmed on the live
      preview and production deploys.
