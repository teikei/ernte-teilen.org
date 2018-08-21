import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const Testimonial = ({
  title, text, name, description, quote,
}) => (
  <article className="et--testimonial bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4" key={title}>
        <h3 className="et--testimonial__title">
          {title}
        </h3>
        <p className="et--testimonial__text">
          {text}
        </p>
      </div>
      <div className="bx--col-sm-4" key={title}>
        <h3 className="et--testimonial__name">
          {name}
          {description}
        </h3>
        <p className="et--testimonial__quote">
          {quote}
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
}

export default Testimonial
