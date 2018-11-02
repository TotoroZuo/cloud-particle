// 验证手机号
const validatPhone = function (rule, value, callback) {
  if (/^1[34578]\d{9}$/.test(value) == false) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
export default {
  smsUserName: [
    { trigger: 'blur', required: true, message: '请输入真实姓名' },
    {
      pattern: /^[\u4E00-\u9FA5]+$/,
      message: '姓名只能为中文'
    }
  ],
  smsUserOrg: [
    { required: true, message: '请选择单位名称', trigger: 'change' }
  ],
  smsUserPhone: [
    { trigger: 'blur', required: true, message: '请输入手机号' },
    { validator: validatPhone, trigger: 'blur' }
  ],
  smsRuleTemplate: [
    { required: true, message: '请选择推送模块', trigger: 'change' }
  ]
}
