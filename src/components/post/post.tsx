import React from 'react'
import { Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import PostMeta from '@components/post/postMeta'
import formatExcerpt from '@utils/formatExcerpt'

interface Props {
  title: string
  excerpt: string
  tags: Tag[]
  readingTime: number
  date: string
  image?: {
    altText: string
    localFile: {
      childImageSharp: {
        thumb: FluidObject | FluidObject[]
      }
    }
  }
  url: string
}

type Tag = {
  name: string
  slug: string
}

const post: React.FC<Props> = ({
  title,
  excerpt,
  tags,
  date,
  image,
  readingTime,
  url
}) => {
  return (
    <article className="mb-16">
      <Link to={url}>
        <h2 className="text-2xl font-display font-bold mb-2">{title}</h2>
      </Link>
      <PostMeta date={date} readingTime={readingTime} tags={tags} />
      {image && (
        <Link to={url}>
          <Img
            className="mb-8 shadow-lg dark:shadow-gray-300-lg transition-shadow"
            alt={image?.altText}
            fluid={image?.localFile.childImageSharp.thumb}
          ></Img>
        </Link>
      )}

      <div className="prose dark:prose-dark transition-colors">
        <p>
          {formatExcerpt(excerpt, 300)} <Link to={url}>Leia mais</Link>
        </p>
      </div>
    </article>
  )
}

export default post
