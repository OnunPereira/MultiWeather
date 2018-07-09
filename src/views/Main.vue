<template>
  <div class="main">
    <br>
    <v-flex xs6 offset-xs3>
      <search-bar :errorMessages="errorMessages" @addCity="addCity" />
      <city-list :cities="citiesWeather" :selected="citiesWeather[0]" @deleteEntry="deleteEntry" />
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
import CityWeatherModel from '@/models/city-weather.model';

@Component({
  components: {
    SearchBar,
    CityList
  },
  computed: {
    ...mapState(['citiesWeather'])
  },
  methods: {
    ...mapActions({
      [ACTIONS.GET_WEATHER]: ACTIONS.GET_WEATHER,
      [ACTIONS.GET_FORECAST]: ACTIONS.GET_FORECAST
    }),
    ...mapMutations({
      [MUTATIONS.ADD_CITY]: MUTATIONS.ADD_CITY,
      [MUTATIONS.DELETE_CITY]: MUTATIONS.DELETE_CITY
    })
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
      const currentWeather = await this[ACTIONS.GET_WEATHER](city);
      const { id, name, forecast } = await this[ACTIONS.GET_FORECAST](city);

      this[MUTATIONS.ADD_CITY](
        new CityWeatherModel({
          id,
          name,
          forecast,
          currentWeather
        })
      );
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
