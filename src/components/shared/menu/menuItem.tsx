import React from 'react'
import { Link } from 'gatsby'

interface Props {
  link: string
  name: string
}

const menu: React.FC<Props> = ({ link, name }) => {
  return (
    <li className="inline-block mx-3">
      <Link className="px-2 hover:underline" to={link}>
        {name}
      </Link>
    </li>
  )
}

export default menu
