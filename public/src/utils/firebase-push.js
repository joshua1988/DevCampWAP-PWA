
function sendDeviceKeytoFirebase(userEmail, deviceKey) {
  return db.ref('users/' + userEmail).set({
    deviceKey: deviceKey,
    time: getCurrentTime()
  }).then(function () {
    console.log("The key has been sent to Firebase DB");
  }).catch(function () {
    console.error('Sending a key to server has been failed');
  });
}

function removeDeviceKeyInFirebase(userEmail, deviceKey) {

}

function getCurrentTime() {
  return new Date().toLocaleString();
}


export function updateSubscriptionOnServer(userEmail, subscription, isSubscribed) {
  var deviceKey = subscription.endpoint.split('send/')[1];

  if (isSubscribed) {
    sendDeviceKeytoFirebase(userEmail, deviceKey);
  } else {
    removeDeviceKeyInFirebase(userEmail, deviceKey);
  }

  return console.log(subscription);
};
