<template>
  <canvas :id="`c-${city.id}`" width="200" height="100"></canvas>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import Chart from 'chart.js';

import CityWeatherModel from '../../models/city-weather.model';

@Component({
  name: 'temperature-chart'
})
export default class TemperatureChartComponent extends Vue {
  @Prop() city: CityWeatherModel;

  mounted() {
    const context = (document.querySelector(
      `#c-${this.city.id}`
    ) as HTMLCanvasElement).getContext('2d');

    const chart = new Chart(context, {
      type: 'line',
      data: {
        labels: this.city.forecast.map(item => item.x),
        datasets: [
          {
            data: this.city.forecast.map(item => item.y),
            backgroundColor: 'rgba(255,168,0,0.3)',
            borderColor: '#FF9800',
            borderWidth: 1,
            pointRadius: 0,
            pointHoverRadius: 10
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        }
      }
    });
  }
}
</script>
