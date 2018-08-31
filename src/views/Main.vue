<template>
  <v-app :dark="dark">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3 my-2>
          <v-card class="elevation-1">
            <v-layout row wrap>
              <v-flex xs9 offset-xs1>
                <search-bar :errorMessages="errorMessages" @addCity="addCity" />
              </v-flex>
              <v-flex xs2 mt-2>
                <v-menu transition="slide-x-reverse-transition" offset-y :close-on-content-click="false">
                  <v-btn icon slot="activator" :right="$vuetify.breakpoint.xs" :left="$vuetify.breakpoint.mdAndUp">
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                  <v-list :dark="dark">
                    <v-list-tile v-for="item in items" :key="item.key">
                      <v-list-tile-action>
                        <v-switch label="Dark theme" v-model="dark"></v-switch>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-card>
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
import { Component, Watch, Prop } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

import capitalize from 'lodash/capitalize';

import { SearchBar, CityList } from '../components';
import { ACTIONS, MUTATIONS } from '@/constants';
import CityWeatherModel from '@/models/city-weather.model';

@Component({
  components: {
    SearchBar,
    CityList
  }
})
export default class Main extends Vue {
  @State(state => state.citiesWeather)
  citiesWeather: CityWeatherModel[];
  @State(state => state.currentCity)
  currentCity: CityWeatherModel;

  @Action(ACTIONS.GET_WEATHER) getWeatherAction;
  @Action(ACTIONS.GET_FORECAST) getForecastAction;

  @Mutation(MUTATIONS.ADD_CITY) addCityMutation;
  @Mutation(MUTATIONS.UPDATE_CITY) updateCityMutation;
  @Mutation(MUTATIONS.DELETE_CITY) deleteCityMutation;
  @Mutation(MUTATIONS.SET_CURRENT_CITY) setCurrentCityMutation;

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

  async mounted() {
    if (localStorage.getItem('darkTheme')) {
      try {
        this.dark = localStorage.getItem('darkTheme') === 'true';
      } catch (e) {
        localStorage.removeItem('darkTheme');
      }
    }

    if (localStorage.getItem('cities')) {
      try {
        const cities = JSON.parse(localStorage.getItem('cities'));

        cities.forEach(city =>
          this.addCityMutation(new CityWeatherModel(city))
        );
        this.setCurrentCityMutation(cities[0].name);
      } catch (e) {
        localStorage.removeItem('cities');
      }
    }
  }

  async addCity(cityName: string) {
    this.errorMessages = null;

    try {
      const { id, name, forecast } = await this.getForecastAction(cityName);
      const { temp, humidity, pressure } = await this.getWeatherAction(
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

      this.addCityMutation(newCity);
      this.setCurrentCityMutation(newCity.name);
    } catch (e) {
      this.errorMessages = capitalize(e.message);
    }
  }

  async updateCity(cityName: string) {
    this.setCurrentCityMutation(cityName);

    try {
      const { id, name, forecast } = await this.getForecastAction(cityName);
      const { temp, humidity, pressure } = await this.getWeatherAction(
        cityName
      );

      this.updateCityMutation({
        id,
        cityWeather: new CityWeatherModel({
          id,
          name,
          forecast,
          temp,
          humidity,
          pressure
        })
      });
    } catch (e) {
      console.log(e);
    }
  }

  deleteCity(index: number) {
    this.deleteCityMutation(index);
    this.$nextTick(() =>
      this.setCurrentCityMutation(
        this.citiesWeather[index - 1]
          ? this.citiesWeather[index - 1].name
          : this.citiesWeather[0] ? this.citiesWeather[0].name : ''
      )
    );
  }

  @Watch('dark')
  storeDarkTheme(value) {
    localStorage.setItem('darkTheme', value + '');
  }
}
</script>
