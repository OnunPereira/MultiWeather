<template>
  <v-form @submit.prevent="addCity()" transition="slide-y-transition" origin="top center 100px">
    <v-text-field :error-messages="errorMessages" label="What's the weather forecast for..." v-model="searchTerm" prepend-icon="search"></v-text-field>
    <v-btn color="primary" type="submit">Search city</v-btn>
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
  searchTerm: string;

  constructor() {
    super();
    this.searchTerm = null;
  }

  addCity() {
    this.$emit('addCity', this.searchTerm);
    this.searchTerm = null;
  }
}
</script>