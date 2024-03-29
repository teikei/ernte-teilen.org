import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'

import './styles.scss'

const OffCanvasMenu = ({
  t,
  isOpen,
  closeMenu,
  pageWrapId,
  outerContainerId,
}) => (
  <Menu
    className="et--off-canvas-menu"
    customBurgerIcon={false}
    pageWrapId={pageWrapId}
    outerContainerId={outerContainerId}
    right
    isOpen={isOpen}
  >
    <button
      className="et--off-canvas-menu__close"
      type="button"
      onClick={closeMenu}
    >
      {t.offCanvasMenu.close}
    </button>
    <ul className="et--off-canvas-menu__nav">
      {t.offCanvasMenu.nav.map(({ text, href }) => (
        <li className="et--off-canvas-menu__item" key={href}>
          <Link
            className="et--off-canvas-menu__link"
            to={href}
            onClick={closeMenu}
          >
            {text}
          </Link>
        </li>
      ))}
    </ul>
    <a
      className="et--external-teaser"
      href="https://ernteteilen-der-film.de/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Jetzt ansehen:
      <b>Solawi-Dokumentarfilm »Ernte&nbsp;teilen«</b>
    </a>
  </Menu>
)

OffCanvasMenu.propTypes = {
  t: PropTypes.shape().isRequired,
  pageWrapId: PropTypes.string.isRequired,
  outerContainerId: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default OffCanvasMenu

export const query = graphql`
  fragment offCanvasMenu on LocalesYaml {
    offCanvasMenu {
      close
      nav {
        text
        href
      }
    }
  }
`
