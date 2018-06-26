export default interface CityWeatherModel {
  id: number;
  list: WeatherData[];
  name: string;
}

interface WeatherData {
  x: number;
  y: number;
}