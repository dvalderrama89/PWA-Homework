importScripts('serviceworker-cache-polyfill.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const queue = new workbox.backgroundSync.Queue('budgetQueue');

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
)});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'POST') {
      return;
    }
  
    const bgSyncLogic = async () => {
      try {
        const response = await fetch(event.request.clone());
        return response;
      } catch (error) {
        await queue.pushRequest({request: event.request});
        return error;
      }
    };
  
    event.respondWith(bgSyncLogic());
  });