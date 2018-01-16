/trialCenter
/**
 param:int pageNo
 * 商品列表
 * @type {[null]}
 */

const listItems = {
  totalPage: '',//总页数
  items: [
    {
      id: '',//商品id
      itemTitle: '',//商品名字
      itemCoverUrl: '',//商品图片
      startTime: '',//商品开始时间
      endTime: '',//商品结束时间
      stockNum: '',//商品限制数量
    }
  ]
}
/**
 param:Long userId,Integer itemId
 * 根据用户userid，商品id获取商品详情
 * @type {{productDetail: {id: string, name: string, imgSrc: string, startTime: string, endTime: string, limitNum: string, consumedGold: string, productDesc: {}, trialPost: {comments: [null]}}, userInfo: {applyState: string, expressInfos: string}}}
 */
const itemDetail = {

  item: {
    id: '',//商品id
    itemTitle: '',//商品名字
    itemCoverUrl: '',//商品图片
    startTime: '',//商品开始时间
    endTime: '',//商品结束时间
    stockNum: '',//商品限制数量
    deductCoin: '', //商品消耗金币数
    detailPostId: '', //商品描述,返回帖子id
    detailGroupId: '', //发验收报告圈子id
    applyNum: '',//申请人数
    detailTagId: '',//标签id用来查询试用报告id
    itemDetailUrl: ''//滚动图，逗号分隔
  },
  userApplyInfo: {
    applyStatus: '', //申请状态 状态:status=-999未申请，status=0->申请中;status=-1->申请失败;status=1->申请成功;
    applyInfo: '', //applyStatus状态的对应信息
    expressStatus: '',//0未发货，1已发货
    expressInfo: '',//expressStatus 状态对应信息
    expressName: '',//快递名称
    expressNo: '',//快递单号
    addressList: [
      {
        id: '',
        userName: '',
        address: '',
        telephone: ''
      }
    ]
  },
  errorcode: '',//-1商品id不存在
  msg: ''//结果提示信息

}
/**
 param:long userId,int status,int pageNo
 * 根据用户userid获取用户信息
 * @type {{}}
 */
const trialList = {
  trialList: [
    {
      id: '',//商品id
      itemTitle: '',//商品名字
      itemCoverUrl: '',//商品图片
      startTime: '',//商品开始时间
      endTime: '',//商品结束时间
      stockNum: '',//商品限制数量
      detailGroupId: '', //发验收报告圈子id
      userApplyInfo: {
        applyStatus: '', //申请状态 状态:status=-999未申请，status=0->申请中;status=-1->申请失败;status=1->申请成功;
        applyInfo: '', //applyStatus状态的对应信息
        expressStatus: '',//0未发货，1已发货
        expressInfo: '',//expressStatus 状态对应信息
        expressName: '',//快递名称
        expressNo: ''//快递单号

      }
    }
  ],
  totalPage: ''//总页数
}
//postId,isDetail//查询详情1，0是返回文本内容，和三图
postContent = {
  content: "",//内容isDetail==0 返回纯文本
  picUrls: []//图片，isDetail==0才有此值
}


//tagId
trialReports = {
  trialReports: []//tagId==0,返回空串
}


//userId,itemId,userName,address,telephone
summitApply = {
  errorcode: 1,//1成功
  msg: "申请成功"
}
