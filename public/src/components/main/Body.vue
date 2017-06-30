<template lang="html">
  <div class="phone-viewport">
    <section>
      <md-card v-for="item in items" :key='item.id' style="margin:15px;">
        <!-- <md-card-media>
          <img src="assets/logo-192.png" alt="People">
        </md-card-media> -->
        <md-card-content>
          {{item}}
        </md-card-content>
      </md-card>
    </section>
    <section v-if="geoLocation.currentDistrict">
      <md-icon v-if="AirInfo.IDEX_NM" class="md-size-4x md-primary">sentiment_very_satisfied</md-icon>
      <div>
        일시 : {{AirInfo.MSRDT}} <br />
        대기 상태 : {{AirInfo.IDEX_NM}} <br />
        미세먼지 : {{AirInfo.PM10}} <br />
        초미세먼지 : {{AirInfo.PM25}} <br />
        오존 : {{AirInfo.O3}}
      </div>
    </section>
  </div>
</template>

<script>
import { eventBus } from '../../main';

export default {
  // Data from App.vue
  props: {
    'geoLocation' : {
      type: Object
    },
    'AirInfo' : {
      type: Object
    },
    'toastMessage': Function
  },
  data () {
    return {
      items: null
    }
  },
  methods: {
    fetchData(districtName) {
      var self = this;

      // 한글 URL 로 HTTP GET 요청시 발생하는 인코딩 문제 해결 필요
      var decodedURL = districtName;
      var url = 'http://openapi.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/RealtimeCityAir/1/25/';
      console.log(url);

      return this.$http.get(url).then(function (result) {
        // xml2js.parseString(result.body, function (err, result) {
        //   if(result.RealtimeCityAir.RESULT[0].CODE == "INFO-000") {
        //     console.log("the data was well received");
        //     self.items = result.RealtimeCityAir.row;
        //   }
        // });
        // self.items = result;

        if (result.body.RealtimeCityAir.RESULT.CODE == "INFO-000") {
          console.log("the data was well received");
          console.log(result.body.RealtimeCityAir.row[21]);

          self.AirInfo.MSRDT = result.body.RealtimeCityAir.row[21].MSRDT;
          self.AirInfo.IDEX_NM = result.body.RealtimeCityAir.row[21].IDEX_NM;
          self.AirInfo.PM10 = result.body.RealtimeCityAir.row[21].PM10;
          self.AirInfo.PM25 = result.body.RealtimeCityAir.row[21].PM25;
          self.AirInfo.O3 = result.body.RealtimeCityAir.row[21].O3;
        }
      }, function (error) {
        console.log("Failed at calling OPEN API", error);
      });
    },

  },
  created() {
    // Get weather info from Seoul Weather Center
    // this.fetchData();

    // eventClick passed from a different component (Header)
    var self = this;
    eventBus.$on('refresh', function (data) {
      self.fetchData(self.geoLocation.currentDistrict)
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
