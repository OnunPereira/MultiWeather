const filter = char => value => `${Math.round(parseFloat(value))} ${char}`;

export default {
  install: Vue => {
    Vue.filter('toCelsius', filter('°C'));
    Vue.filter('toPercentage', filter('%'));
    Vue.filter('toHPa', filter('hPa'));
  }
};
