import Vue from 'vue'
import Router from 'vue-router'
import Order from '@/views/Order.vue'
import Menu from '@/views/Menu.vue'
// import Submit from '@/views/Submit.vue'

import Test from '@/components/Test.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/store/:storId',
      name: 'store',
      component: Menu
    },
    // {
    //   path: '/menu',
    //   name: 'menu',
    //   component: Menu
    // },
    // {
    //   path: '/submit',
    //   name: 'submit',
    //   component: Submit
    // },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
  ]
})
