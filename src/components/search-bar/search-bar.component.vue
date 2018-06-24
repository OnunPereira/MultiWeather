<template>
  <v-form>
    <v-text-field :error-messages="errorMessages" v-model="city" label="What's the weather in..." color="white" prepend-icon="wb_sunny"></v-text-field>
    <v-btn round color="orange" dark @click="addCityWeather">Send</v-btn>
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
  city: string;

  constructor() {
    super();
    this.city = null;
  }

  addCityWeather() {
    this.$emit('addCityWeather', this.city);
  }
}
</script>
