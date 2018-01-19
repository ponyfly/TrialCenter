<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :userId="userId" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :userId="userId" ></router-view>
  </div>
</template>

<script>
  import Tool from './plugins/tools.js'
  export default {
    name: 'app',
    data() {
      return {
        userId: '',
        status: '',
      }
    },
    methods: {
      appLoginFinish(status, userId) {
        if(parseInt(status) === 200) {
          this.userId = userId || ''
          this.status = status
        }
      },
      getUserInfos() {
        const ua = navigator.userAgent.toLowerCase()
        const isAndroid = ua.indexOf('android') > -1
        const isIphone = ua.indexOf('iphone') > -1
        this.userId = ''
        if(!window.app_interface) return
        if(isAndroid) {
          this.userId = JSON.parse(window.app_interface.getUserInfo()).id || ''
        }
        if(isIphone) {
          const ver = ua.match(/(?:os\s)(\d+)(?:_\d+)/)[1]
          if (ver < 8) {
            this.userId = JSON.parse(window.app_interface.getUserInfo()).id || ''
          }else{
            window.app_interface.getHersUserInfo("callback")
          }
        }
      },
      callback(data) {
        this.userId = JSON.parse(data).id || ''
      }
    },
    created() {
      window.appLoginFinish = this.appLoginFinish
      window.callback = this.callback
      if (window.app_interface) {
        window.app_interface.setTitleVisible(0)
      }
    },
    watch: {},
    mounted() {
      this.getUserInfos()
    }
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