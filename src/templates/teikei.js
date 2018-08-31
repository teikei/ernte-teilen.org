import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PageWrapper from '../components/PageWrapper'

import '../styles/index.scss'

const IndexTemplate = ({ data }) => (
  <PageWrapper t={data.t}>
    <div
      id="teikei-embed"
      data-locale="de"
      data-base-url="/karte/#"
      data-country="DE"
      data-api-base-url="https://api-staging.teikei.allmende.io"
      data-assets-base-url="https://map-staging.teikei.allmende.io/assets"
    />
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

    t: localesYaml(locale: { eq: "de" }) {
      ...pageWrapper
    }
  }
`
