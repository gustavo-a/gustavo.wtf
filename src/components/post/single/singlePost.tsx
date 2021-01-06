import React, { useRef } from 'react'
import Img from 'gatsby-image'

import PostMeta, { Tag } from '@components/post/postMeta'
import { FeaturedImage } from '@components/post/post'
import Sharer from '@/components/post/single/sharer'

interface Props {
  title: string
  content: string
  date: string
  readingTime: number
  featuredImage?: FeaturedImage
  tags: Tag[]
}

const singlePost: React.FC<Props> = ({
  title,
  content,
  date,
  readingTime,
  tags,
  featuredImage
}) => {
  const sharerRef = useRef()

  return (
    <article className="mb-16">
      <div className="max-w-prose m-auto mb-12">
        <h1 className="text-4xl font-display font-bold mb-4">{title}</h1>
        <PostMeta date={date} readingTime={readingTime} tags={tags} />
      </div>
      <div>
        {featuredImage && (
          <Img
            className="mb-8 shadow-lg dark:shadow-gray-300-lg transition-shadow"
            fluid={featuredImage?.localFile.childImageSharp.featured}
            alt={featuredImage?.altText}
          />
        )}
      </div>
      <div
        className="prose xl:prose-lg dark:prose-dark m-auto"
        dangerouslySetInnerHTML={{ __html: content }}
        // @ts-ignore
        ref={sharerRef}
      ></div>
      <Sharer
        attachTo={sharerRef}
        className="grid gap-y-4 grid-cols-1 fixed top-1/2 transform-gpu -translate-y-1/2"
        bgStyle={{
          fill: '#aaa'
        }}
        iconClass="ml-3 fill-current text-gray-400"
        round={true}
        size={32}
      />
    </article>
  )
}

export default singlePost
