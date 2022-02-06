<template>
    <li class="catalog__item">
      <router-link class="catalog__pic" :to="{name:'product',params: {id: product.id}}">
        <img :src="product.image" :alt="product.title">
      </router-link>

      <h3 class="catalog__title">
        <a href="#">
          {{ product.title }}
        </a>
      </h3>

      <span class="catalog__price">
              {{ product.price | numberFormat }} руб.
            </span>

      <ul class="colors colors--black">
        <li class="colors__item" v-for="color in product.colors" :key="color.id">
          <label class="colors__label">
            <input class="colors__radio sr-only"
                   type="radio" name="color-item" value="blue" checked="">
            <span class="colors__value" :style="{ backgroundColor: color.color.code}">
                    </span>
          </label>
        </li>
      </ul>
    </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import gotoPage from '@/helpers/gotoPage';

export default {
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
  name: 'ProductItem',
  props: ['product'],
};
</script>

<style scoped>

</style>
