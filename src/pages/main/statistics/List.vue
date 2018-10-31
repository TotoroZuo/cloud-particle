/*
 * @Description: 数据统计管理
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
                    <el-radio-button :label="1">分局</el-radio-button>
                    <el-radio-button :label="2">派出所</el-radio-button>
                    <el-radio-button :label="3">警务室</el-radio-button>
                </el-radio-group>
                <el-dropdown size="small" split-button type="primary" trigger="click" style="float:right;margin-left:15px;" @visible-change="clearTempOptions">
                配置数据项
                <el-dropdown-menu  slot="dropdown" >
                    <el-scrollbar wrap-class="option-group-wrap" >
                        <el-checkbox-group v-model="selectOptionsTempKeys" class="optionGroup" size="small" >
                            <el-checkbox :label="item.name" v-for="(item,index) in optionsList" :key="item.name" :disabled="!index ? true : false">{{item.value}}</el-checkbox>
                        </el-checkbox-group>
                    </el-scrollbar>
                    <el-button type="text" class="do-option-select" @click="doOptionSelect">确定</el-button>
                </el-dropdown-menu>
                </el-dropdown>
                <el-button type="primary" size="small" style="float:right;" @click="doExport">导出表格</el-button>
            </div>
            <div class="search-right">
                <el-date-picker
                    class="statistics-search-date"
                    size="mini"
                    v-model="selectDate"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    @clear="getPageList"
                    range-separator="至"
                    start-placeholder="起始时间"
                    end-placeholder="结束时间">
                </el-date-picker>
            </div>

        </div>
        <div class="list-wrap">

             <el-table
            :data="dataList"
            class="statisticsList-table"
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
                    label="组织名称"
                    min-width="100"
                    align="center"
                    prop="org">
                </el-table-column>
                <el-table-column v-for="el in optionsList" :key="el.name" v-if="selectOptionsKeys.includes(el.name)"
                    :label="el.value"
                    align="center"
                    min-width="130"
                    sortable
                    :prop="el.name"
                    >
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
  name: 'statisticsList',
  data () {
    return {
      search: '',
      selectDate: null,
      cateType: 1,
      curPage: 1,
      total: 0,
      dataList: [],
      selectOptions: [], // 选中数据项
      selectOptionsKeys: [], // 选中数据想索引
      selectOptionsTempKeys: [], // 选中数据临时索引
      optionsList: [] // 配置项列表
    }
  },
  created () {
    this.getConfigList()
    this.getPageList()
  },
  methods: {
    /**
     * @description 获取配置项数据
     */
    getConfigList () {
      this.$apis.statistics.getConfigList({})
        .then(res => {
          if (res.code == '0000') {
            this.optionsList = res.data
            const keys = []
            let defaultKeys = []
            res.data.forEach(element => {
              keys.push(element.name)
            })
            defaultKeys = keys.splice(0, 7)
            this.selectOptionsKeys = defaultKeys
            this.selectOptionsTempKeys = [...defaultKeys]
          }
        })
        .catch(error => {
          if (error) {
            console.log(error)
          }
        })
    },
    /**
     * @description 获取列表数据
     */
    getPageList () {
      const param = {
        page: this.curPage,
        matchType: this.cateType
      }
      if (this.selectDate) {
        param.startDate = this.selectDate[0]
        param.endDate   = this.selectDate[1]
      }
      this.$apis.statistics.getPageList(param)
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
    },
    doOptionSelect () {
      this.selectOptionsKeys = [...this.selectOptionsTempKeys]
    },
    clearTempOptions (val) {
      console.log(val)
      if (!val) {
        this.selectOptionsTempKeys = [...this.selectOptionsKeys]
      }
    },
    doExport () {
      const param = {}
      if (this.selectDate) {
        param.startDate = this.selectDate[0]
        param.endDate   = this.selectDate[1]
      }
      this.$apis.statistics.doExport(param)
        .then(res => {
          console.log(res)
          if (res.code == '0000') {
            this.$common.openDownLoadLink(res.data, true)
          }
        })
        .catch(error => {
          if (error) {
            console.log(error)
          }
        })
    }

  },
  watch: {
    selectDate (val) {
      this.getPageList()
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
    margin-top:20px;
.search-container
    padding-bottom 15px

.single-add
    margin-right 15px
.pagination-wrap
    padding 15px 0

.statistics-search-date {
    border-top: none;
    border-right: none;
    border-left: none;
    width: 240px;
    margin-right: 15px;
}
>>>.statistics-search-date.el-range-editor.el-input__inner
    padding 3px 0;

>>>.option-group-wrap
    max-height 300px;
>>>.optionGroup
    padding 15px;
>>>.optionGroup .el-checkbox
    display  block
    padding 10px 0
>>>.optionGroup .el-checkbox+.el-checkbox
    margin-left 0
.statisticsList-table-wrap
    width 100%
//*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
>>>.statisticsList-table  .el-table__body-wrapper::-webkit-scrollbar {
    width:7px; height:10px!important;
    background-color:transparent!important;
    }
 /*定义滚动条轨道 内阴影+圆角*/
>>>.statisticsList-table .el-table__body-wrapper::-webkit-scrollbar-track {
    background-color:#f0f6ff!important;
}
/*定义滑块 内阴影+圆角*/
>>>.statisticsList-table  .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color:#73abb1!important;
     border-radius:6px!important;
}
.do-option-select
    float right
    margin-right 15px
</style>
