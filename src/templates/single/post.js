import React, { useRef } from 'react'
import { graphql } from 'gatsby'

import ReadProgressBar from '@components/shared/readProgress'

import Layout from '@components/layout'
import SinglePost from '@components/post/single/singlePost'
import Author from '@/components/post/single/author'
import Comments from '@/components/post/single/comments'

const post = ({ data, pageContext }) => {
  const {
    title,
    content,
    date,
    readingTime,
    tags,
    featuredImage,
    author,
    slug
  } = data.post

  const readRef = useRef()
  return (
    <Layout>
      <div className="container">
        <div className="flex justify-center items-center flex-col mb-24">
          <ReadProgressBar
            attachTo={readRef}
            color="#6c4cf6"
            backgroundColor="transparent"
          />
          <div className="w-5/6 mt-24 mb-16" ref={readRef}>
            <SinglePost
              title={title}
              content={content}
              date={date}
              readingTime={readingTime.minutes}
              tags={tags.nodes}
              featuredImage={featuredImage.node}
            />

            <hr className="border-t border-gray-300" />
          </div>
          <div className="w-5/6">
            <div className="w-full max-w-prose m-auto">
              <div className="mb-32">
                <p className="text-2xl font-display font-bold mb-8">Autor</p>
                <Author
                  avatar={author.node.avatar.url}
                  firstName={author.node.firstName}
                  lastName={author.node.lastName}
                  description={author.node.description}
                />
              </div>
              <p className="text-2xl font-display font-bold mb-8">
                Comentários
              </p>
              <Comments id={slug} title={title} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default post

export const pageQuery = graphql`
  query POST_QUERY($id: String!, $tags: [String!]) {
    post: wpPost(id: { eq: $id }, status: { eq: "publish" }) {
      ...PostFields
      ...Author
      ...FeaturedImage
      ...Seo
      ...PostTags
    }
    related: allWpPost(
      filter: {
        tags: { nodes: { elemMatch: { slug: { in: $tags } } } }
        id: { ne: $id }
      }
      limit: 3
    ) {
      nodes {
        ...PostFields
        ...FeaturedImage
      }
    }
  }
`
