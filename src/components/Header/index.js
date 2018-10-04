import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { graphql, Link } from 'gatsby'

import './styles.scss'

const Header = ({ openMenu, fixed, t }) => (
  <header className={classNames({ 'et--header': true, 'et--header--fixed': fixed })}>
    <div className="bx--grid">
      <div className="et--header__container bx--row">
        <Link className="et--header__logo" to="/">
          {t.header.logo_alt}
        </Link>

        <ul className="et--header__nav">
          {t.header.nav.map(({ text, href }) => (
            <li>
              <Link className="et--header__nav-item" to={href}>
                {text}
              </Link>
            </li>
          ))}
          <li>
            <a className="et--header__btn" href="/karte#/users/sign-in">
              {t.header.login}
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={openMenu}
              className="et--header__hamburger"
              aria-expanded="false"
              aria-controls="menu"
            >
              {t.header.menu}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
)

Header.defaultProps = {
  fixed: false,
}

Header.propTypes = {
  t: PropTypes.shape().isRequired,
  openMenu: PropTypes.func.isRequired,
  fixed: PropTypes.bool,
}

export default Header

export const query = graphql`
  fragment header on LocalesYaml {
    locale
    header {
      logo_alt
      login
      menu
      nav {
        text
        href
      }
    }
  }
`
