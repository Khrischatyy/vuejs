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

      <ul class="colors colors--black" v-if="product.mainProp.code === 'color' ">
        <li class="colors__item" v-for="color in product.colors" :key="color.id">
          <label class="colors__label">
            <input class="colors__radio sr-only"
                   type="radio" name="color-item" value="blue"
                   @click="changeColor(color.color.title)">
            <span class="colors__value" :style="{ backgroundColor: color.color.code}">
                    </span>
          </label>
        </li>
      </ul>

      <fieldset class="form__block" v-if="product.mainProp.code !== 'color'">

        <ul class="sizes sizes--primery">
          <li class="sizes__item" v-for="item in product.offers" :key="item.id">
            <label class="sizes__label" v-for="i in item.propValues" :key="i.id">
              <input class="sizes__radio sr-only" type="radio" name="sizes-item"
                     @click="changeProduct(item)">

              <span class="sizes__value">
                      {{i.value}}
                    </span>
            </label>
          </li>
        </ul>
      </fieldset>

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
    changeProduct(item) {
      this.product.title = item.title;
      this.product.price = item.price;
    },
    changeColor(color) {
      this.product.offers.forEach((o) => o.propValues.forEach((p) => {
        if (p.value === color) {
          this.product.title = o.title;
          this.product.price = o.price;
        }
      }));
    },
    gotoPage,
  },
  name: 'ProductItem',
  props: ['product'],
};
</script>

<style scoped>

</style>
