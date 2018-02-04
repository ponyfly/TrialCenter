<template>
  <div class="item" v-if="Object.keys(product).length">
    <div class="item_banner">
      <img class="item_banner_img" src="" v-lazy="product.itemCoverUrl + '?imageView2/0/w/750/format/jpg/q/60'" alt="">
    </div>
    <div class="item_info">
      <h3 class="item_title">{{product.itemTitle}}</h3>
      <div class="item_detail clearfix">
        <span class="limit_num" :style="isOverDeadline ? '' : {color: '#ff6666'}">限{{product.stockNum}}份</span>
        <div class="deadline">
          <i class="icon_clock"></i>
          <span>{{isOverDeadline ? '已结束' : '距结束：'}}</span>
          <div v-if="!isOverDeadline" class="time_wrapper">
            <span class="time">{{remainingTime.leftDays}}</span>天<span class="time">{{remainingTime.leftHours}}</span>时<span class="time">{{remainingTime.leftMinutes}}</span>分
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      product: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        deadline: this.product.endTime,
        remainingTime: {},
      }
    },
    computed: {
      isOverDeadline() {
        if(!Object.keys(this.product).length) return
        return this.deadline < new Date()
      }
    },
    methods: {
      getRemainingTime() {
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
      if(Object.keys(this.product).length){
        this.getRemainingTime()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../style/mixin.styl"
  .item
    padding-bottom 60px
    .item_banner
      position relative
      .item_banner_img
        display block
        wh(100%, 350px)
        margin 0 auto
      .item_banner_img[lazy=loading]
        border none
      .item_banner_img[lazy=loaded]
        border none
      &:after
        content ''
        bl(0, 30px)
        border 20px solid transparent
        border-bottom-color #fff
    .item_info
      .item_title
        line-height 56px
        padding 20px 45px
        text-align left
        box-sizing border-box
        color #333
      .item_detail
        padding 0 45px
        box-sizing border-box
        font-size 28px
        color #707070
        .limit_num
          float left
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