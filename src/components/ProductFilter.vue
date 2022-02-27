<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Колличество товаров на странице</legend>
        <label class="form__label form__label--select">
          <select @change="changeTotalCount(currentTotalCount)" class="form__select"
                  name="currentTotal" v-model.number="currentTotalCount">
            <option value="3">3 товара</option>
            <option value="9">9 товаров</option>
            <option value="18">18 товаров</option>
            <option value="27">27 товаров</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select @change="getFiltersForCategory(currentCategoryId)" class="form__select"
                  name="category" v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories"
                    :key="category.id">{{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li v-for="color in colors" :key="color.id" class="colors__item" >
            <label class="colors__label">
              <input class="colors__radio sr-only"
                     type="radio" name="color" :value="color.id" v-model="currentColor">
              <span class="colors__value"
                    :style="{'background-color': color.code}" >
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block" v-for="item in productProps" :key="item.id">
        <legend class="form__legend">{{ item.title }}</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="i in item.availableValues" :key="i.value">
            <label class="check-list__label">
              <input class="check-list__check sr-only"
                     type="checkbox" name="volume"
                     :value="i.value" v-model="propsFilterData[item.code]">
              <span class="check-list__desc">
                    {{i.value}}
                    <span>{{i.productsCount}}</span>
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button @click.prevent="reset" class="filter__reset button button--second" type="button"
              v-if="priceFrom || priceTo || categoryId || color ">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: 'ProductFilter',
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: '',
      categoriesData: null,
      colorsData: null,
      productProps: null,
      propsFilterData: [],
      currentTotalCount: 3,
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'color', 'propsData', 'productPerPage'],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData;
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    productPerPage(value) {
      this.currentTotalCount = value;
    },
  },
  methods: {
    getFiltersForCategory(id) {
      axios.get(`${API_BASE_URL}/api/productCategories/${id}`)
        .then((response) => { this.productProps = response.data.productProps; })
        .then(() => {
          this.propsFilterData = {};
          /* eslint-disable-next-line */
          for (const prop of this.productProps) {
            this.propsFilterData[prop.code] = [];
          }
        });
    },
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:color', this.currentColor);
      this.$emit('update:propsData', this.propsFilterData);
      this.$emit('update:productPerPage', this.currentTotalCount);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:color', '');
      this.$emit('update:productPerPage', 3);
    },
    loadCategories() {
      axios.get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => { this.categoriesData = response.data; });
    },
    loadColors() {
      axios.get(`${API_BASE_URL}/api/colors`)
        .then((response) => { this.colorsData = response.data.items; });
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>

<style scoped>

</style>
