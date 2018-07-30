import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import CityWeatherModel from '@/models/city-weather.model';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    citiesWeather: [],
    currentCity: null
  },
  mutations,
  actions
});
