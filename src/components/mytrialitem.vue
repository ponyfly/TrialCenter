<template>
  <div class="my_trial_item" v-if="Object.keys(product).length" @click="goToProduct(product.id)">
    <div class="item_banner">
      <img class="item_banner_img" src="" v-lazy="product.itemCoverUrl" alt="">
    </div>
    <div class="item_info">
      <h3 class="item_title">{{product.itemTitle}}</h3>
      <div class="item_apply_info">
        <div class="apply_time">
          <i class="icon_clock"></i>
          申请时间：{{product.applyTime | formatDate}}
        </div>
        <div class="apply_state">
          <i class="icon_state" :class="applyInfos.stateClass"></i>
          {{applyInfos.text}}
          <el-button
              type="danger"
              round
              class="write_post_btn"
              v-if="showGoToPost"
              @click="goToGroup"
          >填写报告</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Button } from 'element-ui'
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
      applyInfos() {
        let {userApplyInfo} = this.product
        let applyStatus = parseInt(userApplyInfo.applyStatus, 10)
        if(applyStatus === -1) {
          return {
            text: userApplyInfo.applyInfo,
            stateClass: 'icon_fail'
          }
        } else if (applyStatus === 1 || applyStatus >= 2) {
          let tmpText = ''
          if (userApplyInfo.expressStatus) {
            tmpText = parseInt(userApplyInfo.expressStatus, 10) ? userApplyInfo.expressName + ' ' + userApplyInfo.expressNo : userApplyInfo.expressInfo
          } else {
            tmpText = userApplyInfo.applyInfo
          }
          return {
            text: tmpText,
            stateClass: 'icon_success'
          }
        } else if (applyStatus === 0) {
          return {
            text: userApplyInfo.applyInfo,
            stateClass: 'icon_applying'
          }
        }
      },
      showGoToPost() {
        let {userApplyInfo} = this.product
        return parseInt(userApplyInfo.applyStatus, 10) === 1
      }
    },
    components: {
      'el-button': Button,
    },
    methods: {
      goToProduct(productId) {
        console.log(productId)
        this.$router.push({
          name: 'Product',
          params: {productId}
        })
      },
      goToGroup() {
        window.location.href = `jcnhers://list_post/groupId=${this.product.detailGroupId}`
      }
    },
    created() {
    },
    filters: {
      formatDate(timestamp) {
        if(!timestamp) return
        timestamp = parseInt(timestamp);
        let newDate = new Date(timestamp);
        Date.prototype.format = function (format) {
          let date = {
            'M+': this.getMonth() + 1,
            'd+': this.getDate(),
            'h+': this.getHours(),
            'm+': this.getMinutes(),
            's+': this.getSeconds(),
            'q+': Math.floor((this.getMonth() + 3) / 3),
            'S+': this.getMilliseconds()
          };
          if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          for (let k in date) {
            if (new RegExp('(' + k + ')').test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
            }
          }
          return format;
        }
        let curTime =  newDate.format('yyyy年MM月dd日hh时');
        return curTime
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../style/mixin.styl"
  .my_trial_item
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
          display inline-block
          position: relative
          top 4px
          wh(28px,28px)
          background url(../images/apply_state.png)  no-repeat
          background-position 0 -28px
      .apply_state
        position relative
        height 54px
        line-height 54px
        .icon_state
          display inline-block
          position: relative
          top 4px
          wh(28px,28px)
          background url(../images/apply_state.png)  no-repeat
        .icon_success
          background-position 0 0
        .icon_fail
          background-position 0 -84px
        .icon_applying
          background-position 0 -56px
        .write_post_btn
          position absolute
          right 0
          font-size 28px
          border-radius 27px
          color #fefefe


</style>