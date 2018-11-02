<template>
  <div class="login-container">
    <div class="login-main">
        <div class="login-main-left"></div>
        <div class="login-main-right">
        <div class="login-main-right-arrow"></div>
      <transition name="loginform">
        <div class="login-paper login-form-box" v-if="showPaper">
            <div class="login-title">云粒智慧警务</div>
            <div class="login-title-en">YUN LI ZHI HUI JING WU</div>
            <div class="login-form-inputs">
                <el-input
                    placeholder="请输入账号"
                    class="login-input"
                    v-model="username" @keyup.native.enter="doLogin">
                    <i slot="suffix" class="material-icons menu-icons">account_box</i>
                </el-input>
                <el-input
                    placeholder="请输入密码"
                    type="password"
                    class="login-input"
                    v-model="password" @keyup.native.enter="doLogin">
                    <i slot="suffix" class="material-icons menu-icons">lock</i>
                </el-input>
                <div class="login-msg" v-show="errMsg">
                    <i class="el-icon-error"></i> {{errMsg}}
                </div>
                <el-button type="primary"  class="do-login-btn" :disabled="inputFull" @click="doLogin">登陆</el-button>

            </div>
        </div>
      </transition>
      </div>
      <div class="backgroud-pic-box"></div>
    </div>

    <div class="login-footer">© {{curYear}} <a href="#">{{copyRight}}</a> </div>
  </div>
</template>
<script>
import setting from '@/config.js'
const thisYear = new Date().getFullYear()
export default {
  name: 'login',
  data () {
    return {
      copyRight: setting.copyRight, // 版权
      curYear: thisYear, // 当年时间
      showSlogan: false, // slogan是否显示
      showPaper: false, // 登陆框是否显示
      activeLoginType: 'password', // 登陆方式：password 账号密码登陆 code 扫码登陆
      username: '', // 用户名
      password: '', // 密码
      errMsg: '', // 错误信息
      loginDoing: false // 正在登录中
    }
  },
  mounted () {
    setTimeout(() => {
      this.showSlogan = true
      this.showPaper = true
    }, 100)
  },
  methods: {
    /**
    * @description  修改登陆方式
    */
    changeLoginType (tab, event) {
      this.activeLoginType = tab.name
    },
    /**
     * @description 进行登陆
     */
    doLogin () {
      this.errMsg = ''
      if (this.loginDoing) {
        return false
      }
      const params = {
        userName: this.username.replace(/\s+/g, ''),
        password: this.password.replace(/\s+/g, '')
      }

      // 发送登陆请求
      this.loginDoing = true
      this.$apis.user.doLogin(params)
        .then((res) => {
          if (res.code !== '0000') {
            this.errMsg = res.data
            this.loginDoing = false
            return false
          }
          // 更改 Vuex 用户状态
          this.$store.commit('user/set', res.data)
          // 成功之后消息提醒
          this.$notify({
            message: '恭喜你，登陆成功',
            type: 'success',
            position: 'top-right',
            duration: 1000,
            onClose: () => {
              this.loginDoing = false
              this.$router.push({ name: 'index' }) // 登陆成功跳转首页
            }
          })
        })
        .catch((error) => {
          console.log(error)
          this.loginDoing = false
        })
    }
  },
  computed: {
    /**
     * @description 账号密码不能为空
     */
    inputFull () {
      if (!this.username.replace(/\s+/g, '') || !this.password.replace(/\s+/g, '')) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import './login.styl'
</style>
