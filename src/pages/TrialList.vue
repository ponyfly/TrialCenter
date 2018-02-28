<template>
  <div class="trial_list">
    <div class="header">
      <i class="back el-icon-arrow-left" @click=backToApp></i>
      <h2>试用中心</h2>
    </div>
    <div class="wrapper" ref="wrapper">
      <div class="slide-content">
        <self-slide :length="slideBanners.length">
          <div v-for="slideBanner in slideBanners" class="slide-item" :key="slideBanner.id">
            <router-link :to="{name: 'Product',params: {productId: slideBanner.id}}">
              <img :src="`${slideBanner.banner_pic}?imageView2/0/w/750/format/jpg/q/60`" alt="">
            </router-link>
          </div>
        </self-slide>
        <div class="wrapper-title">
          <div class="hot-try">热门试用</div>
          <el-button class="my_trial_btn" @click="goToMyTrial">我的试用
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </div>
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
  </div>
</template>

<script>
  import {Button} from 'element-ui'
  import BScroll from 'better-scroll'
  import {getProducts, getPics} from '../api/index'
  import Item from '../components/item.vue'
  import Slide from '../components/slide.vue'

  export default {
    props: {
      userId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        productLists: [],
        slideBanners :[]
      }
    },
    computed: {},
    methods: {
      /*_initScroll() {
        if(!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            probeType: 3,
            swipeTime: 1000,
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
      },*/
      _initUnInteract() {
        this.firstEnter = true
        this.curPage = 1
        this.totalPage = 0
        this.actType = 1
        this.isPullUp = false
        this.isPullDown = false
        this.isPulling = true
        this.scrollPositionY = 0
      },
      _initData() {
        getProducts(this.curPage,this.actType)
          .then(res => {
            this.totalPage = parseInt(res.data.totalPage, 10)
            this.productLists = res.data.items
            if (this.productLists.length < 2) {
              this.actType = -1
              getProducts(this.curPage,this.actType)
                .then(res => {
                  this.totalPage = parseInt(res.data.totalPage, 10)
                  this.productLists = [...this.productLists, ...res.data.items]
                  if(!this.trialScroll) {
                    this.$nextTick(() => {
                      this._initScroll()
                    })
                  } else {
                    this.trialScroll.refresh()
                  }
                })
            } else {
              if(!this.trialScroll) {
                this.$nextTick(() => {
                  this._initScroll()
                })
              } else {
                this.trialScroll.refresh()
              }
            }
          })
      },
      _loadMoreData() {
        getProducts(this.curPage, this.actType)
          .then(res => {
            this.totalPage = parseInt(res.data.totalPage, 10)
            if (this.isPullUp) {
              this.productLists = [...this.productLists, ...res.data.items]
              this.isPullUp = false
              this.trialScroll.finishPullUp()
            }
            if (this.isPullDown) {
              this.isPullDown = false
              this.trialScroll.finishPullDown()
            }
            this.$nextTick(() => {
              this.trialScroll.refresh()
            })
          })
      },
      _initScroll() {
        this.trialScroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: 3,
          swipeTime: 1000,
          pullDownRefresh: {
            threshold:80,
            stop:60,
          },
          pullUpLoad: {
            threshold: -60,
            stop: 60
          },
        })
        this.trialScroll.on('pullingDown', () => {
          this.curPage = 1
          this.totalPage = 0
          this.actType = 1
          this.isPulling = true
          this.isPullDown = true
          this.loadData()
        })
        this.trialScroll.on('pullingUp', () => {
          if(this.curPage !== this.totalPage){
            this.isPullUp = true
            this.curPage++
            this._loadMoreData()
          } else {
            if(this.actType === 1) {
              this.actType = -1
              this.curPage = 1
              this.totalPage = 0
              this.isPullUp = true
              this._loadMoreData()
            } else {
              console.log('我们是有底线的');
              this.trialScroll.finishPullUp()
            }
          }
        })
        this.trialScroll.on('scrollEnd', (pos) => {
          this.scrollPositionY = pos.y
        })
      },
      _initSlideBanners() {
        getPics()
          .then(res => {
            if (res.data.length) {
              this.slideBanners = res.data
            }
          })
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
      },
    },
    components: {
      'el-button': Button,
      'self-item': Item,
      'self-slide': Slide
    },
    created() {
      this._initUnInteract()
      this._initSlideBanners()
//      this.loadData()
      this._initData()
    },
    mounted() {
      this.Tool._send1_1('ontrial','try-list')
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
    .header
      wh(750px, 90px)
      position fixed
      top 0
      z-index 999
      background-color #fff
      line-height 90px
      .back
        tl(0, 0)
        padding 23px
        font-size 44px
    .wrapper
      margin-top 90px
      height calc(100% - 90px)
      box-sizing border-box
      background-color #efefef
      .slide-content
        min-height calc(100% + 1px)
        .wrapper-title
          height 80px
          line-height 80px
          display flex
          padding 0 30px
          justify-content space-between
          .hot-try
            color #f66
            font-size 32px
          .my_trial_btn
            width 180px
            font-size 30px
            background-color #efefef
            border none
            color #666
            i
              color #666
        .slide
          height 550px
          background-color #fff
          overflow hidden
        .content
          font-size 36px
</style>