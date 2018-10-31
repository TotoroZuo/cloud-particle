<template>
  <div class="home-container">
      <div class="home-container-item">
          <div class="home-item-left royal-paper royal-paper-1 ">
              <div>
                <div class="home-item-title home-chart-title">
                    比中数据数量
                </div>
                <div class="home-item-search">
                    <el-date-picker
                        class="home-search-date"
                        v-model="lineChart.date"
                        size="mini"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="起始时间"
                        end-placeholder="结束时间">
                    </el-date-picker>
                    <el-select v-model="lineChart.type" size="mini" class="home-search-select" placeholder="请选择分类">
                        <el-option
                            v-for="item in typeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="clear"></div>
              </div>
              <div class="home-chart-box">
                  <div ref="home-chart-top" class="home-chart-wrap"></div>
              </div>
          </div>
          <div class="home-item-right royal-paper royal-paper-1">
              <div class="home-item-title">
                  最新预警
              </div>
               <Timeline v-if="warningList.length">
                    <template v-for="(item,index) in warningList">
                        <TimelineItem :key="item.id" v-if="index<1">
                        <p class="timeline-content timeline-active">
                            <span class="titmeline-span">{{item.dataSource}}</span>
                            <span class="titmeline-span">{{item.personName}}</span>
                            <span class="titmeline-span">{{item.personIdCard}}</span>
                        </p>
                        <p class="timeline-time timeline-active">{{item.gmtCreate}}</p>
                        </TimelineItem>
                        <TimelineItem :key="item.id" v-else>
                            <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                            <p class="timeline-content">
                                <span class="titmeline-span">{{item.dataSource}}</span>
                                <span class="titmeline-span">{{item.personName}}</span>
                                <span class="titmeline-span">{{item.personIdCard}}</span>
                            </p>
                            <p class="timeline-time">{{item.gmtCreate}}</p>
                        </TimelineItem>
                    </template>

                </Timeline>
                <div class="home-item-nodata" v-else>
                        暂无数据
                </div>
          </div>
      </div>
      <div class="home-container-item">
          <div class="home-item-left royal-paper royal-paper-1 ">
              <div>
                <div class="home-item-title home-chart-title">
                    派出所辖区比中数据数量/派出所
                </div>
                <div class="home-item-search">
                    <el-select v-model="barChart.type" size="mini" class="home-search-select" placeholder="请选择分类">
                            <el-option
                            v-for="item in typeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </div>
                <div class="clear"></div>
              </div>
              <div class="home-chart-box">
                  <div ref="home-chart-bottom" class="home-chart-wrap"></div>
              </div>
          </div>
          <div class="home-item-right royal-paper royal-paper-1">
              <div class="home-item-title">
                  最新人员信息
              </div>
               <Timeline v-if="peopleList.length">
                    <template v-for="(item,index) in peopleList">
                        <TimelineItem :key="item.id" v-if="index<1">
                        <p class="timeline-content timeline-active">
                            <span class="titmeline-span">{{item.dataSource}}</span>
                            <span class="titmeline-span">{{item.personName}}</span>
                            <span class="titmeline-span">{{item.personIdCard}}</span>
                        </p>
                        <p class="timeline-time timeline-active">{{item.gmtCreate}}</p>
                        </TimelineItem>
                        <TimelineItem :key="item.id" v-else>
                            <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                            <p class="timeline-content">
                                <span class="titmeline-span">{{item.dataSource}}</span>
                                <span class="titmeline-span">{{item.personName}}</span>
                                <span class="titmeline-span">{{item.personIdCard}}</span>
                            </p>
                            <p class="timeline-time">{{item.gmtCreate}}</p>
                        </TimelineItem>
                    </template>

                </Timeline>
                <div class="home-item-nodata" v-else>
                    暂无数据
                </div>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Timeline, TimelineItem } from 'iview'
