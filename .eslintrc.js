const path = require('path')

module.exports = {
   env: {
      browser: true,
      node: true,
      es2021: true
   },
   extends: [
      'eslint:recommended',
      'prettier'
   ],
   plugins: [
      '@babel'
   ],
   parser: 'vue-eslint-parser',
   parserOptions: {
      parser: {
         js: "@babel/eslint-parser"
      },
      sourceType: "module",
      babelOptions: {
         configFile: path.join(__dirname, "/babel.config.json")
      }
   },
   rules: {
      indent: ['error', 3],
      'no-tabs': ['error', { allowIndentationTabs: true }]
   }
}