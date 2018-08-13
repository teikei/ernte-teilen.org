import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const Hero = ({ content, claim }) => (
  <header className="et--hero">
    <div className="bx--grid">
      <div className="bx--row">
        <div className="et--hero__content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  </header>
)

Hero.propTypes = {
  claim: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default Hero
