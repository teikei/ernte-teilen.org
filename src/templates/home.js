import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

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
  location,
  data: {
    t,
    content: { frontmatter, html },
    partnerImages,
    cardImages,
    testimonialImages,
    searchConfig,
  },
}) => (
  <PageWrapper t={t}>
    <Helmet defaultTitle="Ernte teilen!" titleTemplate="%s | Ernte teilen!">
      <meta name="twitter:site" content="@ernteteilen" />
      <meta name="og:type" content="website" />
      <meta name="og:site_name" content="Ernte teilen!" />
      <link rel="canonical" href={`https://ernteteilen.org${location.pathname}`} />
      <html lang="de" />
    </Helmet>

    <HeroHome content={html} claim={frontmatter.claim} />
    <Search t={t} searchConfig={searchConfig} />
    <main>
      <TeaserGroup teasers={frontmatter.teasers} />
      <CardCarousel cards={frontmatter.cards} cardImages={cardImages.edges} />
      <TestimonialGroup
        testimonials={frontmatter.testimonials}
        testimonialImages={testimonialImages.edges}
      />
      <Partners partners={frontmatter.partners} partnerImages={partnerImages} />
    </main>
    <Footer t={t} />
  </PageWrapper>
)

IndexTemplate.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
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
