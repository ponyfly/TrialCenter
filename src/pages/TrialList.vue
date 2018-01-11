<template>
  <div class="trial_list">
    <div class="header">
      <i class="back el-icon-arrow-left"></i>
      <h3>试用中心</h3>
      <el-button class="my_trial">我的试用
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li is="self-item" v-for="(product, index) in productLists" :product="product" :key="index"></li>
    </ul>
  </div>
  </div>
</template>

<script>
  import {Button} from 'element-ui'
  import BScroll from 'better-scroll'
  import {getProducts} from '../api/index'

  import Item from '../components/item.vue'

  export default {
    data() {
      return {
        productLists: []
      }
    },
    computed: {
    },
    methods: {
      loadData() {
        getProducts().then(res => {
          this.productLists = res.data.data
//          this.productLists = [...res.data.data, ...this.productLists]
          this.$nextTick(() => {
            if(!this.scroll) {
              this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                probeType: 3,
                pullDownRefresh: true,
                pullUpLoad: true,
              })
              this.scroll.on('pullingDown', () => {
                console.log('down')
                this.scroll.finishPullDown()
              })
              this.scroll.on('pullingUp', () => {
                console.log('up');
//                this.loadData()
                this.scroll.finishPullUp()
              })
            } else {
              this.scroll.refresh()
            }
          })
        })
      }
    },
    components: {
      'el-button': Button,
      'self-item': Item
    },
    created() {
      this.loadData()
    },
    mounted() {},
    watch: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../style/mixin.styl"
  .trial_list
    font-size 34px
    wh(100%, 100%)
    .header
      width 750px
      position fixed
      height 90px
      background-color #fff
      line-height 90px
      z-index 999
      .back
        position: absolute;
        top: 0;
        left: 0;
        font-size: 44px;
        padding: 23px;
      .my_trial
        position: absolute;
        top: 20px;
        right: 20px;
        width: 180px;
        font-size: 30px;
        border: none;
        color: #ff6666
        i
          color #ff1653
    .wrapper
      background-color #fff
      wh(100%, 100%)
      padding-top 90px
      overflow-y scroll
      .content
        font-size 36px
        padding-bottom 180px
</style>