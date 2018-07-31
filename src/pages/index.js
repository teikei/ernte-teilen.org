import React from 'react'
import Hero from '../components/hero/hero'
import Teaser from '../components/teaser/teaser'
import '../styles/index.scss'

export default () => (
  <div>
    <Hero />
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-md-4">
          <Teaser title="Beitreten" />
        </div>
        <div className="bx--col-md-4">
          <Teaser title="Mitglieder finden" />
        </div>
        <div className="bx--col-md-4">
          <Teaser title="Gründen" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
)
