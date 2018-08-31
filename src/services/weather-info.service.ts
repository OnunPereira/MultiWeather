import { HttpService } from '../models';

export default class WeatherInfoService extends HttpService {
  genericGet(type: string) {
    return (city: string) => {
      const ENDPOINT = `https://api.openweathermap.org/data/2.5/${type}?q=${city},pt&APPID=${
        process.env.VUE_APP_API_KEY
      }&units=metric`;
      return this.get(ENDPOINT).catch(e => e.response.data);
    };
  }
}
