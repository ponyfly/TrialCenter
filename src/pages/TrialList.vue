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
        this.productLists = [{"id":26,"title":null,"itemTitle":"【免费试吃】好丽友薯愿薯片","itemCoverUrl":"http://static4.j.cn/png/arcamera/180313/1543/f2315568ecb74b7b.jpg","startTime":1520956800000,"endTime":1521302400000,"stockNum":10,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":27,"title":null,"itemTitle":"【线下观影】动作冒险巨制《古墓丽影：源起之战》","itemCoverUrl":"http://static3.j.cn/png/arcamera/180314/1547/bebf64164d4c4357.png","startTime":1521013560000,"endTime":1521450000000,"stockNum":8,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":24,"title":null,"itemTitle":"【免费观影】带上爱人去看《恋爱回旋》","itemCoverUrl":"http://static2.j.cn/png/arcamera/180312/1637/0739347825524489.jpg","startTime":1520843760000,"endTime":1521104400000,"stockNum":4,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":22,"title":null,"itemTitle":"【免费试用】OBB臻.抗菌系列日夜套装","itemCoverUrl":"http://static3.j.cn/png/arcamera/180302/1847/b7e08ea8ed804015.png","startTime":1519987560000,"endTime":1521194400000,"stockNum":50,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":19,"title":null,"itemTitle":"北京小主专享-美呗微整项目四选一体验","itemCoverUrl":"http://static2.j.cn/png/arcamera/180227/1843/bebae079b4f545f1.jpg","startTime":1519728180000,"endTime":1520762400000,"stockNum":10,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":21,"title":null,"itemTitle":"邀你陪闺蜜看《闺蜜2》","itemCoverUrl":"http://static3.j.cn/png/arcamera/180301/1733/b4e31822342645a2.png","startTime":1519896780000,"endTime":1520499600000,"stockNum":6,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":20,"title":null,"itemTitle":"【免费观影】印度高分电影《小萝莉的猴神大叔》","itemCoverUrl":"http://static2.j.cn/png/arcamera/180301/1644/d55e1f3871ac4200.png","startTime":1519893600000,"endTime":1520409600000,"stockNum":6,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":18,"title":null,"itemTitle":"【免费试用】日本Piabelpia培娅奴紫根精华油","itemCoverUrl":"http://static2.j.cn/png/arcamera/180224/1003/4817e49e62bf4514.png","startTime":1519437600000,"endTime":1520647200000,"stockNum":15,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":17,"title":null,"itemTitle":"恒兴国泰营养石磨面粉试吃","itemCoverUrl":"http://static4.j.cn/png/arcamera/180214/1144/550207b9234e4ee6.jpg","startTime":1518656400000,"endTime":1519812000000,"stockNum":10,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":15,"title":null,"itemTitle":"维瑞婷推拿大师精油免费试用","itemCoverUrl":"http://static1.j.cn/png/arcamera/180211/1837/a9dd7445073c46d7.png","startTime":1518346800000,"endTime":1519470000000,"stockNum":3,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":9,"title":null,"itemTitle":"【免费试用】amouros摩罗诗山花精焕亮新肌水","itemCoverUrl":"http://static4.j.cn/png/arcamera/180131/1529/93e7fe2f9fef455c.png","startTime":1517381880000,"endTime":1518623700000,"stockNum":15,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":8,"title":null,"itemTitle":"【免费试用】云滋泉玻尿酸护肤原液","itemCoverUrl":"http://static1.j.cn/png/arcamera/180131/1002/9c537cf6ef0a425c.png","startTime":1517364060000,"endTime":1518598800000,"stockNum":3,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":7,"title":null,"itemTitle":"【免费观影】萌宠电影《小狗奶瓶》","itemCoverUrl":"http://static2.j.cn/png/arcamera/180129/1610/7cf37cbb63e640d5.png","startTime":1517213340000,"endTime":1517558400000,"stockNum":3,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":6,"title":null,"itemTitle":"【免费观影】《麦兵兵之夺宝联“萌”》","itemCoverUrl":"http://static1.j.cn/png/arcamera/180129/1409/1997e9dd19f54c23.png","startTime":1517206320000,"endTime":1517457600000,"stockNum":10,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":14,"title":null,"itemTitle":"淘粉吧&她社区联合活动：0元购奶锅再得金币","itemCoverUrl":"http://static2.j.cn/png/arcamera/180208/1628/cc4f583180f34cf3.jpg","startTime":1518078480000,"endTime":1519866000000,"stockNum":100,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":10,"title":null,"itemTitle":"【免费试用】fracora V90美白粉","itemCoverUrl":"http://static4.j.cn/png/arcamera/180131/1851/a7c986b96023494a.png","startTime":1517450400000,"endTime":1518703200000,"stockNum":15,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":4,"title":null,"itemTitle":"【免费试用】牛尔亲研京城之霜保湿活肤导入美容液 ","itemCoverUrl":"http://static3.j.cn/png/arcamera/180126/1014/2aba86d45053434e.png","startTime":1516935600000,"endTime":1518145200000,"stockNum":15,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":25,"title":null,"itemTitle":"家庭电影《妈妈咪鸭》影票免费得","itemCoverUrl":"http://static2.j.cn/png/arcamera/180313/1720/39519fa2491845d3.jpg","startTime":1520850480000,"endTime":1521126000000,"stockNum":30,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":13,"title":null,"itemTitle":"兴业银行&她社区活动：办卡送抱枕","itemCoverUrl":"http://static2.j.cn/png/arcamera/180207/1606/0c127deb8b6d44da.jpg","startTime":1517990760000,"endTime":1519830000000,"stockNum":100,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":5,"title":null,"itemTitle":"【免费试用】视频APP月卡","itemCoverUrl":"http://static3.j.cn/png/arcamera/180126/1823/e6b3d65c482b4753.jpg","startTime":1516962420000,"endTime":1519747200000,"stockNum":200,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":16,"title":null,"itemTitle":"情感课程免费听：驭夫有道-搞定老公有技巧，幸福婚姻靠智慧！","itemCoverUrl":"http://static4.j.cn/png/arcamera/180213/1854/44f8f903e64b4e98.jpg","startTime":1518519180000,"endTime":1519729200000,"stockNum":10,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":12,"title":null,"itemTitle":"杜蕾斯三只装免费领","itemCoverUrl":"http://static2.j.cn/png/arcamera/180207/1002/43c244e65c224bfe.jpg","startTime":1517968860000,"endTime":1518512400000,"stockNum":100,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":11,"title":null,"itemTitle":"办理兴业银行信用卡送她社区抱枕","itemCoverUrl":"http://static2.j.cn/png/arcamera/180206/1352/90ff4151c11a4150.png","startTime":1517896320000,"endTime":1517913660000,"stockNum":500,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":3,"title":null,"itemTitle":"【免费试用】OBB星座卫生巾","itemCoverUrl":"http://static2.j.cn/png/arcamera/180130/1049/6b7aa0beb8ae4b28.png","startTime":1516701600000,"endTime":1517882400000,"stockNum":15,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":1,"title":null,"itemTitle":"【免费试用】每日宫婴幼儿奶粉","itemCoverUrl":"http://static1.j.cn/png/arcamera/180130/1041/13ba712a20d4469a.png","startTime":1516676400000,"endTime":1517878800000,"stockNum":15,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0},{"id":2,"title":null,"itemTitle":"【免费试用】有机石磨面粉1KG","itemCoverUrl":"http://static4.j.cn/png/arcamera/180123/1620/be78ffeb4c4b46cf.png","startTime":1516701600000,"endTime":1517846400000,"stockNum":15,"deductCoin":0,"detailPostId":0,"applyNum":0,"eatMelonNum":0,"itemDetailUrl":null,"detailTagId":0,"detailGroupId":0,"itemStatus":0}]
        this.$nextTick(() => {
          this._initScroll()
        })
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
          probeType: 1,
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