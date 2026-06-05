import { defineConfig } from 'astro/config'

// https://astro.build
export default defineConfig({
  site: 'https://ernte-teilen.org',
  // Dev server port (matches the test map server's CORS allowlist).
  server: { port: 3000 },
  // Emit directory-style URLs: /solawi/ -> /solawi/index.html
  build: {
    format: 'directory',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Our own SCSS still uses the legacy `@import` rule and a few global
          // Sass functions; silence those until it migrates to `@use` / the
          // module system (a planned follow-up). Carbon is gone, so the grid
          // `loadPaths` and dependency `quietDeps` are no longer needed.
          silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
        },
      },
    },
  },
})
