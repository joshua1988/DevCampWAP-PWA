export function getPreviousInfo () {
  var url = 'http://openAPI.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/DailyAverageAirQuality/1/1/20130228';
  $.get(url, function(result) {
    console.log(result);
    return result;
  });
}
