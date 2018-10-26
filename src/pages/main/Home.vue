<template>
  <div class="home-container">
      <div class="home-container-item">
          <div class="home-item-left royal-paper royal-paper-1 ">

          </div>
          <div class="home-item-right royal-paper royal-paper-1">
               <Timeline>
                    <TimelineItem>
                        <p class="timeline-time">上门调查 王小花 362424199606100102</p>
                        <p class="timeline-content">2018-10-25 12:03:45</p>
                    </TimelineItem>
                    <TimelineItem>
                        <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                        <p class="timeline-time">上门调查 王小花 362424199606100102</p>
                        <p class="timeline-content">2018-10-25 12:03:45</p>
                    </TimelineItem>
                    <TimelineItem>
                        <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                        <p class="timeline-time">上门调查 王小花 362424199606100102</p>
                        <p class="timeline-content">2018-10-25 12:03:45</p>
                    </TimelineItem>
                    <TimelineItem>
                        <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                        <p class="timeline-time">上门调查 王小花 362424199606100102</p>
                        <p class="timeline-content">2018-10-25 12:03:45</p>
                    </TimelineItem>
                    <TimelineItem>
                        <i class="material-icons timeline-icon" slot="dot">fiber_manual_record</i>
                        <p class="timeline-time">上门调查 王小花 362424199606100102</p>
                        <p class="timeline-content">2018-10-25 12:03:45</p>
                    </TimelineItem>
                </Timeline>
          </div>
      </div>
      <div class="home-container-item">
          <div class="home-item-left"></div>
          <div class="home-item-right"></div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Timeline, TimelineItem } from 'iview'
import '@/styles/timeline.css'
export default {
  name: 'home',
  components: {
    Timeline,
    TimelineItem
  }
}
</script>
<style scoped lang="stylus">
.home-container-item
    display flex
    max-width 1600px;
    margin 0 auto;
.home-item-left
    flex 1
    margin-right 15px;
    padding 15px;
.home-item-right
    padding 15px
.timeline-icon
   color #666666;
   font-size 10px;
.timeline-time
    margin 0
    padding 0;
    color #333;
    font-size 16px;
    font-weight 400;
.timeline-content
    padding 0;
    margin 0
    color #333;
    font-size 14px;
    font-weight 400;
</style>
