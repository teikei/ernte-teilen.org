import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/header/header'
import Hero from '../components/hero/hero'
import Teaser from '../components/teaser/teaser'
import Footer from '../components/footer/footer'
import '../styles/index.scss'

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <div>
      <h1>
        {post.frontmatter.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <Header />
      <Hero />
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4">
            <Teaser title="Beitreten" text="Du möchtest bei einer Solawi mitmachen?" />
          </div>
          <div className="bx--col-sm-4">
            <Teaser
              title="Mitglieder finden"
              text="Du suchst nach Mitgliedern für deinen Betrieb?"
            />
          </div>
          <div className="bx--col-sm-4">
            <Teaser title="Gründen" text="Du möchtest selbst eine Solawi gründen?" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
