const CACHE_NAME = 'serenia-vr-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './psychology-192.png',
  './psychology.png',
  './js/aframe.min.js',
  './js/aframe-event-set-component.min.js',
  './js/app.js',
  './assets/espacio.jpg',
  './assets/bosque.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).catch((error) => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        throw error;
      });
    })
  );
});
