import React from 'react'
import PropTypes from 'prop-types'
import zipObject from 'lodash/zipObject'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import './styles.scss'

const Partners = ({ partners, partnerImages }) => {
  const images = zipObject(
    partnerImages.edges.map(({ node }) => node.name),
    partnerImages.edges.map(({ node }) => node.childImageSharp),
  )

  return (
    <section className="et--partners bx--grid">
      {partners.map(({ title, items, id }) => (
        <div id={id} key={id} className="et--partners__group">
          <h3 className="et--partners__title">{title}</h3>
          <ul>
            {items.map(({ slug, name, url }) => (
              <li key={slug}>
                <a
                  className="et--partners__link"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GatsbyImage
                    image={getImage(images[slug])}
                    className="et--partners__logo"
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
  );
}

Partners.propTypes = {
  partners: PropTypes.arrayOf(PropTypes.object).isRequired,
  partnerImages: PropTypes.shape({ edges: PropTypes.array }).isRequired,
}

export default Partners

export const query = graphql`fragment partners on MarkdownRemark {
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

fragment partnerImages on Query {
  partnerImages: allFile(
    filter: {relativeDirectory: {eq: "assets/partners"}, extension: {eq: "png"}}
  ) {
    edges {
      node {
        name
        childImageSharp {
          gatsbyImageData(width: 400, placeholder: TRACED_SVG, layout: CONSTRAINED)
        }
      }
    }
  }
}
`
