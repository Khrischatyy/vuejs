<template>
  <component :is="currentPageComponent" :page-params="currentPageParams"/>
</template>

<script>

import ProductPage from './pages/ProductPage.vue';
import MainPage from './pages/MainPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';
import eventBus from './eventBus';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',

};

export default {
  components: {
    NotFoundPage,
    ProductPage,
    MainPage,
  },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },
  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },
  created() {
    eventBus.$on('gotoPage', (pageName, pageParams) => this.gotoPage(pageName, pageParams));
  },
};
</script>
