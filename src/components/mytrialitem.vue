<template>
  <div class="my_trial_item" v-if="Object.keys(product).length">
    <div class="item_banner">
      <img class="item_banner_img" src="" v-lazy="product.src" alt="">
    </div>
    <div class="item_info">
      <h3 class="item_title">{{product.name}}</h3>
      <div class="item_apply_info">
        <div class="apply_time">
          <i class="icon_clock"></i>
          申请时间：{{product.applyTime}}
        </div>
        <div class="apply_state">
          <i class="icon_state"></i>
          {{applyText}}
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
      }
    },
    computed: {
      //申请时间：2018年01月10日15时 快递信息：顺丰 20180192873
      applyText() {
        let {applyState} = this.product
        applyState = parseInt(applyState)
        if(applyState === 0) {
          return '申请状态：申请失败'
        } else if(applyState === 1) {
          return '快递信息：顺丰 20180192873'
        } else if(applyState === 2) {
          return '申请状态：申请中'
        }
      }
    },
    methods: {
    },
    created() {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../style/mixin.styl"
  .my_trial_item
    margin-bottom 60px
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
        height 100px
        line-height 100px
        padding-left 30px
        text-align left
        box-sizing border-box
        color #333
        font-size 38px
      .item_apply_info
        padding 0 45px
        box-sizing border-box
        font-size 28px
        color #707070
        text-align left
      .apply_time
        height 46px
        line-height 46px
        .icon_clock
          wh(28px,28px)
          background url(../images/apply_state.png)  no-repeat
          background-position 0 -28px
      .apply_state
        height 46px
        line-height 46px

</style>