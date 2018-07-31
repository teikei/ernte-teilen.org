import React from 'react'
import PropTypes from 'prop-types'
import './teaser.scss'

const Teaser = ({ title }) => (
  <a href="/" className="teaser">
    <h3 className="teaser__title">
      {title}
    </h3>
  </a>
)

Teaser.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Teaser
