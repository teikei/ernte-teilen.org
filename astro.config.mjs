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
})
