<template>
  <div class="item">
    <div class="item_banner">
      <img class="item_banner_img" src="../images/banner@2x.png" alt="">
    </div>
    <div class="item_info">
      <h3 class="item_title">【免费试用】网易严选，每日坚果</h3>
      <div class="item_detail clearfix">
        <span class="limit_num">限20份</span>
        <div class="deadline">
          <i class="icon"></i>
          <span>距结束：</span>
          <span class="time">01</span>天<span class="time">20</span>时<span class="time">25</span>分
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {},
    methods: {}
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