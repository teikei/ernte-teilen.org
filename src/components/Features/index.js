import React from 'react'
import PropTypes from 'prop-types'
import zipObject from 'lodash/zipObject'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import './styles.scss'

const Features = ({ features, featureImages }) => {
  console.log(featureImages)

  const images = zipObject(
    featureImages.edges.map(({ node }) => node.name),
    featureImages.edges.map(({ node }) => node.childImageSharp),
  )

  return (
    <section className="et--features">
      <div className="bx--grid">
        <ul className="bx--row">
          {features.map(({ slug, title, text }) => (
            <li className="bx--col-md-4" key={slug}>
              <div className="et--features__item">
                <Img
                  className="et--features__image"
                  sizes={images[slug].resolutions}
                  imgStyle={{ objectFit: 'contain' }}
                  alt=""
                />
                <h3 className="et--features__title">
                  {title}
                </h3>
                <p className="et--features__text">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

Features.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
  featureImages: PropTypes.shape({ edges: PropTypes.array }).isRequired,
}

export default Features

export const query = graphql`
  fragment features on MarkdownRemark {
    frontmatter {
      partners {
        id
        title
        items {
          slug
          name
          url
        }
      }
    }
  }
  fragment featureImages on Query {
    featureImages: allFile(
      filter: { relativeDirectory: { eq: "assets/features" }, extension: { eq: "png" } }
    ) {
      edges {
        node {
          name
          childImageSharp {
            resolutions(width: 400) {
              ...GatsbyImageSharpResolutions_tracedSVG
            }
          }
        }
      }
    }
  }
`
