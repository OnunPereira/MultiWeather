<template>
  <canvas :id="city.name" width="200" height="100"></canvas>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import CityWeatherModel from "@/models/city-weather.model";
import Chart from "chart.js";

@Component({
  name: "temperature-chart"
})
export default class TemperatureChartComponent extends Vue {
  @Prop() city: CityWeatherModel;
  context: CanvasRenderingContext2D;
  chart: any;

  mounted() {
    this.context = (document.getElementById(this.city.name) as HTMLCanvasElement).getContext("2d");
    this.chart = new Chart(this.context, {
      type: "line",
      data: {
        labels: this.city.list.map(item => item.x),
        datasets: [
          {
            label: "Temperature in °C",
            data: this.city.list.map(item => item.y),
            backgroundColor: "rgba(255, 149, 102, 0.2)",
            borderColor: "rgba(255,149,102,1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}
</script>
