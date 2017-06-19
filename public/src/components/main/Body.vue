<template lang="html">
  <div class="phone-viewport">
    <section>
      <md-card v-for="item in items" style="margin:15px;">
        <md-card-media>
          <!-- <img src="assets/card-image-2.jpg" alt="People"> -->
        </md-card-media>
        <md-card-content>
          {{item}}
        </md-card-content>
      </md-card>
    </section>

    <div>
      Lon : {{geoLocation.currentLocationLon}} <br>
      Lat : {{geoLocation.currentLocationLat}}
    </div>

    <!-- alert on the bottom -->
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span>{{snackbar_msg}}</span>
      <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">Close</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import { eventBus } from '../../main';

export default {
  methods: {
    fetchData() {
      var self = this;
      var parseString = require('xml2js').parseString;

      var url = 'http://openapi.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/xml/RealtimeCityAir/1/5/';
      return this.$http.get(url).then(function (result) {
        parseString(result.body, function (err, result) {
          if(result.RealtimeCityAir.RESULT[0].CODE == "INFO-000") {
            console.log("the data was well received");
            self.items = result.RealtimeCityAir.row;
          }
        });
      }, function (err) {
        console.log("Failed at calling OPEN API", error);
      });
    },

  },
  // Data from App.vue
  props: ['geoLocation'],
  data () {
    return {
      items: null,
      vertical: 'bottom',
      horizontal: 'center',
      duration: 3000,
      snackbar_msg: ""
    }
  },
  created() {
    // Get weather info from Seoul Weather Center
    // this.fetchData();

    // eventClick passed from a different component (Header)
    var self = this;
    eventBus.$on('refresh', function (data) {
      self.fetchData()
    });
  },
  watch: {
    // call again the method if the route changes
    '$route': ['fetchData']
  }
}
</script>

<style lang="css">
</style>
