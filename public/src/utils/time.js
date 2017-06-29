// Get today's date in yymmhh format
export function getCurrentDate() {
  var rightNow = new Date();
  return rightNow.toISOString().slice(0,10).replace(/-/g,"");
};
