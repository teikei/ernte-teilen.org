import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import './styles.scss'

const Search = ({ t }) => (
  <div href="/" className="et--search">
    <div className="et--search__form">
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label className="et--search__label">
        {t.search.label}
        <div className="et--search__input" id="teikei-search" data-base-url="/karte/#" />
      </label>
    </div>
  </div>
)

Search.propTypes = {
  t: PropTypes.shape().isRequired,
}

export default Search

export const query = graphql`
  fragment search on LocalesYaml {
    search {
      label
    }
  }
`
