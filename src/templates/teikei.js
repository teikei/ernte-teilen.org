import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PageWrapper from '../components/PageWrapper'
import PageMeta from '../components/PageMeta'

import '../styles/index.scss'

const TeikeiTemplate = ({
  location,
  data: {
    t,
    content: {
      frontmatter: { title },
    },
    site: {
      siteMetadata: { apiBaseUrl, assetsBaseUrl },
    },
  },
}) => (
  <PageWrapper t={t} fixedHeader>
    <PageMeta pathname={location.pathname} title={title} />
    <div
      id="teikei-app"
      data-locale="de"
      data-base-url="/karte#"
      data-country="DE"
      data-api-base-url={apiBaseUrl}
      data-assets-base-url={assetsBaseUrl}
    />
  </PageWrapper>
)

TeikeiTemplate.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape().isRequired,
}

export default TeikeiTemplate

export const query = graphql`
  query ($slug: String!) {
    content: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    site {
      siteMetadata {
        apiBaseUrl
        assetsBaseUrl
      }
    }
    t: localesYaml(locale: { eq: "de" }) {
      ...pageWrapper
    }
  }
`
