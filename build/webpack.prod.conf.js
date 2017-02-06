const path = require('path')
let config = require('./webpack.base.conf');
let webpack = require('webpack')

module.exports = Object.assign({}, config, {
  entry: './src/Droply.vue',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'droply.js',
    library: ['droply'],
    libraryTarget: 'umd'
  },
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
});