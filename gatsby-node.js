require('source-map-support').install()
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    types: ['node']
  }
})

require('tsconfig-paths')

// exports.createPages = require('./gatsby/createPages').createPages
