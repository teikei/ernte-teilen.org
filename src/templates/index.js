import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Header from '../components/header/header'
import Hero from '../components/hero/hero'
import TeaserGroup from '../components/TeaserGroup'
import Footer from '../components/footer/footer'
import '../styles/index.scss'

const IndexTemplate = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <div>
      <Header />
      <Hero content={html} claim={frontmatter.claim} />
      <TeaserGroup teasers={frontmatter.teasers} />
      <Footer />
    </div>
  )
}

IndexTemplate.propTypes = {
  data: PropTypes.shape({
    html: PropTypes.string,
    frontmatter: PropTypes.shape({
      claim: PropTypes.string,
      teasers: PropTypes.array,
    }),
  }).isRequired,
}

export default IndexTemplate

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        claim
        teasers {
          title
          text
        }
      }
    }
  }
`
