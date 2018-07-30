<template>
  <v-app :dark="dark">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <!-- TODO: meter search bar floating numa toolbar -->
        <v-flex xs10 md8 lg6 offset-xs1 offset-md2 offset-lg3 my-5>
          <search-bar :errorMessages="errorMessages" @addCity="addCity" />
        </v-flex>
        <v-flex xs1>
          <v-menu transition="slide-x-reverse-transition" offset-y>
            <v-btn icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="item in items" :key="item.key">
                <v-list-tile-title>
                  <v-switch label="Dark theme" v-model="dark"></v-switch>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
        <v-flex sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3>
          <city-list :cities="citiesWeather" :currentCity="currentCity" @updateCity="updateCity" @deleteCity="deleteCity" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import { Component } from 'vue-property-decorator';

import { capitalize } from 'lodash';

import { SearchBar, CityList } from '../components';
import { ACTIONS, MUTATIONS } from '@/constants';
import CityWeatherModel from '@/models/city-weather.model';

@Component({
  components: {
    SearchBar,
    CityList
  },
  computed: {
    ...mapState(['citiesWeather', 'currentCity'])
  },
  methods: {
    ...mapActions({
      [ACTIONS.GET_WEATHER]: ACTIONS.GET_WEATHER,
      [ACTIONS.GET_FORECAST]: ACTIONS.GET_FORECAST
    }),
    ...mapMutations({
      [MUTATIONS.ADD_CITY]: MUTATIONS.ADD_CITY,
      [MUTATIONS.UPDATE_CITY]: MUTATIONS.UPDATE_CITY,
      [MUTATIONS.DELETE_CITY]: MUTATIONS.DELETE_CITY,
      [MUTATIONS.SET_CURRENT_CITY]: MUTATIONS.SET_CURRENT_CITY
    })
  }
})
export default class Main extends Vue {
  citiesWeather: CityWeatherModel[];
  currentCity: CityWeatherModel;

  private dark: boolean;
  private errorMessages: string;
  private items: [{ title: string }];

  constructor() {
    super();
    this.dark = false;
    this.errorMessages = null;
    this.items = [
      {
        title: 'Dark theme'
      }
    ];
  }

  async addCity(cityName: string) {
    this.errorMessages = null;

    try {
      const { id, name, forecast } = await this[ACTIONS.GET_FORECAST](cityName);
      const { temp, humidity, pressure } = await this[ACTIONS.GET_WEATHER](
        cityName
      );

      const newCity = new CityWeatherModel({
        id,
        name,
        forecast,
        temp,
        humidity,
        pressure
      });

      this[MUTATIONS.ADD_CITY](newCity);
      this[MUTATIONS.SET_CURRENT_CITY](newCity.name);
    } catch (error) {
      this.errorMessages = capitalize(error.message);
    }
  }

  async updateCity(cityName: string) {
    this[MUTATIONS.SET_CURRENT_CITY](cityName);

    try {
      const { id, name, forecast } = await this[ACTIONS.GET_FORECAST](cityName);
      const { temp, humidity, pressure } = await this[ACTIONS.GET_WEATHER](
        cityName
      );

      this[MUTATIONS.UPDATE_CITY]({
        id: id,
        cityWeather: new CityWeatherModel({
          id,
          name,
          forecast,
          temp,
          humidity,
          pressure
        })
      });
    } catch (error) {
      console.error(error);
    }
  }

  deleteCity(city: CityWeatherModel) {
    this[MUTATIONS.DELETE_CITY](city);
    this[MUTATIONS.SET_CURRENT_CITY](
      this.citiesWeather[this.citiesWeather.length - 1]
        ? this.citiesWeather[this.citiesWeather.length - 1].name
        : ''
    );
  }
}
</script>
