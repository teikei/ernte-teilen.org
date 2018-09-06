import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import './styles.scss'

const Search = ({ t }) => (
  <div href="/" className="et--search">
    <div className="et--search__form">
      <div id="teikei-search" data-base-url="/karte/#" />
    </div>
  </div>
)

Search.propTypes = {
  t: PropTypes.shape().isRequired
}

export default Search

export const query = graphql`
  fragment search on LocalesYaml {
    search {
      label
    }
  }
`
