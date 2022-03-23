<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title" v-if="orderInfo">
        Заказ оформлен <span>№ {{ orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart" v-if="orderInfo">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу
            почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение
            часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
               {{orderInfo.paymentType}}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in orderInfo.basket.items" :key="item.id">
              <h3>{{ item.productOffer.title}}</h3>
              <b>{{item.productOffer.price}} ₽ x {{item.quantity}}</b>
              <span>Артикул: {{item.productOffer.id}}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{orderInfo.deliveryType.price}} ₽</b></p>
            <p>Итого:
                <b>{{cartTotalCount}}</b> товара на сумму <b>{{priceWithDelivery}} ₽</b>
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>

export default {
  name: 'OrderInfoPage',
  data() {
    return {
      orderInfo: null,
    };
  },
  computed: {
    priceWithDelivery() {
      return +this.orderInfo.deliveryType.price + +this.orderInfo.totalPrice;
    },
    cartTotalCount() {
      return this.orderInfo.basket.items
        .reduce((acc, item) => (item.quantity) + acc, 0);
    },
  },
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      this.orderInfo = this.$store.state.orderInfo;
      return;
    }
    this.$store.dispatch('loadOrderInfo',
      this.$route.params.id).then(() => { this.orderInfo = this.$store.state.orderInfo; });
  },
};
</script>

<style scoped>

</style>
