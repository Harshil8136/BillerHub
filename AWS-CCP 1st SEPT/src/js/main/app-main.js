/**
 * APP MAIN
 * ==================
 * This file is the central orchestrator for the application. It kicks off
 * the initialization sequence and attaches all global event listeners.
 */

// --- GLOBAL DATA CONTAINER ---
let BILLERS = [];

// --- APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', init);

/**
 * Main initialization function.
 * UPDATED: Refactored to use a .then() promise chain for greater robustness.
 * This prevents the app from stalling on the initial database check.
 */
function init() {
    try {
        console.log("Ultimate Biller Hub initializing...");
        // Initialize components that don't depend on biller data
        Features.Settings.init();
        LocationFeature.init();
        UI.Theme.init();
        
        dom.searchInput.disabled = true;
        dom.searchInput.placeholder = "Loading data...";

        // 1. TRY TO GET DATA FROM INDEXEDDB FIRST
        DB.get('billers-cache')
          .then(cachedBillers => {
            if (cachedBillers && cachedBillers.length > 0) {
                console.log("Loaded billers from IndexedDB cache.");
                BILLERS = cachedBillers;
                onDataReady(); // Data is ready, initialize the rest of the app
            } else {
                console.log("No cache found. Loading billers from files...");
                // 2. FALLBACK TO LOADING FROM FILES
                loadBillerData(() => {
                    // 3. SAVE TO INDEXEDDB FOR NEXT TIME
                    console.log("Saving billers to IndexedDB for next visit.");
                    DB.set('billers-cache', BILLERS);
                    onDataReady(); // Data is now ready
                });
            }
          })
          .catch(error => {
            console.error("IndexedDB check failed. Falling back to loading from files.", error);
            // If the database fails for any reason, load from files as a fallback.
            loadBillerData(onDataReady);
          });

    } catch (error) {
        console.error("Fatal error during application initialization:", error);
        document.body.innerHTML = `<div style="padding: 2rem; text-align: center;"><h1>Application Error</h1><p>Something went wrong. Please check the console.</p></div>`;
    }
}

/**
 * Continues app initialization after all biller data is ready.
 * This function initializes the search worker and the rest of the UI.
 */
function onDataReady() {
    console.log(`Biller data ready. Total records: ${BILLERS.length}. Initializing search worker...`);
    
    if (window.Worker) {
        searchWorker = new Worker('./src/js/workers/search.worker.js');
        
        searchWorker.onmessage = (event) => {
            const { type, payload } = event.data;
            if (type === 'READY') {
                console.log("Search worker is ready.");
                dom.searchInput.disabled = false;
                dom.searchInput.placeholder = "Search by name, TLA, or alias...";
            } else if (type === 'RESULTS') {
                state.currentSuggestions = payload;
                UI.renderSuggestions(state.currentSuggestions, dom.searchInput.value.trim());
            }
        };

        searchWorker.postMessage({
            type: 'INIT',
            payload: {
                billers: BILLERS,
                fusePath: './src/js/lib/fuse.min.js'
            }
        });
    } else {
        console.error("Web Workers not supported. Search will not be available.");
        dom.searchInput.placeholder = "Search unavailable in this browser.";
    }

    // Initialize remaining UI components and features
    UI.Modal.open(dom.directoryModal); // Pre-warm the virtual list
    UI.Modal.close(dom.directoryModal);
    Features.Favorites.init();
    Features.Analytics.init();
    Utils.onOfflineStatusChange(UI.updateOfflineIndicator);
    
    attachEventListeners();
    console.log("Ultimate Biller Hub initialized successfully.");
}

function attachEventListeners() {
    dom.searchInput.addEventListener('input', Utils.debounce(handleSearchInput, 150));
    dom.searchInput.addEventListener('keydown', handleSearchKeydown);
    dom.suggestionsList.addEventListener('click', handleSuggestionClick);
    
    dom.locationInput.addEventListener('input', Utils.debounce(LocationFeature.handleInput.bind(LocationFeature), 200));
    dom.locationInput.addEventListener('keydown', (e) => LocationFeature.handleKeydown(e));
    dom.locationSuggestionsList.addEventListener('click', (e) => LocationFeature.handleSuggestionClick(e));

    dom.themeToggleBtn.addEventListener('click', () => UI.Theme.toggle());
    dom.favoritesBtn.addEventListener('click', () => UI.Favorites.toggleVisibility());
    dom.directoryBtn.addEventListener('click', () => UI.Modal.open(dom.directoryModal));
    dom.directoryCloseBtn.addEventListener('click', () => UI.Modal.close(dom.directoryModal));
    dom.toolsBtn.addEventListener('click', () => UI.Tools.toggle());
    dom.settingsBtn.addEventListener('click', () => UI.Popover.toggle(dom.settingsPopover, dom.settingsBtn));
    
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleGlobalKeydown);
    
    dom.settingsPopover.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') Features.Settings.handleToggle(e);
    });
}

function handleGlobalKeydown(e) {
    if (e.key === 'Escape') {
        if (state.activeModal) UI.Modal.close(state.activeModal);
        else if (state.activeDrawer) UI.Drawer.close(state.activeDrawer);
        else if (state.activePopover) UI.Popover.close(state.activePopover.popover, state.activePopover.button);
        else UI.clearSuggestions();
    }
    
    const shortcuts = { 'T': dom.themeToggleBtn, 'F': dom.favoritesBtn, 'D': dom.directoryBtn, 'W': dom.toolsBtn };
    const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
    if (!isTyping && shortcuts[e.key.toUpperCase()]) {
        e.preventDefault();
        shortcuts[e.key.toUpperCase()].click();
    }
}

function loadBillerData(callback) {
    const shards = [
        './src/js/data/billers-a-c.js',
        './src/js/data/billers-d-f.js',
    ];
    let loadedCount = 0;

    if (shards.length === 0) {
        callback();
        return;
    }

    shards.forEach(shardUrl => {
        const script = document.createElement('script');
        script.src = shardUrl;
        script.onload = () => {
            loadedCount++;
            if (loadedCount === shards.length) {
                callback();
            }
        };
        script.onerror = () => {
            console.error(`Failed to load data shard: ${shardUrl}`);
            loadedCount++;
            if (loadedCount === shards.length) {
                callback();
            }
        };
        document.head.appendChild(script);
    });
}

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator && (location.protocol === 'http:' || location.protocol === 'https:')) {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => console.log('ServiceWorker registration successful.'))
      .catch(error => console.log('ServiceWorker registration failed: ', error));
  } else {
    console.warn('Service Worker not registered (not supported or running on file://).');
  }
});