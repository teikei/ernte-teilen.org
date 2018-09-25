import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const Card = ({
  title, text, currentIndex, maxIndex,
}) => (
  <article className="et--card">
    <h2>
      <span className="et--card__title">
        {title}
      </span>
    </h2>
    <p className="et--card__text">
      {text}
    </p>
    <span className="et--card__index">
      {`${currentIndex} / ${maxIndex}`}
    </span>
  </article>
)

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  maxIndex: PropTypes.number.isRequired,
}

export default Card
