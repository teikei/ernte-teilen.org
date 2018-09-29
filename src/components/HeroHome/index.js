import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const HeroHome = ({ content }) => (
  <header className="et--hero-home">
    <div className="bx--grid">
      <div className="bx--row">
        <div className="et--hero-home__content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  </header>
)

HeroHome.propTypes = {
  content: PropTypes.string.isRequired,
}

export default HeroHome
