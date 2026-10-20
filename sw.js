/* YMF Spanish — service worker
   Cada vez que agregues ejercicios o cambies archivos, sube el número de VERSION
   para que los teléfonos descarguen la versión nueva. */
const VERSION = 'ymf-v7';
const FONTS = 'ymf-fonts';

importScripts('data.js'); // trae EXERCISES para precargar los ejercicios locales

const SHELL = [
  './', 'index.html', 'privacy.html', 'app.js', 'data.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png',
];
const LOCAL_EXERCISES = EXERCISES.filter(e => e.local).map(e => e.local);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION)
      // cache: 'reload' = siempre baja la versión nueva del servidor, no la que el navegador guardó
      .then(c => c.addAll([...SHELL, ...new Set(LOCAL_EXERCISES)].map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts: usa caché y actualiza en segundo plano
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONTS).then(async cache => {
        const hit = await cache.match(req);
        const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') cache.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  // Archivos propios de la app: primero caché, si no, red
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
        if (res.ok) caches.open(VERSION).then(c => c.put(req, res.clone()));
        return res;
      }).catch(() => req.mode === 'navigate' ? caches.match('index.html') : Response.error()))
    );
  }
  // Todo lo demás (ejercicios en GitHub Pages) va directo a internet
});
