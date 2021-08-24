importScripts('serviceworker-cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('budgetTracker').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.js',
       '/styles.css',
       '/icons/icon-192x192.png',
       '/icons/icon-512x512.png'
     ]);
   })
 );
});