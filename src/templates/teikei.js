import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PageWrapper from '../components/PageWrapper'

import '../styles/index.scss'

const IndexTemplate = ({
  data: {
    t,
    site: {
      siteMetadata: { apiBaseUrl, assetsBaseUrl },
    },
  },
}) => (
  <PageWrapper t={t}>
    <main className="et--markdown">
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-8">
            <div>
              <h1>Wartungsmodus</h1>
              <p>
                Die Karte ist vorübergehend nicht erreichbar. Wir sind gleich wieder für Euch da!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </PageWrapper>
)

IndexTemplate.propTypes = {
  data: PropTypes.shape().isRequired,
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
