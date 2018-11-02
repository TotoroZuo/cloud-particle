
export default {
  old: [
    { trigger: 'blur', message: '请输入密码' },
    {
      min: 6,
      max: 10,
      message: '密码长度在 6 到 10 个字符'
    },
    {
      pattern: /^(\w){6,10}$/,
      message: '只能输入字母、数字、下划线'
    }
  ],
  new: [
    { trigger: 'blur', message: '请输入密码' },
    {
      min: 6,
      max: 10,
      message: '密码长度在 6 到 10 个字符'
    },
    {
      pattern: /^(\w){6,10}$/,
      message: '只能输入字母、数字、下划线'
    }
  ],
  again: [
    { trigger: 'blur', message: '请输入密码' },
    {
      min: 6,
      max: 10,
      message: '密码长度在 6 到 10 个字符'
    },
    {
      pattern: /^(\w){6,10}$/,
      message: '只能输入字母、数字、下划线'
    }
  ]

}
