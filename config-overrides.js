const { override, addBabelPlugins } = require('customize-cra')

const rootImport = [
  'babel-plugin-root-import',
  {
    'rootPathPrefix': '~',
    'rootPathSuffix': 'src'
  }
]

const thisConfigs = addBabelPlugins(rootImport)

module.exports = override(...thisConfigs)