export const siteMetadata = {
  title: 'ernte-teilen.org',
  siteUrl: 'https://ernte-teilen.org',
  defaultImage: '/img/social_home.jpg',
  twitterAccount: '@ernteteilen',
  description:
    'Hier finden Landwirte und Verbraucher zusammen, die sich an Solidarischer Landwirtschaft beteiligen möchten.',
}

// Runtime config for the externally maintained teikei map/search app.
// Exposed to the client via PUBLIC_ env vars (see .env.development / .env.production).
// PUBLIC_TEIKEI_EMBED switches between the old bundle (`legacy`, default,
// served from PUBLIC_TEIKEI_BUNDLES_URL) and the new loader-based embed
// (`loader`, served from PUBLIC_TEIKEI_EMBED_URL). It is a build-time switch:
// set it as a Dokku config var per app and rebuild.
export const teikeiConfig = {
  embed: (import.meta.env.PUBLIC_TEIKEI_EMBED === 'loader'
    ? 'loader'
    : 'legacy') as 'legacy' | 'loader',
  bundlesUrl: import.meta.env.PUBLIC_TEIKEI_BUNDLES_URL,
  embedUrl: import.meta.env.PUBLIC_TEIKEI_EMBED_URL,
  apiBaseUrl: import.meta.env.PUBLIC_TEIKEI_API_BASE_URL,
  assetsBaseUrl: import.meta.env.PUBLIC_TEIKEI_ASSETS_BASE_URL,
}
