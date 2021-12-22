import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"

const Blog = ({ data }) => (
  <>
    <h1>{data.mdx.frontmatter.title}</h1>
    <hr />
    <MDXRenderer frontmatter={data.mdx.frontmatter}>
      {data.mdx.body}
    </MDXRenderer>
  </>
)

export default Blog

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        slug
      }
    }
  }
`
