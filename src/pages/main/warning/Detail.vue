/*
 * @Description: 人员信息详情
 * @Author: Long maomao
 * @Date: 2018-10-23 11:39:52
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-11-05 17:25:29
 * @Email: zlf@zuolongfei.me
 */

<template>
    <div>
    <div class="people-detail-box global-list-container royal-paper royal-paper-1">
        <div class="detail-box-title">人员信息详情</div>
        <div class="people-detail-avator">
            <img :src="info.photo" alt="" v-if="info.photo">
        </div>
        <div class="people-detail-item-box">

            <el-form label-position="left"  inline class="detail-info-form">
                    <el-form-item label="姓名：">
                        <span>{{info.name}}</span>
                    </el-form-item>

                    <el-form-item label="身份证号：">
                        <span>
                            {{info.idCard}}
                        </span>
                    </el-form-item>
                        <el-form-item label="手机号码：">
                        <span>{{info.phone }}</span>
                    </el-form-item>
                    <el-form-item label="户籍所在地：">
                        <span>{{info.homeArea }}</span>
                    </el-form-item>
                    <el-form-item label="户籍地址：">
                        <span>{{info.homeAddress }}</span>
                    </el-form-item>
                    <el-form-item label="现居住地：">
                        <span>{{info.nowArea }}</span>
                    </el-form-item>
                    <el-form-item label="现居住地址：">
                        <span>{{info.nowAddress }}</span>
                    </el-form-item>
            </el-form>
        </div>
        <div class="clear"></div>
        <div class="detail-box-subtitle matchType" >
            <span>比中预警</span>
            <span class="patch-type" :style="{color:colors[matchType - 1]}">{{matchTypeString}}</span>
        </div>
        <div class="detail-box-subtitle">
            <span>历史记录</span>
        </div>
        <div>
            <el-form label-position="left"  inline class="detail-info-form">
                    <el-form-item :label="item.name+'：'" v-for="item in historyList" :key="item.filed">
                        <span>{{item.value}}</span>
                    </el-form-item>
            </el-form>
        </div>
    </div>

    <div class="global-list-container royal-paper royal-paper-1">
        <div class="detail-box-title">轨迹记录</div>
        <div class="list-wrap">
             <el-table
            :data="trackList"
            style="width: 100%">
            <el-table-column label="序号" width="60">
                <template slot-scope="props">
                    {{props.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                label="地址"
                align="center"
                prop="address"
                >
            </el-table-column>
            <el-table-column
                label="数据来源"
                align="center"
                prop="dataSource">
            </el-table-column>
            <el-table-column
                label="时间"
                prop="time">
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
    </div>
</template>
<script>
import HistoryData from './history.js'
export default {
  name: 'warningDetail',
  data () {
    return {

      // 上门调查
      info: {
        name: '',
        photo: '',
        idCard: '', // 身份证
        phone: '',  // 电话
        homeArea: '', // 户籍所在地
        homeAddress: '', //  户籍地址
        nowArea: '', // 现居地
        nowAddress: ''// 现居地址
      },
      curPage: 1,
      total: 0,
      // 轨迹信息
      trackList: [],
      matchType: '',
      matchTypeString: '',
      // 索引对照 0-吸涉毒人员 1-关注人员 2-吸毒在逃 3-涉案在逃 4-历史涉案 5-非法出所
      historyList: [],
      colors: ['#FA9857', '#6BB7F3', '#01A292', '#E95F45', '#23B6AE', '#4A9BFD']
    }
  },
  created () {
    this.getBaseDetail()
    this.getDetailHistory()
    this.getDetailTrack()
  },
  methods: {
    /**
     * @description 获取基本详情
     */
    getBaseDetail () {
      const id = this.$route.params.id
      if (!id) {
        return false
      }
      this.$apis.warning.getBaseDetail(id)
        .then(res => {
          if (res.code == '0000') {
            this.matchType = res.data.matchType
            this.matchTypeString = res.data.matchTypeString
            this.info = res.data.base
          }
        })
        .catch(error => {
          if (error) {
            console.log(error)
          }
        })
    },
    /**
     * @description 获取历史记录
     */
    getDetailHistory () {
      const id = this.$route.params.id
      if (!id) {
        return false
      }
      this.$apis.warning.getDetailHistory(id)
        .then(res => {
          if (res.code == '0000') {
            console.log(res)
            this.handleHistoryData(res.data)
          }
        })
        .catch(error => {
          if (error) {
            console.log(error)
          }
        })
    },
    // 处理历史记录数据
    handleHistoryData (data) {
      const list = HistoryData[(data.matchType - 1)]
      const result = data.history
      this.historyList =   list.map(element => {
        element.value = result[element.filed]
        return element
      })
    },
    /**
     * @description 获取历史轨迹
     */
    getDetailTrack () {
      const param = {
        page: this.curPage,
        id: this.$route.params.id
      }
      this.$apis.warning.getDetailTrack(param)
        .then(res => {
          if (res.code == '0000') {
            this.total = res.data.trackCount
            this.trackList = res.data.track
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
      this.getDetailTrack()
    }

  }
}
</script>
<style lang="stylus" scoped>
.detail-box-title
    font-size:20px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:24px;
    padding-bottom 15px;
.detail-box-subtitle
    font-size:18px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:24px;
    padding-bottom 15px;
.patch-type
   color:#999
   margin 0 20px
.people-detail-avator
    width 80px;
    min-height 80px;
    float left;
    padding-top 15px
.people-detail-avator img
    width 100%
.people-detail-item-box
    margin-left 100px
    padding-top 6px
.matchType
  padding-bottom 20px
>>>.detail-info-form .el-form-item__label
    font-size 16px
    color #333
    padding-right 5px
>>>.detail-info-form .el-form-item__content
    font-size 16px
    color #666
>>>.detail-info-form .el-form-item
    // min-width 200px
    margin-bottom 15px
    margin-right 20px;
.pagination-wrap
    padding 15px 0
</style>
