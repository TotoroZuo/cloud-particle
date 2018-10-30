/*
 * @Description: 后台用户管理
 * @Author: Long maomao
 * @Date: 2018-10-23 11:39:52
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-10-23 11:39:52
 * @Email: zlf@zuolongfei.me
 */

<template>
    <div class="global-list-container royal-paper royal-paper-1">
        <div class="search-container">
            <div class="search-left">
                <el-radio-group v-model="cateType" size="small" @change="getPageList">
                    <el-radio-button :label="0" >全部预警 {{cateCount.qbxx ? cateCount.qbxx : ''}}
                    </el-radio-button>
                    <el-radio-button :label="4" >涉案在逃 {{cateCount.sazt ? cateCount.sazt : ''}}
                    </el-radio-button>
                    <el-radio-button :label="3" >吸毒在逃 {{cateCount.xdzt ? cateCount.xdzt : ''}}</el-radio-button>
                    <el-radio-button :label="1" >吸涉毒人员 {{cateCount.xdry ? cateCount.xdry : ''}}</el-radio-button>
                    <el-radio-button :label="2" >关注人员 {{cateCount.gzry ? cateCount.gzry : ''}}</el-radio-button>
                    <el-radio-button :label="5" >历史涉案人员 {{cateCount.lssa ? cateCount.lssa : ''}}</el-radio-button>
                    <el-radio-button :label="6" >非法出所 {{cateCount.ffcs ? cateCount.ffcs : ''}}</el-radio-button>
                </el-radio-group>
            </div>
            <div class="search-right">
                <el-input placeholder="请输入人员姓名或身份证号" clearable size="small" v-model="search" @clear="getPageList" @keyup.enter.native="getPageList" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="getPageList"></el-button>
                </el-input>
            </div>

        </div>
        <div class="list-wrap">
             <el-table
            :data="dataList"
            style="width: 100%">
            <el-table-column
                label="序号"
                width="60"
                align="center"
            >
                <template slot-scope="props">
                    {{props.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                label="比中人员"
                align="center"
                prop="personName"
                >
            </el-table-column>
            <el-table-column
                label="身份证号"
                align="center"
                prop="personIdCard">
            </el-table-column>
            <el-table-column
                label="预警类型"
                align="center"
                prop="matchType">
            </el-table-column>
            <el-table-column
                label="数据来源"
                align="center"
                prop="dataSource">
            </el-table-column>
            <el-table-column
                label="比中条件"
                prop="matchCondition">
            </el-table-column>
            <el-table-column
                label="比中时间"
                prop="time">
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
                 <template slot-scope="props">
                     <el-button type="text" size="small" title="编辑用户">详情</el-button>
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
        <!-- 用户添加编辑组件 -->
        <user-dialog :open.sync="openDialog"  :type.sync="dialogType" />
    </div>
</template>
<script>
import userDialog from '@/pages/main/system/users/Dialog.vue' // 添加组件
import avator from '@/components/Avator.vue' // 头像组件
export default {
  name: 'usersList',
  components: {
    userDialog,
    avator
  },
  data () {
    return {
      openDialog: false,
      dialogType: 'add',
      search: '',
      cateType: 0,
      curPage: 1,
      total: 0,
      cateCount: {
        qbxx: 0, // 全部
        lssa: 0, // 历史涉案人员
        gzry: 0, // 关注人员
        xdry: 0, // 吸涉赌人员
        sazt: 0, // 涉案在逃
        xdzt: 0, // 吸毒在逃
        ffcs: 0 // 非法出所
      },
      dataList: [
        {
          uid: 'aaa',
          num: 1,
          name: '做龙飞',
          idcard: '410123198912115050',
          type: '涉案在逃',
          origin: '房屋租赁登记',
          hit: '全国打防控',
          hitTime: '2018-10-27 19:25:59'
        }
      ],
      multipleSelection: []
    }
  },
  created () {
    this.getPageList()
    this.getCateCount()
  },
  methods: {
    getPageList () {
      const param = {
        page: this.curPage,
        matchType: this.cateType,
        search: this.search
      }
      this.$apis.warning.getPageList(param)
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
    getCateCount () {
      this.$apis.warning.getCateCount({})
        .then(res => {
          if (res.code == '0000') {
            this.cateCount = res.data
          }
        }).catch(error => {
          if (error) {
            console.log(error)
          }
        })
    },
    handleCurrentChange (val) {
      this.curPage = val
      this.getPageList()
    },
    showEditorUser () {
      this.dialogType = 'editor'
      const userInfo = {
        uid: 'aaa',
        account: 'sssss',
        password: 'sssssss',
        avator: '',
        org: 'org1',
        role: [],
        name: '做龙飞',
        enable: true,
        phone: '',
        idcard: '',
        isSuper: false
      }
      this.$store.commit('options/setSelectUser', userInfo)
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
    showDetail (row) {
      this.$refs.userList.toggleRowExpansion(row)
    }
  }
}
</script>
<style lang="stylus" scoped>
.global-list-container
    padding 15px
    border-radius: 6px;
>>>.search-left .el-radio-button
    margin-right 10px;
>>>.search-left .el-radio-button__inner
    border-left 1px solid #dcdfe6
    border-radius 4px
>>>.search-left .el-radio-button__orig-radio:checked+.el-radio-button__inner
     border 1px solid #409EFF!important
.search-right
    width 300px;
    margin-top:20px;
.search-container
    padding 15px
    // border: 1px solid #ebeef5;
    // border-bottom none
.search-container:after
    content ''
    display block
    height 0
    width 100%
    clear both
.single-add
    margin-right 15px
.pagination-wrap
    padding 15px 0
    // border: 1px solid #ebeef5;
    // border-top none
</style>
