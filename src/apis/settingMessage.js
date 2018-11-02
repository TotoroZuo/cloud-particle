/*
 * @Author: Long maomao
 * @Date: 2018-09-10 19:08:45
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-09-10 19:26:49
 * @Description: 配置模块接口
 * @Email: zlf@zuolongfei.me
 */

import $request from '@/libs/http.js' // 导入http请求方法

/**
 * @description 获取页面数据
 * @param  {String} options.pageNum 页码
 * @param  {String} options.pageSize 每页条目数
 * @param  {String} options.search 搜索内容
 * @return {Object} 接口返回数据
 */
const getPageList = options => {
  const url = '/smsRule/pageList'
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
 * @description 获取推送模块数据
 */
const getRuleList = options => {
  const url = '/smsRule/templateList'
  return $request.post(url, {})
}

/**
 * @description 添加编辑规则信息
 * @param  {String} type add 添加 editor 编辑
 *
 * @param  {String} options.smsRuleId id
 * @param  {String} options.smsUserName 姓名
 * @param  {String} options.smsRuleTemplate 推送模块
 * @param  {String} options.smsUserOrg 组织部门
 * @param  {String} options.smsUserPhone 手机号
 */
const addEditorUser = (options, type) => {
  const url = type == 'add' ? '/smsRule/add' : '/smsRule/update'
  const params = { ...options }
  params.smsRuleTemplate = params.smsRuleTemplate.join(',')
  return $request.post(url, params)
}

/**
 * @description 更改账号状态
 */
const changeUserStatus = options => {
  const url = '/smsRule/updateStatus'
  return $request.post(url, { smsRuleId: options })
}
export default {
  getPageList,
  getRuleList,
  addEditorUser,
  changeUserStatus
}
