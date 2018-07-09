<template>
  <v-form @submit="addCity()">
    <v-text-field :error-messages="errorMessages" label="What's the weather forecast for..." v-model="searchTerm" prepend-icon="wb_sunny"></v-text-field>
    <v-btn round color="amber darken-1" type="submit">Search city</v-btn>
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