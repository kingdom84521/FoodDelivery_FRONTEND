import Vue from 'vue'
import Router from 'vue-router'
import ordermanage from "@/views/OrderManage"
import dish from "@/views/dish"
import store from "@/views/store"
import account from "@/views/account"
import main from "@/views/main"
import notify from "@/views/notify"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: "store",
      path: "/store",
      component: store,
      children: [
        {
          name: "store",
          path: "",
          component: account
        },
        {
          name: "dish",
          path: "dish",
          component: dish
        },
        {
          name: "ordermanage",
          path: "ordermanage",
          component: ordermanage
        },
        {
          name: "account",
          path: "account",
          component: account
        },
        {
          name: "main",
          path: "main",
          component: main
        },
        {
          name: "notify",
          path: "notify",
          component: notify
        }
      ]
    }
  ]
})
