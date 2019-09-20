import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Menu from '@/views/Menu.vue'
import Order from '@/views/Order.vue'
import Submit from '@/views/Submit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/submit',
      name: 'submit',
      component: Submit
    }
  ]
})
