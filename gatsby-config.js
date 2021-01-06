const path = require('path')

require('dotenv').config({
  path: '.env'
})

const siteMetadata = require('./config/metadata')

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '@': path.join(__dirname, 'src'),
        '@components': path.join(__dirname, 'src/components'),
        '@templates': path.join(__dirname, 'src/templates'),
        '@infra': path.join(__dirname, 'src/infra'),
        '@styles': path.join(__dirname, 'src/styles'),
        '@svg': path.join(__dirname, 'src/assets/svg'),
        '@utils': path.join(__dirname, 'src/utils'),
        '@config': path.join(__dirname, 'config')
      }
    },
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true, // defaults to false
        jsxPragma: 'jsx', // defaults to "React"
        allExtensions: true // defaults to false
      }
    },
    {
      resolve: 'gatsby-plugin-readingtime',
      options: {
        types: {
          WpPost: source => {
            const { content } = source
            return content
          }
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src/assets/images')
      }
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require('./config/algolia-queries'),
        indexName: process.env.ALGOLIA_INDEX_NAME,
        skipIndexing: process.env.NODE_ENV === 'development'
      }
    },
    {
      resolve: 'gatsby-plugin-wordpress-preview',
      options: {
        graphqlEndpoint: process.env.WP_GRAPHQL_URL,
        debug: true,
        processMediaItems: false
      }
    },
    {
      resolve: 'gatsby-source-wordpress-experimental',
      options: {
        url: process.env.WP_GRAPHQL_URL,
        type: {
          Post: {
            limit: process.env.NODE_ENV === 'development' ? 50 : null
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/
        }
      }
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'pt-BR'
      }
    },
    {
      resolve: 'gatsby-plugin-disqus',
      options: {
        shortname: 'gustavo-wtf'
      }
    },
    'gatsby-plugin-next-seo',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-preload-link-crossorigin',
    'gatsby-plugin-advanced-sitemap',
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-css-modules',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#663399',
        showSpinner: false
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: './src/assets/images/gatsby-icon.png' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-offline'
  ]
}
