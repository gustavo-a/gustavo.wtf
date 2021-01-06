import React from 'react'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'
import {
  GatsbySeo,
  OpenGraphImages,
  BlogPostJsonLd
} from 'gatsby-plugin-next-seo'

interface Props {
  title?: string
  description?: string
  canonical?: string
  images?: OpenGraphImages[]
  type?: string
}

const seo: React.FC<Props> = ({
  title,
  description,
  canonical,
  images,
  type
}) => {
  const { pathname } = useLocation()
  const seoQuery = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          siteName
          title
          description
          siteUrl
          image
          twitterUsername
          author
          keywords
        }
      }
    }
  `)

  const defaults = seoQuery.site.siteMetadata

  return (
    <>
      <GatsbySeo
        title={title || `${defaults.title} | ${defaults.siteName}`}
        description={description || defaults.description}
        canonical={
          canonical
            ? `${defaults.siteUrl}${canonical}`
            : `${defaults.siteUrl}${pathname}`
        }
        openGraph={{
          url: canonical
            ? `${defaults.siteUrl}${canonical}`
            : `${defaults.siteUrl}${pathname}`,
          title: title || `${defaults.title} | ${defaults.siteName}`,
          description: description || defaults.description,
          site_name: defaults.siteName,
          images
        }}
        twitter={{
          handle: defaults.twitterUsername,
          site: canonical
            ? `${defaults.siteUrl}${canonical}`
            : `${defaults.siteUrl}${pathname}`,
          cardType: 'summary_large_image'
        }}
      />
      {type && type === 'blog' && (
        <BlogPostJsonLd
          url={
            canonical
              ? `${defaults.siteUrl}${canonical}`
              : `${defaults.siteUrl}${pathname}`
          }
          title={title}
          images={[
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg'
          ]}
          datePublished="2015-02-05T08:00:00+08:00"
          dateModified="2015-02-05T09:00:00+08:00"
          authorName={defaults.author}
          description={description || defaults.description}
        />
      )}
    </>
  )
}

export default seo
