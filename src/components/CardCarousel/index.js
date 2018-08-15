import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'react-responsive-carousel'

import './styles.scss'

const CardCarousel = ({ cards }) => (
  <Carousel showArrows={false} showThumbs={false} infiniteLoop>
    {cards.map(card => (
      <img alt="" src={card.img} />
    ))}
  </Carousel>
)

CardCarousel.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CardCarousel
