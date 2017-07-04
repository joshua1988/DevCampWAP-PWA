<template lang="html">
  <div class="current-air-container">
    <!-- <section>
    <md-card v-for="item in items" :key='item.id' style="margin:15px;">
    <md-card-media>
    <img src="assets/logo-192.png" alt="People">
  </md-card-media>
  <md-card-content>
  {{item}}
</md-card-content>
</md-card>
</section> -->
<section v-if="geoLocation.currentDistrict" class="air-status-section">
  <span class="main-icon icon-astonished-face"></span>
  <div class="main-status-score">{{AirInfo.IDEX_MVL}}</div>
  <div class="main-status-text">{{AirInfo.MSRSTE_NM}}의 대기는 지금 {{AirInfo.IDEX_NM}}!</div>
  <div class="main-status-date">기준 : {{AirInfo.MSRDT}}</div>
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

      // 권역 선택 + 자치구 선택
      // http://openAPI.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/RealtimeCityAir/1/5/동북권/성북구

      // 자치구 선택
      // 대기오염 정보 Open API 활용가이드 - 17페이지
      // var serviceKey = 'TNXrkDjzIjFlOWrBnFo8Q26S5jU%2BN2gWAalGbVsm4QAwIZRzpJtPGSY8YapNMK8RpUahVb2oyycFSWgsDwaxsA%3D%3D';
      // var url = 'https://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=' + districtName + '&dataTerm=daily&pageNo=1&numOfRows=1&ServiceKey=' + serviceKey + '&ver=1.3';
      // var url = 'https://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=강남구&dataTerm=daily&pageNo=1&numOfRows=1&ServiceKey=TNXrkDjzIjFlOWrBnFo8Q26S5jU%2BN2gWAalGbVsm4QAwIZRzpJtPGSY8YapNMK8RpUahVb2oyycFSWgsDwaxsA%3D%3D&ver=1.3';
      // http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%A2%85%EB%A1%9C%EA%B5%AC&dataTerm=daily&pageNo=1&numOfRows=1&ServiceKey=TNXrkDjzIjFlOWrBnFo8Q26S5jU%2BN2gWAalGbVsm4QAwIZRzpJtPGSY8YapNMK8RpUahVb2oyycFSWgsDwaxsA%3D%3D&ver=1.3

      console.log(url);

      return this.$http.get(url).then(function (result) {
        // xml2js.parseString(result.body, function (err, result) {
        //   if(result.RealtimeCityAir.RESULT[0].CODE == "INFO-000") {
        //     console.log("the data was well received");
        //     self.items = result.RealtimeCityAir.row;
        //   }
        // });
        // self.items = result;
        console.log(result);
        if (result.body.RealtimeCityAir.RESULT.CODE == "INFO-000") {
          const airData = result.body.RealtimeCityAir.row[21];
          console.log("the data was well received");
          console.log(airData);

          self.AirInfo.MSRDT = airData.MSRDT;
          self.AirInfo.IDEX_NM = airData.IDEX_NM;
          self.AirInfo.PM10 = airData.PM10;
          self.AirInfo.PM25 = airData.PM25;
          self.AirInfo.O3 = airData.O3;
          self.AirInfo.MSRSTE_NM = airData.MSRSTE_NM;
          self.AirInfo.IDEX_MVL = airData.IDEX_MVL;
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
.current-air-container {
  text-align: center;
  color: white;
  height: 60%;
  display: table;
  width: 100%;
}
.air-status-section {
  vertical-align: middle;
  line-height: normal;
  display: table-cell;
}
.main-icon {
  font-size: 7rem;
}
.main-status-text {
  font-size: 1.6rem;
  margin: 1rem 0 0.5rem;
  font-weight: bolder;
}
.main-status-date {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.73);
}
.main-status-score {
  font-size: 3.2rem;
  font-weight: 100;
}

</style>
