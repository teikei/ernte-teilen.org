# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/content website for the *ernte-teilen.org* solidarity-farming (Solawi) project, built with **Gatsby 4 + React 16**. This repo is **content + presentation only**. The interactive map and data-management tools at `/karte` are a separate application (the [teikei](https://github.com/teikei/teikei) repo) that is injected at runtime — see "Teikei map embed" below.

> **Planned migration:** a move off Gatsby to a simplified static **Astro** site is planned. See [`ASTRO_MIGRATION.md`](./ASTRO_MIGRATION.md) for the decision, rationale, repo/cutover strategy, and step-by-step plan. Read it before any large refactor or dependency work.

## Commands

- `npm install` — install deps (requires Node 20.x / npm 10.x; needs `libvips` for `sharp` image processing)
- `npm run dev` — Gatsby develop server (`localhost:8000`, GraphiQL at `/___graphql`)
- `npm run build` — production build into `public/`
- `npm run serve` — serve the production build
- `npm run clean` — clear Gatsby cache (run this when GraphQL queries or source nodes behave unexpectedly)
- `npm run lint` — `eslint src/**/*.js --fix`
- `npm run prettier` — format all of `src`

There is **no test suite** — `npm test` is a no-op (`echo no tests`) but is wired into CI and must stay green.

Git hooks (husky): `pre-commit` runs `pretty-quick`, `pre-push` runs lint + format.

## Architecture

### Pages come from Markdown, not React routes
Pages are authored as Markdown files in `src/pages/*.md`. `gatsby-node.js` queries all `MarkdownRemark` nodes and calls `createPage` for each, deriving the URL slug from the file path and choosing a React template from the `template:` frontmatter field (falling back to `templates/default.js`). **To add a page, add a Markdown file** — do not create routes manually.

### Templates (`src/templates/`)
The `template:` frontmatter value maps to a file here:
- `default.js` — renders frontmatter `title` + Markdown `html` inside the standard page chrome
- `home.js` — the landing page; pulls structured frontmatter (`teasers`, `cards`, `testimonials`, `partners`) and matching images into composed components
- `about.js`, `featured.js` — other layouts
- `teikei.js` — the `/karte` page; renders an empty `<div id="teikei-app" data-…>` placeholder that the external map bundle hydrates

Each template ends with an exported `graphql` page query keyed on `$slug`.

### Teikei map embed (the cross-app boundary)
`gatsby-browser.js` `onRouteUpdate` looks for `#teikei-app` / `#teikei-search` in the DOM and, if present, injects `main.js` + `main.css` from `GATSBY_TEIKEI_BUNDLES_URL`. The map app reads its config from `data-*` attributes on that div (`data-api-base-url`, `data-assets-base-url`, etc.). The site itself does not bundle any map code.

### i18n / locales
UI strings live in `src/locales/de.yml` and `en.yml`, exposed as GraphQL `localesYaml` nodes via `gatsby-transformer-yaml`. Each component that needs strings defines a **GraphQL fragment** (e.g. `fragment footer on LocalesYaml`) in its own file; templates compose these fragments into their page query as `t: localesYaml(locale: { eq: "de" }) { ...header ...footer }` and pass the result down as the `t` prop. The site currently renders German only.

### Images
Local images in `src/assets/**` are processed by `gatsby-plugin-sharp` / `gatsby-transformer-sharp` and resolved through `gatsby-plugin-image`. `static/img` and `static/_redirects` are copied verbatim to the site root.

### Styling
Sass via `gatsby-plugin-sass`, built on IBM **Carbon Design System** (`carbon-components-react`). Carbon's grid classes (`bx--grid`, `bx--row`, `bx--col-*`) are used in markup; project-specific styles use the `et--` prefix. Component styles live next to the component (`src/components/X/styles.scss`); global styles in `src/styles/`.

## Conventions
- ESLint config (`standard` + `standard-react` + `prettier`) and Prettier config (no semicolons, single quotes, 2-space, double-quoted JSX) live inline in `package.json`. `react/prop-types` is disabled but most components still declare `propTypes`.
- Components live in `src/components/<Name>/index.js` with a colocated `styles.scss`.

## Deployment
CI (`.github/workflows/site-ci.yml`) runs lint + test on every branch, then deploys via **Dokku** based on branch: `preview` → teikei-site-preview, `next` → teikei-site-next, `main` → production (teikei-site). Each Dokku app runs `gatsby build` as its predeploy step. Env vars per environment are in `.env.development` / `.env.production` (all `GATSBY_TEIKEI_*` point at the staging vs. production map/API hosts).
