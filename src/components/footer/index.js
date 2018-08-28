import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import './styles.scss'

const Footer = ({ t }) => (
  <footer href="/" className="et--footer">
    <div className="bx--grid">
      <div className="bx--row">
        <ul className="et--footer__nav">
          {t.footer.nav.map(({ text, href }) => (
            <li className="et--footer__nav__item" key={href}>
              <Link className="et--footer__link" to={href}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
        <a className="et--footer__logo" href="/">
          {t.footer.logo_alt}
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
      logo_alt
      nav {
        text
        href
      }
    }
  }
`
