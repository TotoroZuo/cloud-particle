/*
 * @Author: Long maomao
 * @Date: 2018-09-14 15:25:15
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-11-07 11:52:39
 * @Description: 菜单管理接口
 * @Email: zlf@zuolongfei.me
 */

import $request from '@/libs/http.js' // 导入http请求方法
const $apis = '/apis'
/**
 * @description 获取用户菜单列表接口
 * @param  {String} options.userName 用户名
 * @param  {String} options.password 用户密码
 * @return {Object} 接口返回数据
 */
const getList = options => {
  const url = $apis + '/menu/getList'
  const params = {
    token: options.token
  }
  return $request.get(url, params)
}

/**
 * @description 获取所有菜单列表
 */
const getAllList = options => {
  const url = $apis + '/menu/getAllList'

  return $request.post(url, {})
}

export default {
  getList,
  getAllList
}
