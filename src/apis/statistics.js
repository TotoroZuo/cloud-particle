/*
 * @Author: Long maomao
 * @Date: 2018-09-10 19:08:45
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-11-07 11:56:04
 * @Description: 人员信息模块接口
 * @Email: zlf@zuolongfei.me
 */

import $request from '@/libs/http.js' // 导入http请求方法
const $apis = '/apis'
/**
 * @description 获取页面数据
 * @param  {String} options.pageNum 页码
 * @param  {String} options.pageSize 每页条目数
 * @param  {String} options.matchType 分类
 * @param  {String} options.search 搜索内容
 * @return {Object} 接口返回数据
 */
const getPageList = options => {
  const url = $apis + '/platformStatistics/pageList'
  const params = {
    pageNum: options.page,
    pageSize: 10,
    type: options.matchType
  }
  if (options.startDate && options.endDate) {
    params.startDate = options.startDate
    params.endDate   = options.endDate
  }
  return $request.post(url, params)
}

/**
 * @description 获取配置项数据
 * @return {Object} 接口返回数据
 */
const getConfigList = options => {
  const url = $apis + '/platformStatistics/configList'
  return $request.post(url, {})
}

/**
 * @description 导出数据
 */
const doExport = options => {
  const url = $apis + '/platformStatistics/export'
  const params = {}
  if (options.startDate && options.endDate) {
    params.startDate = options.startDate
    params.endDate   = options.endDate
  }
  return $request.post(url, params)
}

export default {
  getConfigList,
  getPageList,
  doExport
}
