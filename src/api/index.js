/*
发送ajax请求的模块
 */
import axios from 'axios'
export function getProducts() {
  return axios.get('/api/getproducts')
}