<template>
  <v-layout row wrap>
    <v-flex xs12 v-if="currentCity">
      <v-tabs-items v-model="currentCityCard" class="elevation-1">
        <v-tab-item lazy v-for="city in cities" :key="city.id" :id="city.name">
          <v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat small color="secondary" @click="deleteCity(city.name)">Delete</v-btn>
            </v-card-actions>
            <v-card-title primary-title>
              <v-flex xs12>
                <h3 class="display-1 mb-1">{{ city.name }}</h3>
              </v-flex>
              <v-flex xs4>
                <v-icon>wb_sunny</v-icon>
                <h3>{{ city.temp | toCelsius }}</h3>
              </v-flex>
              <v-flex xs4>
                <v-icon>cloud_queue</v-icon>
                <h3>{{ city.humidity | toPercentage }}</h3>
              </v-flex>
              <v-flex xs4>
                <v-icon>av_timer</v-icon>
                <h3>{{ city.pressure | toHPa }}</h3>
              </v-flex>
            </v-card-title>
            <v-card-text>
              <temperature-chart :city="city"></temperature-chart>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <v-tabs fixed-tabs centered grow class="elevation-1" v-model="currentCityTab">
        <v-tab v-for="city in cities" :key="city.id">
          {{ city.name }}
        </v-tab>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { capitalize } from 'lodash';

import CityWeatherModel from '../models/city-weather.model';
import TemperatureChart from './temperature-chart.component.vue';

@Component({
  name: 'city-list',
  components: {
    TemperatureChart
  }
})
export default class CityList extends Vue {
  @Prop() cities: CityWeatherModel[];
  @Prop() currentCity: string;

  get currentCityTab() {
    return this.cities.findIndex(city => city.name === this.currentCity);
  }

  set currentCityTab(index) {
    this.updateCity(this.cities[index].name);
  }

  get currentCityCard() {
    return this.cities.findIndex(city => city.name === this.currentCity);
  }

  set currentCityCard(cityName) {
    this.updateCity(cityName);
  }

  updateCity(city) {
    this.$emit('updateCity', city);
  }

  deleteCity(cityName) {
    this.$emit(
      'deleteCity',
      this.cities.findIndex(city => city.name === cityName)
    );
  }
}
</script>
