import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PageWrapper from '../components/PageWrapper'
import PageMeta from '../components/PageMeta'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Search from '../components/Search'
import Footer from '../components/Footer'

import '../styles/index.scss'

const AboutTemplate = ({
  location,
  data: {
    t,
    searchConfig,
    featureImages,
    content: {
      frontmatter: {
        title, lead, link, features,
      },
      html,
    },
  },
}) => (
  <PageWrapper t={t}>
    <PageMeta pathname={location.pathname} title={title} description={lead} />
    <Hero title={title} lead={lead} link={link} />
    <Features features={features} featureImages={featureImages} />
    <main className="et--markdown et--markdown--listing et--markdown--listing--wide">
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

AboutTemplate.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    content: PropTypes.object,
    searchConfig: PropTypes.object,
    featureImages: PropTypes.object,
    t: PropTypes.object,
  }).isRequired,
}

export default AboutTemplate

export const query = graphql`
  query($slug: String!) {
    content: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        lead
        link {
          text
          href
        }
        features {
          slug
          title
          text
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

    ...featureImages
  }
`
