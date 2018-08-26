import React from 'react'
import PropTypes from 'prop-types'
import zipObject from 'lodash/zipObject'
import Img from 'gatsby-image'

import './styles.scss'

const PartnersGroup = ({ title, items, images }) => (
  <div className="et--partners__group">
    <h3 className="et--partners__title">
      {title}
    </h3>
    <ul>
      {items.map(({ slug, name, url }) => (
        <li>
          <a className="et--partners__link" key={slug} href={url}>
            <Img
              className="et--partners__logo"
              sizes={images[slug].resolutions}
              imgStyle={{ 'object-fit': 'contain' }}
              alt={name}
            />
          </a>
        </li>
      ))}
    </ul>
  </div>
)

const Partners = ({ partners, partnerImages }) => {
  const images = zipObject(
    partnerImages.map(({ node }) => node.name),
    partnerImages.map(({ node }) => node.childImageSharp),
  )

  return (
    <div className="et--partners bx--grid">
      {partners.map(({ title, items }) => PartnersGroup({ title, items, images }))}
    </div>
  )
}

Partners.propTypes = {
  partners: PropTypes.arrayOf(PropTypes.object).isRequired,
  partnerImages: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Partners
