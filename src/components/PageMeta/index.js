import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

const PageMeta = ({
  title, description, pathname, image,
}) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            defaultImage
            twitterAccount
          }
        }
      }
    `}
    render={({ site: { siteMetadata } }) => {
      const pageTitle = title || siteMetadata.title
      const pageDescription = description || siteMetadata.description
      const pageUrl = `${siteMetadata.siteUrl}${pathname}`
      const pageImage = image || siteMetadata.defaultImage

      const schemaOrgJSONLD = [
        {
          '@context': 'http://schema.org',
          '@type': 'WebSite',
          url: pageUrl,
          name: pageTitle,
        },
      ]

      return (
        <Helmet>
          <title>{title ? `${title} | ${siteMetadata.title}` : pageTitle}</title>

          {/* General tags */}
          <meta name="description" content={pageDescription} />
          <meta name="image" content={pageImage} />

          {/* Schema.org tags */}
          <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

          {/* OpenGraph tags */}
          <meta property="og:url" content={pageUrl} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:image" content={pageImage} />

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content={siteMetadata.twitterAccount} />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          <meta name="twitter:image" content={pageImage} />
        </Helmet>
      )
    }}
  />
)

PageMeta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  image: PropTypes.string,
}

PageMeta.defaultProps = {
  title: null,
  description: null,
  image: null,
}

export default PageMeta
