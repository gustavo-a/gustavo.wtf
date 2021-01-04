import { graphql } from 'gatsby'

export const postFields = graphql`
  fragment PostFields on WpPost {
    id
    slug
    uri
    content
    excerpt
    title
    readingTime {
      minutes
    }
    date(formatString: "D [de] MMMM [de] YYYY", locale: "pt")
  }
`
export const postTags = graphql`
  fragment PostTags on WpPost {
    tags {
      nodes {
        name
        slug
      }
    }
  }
`

export const featuredImage = graphql`
  fragment FeaturedImage on WpPost {
    featuredImage {
      node {
        altText
        localFile {
          childImageSharp {
            thumb: fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
