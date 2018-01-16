import Mock from 'mockjs'

const data1 = {
  totalPage: '3',
  items: [
    {"id": 11,"itemTitle": "【免费试用】网易严选，每日坚果", "itemCoverUrl":"http://cangdu.org:8001/img/1603437fa49285.jpg", "stockNum": 60, "endTime": "2018-01-16 00:00:00", "startTime": '2018-01-01 16:25:36'},
    {"id": 12,"itemTitle": "【免费试用】网易严选，每日坚果1", "itemCoverUrl":"http://cangdu.org:8001/img/1603437fa49285.jpg", "stockNum": 50, "endTime": "2018-01-11 06:00:03", "startTime": '2018-01-01 16:25:36'},
    {"id": 13,"itemTitle": "【免费试用】网易严选，每日坚果2", "itemCoverUrl":"http://cangdu.org:8001/img/1603437fa49285.jpg", "stockNum": 10, "endTime": "2018-01-12 24:16:36", "startTime": '2018-01-01 16:25:36'},
    {"id": 14,"itemTitle": "【免费试用】网易严选，每日坚果3", "itemCoverUrl":"http://cangdu.org:8001/img/1603437fa49285.jpg", "stockNum": 90, "endTime": "2018-01-15 09:01:00", "startTime": '2018-01-01 16:25:36'},
    {"id": 15,"itemTitle": "【免费试用】网易严选，每日坚果4", "itemCoverUrl":"http://cangdu.org:8001/img/1603437fa49285.jpg", "stockNum": 20, "endTime": "2018-01-12 02:26:59", "startTime": '2018-01-01 16:25:36'},
    {"id": 16,"itemTitle": "【免费试用】网易严选，每日坚果5", "itemCoverUrl":"http://cangdu.org:8001/img/1603437fa49285.jpg", "stockNum": 60, "endTime": "2018-01-16 18:26:36", "startTime": '2018-01-01 16:25:36'},
    {"id": 17,"itemTitle": "【免费试用】网易严选，每日坚果6", "itemCoverUrl":"http://cangdu.org:8001/img/1603437fa49285.jpg", "stockNum": 10, "endTime": "2018-01-16 18:26:36", "startTime": '2018-01-01 16:25:36'},
    {"id": 18,"itemTitle": "【免费试用】网易严选，每日坚果7", "itemCoverUrl":"http://cangdu.org:8001/img/1603437fa49285.jpg", "stockNum": 30, "endTime": "2018-01-16 18:26:36", "startTime": '2018-01-01 16:25:36'},
    {"id": 19,"itemTitle": "【免费试用】网易严选，每日坚果8", "itemCoverUrl":"http://cangdu.org:8001/img/1603437fa49285.jpg", "stockNum": 20, "endTime": "2018-01-06 18:26:36", "startTime": '2018-01-01 16:25:36'},
    {"id": 20,"itemTitle": "【免费试用】网易严选，每日坚果9", "itemCoverUrl":"http://cangdu.org:8001/img/1603437fa49285.jpg", "stockNum": 10, "endTime": "2018-01-16 18:26:36", "startTime": '2018-01-01 16:25:36'},
  ],
}
const data2 = {
  totalPage: '3',
  items: [
    {"id": 21,"itemTitle": "【免费试用】网易严选，每日坚果", "itemCoverUrl":"http://cangdu.org:8001/img/1607c3f4794988.jpg", "stockNum": 60, "endTime": "2018-01-16 00:00:00", "startTime": '2018-01-01 16:25:36'},
    {"id": 22,"itemTitle": "【免费试用】网易严选，每日坚果1", "itemCoverUrl":"http://cangdu.org:8001/img/1607c3f4794988.jpg", "stockNum": 50, "endTime": "2018-01-11 06:00:03", "startTime": '2018-01-01 16:25:36'},
    {"id": 23,"itemTitle": "【免费试用】网易严选，每日坚果2", "itemCoverUrl":"http://cangdu.org:8001/img/1607c3f4794988.jpg", "stockNum": 10, "endTime": "2018-01-12 24:16:36", "startTime": '2018-01-01 16:25:36'},
    {"id": 24,"itemTitle": "【免费试用】网易严选，每日坚果3", "itemCoverUrl":"http://cangdu.org:8001/img/1607c3f4794988.jpg", "stockNum": 90, "endTime": "2018-01-15 09:01:00", "startTime": '2018-01-01 16:25:36'},
    {"id": 25,"itemTitle": "【免费试用】网易严选，每日坚果4", "itemCoverUrl":"http://cangdu.org:8001/img/1607c3f4794988.jpg", "stockNum": 20, "endTime": "2018-01-12 02:26:59", "startTime": '2018-01-01 16:25:36'},
    {"id": 26,"itemTitle": "【免费试用】网易严选，每日坚果5", "itemCoverUrl":"http://cangdu.org:8001/img/1607c3f4794988.jpg", "stockNum": 60, "endTime": "2018-01-16 18:26:36", "startTime": '2018-01-01 16:25:36'},
    {"id": 27,"itemTitle": "【免费试用】网易严选，每日坚果6", "itemCoverUrl":"http://cangdu.org:8001/img/1607c3f4794988.jpg", "stockNum": 10, "endTime": "2018-01-16 18:26:36", "startTime": '2018-01-01 16:25:36'},
    {"id": 28,"itemTitle": "【免费试用】网易严选，每日坚果7", "itemCoverUrl":"http://cangdu.org:8001/img/1607c3f4794988.jpg", "stockNum": 30, "endTime": "2018-01-16 18:26:36", "startTime": '2018-01-01 16:25:36'},
    {"id": 29,"itemTitle": "【免费试用】网易严选，每日坚果8", "itemCoverUrl":"http://cangdu.org:8001/img/1607c3f4794988.jpg", "stockNum": 20, "endTime": "2018-01-06 18:26:36", "startTime": '2018-01-01 16:25:36'},
    {"id": 30,"itemTitle": "【免费试用】网易严选，每日坚果9", "itemCoverUrl":"http://cangdu.org:8001/img/1607c3f4794988.jpg", "stockNum": 10, "endTime": "2018-01-16 18:26:36", "startTime": '2018-01-01 16:25:36'},
  ],
}
const data3 = {
  totalPage: '3',
  items: [
    {"id": 31,"itemTitle": "【免费试用】网易严选，每日坚果", "itemCoverUrl":"http://cangdu.org:8001/img/16018a6492334.jpeg", "stockNum": 60, "endTime": "2018-01-16 00:00:00", "startTime": '2018-01-01 16:25:36'},
    {"id": 32,"itemTitle": "【免费试用】网易严选，每日坚果1", "itemCoverUrl":"http://cangdu.org:8001/img/16018a6492334.jpeg", "stockNum": 50, "endTime": "2018-01-11 06:00:03", "startTime": '2018-01-01 16:25:36'},
    {"id": 33,"itemTitle": "【免费试用】网易严选，每日坚果2", "itemCoverUrl":"http://cangdu.org:8001/img/16018a6492334.jpeg", "stockNum": 10, "endTime": "2018-01-12 24:16:36", "startTime": '2018-01-01 16:25:36'},
    {"id": 34,"itemTitle": "【免费试用】网易严选，每日坚果3", "itemCoverUrl":"http://cangdu.org:8001/img/16018a6492334.jpeg", "stockNum": 90, "endTime": "2018-01-15 09:01:00", "startTime": '2018-01-01 16:25:36'},
    {"id": 35,"itemTitle": "【免费试用】网易严选，每日坚果4", "itemCoverUrl":"http://cangdu.org:8001/img/16018a6492334.jpeg", "stockNum": 20, "endTime": "2018-01-12 02:26:59", "startTime": '2018-01-01 16:25:36'},
    {"id": 36,"itemTitle": "【免费试用】网易严选，每日坚果5", "itemCoverUrl":"http://cangdu.org:8001/img/16018a6492334.jpeg", "stockNum": 60, "endTime": "2018-01-16 18:26:36", "startTime": '2018-01-01 16:25:36'},
  ],
}
const itemDetail = {
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
    applyNum:'169'//申请人数
  },
  userApplyInfo: {
    applyStatus: '', //申请状态 状态:status=-999未申请，status=0->申请中;status=-1->申请失败;status=1->申请成功;
    applyInfo: '', //applyStatus状态的对应信息
    expressStatus:'',//0未发货，1已发货
    expressInfo:'',//expressStatus 状态对应信息
    expressName:'',//快递名称
    expressNo:''//快递单号
  },
  errorcode:'',//-1商品id不存在
  msg:''//结果提示信息
}
/*const allTrial = [
  {id: 12, name: '【免费试用】网易严选，每日坚果', src: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
    applyTime: '2018年01月10日21时', applyState: 0},
  {id: 13, name: '【免费试用】网易严选，每日坚果', src: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
    applyTime: '2018年01月12日16时', applyState: 1},
  {id: 14, name: '【免费试用】网易严选，每日坚果', src: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
    applyTime: '2018年01月05日01时', applyState: 2},
  {id: 15, name: '【免费试用】网易严选，每日坚果', src: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
    applyTime: '2018年01月01日15时', applyState: 1},
]*/
const trialList = {
  "totalPage": 3,
  "trialList": [
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://static4.j.cn/png/arcamera/180115/1701/5449a7cb252e4d10.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 0,
        "applyInfo": "申请中"
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://static4.j.cn/png/arcamera/180115/1701/5449a7cb252e4d10.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 1,
        "applyInfo": "申请成功",
        expressStatus: '0',//0未发货，1已发货
        expressInfo: '未发货',//expressStatus 状态对应信息
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://static4.j.cn/png/arcamera/180115/1701/5449a7cb252e4d10.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 1,
        "applyInfo": "申请成功",
        expressStatus: '1',//0未发货，1已发货
        expressInfo: '已发货',//expressStatus 状态对应信息
        expressName: '三通',//快递名称
        expressNo: '666'//快递单号
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://static4.j.cn/png/arcamera/180115/1701/5449a7cb252e4d10.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": -1,
        "applyInfo": "申请失败",
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://static4.j.cn/png/arcamera/180115/1701/5449a7cb252e4d10.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 0,
        "applyInfo": "申请中"
      }
    },
  ]
}
const trialList1 = {
  "totalPage": 3,
  "trialList": [
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/1603437fa49285.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 0,
        "applyInfo": "申请中"
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/1603437fa49285.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 1,
        "applyInfo": "申请成功",
        expressStatus: '0',//0未发货，1已发货
        expressInfo: '未发货',//expressStatus 状态对应信息
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/1603437fa49285.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 1,
        "applyInfo": "申请成功",
        expressStatus: '1',//0未发货，1已发货
        expressInfo: '已发货',//expressStatus 状态对应信息
        expressName: '三通',//快递名称
        expressNo: '666'//快递单号
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/1603437fa49285.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": -1,
        "applyInfo": "申请失败",
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/1603437fa49285.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 0,
        "applyInfo": "申请中"
      }
    },
  ]
}
const trialList2 = {
  "totalPage": 3,
  "trialList": [
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/1607c3f4794988.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 0,
        "applyInfo": "申请中"
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/1607c3f4794988.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 1,
        "applyInfo": "申请成功",
        expressStatus: '0',//0未发货，1已发货
        expressInfo: '未发货',//expressStatus 状态对应信息
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/1607c3f4794988.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 1,
        "applyInfo": "申请成功",
        expressStatus: '1',//0未发货，1已发货
        expressInfo: '已发货',//expressStatus 状态对应信息
        expressName: '三通',//快递名称
        expressNo: '666'//快递单号
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/1607c3f4794988.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": -1,
        "applyInfo": "申请失败",
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/1607c3f4794988.jpg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 0,
        "applyInfo": "申请中"
      }
    },
  ]
}
const trialList3 = {
  "totalPage": 3,
  "trialList": [
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/16018a6492334.jpeg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 0,
        "applyInfo": "申请中"
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/16018a6492334.jpeg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 1,
        "applyInfo": "申请成功",
        expressStatus: '0',//0未发货，1已发货
        expressInfo: '未发货',//expressStatus 状态对应信息
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/16018a6492334.jpeg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 1,
        "applyInfo": "申请成功",
        expressStatus: '1',//0未发货，1已发货
        expressInfo: '已发货',//expressStatus 状态对应信息
        expressName: '三通',//快递名称
        expressNo: '666'//快递单号
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/16018a6492334.jpeg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": -1,
        "applyInfo": "申请失败",
      }
    },
    {
      "id": 7,
      "title": "雀巢咖啡0115",
      "itemTitle": "【免费试吃】雀巢：意犹未尽滴滴香浓",
      "itemCoverUrl": "http://cangdu.org:8001/img/16018a6492334.jpeg",
      "startTime": 1516010400000,
      "endTime": 1516370400000,
      "applyTime": 1516083936000,
      "stockNum": 10,
      "detailGroupId": 50154,
      "detailTagId": 1132,
      "applyStatus": 0,
      "shipping_id": 87,
      "userApplyInfo": {
        "applyStatus": 0,
        "applyInfo": "申请中"
      }
    },
  ]
}
// 通过mockjs向外暴露1个接口
Mock.mock('/api/trialCenter/listItems?pageNo=1', {code: 0, data:data1})
Mock.mock('/api/trialCenter/listItems?pageNo=2', {code: 0, data:data2})
Mock.mock('/api/trialCenter/listItems?pageNo=3', {code: 0, data:data3})
Mock.mock('/api/trialCenter/itemDetail?ItemId=11&userId=123456789', {code: 0, data:data3})
Mock.mock(/\/api\/trialCenter\/getMyTrial\?pageNo=[0-9]&userId=17192&status=999/, {code: 0, data:trialList})
Mock.mock(/\/api\/trialCenter\/getMyTrial\?pageNo=[0-9]&userId=17192&status=0/, {code: 0, data:trialList1})
Mock.mock(/\/api\/trialCenter\/getMyTrial\?pageNo=[0-9]&userId=17192&status=1/, {code: 0, data:trialList2})
Mock.mock(/\/api\/trialCenter\/getMyTrial\?pageNo=[0-9]&userId=17192&status=-1/, {code: 0, data:trialList3})
Mock.mock(/\/api\/trialCenter\/applyItem/, {status: 1})
// Mock.mock(/\/api\/trialCenter\/getMyTrial/, {status: 1, data: trialList})

// export default ???  不用向外暴露什么

console.log('执行mockServer...')