import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import './styles.scss'

const Testimonial = ({
  title, text, name, description, quote, image,
}) => (
  <article className="et--testimonial bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-5">
        <quote className="et--testimonial__quote">
          {quote}
        </quote>
      </div>

      <div className="bx--col-sm-3" key={title}>
        <Img sizes={image.sizes} alt="" />

        <h3 className="et--testimonial__name">
          {name}
          {description}
        </h3>
      </div>
    </div>
    <div className="bx--col-sm-4" key={title}>
      <h3 className="et--testimonial__title">
        {title}
      </h3>
      <p className="et--testimonial__text">
        {text}
      </p>
    </div>
  </article>
)

Testimonial.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.shape.isRequired,
}

export default Testimonial
