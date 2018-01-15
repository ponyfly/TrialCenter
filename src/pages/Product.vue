<template>
  <div class="product_info">
    <self-header headerTitle="详情"></self-header>
    <div class="overview" v-if="errorcode !== -1">
      <div class="banner">
        <img :src="item.itemCoverUrl" alt="">
      </div>
      <h3 class="product_title">{{item.itemTitle}}</h3>
      <div class="product_body">
        <div class="info_1">
          <span class="limit_num">限量：{{item.stockNum}}份</span>
          <span>申请人数：{{item.applyNum}}人</span>
        </div>
        <div class="info_2 clearfix">
          <self-backtime :endTime="item.endTime" class="endtime" v-if="item.endTime"></self-backtime>
          <router-link :to="{name:'TrialRule'}" class="trail_rule_btn">试用规则</router-link>
        </div>
      </div>
      <div class="apply_info">
        <div class="apply_state" :class="{apply_success: applySuccess}">
          <i class="icon_state"></i>
          <span>申请状态：</span>{{userApplyInfo.applyInfo}}
          <span v-if="applySuccess" class="express_info">快递信息：{{expressContent}}</span>
        </div>
        <div class="write_post">
          <span class="deductCoin">{{item.deductCoin}}</span>金币
          <el-button
              type="danger"
              round
              class="write_post_btn"
              v-if="showGoToAdressOrPost"
              @click="goToAdressOrPost">
            {{parseInt(userApplyInfo.applyStatus, 10) === 1 ? '填写报告' : '马上申请'}}</el-button>
        </div>
      </div>
    </div>
    <div class="info_post" ref="infoPost" v-if="errorcode !== -1">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="商品详情" name="first">
          <div class="product_detail">
            <h2>详情</h2>
          </div>
        </el-tab-pane>
        <el-tab-pane label="试用报告" name="second">
          <ul class="post_list" v-if="posts.length">
            <li v-for="postItem in posts">
              <p>{{postItem.text}}</p>
              <div v-if="postItem.src.length" class="img_wrapper clearfix">
                <div v-for="postImg in postItem.src" class="img_item">
                  <img :src="postImg" alt="">
                </div>
              </div>
            </li>
          </ul>
          <div class="no_post" v-else>暂时没有报告，小主等等再来看吧~</div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="no_product" v-if="errorcode === -1">
      找不到商品
    </div>
  </div>
</template>

