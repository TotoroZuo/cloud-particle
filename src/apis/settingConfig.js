/*
 * @Author: Long maomao
 * @Date: 2018-09-10 19:08:45
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-11-07 11:54:02
 * @Description: 配置模块接口
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
  const url = $apis + '/policyConfig/pageList'
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
 * @description 添加编辑配置策略
 * @param  {String} type add 添加 editor 编辑
 *
 * @param  {String} options.smsRuleId id
 * @param  {String} options.smsUserName 姓名
 * @param  {String} options.smsRuleTemplate 推送模块
 * @param  {String} options.smsUserOrg 组织部门
 * @param  {String} options.smsUserPhone 手机号
 */

const addEditorUser = (options, type) => {
  const url = type == 'add' ? $apis + '/policyConfig/add' : $apis + '/policyConfig/update'
  const params = { ...options }
  params.policyConfigCondition = JSON.stringify(params.policyConfigCondition)
  return $request.post(url, params)
}

export default {
  getPageList,
  addEditorUser
}
