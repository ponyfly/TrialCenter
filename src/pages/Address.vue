<template>
  <div class="address">
    <self-header headerTitle="我的收获地址"></self-header>
    <div class="content">
      <el-form ref="addressForm" :model="form" :rules="rules">
        <el-form-item label="收货人：" label-width="172px" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" label-width="172px" prop="telephone">
        <el-input v-model.number="form.telephone"></el-input>
      </el-form-item>
        <el-form-item label="详细地址：" label-width="175px" prop="address">
          <el-input type="textarea" :rows="2" v-model="form.address" placeholder="街道、楼牌号等"></el-input>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox name="type" v-model="form.checked">我已了解</el-checkbox>
          <router-link :to="{name: 'TrialRule'}">试用规则</router-link>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="onSubmit('addressForm')" class="confirm">确定</el-button>
          <el-button type="info" class="cancel" @click="onCancelApply">取消</el-button>
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
    Message,
  } from 'element-ui'
  import Header from '../components/header.vue'
  import {postApplyItem } from '../api/index.js'
  export default {
    props: {
      userId: {
        type: String,
        default: ''
      }
    },
    data() {
      const validateTel = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话不能为空'))
        } else {
          setTimeout(() => {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'))
            } else {
              if (/^1\d{10}$/.test(value)) {
                callback()
              } else {
                callback(new Error('手机格式不正确'))
              }
            }
          }, 600)
        }
      }
      const validateChecked = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请同意使用规则'))
        } else{
          callback()
        }
      }
      return {
        form: {
          itemId: '',
          userId: '',
          userName: '',
          telephone: '',
          checked: true,
          addressId: '',
          address: '',
        },
        rules: {
          userName: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入收货地址', trigger: 'blur'}
          ],
          telephone: [
            {validator: validateTel, trigger: 'blur'}
          ],
          checked: [
            {validator: validateChecked, trigger: 'change'}
          ]
        }
      }
    },
    computed: {},
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const {itemId, userId, userName, telephone, address} = this.form
            const restStr = `itemId=${itemId}&userId=${userId}&userName=${userName}&telephone=${telephone}&address=${address}`
            postApplyItem(restStr)
              .then(res => {
                if(parseInt(res.data.errorcode, 10) === 1) {
                  this.openSuccess()
                  this.Tool._send1_1('ontrial', 'try-detail-apply')
                } else if (parseInt(res.data.errorcode, 10) === -6) {
                  this.openFail()
                }
                setTimeout(() => {
                  this.$router.back()
                },1600)
              })
              .catch(console.log)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      _initData() {
        const {itemId, addressList} = this.$route.params
        if(!this.userId || !itemId) return
        this.form.itemId = itemId
        this.form.userId = this.userId
        if (addressList !== 'null' && addressList.length) {
          const {id, userName, address, telephone} = addressList[0]
          this.form.addressId = id
          this.form.userName = userName
          this.form.address = address
          this.form.telephone = parseInt(telephone, 10)
        }
      },
      openSuccess() {
        Message({
          message: '申请成功',
          type: 'success',
          duration: 1600,
          customClass: 'self_message'
        })
      },
      openFail() {
        Message({
          message: '金币不足',
          type: 'warning',
          duration: 1600,
          customClass: 'self_message'
        })
      },
      onCancelApply() {
        this.$router.back()
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
      console.log('created')
      this._initData()
    },
    activated() {
      console.log('activated')
    },
    mounted() {
      console.log('mounted')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../style/mixin.styl'
  .address
    background-color #fff
    height 100%
    .content
      box-sizing border-box
      padding 90px 30px 0
      height 100%
      text-align left
      .el-form
        .el-form-item
          box-sizing border-box
          margin 0
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
          .el-textarea
            textarea
              resize none
              border none
              font-size 32px
          &:nth-of-type(3)
            .el-form-item__label
              line-height 58px
          &:nth-of-type(4)
            .el-checkbox__inner
              wh(25px, 25px)
              border-color #f66
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
              border-color #a6a9ad
        .el-form-item__error
          font-size 16px
    .el-form-item.is-required .el-form-item__label:before
      content ''
      margin 0
</style>