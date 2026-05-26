const CACHE_NAME = 'v1_cache_mi_web';
const urlsToCache = ['./', './index.html'];

// Instalar el Service Worker y guardar en caché el contenido básico
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Hacer que la app funcione offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          return res; // Devuelve el archivo desde la caché
        }
        return fetch(e.request); // Si no está en caché, lo busca en internet
      })
  );
});