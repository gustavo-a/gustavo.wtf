import React from 'react'

interface Props {
  categories: Object[]
  readingTime: string
  date: string
}

const postMeta: React.FC<Props> = ({ categories, readingTime, date }) => {
  return (
    <div>
      <p className="flex justify-between">
        <div>{date}</div>
        <div>{readingTime}</div>
      </p>
    </div>
  )
}

export default postMeta
