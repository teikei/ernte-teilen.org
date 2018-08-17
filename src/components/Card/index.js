import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const Card = ({ tagline, title, text }) => (
  <article className="et--card">
    <h2>
      <span className="et--card__tagline">
        {tagline}
      </span>
      <span className="et--card__title">
        {title}
      </span>
    </h2>
    <p className="et--card__text">
      {text}
    </p>
  </article>
)

Card.propTypes = {
  tagline: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Card
