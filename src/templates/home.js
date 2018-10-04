import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PageWrapper from '../components/PageWrapper'
import HeroHome from '../components/HeroHome'
import Search from '../components/Search'
import TeaserGroup from '../components/TeaserGroup'
import CardCarousel from '../components/CardCarousel'
import TestimonialGroup from '../components/TestimonialGroup'
import Partners from '../components/Partners'
import Footer from '../components/Footer'

import '../styles/index.scss'

const IndexTemplate = ({
  data: {
    t,
    content: { frontmatter, html },
    partnerImages,
    cardImages,
    testimonialImages,
    searchConfig
  }
}) => {
  return (
    <PageWrapper t={t}>
      <HeroHome content={html} claim={frontmatter.claim} />
      <Search t={t} searchConfig={searchConfig} />
      <main>
        <TeaserGroup teasers={frontmatter.teasers} />
        <CardCarousel
          cards={frontmatter.cards}
          cardImages={cardImages.edges}
        />
        <TestimonialGroup
          testimonials={frontmatter.testimonials}
          testimonialImages={testimonialImages.edges}
        />
        <Partners
          partners={frontmatter.partners}
          partnerImages={partnerImages}
        />
      </main>
      <Footer t={t} />
    </PageWrapper>
  )
}

IndexTemplate.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.object,
    files: PropTypes.object
  }).isRequired
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
      ...search
      ...footer
    }

    searchConfig: site {
      ...searchConfig
    }

    ...cardImages
    ...testimonialImages
    ...partnerImages
  }
`
