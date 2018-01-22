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
  origin: 'http://bbstest.j.cn',
  tagId: 1139,
}

export function getProducts(pageNo, actType) {
  return axios.get(`${line.origin}/api/listItems`, {
    params: {
      pageNo,
      actType,
    }
  })
}
//获取我的试用
export function getMytrial(pageNo, userId, status) {
  return axios.get(`${line.origin}/api/trialList`, {
    params: {
      pageNo,
      userId,
      status
    }
  })
}
//获取商品详情
export function getDetail(itemId, userId) {
  return axios.get(`${line.origin}/api/itemDetail`,{
    params: {itemId, userId}
  })
}
//获取内容
export function getProductDesc(postId, isDetail) {
  return axios.get(`${line.origin}/api/postContent`,{
    params: {postId, isDetail}
  })
}
//获取评论
export function getProductReports(tagId, pageNo) {
  return axios.get(`${line.origin}/api/trialReports`,{
    params: {tagId, pageNo}
  })
}
//申请
export function postApplyItem(formData) {
  return axios.post(`${line.origin}/api/summitApply`, formData)
}
//获取规则列表
export function getRules() {
  return axios.get(`${line.origin}/api/getFaceBackBeans`, {
    params: {tagId: line.tagId}
  })
}