<template>
  <div class="deadline" v-if="deadline">
    <i class="icon_clock"></i>
    <span>{{isOverDeadline ? '已结束' : '距结束：'}}</span>
    <div v-if="!isOverDeadline" class="time_wrapper">
      <span class="time">{{remainingTime.leftDays}}</span>天<span class="time">{{remainingTime.leftHours}}</span>时<span class="time">{{remainingTime.leftMinutes}}</span>分
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      endTime: {
        type: Number,
      }
    },
    data() {
      return {
        deadline: this.endTime,
        remainingTime: {},
      }
    },
    computed: {
      isOverDeadline() {
        if(!this.deadline) return
        return this.deadline < new Date()
      }
    },
    methods: {
      getRemainingTime() {
        //2018-01-15 18:26:36
        const leftTime = this.deadline - new Date()
        let leftDays = parseInt(leftTime/1000/60/60/24, 10)
        let leftHours = parseInt(leftTime/1000/60/60%24, 10)
        let leftMinutes = parseInt(leftTime/1000/60%60, 10)
        leftDays = this.addZero(leftDays)
        leftHours = this.addZero(leftHours)
        leftMinutes = this.addZero(leftMinutes)
        this.remainingTime = Object.assign({},{leftDays, leftHours, leftMinutes})
        setTimeout(this.getRemainingTime, 60000)
      },
      addZero(time) {
        return time < 10 ? '0' + time : time
      },
    },
    created() {
      if(this.deadline){
        this.getRemainingTime()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../style/mixin.styl'
  .deadline
    float right
    .icon_clock
      display inline-block
      position: relative
      top 4px
      wh(28px,28px)
      background url(../images/apply_state.png)  no-repeat
      background-position 0 -28px
    .time_wrapper
      display inline
      .time
        color: #ff6666
</style>