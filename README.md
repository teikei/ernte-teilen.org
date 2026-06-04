## ernte-teilen.org

This repository contains the source code of the [ernte-teilen.org project website](https://ernte-teilen.org). For the mapping and data management tools used on [ernte-teilen.org/karte](https://ernte-teilen.org/karte) and [solawi.ch](https://www.solawi.ch/vernetzungsplattform/), see the [main _teikei_ repository](http://github.com/teikei/teikei).

The site is a static [Astro](https://astro.build) application. Pages are authored as Markdown in `src/content/pages/`; the `/karte` map and homepage search are embeds of the separately maintained _teikei_ app, injected at runtime.

## How to setup and run this project

### Prerequisites

Install the [Node.js runtime](https://nodejs.org/en/) (version 20, 22, or 26).

### Install dependencies

`npm install`

### Run in development

`npm run dev`

Serves on http://localhost:3000 and uses the *preview* map/API hosts (`.env.development`).

### Build for production

`npm run build`

Outputs the static site to `dist/` (uses `.env.production`).

### Serve production build

`npm run preview`
