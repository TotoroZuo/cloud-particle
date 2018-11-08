/*
 * @Author: Long maomao
 * @Date: 2018-09-10 19:08:45
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-11-07 11:55:26
 * @Description: 配置用户模块接口
 * @Email: zlf@zuolongfei.me
 */

import $request from '@/libs/http.js' // 导入http请求方法
const $apis = '/apis'
/**
 * @description 获取页面数据
 * @param  {String} options.pageNum 页码
 * @param  {String} options.pageSize 每页条目数
 * @param  {String} options.search 搜索内容
 * @return {Object} 接口返回数据
 */
const getPageList = options => {
  const url = $apis + '/user/pageList'
  const params = {
    pageNum: options.page,
    pageSize: 10
  }
  if (options.search) {
    params.search = options.search
  }
  return $request.post(url, params)
}

/**
 * @description 获取部门数据
 */
const getOrgList = options => {
  const url = $apis + '/user/listOrg'
  return $request.post(url, {})
}

/**
 * @description 获取角色数据
 */
const getRoleList = options => {
  const url = $apis + '/user/listRole'
  return $request.post(url, {})
}

/**
 * @description 添加编辑用户信息
 * @param  {String} type add 添加 editor 编辑
 *
 * @param  {String} options.userId id
 * @param  {String} options.userName 姓名
 * @param  {String} options.userPassword 密码
 * @param  {String} options.userRole 角色
 * @param  {String} options.userIdCard 身份证号
 * @param  {String} options.userOrgName 组织部门
 * @param  {String} options.userPhone 手机号
 * @param
 */
const addEditorUser = (options, type) => {
  const url = type == 'add' ? $apis + '/user/add' : $apis + '/user/update'
  const params = { ...options }
  if (type != 'add' && !params.userPassword) {
    delete params.userPassword
  }
  return $request.post(url, params)
}

/**
 * @description 更改账号状态
 */
const changeUserStatus = options => {
  const url = $apis + '/user/updateStatus'
  return $request.post(url, { userId: options })
}
export default {
  getPageList,
  getOrgList,
  getRoleList,
  addEditorUser,
  changeUserStatus
}
