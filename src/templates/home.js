import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Header from '../components/header'
import Hero from '../components/hero'
import TeaserGroup from '../components/TeaserGroup'
import CardCarousel from '../components/CardCarousel'
import TestimonialGroup from '../components/TestimonialGroup'
import Partners from '../components/Partners'
import Footer from '../components/footer'
import '../styles/index.scss'

const IndexTemplate = ({ data }) => {
  const { frontmatter, html } = data.content
  const { cardImages, testimonialImages, partnerImages } = data

  return (
    <div>
      <Header />
      <Hero content={html} claim={frontmatter.claim} />
      <TeaserGroup teasers={frontmatter.teasers} />
      <CardCarousel cards={frontmatter.cards} cardImages={cardImages.edges} />
      <TestimonialGroup
        testimonials={frontmatter.testimonials}
        testimonialImages={testimonialImages.edges}
      />

      <Partners partners={frontmatter.partners} partnerImages={partnerImages.edges} />

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
        }
        testimonials {
          slug
          title
          text
          quote
          name
          description
        }
        partners {
          title
          items {
            slug
            name
            url
          }
        }
      }
    }

    cardImages: allFile(
      filter: { relativeDirectory: { eq: "assets/cards" }, extension: { eq: "jpg" } }
    ) {
      edges {
        node {
          name
          childImageSharp {
            sizes(quality: 70) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }

    testimonialImages: allFile(
      filter: { relativeDirectory: { eq: "assets/testimonials" }, extension: { eq: "jpg" } }
    ) {
      edges {
        node {
          name
          childImageSharp {
            sizes(quality: 70) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }

    partnerImages: allFile(
      filter: { relativeDirectory: { eq: "assets/partners" }, extension: { eq: "png" } }
    ) {
      edges {
        node {
          name
          childImageSharp {
            sizes(quality: 70) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
