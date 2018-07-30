export default class CityWeatherModel {
  id: number;
  name: string;
  temp: string;
  humidity: string;
  pressure: number;
  forecast: WeatherData[];

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.forecast = data.forecast;
    this.temp = data.temp;
    this.humidity = data.humidity;
    this.pressure = data.pressure;
  }
}

interface WeatherData {
  x: number;
  y: number;
}
