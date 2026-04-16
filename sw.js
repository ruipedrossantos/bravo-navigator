// BRAVO Navigator — Service Worker
// Permite funcionamento offline após primeira visita

const CACHE = 'bravo-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.css',
  'https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  // Never cache map tiles (too many, too big) — use network only
  if (request.url.includes('arcgisonline.com') || request.url.includes('tile.openstreetmap.org')) {
    return;
  }
  e.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((res) => {
      if (res && res.status === 200 && request.method === 'GET') {
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put(request, clone).catch(() => {}));
      }
      return res;
    }).catch(() => cached))
  );
});
