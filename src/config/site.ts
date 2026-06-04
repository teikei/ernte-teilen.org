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
export const teikeiConfig = {
  bundlesUrl: import.meta.env.PUBLIC_TEIKEI_BUNDLES_URL,
  apiBaseUrl: import.meta.env.PUBLIC_TEIKEI_API_BASE_URL,
  assetsBaseUrl: import.meta.env.PUBLIC_TEIKEI_ASSETS_BASE_URL,
}
