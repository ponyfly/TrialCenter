<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import Tool from './plugins/tools.js'
  export default {
    name: 'app',
    data() {
      return {
        userId: ''
      }
    },
    created() {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "style/reset.css"
  #app
    width 750px
    height 100%
    margin 0 auto
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    overflow hidden
    .slide-enter
      transform translateX(750px)
    .slide-enter-active ,.slide-leave-active
      transition transform .6s
    .slide-leave-active
      position absolute
      z-index -999
    .slide-enter-to, .slide-leave, .slide-leave-to
      transform translateX(0px)
</style>