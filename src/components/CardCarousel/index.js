import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { Carousel } from 'react-responsive-carousel'
import zipObject from 'lodash/zipObject'

import Card from '../Card'
import './styles.scss'

class CardCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      images: zipObject(
        props.cardImages.map(({ node }) => node.name),
        props.cardImages.map(({ node }) => node.childImageSharp),
      ),
    }
  }

  onChange = (index) => {
    this.setState(() => ({ index }))
  }

  render = () => {
    const { cards } = this.props
    const { index, images } = this.state

    return (
      <div className="et--card-carousel">
        <Carousel
          className="et--card-carousel__slider"
          infiniteLoop
          autoPlay
          selectedItem={index}
          showStatus={false}
          showThumbs={false}
          interval={10000}
          onChange={this.onChange}
        >
          {cards.map(card => (
            <div className="et--card-carousel__slide" key={card.slug}>
              <div className="et--card-carousel__image">
                <Img sizes={images[card.slug].fluid} alt="" />
              </div>
            </div>
          ))}
        </Carousel>

        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--offset-md-5 bx--col-md-7 bx--offset-lg-7 bx--col-lg-5 bx--offset-xxl-8 bx--col-xxl-4">
              <Card
                title={cards[index].title}
                text={cards[index].text}
                currentIndex={index + 1}
                maxIndex={cards.length}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CardCarousel.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  cardImages: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CardCarousel

export const query = graphql`
  fragment cards on MarkdownRemark {
    frontmatter {
      cards {
        slug
        title
        text
      }
    }
  }
  fragment cardImages on Query {
    cardImages: allFile(
      filter: { relativeDirectory: { eq: "assets/cards" }, extension: { eq: "jpg" } }
    ) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
