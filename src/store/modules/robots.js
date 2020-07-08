import axios from 'axios';

export default {
  /* setting namespaced to true so Vue will know everythig related to robots
  module such as mutations and getters. But, Vue already recognize the state without
  setting namespaced to true */
  namespaced: true,
  state: {
    // declaring the initial state
    cart: [],
    parts: null,
  },
  // passing all changes trought mutations
  mutations: {
    // creating a method that will push all robots prices to the array
    // you need to pass state and data (that will be passed to state) as parameters
    addRobotToCart(state, robot) {
      state.cart.push(robot);
    },
    updateParts(state, parts) {
      state.parts = parts;
    },
  },
  actions: {
    // passing data from api call to updateParts
    getParts({ commit }) {
      axios.get('/api/parts')
        .then((result) => commit('updateParts', result.data))
        .catch(console.error);
    },
    // creating a cart and saving it at addRobotToCart mutation
    addRobotToCart({ commit, state }, robot) {
      const cart = [...state.cart, robot];
      // posting the results of cart in api cart then saving it at state
      return axios.post('/api/cart', cart)
        .then(() => commit('addRobotToCart', robot));
    },
  },
  // adding filters through getters
  getters: {
    cartSaleItems(state) {
      return state.cart.filter((item) => item.head.onSale);
    },
  },
};
