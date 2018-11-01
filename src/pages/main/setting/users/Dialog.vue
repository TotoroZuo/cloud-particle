<template>
    <el-dialog :title="dialogTitle" :visible.sync="dialogOpen"   width="600px">
        <div class="user-dialog-body">
            <el-form ref="userForm" :model="userInfo" :rules="userRules" label-width="85px" label-position='right' size="medium">
                <el-form-item label="真实姓名" prop="userName" class="float-label">
                    <el-input v-model="userInfo.userName" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="单位名称" prop="userOrgName" class="float-label">
                    <el-select v-model="userInfo.userOrgName" class="selectOrg" placeholder="选择单位名称">
                     <el-option :label="item.orgName" :value="item.orgName" v-for="item in orgList" :key="'org_'+item.orgName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号码" prop="userPhone" class="float-label">
                    <el-input v-model="userInfo.userPhone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="账号类型" prop="userRole" class="float-label">
                    <el-select v-model="userInfo.userRole" class="selectOrg" placeholder="选择账号类型">
                        <el-option :label="item.name" :value="item.value" v-for="item in roleList" :key="'role_'+item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证号" prop="userIdCard" class="float-label">
                    <el-input v-model="userInfo.userIdCard" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="登陆密码" prop="userPassword" class="float-label">
                    <el-input v-model="userInfo.userPassword" placeholder="请输入登陆密码"></el-input>
                </el-form-item>

            </el-form>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small"  @click="closeDialog">取消</el-button>
            <el-button type="primary" size="small" @click="restForm">重置</el-button>
            <el-button type="primary" size="small" @click="onSubmit">提交</el-button>
        </span>
    </el-dialog>
</template>
<script>
// 用户基本信息
import userRules from './userRules.js'
const userInfo = {
  userId: '',
  userName: '',
  userPassword: '',
  userRole: '',
  userIdCard: '',
  userOrgName: '',
  userPhone: ''
}
// 默认传入的用户信息
const defaultInfo = { ...userInfo }
export default {
  name: 'userDialog',
  data () {
    return {
      dialogOpen: false,
      userInfo,
      userRules,
      orgList: [],
      roleList: []
    }
  },
  props: {
    type: {
      type: String,
      default: 'add' // add or editor
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.getRoleList()
    this.getOrgList()
  },
  methods: {
    // 获取部门列表
    getOrgList () {
      this.$apis.settingUser.getRoleList().then(res => {
        if (res.code == '0000') {
          this.roleList = res.data
        }
      }).catch(error => {
        if (error) {
          console.log(error)
        }
      })
    },
    // 获取部门列表
    getRoleList () {
      this.$apis.settingUser.getOrgList().then(res => {
        if (res.code == '0000') {
          this.orgList = res.data
        }
      }).catch(error => {
        if (error) {
          console.log(error)
        }
      })
    },
    // 关闭对话框
    closeDialog () {
      this.dialogOpen = false
    },
    // 进行表单校验
    onSubmit () {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          this.doSubmitData()
        }
      })
    },
    // 表单进行数据提交
    doSubmitData () {
      const params = { ...this.userInfo }
      if (this.type == 'add') {
        delete params['userId']
      }
      this.$apis.settingUser.addEditorUser(params, this.type)
        .then(res => {
          if (res.code == '0000') {
            // 成功之后消息提醒
            this.$notify({
              message: res.data,
              type: 'success',
              position: 'top-right',
              duration: 1000
            })
            this.dialogOpen = false
            this.$emit('change')
          } else {
            this.$notify({
              message: res.data,
              type: 'error',
              position: 'top-right',
              duration: 1000
            })
            this.dialogOpen = false
          }
        }).catch(err => console.log(err))
    },
    restForm () {
      if (this.type === 'add') {
        this.userInfo = defaultInfo
      } else {
        this.userInfo = { ...this.selectInfo }
      }
    }

  },
  computed: {
    dialogTitle () {
      return this.type === 'add' ? '新增账号' : '编辑账号'
    },
    selectInfo () {
      return this.$store.state.options.selectSettingUser
    }
  },
  watch: {
    dialogOpen (val) {
      if (!val) {
        this.userInfo = defaultInfo
        this.$refs['userForm'].resetFields()
        // 同步open状态解决多次点击问题
        this.$emit('update:open', false)
        this.$emit('update:type', 'add')
      }
    },
    // 监听模态框开关
    open (val) {
      if (val) {
        this.dialogOpen = true
      }
    },
    type (val) {
      if (val == 'add') {
        this.userInfo = defaultInfo
      } else {
        this.userInfo = { ...this.selectInfo }
      }
    },
    // 大小写转换
    'userInfo.userIdCard' (val) {
      this.userInfo.userIdCard = val.toUpperCase()
    }
  }
}
</script>
<style lang="stylus" scoped>
.user-dialog-body {
    max-width: 980px;
    margin: 0 auto;
}
.float-label
    width 50%;
    float left ;

>>> .el-checkbox+.el-checkbox {
    margin-left: 0;
}

.el-checkbox {
    padding-right: 10px;
}
.avatar-uploader
    width 60px
    height 60px
>>> .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

>>> .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

>>> .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
}

>>> .avatar {
    width: 60px;
    height: 60px;
    display: block;
}
>>> .el-select .el-input
    width 100%;
</style>
