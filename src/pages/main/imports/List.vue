/*
 * @Description: 后台用户管理
 * @Author: Long maomao
 * @Date: 2018-10-23 11:39:52
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-10-23 11:39:52
 * @Email: zlf@zuolongfei.me
 */

<template>
    <div class="global-list-container royal-paper royal-paper-1">
        带入文件
    </div>
</template>
<script>
import userDialog from '@/pages/main/system/users/Dialog.vue' // 添加组件
import avator from '@/components/Avator.vue' // 头像组件
export default {
  name: 'usersList',
  components: {
    userDialog,
    avator
  },
  data () {
    return {
      openDialog: false,
      dialogType: 'add',
      checkedList: [],
      radio5: '',
      select: '',
      input5: '',
      currentPage4: 1,
      tableData5: [],
      tableData: [
        {
          uid: 'aaa',
          num: 1,
          name: '做龙飞',
          idcard: '410123198912115050',
          type: '涉案在逃',
          origin: '房屋租赁登记',
          hit: '全国打防控',
          hitTime: '2018-10-27 19:25:59'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val)
      this.checkedList = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    showEditorUser () {
      this.dialogType = 'editor'
      const userInfo = {
        uid: 'aaa',
        account: 'sssss',
        password: 'sssssss',
        avator: '',
        org: 'org1',
        role: [],
        name: '做龙飞',
        enable: true,
        phone: '',
        idcard: '',
        isSuper: false
      }
      this.$store.commit('options/setSelectUser', userInfo)
      if (this.openDialog) {
        this.openDialog = false
      }
      this.openDialog = true
    },
    showAddUser () {
      this.dialogType = 'add'
      if (this.openDialog) {
        this.openDialog = false
      }
      this.openDialog = true
    },
    showDetail (row) {
      this.$refs.userList.toggleRowExpansion(row)
    }
  }
}
</script>
<style lang="stylus" scoped>
.user-list-container
    padding 15px
>>>.search-left .el-radio-button
    margin-right 10px;
>>>.search-left .el-radio-button__inner
    border-left 1px solid #dcdfe6
    border-radius 4px
>>>.search-left .el-radio-button__orig-radio:checked+.el-radio-button__inner
     border 1px solid #409EFF!important
.search-right
    width 300px;
    margin-top:20px;
.search-container
    padding 15px
    border: 1px solid #ebeef5;
    border-bottom none
.search-container:after
    content ''
    display block
    height 0
    width 100%
    clear both
.single-add
    margin-right 15px
.pagination-wrap
    padding 15px 0
    border: 1px solid #ebeef5;
    border-top none
</style>
