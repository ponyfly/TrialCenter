<template>
  <div class="header">
    <div class="back"></div>
    <h3>{{title}}</h3>
  </div>
</template>

<script>
  import {Button } from 'element-ui'
  export default {
    props:['title'],
    data() {
      return {}
    },
    computed: {},
    methods: {},
    components: {
      'el-button': Button
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .header
    width 750px
    position fixed
    height 100px
    background-color #fff
    line-height 100px
    z-index 999
</style>