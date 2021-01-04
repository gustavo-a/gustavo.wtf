import React from 'react'
import { Link } from 'gatsby'

const searchResults = ({ hit: { objectID, title, excerpt } }) => {
  return (
    <div key={objectID}>
      <Link to={`/${objectID}`}>
        <p>{title}</p>
        <p>{excerpt}</p>
      </Link>
    </div>
  )
}

export default searchResults
