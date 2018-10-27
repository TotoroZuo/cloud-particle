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
                        v-model="search.date"
                        size="mini"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="起始时间"
                        end-placeholder="结束时间">
                    </el-date-picker>
                    <el-select v-model="value" size="mini" class="home-search-select" placeholder="请选择">
                            <el-option
                            v-for="item in options"
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
               <Timeline>
                    <TimelineItem>
                        <p class="timeline-content timeline-active">
                            <span class="titmeline-span">上门调查</span>
                            <span class="titmeline-span">王小花</span>
                            <span class="titmeline-span">362424199606100102</span>
                        </p>
                        <p class="timeline-time timeline-active">2018-10-25 12:03:45</p>
                    </TimelineItem>
                    <TimelineItem>
                        <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                        <p class="timeline-content">
                            <span class="titmeline-span">上门调查</span>
                            <span class="titmeline-span">王小花</span>
                            <span class="titmeline-span">362424199606100102</span>
                        </p>
                        <p class="timeline-time">2018-10-25 12:03:45</p>
                    </TimelineItem>
                    <TimelineItem>
                        <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                        <p class="timeline-content">
                            <span class="titmeline-span">上门调查</span>
                            <span class="titmeline-span">王小花</span>
                            <span class="titmeline-span">362424199606100102</span>
                        </p>
                        <p class="timeline-time">2018-10-25 12:03:45</p>
                    </TimelineItem>
                    <TimelineItem>
                        <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                        <p class="timeline-content">
                            <span class="titmeline-span">上门调查</span>
                            <span class="titmeline-span">王小花</span>
                            <span class="titmeline-span">362424199606100102</span>
                        </p>
                        <p class="timeline-time">2018-10-25 12:03:45</p>
                    </TimelineItem>
                    <TimelineItem>
                        <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                        <p class="timeline-content">
                            <span class="titmeline-span">上门调查</span>
                            <span class="titmeline-span">王小花</span>
                            <span class="titmeline-span">362424199606100102</span>
                        </p>
                        <p class="timeline-time">2018-10-25 12:03:45</p>
                    </TimelineItem>
                </Timeline>
          </div>
      </div>
      <div class="home-container-item">
          <div class="home-item-left royal-paper royal-paper-1 ">
              <div>
                <div class="home-item-title home-chart-title">
                    派出所辖区比中数据数量/派出所
                </div>
                <div class="home-item-search">
                    <el-date-picker
                        class="home-search-date"
                        v-model="search.date"
                        size="mini"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="起始时间"
                        end-placeholder="结束时间">
                    </el-date-picker>
                    <el-select v-model="value" size="mini" class="home-search-select" placeholder="请选择">
                            <el-option
                            v-for="item in options"
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
               <Timeline>
                    <TimelineItem>
                        <p class="timeline-content timeline-active">
                            <span class="titmeline-span">上门调查</span>
                            <span class="titmeline-span">王小花</span>
                            <span class="titmeline-span">362424199606100102</span>
                        </p>
                        <p class="timeline-time timeline-active">2018-10-25 12:03:45</p>
                    </TimelineItem>
                    <TimelineItem>
                        <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                        <p class="timeline-content">
                            <span class="titmeline-span">上门调查</span>
                            <span class="titmeline-span">王小花</span>
                            <span class="titmeline-span">362424199606100102</span>
                        </p>
                        <p class="timeline-time">2018-10-25 12:03:45</p>
                    </TimelineItem>
                    <TimelineItem>
                        <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                        <p class="timeline-content">
                            <span class="titmeline-span">上门调查</span>
                            <span class="titmeline-span">王小花</span>
                            <span class="titmeline-span">362424199606100102</span>
                        </p>
                        <p class="timeline-time">2018-10-25 12:03:45</p>
                    </TimelineItem>
                    <TimelineItem>
                        <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                        <p class="timeline-content">
                            <span class="titmeline-span">上门调查</span>
                            <span class="titmeline-span">王小花</span>
                            <span class="titmeline-span">362424199606100102</span>
                        </p>
                        <p class="timeline-time">2018-10-25 12:03:45</p>
                    </TimelineItem>
                    <TimelineItem>
                        <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                        <p class="timeline-content">
                            <span class="titmeline-span">上门调查</span>
                            <span class="titmeline-span">王小花</span>
                            <span class="titmeline-span">362424199606100102</span>
                        </p>
                        <p class="timeline-time">2018-10-25 12:03:45</p>
                    </TimelineItem>
                </Timeline>
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
      search: {
        date: ''
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  },
  components: {
    Timeline,
    TimelineItem
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
    drawLineChart (ref, option) {
      var myChart = echarts.init(this.$refs[ref])
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
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
</style>
