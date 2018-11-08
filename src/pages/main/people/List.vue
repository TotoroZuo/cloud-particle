/*
 * @Description: 人员信息
 * @Author: Long maomao
 * @Date: 2018-10-23 11:39:52
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-11-08 13:52:13
 * @Email: zlf@zuolongfei.me
 */

<template>
    <div class="global-list-container royal-paper royal-paper-1">
        <div class="search-container">
            <div class="search-left">
                <el-radio-group v-model="cateType" size="small" @change="getPageList">
                    <el-radio-button :label="0">全部信息 {{cateCount.qbxx ? cateCount.qbxx : ''}}</el-radio-button>
                    <el-radio-button :label="1">流口登记 {{cateCount.lkdj ? cateCount.lkdj : ''}}</el-radio-button>
                    <el-radio-button :label="2">人户分离 {{cateCount.rhfl ? cateCount.rhfl : ''}}</el-radio-button>
                    <el-radio-button :label="3">上门调查 {{cateCount.smdc ? cateCount.smdc : ''}}</el-radio-button>
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
                label="比中类型"
                align="center"
                prop="matchTypeString">
            </el-table-column>
            <el-table-column
                label="数据来源"
                align="center"
                prop="dataSource">
            </el-table-column>
            <el-table-column
                label="比中时间"
                prop="time">
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
                 <template slot-scope="props">
                     <el-button type="text" size="small" title="编辑用户" @click="showDetail(props.row.id)">详情</el-button>
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
  name: 'peopleList',
  data () {
    return {
      search: '',
      cateType: 0,
      curPage: 1,
      total: 0,
      cateCount: {
        qbxx: 0, // 全部
        lkdj: 0, // 流口登记
        rhfl: 0, // 人户分离
        smdc: 0 // 上门调查
      },
      dataList: []
    }
  },
  created () {
    this.getPageList()
    this.getCateCount()
  },
  methods: {
    /**
     * @description 获取列表数据
     */
    getPageList () {
      const param = {
        page: this.curPage,
        matchType: this.cateType,
        search: this.search
      }
      this.$apis.people.getPageList(param)
        .then(res => {
          if (res.code == '0000') {
            this.total = res.count
            this.dataList = res.data
          } else {
            this.$notify({
              title: '数据异常',
              message: res.data,
              position: 'top-right',
              type: 'warning'
            })
          }
        })
        .catch(error => {
          if (error) {
            console.log(error)
          }
        })
    },
    /**
     * @description 获取分类数量数据
     */
    getCateCount () {
      this.$apis.people.getCateCount({})
        .then(res => {
          if (res.code == '0000') {
            this.cateCount = res.data
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
    /**
     * @description 改变页码
     */
    handleCurrentChange (val) {
      this.curPage = val
      this.getPageList()
    },
    showDetail (id) {
      this.$router.push({ name: 'peopleDetail', params: { id } })
    }
  }
}
</script>
<style lang="stylus" scoped>

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
    padding-bottom 15px;

.single-add
    margin-right 15px
.pagination-wrap
    padding 15px 0

</style>
