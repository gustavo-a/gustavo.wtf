import { GraphQL } from './strapi-types'
import { GatsbyNode } from 'gatsby'

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions
}) => {
  const { createPage } = actions

  const result = await graphql<GraphQL.Query.Results, GraphQL.Query.Errors>(
    `
      {
        posts: allStrapiPost {
          edges {
            node {
              strapiId
              Slug
            }
          }
        }
        categories: allStrapiPostCategory {
          edges {
            node {
              strapiId
              Slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog post pages.

  const PostTemplate = require.resolve('../src/templates/post')

  result.data?.posts.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.Slug}`,
      component: PostTemplate,
      context: {
        slug: node.Slug
      }
    })
  })

  const CategoryTemplate = require.resolve('../src/templates/category')

  result.data?.categories.edges.forEach(({ node }) => {
    createPage({
      path: `/categoria/${node.Slug}`,
      component: CategoryTemplate,
      context: {
        slug: node.Slug
      }
    })
  })
}
