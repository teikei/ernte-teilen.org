import React from 'react'
import PropTypes from 'prop-types'

const html = ({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  body,
  postBodyComponents,
}) => (
  <html lang="de" {...htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      {headComponents}
    </head>
    <body {...bodyAttributes}>
      {preBodyComponents}
      <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
      {postBodyComponents}
    </body>
  </html>
)

html.propTypes = {
  body: PropTypes.string.isRequired,
  bodyAttributes: PropTypes.shape(),
  htmlAttributes: PropTypes.shape(),
  headComponents: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  preBodyComponents: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  postBodyComponents: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

html.defaultProps = {
  bodyAttributes: {},
  htmlAttributes: {},
  headComponents: [],
  preBodyComponents: [],
  postBodyComponents: [],
}

export default html
