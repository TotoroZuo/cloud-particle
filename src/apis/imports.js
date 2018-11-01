/*
 * @Author: Long maomao
 * @Date: 2018-09-10 19:08:45
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-09-10 19:26:49
 * @Description: 导入模块接口
 * @Email: zlf@zuolongfei.me
 */

import $request from '@/libs/http.js' // 导入http请求方法

/**
 * @description 获取文件类型数据
 * @return {Object} 接口返回数据
 */
const getTypeList = options => {
  const url = '/file/fileTypeList'

  return $request.post(url, {})
}

export default {
  getTypeList
}
