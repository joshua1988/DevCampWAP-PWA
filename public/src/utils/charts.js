// import the component - chart you need
import { Bar } from 'vue-chartjs'
import { eventBus } from '../main'
import { getCurrentDate, getYesterday} from './time'

export default Bar.extend({
  props: ['selectedPastDate'],
  data () {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: '#f4e1e1',
            data: []
          }
        ]
      },
      url: '',
      dailyURL: 'http://openAPI.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/DailyAverageAirQuality/1/1/',
      monthlyURL: 'http://openapi.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/MonthlyAverageAirQuality/1/1/'
    }
  },
  created () {
    this.fetchData();

    var self = this;
    eventBus.$on('selectPastDate', function (data) {
      if (data == "yesterday") {
        self.updateURL('daily');
        self.fetchData();
      } else if (data == "lastMonth") {
        self.updateURL('monthly');
        // self.fetchData(self.geoLocation.currentDistrict)
      }
    });
  },
  mounted () {
    // Overwriting base render method with actual data.
    // this.renderChart(this.datacollection);
  },
  methods: {
    clearChartData() {
      this.datacollection.labels = [];
      this.datacollection.datasets[0].data = [];
    },
    updateURL(date) {
      if (date == 'daily') {
        this.url = this.dailyURL + getYesterday();
      } else if (date == 'monthly') {
        // this.url = this.monthlyURL + getCurrentDate();
      }
    },
    fetchData() {
      var url = 'http://openAPI.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/DailyAverageAirQuality/1/1/';
      //
      // if (date) {
      //   this.url += date;
      // } else {
      //   this.url += getCurrentDate();
      // }

      return this.$http.get(this.url).then(function (result) {
        if (result.body.DailyAverageAirQuality.RESULT.CODE == "INFO-000") {
          this.clearChartData();
          var resultObj = result.body.DailyAverageAirQuality.row[0];

          // 그래프 상단 이름 지정
          this.datacollection.datasets[0].label = resultObj.MSRDT_DE + " " + resultObj.MSRSTE_NM + '의 날씨';

          // x 축값 대입
          this.datacollection.labels.push("미세먼지");
          this.datacollection.labels.push("초미세먼지");

          // y 축값 대입
          this.datacollection.datasets[0].data.push(resultObj.PM10);
          this.datacollection.datasets[0].data.push(resultObj.PM25);

          this.renderChart(this.datacollection);
        }
      }, function (error) {
        console.log("Failed at calling OPEN API", error);
      });
    }
  }
})
