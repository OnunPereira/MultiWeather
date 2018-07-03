import moment from 'moment';

import weatherInfoService from '../services/weather-info.service';
import { ACTIONS } from '@/constants';

export default {
  async [ACTIONS.GET_CITY](context, city) {
    const forecast = await weatherInfoService.getForecast(city);
    const weather = await weatherInfoService.getWeather(city);

    if (weather.cod === '200') {
      const response = {
        id: weather.
      }
    }

    if (forecast.cod === '200') {
      const response = {
        id: forecast.city.id,
        name: forecast.city.name,
        list: forecast.list.map(listItem => ({
          x: moment(listItem.dt * 1000).format('DD/MM HH:mm'),
          y: tempInCelsius(listItem.main.temp)
        }))
      };

      context.commit('addCity', response);
    } else {
      throw forecast;
    }
  }
};

function tempInCelsius(tempInK) {
  return Math.round(tempInK - 273.15);
}
