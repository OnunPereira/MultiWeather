<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-tabs fixed-tabs centered grow round v-model="currentCity">
        <v-tab v-for="city in cities" :key="city.id">
          {{ city.name }}
        </v-tab>
        <v-tab-item lazy v-for="city in cities" :key="city.id">
          <v-card hover color="grey lighten-5" tile>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ city.name.toUpperCase() }} {{ city.currentWeather }}</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <temperature-chart :city="city"></temperature-chart>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat small color="orange" @click="deleteEntry(city)">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import CityWeatherModel from '../../models/city-weather.model';
import TemperatureChart from '../temperature-chart/temperature-chart.component.vue';

@Component({
  name: 'city-list',
  components: {
    TemperatureChart
  }
})
export default class CityList extends Vue {
  @Prop() cities: CityWeatherModel[];
  @Prop() selected: CityWeatherModel;

  currentCity: string;

  constructor(data) {
    super(data);
    this.currentCity = 'tab-0';
  }

  deleteEntry(city) {
    this.$emit('deleteEntry', city);
  }
}
</script>