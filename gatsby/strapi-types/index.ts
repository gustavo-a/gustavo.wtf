export declare namespace GraphQL {
  namespace Model {
    interface Post {
      id: string
      Title: string
      Slug: string
      Content: string
      Thumbnail?: any
      author?: Author
      Excerpt?: string
    }
    interface Author {
      id: string
      Name?: string
      Bio?: string
      Avatar?: any
      posts: Post[]
    }
    interface PostCategories {
      id: string
      Title?: string
      Slug?: string
    }
  }

  namespace Query {
    interface Errors extends Error {}
    interface Results {
      posts: {
        edges: Array<{
          node: Model.Post
        }>
      }
      categories: {
        edges: Array<{
          node: Model.PostCategories
        }>
      }
      authors: {
        edges: Array<{
          node: Model.Author
        }>
      }
    }
  }
}
