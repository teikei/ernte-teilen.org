import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'

// Project root, so `@import 'node_modules/carbon-components/...'` in the
// Carbon-based SCSS resolves from the project root.
const projectRoot = fileURLToPath(new URL('./', import.meta.url))

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
          loadPaths: [projectRoot],
          // The carbon-components v9 SCSS predates Dart Sass and emits a lot of
          // deprecation noise. Silence it; modernising the styles is a separate,
          // out-of-scope follow-up (see ASTRO_MIGRATION.md).
          quietDeps: true,
          silenceDeprecations: [
            'import',
            'global-builtin',
            'color-functions',
            'slash-div',
            'if-function',
            'legacy-js-api',
          ],
        },
      },
    },
  },
})
