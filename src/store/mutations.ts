import { concat } from 'lodash';

import CityWeatherModel from '../models/city-weather.model';
import { MUTATIONS } from '../constants';

export default {
  [MUTATIONS.ADD_CITY](state, payload: CityWeatherModel) {
    const index = state.citiesWeather.findIndex(city => city.id === payload.id);

    if (index !== -1) {
      state.citiesWeather[index] = payload;
    } else {
      state.citiesWeather = concat(state.citiesWeather, [payload]);
    }
  },
  [MUTATIONS.DELETE_CITY](state, payload) {
    state.citiesWeather = state.citiesWeather.filter(
      city => city.id !== payload.id
    );
  }
};