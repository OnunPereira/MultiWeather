<template>
  <div class="main">
    <br>
    <v-flex xs6 offset-xs3>
      <search-bar :errorMessages="errorMessages" @addCity="addCity" />
      <city-list :cities="citiesWeather" :selected="citiesWeather[0]" @deleteEntry="deleteEntry"></city-list>
    </v-flex>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import { Component } from 'vue-property-decorator';

import { capitalize } from 'lodash';

import SearchBar from '../components/search-bar/search-bar.component.vue';
import CityList from '../components/city-list/city-list.component.vue';
import { ACTIONS, MUTATIONS } from '@/constants';

@Component({
  components: {
    SearchBar,
    CityList
  },
  computed: {
    ...mapState(['citiesWeather'])
  },
  methods: {
    ...mapActions([ACTIONS.GET_CITY]),
    ...mapMutations([MUTATIONS.DELETE_CITY])
  }
})
export default class Main extends Vue {
  errorMessages: string;

  constructor() {
    super();
    this.errorMessages = null;
  }

  async addCity(city) {
    this.errorMessages = null;
    try {
      await this[ACTIONS.GET_CITY](city);
    } catch (error) {
      this.errorMessages = capitalize(error.message);
    }
  }

  deleteEntry(city) {
    this[MUTATIONS.DELETE_CITY](city);
  }
}
</script>

<style scoped>
</style>
