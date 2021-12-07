const {merge} = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
   devtool: 'source-map',
   mode: 'production',
   output: {
      filename: 'big-element.js',
      chunkFilename: '[name].chunk.js',
      sourceMapFilename: 'big-element.map'
   },
   plugins: [
      new webpack.DefinePlugin({
         'process.env': {
            NODE_ENV: JSON.stringify('development')
         }
      })
   ],
   optimization: {
      minimize: false
   }
})