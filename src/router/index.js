import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import Cart from '@/pages/Cart.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';
import OrderPage from '../pages/OrderPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    component: MainPage,
    path: '/',
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/product/:id',
  },
  {
    name: 'cart',
    component: Cart,
    path: '/cart',
  },
  {
    name: 'order',
    component: OrderPage,
    path: '/order',
  },
  {
    name: 'orderInfo',
    component: OrderInfoPage,
    path: '/order/:id',
  },
  {
    name: 'NotFound',
    component: NotFoundPage,
    path: '*',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
