import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PageWrapper from '../components/PageWrapper'

import '../styles/index.scss'

const IndexTemplate = ({
  data: {
    t,
    site: {
      siteMetadata: { apiBaseUrl, assetsBaseUrl }
    }
  }
}) => (
  <PageWrapper t={t} fixedHeader>
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

IndexTemplate.propTypes = {
  data: PropTypes.shape().isRequired
}

export default IndexTemplate

export const query = graphql`
  query($slug: String!) {
    content: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
