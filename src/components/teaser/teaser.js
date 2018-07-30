import React from 'react'
import './teaser.scss'

export default ({ title }) => (
  <a href="/" className="teaser">
    <h3 className="teaser__title">
      {title}
    </h3>
  </a>
)
