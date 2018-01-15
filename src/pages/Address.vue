<template>
  <div class="address">
    <self-header headerTitle="我的收获地址"></self-header>
    <div class="content">
      <!--<el-form ref="addressForm" :model="form" :rules="rules">
        <el-form-item label="收货人：" label-width="172px" prop="username">
          <el-input v-model="form.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" label-width="172px">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
        <el-form-item label="详细地址：" label-width="172px">
          <el-input v-model="form.detailAddress" placeholder="街道、楼牌号等"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox name="type" v-model="form.checked" label="">我已了解</el-checkbox>
          <router-link :to="{name: 'TrialRule'}">试用规则</router-link>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="onSubmit('addressForm')" class="confirm">确定</el-button>
          <el-button type="info" class="cancel">取消</el-button>
        </el-form-item>
      </el-form>-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
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
  import Header from '../components/header.vue'
  export default {
    data() {
      return {
        form: {
          itemId: '',
          userId: '',
          userName: '',
          telephone: '',
          checked: true,
          addressId: '',
          detailAddress: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入性命', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {},
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      _initData() {
        const {userId, itemId, addressList} = this.$route.params
        console.log(userId, itemId, addressList)

        if(!userId || !itemId) return
        this.form.itemId = itemId
        this.form.userId = userId
        if (addressList !== 'null' && addressList.length) {
          const {id, userName, address, telephone} = addressList[0]
          this.form.addressId = id
          this.form.userName = userName
          this.form.detailAddress = address
          this.form.telephone = telephone
        }
      },
    },
    components: {
      'self-header': Header,
      'el-button': Button,
      'el-form': Form,
      'el-form-item': FormItem,
      'el-input': Input,
      'el-checkbox-group': CheckboxGroup,
      'el-checkbox': Checkbox,
    },
    created() {
//      this._initData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../style/mixin.styl'
  .address
    padding-top 100px
    /*.content
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
          &:nth-of-type(4)
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
          &:nth-of-type(5)
            border none
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
              border-color #a6a9ad*/
</style>
