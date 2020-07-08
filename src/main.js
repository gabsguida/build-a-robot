import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

import pinDirective from './shared/pin-directive';
import currencyFilters from './shared/currency-filter';

Vue.config.productionTip = false;

// declaring directives globally -> Vue.directive(pinName, source)
Vue.directive('pin', pinDirective);

// declaring filters globally -> Vue.filter(filterName, source)
Vue.filter('currency', currencyFilters);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
