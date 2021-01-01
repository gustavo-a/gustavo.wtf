import React from 'react'

interface Props {
  title: string
  excerpt: string
  categories: Object[]
  readingTime: string
  date: string
  image?: Object
}

const post: React.FC<Props> = ({
  title,
  excerpt,
  categories,
  date,
  image,
  readingTime
}) => {
  return (
    <article>
      <h2 className="text-2xl font-display font-bold">{title}</h2>
      <p>{excerpt}</p>
    </article>
  )
}

export default post
