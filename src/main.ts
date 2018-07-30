import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
import WeatherPlugin from './plugins/weather-plugin';

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  theme: {
    primary: colors.orange.base,
    secondary: colors.orange.lighten2,
    accent: colors.orange.accent4,
    error: colors.red.base,
    warning: colors.yellow.base,
    info: colors.blue.base,
    success: colors.green.base
  }
});
Vue.use(WeatherPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
