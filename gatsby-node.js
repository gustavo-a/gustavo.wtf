const { each, filter } = require('lodash')
const { resolve } = require('path')
const { paginate } = require('gatsby-awesome-pagination')

function getOnlyPublished(edges) {
  return filter(edges, ({ node }) => node.status === 'publish')
}

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query ALL_POSTS_AND_CATEGORIES {
      allWpPost {
        edges {
          node {
            id
            slug
            status
            categories {
              edges {
                node {
                  slug
                }
              }
            }
          }
        }
      }

      allWpCategory(filter: { count: { gte: 1 } }) {
        edges {
          node {
            id
            name
            slug
            posts {
              edges {
                node {
                  id
                  slug
                }
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()))
    return Promise.reject(result.errors)
  }

  const postTemplate = resolve('@templates/single/post.js')
  const blogTemplate = resolve('@templates/archive/blog.js')

  // In production builds, filter for only published posts.
  const allPosts = result.data.allWpPost.edges

  const posts =
    process.env.NODE_ENV === 'production'
      ? getOnlyPublished(allPosts)
      : allPosts

  // Iterate over the array of posts
  each(posts, ({ node: post }) => {
    // Create the Gatsby page for this WordPress post
    createPage({
      path: `/${post.slug}/`,
      component: postTemplate,
      context: {
        id: post.id,
        categories: post.categories.edges.map(({ node: slug }) => slug)
      }
    })

    // Create a paginated blog, e.g., /, /page/2, /page/3
    paginate({
      createPage,
      items: posts,
      itemsPerPage: 10,
      pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? '/' : '/page'),
      component: blogTemplate
    })
  })

  const categories = result.data.allWpCategory.edges

  // Iterate over the array of categories
  each(categories, ({ node: category }) => {
    // Create a paginated blog, e.g., /, /page/2, /page/3
    paginate({
      createPage,
      items: category.posts.edges,
      itemsPerPage: 10,
      pathPrefix: ({ pageNumber }) =>
        pageNumber === 0
          ? `/categoria/${category.slug}`
          : `/categoria/${category.slug}/page`,
      component: blogTemplate,
      context: {
        categorySlug: [category.slug]
      }
    })
  })
}

module.exports = {
  createPages
}
