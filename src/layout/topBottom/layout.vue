<template>
    <el-container class="layout-main-container">

            <el-header class="layout-header" height="50px">
                <div class="layout-header-content">
                    <div class="header-content-left">
                        云粒智慧警务内网比对后台
                    </div>
                    <div class="header-content-middle">
                        <ul  class="el-menu--horizontal el-menu" style="background-color: rgb(21, 38, 55);">
                            <li  class="el-menu-item layout-menu-item is-active" >首页</li>
                            <li  class="el-menu-item layout-menu-item" >预警</li>
                            <li  class="el-menu-item layout-menu-item">人员信息</li>
                            <li  class="el-menu-item layout-menu-item">数据统计</li>
                            <li  class="el-menu-item layout-menu-item">导入文件</li>
                            <li  class="el-menu-item layout-menu-item">配置</li>
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

            <!-- iframe -->
            <el-main class="layout-main-iframe" v-if="iframeUrl">
                <el-scrollbar class="latout-scrollbar" style="height:100%;">
                <div class="layout-iframe-wrap">
                    <iframe :src="iframeUrl"  class="layout-iframe" frameborder="0" ></iframe>
                </div>
                </el-scrollbar>
            </el-main>
            <!-- router -->
            <el-main class="layout-main" v-else>
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
      menuOpen: false,
      copyRight: setting.copyRight,
      curYear: thisYear,
      menuWith: '201px',
      iframeUrl: '',
      activeIndex2: '1',
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
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
    changeMenuWidth () {
      setTimeout(() => {
        if (this.menuOpen) {
          this.menuWith = '66px'
        } else {
          this.menuWith = '201px'
        }
      }, 0)
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
    handleClickMenu (path, _blank) {
      if (_blank) {
        window.open(path)
        return false
      }
      if (path.indexOf('http') !== -1 || path.indexOf('https') !== -1) {
        this.iframeUrl = path
      } else {
        this.iframeUrl = ''
        this.$router.push({ path })
      }
    }
  },
  computed: {
    active () {
      return this.$store.state.menu.active
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
