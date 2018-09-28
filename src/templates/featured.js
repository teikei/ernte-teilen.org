import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PageWrapper from '../components/PageWrapper'
import Feature from '../components/Feature'
import Search from '../components/Search'
import Footer from '../components/Footer'

import '../styles/index.scss'

const FeaturedTemplate = ({ data }) => {
  const { frontmatter, html } = data.content
  const { title, lead, link } = frontmatter

  return (
    <PageWrapper t={data.t}>
      <Feature image={data.image} title={title} lead={lead} link={link} />
      <main className="et--markdown et--markdown--listing">
        <div className="bx--grid">
          <div className="bx--row">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </main>
      <Search t={data.t} />
      <Footer t={data.t} />
    </PageWrapper>
  )
}

FeaturedTemplate.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.object,
    files: PropTypes.object,
  }).isRequired,
}

export default FeaturedTemplate

export const query = graphql`
  query($slug: String!, $image: String!) {
    content: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        lead
        link {
          text
          href
        }
      }
    }

    image: file(relativePath: { eq: $image }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }

    t: localesYaml(locale: { eq: "de" }) {
      ...pageWrapper
      ...search
      ...footer
    }
  }
`
