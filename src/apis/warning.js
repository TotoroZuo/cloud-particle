/*
 * @Author: Long maomao
 * @Date: 2018-09-10 19:08:45
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-11-07 11:57:51
 * @Description: 预警模块接口
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
  const url = $apis + '/warningMatch/pageList'
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
  const url = $apis + '/warningMatch/totalCount'
  return $request.post(url, {})
}

/**
 * @description 获取人员详情
 */
const getBaseDetail = options => {
  const url = $apis + '/warningMatch/detailBase'
  return $request.post(url, { id: options })
}

/**
 * @description 获取详情页面历史轨迹数据
 * @param  {String} options.pageNum 页码
 * @param  {String} options.pageSize 每页条目数
 * @param  {String} options.id 用户id
 * @return {Object} 接口返回数据
 */
const getDetailTrack = options => {
  const url = $apis + '/warningMatch/detailTrack'
  const params = {
    pageNum: options.page,
    pageSize: 10,
    id: options.id
  }

  return $request.post(url, params)
}

/**
 * @description 获取比中详情历史记录
 */
const getDetailHistory = options => {
  const url = $apis + '/warningMatch/detailHistory'
  return $request.post(url, { id: options })
}

export default {
  getPageList,
  getCateCount,
  getBaseDetail,
  getDetailTrack,
  getDetailHistory
}
