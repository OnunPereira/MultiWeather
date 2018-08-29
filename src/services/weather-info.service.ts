import { HttpService } from '../models';

export default class WeatherInfoService extends HttpService {
  getForecast(city: string) {
    const ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?q=${city},pt&APPID=${
      process.env.VUE_APP_API_KEY
    }&units=metric`;
    return this.get(ENDPOINT);
  }

  getWeather(city: string) {
    const ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${city},pt&APPID=${
      process.env.VUE_APP_API_KEY
    }&units=metric`;
    return this.get(ENDPOINT);
  }
}
