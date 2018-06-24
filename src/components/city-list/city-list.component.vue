<template>
  <v-layout row wrap>
    <v-flex v-for="city in cities" :key="city.id" xs6>
      <v-card light hover class="card" color="grey lighten-2">
        <v-card-title primary-title>
          <div>
            <h4 class="headline mb-0">{{ city.name }}</h4>
          </div>
        </v-card-title>
        <v-card-text>
          <h2>{{ tempInCelsius(city.temp) }}</h2>
        </v-card-text>
        <v-card-actions>
          <v-btn flat small color="orange" @click="deleteEntry(city)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import CityWeatherModel from '@/models/city-weather.model';

@Component({
  name: 'city-list',
  methods: {
    tempInCelsius(tempInK) {
      return Math.round(tempInK - 273.15) + ' °C';
    }
  }
})
export default class CityList extends Vue {
  @Prop() cities: CityWeatherModel[];
  
  deleteEntry(city) {
    this.$emit('deleteEntry', city);
  }
}
</script>

<style>
.card {
  margin: 3%;
}
</style>
