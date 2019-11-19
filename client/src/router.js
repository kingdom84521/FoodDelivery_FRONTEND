import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/dashboard'
import Purchase from '@/components/dashboard/featureView/purchase/main'
import Page from '@/components/dashboard/featureView/purchase/page'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "purchase",
          name: "purchase",
          redirect: "purchase/all",
          component: Purchase,
          children: [
            {
              path: ":type",
              component: Page,
              props: true
            }
          ]
        },
      ]
    }
  ]
})
