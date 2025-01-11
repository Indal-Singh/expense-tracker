const CACHE_NAME = 'expense-tracker-cache-v1';
const CACHE_URLS = [
  '/',
  '/login',
  '/register',
  '/images/icons/android-chrome-192x192.png',
  '/images/icons/android-chrome-512x512.png',
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
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Return cached response if available
        if (cachedResponse) {
          return cachedResponse;
        }
  
        // Otherwise, fetch from the network
        return fetch(event.request).then((networkResponse) => {
          // If the response is valid, clone it before caching
          if (networkResponse && networkResponse.status === 200 && networkResponse.type !== 'opaque') {
            const clonedResponse = networkResponse.clone(); // Clone response here
  
            // Open the cache and put the cloned response
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clonedResponse);
            });
          }
  
          // Return the network response to the browser
          return networkResponse;
        });
      })
    );
  });
  
  
