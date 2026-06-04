require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-transformer-yaml',
    'gatsby-transformer-remark',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
  ],
  siteMetadata: {
    title: 'ernte-teilen.org',
    siteUrl: 'https://ernte-teilen.org',
    defaultImage: '/img/social_home.jpg',
    twitterAccount: '@ernteteilen',
    description:
      'Hier finden Landwirte und Verbraucher zusammen, die sich an Solidarischer Landwirtschaft beteiligen möchten.',
    apiBaseUrl: process.env.GATSBY_TEIKEI_API_BASE_URL,
    assetsBaseUrl: process.env.GATSBY_TEIKEI_ASSETS_BASE_URL,
  },
}
