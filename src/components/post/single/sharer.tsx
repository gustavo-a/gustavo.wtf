import React from 'react'
import { useLocation } from '@reach/router'

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share'

interface Props {
  iconClass?: string
  linkClass?: string
  size: number
  round: boolean
  bgStyle: object
  className?: string
}

const sharer: React.FC<Props> = ({
  iconClass,
  linkClass,
  size,
  round,
  bgStyle,
  className
}) => {
  const { pathname } = useLocation()

  const currentUrl = `https://onserp.com.br${pathname}`

  const shareIconsOptions = {
    size,
    round,
    bgStyle,
    className: iconClass
  }

  return (
    <div
      id="blog-sharer"
      className={`${className} transition-all duration-200`}
    >
      <EmailShareButton url={currentUrl} className={linkClass}>
        <EmailIcon {...shareIconsOptions} />
      </EmailShareButton>
      <FacebookShareButton url={currentUrl} className={linkClass}>
        <FacebookIcon {...shareIconsOptions} />
      </FacebookShareButton>
      <LinkedinShareButton url={currentUrl} className={linkClass}>
        <LinkedinIcon {...shareIconsOptions} />
      </LinkedinShareButton>
      <RedditShareButton url={currentUrl} className={linkClass}>
        <RedditIcon {...shareIconsOptions} />
      </RedditShareButton>
      <TwitterShareButton url={currentUrl} className={linkClass}>
        <TwitterIcon {...shareIconsOptions} />
      </TwitterShareButton>
      <WhatsappShareButton url={currentUrl} className={linkClass}>
        <WhatsappIcon {...shareIconsOptions} />
      </WhatsappShareButton>
    </div>
  )
}

export default sharer
