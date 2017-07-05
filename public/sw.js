console.log("service worker registered");

var CACHE_NAME = 'puewa-v1.0';
var urlsToCache = [
  '/',
  // CSS
  '/src/css/vue-material.css',
  // Images
  '/src/assets/favicon.ico',
  '/src/assets/images/logo-192.png',
  '/src/assets/images/logo-144.png',
  '/src/assets/images/logo-96.png',
  '/src/assets/images/logo-48.png',
  '/src/assets/images/logo.png',
  // JS
  '/src/vendor/firebase.js',
  '/app-init.js',
  '/dist/build.js'
];

self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('cache created');
        return cache.addAll(urlsToCache);
      }).catch(function (err) {
        console.error('cache created error!', err);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
