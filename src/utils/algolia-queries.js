const pageQuery = `{
  posts: allWpPost(filter: {status: {eq: "publish"}}) {
    edges {
      node {
        slug
        title
        excerpt
        content
      }
    }
  }
}`

function postToAlgoliaRecord({ node: { slug, excerpt, content, ...rest } }) {
  return {
    objectID: slug,
    // strip html tags from content
    excerpt: excerpt.replace(/(<([^>]+)>)/gi, ''),
    content: content.replace(/(<([^>]+)>)/gi, ''),
    ...rest
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.posts.edges.map(postToAlgoliaRecord)
  }
]

module.exports = queries
