/*
发送ajax请求的模块
 */
import axios from 'axios'
export function getProducts(pageNo) {
  return axios.get('/api/trialCenter/listItems', {
    params: {pageNo}
  })
}
export function getMytrial() {
  return axios.get('/api/getmytrial')
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