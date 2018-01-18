<template>
  <div class="trial_rule">
    <self-header headerTitle="试用规则" class="header"></self-header>
    <div class="content">
      <div class="steps clearfix">
        <div class="step">免费<br/>申请</div>
        <i class="el-icon-arrow-right"></i>
        <div class="step">申请<br/>成功</div>
        <i class="el-icon-arrow-right"></i>
        <div class="step">收到<br/>奖品</div>
        <i class="el-icon-arrow-right"></i>
        <div class="step">试用<br/>报告</div>
      </div>
      <ul class="questions">
        <li v-for="(question, index) in questions" @click="toAnswer(question.mainPostId)" :key="question.mainPostId">
          <span>{{question.title}}</span>
          <i class="el-icon-arrow-right"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Header from '../components/header.vue'
  import {getRules } from '../api/index.js'
  export default {
    data() {
      return {
        questions: []
      }
    },
    computed: {},
    methods: {
      toAnswer(mainPostId) {
        let targetUrl = ''
        if (location.href.indexOf('jcnhers') !== -1){
          targetUrl = `jcnhers://detail_post/postId=${mainPostId}`
        } else {
          targetUrl = `http://bbs.j.cn/#/posts/${mainPostId}`
        }
        window.location.href = targetUrl
      },
      _initData() {
        getRules()
          .then(res => {
            this.questions = res.data
          })
          .catch(console.log)
      }
    },
    components: {
      'self-header': Header
    },
    created() {
      this._initData()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../style/mixin.styl'
  .trial_rule
    height: 100%;
    overflow-y: scroll;
    background-color #fff
    .header
      -moz-box-shadow 0 10px 30px -10px #e2e0de
      box-shadow 0 10px 30px -10px #e2e0de
    .content
      margin-top 90px
      padding 0 50px 0 42px
      border-top 1px solid #e2e0de
      .steps
        padding 42px 22px 50px 22px
        .step
          float left;
          wh(126px, 126px)
          box-sizing border-box
          border 1px solid #f66
          border-radius 50px
          font-size 34px
          color #f66
          line-height 44px
          padding-top 18px
        .el-icon-arrow-right
          float left
          margin 0 5px
          margin-top 50px
          font-size 26px
          color #f66
      .questions
        li
          border-top 1px solid #ccc
          height 126px
          box-sizing border-box
          padding 45px 0
          line-height 36px
          font-size 36px
          text-align left
          .el-icon-arrow-right
            float right
</style>