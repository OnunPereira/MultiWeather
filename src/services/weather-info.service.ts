const API_KEY = 'bca6b125edd12da75d20e22c3f0c0a1a';

export default {
  getWeatherInfo(city: string) {
    const ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${city},pt&APPID=${API_KEY}`;
    return fetch(ENDPOINT);
  }
};