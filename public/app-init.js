// Initialize Firebase
var config = {
  apiKey: "AIzaSyCVp8hvtSBVyirMt8RPNe64zx8-RtMKzU0",
  authDomain: "devcamp-firebase-52bee.firebaseapp.com",
  databaseURL: "https://devcamp-firebase-52bee.firebaseio.com",
  projectId: "devcamp-firebase-52bee",
  storageBucket: "devcamp-firebase-52bee.appspot.com",
  messagingSenderId: "654139255262"
};
firebase.initializeApp(config);

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
