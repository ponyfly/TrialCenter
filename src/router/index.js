import Vue from 'vue'
import Router from 'vue-router'

const TrialList = () => import('../pages/TrialList.vue')
const MyTrial = () => import('../pages/Mytrial.vue')

Vue.use(Router)

const routes = [
  {path: '/', redirect: {name: 'TrialList'}},
  {path: '/triallist', name: 'TrialList', component: TrialList},
  {path: '/mytrial', name: 'MyTrial', component: MyTrial},
]

export default new Router({
  routes
})
