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
                                   <span class="accountName">张莉莎</span>
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
const thisYear = new Date().getFullYear()
const navs = [
  {
    name: '首页',
    path: '/index'
  },
  {
    name: '预警',
    path: '/warning'
  },
  {
    name: '人员信息',
    path: '/people'
  },
  {
    name: '数据统计',
    path: '/statistics'
  },
  {
    name: '导入文件',
    path: '/imports'
  },
  {
    name: '配置',
    path: '/setting'
  }
]
export default {
  name: 'mainLayout',
  props: {
    msg: String
  },
  components: {
    avator,
    rootPath
  },
  data () {
    return {
      navs,
      menuOpen: false,
      copyRight: setting.copyRight,
      curYear: thisYear,
      menuWith: '201px',
      iframeUrl: ''
    }
  },
  mounted () {
    this.getMenuList()
  },
  methods: {
    toggleOpenMenu () {
      this.menuOpen = !this.menuOpen
      this.changeMenuWidth()
    },
    doLogout () {
      this.$store.commit('user/clear')
      this.$router.push({ name: 'login' })
    },
    // 获取菜单列表
    getMenuList () {
      const param = { token: this.userToken }
      this.$apis.menu.getList(param).then((res) => {
        this.$store.commit('menu/setList', res.data)
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
    userToken () {
      return this.$store.state.user.token
    },
    menuList () {
      return this.$store.state.menu.menuList
    }
  }
}
</script>
<style lang="stylus" scoped>
    @import './layout.styl'
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
