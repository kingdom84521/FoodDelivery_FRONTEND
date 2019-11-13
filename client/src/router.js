import Vue from 'vue'
import Router from 'vue-router'
import OrderManage from "OrderManage.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: "ordermanage",
      path: "/ordermanage",
      component: OrderManage
    }
  ]
})
