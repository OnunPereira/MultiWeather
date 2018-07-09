export default class CityWeatherModel {
  id: number;
  name: string;
  currentWeather: string;
  forecast: WeatherData[];

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.forecast = data.forecast;
    this.currentWeather = data.currentWeather;
  }
}

interface WeatherData {
  x: number;
  y: number;
}
