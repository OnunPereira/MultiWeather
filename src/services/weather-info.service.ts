const API_KEY = 'bca6b125edd12da75d20e22c3f0c0a1a';

export default {
  async getWeatherInfo(city: string) {
    const ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${city},pt&APPID=${API_KEY}`;
    return fetch(ENDPOINT)
    .then(res => res.json())
    .then(city => {
      return {
        id: city.id,
        name: city.name,
        temp: city.main.temp
      };
    })
    .catch(err => console.error(err));
  }
};