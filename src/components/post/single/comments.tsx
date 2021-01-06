import React from 'react'
import { Disqus } from 'gatsby-plugin-disqus'
import { useLocation } from '@reach/router'

interface Props {
  id: string
  title: string
}

const comments: React.FC<Props> = ({ id, title }) => {
  const { pathname } = useLocation()
  const currentUrl = `https://onserp.com.br${pathname}`
  return (
    <Disqus
      config={{
        url: currentUrl,
        identifier: id,
        title: title
      }}
    />
  )
}

export default comments
