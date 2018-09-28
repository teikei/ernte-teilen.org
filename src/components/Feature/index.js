import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import './styles.scss'

const Feature = ({
  title, lead, link, image,
}) => (
  <section className="et--feature">
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-md-5">
          <Img
            className="et--feature__image"
            fluid={image.childImageSharp.fluid}
            imgStyle={{ objectFit: 'contain' }}
            alt=""
          />
        </div>
        <div className="bx--col-sm-8 bx--col-md-7">
          <div className=" et--feature__content">
            <h1 className="et--feature__title">
              {title}
            </h1>
            <p className="et--feature__lead">
              {lead}
            </p>
            <Link className="et--feature__link" to={link.href}>
              {link.text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
)

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  lead: PropTypes.string.isRequired,
  link: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.shape().isRequired,
}

export default Feature
