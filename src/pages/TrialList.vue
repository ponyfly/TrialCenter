<template>
  <div class="trial_list">
    <div class="header">
      <i class="back el-icon-arrow-left"></i>
      <h2>试用中心</h2>
      <el-button class="my_trial_btn" @click="goToMyTrial">我的试用
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li is="self-item"
          v-for="(product, index) in productLists"
          :product="product"
          :key="product.id"
          @click.native="goToProduct(product.id)">
      </li>
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
        firstEnter: true,
        curPage:1,
        totalPage: 0,
        productLists: [],
        isPullUp: false,
        isPullDown: false,
        isPulling: true,

      }
    },
    computed: {
    },
    methods: {
      _initScroll() {
        if(!this.scroll) {
          console.log('initscroll');
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            probeType: 3,
            pullDownRefresh: {
              threshold:80,
              stop:60,
            },
            pullUpLoad: {
              threshold: -60,
              stop: 60
            },
          })
          this.scroll.on('pullingDown', () => {
            console.log('pullingDown');
            this.curPage = 1
            this.totalPage = 0
            this.isPulling = true
            this.isPullDown = true
            this.loadData()
            console.log(this.scroll);
          })
          this.scroll.on('pullingUp', () => {
            console.log('pullingUp');
            if(this.curPage !== this.totalPage){
              this.isPulling = true
              this.isPullUp = true
              this.curPage++
              this.loadData()
            }else {
              console.log('我们是有底线的');
            }
          })
        } else {
          console.log('refresh');
          this.scroll.refresh()
        }

      },
      onGetDeadline() {

      },
      loadData() {
        getProducts(this.curPage)
          .then(res => {
            this.totalPage = parseInt(res.data.data.totalPage, 10)
            if(this.firstEnter) {
              this.productLists = res.data.data.items
              this.firstEnter = false
            }
            if(this.isPulling) {
              if(this.isPullDown) {
                this.scroll.finishPullDown()
                this.productLists.splice(0)
                this.productLists = res.data.data.items
                this.isPullDown = false
              }
              if(this.isPullUp) {
                this.scroll.finishPullUp()
                this.productLists = [...this.productLists, ...res.data.data.items]
                this.isPullUp = false
              }
              this.isPulling = false
            }
            this.$nextTick(() => {
              this._initScroll()
            })
          })
          .catch(console.log)
      },
      goToMyTrial() {
        this.$router.push({
          name: 'MyTrial'
        })
      },
      goToProduct(productId) {
        console.log(this);
        this.$router.push({
          name: 'Product',
          params: {productId}
        })
      },
    },
    components: {
      'el-button': Button,
      'self-item': Item
    },
    created() {
      this.loadData()
    },
    mounted() {},
    watch: {

    }
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
      .my_trial_btn
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