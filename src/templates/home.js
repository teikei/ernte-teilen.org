import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Header from '../components/Header'
import OffCanvasMenu from '../components/OffCanvasMenu'
import Hero from '../components/Hero'
import TeaserGroup from '../components/TeaserGroup'
import CardCarousel from '../components/CardCarousel'
import TestimonialGroup from '../components/TestimonialGroup'
import Partners from '../components/Partners'
import Footer from '../components/Footer'

import '../styles/index.scss'

class IndexTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isMenuOpen: false }
  }

  toggleMenu = () => {
    this.setState(state => ({
      isMenuOpen: !state.isMenuOpen,
    }))
  }

  render = () => {
    const { isMenuOpen } = this.state
    const { data } = this.props
    const { frontmatter, html } = data.content

    return (
      <div id="outer-container">
        <OffCanvasMenu
          t={data.t}
          isOpen={isMenuOpen}
          pageWrapId="page-wrap"
          outerContainerId="outer-container"
        />
        <div id="page-wrap">
          <Header toggleMenu={this.toggleMenu} />
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
        </div>
      </div>
    )
  }
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
      ...offCanvasMenu
      ...footer
    }

    ...cardImages
    ...testimonialImages
    ...partnerImages
  }
`