import echarts from 'echarts'
import '@/styles/timeline.css'
export default {
  name: 'home',
  data () {
    return {
      lineChart: {
        date: '',
        type: 0,
        instance: null
      },
      typeList: [{ value: 0, label: '比中预警' }, { value: 1, label: '人员信息' }],
      barChart: {
        date: '',
        type: 0,
        instance: null
      },
      warningList: [],
      peopleList: []
    }
  },
  components: {
    Timeline,
    TimelineItem
  },
  created () {
    this.getPageData()
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.showTopChart()
        this.showBottomChart()
      }, 100)
    })
  },
  methods: {
    watchWindow (chart) {
      window.onresize = () => {
        setTimeout(() => {
          if (this.lineChart.instance && this.barChart.instance) {
            this.lineChart.instance.resize()
            this.barChart.instance.resize()
          }
        }, 100)
      }
    },
    /**
     * @description 获取页面数据
     */
    getPageData () {
      this.getLineChartData()
      this.getBarChartData()
      this.getWarningData()
      this.getPeopleData()
    },
    /**
     * @description 获取折现图数据
     */
    getLineChartData () {
      const param = {}
      param.type  = this.lineChart.type
      if (this.lineChart.date) {
        param.startDate = this.lineChart.date[0]
        param.endDate   = this.lineChart.date[1]
      }
      this.$apis.home.getLineChartData(param)
        .then((res) => {
          console.log(res)
        }).catch(error => {
          if (error) {
            console.log(error)
          }
        })
    },
    /**
     * @description 获取柱状图数据
     */
    getBarChartData () {
      const param = {}
      param.type  = this.lineChart.type
      this.$apis.home.getBarChartData(param)
        .then((res) => {
          console.log(res)
        }).catch(error => {
          if (error) {
            console.log(error)
          }
        })
    },
    /**
     * @description 获取最新预警数据
     */
    getWarningData () {
      this.$apis.home.getWarningData({})
        .then((res) => {
          if (res.code == '0000') {
            this.warningList = res.data
          }
        }).catch(error => {
          if (error) {
            console.log(error)
          }
        })
    },
    /**
     * @description 获取最新人员信息数据
     */
    getPeopleData () {
      this.$apis.home.getPeopleData({})
        .then((res) => {
          if (res.code == '0000') {
            this.peopleList = res.data
          }
        }).catch(error => {
          if (error) {
            console.log(error)
          }
        })
    },
    /**
     * @description echarts 图表绘制
     */
    drawLineChart (ref, option) {
      const myChart  = echarts.init(this.$refs[ref])
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      if (ref == 'home-chart-top') {
        this.lineChart.instance = myChart
      } else {
        this.barChart.instance = myChart
      }
      this.watchWindow()
    },
    showTopChart () {
      const option = {
        backgroundColor: '#fff',
        color: [
          '#4A9BFD',
          '#E95F45',
          '#01A292'
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: '#fff',
          textStyle: {
            color: '#666'
          },
          extraCssText: 'box-shadow:0px 2px 6px 0px rgba(0, 0, 0, 0.1);'
        },
        grid: {
          top: '5%',
          left: '0%',
          right: '2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        },
        series: [
          {
            name: '邮件',
            type: 'line',
            smooth: true,
            symbolSize: 6,
            data: [120, 82, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟',
            type: 'line',
            smooth: true,
            symbolSize: 6,
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            smooth: true,
            symbolSize: 6,
            data: [150, 232, 201, 154, 190, 330, 310]
          }
        ]
      }
      this.drawLineChart('home-chart-top', option)
    },
    showBottomChart () {
      const option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          textStyle: {
            color: '#666'
          },
          extraCssText: 'box-shadow:0px 2px 6px 0px rgba(0, 0, 0, 0.1);'
        },
        grid: { // 坐标系内绘图网格
          top: 10,
          right: 10,
          bottom: 10,
          left: 0,
          containLabel: true
        },
        xAxis: [{// x轴
          type: 'category',
          data: ['2017-05-01', '2017-05-02', '2017-05-03', '2017-05-04', '2017-05-06', '2017-05-07', '2017-05-08'],
          axisLine: { // 坐标轴轴线相关设置。
            lineStyle: {
              color: '#999'
            }
          }
        }],
        yAxis: [{// y轴
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        }],
        series: [{// 系列列表。每个系列通过 type 决定自己的图表类型
          name: '直接访问', // 系列名称，用于tooltip的显示
          type: 'bar',
          barWidth: 5,
          data: [10, 52, 200, 334, 390, 330, 220]
        }, {// 系列列表。每个系列通过 type 决定自己的图表类型
          name: '必应访问', // 系列名称，用于tooltip的显示
          type: 'bar',
          barWidth: 5,
          data: [22, 112, 230, 334, 340, 350, 320]
        }, {// 系列列表。每个系列通过 type 决定自己的图表类型
          name: '微博访问', // 系列名称，用于tooltip的显示
          type: 'bar',
          barWidth: 5,
          data: [22, 82, 230, 234, 350, 350, 320]
        }]
      }
      this.drawLineChart('home-chart-bottom', option)
    }
  }
}
</script>
<style scoped lang="stylus">
$radius = 6px;

.home-container-item {
    width 100%;
    display: flex;
    max-width: 1400px;
    margin: 0 auto;
    margin-bottom: 20px;
}

.home-item-left {
    flex: 1;
    margin-right: 15px;
    padding: 15px;
    border-radius: $radius;
}

.home-item-right {
    width 380px;
    min-width 380px;
    padding: 15px;
    padding-bottom: 0;
    border-radius: $radius;
}

.timeline-icon {
    color: #666666;
    font-size: 10px;
}

.timeline-time {
    margin: 0;
    padding: 0;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: 400;
    margin-top: 10px;
}

.timeline-content {
    width 100%;
    overflow hidden
    white-space:nowrap
    text-overflow:ellipsis
    padding: 0;
    margin: 0;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    font-size: 16px;
}

.timeline-active {
    color: #6BB7F3;
}

.home-item-title {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    padding-bottom: 20px;
}

.titmeline-span {
    margin-right: 15px;
}

.home-chart-title {
    float: left;
}

.home-item-search {
    float: right;
}

.home-search-date {
    border-top: none;
    border-right: none;
    border-left: none;
    width: 220px;
    margin-right: 15px;
}

.home-search-select {
    width: 100px;
    vertical-align bottom
}

>>>.home-search-select .el-input {
    width: auto;
}

>>>.home-search-select .el-input__inner {
    border-top: none;
    border-right: none;
    border-left: none;
}
>>>.home-search-select .el-input--mini .el-input__inner::placeholder
    font-size 12px;

>>>.home-item-search .el-input__inner {
    padding: 3px 0px;
}

.home-chart-wrap {
    width: 100%;
    height: 300px;
}
.home-item-nodata
    color #999
</style>