<script>
  import {Button, Tabs, TabPane } from 'element-ui'
  import Header from '../components/header.vue'
  import BackTime from '../components/backtime.vue'
  import {getDetail } from  '../api/index.js'
  import Tool from '../plugins/tools.js'
  export default {
    data() {
      return {
        activeName: 'first',
        success: true,
        posts: [
          {text: '大家好，我是小se，都说手势女人的第二张脸，不知道小主平常是否有精心护理过，想想看,大家好，我是小se，都说手势女人的第二张脸，不知道小主平常是否有精心护理过，想想看', src: [
            'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
            'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
            'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
          ]},
          {text: '大家好，我是小se，都说手势女人的第二张脸，不知道小主平常', src: [
            'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
            'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
          ]},
          {text: '大家好，我是小se，都说手势女人的第二张脸，不知道小主平常是否有精心护理过，想想看,大家好，我是小se，都说手势女人的第二张脸，不知道小主平常是否有精心护理过，想想看', src: []},
          {text: '大家好，', src: ['http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114']},
        ],
        hasApplied: false,
        userId: '',
        item: {},
        userApplyInfo: {},
        errorcode:'',//-1商品id不存在
        msg:'',//提示信息,
        tmpHeight: 0
      }
    },
    computed: {
      applySuccess() {
        return parseInt(this.userApplyInfo.applyStatus, 10) === 1
      },
      showGoToAdressOrPost() {
        return parseInt(this.userApplyInfo.applyStatus, 10) === -999 || parseInt(this.userApplyInfo.applyStatus) === 1
      },
      expressContent() {
        const {expressStatus, expressInfo, expressName, expressNo} = this.userApplyInfo
        let tmpText = ''
        if (parseInt(expressStatus, 10)) {
          tmpText = expressInfo
          if(expressName && expressNo) {
            tmpText = ` ${expressName} ${expressNo}`
          }
        } else {
          tmpText = expressInfo
        }
        return tmpText
      }
    },
    methods: {
      goToAdressOrPost() {
        if(!this.userId) {
          alert('跳转登陆')
//          window.location.href = '#'
        }else {
          if(parseInt(this.userApplyInfo.applyStatus, 10) === -999) {
            this.$router.push({
              name: 'Address',
              params: {
                itemId: this.itemId,
                userId: this.userId,
                addressList: this.userApplyInfo.addressList
              },
            })
          } else if (parseInt(this.userApplyInfo.applyStatus, 10) === 1) {
            alert('填写报告')
//            window.location.href = '#'
          }
        }
      },
      handleClick(tab, event) {
        if (tab.name === 'second') {
          console.log('second')
          this.tabInfoHeight = this.$refs.infoPost.clientHeight
        }
        if (this.tabInfoHeight) {
          if (tab.name === 'first') {
            this.tabPostHeight = this.$refs.infoPost.clientHeight
            this.$refs.infoPost.style.height = `${this.tabInfoHeight > this.tabPostHeight ? this.tabInfoHeight : this.tabPostHeight}px`
          }
        }
      },
    },
    watch: {},
    created() {
      console.log('created')
      this.itemId = this.$route.params.productId || 11
      this.userId = Tool._GetQueryString('userId') || '123456789'
      getDetail(this.itemId, this.userId)
        .then(res => {
          console.log('getItemDetail')
          res = {
            item: {
              id:'12',//商品id
              itemTitle: '【免费试用】网易严选，每日坚果5',//商品名字
              itemCoverUrl : 'http://cangdu.org:8001/img/16018a6492334.jpeg',//商品图片
              startTime: '2018-01-01 16:25:36',//商品开始时间
              endTime: '2018-01-16 18:26:36',//商品结束时间
              stockNum: '60',//商品限制数量
              deductCoin: '200', //商品消耗金币数
              detailPostId: '89757' , //商品描述,返回帖子id
              trialPostIds: [12,13,16], //试用报告，返回帖子id
              detailGroupId: '', //发验收报告圈子id
              applyNum:'169'//申请人数
            },
            userApplyInfo: {
              applyStatus: '-999', //申请状态 状态:status=-999未申请，status=0->申请中;status=-1->申请失败;status=1->申请成功;
              applyInfo: '未申请', //applyStatus状态的对应信息
              expressStatus:'1',//0未发货，1已发货
              expressInfo:'已发货',//expressStatus 状态对应信息
              expressName:'三通',//快递名称
              expressNo:'666',//快递单号,
              addressList: [
                {
                  id: '01',
                  userName: '张三',
                  address: '北京',
                  telephone: '15066668888'
                }
              ],
            },
            errorcode: '1',//-1商品id不存在
            msg: '' //提示信息
          }

          this.errorcode = res.errorcode
          if(parseInt(res.errorcode, 10) === -1) {
            return
          }
          this.item = res.item
//          this.userId = ''
          this.userApplyInfo = this.userId ? res.userApplyInfo : {
            applyStatus: '-999', //申请状态 状态:status=-999未申请，status=0->申请中;status=-1->申请失败;status=1->申请成功;
            applyInfo: '未申请', //applyStatus状态的对应信息
            expressStatus:'0',//0未发货，1已发货
            expressInfo:'',//expressStatus 状态对应信息
            expressName:'',//快递名称
            expressNo:'',//快递单号
            addressList: [
              {
                id: '',
                userName: '',
                address: '',
                telephone: ''
              }
            ]
          }
          this.msg =res.msg //提示信息
        })
        .catch(console.log)
    },
    mounted() {
      console.log('mounted')
    },
    components: {
      'self-header': Header,
      'self-backtime': BackTime,
      'el-button': Button,
      'el-tabs': Tabs,
      'el-tab-pane': TabPane
    },
    activated() {
      console.log('activated')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../style/mixin.styl"
  .product_info
    padding-top 90px
    height 100%
    box-sizing border-box
    overflow-y scroll
    background-color #fff
    .overview
      background-color #f3f3f3
      padding-bottom 10px
      font-size 28px
      .banner
        height 750px
        img
          wh(100%, 100%)
      .product_title
        height 100px
        line-height 100px
        padding-left 30px
        text-align left
        box-sizing border-box
        font-size 40px
        color #333
        background-color #fff
      .product_body
        padding 0 45px
        box-sizing border-box
        color #707070
        text-align left
        line-height 48px
        border-bottom 1px solid #e5e5e5
        background-color #fff
        .info_1
          .limit_num
            padding-right 28px
        .info_2
          margin 10px 0
          .endtime
            float left
          .trail_rule_btn
            float right
            color #f66
            text-decoration underline
      .apply_info
        box-sizing border-box
        height 120px
        border-top 1px solid #e5e5e5
        border-bottom 1px solid #e5e5e5
        margin-top 10px
        padding 33px 45px
        background-color #fff
        .apply_state
          float left
          font-size 32px
          height 54px
          line-height 54px
          position relative
          .icon_state
            display inline-block
            position: relative
            top 4px
            wh(28px,28px)
            background url(../images/apply_state.png)  no-repeat
            background-position 0 -28px
          span:nth-of-type(1)
            font-weight bold
          span:nth-of-type(2)
            font-size 22px
            color #969696
          .express_info
            position absolute
            left 0
        .apply_success
          top -12px
          line-height 43px
        .write_post
          float right
          line-height 60px
          span.deductCoin
            color #f66
          .write_post_btn
            font-size 28px
            border-radius 27px
            color #fefefe
    .info_post
      .post_list
        padding 0 42px
        font-size 30px
        line-height 48px
        li
          padding 30px 0
          border-bottom  1px solid #ccc
        p
          text-align left
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 2
          overflow hidden
        .img_wrapper
          margin-top 20px
          .img_item
            float left
            wh(212px, 148px)
            &+.img_item
              margin-left 15px
            img
              wh(100%, 100%)
    .no_post
      font-size 30px
      padding 10px 0
    .product_detail
      height 300px
    .el-tabs__nav
      width 100%
      .el-tabs__item
        width 50%
        font-size 30px
        height 90px
        line-height 90px
        &.is-active
          color #f66
    .el-tabs__active-bar
      background-color #f66
    .no_product
      font-size 32px
</style>