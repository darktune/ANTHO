const CACHE_NAME = 'antho-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/images/logos/antho-emblem-dark.png',
  '/images/logo.png',
  '/images/logos/antho-wordmark-white.png',
  '/images/logos/antho-wordmark-gold.png'
];

// Install: pre-cache critical shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache non-fatal warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean up old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: smart caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and cross-origin external APIs (e.g. Paystack)
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  // Skip API routes to avoid caching dynamic server responses
  if (url.pathname.startsWith('/api/')) return;

  // Images & Static Media: Cache First, Network Fallback
  if (
    request.destination === 'image' ||
    url.pathname.startsWith('/images/') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.JPG') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.svg')
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          return cached || new Response('', { status: 408 });
        }
      })
    );
    return;
  }

  // HTML / Page Navigations: Network First with Cache Fallback (Stale-While-Revalidate)
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const rootCached = await caches.match('/');
          if (rootCached) return rootCached;
          return new Response(
            '<html><body style="background:#0a0a0a;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;"><div style="text-align:center;"><h2>ANTHO &bull; OFFLINE ARCHIVE</h2><p style="color:#a8a29e;">No active connection detected. Please reconnect to view live drops.</p></div></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // Scripts, Styles & Fonts: Cache-first with background revalidation
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
