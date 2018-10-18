import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PageWrapper from '../components/PageWrapper'
import PageMeta from '../components/PageMeta'

import Footer from '../components/Footer'
import '../styles/index.scss'

const IndexTemplate = ({ location, data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <PageWrapper t={data.t}>
      <PageMeta
        pathname={location.pathname}
        title={frontmatter.title}
        image={frontmatter.metaImage}
      />
      <main className="et--markdown">
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-sm-8">
              <h1>{frontmatter.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </div>
      </main>
      <Footer t={data.t} />
    </PageWrapper>
  )
}

IndexTemplate.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    html: PropTypes.string,
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      metaImage: PropTypes.string,
    }),
  }).isRequired,
}

export default IndexTemplate

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        metaImage
      }
    }

    t: localesYaml(locale: { eq: "de" }) {
      ...header
      ...pageWrapper
      ...footer
    }
  }
`
