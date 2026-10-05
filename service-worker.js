const CACHE_NAME = "serenia-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./psychology.png",
  "./psychology-192.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith("serenia-") && cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

async function cacheResponse(request, response) {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  } catch (error) {
    console.warn("No se pudo guardar un recurso en caché:", request.url, error);
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cacheResponse(request, response);
        }
        return response;
      } catch (error) {
        const cachedPage = await caches.match(request);
        if (cachedPage) {
          return cachedPage;
        }

        const appShell = await caches.match("./index.html");
        if (appShell) {
          return appShell;
        }

        throw error;
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(request);
    if (response.ok || response.type === "opaque") {
      await cacheResponse(request, response);
    }
    return response;
  })());
});
