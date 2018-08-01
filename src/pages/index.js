import React from 'react'
import Header from '../components/header/header'
import Hero from '../components/hero/hero'
import Teaser from '../components/teaser/teaser'
import Footer from '../components/footer/footer'
import '../styles/index.scss'

export default () => (
  <div>
    <Header />
    <Hero />
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4">
          <Teaser title="Beitreten" />
        </div>
        <div className="bx--col-sm-4">
          <Teaser title="Mitglieder finden" />
        </div>
        <div className="bx--col-sm-4">
          <Teaser title="Gründen" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
)
