import React from 'react'
import PropTypes from 'prop-types'
import Testimonal from '../Testimonial'
import './styles.scss'

const TestimonialGroup = ({ testimonials }) => (
  <div className="et--testimonials-group">
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
      />
    ))}
  </div>
)

TestimonialGroup.propTypes = {
  testimonials: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TestimonialGroup
