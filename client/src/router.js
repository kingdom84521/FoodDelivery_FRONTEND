import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import SignIn from '@/views/SignIn'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '*',
      redirect: { name: 'home' }
    },
  ]
})
