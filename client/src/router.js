import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
=======
import SignUp from "@/views/SignUp"

// import SignUp from 
>>>>>>> feature@frontside-signup

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
<<<<<<< HEAD
=======
    {
      path: '/',
      name: 'home',
      
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
>>>>>>> feature@frontside-signup
  ]
})
