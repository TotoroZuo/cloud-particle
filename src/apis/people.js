/*
 * @Author: Long maomao
 * @Date: 2018-09-10 19:08:45
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-11-07 11:53:27
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
  const url = $apis + '/personMatch/pageList'
  const params = {
    pageNum: options.page,
    pageSize: 10,
    matchType: options.matchType
  }
  if (options.search) {
    params.search = options.search
  }
  return $request.post(url, params)
}

/**
 * @description 获取分类数据
 */
const getCateCount = options => {
  const url = $apis + '/personMatch/totalCount'
  return $request.post(url, {})
}

/**
 * @description 获取详情
 * @param  {String} options id
 */
const getDetail = options => {
  const url = $apis + '/personMatch/detail'
  return $request.post(url, { id: options })
}
/**
 * @description 处理详情
 * @param  {String} options.id id
 * @param  {String} options.handleResult 处理结果
 */
const doHandle = options => {
  const url = $apis + '/personMatch/handle'
  return $request.post(url, options)
}

export default {
  getPageList,
  getCateCount,
  getDetail,
  doHandle
}
