import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PageWrapper from '../components/PageWrapper'
import Footer from '../components/Footer'
import '../styles/index.scss'

const IndexTemplate = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <PageWrapper t={data.t}>
      <main className="et--main">
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
  data: PropTypes.shape({
    html: PropTypes.string,
    frontmatter: PropTypes.shape({
      title: PropTypes.string
    })
  }).isRequired
}

export default IndexTemplate

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }

    t: localesYaml(locale: { eq: "de" }) {
      ...pageWrapper
      ...footer
    }
  }
`
