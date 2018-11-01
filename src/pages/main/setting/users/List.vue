/*
 * @Description: 配置人员信息
 * @Author: Long maomao
 * @Date: 2018-10-23 11:39:52
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-10-23 11:39:52
 * @Email: zlf@zuolongfei.me
 */

<template>
    <div class="users-list-container">
        <div class="search-right">
            <el-input placeholder="请输入人员姓名或身份证号" clearable size="small" v-model="search" @clear="getPageList" @keyup.enter.native="getPageList" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="getPageList"></el-button>
            </el-input>

        </div>
        <el-button type="primary" class="add-new-admin" size="small" @click="showAddUser">新增账号</el-button>
        <div class="clear"></div>
        <div class="list-wrap">
            <el-table
            :data="dataList"
            style="width: 100%">
            <el-table-column
                label="序号"
                width="60">
                <template slot-scope="props">
                    {{props.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                label="姓名"
                align="center"
                prop="userName"
                >
            </el-table-column>
            <el-table-column
                label="手机号"
                align="center"
                prop="userPhone">
            </el-table-column>
            <el-table-column
                label="身份证号"
                align="center"
                prop="userIdCard">
            </el-table-column>
            <el-table-column
                label="账号类型"
                align="center"
                prop="accountType">
            </el-table-column>
            <el-table-column
                label="单位"
                prop="userOrgName">
            </el-table-column>
            <el-table-column
                label="注册时间"
                prop="time">
            </el-table-column>
            <el-table-column
                width="80"
                label="状态">
                <template slot-scope="props">
                     {{props.row.status ?'禁用':'正常'}}
                 </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
                 <template slot-scope="props">
                     <el-button type="text" size="small" title="编辑用户" @click="showEditorUser(props.row)">编辑</el-button>
                     <el-button type="text" size="small" :title="props.row.status ?'启用':'禁用'" @click="confirmChangeStatus(props.row.userId,props.row.status)">{{props.row.status ?'启用':'禁用'}}</el-button>
                 </template>
            </el-table-column>
        </el-table>

        </div>
        <div class="pagination-wrap" v-if="total">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page="curPage"
            :page-size="10"
            layout="total,prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        <settingUserDialog :open.sync="openDialog"  :type.sync="dialogType" @change="getPageList"/>
    </div>
</template>
<script>
import settingUserDialog from './Dialog.vue' // 添加组件
export default {
  name: 'settingUserList',
  data () {
    return {
      search: '',
      curPage: 1,
      total: 0,
      dataList: [],
      openDialog: false,
      dialogType: 'add'
    }
  },
  components: {
    settingUserDialog
  },
  created () {
    this.getPageList()
  },
  methods: {
    /**
     * @description 获取列表数据
     */
    getPageList () {
      const param = {
        page: this.curPage,
        search: this.search
      }
      this.$apis.settingUser.getPageList(param)
        .then(res => {
          if (res.code == '0000') {
            this.total = res.count
            this.dataList = res.data
          }
        })
        .catch(error => {
          if (error) {
            console.log(error)
          }
        })
    },
    /**
     * @description 改变页码
     */
    handleCurrentChange (val) {
      this.curPage = val
      this.getPageList()
    },
    showEditorUser (userData) {
      this.dialogType = 'editor'
      const userInfo = {
        userId: userData.userId,
        userName: userData.userName,
        userPassword: '',
        userRole: userData.userRole,
        userIdCard: userData.userIdCard,
        userOrgName: userData.userOrgName,
        userPhone: userData.userPhone
      }
      this.$store.commit('options/setSelectSettingUser', userInfo)
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
    confirmChangeStatus (id, status) {
      const text = status ? '确定启用该用户?' : '确定禁用该用户?'
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.changeUserStatus(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    changeUserStatus (id) {
      this.$apis.settingUser.changeUserStatus(id).then(res => {
        if (res.code == '0000') {
          this.$notify({
            message: res.data,
            type: 'success',
            position: 'top-right',
            duration: 1000
          })
          this.getPageList()
        } else {
          this.$notify({
            message: res.data,
            type: 'error',
            position: 'top-right',
            duration: 1000
          })
        }
      }).catch(err => console.log(err))
    }
  }
}
</script>
<style lang="stylus" scoped>

.search-right
    display inline-block
    vertical-align bottom
    width 300px;
    margin-top:20px;
    padding-bottom 15px;
    float left
.add-new-admin
    display inline-block
    vertical-align bottom
    float right
    margin  15px 0
.single-add
    margin-right 15px
.pagination-wrap
    padding 15px 0

</style>
