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
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                         name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.productId" :item="item">
              <h3>{{ item.product.title }}</h3>
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
      delivery: 500,
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
};
</script>

<style scoped>

</style>
