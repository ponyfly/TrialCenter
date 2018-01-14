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
export function getDetail(ItemId, userId) {
  return axios.get('/api/trialCenter/itemDetail',{
    params: {ItemId, userId}
  })
}