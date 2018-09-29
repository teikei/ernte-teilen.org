import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import './styles.scss'

const HeroFeatured = ({
  title, lead, link, image,
}) => (
  <section className="et--hero-featured">
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-md-5">
          <Img
            className="et--hero-featured__image"
            fluid={image.childImageSharp.fluid}
            imgStyle={{ objectFit: 'contain' }}
            alt=""
          />
        </div>
        <div className="bx--col-sm-8 bx--col-md-7">
          <div className=" et--hero-featured__content">
            <h1 className="et--hero-featured__title">
              {title}
            </h1>
            <p className="et--hero-featured__lead">
              {lead}
            </p>
            <Link className="et--hero-featured__link" to={link.href}>
              {link.text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
)

HeroFeatured.propTypes = {
  title: PropTypes.string.isRequired,
  lead: PropTypes.string.isRequired,
  link: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.shape().isRequired,
}

export default HeroFeatured
