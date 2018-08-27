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
    <section className="et--partners bx--grid">
      {partners.map(({ title, items, id }) => (
        <div id={id} key={id} className="et--partners__group">
          <h3 className="et--partners__title">
            {title}
          </h3>
          <ul>
            {items.map(({ slug, name, url }) => (
              <li key={slug}>
                <a
                  className="et--partners__link"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Img
                    className="et--partners__logo"
                    sizes={images[slug].resolutions}
                    imgStyle={{ objectFit: 'contain' }}
                    alt={name}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

Partners.propTypes = {
  partners: PropTypes.arrayOf(PropTypes.object).isRequired,
  partnerImages: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Partners
