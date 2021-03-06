/*
 * @Author: Long maomao
 * @Date: 2018-09-10 13:17:32
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-09-14 15:30:55
 * @Email: zlf@zuolongfei.me
 *
 * @Description: 用户状态管理模块
 *
 */

export default {
  namespaced: true,
  state: {
    // 当前选择用户信息
    selectUser: {},
    // 当前选择菜单信息
    selectMenu: {},
    // 当前选择api信息
    selectApi: {},
    // 配置用户-选择当前用户
    selectSettingUser: {},
    // 配置短信规则-选择当前规则
    selectSettingMessage: {},
    // 配置 配置策略-选择当前配置策略
    selectSettingConfig: {}
  },
  mutations: {

    /**
    * [setSelect description] 设置当前选中人员信息
    */
    setSelectUser (state, info) {
      state.selectUser = info
    },
    /**
    * [setSelect description] 设置当前选中人员信息
    */
    setSelectSettingUser (state, info) {
      state.selectSettingUser = info
    },
    /**
    * [setSelect description] 设置当前选中规则信息
    */
    setSelectSettingMessage (state, info) {
      state.selectSettingMessage = info
    },
    /**
    * [setSelect description] 设置当前选中配置策略
    */
    setSelectSettingConfig (state, info) {
      state.selectSettingConfig = info
    },
    /**
    * [setSelect description] 设置当前选中人员信息
    */
    setSelectMenu (state, info) {
      state.selectMenu = info
    },
    /**
    * [setSelect description] 设置当前选中人员信息
    */
    setSelectApi (state, info) {
      state.selectApi = info
    }

  }
}
