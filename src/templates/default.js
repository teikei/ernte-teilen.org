import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/index.scss'

const IndexTemplate = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <div>
      <Header />
      <main className="et--main">
        <div className="bx--grid">
          <div className="bx--row">
            <h1>
              {frontmatter.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

IndexTemplate.propTypes = {
  data: PropTypes.shape({
    html: PropTypes.string,
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
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
      }
    }
  }
`
