<template>
  <div class="trial_rule">
    <self-header headerTitle="试用规则"></self-header>
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
        <li v-for="question in questions">
          <span>{{question}}</span>
          <i class="el-icon-arrow-right"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Header from '../components/header.vue'
  export default {
    data() {
      return {
        questions: [
          '申请试用需要什么条件？',
          '在哪里可以看到申请进度？',
          '申请试用会扣除金币吗？',
          '试用冻结的金币什么时候返还？',
          '如何提试用中奖率？',
          '如何提交试用报告？',
          '申请免费试用需要邮费吗？',
          '免职声明',
        ]
      }
    },
    computed: {},
    methods: {},
    components: {
      'self-header': Header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../style/mixin.styl'
  .trial_rule
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