export default {
  install: (Vue, options) => {
    Vue.filter('toCelsius', value => `${Math.round(parseFloat(value))} °C`);
    Vue.filter('toPercentage', value => `${Math.round(parseFloat(value))} %`);
    Vue.filter('toHPa', value => `${Math.round(parseFloat(value))} hPa`);
  }
};
