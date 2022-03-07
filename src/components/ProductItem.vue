<template>
    <li class="catalog__item">
      <router-link class="catalog__pic" :to="{name:'product',params: {id: product.id}}">
        <img :src="productItem.image" :alt="productItem.title">
      </router-link>

      <h3 class="catalog__title">
        <a href="#">
          {{ currentProduct.title }}
        </a>
      </h3>

      <span class="catalog__price">
              {{ currentProduct.price | numberFormat }} руб.
            </span>

      <ul class="colors colors--black" style="margin-bottom: 10px"
          v-if="productItem.mainProp.code !== 'color' ">
        <li class="colors__item" v-for="color in productItem.colors" :key="color.id">
          <label class="colors__label">
            <input class="colors__radio sr-only"
                   type="radio" name="color-item" value="blue"
                   @click="changeColor(color.color.id)">
            <span class="colors__value" :style="{ backgroundColor: color.color.code}">
                    </span>
          </label>
        </li>
      </ul>

      <fieldset class="form__block" v-if="productItem.mainProp.code !== 'color'">

        <ul class="sizes sizes--primery">
          <li class="sizes__item" v-for="item in productItem.offers" :key="item.id">
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

      <fieldset class="form__block" v-if="productItem.mainProp.code === 'color'">

        <ul class="sizes sizes--primery">
          <li class="sizes__item" v-for="item in productItem.offers" :key="item.id">
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

      <button class="button mainButton" @click="addProduct"
              type="button" :disabled="productAddSending">
        {{buttonText}}
      </button>

    </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import gotoPage from '@/helpers/gotoPage';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      productItem: this.product,
      buttonText: 'В корзину',
      productAddSending: false,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    currentColor() {
      return this.product.colors[0];
    },
    currentProduct() {
      return this.product.offers[0];
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    addProduct() {
      this.productAddSending = true;
      this.buttonText = 'Добавляем в корзину';

      this.addProductToCart({
        productId: this.currentProduct.id,
        amount: 1,
        colorId: this.currentColor.id,
      })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
          this.buttonText = 'Товар добавлен в корзину';
        });
    },
    changeProduct(item) {
      this.currentProduct.title = item.title;
      this.currentProduct.id = item.id;
      this.currentProduct.price = item.price;
    },
    changeColor(color) {
      this.currentColor.id = color;
    },
    gotoPage,
  },
  name: 'ProductItem',
  props: ['product'],
};
</script>

<style scoped>

</style>
