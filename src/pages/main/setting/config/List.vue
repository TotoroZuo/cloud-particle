/*
 * @Description: 配置策略
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
                label="比中名称"
                align="center"
                prop="policyConfigName"
                >
            </el-table-column>
            <el-table-column
                label="比中条件"
                align="center"
                prop="policyCondition">
            </el-table-column>
            <el-table-column
                label="配置条件"
                align="center"
                prop="configCondition">
            </el-table-column>
            <el-table-column
                label="配置时间"
                align="center"
                prop="time">
            </el-table-column>

            <el-table-column label="操作" width="100" align="center">
                 <template slot-scope="props">
                     <el-button type="text" size="small" title="编辑策略" @click="showEditorMessage(props.row)">编辑</el-button>
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
        <settingConfigDialog :open.sync="openDialog"  :type.sync="dialogType" @change="getPageList"/>
    </div>
</template>
<script>
import settingConfigDialog from './Dialog.vue' // 添加组件
export default {
  name: 'settingConfigList',
  components: {
    settingConfigDialog
  },
  data () {
    return {
      search: '',
      curPage: 1,
      total: 0,
      dataList: [],
      openDialog: false,
      dialogType: 'add'
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
      this.$apis.settingConfig.getPageList(param)
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
    showEditorMessage (userData) {
      this.dialogType = 'editor'
      const configInfo = {
        policyConfigId: userData.policyConfigId,
        policyConfigName: userData.policyConfigName,
        policyCondition: userData.policyCondition,
        policyConfigCondition: userData.policyConfigCondition ? JSON.parse(userData.policyConfigCondition) : [{ compare: '大于等于', data: 0, logic: '或' }]
      }
      this.$store.commit('options/setSelectSettingConfig', configInfo)
      if (this.openDialog) {
        this.openDialog = false
      }
      this.openDialog = true
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
