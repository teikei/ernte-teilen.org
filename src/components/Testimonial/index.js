import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import './styles.scss'

const Testimonial = ({ title, text, name, description, quote, image }) => (
  <article className="et--testimonial">
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-10 bx--col-md-5">
          <blockquote className="et--testimonial__quote">{quote}</blockquote>
        </div>
        <div className="bx--col-md-3">
          <figure className="et--testimonial__figure">
            <GatsbyImage
              className="et--testimonial__figure__image"
              image={getImage(image)}
              alt=""
            />
            <figcaption>
              <p className="et--testimonial__name">{name}</p>
              <p className="et--testimonial__description">{description}</p>
            </figcaption>
          </figure>
        </div>
        <div className="bx--col-md-4">
          <h3 className="et--testimonial__title">{title}</h3>
          <p className="et--testimonial__text">{text}</p>
        </div>
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
