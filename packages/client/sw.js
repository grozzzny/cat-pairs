const CACHE_NAME= 'cat-coders-cache-offline-v1'; 

const URLS = [
  '/',
  '/index.html',
  ...Array.from({ length: 34 }).map((_, index) => `public/images/cards/card-${index+1}.jpg`),
  'public/avatar.png',
  'public/bg.svg',
  'public/crown.svg',
  'public/exit.svg',
  'public/vite.svg',
  'public/about-us.svg',
  'public/cat-background.png',
  'public/forum.svg',
  'public/leaderboard.svg',
  'public/images/cards/card-back-dark.jpg',
  'public/images/cards/card-back-light.jpg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] adding static files');
        cache.addAll(URLS);
      }));
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      if (event.request.method !== 'GET') {
        return await fetch(event.request);
      }
      try {
        const response = await fetch(event.request);
  
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, response.clone());
  
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
