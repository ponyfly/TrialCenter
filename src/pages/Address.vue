<template>
  <div class="address">
    <self-header headerTitle="我的收获地址"></self-header>
    <div class="content">
      <!--<div class="userinfo">
        <div class="consignee">
          收货人：
          <input type="text">
        </div>
        <div class="phonenum"></div>
        <div class="location"></div>
        <div class="detail_address"></div>
      </div>
      <div class="know_rule"></div>
      <div class="btns">
        <el-button type="danger" round>确定</el-button>
        <el-button round>取消</el-button>
      </div>-->
      <el-form ref="form" :model="form">
        <el-form-item label="收货人：" label-width="172px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" label-width="172px">
          <el-input v-model="form.phoneNo"></el-input>
        </el-form-item>
        <el-form-item label="所在地区：" label-width="172px">
          <el-input v-model="form.location"></el-input>
          <i class="el-icon-arrow-right"></i>
        </el-form-item>
        <el-form-item label="详细地址：" label-width="172px">
          <el-input v-model="form.detailAddress"></el-input>
        </el-form-item>
        <el-form-item label="性质">
          <el-checkbox label="美食/餐厅线上活动" name="type" v-model="form.checked"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>>
    </div>
  </div>
</template>

<script>
  import {
    Button,
    Form,
    FormItem,
    Input,
    CheckboxGroup,
    Checkbox,
  } from 'element-ui'
  import VDistpicker from 'v-distpicker'
  import Header from '../components/header.vue'
  export default {
    data() {
      return {
        form: {
          name: '',
          phoneNo: '',
          checked: true,
          location: '',
          detailAddress: ''
        }
      }
    },
    computed: {},
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    components: {
      'self-header': Header,
      'v-distpicker': VDistpicker,
      'el-button': Button,
      'el-form': Form,
      'el-form-item': FormItem,
      'el-input': Input,
      'el-checkbox-group': CheckboxGroup,
      'el-checkbox': Checkbox
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .address
    .content
      box-sizing border-box
      padding 90px 30px 0
      height 100%
      .el-form
        .el-form-item
          box-sizing border-box
          margin 0
          height 120px
          padding 40px 20px
          border-bottom 1px solid #e2e2e2
          .el-form-item__label
            font-size 32px
            text-align left
          .el-form-item__content
            .el-icon-arrow-right
              tr(5px, -28px)
              font-size 30px
          .el-input
            input
              border none
              font-size 32px
    .addd
       font-size 22px
</style>
