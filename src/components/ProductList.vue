<template>
    <product-item :products="products"></product-item>
</template>

<script>
import ProductItem from './ProductItem';
export default {
  name: 'ProductList',
  components: { ProductItem },
  props:['products'],
};
</script>

<style scoped>

</style>
