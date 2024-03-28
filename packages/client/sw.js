const CACHE_NAME_STATIC = 'cat-coders-cache-static-v1'; 
const CACHE_NAME_DYNAMIC = 'cat-coders-cache-dynamic-v1';

const API_HOST = 'https://ya-praktikum.tech/api/v2';

const URLS = [
  '/',
  '/index.html',
  ...Array.from({ length: 34 }).map((_, index) => `/public/images/cards/card-${index+1}.jpg`),
  '/avatar.png',
  '/public/bg.svg',
  '/public/crown.svg',
  '/public/exit.svg',
  '/public/vite.svg',
  '/src/assets/about-us.svg',
  '/src/assets/cat-background.png',
  '/src/assets/forum.svg',
  '/src/assets/leaderboard.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME_STATIC)
      .then(cache => {
        console.log('[Service Worker] adding static files');
        cache.addAll(URLS);
      }));

  event.waitUntil(
    caches.open(CACHE_NAME_DYNAMIC)
      .then(() => {
        console.log('[Service Worker] adding dynamic files');
      }));
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith(API_HOST)) {
    return;
  }
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(event.request);
  
        const cache = await caches.open(CACHE_NAME_DYNAMIC);
        cache.put(event.request, response.clone());
  
        return response;
      } catch (error) {

        const cachedResponse = await caches.match(event.request);

        if (cachedResponse) {
          return cachedResponse;
        }
      }
    })()
  );
});
