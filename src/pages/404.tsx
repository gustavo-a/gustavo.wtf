import React from 'react'
import Layout from '@components/layout'
import Seo from '@components/infra/seo'

const NotFoundPage = () => (
  <div>
    <Layout>
      <Seo title="Página não encontrada | Gustavo Rocha" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  </div>
)

export default NotFoundPage
