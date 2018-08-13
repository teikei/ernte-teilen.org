import React from 'react'
import './styles.scss'

export default () => (
  <header className="et--header">
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
        </ul>
      </div>
    </div>
  </header>
)