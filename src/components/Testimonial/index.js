import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import './styles.scss'

const Testimonial = ({
  title, text, name, description, quote, image,
}) => (
  <article className="et--testimonial bx--grid">
    <div className="bx--row">
      <div className="bx--col-md-5">
        <blockquote className="et--testimonial__quote">
          {quote}
        </blockquote>
      </div>

      <div className="bx--col-md-3">
        <figure className="et--testimonial__figure">
          <Img sizes={image.sizes} alt="" />
          <figcaption>
            <p className="et--testimonial__name">
              {name}
            </p>
            <p className="et--testimonial__description">
              {description}
            </p>
          </figcaption>
        </figure>
      </div>
      <div className="bx--col-md-4">
        <h3 className="et--testimonial__title">
          {title}
        </h3>
        <p className="et--testimonial__text">
          {text}
        </p>
      </div>
    </div>
  </article>
)

Testimonial.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.shape({ sizes: PropTypes.object }).isRequired,
}

export default Testimonial
