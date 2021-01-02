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
            const { blocks } = source
            return blocks.map(block => block.saveContent).join('')
          }
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src/images')
      }
    },
    {
      resolve: 'gatsby-plugin-wordpress-preview',
      options: {
        graphqlEndpoint: process.env.WP_GRAPHQL_URL,
        debug: true
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
        icon: 'src/images/gatsby-icon.png' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-offline'
  ]
}
