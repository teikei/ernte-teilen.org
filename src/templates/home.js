import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PageWrapper from '../components/PageWrapper'
import Hero from '../components/Hero'
import TeaserGroup from '../components/TeaserGroup'
import CardCarousel from '../components/CardCarousel'
import TestimonialGroup from '../components/TestimonialGroup'
import Partners from '../components/Partners'
import Footer from '../components/Footer'

import '../styles/index.scss'

const IndexTemplate = ({ data }) => {
  const { frontmatter, html } = data.content

  return (
    <PageWrapper t={data.t}>
      <Hero content={html} claim={frontmatter.claim} />
      <main>
        <TeaserGroup teasers={frontmatter.teasers} />
        <CardCarousel cards={frontmatter.cards} cardImages={data.cardImages.edges} />
        <TestimonialGroup
          testimonials={frontmatter.testimonials}
          testimonialImages={data.testimonialImages.edges}
        />
        <Partners partners={frontmatter.partners} partnerImages={data.partnerImages} />
      </main>
      <Footer t={data.t} />
    </PageWrapper>
  )
}

IndexTemplate.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.object,
    files: PropTypes.object,
  }).isRequired,
}

export default IndexTemplate

export const query = graphql`
  query($slug: String!) {
    content: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      ...teasers
      ...cards
      ...testimonials
      ...partners
    }

    t: localesYaml(locale: { eq: "de" }) {
      ...pageWrapper
      ...footer
    }

    ...cardImages
    ...testimonialImages
    ...partnerImages
  }
`
