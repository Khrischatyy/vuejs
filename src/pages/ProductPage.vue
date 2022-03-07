<template>
  <main class="content container" v-if="productLoading">Загрузка товара...</main>
  <main class="content container" v-else-if="!productData">Ошибка загрузки</main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570"
               :src="product.image" :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{product.id}}</span>
        <h2 class="item__title">
          {{currentProduct.title}}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addProduct">
            <b class="item__price">
              {{currentProduct.price | numberFormat}}₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in product.colors" :key="color.id">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-item"
                           @click="changeColor(color.color.id)">
                    <span class="colors__value" :style="{ backgroundColor: color.color.code}">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block" v-if="product.mainProp.code !== 'color'">

              <legend class="form__legend">Объемб в ГБ:</legend>

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
            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click.prevent="minusProduct">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="number" v-model.number="productAmount">

                <button type="button" aria-label="Добавить один товар" @click.prevent="plusProduct">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
               {{buttonText}}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <a href="#">
            Все характеристики
          </a>
          <div v-for="item in product.specifications" :key="item.id">
            <h3>{{item.title}}</h3>
            <p>
              {{item.value}}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      buttonText: 'В корзину',
      productAddSending: false,

    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    currentProduct() {
      return this.productData.offers[0];
    },
    currentColor() {
      return this.productData.colors[0];
    },
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
  },
  methods: {
    changeProduct(item) {
      this.currentProduct.title = item.title;
      this.currentProduct.price = item.price;
      this.currentProduct.id = item.id;
    },
    changeColor(color) {
      this.currentColor.id = color;
    },
    ...mapActions(['addProductToCart']),
    gotoPage,
    addProduct() {
      this.productAddSending = true;
      this.buttonText = 'Добавляем в корзину';

      this.addProductToCart({
        productId: this.currentProduct.id,
        amount: this.productAmount,
        colorId: this.currentColor.id,
      })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
          this.buttonText = 'Товар добавлен в корзину';
        });
    },
    plusProduct() {
      this.productAmount += 1;
    },
    minusProduct() {
      if (this.productAmount > 1) {
        this.productAmount -= 1;
      }
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productData = response.data;
          this.productData.image = response.data.preview.file.url;
        })
        .catch(() => { this.productLoadingFailed = true; })
        .then(() => { this.productLoading = false; });
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>

</style>
