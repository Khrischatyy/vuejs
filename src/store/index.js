import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      {
        productId: 1, amount: 2,
      },
    ],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const productInCart = state.cartProducts.find((item) => item.productId === productId);

      if (productInCart) {
        productInCart.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
  },
});
