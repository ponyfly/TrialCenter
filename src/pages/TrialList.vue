<template>
  <div class="trial_list">
    <div class="header">
      <i class="back el-icon-arrow-left" @click=backToApp></i>
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
    props: {
      userId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        firstEnter: true,
        curPage:1,
        totalPage: 0,
        actType: 1,
        productLists: [],
        isPullUp: false,
        isPullDown: false,
        isPulling: true,
        scrollPositionY: 0,
      }
    },
    computed: {},
    methods: {
      _initScroll() {
        if(!this.scroll) {
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
            this.curPage = 1
            this.totalPage = 0
            this.actType = 1
            this.isPulling = true
            this.isPullDown = true
            this.loadData()
          })
          this.scroll.on('pullingUp', () => {
            if(this.curPage !== this.totalPage){
              this.isPulling = true
              this.isPullUp = true
              this.curPage++
              this.loadData()
            } else {
              if (this.actType === 1) {
                this.actType = -1
                this.curPage = 1
                this.totalPage = 0
                this.isPulling = true
                this.isPullUp = true
                this.loadData()
              } else {
                console.log('我们是有底线的');
                this.scroll.finishPullUp()
              }
            }
          })
          this.scroll.on('scrollEnd', (pos) => {
            this.scrollPositionY = pos.y
          })
        } else {
          this.scroll.refresh()
        }
        if (this.productLists.length < 3) {
          this.totalPage = 0
          this.actType = -1
          this.curPage = 1
          this.totalPage = 0
          this.isPulling = true
          this.isPullUp = true
          this.loadData()
        }
      },
      loadData() {
        getProducts(this.curPage, this.actType)
          .then(res => {
            this.totalPage = parseInt(res.data.totalPage, 10)
            if(this.firstEnter) {
              this.productLists = res.data.items
              this.firstEnter = false
            }
            if(this.isPulling) {
              if(this.isPullDown) {
                this.scroll.finishPullDown()
                this.productLists.splice(0)
                this.productLists = res.data.items
                this.isPullDown = false
              }
              if(this.isPullUp) {
                this.scroll.finishPullUp()
                this.productLists = [...this.productLists, ...res.data.items]
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
        if (this.userId) {
          this.$router.push({
            name: 'MyTrial'
          })
        } else {
          if(window.app_interface) {
            window.app_interface.appLogin(0)
          }
        }
      },
      goToProduct(productId) {
        this.$router.push({
          name: 'Product',
          params: {productId}
        })
      },
      backToApp() {
        if (window.app_interface) {
          window.app_interface.backToApp()
        } else {
          console.log('goToBack')
        }
      }
    },
    components: {
      'el-button': Button,
      'self-item': Item
    },
    created() {
      this.loadData()
    },
    mounted() {
      this.Tool._send1_1('try','try-list')
    },
    watch: {},
    activated() {
      if (this.scroll) {
        this.scroll.scrollTo(0, this.scrollPositionY)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../style/mixin.styl"
  .trial_list
    font-size 34px
    wh(100%, 100%)
    box-sizing border-box
    padding-top 90px
    .header
      width 750px
      position fixed
      top 0
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
      overflow hidden
      background-color #fff
      wh(100%, 100%)
      .content
        font-size 36px
</style>