import React from 'react'

import Header from '@components/header'
import Footer from '@components/footer'

const layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="w-screen h-full flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default layout
