// Get today's date in yymmhh format
export function getCurrentDate() {
  var rightNow = new Date();
  return rightNow.toISOString().slice(0,10).replace(/-/g,"");
};

// Date Format : yyyymmdd
export function getYesterday() {
  var date = new Date();
  // yyyy
  var yyyy = date.getFullYear();
  // mm
  var currentMonth = date.getUTCMonth() + 1;
  var mm = currentMonth < 10 ? "0" + currentMonth : currentMonth;
  // dd
  var dd = '';
  var currentDay = date.getUTCDate();
  if (currentDay < 10) {
    dd = "0" + currentDay;
  } else if (currentDay > 10 && currentDay < 20) {
    dd = "1" + currentDay;
  } else {
    dd = "2" + currentDay;
  }

  return yyyy + mm + dd;
}

export function getLastMonth() {

}
