import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import SignUp from '@/views/SignUp'
import Dashboard from '@/views/Dashboard'
import Account from '@/components/Dashboard/account/main'
import Profile from '@/components/Dashboard/account/profile'
import Relatives from '@/components/Dashboard/account/relatives/main'
import Purchase from '@/components/Dashboard/purchase/main'
import PurchasePage from '@/components/Dashboard/purchase/purchasePage/main'
import Notification from '@/components/Dashboard/notification/main'
import Search from '@/views/Search.vue'
import Menu from '@/views/Menu.vue'
// import Submit from '@/views/Submit.vue'

// import Test from '@/components/Test.vue'

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
      path: '*',
      redirect: { name: 'home' }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      redirect: "/dashboard/account",
      component: Dashboard,
      children: [
        {
          path: "account",
          name: "account",
          redirect: "account/profile",
          component: Account,
          children: [
            {
              path: "profile",
              name: "profile",
              component: Profile
            },
            {
              path: "relatives",
              name: "relatives",
              component: Relatives
            }
          ]
        },
        {
          path: "purchase",
          name: "purchase",
          redirect: "purchase/all",
          component: Purchase,
          children: [
            {
              path: ":type",
              component: PurchasePage,
              props: true
            }
          ]
        },
        {
          path: "notification",
          name: "notification",
          component: Notification
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/restaurant/:restaurantId',
      name: 'restaurant',
      component: Menu
    }
  ]
})
