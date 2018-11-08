/*
 * @Author: Long maomao
 * @Date: 2018-09-10 19:08:45
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-11-07 11:51:48
 * @Description: 首页模块接口
 * @Email: zlf@zuolongfei.me
 */

import $request from '@/libs/http.js' // 导入http请求方法
const $apis = '/apis'

/**
 * @description 获取折线图数据接口
 * @param  {String} options.startDate 起始日期
 * @param  {String} options.endDate 结束日期
 * @param  {String} options.type 类型
 * @return {Object} 接口返回数据
 */
const getLineChartData = options => {
  const url =  $apis + '/statistics/countByDate2'

  const params = {
    type: Number(options.type)
  }
  if (options.startDate && options.endDate) {
    params.startDate  = options.startDate
    params.endDate = options.endDate
  }
  return $request.post(url, params)
}

/**
 * @description 获取柱状图数据接口
 */
const getBarChartData = options => {
  const url = $apis + '/statistics/countByOrg'

  const params = {
    type: Number(options.type)
  }
  return $request.post(url, params)
}

/**
 * @description 获取最新预警数据接口
 */
const getWarningData = options => {
  const url = $apis + '/warningMatch/newest'

  const params = {
    num: 5
  }
  return $request.post(url, params)
}
/**
 * @description 获取最新人员信息数据接口
 */
const getPeopleData = options => {
  const url = $apis + '/personMatch/newest'

  const params = {
    num: 5
  }
  return $request.post(url, params)
}
/**
 * @description 添加用户接口
 * @param  {String} options.account 用户名
 * @param  {String} options.password 用户密码
 * @param  {String} options.avator 头像
 * @param  {String} options.org 所属部门
 * @param  {Array} options.role 角色
 * @param  {String} options.name  姓名
 * @param  {String} options.enable 启用状态
 * @param  {String} options.phone 手机号
 * @param  {String} options.idcard 身份证号
 * @param  {String} options.isSuper 是否拥有超级权限
 * @return {Object} 接口返回数据
 */

export default {
  getLineChartData,
  getBarChartData,
  getWarningData,
  getPeopleData

}
