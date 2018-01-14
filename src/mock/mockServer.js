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
// 通过mockjs向外暴露1个接口
Mock.mock('/api/trialCenter/listItems?pageNo=1', {code: 0, data:data1})
Mock.mock('/api/trialCenter/listItems?pageNo=2', {code: 0, data:data2})
Mock.mock('/api/trialCenter/listItems?pageNo=3', {code: 0, data:data3})

// export default ???  不用向外暴露什么

console.log('执行mockServer...')