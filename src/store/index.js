import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/data';

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
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((i) => i.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((i) => i.productId !== productId);
    },
    increment(state, { productId }) {
      const productInCart = state.cartProducts.find((item) => item.productId === productId);
      if (productInCart) {
        productInCart.amount += 1;
      }
    },
    decrement(state, { productId }) {
      const productInCart = state.cartProducts.find((item) => item.productId === productId);
      if (productInCart) {
        productInCart.amount -= 1;
        if (productInCart.amount === 0) {
          state.cartProducts = state.cartProducts.filter((i) => i.productId !== productId);
        }
      }
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
});
