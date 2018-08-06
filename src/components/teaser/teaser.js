import React from 'react'
import PropTypes from 'prop-types'
import './teaser.scss'

import logo from '../../assets/img/teaser_membership.png'

const Teaser = ({ title, text, imageSrc }) => (
  <a href="/" className="et--teaser">
    <img className="et--teaser__image" src={logo} alt="Logo" />
    <h3 className="et--teaser__title">
      {title}
    </h3>
    <img className="et--teaser__image" src={imageSrc} alt="" />
    <p className="et--teaser__text">
      {text}
    </p>
  </a>
)

Teaser.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
}

export default Teaser
