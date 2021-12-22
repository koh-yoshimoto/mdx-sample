const { create } = require("domain")
const path = require("path")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)

  const result = await graphql(`
  {
    allMdx {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GeaphQL query.`)
    return
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        slug: node.frontmatter.slug,
      }
    })
  })
}
