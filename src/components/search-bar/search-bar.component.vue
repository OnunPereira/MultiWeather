<template>
  <v-form>
    <v-text-field v-model="city" label="Insert city name"></v-text-field>
    <v-btn round color="primary" light @click="addCityWeather">Send</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'search-bar'
})
export default class SearchBar extends Vue {
  city : string;

  constructor() {
    super();
    this.city = null;
  }

  addCityWeather() {
    this.$emit('addCityWeather', this.city);
  }
}
</script>
