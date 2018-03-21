<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :userId="userId" @getUserInfos="onGetUserInfos" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :userId="userId" ></router-view>
  </div>
</template>

<script>
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
      onGetUserInfos() {
        const ua = navigator.userAgent.toLowerCase()
        const isAndroid = ua.indexOf('android') > -1
        const isIphone = ua.indexOf('iphone') > -1
        if(!window.app_interface) return
        if(isAndroid) {
          this.userId = JSON.parse(window.app_interface.getUserInfo()).id || ''
        }
        if(isIphone) {
          const ver = ua.match(/(?:os\s)(\d+)(?:_\d+)/)[1]
          alert(new Date().getTime())
          window.app_interface.getHersUserInfo("userInfoCallback")
//          if (ver < 8) {
//            this.userId = JSON.parse(window.app_interface.getUserInfo()).id || ''
//          }else{
//            window.app_interface.getHersUserInfo("callback")
//          }
        }
      },
      userInfoCallback(data) {
        alert(new Date().getTime())
        this.userId = JSON.parse(data).id || ''
      },
      reloadPage(e) {
        if (e.persisted) {
          window.location.reload(true)
        }
      },
      unloadHandler() {
        window.app_interface && window.app_interface.setTitleVisible(1)
      },
    },
    created() {
      if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
        window.onpageshow = this.reloadPage
      }
      window.appLoginFinish = this.appLoginFinish
      window.userInfoCallback = this.userInfoCallback
      window.app_interface && window.app_interface.setTitleVisible(0)
      window.onunload = this.unloadHandler
    },
    watch: {},
    mounted() {
//      setTimeout(() => {
//        this.onGetUserInfos()
//      }, 500)
    },
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