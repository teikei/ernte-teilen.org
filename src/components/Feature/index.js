import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import './styles.scss'

const Feature = ({ title, teaser, link }) => (
  <footer href="/" className="et--feature">
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-6">
          <h1 className="et--feature__title">
            {title}
          </h1>
          <p className="et--feature__teaser">
            {teaser}
          </p>
          <Link className="et--feature__link" to={link.href}>
            {link.text}
          </Link>
        </div>
      </div>
    </div>
  </footer>
)

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  teaser: PropTypes.string.isRequired,
  link: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
}

export default Feature
