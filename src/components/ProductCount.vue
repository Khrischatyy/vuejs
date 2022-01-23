<template>
  <div class="product__counter form__counter">
    <button type="button" aria-label="Убрать один товар"
            @click.prevent="minusProduct(minusProduct)">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amount" name="count">

    <button type="button" aria-label="Добавить один товар"
            @click.prevent="plusProduct(productId)">
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
      this.$store.commit('increment', { productId: this.productId });
    },
    minusProduct() {
      this.$store.commit('decrement', { productId: this.productId });
    },
  },
};
</script>

<style scoped>

</style>
