import Vue from 'vue'
import Vuex from 'vuex'
import cart from './store/modules/cart'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  modules: {
    cart
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
