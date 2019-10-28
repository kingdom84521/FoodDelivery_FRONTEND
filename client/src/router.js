import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    }
  ]
})
