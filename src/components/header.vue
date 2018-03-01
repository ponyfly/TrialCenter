<template>
  <div class="header">
    <i class="back el-icon-arrow-left" @click="goBack"></i>
    <h2>{{headerTitle}}</h2>
  </div>
</template>

<script>
  import {Button } from 'element-ui'
  export default {
    props:{
      headerTitle: {
        type: String
      },
    },
    data() {
      return {}
    },
    computed: {},
    methods: {
      goBack() {
        this.$router.back()
        this.$emit('backToApp')
      }
    },
    components: {
      'el-button': Button
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .header
    width 750px
    position fixed
    top 0
    height 90px
    line-height 90px
    font-size 34px
    background-color #fff
    z-index 999
    .back
      position: absolute;
      top: 0;
      left: 0;
      font-size: 44px;
      padding: 23px;
    h2
      color #000
</style>