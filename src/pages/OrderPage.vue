<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
          <base-form-text v-model="formData.name" placeholder="Введите ваше полное имя"
                          title="ФИО" :error="formError.name"></base-form-text>

            <base-form-text v-model="formData.address" placeholder="Введите ваш адрес"
                            title="Адрес доставки" :error="formError.address"></base-form-text>

            <base-form-text v-model="formData.phone" placeholder="Введите ваш телефон"
                            title="Телефон" :error="formError.phone"></base-form-text>

            <base-form-text v-model="formData.email" placeholder="Введите ваш email"
                            title="Email" :error="formError.email"></base-form-text>

            <base-form-textarea v-model="formData.comment" placeholder="Ваши пожелания"
                                title="Комментарий к заказу"
                                :error="formError.comment"></base-form-textarea>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="delivery in deliveryData" :key="delivery.id"
                  @click="getPayments(delivery.id)">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                         name="delivery" :value="delivery.id"
                          v-model="formData.paymentTypeId">
                  <span class="options__value">
                    {{delivery.title}}
                    <b>{{delivery.price == 0 ? 'Бесплатно' : delivery.price + 'руб.'}}</b>
                  </span>
                </label>
              </li>
            </ul>
            <div v-if="paymentsData.length > 0">
            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="payment in paymentsData" :key="payment.id">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay"
                         :value="payment.id" v-model="formData.deliveryTypeId">
                  <span class="options__value">
                    {{payment.title}}
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        </div>
        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.productId" :item="item">
              <h3>{{ item.product.productOffer.title }}</h3>
              <b>{{item.product.price}} ₽ x {{item.amount}}</b>
              <span>Артикул: {{item.product.id}}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ totalCount }}</b>
              товара на сумму <b>{{ priceWithDelivery}} ₽</b></p>
          </div>

          <button v-if="totalCount > 0" class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>

import axios from 'axios';
import { mapGetters } from 'vuex';
import BaseFormText from '../components/BaseFormText.vue';
import BaseFormTextarea from '../components/BaseFormTextarea.vue';
import { API_BASE_URL } from '../config';

export default {
  name: 'OrderPage',
  components: { BaseFormTextarea, BaseFormText },
  data() {
    return {
      deliveryData: {},
      paymentsData: {},
      formData: {

      },
      formError: {

      },
      formErrorMessage: '',
    };
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', totalCount: 'cartTotalCount' }),
    priceWithDelivery() {
      if (this.totalPrice) {
        return this.totalPrice + this.delivery;
      }
      return 0;
    },
  },
  methods: {
    getPayments(deliveryTypeId) {
      axios.get(`${API_BASE_URL}/api/payments`, {
        params: {
          deliveryTypeId,
        },
      })
        .then((response) => {
          this.paymentsData = response.data;
        });
    },
    order() {
      this.formError = {};
      this.formErrorMessage = '';

      axios.post(`${API_BASE_URL}/api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      }).then((response) => {
        this.$store.commit('resetCart');
        this.$store.commit('updateOrderInfo', response.data);
        this.$router.push({
          name: 'orderInfo',
          params: {
            id: response.data.id,
          },
        });
      })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
  created() {
    axios.get(`${API_BASE_URL}/api/deliveries`)
      .then((response) => { this.deliveryData = response.data; });
  },
};
</script>

<style scoped>

</style>
