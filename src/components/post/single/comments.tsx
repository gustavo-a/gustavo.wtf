import React from 'react'
import { Disqus } from 'gatsby-plugin-disqus'
import { useLocation } from '@reach/router'
import HyvorTalk from 'hyvor-talk-react'

interface Props {
  id: string
  title: string
}

const comments: React.FC<Props> = ({ id, title }) => {
  /* const { pathname } = useLocation()
  const currentUrl = `https://onserp.com.br${pathname}` */

  return <HyvorTalk.Embed websiteId={2844} loadMode="scroll" />
}

export default comments

/* <Disqus
      config={{
        url: currentUrl,
        identifier: id,
        title: title
      }}
    /> */
