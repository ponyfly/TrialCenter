<template>
  <div class="product_info">
    <self-header headerTitle="详情"></self-header>
    <div class="product_info_wrapper" ref="productInfoWrapper">
      <div class="productScrollContent">
        <div class="overview" v-if="errorcode !== -1">
          <self-slide ref="slide" :autoPlay="isAutoPlay" :length="bannerCarousel.length" :loop="isLoop" :showDot="isShowDot" :interval="interval" :threshold="threshold" :speed="speed">
            <div v-for="item in bannerCarousel" class="slide-item">
              <img :src="item">
            </div>
          </self-slide>
          <h3 class="product_title">{{item.itemTitle}}</h3>
          <div class="product_body">
            <div class="info_1">
              <span class="limit_num">限量：{{item.stockNum}}份</span>
              <span>申请人数：{{item.applyNum * 1 + item.eatMelonNum * 1}}人</span>
            </div>
            <div class="info_2 clearfix">
              <self-backtime
                  :endTime="item.endTime"
                  class="endtime"
                  v-if="item.endTime">
              </self-backtime>
              <router-link :to="{name:'TrialRule'}" class="trail_rule_btn">试用规则</router-link>
            </div>
          </div>
          <div class="apply_info">
            <div class="apply_state" :class="{apply_success: applySuccess}">
              <i class="icon_state"></i>
              <span>申请状态：</span>{{userApplyInfo.applyInfo}}
              <span v-if="applySuccess" class="express_info">快递信息：{{expressContent}}</span>
            </div>
            <div class="write_post">
              <span  v-if="userApplyInfo.applyStatus < 0"><span class="deductCoin">{{item.deductCoin}}</span> 金币</span>
              <el-button
                  type="danger"
                  round
                  class="write_post_btn"
                  v-if="showAddressOrPostBtn.isShow"
                  @click="goToAdressOrPost">
                {{showAddressOrPostBtn.btnText}}</el-button>
            </div>
          </div>
        </div>
        <div class="info_post" ref="infoPost" v-if="errorcode !== -1">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="商品详情" name="first">
              <div class="product_detail" v-html="productDesc"></div>
            </el-tab-pane>
            <el-tab-pane label="试用报告" name="second">
              <ul class="post_list" v-if="reports.length">
                <li v-for="report in reports" @click="goToReport(report.postId)" :key="report.postId">
                  <p>{{report.content}}</p>
                  <div v-if="report.picUrls.length" class="img_wrapper clearfix">
                    <div v-for="picUrl in report.picUrls" class="img_item">
                      <img :src="picUrl" alt="">
                    </div>
                  </div>
                </li>
              </ul>
              <div class="no_post" v-else>暂时没有报告，小主等等再来看吧~</div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="no_product" v-if="errorcode === -1">
          找不到商品
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Button,
    Tabs,
    TabPane,
  } from 'element-ui'
  import BScroll from 'better-scroll'
  import Header from '../components/header.vue'
  import BackTime from '../components/backtime.vue'
  import Slide from '../components/slide.vue'
  import {getDetail, getProductDesc, getProductReports } from  '../api/index.js'
  import Tool from '../plugins/tools.js'
  export default {
    props: {
      userId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        activeName: 'first',
        reports: [],
        item: {},
        userApplyInfo: {},
        errorcode:'',
        productDesc: '',
        reportCurPage: 1,
        reportTotalPage: 0,
        lastPostY: 0,

        autoPlay:true,
        index: 0,
        turnToPrev: false,
        turnToNext: false,
        isAutoPlay: true,
        isLoop: true,
        isShowDot: true,
        speed: 400,
        threshold: 0.3,
        interval: 2000,
        bannerCarousel: [],
      }
    },
    computed: {
      applySuccess() {
        return parseInt(this.userApplyInfo.applyStatus, 10) === 1
      },
      //申请期已结束
      isOverDeadLine() {
        return this.item.endTime < new Date()
      },
      //是否显示右侧按钮
      showAddressOrPostBtn() {
        const applyStatus = parseInt(this.userApplyInfo.applyStatus, 10)
        if (this.isOverDeadLine) {
          if (applyStatus === 1) {
            return {
              isShow: true,
              btnText: '填写报告'
            }
          } else if (applyStatus >= 2) {
            return {
              isShow: false,
              btnText: '已填报告'
            }
          } else {
            return {
              isShow: false,
              btnText: ''
            }
          }
        } else {
          if (applyStatus === -999) {
            return {
              isShow: true,
              btnText: '马上申请'
            }
          } else if (applyStatus === 1 ) {
            return {
              isShow: true,
              btnText: '填写报告'
            }
          } else {
            return {
              isShow: false,
              btnText: ''
            }
          }
        }
      },
      //快递信息
      expressContent() {
        const {expressStatus, expressInfo, expressName, expressNo} = this.userApplyInfo
        let tmpText = ''
        if (parseInt(expressStatus, 10)) {
          if(expressName && expressNo) {
            tmpText = ` ${expressName} ${expressNo}`
          } else {
            tmpText = expressInfo
          }
        } else {
          tmpText = expressInfo
        }
        return tmpText
      },
    },
    components: {
      'self-header': Header,
      'self-backtime': BackTime,
      'el-button': Button,
      'el-tabs': Tabs,
      'el-tab-pane': TabPane,
      'self-slide': Slide
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.productInfoWrapper, {
            click: true,
            probeType: 3,
          })
          this.scroll.on('touchEnd', (pos) => {
            if (this.activeName === 'second') {
              if(this.reportCurPage !== this.reportTotalPage) {
                if(Math.abs(pos.y) - this.lastPostY > 300) {
                  this.lastPostY = Math.abs(pos.y)
                  this.getReports()
                }
              } else {
                console.log('没有报告了')
              }
            }
          })
        } else {
          this.scroll.refresh()
        }
      },
      _initData() {
        getDetail(this.itemId, this.userId)
          .then(res => {
            this.errorcode = parseInt(res.data.errorcode, 10)
            if(this.errorcode === -1) {
              return new Error('没有商品')
            }
            this.item = res.data.item
            this.bannerCarousel = this.item.itemDetailUrl.split(';')
            this.userApplyInfo = this.userId ? res.data.userApplyInfo : {
              applyStatus: '-999', //申请状态 状态:status=-999未申请，status=0->申请中;status=-1->申请失败;status=1->申请成功;
              applyInfo: '未申请', //applyStatus状态的对应信息
              expressStatus:'0',//0未发货，1已发货
              expressInfo:'',//expressStatus 状态对应信息
              expressName:'',//快递名称
              expressNo:'',//快递单号
              totalCoin: 0,
              addressList: [
                {
                  id: '',
                  userName: '',
                  address: '',
                  telephone: ''
                }
              ]
            }
            return this.item.detailPostId
          })
          .then(detailPostId => {
            return getProductDesc(detailPostId, 1)
          })
          .then(res => {
            if(!res.data.content) {
              return new Error('没有详情')
            }
            if (res.data.content.indexOf('[img]') !== -1) {
              let desc = res.data.content.replace(/(jpeg|png|jpg|gif).*?(\[\/img\])/ig,'$1$2')
              desc = desc.replace(/\[img\]([^\[]*)\[\/img\]/ig,'<img src="$1" border="0" width="100%"/>')
              desc = desc.replace(/\n/ig, '<br>')
              this.productDesc = desc
            } else {
              this.productDesc = res.data.content
            }
          })
          .catch(console.log)
      },
      goToAdressOrPost(event) {
        if(!event._constructed) {
          return
        }
        if(!this.userId) {
          if(window.app_interface) {
            window.app_interface.appLogin(0)
          }
        }else {
          if(parseInt(this.userApplyInfo.applyStatus, 10) === -999) {
            this.$router.push({
              name: 'Address',
              params: {
                itemId: this.itemId,
                addressList: this.userApplyInfo.addressList
              },
            })
          } else if (parseInt(this.userApplyInfo.applyStatus, 10) === 1) {
            window.location.href = `jcnhers://list_post/groupId=${this.item.detailGroupId}`
          }
        }
      },
      handleClick(tab, event) {
        if (tab.name === 'second') {
          this.getReports()
        }
      },
      getReports() {
        getProductReports(this.item.detailTagId, this.reportCurPage)
          .then(res => {
            this.reportCurPage ++
            this.reportTotalPage = parseInt(res.data.totalPage, 10)
            this.reports = [...this.reports, ...res.data.postList]
          })
          .catch(console.log)
      },
      goToReport(reportId) {
        console.log(reportId)
        window.location.href = `jcnhers://detail_post/postId=${reportId}`
      }
    },
    watch: {
      userId() {
        this._initData()
      }
    },
    created() {
      this.itemId = this.$route.params.productId
      if(!this.itemId) return
      this._initData()
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    activated() {},
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../style/mixin.styl"
  .product_info
    padding-top 90px
    height 100%
    box-sizing border-box
    background-color #fff
    .product_info_wrapper
      height 100%
    .overview
      background-color #f3f3f3
      padding-bottom 10px
      font-size 28px
      .banner_carousel
        img
          wh(100%, 100%)
      .banner
        height 750px
        img
          wh(750px,750px)
      .product_title
        height 100px
        line-height 100px
        padding-left 45px
        text-align left
        box-sizing border-box
        font-size 40px
        color #333
        background-color #fff
      .product_body
        padding 0 45px
        box-sizing border-box
        color #707070
        text-align left
        line-height 48px
        border-bottom 1px solid #e5e5e5
        background-color #fff
        .info_1
          .limit_num
            padding-right 28px
        .info_2
          margin 10px 0
          .endtime
            float left
          .trail_rule_btn
            float right
            color #f66
            text-decoration underline
      .apply_info
        box-sizing border-box
        height 120px
        border-top 1px solid #e5e5e5
        border-bottom 1px solid #e5e5e5
        margin-top 10px
        padding 33px 45px
        background-color #fff
        .apply_state
          float left
          font-size 32px
          height 54px
          line-height 54px
          position relative
          .icon_state
            display inline-block
            position: relative
            top 4px
            wh(30px,30px)
            background url(../images/apply_state.png)  no-repeat
            background-position 0 -112px
          span:nth-of-type(1)
            font-weight bold
          span:nth-of-type(2)
            font-size 22px
            color #969696
          .express_info
            position absolute
            left 0
            top 40px
            white-space nowrap
        .apply_success
          top -12px
          line-height 43px
        .write_post
          float right
          line-height 60px
          span.deductCoin
            color #f66
          .write_post_btn
            font-size 28px
            border-radius 27px
            color #fefefe
    .info_post
      min-height 1244px
      .post_list
        padding 0 42px
        font-size 30px
        line-height 48px
        li
          padding 30px 0
          border-bottom  1px solid #ccc
        p
          text-align left
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 3
          overflow hidden
        .img_wrapper
          margin-top 20px
          .img_item
            float left
            wh(212px, 148px)
            &+.img_item
              margin-left 15px
            img
              wh(100%, 100%)
    .no_post
      font-size 30px
      padding 10px 0
    .product_detail
      font-size 32px
      line-height 50px
      margin 0 20px
      text-align left
      img
        margin 10px 0
    .el-tabs__nav
      width 100%
      .el-tabs__item
        width 50%
        font-size 30px
        height 90px
        line-height 90px
        &.is-active
          color #f66
    .el-tabs__active-bar
      background-color #f66
    .no_product
      font-size 32px
</style>