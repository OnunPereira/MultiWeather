<template>
  <div class="main">
    <br>
    <v-flex xs6 offset-xs3>
      <search-bar :errorMessages="errorMessages" @addCityWeather="addCityWeather" :searchTerm="null"/>
      <city-list :cities="citiesWeather" @deleteEntry="deleteEntry"></city-list>
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

@Component({
  components: {
    SearchBar,
    CityList
  },
  computed: {
    ...mapState(['citiesWeather'])
  },
  methods: {
    ...mapActions(['getCityInfo']),
    ...mapMutations(['deleteCity'])
  }
})
export default class Main extends Vue {
  errorMessages: string;

  constructor() {
    super();
    this.errorMessages = null;
  }

  async addCityWeather(city) {
    this.errorMessages = null;
    try {
      await this['getCityInfo'](city);
    } catch (error) {
      this.errorMessages = capitalize(error.message);
    }
  }

  deleteEntry(city) {
    this['deleteCity'](city);
  }
}
</script>

<style scoped>
</style>
