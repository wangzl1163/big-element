const path = require('path')
const SmartBannerPlugin = require('smart-banner-webpack-plugin')
const banner = require('../license.js')

module.exports = {
   context: path.resolve(__dirname, '../'),
   entry: {
      main: './src/index.js'
   },
   output: {
      library: 'bigElement',
      libraryTarget: 'umd',
      umdNamedDefine: true
   },
   externals: {
      vue: "Vue",
      'element-ui': 'Element',
      'element-plus': 'ElementPlus',
      echarts: 'ECharts'
   },
   resolve: {
      // 如果去掉'.js'，则会报Module not found: Error: Can't resolve '@babel/runtime/helpers/asyncToGenerator' in '...'错误
      extensions: ['.js', '.vue'],
      alias: {
         "@": path.resolve(__dirname, '../packages')
      }
   },
   plugins: [
      new SmartBannerPlugin(banner)
   ],
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
               {
                  loader: 'babel-loader'
               }
            ]
         }
      ]
   }
}