const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const getTemplate = (slug) => path.resolve(`./src/templates/${slug}.js`)

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'develop') {
    actions.setWebpackConfig({
      devtool: 'cheap-module-source-map',
    })
  }
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                template
                image
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then((result) => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const { template, image } = node.frontmatter
        const customTemplate = template && getTemplate(template)

        createPage({
          path: node.fields.slug,
          component: customTemplate || getTemplate('default'),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
            image,
          },
        })
      })
      resolve()
    })
  })
}
