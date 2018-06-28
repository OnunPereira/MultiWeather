<template>
  <v-form @submit="addCityWeather()">
    <v-text-field :error-messages="errorMessages" v-model="searchTerm" label="What's the weather forecast for..." prepend-icon="wb_sunny"></v-text-field>
    <v-btn round color="amber" type="submit">Search for city in Portugal</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'search-bar'
})
export default class SearchBar extends Vue {
  @Prop() errorMessages: string;
  @Prop() searchTerm: string;

  addCityWeather() {
    this.$emit('addCityWeather', this.searchTerm);
  }
}
</script>