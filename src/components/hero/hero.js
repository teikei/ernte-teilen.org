import React from 'react'
import PropTypes from 'prop-types'

import './hero.scss'

const Hero = ({ content, claim }) => (
  <header className="et--hero">
    <div className="bx--grid">
      <div className="bx--row">
        <div className="et--hero__claim">
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <strong>
            {claim}
          </strong>
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
