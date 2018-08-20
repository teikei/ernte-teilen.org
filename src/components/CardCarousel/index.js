import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'react-responsive-carousel'
import Img from 'gatsby-image'
import zipObject from 'lodash/zipObject'

import Card from '../Card'
import './styles.scss'

const CardCarousel = ({ cards, cardImages }) => {
  const cardImagesOptimized = zipObject(
    cardImages.map(({ node }) => node.name),
    cardImages.map(({ node }) => node.childImageSharp),
  )

  return (
    <div className="et--card-carousel">
      <Carousel infiniteLoop showThumbs={false} autoPlay interval={10000}>
        {cards.map(card => (
          <div className="et--card-carousel__slide" key={card.slug}>
            <div className="et--card-carousel__image">
              <Img sizes={cardImagesOptimized[card.slug].sizes} alt="" />
            </div>
            <div className="bx--grid">
              <div className="bx--row">
                <div className="bx--offset-md-5 bx--col-md-7 bx--offset-lg-7 bx--col-lg-5">
                  <Card title={card.title} tagline={card.tagline} text={card.text} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

CardCarousel.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  cardImages: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CardCarousel
