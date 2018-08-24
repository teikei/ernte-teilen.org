import React from 'react'
import PropTypes from 'prop-types'
import zipObject from 'lodash/zipObject'

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
