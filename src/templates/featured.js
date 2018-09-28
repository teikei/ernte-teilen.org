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
  const { title, teaser, link } = frontmatter

  return (
    <PageWrapper t={data.t}>
      <Feature title={title} teaser={teaser} link={link} />
      <main>
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
  query($slug: String!) {
    content: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        teaser
        link {
          text
          href
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
