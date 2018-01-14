import Vue from 'vue'
import Router from 'vue-router'

const TrialList = () => import('../pages/TrialList.vue')
const MyTrial = () => import('../pages/Mytrial.vue')
const Product = () => import('../pages/Product.vue')
const TrialRule = () => import('../pages/TrialRule.vue')
const Address = () => import('../pages/Address.vue')

Vue.use(Router)

const routes = [
  {path: '/', redirect: {name: 'TrialList'}},
  {path: '/triallist', name: 'TrialList', component: TrialList},
  {path: '/mytrial', name: 'MyTrial', component: MyTrial},
  {path: '/product', name: 'Product', component: Product},
  {path: '/trialrule', name: 'TrialRule', component: TrialRule},
]

export default new Router({
  routes
})
