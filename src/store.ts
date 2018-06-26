import Vue from "vue";
import Vuex from "vuex";
import IState from "@/models/state.model";
import weatherInfoService from "@/services/weather-info.service";
import CityWeatherModel from "@/models/city-weather.model";
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    citiesWeather: []
  } as IState,
  mutations: {
    addCityWeather(state, payload: CityWeatherModel) {
      const index = state.citiesWeather.findIndex(
        city => city.id === payload.id
      );

      if (index !== -1) {
        state.citiesWeather[index] = payload;
      } else {
        state.citiesWeather.push(payload);
      }
    },
    deleteCity(state, payload) {
      state.citiesWeather = state.citiesWeather.filter(
        city => city.id !== payload.id
      );
    }
  },
  actions: {
    getCityInfo(context, city) {
      const response = weatherInfoService
        .getWeatherInfo(city)
        .then(res => res.json())
        .then(city => ({
          id: city.city.id,
          name: city.city.name,
          list: city.list.map(listItem => ({
            x: moment(listItem.dt * 1000).format("DD/MM HH:mm"),
            y: tempInCelsius(listItem.main.temp)
          }))
        }))
        .catch((err) => {
          throw err;
        });

      context.commit('addCityWeather', response);

      return response;
    }
  }
});

function tempInCelsius(tempInK) {
  return Math.round(tempInK - 273.15);
}
