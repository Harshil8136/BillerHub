/**
 * SERVICE WORKER
 * ==================
 * This file caches the application's assets, enabling offline functionality
 * and significantly improving performance on repeat visits.
 */

// UPDATED: Cache name incremented to v3 to force asset refresh for all users.
const CACHE_NAME = 'biller-hub-cache-v3';

// UPDATED: Added SVG assets to the cache list for full offline support.
const URLS_TO_CACHE = [
  '/',
  'index.html',

  // Stylesheets
  'src/css/theme.css',
  'src/css/styles.css',
  'src/css/notes.css',
  
  // Core Libraries & Data
  'src/js/lib/fuse.min.js',
  'src/js/data/kb-articles.js',
  'src/js/data/locations.js',
  
  // Application Logic
  'src/js/core/utils.js',
  'src/js/core/app-core.js',
  'src/js/core/data-helpers.js',
  'src/js/core/db.js',
  'src/js/core/virtual-list.js',
  'src/js/features/location-feature.js',
  'src/js/features/notes-feature.js',
  'src/js/features/app-features.js',
  'src/js/ui/ui-notes.js',
  'src/js/ui/ui-components.js',
  'src/js/main/app-main.js',
  'src/js/workers/search.worker.js',

  // Biller-specific notes
  'src/live/BGE.js',

  // SVG Assets for Payment Logos
  'src/assets/svg/ach.svg',
  'src/assets/svg/amex.svg',
  'src/assets/svg/discover.svg',
  'src/assets/svg/mastercard.svg',
  'src/assets/svg/visa.svg',

  // External Assets (Icons)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
];

/**
 * Installation Event:
 * Caches all specified application assets.
 */
self.addEventListener('install', (event) => {
  // Use skipWaiting to ensure the new service worker activates immediately.
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and caching assets for v3');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

/**
 * Activation Event:
 * Cleans up old caches from previous versions.
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
    }).then(() => self.clients.claim()) // Take control of all pages immediately
  );
});

/**
 * Fetch Event:
 * Intercepts network requests and serves assets from the cache first (cache-first strategy).
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});