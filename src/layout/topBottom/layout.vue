<template>
    <el-container class="layout-main-container">

            <el-header class="layout-header" height="50px">
                <div class="layout-header-content">
                    <div class="header-content-left">
                        云粒智慧警务内网比对后台
                    </div>
                    <div class="header-content-middle">
                        <ul  class="el-menu--horizontal el-menu" style="background-color: rgb(21, 38, 55);">
                            <li
                            v-for="nav in navs"
                            :key="nav.path"
                            :class="['el-menu-item','layout-menu-item',{'is-active': nav.path == activeMenu}]"
                            @click="handleClickMenu(nav.path)" >
                              {{nav.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="header-content-right">
                            <el-dropdown class="accountDropmenu">
                                <a  class="header-account">
                                   <span class="accountName">{{userInfo.name}}</span>
                                </a>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>修改密码</el-dropdown-item>
                                    <el-dropdown-item divided @click.native="doLogout">退出登陆</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                    </div>
                </div>
            </el-header>

            <!-- router -->
            <el-main class="layout-main">
                <el-scrollbar class="latout-scrollbar" style="height:100%;">
                <!-- <root-path/> -->
                <div  >
                    <router-view ></router-view>
                </div>
                 </el-scrollbar>
            </el-main>
            <el-footer class="layout-footer" height="40px">
                © {{curYear}} <a href="https://github.com/TotoroZuo/royal-admin">{{copyRight}}</a>
            </el-footer>
        </el-container>
</template>

<script>
import setting from '@/config.js' // 配置文件
import avator from '@/components/Avator.vue' // 头像组件
import rootPath from '@/components/RouterPath.vue' // 当前路径
import navs from './menuList.js' // 获取导航菜单信息
const thisYear = new Date().getFullYear()

export default {
  name: 'mainLayout',
  components: {
    avator,
    rootPath
  },
  data () {
    return {
      navs,
      menuOpen: false,
      copyRight: setting.copyRight,
      curYear: thisYear
    }
  },
  mounted () {},
  methods: {
    doLogout () {
      this.$apis.user
        .doLogout({})
        .then(res => {
          if (!res) {
            // 失败之后消息提醒
            this.$notify({
              message: '系统异常',
              type: 'error',
              position: 'top-right',
              duration: 1000
            })
            return false
          }
          // 清除用户登陆状态
          this.$store.commit('user/clear')
          this.$router.push({ name: 'login' })
        })
        .catch(error => {
          if (error) {
            // 成功之后消息提醒
            this.$notify({
              message: '退出失败',
              type: 'error',
              position: 'top-right',
              duration: 1000
            })
          }
        })
    },
    // 处理点击菜单
    handleClickMenu (path) {
      this.$router.push({ path })
    }
  },
  computed: {
    activeMenu () {
      return this.$route.path
    },
    userInfo () {
      return this.$store.state.user.info
    }
  }
}
</script>
<style lang="stylus" scoped>
    @import './layout.styl'
</style>
