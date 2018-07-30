import moment from 'moment';

import weatherInfoService from '../services/weather-info.service';
import { ACTIONS } from '@/constants';

export default {
  async [ACTIONS.GET_WEATHER](context, city) {
    const response = await weatherInfoService.getWeather(city);

    if (response.cod == '200') {
      return {
        temp: response.main.temp,
        humidity: response.main.humidity,
        pressure: response.main.pressure
      };
    } else {
      throw response;
    }
  },

  async [ACTIONS.GET_FORECAST](context, city) {
    const response = await weatherInfoService.getForecast(city);

    if (response.cod == '200') {
      return {
        id: response.city.id,
        name: response.city.name,
        forecast: response.list.map(listItem => ({
          x: moment(listItem.dt * 1000).format('DD/MM HH:mm'),
          y: listItem.main.temp
        }))
      };
    } else {
      throw response;
    }
  }
};
