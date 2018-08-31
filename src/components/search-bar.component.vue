<template>
  <v-form @submit.prevent="addCity()" transition="slide-y-transition" origin="top center 100px">
    <v-layout row wrap>
      <v-flex xs9>
        <v-text-field :error-messages="errorMessages" label="What's the weather like in..." v-model="searchTerm"></v-text-field>
      </v-flex>
      <v-flex xs3 mt-2>
        <div class="text-xs-left">
          <v-btn color="primary" type="submit" :icon="$vuetify.breakpoint.smAndDown">
            <span v-if="$vuetify.breakpoint.mdAndUp">Search</span>
            <v-icon :right="$vuetify.breakpoint.mdAndUp">search</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
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
