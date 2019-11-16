import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import SignIn from '@/views/SignIn'
import SignUp from '@/views/SignUp'

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
      path: '/signup',
      name: 'signup',
      component: SignUp
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
