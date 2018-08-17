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
  const { frontmatter, html } = data.content
  const { cardImages } = data.files

  return (
    <div>
      <Header />
      <Hero content={html} claim={frontmatter.claim} />
      <TeaserGroup teasers={frontmatter.teasers} />
      <CardCarousel cards={frontmatter.cards} cardImages={cardImages} />
      <Footer />
    </div>
  )
}

IndexTemplate.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.object,
    files: PropTypes.object,
  }).isRequired,
}

export default IndexTemplate

export const query = graphql`
  query($slug: String!) {
    content: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        teasers {
          title
          text
        }
        cards {
          slug
          tagline
          title
          text
          img
        }
      }
    }

    files: allFile(
      filter: { relativeDirectory: { eq: "assets/cards" }, extension: { eq: "jpg" } }
    ) {
      cardImages: edges {
        node {
          name
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            sizes(quality: 70) {
              # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
