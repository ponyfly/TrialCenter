<template>
  <div class="address">
    <self-header headerTitle="我的收获地址"></self-header>
    <div class="content">
      <el-form ref="form" :model="form">
        <el-form-item label="收货人：" label-width="172px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" label-width="172px">
          <el-input v-model="form.phoneNo"></el-input>
        </el-form-item>
        <el-form-item label="所在地区：" label-width="172px" @click.native="dialogVisible = true">
          <el-input v-model="form.location" :disabled="true"></el-input>
          <i class="el-icon-arrow-right"></i>
        </el-form-item>
        <el-form-item label="详细地址：" label-width="172px">
          <el-input v-model="form.detailAddress" placeholder="街道、楼牌号等"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox name="type" v-model="form.checked" label="">我已了解</el-checkbox>
          <router-link :to="{name: 'TrialRule'}">试用规则</router-link>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="onSubmit" class="confirm">确定</el-button>
          <el-button type="info" class="cancel">取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
          class="location_dialog"
          :visible.sync="dialogVisible"
          width="660px"
          top="34vh"
          :before-close="handleClose">
        <div>
          <v-distpicker type="mobile" @selected="onSelected"></v-distpicker>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="danger" @click="confirmLocation">确 定</el-button>
        </span>
      </el-dialog>
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
  import {Dialog } from 'element-ui'
  export default {
    data() {
      return {
        form: {
          name: '',
          phoneNo: '',
          checked: true,
          location: '',
          detailAddress: '',
        },
        dialogVisible: false,
        tempLocation: {
          province:'',
          city:'',
          area:'',
        }
      }
    },
    computed: {},
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      confirmLocation(){
        const {province, city, area} = this.tempLocation
        this.dialogVisible = false
        this.form.location = `${province} ${city} ${area}`
      },
      onSelected(locationData) {
        this.tempLocation.province = locationData.province.value
        this.tempLocation.city = locationData.city.value
        this.tempLocation.area = locationData.area.value
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
      'el-checkbox': Checkbox,
      'el-dialog': Dialog
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../style/mixin.styl'
  .address
    .content
      box-sizing border-box
      padding 90px 30px 0
      height 100%
      text-align left
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
          &:nth-of-type(3)
            .el-input.is-disabled .el-input__inner
              background-color #fff
              color #606266
          &:nth-of-type(5)
            .el-checkbox__inner
              wh(25px, 25px)
              &:hover
                border-color #f66
              &:after
                wh(6px, 12px)
                top 3px
                left 8px
            .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner
              background-color: #f66;
              border-color: #f66;
            .el-checkbox__input.is-checked+.el-checkbox__label
              color #f66
            .el-checkbox__input.is-focus .el-checkbox__inner
              border-color #f66
            .el-checkbox__label
              font-size 26px
              vertical-align middle
            a
              color #f66
              text-decoration underline
              padding-left 5px
              font-size 26px
              vertical-align middle
          &:nth-of-type(6)
            .confirm, .cancel
              wh(295px, 100px)
              font-size 38px
              border-radius 50px
            .confirm
              float left
            .el-button--danger, .el-button--danger:focus, .el-button--danger:hover
              background #f66
              border-color #f66
            .el-button--danger:active
              background #f44
              border-color #f44
            .cancel
              float right
            .el-button--info, .el-button--info:focus, .el-button--info:hover
              background #cdcdcd
              border-color #cdcdcd
            .el-button--info:active
              background #a6a9ad
              border-color #a6a9ad
    .location_dialog
      .el-dialog__body
        font-size 28px
        .distpicker-address-wrapper .address-container ul li
          padding-top 20px
          padding-bottom 20px
        .address-container
          height 195px
          overflow-y scroll
      .el-dialog__footer
        .dialog-footer
          .el-button
            font-size 28px

</style>
