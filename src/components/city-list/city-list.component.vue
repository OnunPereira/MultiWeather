<template>
  <v-layout row wrap>
    <v-flex xs12 v-if="currentCity">
      <v-tabs-items :value="currentCity">
        <v-tab-item lazy v-for="city in cities" :key="city.id" :id="city.name">
          <v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat small color="secondary" @click="deleteCity(city)">Delete</v-btn>
            </v-card-actions>
            <v-card-title primary-title>
              <v-flex xs3>
                <h3 class="display-1 mb-1">{{ city.name }}</h3>
              </v-flex>
              <v-flex xs3>
                <v-icon>wb_sunny</v-icon>
                <h3>{{ city.temp | toCelsius }}</h3>
              </v-flex>
              <v-flex xs3>
                <v-icon>cloud_queue</v-icon>
                <h3>{{ city.humidity | toPercentage }}</h3>
              </v-flex>
              <v-flex xs3>
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
      <v-tabs fixed-tabs centered grow>
        <v-tab v-for="city in cities" :key="city.id" @click="updateCity(city.name)">
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
  @Prop() currentCity: string;

  updateCity(city) {
    this.$emit('updateCity', city);
  }

  deleteCity(city) {
    this.$emit('deleteCity', city);
  }
}
</script>