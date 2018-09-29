import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PageWrapper from '../components/PageWrapper'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Search from '../components/Search'
import Footer from '../components/Footer'

import '../styles/index.scss'

const AboutTemplate = ({ data }) => {
  const { frontmatter, html } = data.content
  const {
    title, lead, link, features,
  } = frontmatter

  return (
    <PageWrapper t={data.t}>
      <Hero title={title} lead={lead} link={link} />
      <Features features={features} featureImages={data.featureImages} />
      <main className="et--markdown et--markdown--listing et--markdown--listing--wide">
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

AboutTemplate.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.object,
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

    t: localesYaml(locale: { eq: "de" }) {
      ...pageWrapper
      ...search
      ...footer
    }

    ...featureImages
  }
`
