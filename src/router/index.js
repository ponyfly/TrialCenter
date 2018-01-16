import Vue from 'vue'
import Router from 'vue-router'

const TrialList = () => import('../pages/TrialList.vue')
const MyTrial1 = () => import('../pages/Mytrial1.vue')
const Product = () => import('../pages/Product.vue')
const TrialRule = () => import('../pages/TrialRule.vue')
const Address = () => import('../pages/Address.vue')

Vue.use(Router)

const routes = [
  {path: '/', redirect: {name: 'TrialList'}, meta: {keepAlive: true}},
  {path: '/triallist', name: 'TrialList', component: TrialList, meta: {keepAlive: true}},
  {path: '/mytrial', name: 'MyTrial', component: MyTrial1, meta: {keepAlive: true}},
  {path: '/product', name: 'Product', component: Product, meta: {keepAlive: false}},
  {path: '/trialrule', name: 'TrialRule', component: TrialRule, meta: {keepAlive: true}},
  {path: '/address', name: 'Address', component: Address, meta: {keepAlive: false}},
]

export default new Router({
  routes
})
