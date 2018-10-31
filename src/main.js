import Vue from 'vue'
// import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router/'
import store from './store/'
import apis from '@/apis/'
import common from '@/libs/common-methods.js'
Vue.use(common) // 安装公共方法
Vue.use(apis) // 安装接口

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
