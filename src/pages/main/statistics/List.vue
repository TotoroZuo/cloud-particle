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
                <el-radio-group v-model="radio5" size="small">
                    <el-radio-button label="分局"></el-radio-button>
                    <el-radio-button label="派出所"  ></el-radio-button>
                    <el-radio-button label="警务室"></el-radio-button>
                </el-radio-group>

                <el-button type="primary" size="mini" style="float:right;">导出表格</el-button>
            </div>
            <div class="search-right">
                <el-date-picker
                    class="statistics-search-date"
                    size="mini"
                    v-model="search.date"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="起始时间"
                    end-placeholder="结束时间">
                </el-date-picker>
                <el-select v-model="value" class="statistics-search-select" size="mini" placeholder="数据配置项">
                        <el-option
                        label="全部"
                        value="all">
                        </el-option>
                        <el-option
                        label="配置一"
                        value="一">
                        </el-option>
                </el-select>
            </div>

        </div>
        <div class="list-wrap">
             <el-table
            :data="tableData"
            @selection-change="handleSelectionChange"
            ref="userList"
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
                label="分局名称"
                align="center"
                prop="name"
                >
            </el-table-column>
            <el-table-column
                label="接入派出所"
                align="center"
                sortable
                prop="jrpcs">
            </el-table-column>
            <el-table-column
                label="接入警务室"
                align="center"
                sortable
                prop="jrjws">
            </el-table-column>
            <el-table-column
                label="民警端用户"
                align="center"
                sortable
                prop="mjdyh">
            </el-table-column>
            <el-table-column
                label="群众端用户"
                sortable
                prop="qzdyh">
            </el-table-column>
            <el-table-column
                label="无证住宿"
                sortable
                prop="wzzs">
            </el-table-column>

            <el-table-column
                label="企事业单位"
                sortable
                prop="qsydw">
            </el-table-column>
            <el-table-column
                label="房屋"
                sortable
                prop="fw">
            </el-table-column>
            <el-table-column
                label="线索爆料"
                sortable
                prop="xsbl">
            </el-table-column>
            <el-table-column
                label="暂住申报"
                sortable
                prop="zzsb">
            </el-table-column>
        </el-table>

        </div>
        <div class="pagination-wrap">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total,prev, pager, next, jumper"
            :total="400">
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
      search: {
        date: ''
      },
      value: '',
      openDialog: false,
      dialogType: 'add',
      checkedList: [],
      radio5: '',
      select: '',
      input5: '',
      currentPage4: 1,
      tableData5: [],
      tableData: [
        {
          uid: 'aaa',
          num: 1,
          name: '做龙飞',
          jrpcs: 10,
          jrjws: '100',
          mjdyh: 1000,
          qzdyh: 10000,
          wzzs: 50000,
          qsydw: 1500,
          fw: 500,
          xsbl: 65000,
          zzsb: 1000
        },
        {
          uid: 'aaa',
          num: 1,
          name: '做龙飞',
          jrpcs: 10,
          jrjws: '100',
          mjdyh: 1000,
          qzdyh: 10000,
          wzzs: 50000,
          qsydw: 1500,
          fw: 500,
          xsbl: 65000,
          zzsb: 1000
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val)
      this.checkedList = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
.user-list-container
    padding 15px
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
    padding 15px
    border: 1px solid #ebeef5;
    border-bottom none
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
    border: 1px solid #ebeef5;
    border-top none

.statistics-search-date {
    border-top: none;
    border-right: none;
    border-left: none;
    width: 240px;
    margin-right: 15px;
}
>>>.statistics-search-date.el-range-editor.el-input__inner
    padding 3px 0;

.statistics-search-select {
    width: 100px;
}

>>>.statistics-search-select .el-input {
    width: auto;
}

>>>.statistics-search-select .el-input__inner {
    border-top: none;
    border-right: none;
    border-left: none;
}

</style>
