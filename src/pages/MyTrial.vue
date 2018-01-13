<template>
  <div class="my_trial">
    <self-header headerTitle="我的试用"></self-header>
    <el-tabs class="tab_wrapper" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="tab_pane" label="全部" name="first">
        <ul>
          <li is="self-mytrial-item" v-for="myTrial in myTrials" :product="myTrial"></li>
        </ul>
      </el-tab-pane>
      <el-tab-pane class="tab_pane" label="申请中" name="second">
        <ul>
          <li is="self-mytrial-item" v-for="myTrial in applying" :product="myTrial"></li>
        </ul>
      </el-tab-pane>
      <el-tab-pane class="tab_pane" label="申请成功" name="third">
        <ul>
          <li is="self-mytrial-item" v-for="myTrial in successApply" :product="myTrial"></li>
        </ul>
      </el-tab-pane>
      <el-tab-pane class="tab_pane" label="申请失败" name="fourth">
        <ul>
          <li is="self-mytrial-item" v-for="myTrial in failApply" :product="myTrial"></li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {Tabs, TabPane} from 'element-ui'
  import Header from '../components/header.vue'
  import MyTrialItem from '../components/mytrialitem.vue'
  export default {
    data() {
      return {
        activeName: 'first',
        //申请时间：2018年01月10日15时 申请状态：审核中 0失败 1成功 2审核
        myTrials: [
          {id: 12, name: '【免费试用】网易严选，每日坚果', src: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
            applyTime: '2018年01月10日21时', applyState: 0},
          {id: 13, name: '【免费试用】网易严选，每日坚果', src: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
            applyTime: '2018年01月12日16时', applyState: 1},
          {id: 14, name: '【免费试用】网易严选，每日坚果', src: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
            applyTime: '2018年01月05日01时', applyState: 2},
          {id: 15, name: '【免费试用】网易严选，每日坚果', src: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
            applyTime: '2018年01月01日15时', applyState: 1},
        ]
      }
    },
    computed: {
      successApply() {
        return this.myTrials.filter(item => parseInt(item.applyState, 10) === 1)
      },
      failApply() {
        return this.myTrials.filter(item => parseInt(item.applyState, 10) === 0)
      },
      applying() {
        return this.myTrials.filter(item => parseInt(item.applyState, 10) === 2)
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      setTabsContentHeight() {
        const bodyHeight = document.body.clientHeight || document.documentElement.clientHeight
        console.log(bodyHeight)
        this.$nextTick(() => {
          document.querySelector('.el-tabs__content').style.height = `${bodyHeight - 180}px`
          document.querySelector('.el-tabs__content').style.overflow = 'scroll'
        })
      }
    },
    components: {
      'self-header': Header,
      'el-tabs': Tabs,
      'el-tab-pane': TabPane,
      'self-mytrial-item': MyTrialItem
    },
    created() {
      this.setTabsContentHeight()
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../style/mixin.styl"
  .my_trial
    background-color #fff
    .tab_wrapper
      position fixed
      top 90px
      width 750px
      .el-tabs__nav
        background-color: #f8f8f8;
        width 100%
        .el-tabs__item
          width 25%
          font-size 30px
          height 90px
          line-height 90px
          &.is-active
            color #e93369
    .el-tabs__active-bar
      background-color #e93369
</style>