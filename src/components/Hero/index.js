import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const Hero = ({ title, lead, link }) => (
  <header className="et--hero">
    <div className="bx--grid">
      <div className="bx--row">
        <div className=" et--hero__content">
          <h1 className="et--hero__title">{title}</h1>
          <p className="et--hero__lead">{lead}</p>
          <a className="et--hero__link" href={link.href} target="_blank" rel="noopener noreferrer">
            {link.text}
          </a>
        </div>
      </div>
    </div>
  </header>
)

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  lead: PropTypes.string.isRequired,
  link: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
}

export default Hero
