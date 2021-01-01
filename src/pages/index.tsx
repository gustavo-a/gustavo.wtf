import React from 'react'
import Layout from '@components/layout'

import Headline from '@components/shared/headline'
import Post from '@components/post/post'

const IndexPage: React.FC = () => (
  <Layout>
    <div className="container mt-24 mb-12 px-4">
      <div className="flex">
        <div className="w-full lg:w-5/12">
          <Headline
            title="Olá, eu sou o Gustavo!"
            subtitle="Desenvolvimento de software, gestão, aprendizados e algumas experiências pessoais..."
          />
        </div>
      </div>
    </div>

    <div className="container px-4">
      <div className="flex justify-between">
        <section className="w-5/12">
          <Post
            title="Lorem Ipsum dolor"
            readingTime="5 minutos de leitura"
            date="1 de janeiro de 2021"
            excerpt="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
          ducimus soluta tempora exercitationem provident dignissimos adipisci!
          Cupiditate eaque consequatur soluta ipsa animi officia porro sequi
          excepturi distinctio hic. Natus, in."
            categories={[
              {
                name: 'wordpress',
                url: 'wordpress.com'
              },
              {
                name: 'estatico',
                url: 'estatico.com'
              }
            ]}
          />
        </section>
        <aside className="w-1/4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
          ducimus soluta tempora exercitationem provident dignissimos adipisci!
          Cupiditate eaque consequatur soluta ipsa animi officia porro sequi
          excepturi distinctio hic. Natus, in.
        </aside>
      </div>
    </div>
  </Layout>
)

export default IndexPage
