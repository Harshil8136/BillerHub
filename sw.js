/**
 * SERVICE WORKER
 * ==================
 * This file caches the application's assets, enabling offline functionality
 * and significantly improving performance on repeat visits.
 */

const CACHE_NAME = 'biller-hub-cache-v1';

// List of all the files and assets the application needs to function.
const URLS_TO_CACHE = [
  '/',
  'index.html',

  // Stylesheets
  'src/theme.css',
  'src/styles.css',
  
  // Core Libraries & Data
  'src/fuse.min.js',
  'src/billers.js',
  'src/kb-articles.js',
  'src/locations.js',
  
  // Application Logic
  'src/utils.js',
  'src/data-helpers.js',
  'src/location-feature.js',
  'src/app-core.js',
  'src/app-features.js',
  'src/app-ui.js',

  // External Assets (Fonts & Icons)
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
];

/**
 * Installation Event:
 * This is triggered when the service worker is first installed.
 * It opens a cache and adds all our specified assets to it.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

/**
 * Activation Event:
 * This event is triggered after installation. It's used to clean up
 * any old caches from previous versions of the service worker.
 */
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

/**
 * Fetch Event:
 * This is the core of the service worker's functionality. It intercepts
 * every network request from the application.
 * It checks if the requested asset is in our cache. If it is, it serves
 * the cached version immediately. If not, it fetches it from the network.
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If the response is found in the cache, return it.
        if (response) {
          return response;
        }
        // Otherwise, fetch the request from the network.
        return fetch(event.request);
      })
  );
});