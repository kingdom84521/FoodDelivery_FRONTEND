import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/dashboard'
import Account from '@/components/dashboard/account/main'
import Purchase from '@/components/dashboard/purchase/main'
import PurchasePage from '@/components/dashboard/purchase/purchasePage/main'
import Notification from '@/components/dashboard/notification/main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
              name: "profile"
            },
            {
              path: "relatives",
              name: "relatives"
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
    }
  ]
})
