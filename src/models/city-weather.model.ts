export default interface CityWeatherModel {
  id: number;
  name: string;
  currentWeather: string;
  forecast: WeatherData[];
}

interface WeatherData {
  x: number;
  y: number;
}