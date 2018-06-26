<template>
  <v-form fixed>
    <v-text-field :error-messages="errorMessages" v-model="city" label="What's the weather in..." color="white" prepend-icon="wb_sunny"></v-text-field>
    <v-btn round color="amber darken-1" dark @click="addCityWeather">Search city</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "search-bar"
})
export default class SearchBar extends Vue {
  @Prop() errorMessages: string;
  city: string;

  constructor() {
    super();
    this.city = null;
  }

  addCityWeather() {
    this.$emit("addCityWeather", this.city);
  }
}
</script>

<style scoped>
.tpl {
  position: fixed;
}
</style>
