/**
 * SERVICE WORKER
 * ==================
 * This file caches the application's assets, enabling offline functionality
 * and significantly improving performance on repeat visits.
 *
 * UPDATED: The cache version has been incremented to v10 to reflect the
 * major UI refactor, including the new Tools menu and the removal of the
 * search worker. The asset list is now fully synchronized with the new
 * file structure.
 */

const CACHE_NAME = 'biller-hub-cache-v10';

const URLS_TO_CACHE = [
  // --- Core App Shell ---
  '/',
  'index.html',

  // --- Icon Assets ---
  'icon/favicon.ico',
  'icon/favicon.svg',
  'icon/favicon.png',
  'icon/favicon-32x32.png',
  'icon/favicon-16x16.png',
  'assets/apple-touch-icon.png',

  // --- Stylesheets ---
  'src/css/theme.css',
  'src/css/themes.css',
  'src/css/base.css',
  'src/css/header.css',
  'src/css/location.css',
  'src/css/search.css',
  'src/css/biller-card.css',
  'src/css/notes.css',
  'src/css/popover.css',
  'src/css/tool-menu.css',
  'src/css/modal.css',
  'src/css/drawer.css',
  'src/css/forms.css',
  'src/css/sidebar.css',
  'src/css/toast.css',
  'src/css/title-effects.css',
  'src/css/fee-tool.css',
  
  // --- Core Libraries ---
  'src/js/lib/fuse.min.js',
  
  // --- Data Files ---
  'src/js/data/theme-data.js',
  'src/js/data/kb-articles.js',
  'src/js/data/tools-data.js',
  'src/js/data/locations.js',
  'src/js/data/biller-data-na-east.js',
  'src/js/data/biller-data-na-central.js',
  'src/js/data/biller-data-na-west.js',
  
  // --- Core App Logic ---
  'src/js/core/utils.js',
  'src/js/core/db.js',
  'src/js/core/data-helpers.js',
  'src/js/core/anim.js',
  'src/js/core/virtual-list.js',
  'src/js/core/firebase-config.js',
  'src/js/core/telemetry-core.js',
  'src/js/core/app-core.js',
  
  // --- Feature Logic ---
  'src/js/features/clock.js',
  'src/js/features/theme-feature.js',
  'src/js/features/location-feature.js',
  'src/js/features/notes-feature.js',
  'src/js/features/app-features.js',
  
  // --- UI Logic ---
  'src/js/ui/ui-main.js',
  'src/js/ui/ui-templates.js',
  'src/js/ui/ui-notifications.js',
  'src/js/ui/ui-settings.js',
  'src/js/ui/ui-analytics.js',
  'src/js/ui/ui-toasts.js',
  'src/js/ui/ui-biller-card.js',
  'src/js/ui/ui-search.js',
  'src/js/ui/ui-modal.js',
  'src/js/ui/ui-drawer.js',
  'src/js/ui/ui-favorites.js',
  'src/js/ui/ui-location.js',
  'src/js/ui/ui-tool-menu.js',
  'src/js/ui/ui-kb-modal.js',
  'src/js/ui/ui-fee-tool.js',
  'src/js/ui/ui-themes.js',
  'src/js/ui/ui-notes.js',
  'src/js/ui/ui-popovers.js',

  // --- Biller-Specific Note Files ---
  'src/live/AETX.js', 'src/live/AWK.js', 'src/live/BGE.js', 'src/live/CEMI.js',
  'src/live/CEB.js', 'src/live/COMD.js', 'src/live/DCN3.js', 'src/live/DNE.js',
  'src/live/DUQL.js', 'src/live/GRIN.js', 'src/live/HAWE.js', 'src/live/HOIG.js',
  'src/live/HWFL.js', 'src/live/HYD1.js', 'src/live/JMIC.js', 'src/live/KNOX.js',
  'src/live/NSRC.js', 'src/live/NYCH.js', 'src/live/OPPD.js', 'src/live/OTPC.js',
  'src/live/PAC.js', 'src/live/PHI.js', 'src/live/PPL.js', 'src/live/PSG.js',
  'src/live/PSE.js', 'src/live/SDG.js', 'src/live/TGXH.js', 'src/live/WMPT.js',
  
  // --- Main Application ---
  'src/js/main/app-main.js',

  // --- External CDN Assets ---
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.1/gsap.min.js',
];

/**
 * Installation Event:
 * Caches all specified application assets.
 */
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log(`[SW] Opened cache: ${CACHE_NAME}`);
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
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

/**
 * Fetch Event:
 * Intercepts network requests and serves assets from the cache first.
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
