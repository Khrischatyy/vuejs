<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image"
           width="120" height="120"
           alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.productOffer.title }}
    </h3>

    <span class="product__code">
                Артикул:  {{ item.product.id }}
              </span>
    <product-count :amount="amount" :productId="item.productId"/>

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>
    <div>{{item.product.productOffer.product.mainProp.title}} :
      {{item.product.productOffer.propValues[0].value}}</div>
    <button class="product__del button-del" type="button"
            aria-label="Удалить товар из корзины"
            @click.prevent="deleteProduct({ productId: item.productId })">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import ProductCount from '@/components/ProductCount.vue';

export default {
  name: 'CartItem',
  components: { ProductCount },
  props: ['item'],
  filters: { numberFormat },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapActions({ deleteProduct: 'deleteCartProduct' }),
  },
};
</script>

<style scoped>

</style>
