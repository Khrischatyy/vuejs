<template>
  <div class="product__counter form__counter">
    <button type="button" aria-label="Убрать один товар"
            @click.prevent="minusProduct()">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="number" v-model.number="amount" name="count">

    <button type="button" aria-label="Добавить один товар"
            @click.prevent="plusProduct()">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  name: 'ProductCount',
  props: ['amount', 'productId'],
  methods: {
    plusProduct() {
      this.$store.dispatch('updateCartProductAmount', { productId: this.productId, amount: this.amount + 1 });
    },
    minusProduct() {
      if (this.amount === 1) {
        this.$store.dispatch('deleteCartProduct', { productId: this.productId });
      } else {
        this.$store.dispatch('updateCartProductAmount', { productId: this.productId, amount: this.amount - 1 });
      }
    },
  },
};
</script>

<style scoped>

</style>
