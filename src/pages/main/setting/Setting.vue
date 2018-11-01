/*
 * @Description: 配置模块
 * @Author: Long maomao
 * @Date: 2018-10-23 11:39:52
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-10-23 11:39:52
 * @Email: zlf@zuolongfei.me
 */

<template>
    <div class="global-list-container royal-paper royal-paper-1">
        <div class="search-container">
            <div class="search-left">
                <el-radio-group v-model="tab" size="small">
                    <el-radio-button label="user">用户信息</el-radio-button>
                    <el-radio-button label="message">短信规则</el-radio-button>
                    <el-radio-button label="config">配置策略</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <userList v-if="tab=='user'"/>
        <messageList v-if="tab=='message'"/>
        <configList v-if="tab=='config'"/>
    </div>
</template>
<script>
import userList from '@/pages/main/setting/users/List.vue' // 用户列表
import messageList from '@/pages/main/setting/message/List.vue' // 短信列表
import configList from '@/pages/main/setting/config/List.vue' // 配置列表
export default {
  name: 'settingWrap',
  components: {
    userList,
    messageList,
    configList
  },
  data () {
    return {
      tab: 'user'
    }
  }
}
</script>
<style lang="stylus" scoped>

>>>.search-left .el-radio-button
    margin-right 10px;
>>>.search-left .el-radio-button__inner
    border-left 1px solid #dcdfe6
    border-radius 4px
>>>.search-left .el-radio-button__orig-radio:checked+.el-radio-button__inner
     border 1px solid #409EFF!important

.search-container:after
    content ''
    display block
    height 0
    width 100%
    clear both
.single-add
    margin-right 15px

</style>
