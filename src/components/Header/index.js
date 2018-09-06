import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.scss'

const Header = ({ openMenu, fixed }) => (
  <header className={classNames({ 'et--header': true, 'et--header--fixed': fixed })}>
    <div className="bx--grid">
      <div className="et--header__container bx--row">
        <a className="et--header__logo" href="/">
          {'Ernte teilen'}
        </a>

        <ul className="et--header__nav">
          <li>
            <a className="et--header__nav-item" href="/">
              {'Was ist Solawi?'}
            </a>
          </li>
          <li>
            <a className="et--header__nav-item" href="/">
              {'Mitmachen'}
            </a>
          </li>
          <li>
            <a className="et--header__btn" href="/">
              {'Login'}
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
              {'Menu'}
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
  openMenu: PropTypes.func.isRequired,
  fixed: PropTypes.bool,
}

export default Header
