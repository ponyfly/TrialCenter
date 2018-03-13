/*
发送ajax请求的模块
 */
import axios from 'axios'
//获取列表
const isLocal = /(192\.168|127\.0\.0\.1|localhost)/.test(location.href)
const API_origin = isLocal ? 'http://bbs.j.cn' : ''
const API_origin_lunbo = isLocal ? 'http://opentest.j.cn' : 'http://open.j.cn'
const API = {
  listItems: `${API_origin}/api/listItems`,
  trialList: `${API_origin}/api/trialList`,
  itemDetail: `${API_origin}/api/itemDetail`,
  postContent: `${API_origin}/api/postContent`,
  trialReports: `${API_origin}/api/trialReports`,
  summitApply: `${API_origin}/api/summitApply`,
  getFaceBackBeans: `${API_origin}/api/getFaceBackBeans`,
  getPics: `${API_origin_lunbo}/carousel/getPics`
}

let tagId = ''
if (location.origin.indexOf('bbs.j.cn')) {
  tagId = 1131
} else {
  tagId = 1139
}

export function getProducts(pageNo, actType) {
  return axios.get(API.listItems, {
    params: {
      pageNo,
      actType,
    }
  })
}
//获取我的试用
export function getMytrial(pageNo, userId, status) {
  return axios.get(API.trialList, {
    params: {
      pageNo,
      userId,
      status
    }
  })
}
//获取商品详情
export function getDetail(itemId, userId) {
  return axios.get(API.itemDetail,{
    params: {itemId, userId}
  })
}
//获取内容
export function getProductDesc(postId, isDetail) {
  return axios.get(API.postContent,{
    params: {postId, isDetail}
  })
}
//获取评论
export function getProductReports(tagId, pageNo) {
  return axios.get(API.trialReports,{
    params: {tagId, pageNo}
  })
}
//申请
export function postApplyItem(formData) {
  return axios.post(API.summitApply, formData)
}
//获取规则列表
export function getRules() {
  return axios.get(API.getFaceBackBeans, {
    params: {tagId}
  })
}
//获取首页轮播图
export function getPics() {
  return axios.get(API.getPics, {
    params: {type: 3}
  })
}