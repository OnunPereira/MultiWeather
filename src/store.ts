import Vue from 'vue';
import Vuex from 'vuex';

import moment from 'moment';
import { concat } from 'lodash';

import weatherInfoService from './services/weather-info.service';
import CityWeatherModel from './models/city-weather.model';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    citiesWeather: []
  },
  mutations: {
    addCityWeather(state, payload: CityWeatherModel) {
      const index = state.citiesWeather.findIndex(
        city => city.id === payload.id
      );

      if (index !== -1) {
        state.citiesWeather[index] = payload;
      } else {
        state.citiesWeather = concat([payload], state.citiesWeather);
      }
    },
    deleteCity(state, payload) {
      state.citiesWeather = state.citiesWeather.filter(
        city => city.id !== payload.id
      );
    }
  },
  actions: {
    async getCityInfo(context, city) {
      const res = await weatherInfoService.getWeatherInfo(city);

      if (res.cod === '200') {
        const response = {
          id: res.city.id,
          name: res.city.name,
          list: res.list.map(listItem => ({
            x: moment(listItem.dt * 1000).format('DD/MM HH:mm'),
            y: tempInCelsius(listItem.main.temp)
          }))
        };

        context.commit('addCityWeather', response);
      } else {
        throw res;
      }
    }
  }
});

function tempInCelsius(tempInK) {
  return Math.round(tempInK - 273.15);
}
