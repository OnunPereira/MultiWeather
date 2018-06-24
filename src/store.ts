import Vue from 'vue';
import Vuex from 'vuex';
import IState from '@/models/state.model';
import weatherInfoService from '@/services/weather-info.service';
import CityWeatherModel from '@/models/city-weather.model';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    citiesWeather: []
  } as IState,
  mutations: {
    addCityWeather(state, payload: CityWeatherModel) {
      const index = state.citiesWeather.findIndex(city => city.id === payload.id);

      if (index !== -1) {
        state.citiesWeather[index] = payload;
      } else {
        state.citiesWeather.push(payload);
      }
    },
    deleteCity(state, payload) {
      state.citiesWeather = state.citiesWeather.filter(city => city.id !== payload.id);
    }
  },
  actions: {
    getCityInfo(context, city) {
      const response = weatherInfoService.getWeatherInfo(city)
      .then(res => res.json())
      .then(city => context.commit('addCityWeather', {
        id: city.id,
        name: city.name,
        temp: city.main.temp
      }))
      .catch(() => 'An error occurred');

      return response;
    }
  },
});
