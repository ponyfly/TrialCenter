<template>
  <div class="trial_list">
    <div class="header" v-if="!clicked">
      <i class="back el-icon-arrow-left" @click=backToApp></i>
      <h2>试用中心</h2>
    </div>
    <div class="wrapper" ref="wrapper" :class="clicked">
      <div class="slide-content">
        <self-slide class="self-slide"
                    :data="slideBanners"
                    :ableClick="ableClick"
                    @click.native="linkToOuter($event)"/>
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
        <div class="no-more" v-if="productLists.length">我们是有底线的</div>
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
        clicked: '',
        productLists: [],
        slideBanners : [],
        ableClick: false,
      }
    },
    computed: {},
    methods: {
      _initUnInteract() {
        this.curPage = 1
        this.totalPage = 0
        this.actType = 1
        this.isPullUp = false
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
                  this.$nextTick(() => {
                    this._initScroll()
                  })
                })
            } else {
              this.$nextTick(() => {
                this._initScroll()
              })
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
            this.$nextTick(() => {
              this.trialScroll.refresh()
            })
          })
      },
      _initScroll() {
        this.trialScroll = new BScroll(this.$refs.wrapper, {
          click: true,
          bounce: false,
          probeType: 3,
          swipeTime: 1000,
          deceleration: 0.002,
          momentumLimitTime: 200,
          pullUpLoad: {
            threshold: 300,
          },
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
              this.slideBanners = res.data.map(t => {
                return {
                  url: t.url,
                  image: `${t.banner_pic}?imageView2/0/w/750/q/60`,
                  id: t.id
                }
              })
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
        window.app_interface && window.app_interface.backToApp()
      },
      linkToOuter(e) {
        this.Tool._send1_1('ontrial', `ontrial-carousel-${e.target.getAttribute('data-id')}`)
        const targetHref = e.target.parentNode.getAttribute('href')
        if (!(/trialcenter/.test(targetHref))) {
          if(navigator.userAgent.toLowerCase().indexOf('iphone') > -1 && e.target.nodeName.toLowerCase() === 'img') {
            this.clicked = 'myclass-clicked'
            window.app_interface && window.app_interface.setTitleVisible(1)
          }
        }
      }
    },
    components: {
      'el-button': Button,
      'self-item': Item,
      'self-slide': Slide
    },
    created() {
      this._initUnInteract()
      this._initSlideBanners()
      this._initData()
    },
    mounted() {
      this.Tool._send1_1('ontrial','try-list')
    },
    watch: {},
    activated() {
      if (this.trialScroll) {
        this.trialScroll.scrollTo(0, this.scrollPositionY)
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
      wh(750px, 104px)
      position fixed
      top 0
      z-index 999
      background-color #fff
      line-height 104px
      .back
        tl(0, 0)
        padding 30px
        font-size 44px
    .wrapper
      margin-top 104px
      height calc(100% - 104px)
      box-sizing border-box
      background-color #efefef
      &.myclass-clicked
        margin-top 0
      .slide-content
        min-height calc(100% + 1px)
        .self-slide
          height 550px
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
        .no-more
          height 60px
          line-height 60px
          border-top 1px solid #8c8c8c
          font-size 24px
</style>