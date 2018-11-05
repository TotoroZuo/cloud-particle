<template>
    <el-dialog :title="dialogTitle" :visible.sync="dialogOpen"   width="600px">
        <div class="user-dialog-body">
            <el-form ref="userForm" :model="userInfo" size="small" :rules="userRules" label-width="85px" label-position='right'>
                <el-form-item label="比中名称" prop="policyConfigName" class="float-label">
                    <el-input v-model="userInfo.policyConfigName" placeholder="请输入比中名称"></el-input>
                </el-form-item>
                <el-form-item label="比中条件" prop="policyCondition" class="float-label">
                    <el-input v-model="userInfo.policyCondition"  placeholder="请输入比中条件"></el-input>
                </el-form-item>
                <div class="clear"></div>
                <el-form-item label="配置条件" class="setting-message-rule" prop="policyConfigCondition">
                    <div class="condition-box" v-for="(item,index) in userInfo.policyConfigCondition" :key="index">
                        <div class="condition-box-left">
                            <el-input placeholder="请输入阈值" v-model.number="item.data" size="small" class="input-with-select">
                                <el-select  slot="prepend" v-model="item.compare" placeholder="选择条件">
                                <el-option label="大于" value="大于"></el-option>
                                <el-option label="大于等于" value="大于等于"></el-option>
                                <el-option label="等于" value="等于"></el-option>
                                <el-option label="小于" value="小于"></el-option>
                                <el-option label="小于等于" value="小于等于"></el-option>
                                </el-select>
                                <el-select  slot="append" v-model="item.logic" placeholder="选择逻辑" v-if="(index + 1) !== userInfo.policyConfigCondition.length">
                                    <el-option label="或" value="或"></el-option>
                                    <el-option label="且" value="且"></el-option>
                                </el-select>
                            </el-input>
                        </div>
                        <div class="condition-box-right">
                                <el-button-group>
                                    <el-button type="primary" size="small" icon="el-icon-minus" v-if="userInfo.policyConfigCondition.length > 1" @click="delCondition(index)"></el-button>
                                    <el-button type="primary" size="small" icon="el-icon-plus" v-if="(index + 1) == userInfo.policyConfigCondition.length" @click="addNewCondition"></el-button>
                                </el-button-group>
                        </div>
                    </div>
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
import __ from 'lodash'
const userInfo = {
  policyConfigId: '',
  policyConfigName: '',
  policyCondition: '',
  policyConfigCondition: [{ compare: '大于等于', data: 0, logic: '或' }]
}
// 默认传入的用户信息
const defaultInfo = __.cloneDeep(userInfo)
export default {
  name: 'settingConfigDialog',
  data () {
    return {
      dialogOpen: false,
      userInfo,
      userRules
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
  methods: {

    // 关闭对话框
    closeDialog () {
      this.dialogOpen = false
    },
    addNewCondition () {
      const condition = { compare: '大于等于', value: 0, logic: '或' }
      this.userInfo.policyConfigCondition.push(condition)
    },
    delCondition (index) {
      this.userInfo.policyConfigCondition.splice(index, 1)
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
        delete params['policyConfigId']
      }
      this.$apis.settingConfig.addEditorUser(params, this.type)
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
        this.userInfo = __.cloneDeep(this.selectInfo)
      }
    }

  },
  computed: {
    dialogTitle () {
      return this.type === 'add' ? '新增策略' : '编辑策略'
    },
    selectInfo () {
      return this.$store.state.options.selectSettingConfig
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
        this.userInfo = __.cloneDeep(this.selectInfo)
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
.condition-box
    display flex
.condition-box-left
    flex 1
    margin-bottom 15px
.condition-box-right
    width 90px;
    text-align left
    margin-left 15px
>>>.condition-box-left .el-select .el-input
    width 100px;
>>> .el-input-group__append
        border-radius 2px!important;
>>>.el-input-group__prepend
        border-radius 2px!important;
</style>
