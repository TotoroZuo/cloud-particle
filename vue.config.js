
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    proxy: 'http://localhost:8084'
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      echarts: 'echarts',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        })
      ]
    }
  }
}
