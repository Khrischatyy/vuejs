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
                      :category-id.sync="filterCategoryId"></product-filter>
      <section class="catalog">
        <product-list :products="products"></product-list>

        <base-pagination v-model="page" :per-page="productPerPage"
                         :count="countProducts"></base-pagination>
      </section>
    </div>
  </main>

</template>

<script>
import products from './data/data';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
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
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price < this.filterPriceTo);
      }
      if (this.filterCategoryId) {
        filteredProducts = filteredProducts
          .filter((product) => product.categoryID === this.filterCategoryId);
      }
      if (this.color !== '') {
        filteredProducts = filteredProducts
          .filter((product) => product.color === this.color);
      }
      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productPerPage;
      return this.filteredProducts.slice(offset, offset + this.productPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>
