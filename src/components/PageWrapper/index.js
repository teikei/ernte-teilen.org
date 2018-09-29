import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Header from '../Header'
import OffCanvasMenu from '../OffCanvasMenu'

class PageWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isMenuOpen: false }
  }

  openMenu = () => {
    this.setState({
      isMenuOpen: true,
    })
  }

  closeMenu = () => {
    this.setState({
      isMenuOpen: false,
    })
  }

  render = () => {
    const { isMenuOpen } = this.state
    const { children, t, fixedHeader } = this.props

    return (
      <div id="outer-container">
        <OffCanvasMenu
          t={t}
          closeMenu={this.closeMenu}
          isOpen={isMenuOpen}
          pageWrapId="page-wrap"
          outerContainerId="outer-container"
        />
        <div id="page-wrap">
          <Header t={t} openMenu={this.openMenu} fixed={fixedHeader} />
          {children}
        </div>
      </div>
    )
  }
}

PageWrapper.defaultProps = {
  fixedHeader: false,
}

PageWrapper.propTypes = {
  t: PropTypes.shape().isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  fixedHeader: PropTypes.bool,
}

export default PageWrapper

export const query = graphql`
  fragment pageWrapper on LocalesYaml {
    ...header
    ...offCanvasMenu
  }
`
