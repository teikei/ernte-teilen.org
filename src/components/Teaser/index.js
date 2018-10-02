import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import { Link } from 'gatsby'

const Teaser = ({
  title, text, slug, href,
}) => (
  <Link to={href} className={`et--teaser et--teaser--${slug}`}>
    <h3 className="et--teaser__title">
      {title}
    </h3>
    <p className="et--teaser__text">
      {text}
    </p>
  </Link>
)

Teaser.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default Teaser
