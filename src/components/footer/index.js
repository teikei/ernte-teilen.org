import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import './styles.scss'

const Footer = ({ t }) => (
  <footer href="/" className="et--footer">
    <div className="bx--grid">
      <div className="bx--row">
        <a className="et--footer__logo" href="/">
          {t.footer.logo}
        </a>
      </div>
    </div>
  </footer>
)

Footer.propTypes = {
  t: PropTypes.shape().isRequired,
}

export default Footer

export const query = graphql`
  fragment footer on LocalesYaml {
    locale
    footer {
      logo
    }
  }
`
