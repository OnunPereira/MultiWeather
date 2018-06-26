<template>
  <div class="main">
    <br>
    <v-flex xs6 offset-xs3>
      <search-bar :errorMessages="errorMessages" @addCityWeather="addCityWeather"/>
      <city-list :cities="citiesWeather" @deleteEntry="deleteEntry"></city-list>
    </v-flex>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchBar from "@/components/search-bar/search-bar.component.vue"; // @ is an alias to /src
import CityList from "@/components/city-list/city-list.component.vue";
import { mapState, mapActions, mapMutations } from "vuex";

@Component({
  components: {
    SearchBar,
    CityList
  },
  computed: {
    ...mapState(["citiesWeather"])
  },
  methods: {
    ...mapActions(["getCityInfo"]),
    ...mapMutations(["deleteCity"])
  }
})
export default class Main extends Vue {
  errorMessages: string;

  constructor() {
    super();
    this.errorMessages = null;
  }

  async addCityWeather(city) {
    try {
      const response = await this["getCityInfo"](city);
    } catch (error) {
      this.errorMessages = error;
    }
  }

  deleteEntry(city) {
    this["deleteCity"](city);
  }
}
</script>

<style scoped>
</style>
