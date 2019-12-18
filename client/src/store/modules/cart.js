import _ from 'lodash'

// initial state
const state = {
  restaurant: null,
  menu: null,
  list: [],
  total: 0
}

// getters
const getters = {
  getSameItemIndex: state => item => {
      if ( state.list.length === 0 ) {
        return -1;
      }

      return _.findIndex(state.list, list_item => {
        return item.checker === list_item.checker;
      });
  },
  getIndexItem: state => index => {
      return state.list[ index ];
  }
}

// actions
const actions = {
  changeQuantity({ commit }, payload) {
    commit('changeQuantity', payload);
    commit('updateShoppingCart');
  },
  addProductToCart({getters, commit}, product) {
    let same_item_index = getters.getSameItemIndex( product );
    if ( same_item_index === -1 ) {
      commit('pushBack', product);
      commit('updateShoppingCart');
    } else {
      commit('changeQuantity', product.quantity);
    }
  },
}

// mutations
const mutations = {
  clearShoppingCart( state ) {
    state.restaurant = null;
    state.menu = null;
    state.list = [];
    state.total = 0;
  },
  updateShoppingCart( state ) {
    let price_total = 0;

    _.remove(state.list, {'quantity': 0});

    _.forEach(state.list, (item, index) => {
      let price_subtotal = item.price * item.quantity;
      if ( item.subtotal !== price_subtotal ) {
        state.list[index].subtotal = price_subtotal;
      }
      price_total += price_subtotal;
    });

    state.total = price_total;
  },
  setCartInit( state , payload ) {
    state.restaurant = payload.restaurant;
    state.menu = payload.menu;
  },
  changeQuantity(state, payload) {
    state.list[ payload.index ].quantity += payload.amount;
  },
  pushBack(state, product) {
    state.list.push( product );
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}