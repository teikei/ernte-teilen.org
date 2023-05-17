## ernte-teilen.org

This repository contains the source code of the [ernte-teilen.org project website](https://ernte-teilen.org). For the mapping and data management tools used on [ernte-teilen.org/karte](https://ernte-teilen.org/karte) and [solawi.ch](https://www.solawi.ch/vernetzungsplattform/), see the [main _teikei_ repository](http://github.com/teikei/teikei).

## How to setup and run this project

This web application is built upon [React](https://reactjs.org/) and [Gatsby](https://www.gatsbyjs.org/). It uses [Yarn](https://github.com/yarnpkg/yarn) for managing dependencies.

### Prerequisites

1. Install the [Node.js runtime](https://nodejs.org/en/)
2. Install the [Yarn package manager](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

_Note:_ This web application uses [sharp](http://sharp.pixelplumbing.com) for image optimization. This requires `libvips`, which should come pre-installed on most UNIX-like systems. If not, use your package manager of choice to install `libvips-dev` before installing the node dependencies in the next step.

### Install dependencies

`npm install`

### Run in development

`npm run dev`

### Build for production

`npm run build`

### Serve production build

`npm run serve`
