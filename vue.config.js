
const baseUrl = 'http://127.0.0.1:8084'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    proxy: {
      '/apis': {
        target: baseUrl,
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/apis': ''
        }
      }
    }
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
