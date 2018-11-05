import config from '../config'
const $common = {
  openDownLoadLink (url, needBaseUrl) {
    const linkForm = document.getElementById('open-link-form')
    let f
    if (linkForm) {
      f = linkForm
    } else {
      f = document.createElement('form')
      f.style.display = 'none'
      f.style.id = 'open-link-form'
      document.body.appendChild(f)
    }
    f.method = 'post'
    f.action = needBaseUrl ? config.baseUrl + url : url // 下载的url 地址
    f.submit()
  }
}
/**
 * 封装成vue插件
 * @description Vue.use()使用插件
 */
const install = Vue => {
  if (install.installed) return
  install.installed = true

  Object.defineProperties(Vue.prototype, {
    // 注意哦，此处挂载在 Vue 原型的 $api 对象上
    $common: {
      get () {
        return $common
      }
    }
  })
}
export default install
