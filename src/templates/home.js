import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Header from '../components/header'
import Hero from '../components/hero'
import TeaserGroup from '../components/TeaserGroup'
import CardCarousel from '../components/CardCarousel'
import Footer from '../components/footer'
import '../styles/index.scss'

const IndexTemplate = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <div>
      <Header />
      <Hero content={html} claim={frontmatter.claim} />
      <TeaserGroup teasers={frontmatter.teasers} />
      <CardCarousel cards={frontmatter.cards} />
      <Footer />
    </div>
  )
}

IndexTemplate.propTypes = {
  data: PropTypes.shape({
    html: PropTypes.string,
    frontmatter: PropTypes.shape({
      teasers: PropTypes.array,
      cards: PropTypes.array,
    }),
  }).isRequired,
}

export default IndexTemplate

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        teasers {
          title
          text
        }
        cards {
          img
        }
      }
    }
  }
`
