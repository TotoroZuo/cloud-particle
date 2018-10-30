/*
 * @Author: Long maomao
 * @Date: 2018-09-10 19:08:45
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-09-10 19:26:49
 * @Description: 用户模块接口
 * @Email: zlf@zuolongfei.me
 */

import $request from '@/libs/http.js' // 导入http请求方法

/**
 * @description 获取页面数据
 * @param  {String} options.pageNum 页码
 * @param  {String} options.pageSize 每页条目数
 * @param  {String} options.matchType 分类
 * @param  {String} options.search 搜索内容
 * @return {Object} 接口返回数据
 */
const getPageList = options => {
  const url = '/warningMatch/pageList'
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
  const url = '/warningMatch/totalCount'
  return $request.post(url, {})
}

export default {
  getPageList,
  getCateCount
}
