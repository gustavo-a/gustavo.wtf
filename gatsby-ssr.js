const React = require('react')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('link', {
      key: 'preconnectFonts',
      href: 'https://fonts.gstatic.com',
      rel: 'preconnect',
      crossorigin: 'anonymous'
    }),

    React.createElement('link', {
      key: 'preloadFonts',
      href:
        'https://fonts.googleapis.com/css2?family=Hind:wght@400;700&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap',
      rel: 'preload',
      as: 'style'
    }),

    React.createElement('link', {
      key: 'fontsAsync',
      href:
        'https://fonts.googleapis.com/css2?family=Hind:wght@400;700&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap',
      rel: 'stylesheet',
      onload: "this.onload=null;this.removeAttribute('media');"
    }),

    React.createElement(
      'noscript',
      { key: 'noscriptFonts' },
      React.createElement('link', {
        key: 'fonts',
        href:
          'https://fonts.googleapis.com/css2?family=Hind:wght@400;700&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap',
        rel: 'stylesheet'
      })
    )
  ])
}
