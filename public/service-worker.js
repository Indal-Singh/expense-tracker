const CACHE_NAME = 'expense-tracker-cache-v6';
const CACHE_URLS = [
  '/images/icons/android-chrome-192x192.png',
  '/images/icons/android-chrome-512x512.png',
//   '/js/main.js',
  // Add other assets (CSS, JS files, etc.) that you want to cache
];

// Install event: Caching assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_URLS);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Serve cached content or fetch from the network
self.addEventListener('fetch', (event) => {
    // Exclude caching for any requests starting with /api
    if (event.request.url.includes('/api')) {
      // For /api requests, always fetch from the network (don't cache)
      event.respondWith(fetch(event.request));
      return;
    }
  
    // Otherwise, proceed with caching GET requests
    if (event.request.method === 'GET') {
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse; // Serve from cache if available
          }
  
          // Fetch from the network and cache the response
          return fetch(event.request).then((networkResponse) => {
            // If the network response is valid, clone and cache it
            if (networkResponse && networkResponse.status === 200 && networkResponse.type !== 'opaque') {
              const clonedResponse = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, clonedResponse); // Cache the response
              });
            }
            return networkResponse; // Return the network response
          });
        })
      );
    } else {
      // For POST or other methods, just fetch from the network without caching
      event.respondWith(fetch(event.request));
    }
  });  
