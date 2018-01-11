<template>
  <div class="item">
    <div class="item_banner">
      <img class="item_banner_img" src="" v-lazy="product.src" alt="">
    </div>
    <div class="item_info">
      <h3 class="item_title">{{product.title}}</h3>
      <div class="item_detail clearfix">
        <span class="limit_num">限{{product.limitNum}}份</span>
        <div class="deadline">
          <i class="icon"></i>
          <span>距结束：</span>
          <span class="time">{{remainingTime.leftDays}}</span>天<span class="time">{{remainingTime.leftHours}}</span>时<span class="time">{{remainingTime.leftMinytes}}</span>分
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['product'],
    data() {
      return {
        deadline: this.product.deadline,
        remainingTime: {},
      }
    },
    computed: {},
    methods: {
      getRemainingTime() {
        //2018-01-15 18:26:36
        let deadlineArr = this.deadline.match(/(\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})/).slice(1)
        deadlineArr.splice(1,1,deadlineArr[1] - 1)
        const leftTime = new Date(...deadlineArr) - new Date()
        let leftDays = parseInt(leftTime/1000/60/60/24, 10)
        let leftHours = parseInt(leftTime/1000/60/60%24, 10)
        let leftMinytes = parseInt(leftTime/1000/60%60, 10)
        leftDays = this.addZero(leftDays)
        leftHours = this.addZero(leftHours)
        leftMinytes = this.addZero(leftMinytes)
        this.remainingTime = Object.assign({},{leftDays, leftHours, leftMinytes})
        setTimeout(this.getRemainingTime, 60000)
      },
      addZero(time) {
        return time < 10 ? '0' + time : time
      }
    },
    created() {
      this.getRemainingTime()
      console.log(this);
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .item
    margin-bottom 60px
    .item_banner
      display block
      .item_banner_img
        margin 0 auto
      .item_banner_img[lazy=loading]
        display block
      .item_banner_img[lazy=loaded]
        display block
    .item_info
      .item_title
        height 100px
        line-height 100px
        padding-left 30px
        text-align left
        box-sizing border-box
        color #333
      .item_detail
        padding 0 45px
        box-sizing border-box
        font-size 28px
        .limit_num
          float left
          color #ff6666
        .deadline
          float right
          .time
            color: #ff6666
</style>