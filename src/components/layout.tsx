import React from 'react'
import Helmet from 'react-helmet'

import Header from '@components/header'
import Footer from '@components/footer'

const layout: React.FC = ({ children }) => {
  return (
    <>
      <Helmet>
        <script>
          {`
            if (
              localStorage.getItem('theme') === 'dark' ||
              (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
              document.querySelector('html').classList.add('dark')
            } else {
              document.querySelector('html').classList.remove('dark')
            }
          `}
        </script>
      </Helmet>
      <div className="w-screen h-full flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default layout
