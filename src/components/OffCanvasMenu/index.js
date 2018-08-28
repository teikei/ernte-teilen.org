import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { slide as Slide } from 'react-burger-menu'

import './styles.scss'

const OffCanvasMenu = ({
  t, isOpen, pageWrapId, outerContainerId,
}) => (
  <Slide
    customBurgerIcon={false}
    pageWrapId={pageWrapId}
    outerContainerId={outerContainerId}
    right
    isOpen={isOpen}
  >
    <ul className="et--off-canvas-menu__nav">
      {t.offCanvasMenu.nav.map(({ text, href }) => (
        <li className="et--off-canvas-menu__item" key={href}>
          <Link className="et--off-canvas-menu__link" to={href}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  </Slide>
)

OffCanvasMenu.propTypes = {
  t: PropTypes.shape().isRequired,
  pageWrapId: PropTypes.string.isRequired,
  outerContainerId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default OffCanvasMenu

export const query = graphql`
  fragment offCanvasMenu on LocalesYaml {
    offCanvasMenu {
      nav {
        text
        href
      }
    }
  }
`
