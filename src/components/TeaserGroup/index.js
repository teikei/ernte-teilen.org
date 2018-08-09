import React from 'react'
import PropTypes from 'prop-types'
import Teaser from '../Teaser'
import './styles.scss'

const TeaserGroup = ({ teasers }) => (
  <div className="et--teaser-group bx--grid">
    <div className="bx--row">
      {teasers.map(({ title, text }) => (
        <div className="bx--col-sm-4" key={title}>
          <Teaser title={title} text={text} />
        </div>
      ))}
    </div>
  </div>
)

TeaserGroup.propTypes = {
  teasers: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default TeaserGroup
