<template>
    <el-dialog :title="dialogTitle" :visible.sync="dialogOpen"   width="600px">
        <div class="user-dialog-body">
            <el-form ref="userForm" :model="userInfo" :rules="userRules" label-width="85px" label-position='right' size="small">
                <el-form-item label="真实姓名" prop="smsUserName" class="float-label">
                    <el-input v-model="userInfo.smsUserName" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="单位名称" prop="smsUserOrg" class="float-label">
                    <el-select v-model="userInfo.smsUserOrg" class="selectOrg" placeholder="选择单位名称">
                     <el-option :label="item.orgName" :value="item.orgName" v-for="item in orgList" :key="'org_'+item.orgName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号码" prop="smsUserPhone" class="float-label">
                    <el-input v-model="userInfo.smsUserPhone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <div class="clear"></div>
                <el-form-item label="推送模块" class="setting-message-rule" prop="smsRuleTemplate">
                    <el-checkbox-group v-model="userInfo.smsRuleTemplate">
                    <el-checkbox :label="String(item.smsTemplateId)" name="role" v-for="item in ruleList" :key="item.smsTemplateId">{{item.smsTemplateName}}</el-checkbox>
                    </el-checkbox-group>
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
  smsRuleId: '',
  smsUserName: '',
  smsUserPhone: '',
  smsRuleTemplate: [],
  smsUserOrg: ''
}
// 默认传入的用户信息
const defaultInfo = { ...userInfo }
export default {
  name: 'settingMessageDialog',
  data () {
    return {
      dialogOpen: false,
      userInfo,
      userRules,
      orgList: [],
      ruleList: []
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
    this.getRuleList()
    this.getOrgList()
  },
  methods: {
    // 获取部门列表
    getRuleList () {
      this.$apis.settingMessage.getRuleList().then(res => {
        if (res.code == '0000') {
          this.ruleList = res.data
        } else {
          this.$notify({
            title: '数据异常',
            message: res.data,
            position: 'top-right',
            type: 'warning'
          })
        }
      }).catch(error => {
        if (error) {
          console.log(error)
        }
      })
    },
    // 获取部门列表
    getOrgList () {
      this.$apis.settingUser.getOrgList().then(res => {
        if (res.code == '0000') {
          this.orgList = res.data
        } else {
          this.$notify({
            title: '数据异常',
            message: res.data,
            position: 'top-right',
            type: 'warning'
          })
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
        delete params['smsRuleId']
      }
      this.$apis.settingMessage.addEditorUser(params, this.type)
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
      this.$refs['userForm'].resetFields()
      if (this.type === 'add') {
        this.userInfo = defaultInfo
      } else {
        this.userInfo = { ...this.selectInfo }
      }
    }

  },
  computed: {
    dialogTitle () {
      return this.type === 'add' ? '新增规则' : '编辑规则'
    },
    selectInfo () {
      return this.$store.state.options.selectSettingMessage
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
        console.log(this.selectInfo)
      }
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
    width 110px;
    padding-right: 10px;
}

>>> .el-select .el-input
    width 100%;
</style>
