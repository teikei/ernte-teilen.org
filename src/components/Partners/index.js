import React from 'react'
import PropTypes from 'prop-types'
import zipObject from 'lodash/zipObject'
import Img from 'gatsby-image'

import './styles.scss'

const Partners = ({ partners, partnerImages }) => {
  const images = zipObject(
    partnerImages.map(({ node }) => node.name),
    partnerImages.map(({ node }) => node.childImageSharp),
  )

  return (
    <div className="et--partners">
      <h3>
        {partners[0].title}
      </h3>
      {partners[0].items.map(({ slug, name, url }) => (
        <a key={slug} href={url} className="et--partners__link">
          <Img sizes={images[slug].sizes} alt={name} />
        </a>
      ))}
    </div>
  )
}

Partners.propTypes = {
  partners: PropTypes.arrayOf(PropTypes.object).isRequired,
  partnerImages: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Partners
