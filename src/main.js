import Vue from 'vue';
import App from './App.vue';

import { message, data } from './first';
import sayWord from './second';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

alert(message);
alert(data.message);
sayWord('Hello');
