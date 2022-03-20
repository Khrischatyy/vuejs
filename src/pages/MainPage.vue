<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>
    <div class="content__catalog">
      <product-filter :color.sync="color"
                      :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
                      :category-id.sync="filterCategoryId"
                      :props-data.sync="propsData"
                      :product-per-page.sync="productPerPage"></product-filter>
      <section class="catalog">
        <div v-if="productLoading">Загрузка товара...</div>
        <div v-if="productLoadingFailed">Ошибка загрузки
          <button @click.prevent="loadProducts">Еще раз</button>
        </div>
        <product-list :products="products"></product-list>

        <base-pagination v-model="page" :per-page="productPerPage"
                         :count="countProducts"></base-pagination>
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import qs from 'qs';
import { API_BASE_URL } from '../config';

export default {
  components: {
    ProductFilter,
    BasePagination,
    ProductList,
  },
  data() {
    return {
      color: '',
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      page: 1,
      productPerPage: 3,
      productsData: null,
      productLoading: false,
      productLoadingFailed: false,
      propsData: {},
    };
  },
  computed: {
    products() {
      if (!this.color) {
        return this.productsData
          ? this.productsData.items.map((product) => ({
            ...product,
            image: product.preview.file.url,
          }))
          : [];
      }
      return this.productsData
        ? this.productsData.items
          .filter((p) => p.colors.some((c) => c.color.id === this.color)).map((product) => ({
            ...product,
            image: product.preview.file.url,
          }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productLoading = true;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom ? this.filterPriceFrom : {},
            maxPrice: this.filterPriceTo ? this.filterPriceTo : {},
            colorId: this.color,
            props: this.propsData,
          },
          paramsSerializer: (props) => qs.stringify(props, { arrayFormat: 'brackets' }),
        })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productLoadingFailed = true; })
          .then(() => { this.productLoading = false; });
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    color() {
      this.loadProducts();
    },
    productPerPage() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style scoped>

</style>
