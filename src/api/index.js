/*
发送ajax请求的模块
 */
import axios from 'axios'
//获取列表
export function getProducts(pageNo) {
  return axios.get('/api/trialCenter/listItems', {
    params: {pageNo}
  })
}
//获取我的试用
export function getMytrial(pageNo, userId, status) {
  return axios.get('/api/trialCenter/getMyTrial', {
    params: {
      pageNo,
      userId,
      status
    }
  })
}
//获取商品详情
export function getDetail(ItemId, userId) {
  return axios.get('/api/trialCenter/itemDetail',{
    params: {ItemId, userId}
  })
}
//发送申请试用的请求
export function postApplyItem(form) {
  return axios.post('/api/trialCenter/applyItem', form)
}