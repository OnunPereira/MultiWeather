<template>
  <canvas :id="city.name" width="200" height="100"></canvas>
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
    const context = (document.getElementById(
      this.city.name
    ) as HTMLCanvasElement).getContext('2d');
    const chart = new Chart(context, {
      type: 'line',
      data: {
        labels: this.city.list.map(item => item.x),
        datasets: [
          {
            label: 'Temperature in °C',
            data: this.city.list.map(item => item.y),
            backgroundColor: 'rgba(255, 149, 102, 0.2)',
            borderColor: 'rgba(255,149,102,1)',
            borderWidth: 1
          }
        ]
      },
      options: {
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
