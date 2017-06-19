<template>
  <div id="app">
    <router-view name="nestedHeader"></router-view>
    <router-view v-bind:geoLocation="geoLocation"></router-view>
    <router-view name="summaryView"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',

      // Geolocation
      geoLocation : {
        currentLocation: null,
        currentLocationLat: null,
        currentLocationLon: null
      }
    }
  },
  methods: {
    // Get User's Location Info
    getUserLocation() {
      if (navigator.geolocation) {
        console.log('Geolocation is supported!');
        return navigator.geolocation.getCurrentPosition(function(position) {
          this.geoLocation.currentLocation = position.coords
          this.geoLocation.currentLocationLon = position.coords.longitude
          this.geoLocation.currentLocationLat = position.coords.latitude
          console.log(this.geoLocation.currentLocation)
        }.bind(this), function (error) { // getCurrentPosition 비동기 실행 결과 값을 컴포넌트에 매핑
          console.log('Error occurred. Error code: ' + error.code);
          switch (error.code) {
            case 0:
              console.log("Geolocation unknown error");
              break;
            case 1:
              console.log("Geolocation permission denied");
              break;
            case 2:
              console.log("Geolocation position unavailble");
              break;
            case 3:
              console.log("Getting location info timed out");
              break;
            default:
              console.log("Track the error");
          }
        }, { maximumAge: 5 * 60 * 1000 });
      } else {
        console.log('Geolocation is not supported for this Browser/OS.');
      }
    }
  },
  created() {
    // Get get info
    this.getUserLocation();
  }
}
</script>

<style>
</style>
