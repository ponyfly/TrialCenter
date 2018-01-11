import Vue from 'vue'
import Router from 'vue-router'

const TrialList = () => import('../pages/TrialList.vue')

Vue.use(Router)

const routes = [
  {path: '/', 'redirect': '/triallist'},
  {path: '/triallist', name: 'TrialList', component: TrialList},
]

export default new Router({
  routes
})
