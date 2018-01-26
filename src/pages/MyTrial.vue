<template>
  <div class="my_trial">
    <self-header headerTitle="我的试用"></self-header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="999">全部</el-menu-item>
      <el-menu-item index="0">申请中</el-menu-item>
      <el-menu-item index="1">申请成功</el-menu-item>
      <el-menu-item index="-1">申请失败</el-menu-item>
    </el-menu>
    <div class="my_trial_wrapper" ref="myTrialWrapper">
      <ul>
        <li is="self-mytrial-item" v-for="myTrial in trialList" :product="myTrial"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    Menu,
    MenuItem } from 'element-ui'
  import BScroll from 'better-scroll'
  import Header from '../components/header.vue'
  import MyTrialItem from '../components/mytrialitem.vue'
  import {getMytrial } from '../api/index.js'
  export default {
    props: {
      userId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        activeIndex: '999',
        trialList: [],
        firstEnter: true,
        curPage:1,
        totalPage: 0,
        isPullUp: false,
        isPullDown: false,
        isPulling: true,
        scrollPositionY: 0,
      }
    },
    computed: {},
    methods: {
      setTabsContentHeight() {
        const bodyHeight = document.body.clientHeight || document.documentElement.clientHeight
        this.$nextTick(() => {
          document.querySelector('.my_trial_wrapper').style.height = `${bodyHeight - 180}px`
          document.querySelector('.my_trial_wrapper').style.overflow = 'scroll'
        })
      },
      handleSelect(key, keyPath) {
        this.activeIndex = key
        this.curPage = 1
        this.firstEnter = true
        this.loadData()
      },
      _initScroll() {
        if(!this.scroll) {
          this.scroll = new BScroll(this.$refs.myTrialWrapper, {
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
            }else {
              console.log('我们是有底线的');
              this.scroll.finishPullUp()
            }
          })
          this.scroll.on('scrollEnd', (pos) => {
            this.scrollPositionY = pos.y
          })
        } else {
          this.scroll.refresh()
        }
      },
      loadData() {
        getMytrial(this.curPage, this.userId, this.activeIndex)
          .then(res => {
            console.log('getmytrial')
            this.totalPage = parseInt(res.data.totalPage, 10)
            if(this.firstEnter) {
              this.trialList = res.data.trialList
              this.firstEnter = false
            }
            if(this.isPulling) {
              if(this.isPullDown) {
                this.scroll.finishPullDown()
                this.trialList.splice(0)
                this.trialList = res.data.trialList
                this.isPullDown = false
              }
              if(this.isPullUp) {
                this.scroll.finishPullUp()
                this.trialList = [...this.trialList, ...res.data.trialList]
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
    },
    components: {
      'self-header': Header,
      'el-menu': Menu,
      'el-menu-item': MenuItem,
      'self-mytrial-item': MyTrialItem
    },
    created() {
      this.setTabsContentHeight()
      this.loadData()
    },
    mounted() {
      this.Tool._send1_1('try', 'try-mine')
    },
    activated() {
      if (this.scroll) {
        this.scroll.scrollTo(0, this.scrollPositionY)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../style/mixin.styl"
  .my_trial
    background-color #fff
    height 100%
    .el-menu-demo
      position fixed
      top 90px
      width 750px
      background-color #fff
      z-index 999
      .el-menu-item
        width 25%
        font-size 30px
        height 90px
        line-height 90px
    .my_trial_wrapper
      wh(100%, 100%)
      margin-top 180px
    .el-menu--horizontal>.el-menu-item.is-active, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title
      border-bottom 2px solid #f66
      color #f66
</style>