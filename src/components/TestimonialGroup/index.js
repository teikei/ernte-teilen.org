import React from 'react'
import PropTypes from 'prop-types'
import zipObject from 'lodash/zipObject'
import { graphql } from 'gatsby'

import Testimonal from '../Testimonial'
import './styles.scss'

const TestimonialGroup = ({ testimonials, testimonialImages }) => {
  const images = zipObject(
    testimonialImages.map(({ node }) => node.name),
    testimonialImages.map(({ node }) => node.childImageSharp),
  )

  return (
    <div className="et--testimonial-group">
      {testimonials.map(({
        slug, title, text, quote, name, description,
      }) => (
        <Testimonal
          key={slug}
          title={title}
          text={text}
          quote={quote}
          name={name}
          description={description}
          image={images[slug]}
        />
      ))}
    </div>
  )
}

TestimonialGroup.propTypes = {
  testimonials: PropTypes.arrayOf(PropTypes.object).isRequired,
  testimonialImages: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TestimonialGroup

export const query = graphql`
  fragment testimonials on MarkdownRemark {
    frontmatter {
      testimonials {
        slug
        title
        text
        quote
        name
        description
      }
    }
  }
  fragment testimonialImages on Query {
    testimonialImages: allFile(
      filter: { relativeDirectory: { eq: "assets/testimonials" }, extension: { eq: "jpg" } }
    ) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(quality: 70)
          }
        }
      }
    }
  }
`
