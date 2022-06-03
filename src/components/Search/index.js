import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import './styles.scss'

const Search = ({
  t,
  searchConfig: {
    siteMetadata: { assetsBaseUrl, apiBaseUrl },
  },
}) => (
  <div href="/" className="et--search">
    <div className="et--search__form">
      <label className="et--search__label">
        {t.search.label}
        <div
          className="et--search__input"
          id="teikei-search"
          data-locale="de"
          data-country="DE"
          data-base-url="/karte/#"
          data-api-base-url={apiBaseUrl}
          data-assets-base-url={assetsBaseUrl}
        />
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
  fragment searchConfig on Site {
    siteMetadata {
      apiBaseUrl
      assetsBaseUrl
    }
  }
`
