// import the component - chart you need
import { Bar } from 'vue-chartjs'

var url = 'http://openAPI.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/DailyAverageAirQuality/1/1/20170701';

export default Bar.extend({
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
      }
    }
  },
  created () {
    this.fetchData();
  },
  mounted () {
    // Overwriting base render method with actual data.
    // this.renderChart(this.datacollection);
  },
  methods: {
    fetchData() {
      return this.$http.get(url).then(function (result) {
        if (result.body.DailyAverageAirQuality.RESULT.CODE == "INFO-000") {
          console.log(result.body.DailyAverageAirQuality.row[0]);
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
