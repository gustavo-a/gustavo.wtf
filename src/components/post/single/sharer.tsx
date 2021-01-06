import React, { RefObject, useEffect, useState } from 'react'
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
  iconClass: string
  size: number
  round: boolean
  bgStyle: object
  className?: string
  attachTo?: RefObject<any>
}

const sharer: React.FC<Props> = ({
  attachTo,
  iconClass,
  size,
  round,
  bgStyle,
  className
}) => {
  const [showSharer, setShowSharer] = useState(false)

  function trackScrollEvent(event, attatchedEl) {
    const sharer = document.querySelector('#blog-sharer')
    if (!sharer) return

    const {
      top: sharerTop,
      bottom: sharerBottom
    } = sharer.getBoundingClientRect()
    const {
      top: textTop,
      bottom: textBottom
    } = attatchedEl.current.getBoundingClientRect()

    const limit = 100

    if (sharerTop - limit > textTop && sharerBottom + limit < textBottom) {
      setShowSharer(true)
    } else {
      setShowSharer(false)
    }
  }

  useEffect(() => {
    if (
      attachTo &&
      attachTo.current &&
      attachTo.current.getBoundingClientRect()
    ) {
      window.addEventListener('scroll', e => trackScrollEvent(e, attachTo))
    }
    return () => {
      window.removeEventListener('scroll', e => trackScrollEvent(e, attachTo))
    }
  }, [attachTo])

  useEffect(() => {
    if (!attachTo) {
      setShowSharer(true)
    }
  }, [])

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
      style={{
        opacity: showSharer ? 100 : 0,
        pointerEvents: showSharer ? 'auto' : 'none'
      }}
      className={`${className} transition-all duration-200`}
    >
      <p className="text-sm font-bold hidden sm:block">Compartilhe</p>
      <EmailShareButton url={currentUrl}>
        <EmailIcon {...shareIconsOptions} />
      </EmailShareButton>
      <FacebookShareButton url={currentUrl}>
        <FacebookIcon {...shareIconsOptions} />
      </FacebookShareButton>
      <LinkedinShareButton url={currentUrl}>
        <LinkedinIcon {...shareIconsOptions} />
      </LinkedinShareButton>
      <RedditShareButton url={currentUrl}>
        <RedditIcon {...shareIconsOptions} />
      </RedditShareButton>
      <TwitterShareButton url={currentUrl}>
        <TwitterIcon {...shareIconsOptions} />
      </TwitterShareButton>
      <WhatsappShareButton url={currentUrl}>
        <WhatsappIcon {...shareIconsOptions} />
      </WhatsappShareButton>
    </div>
  )
}

export default sharer
