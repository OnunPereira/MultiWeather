<template>
  <v-layout row wrap>
    <v-list v-for="city in cities" :key="city.id">
      <v-card>
        <v-card-text>
          {{ tempInCelsius(city.temp) }} °C
        </v-card-text>
        <v-card-title primary-title>
          {{ city.name }}
        </v-card-title>
        <v-card-actions>
          <v-btn flat small color="orange" @click="deleteEntry(city)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-list>
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
      return Math.round(tempInK - 273.15);
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
