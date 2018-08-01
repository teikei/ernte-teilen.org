import React from 'react'
import './hero.scss'

export default () => (
  <header className="et--hero">
    <div className="bx--grid">
      <div className="bx--row">
        <p className="et--hero__claim">
          {
            'Wir bringen Menschen zusammen, die sich gemeinsam in einer Solawi mit regionalen Lebensmitteln versorgen möchten.'
          }
          <strong>
            {'Fair, ökologisch, nachhaltig'}
          </strong>
        </p>
      </div>
    </div>
  </header>
)
