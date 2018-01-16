/*
发送ajax请求的模块
 */
import axios from 'axios'
//获取列表
export function getProducts(pageNo) {
  return axios.get('http://114.112.164.36:64080/api/listItems', {
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
export function getDetail(itemId, userId) {
  return axios.get('http://114.112.164.36:64080/api/itemDetail',{
    params: {itemId, userId}
  })
}
//获取内容
export function getProductDesc(postId, isDetail) {
  return axios.get('http://114.112.164.36:64080/api/postContent',{
    params: {postId, isDetail}
  })
}
//获取评论
export function getProductReports(tagId, pageNo) {
  return axios.get('http://114.112.164.36:64080/api/trialReports',{
    params: {tagId, pageNo}
  })
}
export function postApplyItem(formData) {
  return axios.post('http://114.112.164.36:64080/api/summitApply', formData)
}