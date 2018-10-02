import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Teaser from '../Teaser'
import './styles.scss'

const TeaserGroup = ({ teasers }) => (
  <div className="et--teaser-group bx--grid">
    <div className="bx--row">
      {teasers.map(({
        title, text, slug, href,
      }) => (
        <div className="bx--col-sm-4" key={title}>
          <Teaser title={title} text={text} slug={slug} href={href} />
        </div>
      ))}
    </div>
  </div>
)

TeaserGroup.propTypes = {
  teasers: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default TeaserGroup

export const query = graphql`
  fragment teasers on MarkdownRemark {
    frontmatter {
      teasers {
        slug
        title
        text
        href
      }
    }
  }
`
