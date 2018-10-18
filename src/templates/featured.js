import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PageWrapper from '../components/PageWrapper'
import PageMeta from '../components/PageMeta'
import HeroFeatured from '../components/HeroFeatured'
import Search from '../components/Search'
import Footer from '../components/Footer'

import '../styles/index.scss'

const FeaturedTemplate = ({
  location,
  data: {
    t,
    searchConfig,
    image,
    content: {
      frontmatter: { title, lead, link },
      html,
    },
  },
}) => (
  <PageWrapper t={t}>
    <PageMeta pathname={location.pathname} title={title} description={lead} />
    <HeroFeatured image={image} title={title} lead={lead} link={link} />
    <main className="et--markdown et--markdown--listing">
      <div className="bx--grid">
        <div className="bx--row">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </main>
    <Search t={t} searchConfig={searchConfig} />
    <Footer t={t} />
  </PageWrapper>
)

FeaturedTemplate.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    content: PropTypes.object,
    searchConfig: PropTypes.object,
    image: PropTypes.object,
    t: PropTypes.object,
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

    searchConfig: site {
      ...searchConfig
    }

    t: localesYaml(locale: { eq: "de" }) {
      ...pageWrapper
      ...search
      ...footer
    }
  }
`
