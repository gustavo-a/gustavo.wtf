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
            tags {
              nodes {
                name
                slug
              }
            }
          }
        }
      }

      allWpTag(filter: { count: { gte: 1 } }) {
        nodes {
          name
          slug
          posts {
            nodes {
              id
              slug
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

  const postTemplate = resolve('./src/templates/single/post.js')
  const blogTemplate = resolve('./src/templates/archive/blog.js')

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
        tags: post.tags.nodes.map(({ slug }) => slug)
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

  const tags = result.data.allWpTag.nodes

  // Iterate over the array of tags
  each(tags, ({ name, slug, posts }) => {
    // Create a paginated blog, e.g., /, /page/2, /page/3
    paginate({
      createPage,
      items: posts.nodes,
      itemsPerPage: 10,
      pathPrefix: ({ pageNumber }) =>
        pageNumber === 0 ? `/tag/${slug}` : `/tag/${slug}/page`,
      component: blogTemplate,
      context: {
        tagSlug: slug,
        tagName: name
      }
    })
  })
}

module.exports = {
  createPages
}
