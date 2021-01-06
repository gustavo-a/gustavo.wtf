import React from 'react'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbySeo, BlogPostJsonLd } from 'gatsby-plugin-next-seo'
import { GatsbyImageFixedProps, GatsbyImageFluidProps } from 'gatsby-image'

interface Props {
  title?: string
  description?: string
  canonical?: string
  images?: Images
  type?: string
  date?: string
  modified?: string
}

type Images = {
  altText: string
  localFile: {
    childImageSharp: {
      thumb: GatsbyImageFluidProps
      featured: GatsbyImageFluidProps
      ogImage: GatsbyImageFixedProps
      ogImageSquare: GatsbyImageFixedProps
      ogImageFourXThree: GatsbyImageFixedProps
      ogImageSixteenXNine: GatsbyImageFixedProps
    }
  }
}

const seo: React.FC<Props> = ({
  title,
  description,
  canonical,
  images,
  type,
  date,
  modified
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
  images?.localFile.childImageSharp

  const openGraphImages = (img: Images) => {
    return Object.keys(img.localFile.childImageSharp).map((key, index) => {
      const url = `${defaults.siteUrl}${img.localFile.childImageSharp[key].src}`

      const og = {
        url: url,
        width: img.localFile.childImageSharp[key].width,
        height: img.localFile.childImageSharp[key].height,
        alt: img?.altText
      }

      Object.keys(og).forEach(key => og[key] === undefined && delete og[key])

      return { og, flattened: url }
    })
  }

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
          images: images && openGraphImages(images).map(item => item.og)
        }}
        twitter={{
          handle: defaults.twitterUsername,
          site: canonical
            ? `${defaults.siteUrl}${canonical}`
            : `${defaults.siteUrl}${pathname}`,
          cardType: 'summary_large_image'
        }}
      />
      {type && type === 'post' && (
        <BlogPostJsonLd
          url={
            canonical
              ? `${defaults.siteUrl}${canonical}`
              : `${defaults.siteUrl}${pathname}`
          }
          title={title}
          // @ts-ignore
          images={images && openGraphImages(images).map(item => item.flattened)}
          // @ts-ignore
          datePublished={date && date}
          dateModified={modified && modified}
          authorName={defaults.author}
          description={description || defaults.description}
        />
      )}
    </>
  )
}

export default seo
