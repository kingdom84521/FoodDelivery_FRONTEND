import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
import SignUp from "@/views/SignUp"

// import SignUp from 
=======
import Home from '@/views/Home'
import SignIn from '@/views/SignIn'
>>>>>>> feature@home

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      
    },
    {
<<<<<<< HEAD
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
=======
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '*',
      redirect: { name: 'home' }
    },
>>>>>>> feature@home
  ]
})
