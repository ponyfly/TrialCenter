/*
发送ajax请求的模块
 */
import axios from 'axios'
//获取列表
const line = {
  origin: 'http://bbs.j.cn',
  tagId: 1131,
}
const test = {
  origin: 'http://114.112.164.36:64080',
  tagId: 1139,
}

export function getProducts(pageNo) {
  return axios.get(`${test.origin}/api/listItems`, {
    params: {pageNo}
  })
}
//获取我的试用
export function getMytrial(pageNo, userId, status) {
  return axios.get(`${test.origin}/api/trialList`, {
    params: {
      pageNo,
      userId,
      status
    }
  })
}
//获取商品详情
export function getDetail(itemId, userId) {
  return axios.get(`${test.origin}/api/itemDetail`,{
    params: {itemId, userId}
  })
}
//获取内容
export function getProductDesc(postId, isDetail) {
  return axios.get(`${test.origin}/api/postContent`,{
    params: {postId, isDetail}
  })
}
//获取评论
export function getProductReports(tagId, pageNo) {
  return axios.get(`${test.origin}/api/trialReports`,{
    params: {tagId, pageNo}
  })
}
//申请
export function postApplyItem(formData) {
  return axios.post(`${test.origin}/api/summitApply`, formData)
}
//获取规则列表
export function getRules() {
  return axios.get(`${test.origin}/api/getFaceBackBeans`, {
    params: {tagId: test.tagId}
  })
}