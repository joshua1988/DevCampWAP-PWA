export function getUserLocation() {
  var data = {};
  navigator.geolocation.getCurrentPosition(function(position) {
    data = position.coords;
    // geoLocation.currentLocation = position.coords
    // geoLocation.currentLocationLon = position.coords.longitude
    // geoLocation.currentLocationLat = position.coords.latitude
    console.log(data);
  }.bind(this));
  return data;
};

export var geoLocation = {
  currentLocation: null,
  currentLocationLat: null,
  currentLocationLon: null
};

export function getGangnamObj(obj) {
  for (var key in obj) {

  }
};
