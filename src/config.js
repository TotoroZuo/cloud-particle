// 版权信息
const copyRight = '钧信保安'
// 请填写logo绝对地址
const logo = '/logo.png'
// 系统名称
const systemName = '通用后台管理系统'
// 接口地址url,用于代理和下载文件
const baseUrl = 'http://localhost:8084'
// 主题颜色
const colors = {
  // 当前使用配色方案
  use: 'light',
  lists: {
    name: 'light',
    // 主色
    primary: '#009688',
    // 辅助色
    secondary: '#ff4081',
    // 成功
    success: '#4caf50',
    // 警告
    warning: '#ffeb3b',
    // 危险
    danger: '#F56C6C',
    // 信息提醒
    info: '#909399'
  }
}
export default {
  copyRight,
  logo,
  systemName,
  colors,
  baseUrl
}
