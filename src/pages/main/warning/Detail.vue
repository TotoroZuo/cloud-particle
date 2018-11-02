/*
 * @Description: 人员信息详情
 * @Author: Long maomao
 * @Date: 2018-10-23 11:39:52
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-10-23 11:39:52
 * @Email: zlf@zuolongfei.me
 */

<template>
    <div>
    <div class="people-detail-box global-list-container royal-paper royal-paper-1">
        <div class="detail-box-title">人员信息详情</div>
        <div>
            <el-form label-position="left"  inline class="detail-info-form">
                <template v-if="matchType==3">
                    <el-form-item label="地址：">
                        <span>{{info.address}}</span>
                    </el-form-item>
                    <el-form-item label="导入模板名称：">
                        <span>{{ info.template }}</span>
                    </el-form-item>
                    <el-form-item label="比中用水量：">
                        <span>{{ info.nCount }}</span>
                    </el-form-item>
                    <el-form-item label="比中用水价格：">
                        <span>{{ info.nPrice }}元</span>
                    </el-form-item>
                    <el-form-item label="历史月均用水量：">
                        <span>{{ info.avgCount }} 吨</span>
                    </el-form-item>
                    <el-form-item label="历史月均用水价格：">
                        <span>{{ info.avgPrice }} 元</span>
                    </el-form-item>
                    <el-form-item label="环比增长率：">
                        <span>{{ info.rate }} %</span>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="姓名：">
                        <span>{{ info.name}}</span>
                    </el-form-item>

                    <el-form-item label="身份证号：">
                        <span>
                            {{info.idCard}}
                        </span>
                    </el-form-item>
                        <el-form-item label="手机号码：">
                        <span>{{ info.phone }}</span>
                    </el-form-item>
                    <el-form-item label="户籍所在地：">
                        <span>{{ info.homeArea }}</span>
                    </el-form-item>
                    <el-form-item label="户籍地址：">
                        <span>{{ info.homeAddress }}</span>
                    </el-form-item>
                    <el-form-item label="现居住地：">
                        <span>{{ info.nowArea }}</span>
                    </el-form-item>
                    <el-form-item label="现居住地址：">
                        <span>{{ info.nowAddress }}</span>
                    </el-form-item>
                </template>
            </el-form>
        </div>
        <div class="detail-box-subtitle">
            <span>比中结果</span>
            <span class="patch-type">上门调查</span>
            <span>
                 <el-button type="primary" size="mini" @click="doHandle">处理</el-button>
            </span>
        </div>
    </div>
    <div class="global-list-container royal-paper royal-paper-1">
        <div class="detail-box-title">轨迹记录</div>
        <div class="list-wrap">
             <el-table
            :data="dataList"
            style="width: 100%">
            <el-table-column label="序号" width="60">
                <template slot-scope="props">
                    {{props.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                label="地址"
                align="center"
                prop="trackAddress"
                >
            </el-table-column>
            <el-table-column
                label="数据来源"
                align="center"
                prop="dataSource">
            </el-table-column>
            <el-table-column
                label="处理记录"
                align="center"
                prop="handleResult">
            </el-table-column>
            <el-table-column
                label="处理人"
                align="center"
                prop="handleUser">
            </el-table-column>
            <el-table-column
                label="时间"
                prop="time">
            </el-table-column>
        </el-table>

        </div>
    </div>
    </div>
</template>
<script>
export default {
  name: 'warningDetail',
  data () {
    return {
      matchType: '',
      // 上门调查
      info: {
        template: '',
        address: '',
        avgCount: '', // 平均用水量
        avgPrice: '', // 平均用水价格
        nCount: '', // 比中用水量
        nPrice: '', // 比中用水价格
        name: '',
        idCard: '', // 身份证
        phone: '',  // 电话
        homeArea: '', // 户籍所在地
        homeAddress: '', //  户籍地址
        nowArea: '', // 现居地
        nowAddress: ''// 现居地址
      },
      // 轨迹信息
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
      const id = this.$route.params.id
      if (!id) {
        return false
      }
      this.$apis.people.getDetail(id)
        .then(res => {
          if (res.code == '0000') {
            this.total = res.count
            this.dataList = res.data.tracks
            this.matchType = res.data.matchType
            this.info = res.data.base
          }
        })
        .catch(error => {
          if (error) {
            console.log(error)
          }
        })
    },
    doHandle () {
      this.$prompt('请输入处理内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入处理内容',
        inputErrorMessage: '请输入处理内容'
      }).then(({ value }) => {
        this.uploadHandle(value)
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    uploadHandle (content) {
      const id = this.$route.params.id
      if (!id) {
        return false
      }
      const params = {
        id: id,
        handleResult: content
      }
      this.$apis.people.doHandle(params)
        .then(res => {
          if (res.code == '0000') {
            this.$notify({
              type: 'success',
              message: '处理成功'
            })
            this.getPageList()
          } else {
            this.$notify({
              type: 'error',
              message: res.data
            })
          }
        })
        .catch(error => {
          if (error) {
            console.log(error)
          }
        })
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
</style>
