import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Header from '../components/header'
import Hero from '../components/hero'
import TeaserGroup from '../components/TeaserGroup'
import CardCarousel from '../components/CardCarousel'
import TestimonialGroup from '../components/TestimonialGroup'
import Partners from '../components/Partners'
import Footer from '../components/footer'

import '../styles/index.scss'

const IndexTemplate = ({ data }) => {
  const { frontmatter, html } = data.content
  const { cardImages, testimonialImages, partnerImages } = data

  return (
    <div>
      <Header />
      <Hero content={html} claim={frontmatter.claim} />

      <main>
        <TeaserGroup teasers={frontmatter.teasers} />
        <CardCarousel cards={frontmatter.cards} cardImages={cardImages.edges} />
        <TestimonialGroup
          testimonials={frontmatter.testimonials}
          testimonialImages={testimonialImages.edges}
        />
        <Partners partners={frontmatter.partners} partnerImages={partnerImages} />
      </main>

      <Footer t={data.t} />
    </div>
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
      ...footer
    }

    ...cardImages
    ...testimonialImages
    ...partnerImages
  }
`
