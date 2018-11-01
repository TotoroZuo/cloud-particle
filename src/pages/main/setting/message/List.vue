/*
 * @Description: 配置短信规则信息
 * @Author: Long maomao
 * @Date: 2018-10-23 11:39:52
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-10-23 11:39:52
 * @Email: zlf@zuolongfei.me
 */

<template>
    <div class="users-list-container">
        <div class="search-right">
            <el-input placeholder="请输入人员姓名或身份证号" clearable size="small" v-model="search" @clear="getPageList" @keyup.enter.native="getPageList" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="getPageList"></el-button>
            </el-input>

        </div>
        <div class="list-wrap">
            <el-table
            :data="dataList"
            style="width: 100%">
            <el-table-column
                label="序号"
                width="60"
            >
                <template slot-scope="props">
                    {{props.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                label="姓名"
                align="center"
                prop="smsUserName"
                >
            </el-table-column>
            <el-table-column
                label="手机号"
                align="center"
                prop="smsUserPhone">
            </el-table-column>
            <el-table-column
                label="推送模块"
                align="center"
                prop="templateString">
            </el-table-column>
            <el-table-column
                label="单位"
                prop="smsUserOrg">
            </el-table-column>
            <el-table-column
                label="注册时间"
                prop="time">
            </el-table-column>
            <el-table-column
                label="状态">
                <template slot-scope="props">
                     {{props.row.smsRuleStatus ?'禁用':'正常'}}
                 </template>
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
    </div>
</template>
<script>
export default {
  name: 'settingMessageList',
  data () {
    return {
      search: '',
      curPage: 1,
      total: 0,
      dataList: []
    }
  },
  created () {
    this.getPageList()
  },
  methods: {
    /**
     * @description 获取列表数据
     */
    getPageList () {
      const param = {
        page: this.curPage,
        search: this.search
      }
      this.$apis.settingMessage.getPageList(param)
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
    /**
     * @description 改变页码
     */
    handleCurrentChange (val) {
      this.curPage = val
      this.getPageList()
    }
  }
}
</script>
<style lang="stylus" scoped>

.search-right
    width 300px;
    margin-top:20px;
    padding-bottom 15px;

.single-add
    margin-right 15px
.pagination-wrap
    padding 15px 0

</style>
