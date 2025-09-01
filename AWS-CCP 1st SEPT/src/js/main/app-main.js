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
 * This has been hardened to be "bulletproof", handling failures at every
 * asynchronous step (DB, file loading) to prevent the app from stalling.
 */
function init() {
    try {
        Utils.debugLog('Initializing application...');
        Features.Settings.init();
        LocationFeature.init();
        UI.Theme.init();
        
        dom.searchInput.disabled = true;
        dom.searchInput.placeholder = "Loading data...";

        Utils.debugLog('Checking IndexedDB for cached billers...');
        DB.get('billers-cache')
          .then(cachedBillers => {
            if (cachedBillers && cachedBillers.length > 0) {
                Utils.debugLog('Cache hit. Using cached data.');
                BILLERS = cachedBillers;
                onDataReady();
            } else {
                Utils.debugLog('Cache miss. Loading from files...');
                loadBillerData(); // This now calls onDataReady internally
            }
          })
          .catch(error => {
            Utils.debugLog('DB check failed. Falling back to files.');
            console.error("IndexedDB check failed. Falling back to loading from files.", error);
            loadBillerData(); // Fallback if DB is inaccessible
          });

    } catch (error) {
        console.error("Fatal error during application initialization:", error);
        Utils.debugLog(`FATAL: ${error.message}`);
        document.body.innerHTML = `<div style="padding: 2rem; text-align: center;"><h1>Application Error</h1><p>Something went wrong. Please check the console.</p></div>`;
    }
}

/**
 * Continues app initialization after all biller data is ready.
 * UPDATED: Worker initialization is now wrapped in a try-catch block.
 */
function onDataReady() {
    Utils.debugLog(`Data ready. Initializing UI with ${BILLERS.length} records...`);
    
    try {
        if (window.Worker) {
            Utils.debugLog('Initializing search worker...');
            searchWorker = new Worker('./src/js/workers/search.worker.js');
            
            searchWorker.onmessage = (event) => {
                try {
                    const { type, payload } = event.data;
                    if (type === 'READY') {
                        Utils.debugLog('Worker is ready.');
                        console.log("Search worker is ready.");
                        dom.searchInput.disabled = false;
                        dom.searchInput.placeholder = "Search by name, TLA, or alias...";
                    } else if (type === 'RESULTS') {
                        state.currentSuggestions = payload;
                        UI.renderSuggestions(state.currentSuggestions, dom.searchInput.value.trim());
                    }
                } catch(error) {
                    console.error("Error processing message from worker:", error);
                    UI.showNotification("An error occurred during search.", "error");
                }
            };

            searchWorker.postMessage({
                type: 'INIT',
                payload: { billers: BILLERS, fusePath: './src/js/lib/fuse.min.js' }
            });
        } else {
            throw new Error("Web Workers not supported in this browser.");
        }
    } catch (error) {
        console.error("Failed to initialize search worker:", error);
        Utils.debugLog(`ERROR: Worker init failed. ${error.message}`);
        searchWorker = null;
        dom.searchInput.disabled = false;
        dom.searchInput.placeholder = "Search is unavailable.";
    }

    // Initialize remaining UI components and features
    UI.Modal.open(dom.directoryModal);
    UI.Modal.close(dom.directoryModal);
    Features.Favorites.init();
    Features.Analytics.init();
    Utils.onOfflineStatusChange(UI.updateOfflineIndicator);
    
    attachEventListeners();
    console.log("Ultimate Biller Hub initialized successfully.");
    Utils.debugLog('Initialization complete.');
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

/**
 * Dynamically loads all biller data shards.
 * UPDATED: Now calls onDataReady internally and handles the case where no data is loaded.
 */
function loadBillerData() {
    const shards = [
        './src/js/data/billers-a-c.js',
        './src/js/data/billers-d-f.js',
    ];
    let loadedCount = 0;

    const onAllShardsProcessed = () => {
        Utils.debugLog('All data shards processed.');
        if (BILLERS.length > 0) {
            console.log("Saving billers to IndexedDB for next visit.");
            DB.set('billers-cache', BILLERS);
            onDataReady();
        } else {
            console.error("CRITICAL: Failed to load any biller data. Application cannot start.");
            Utils.debugLog('ERROR: Failed to load biller data from files.');
            UI.showNotification("Critical error: Could not load biller data.", "error");
            dom.searchInput.placeholder = "Data loading failed.";
        }
    };

    if (shards.length === 0) {
        onAllShardsProcessed();
        return;
    }

    shards.forEach(shardUrl => {
        const script = document.createElement('script');
        script.src = shardUrl;
        script.onload = () => {
            loadedCount++;
            if (loadedCount === shards.length) {
                onAllShardsProcessed();
            }
        };
        script.onerror = () => {
            console.error(`Failed to load data shard: ${shardUrl}`);
            loadedCount++;
            if (loadedCount === shards.length) {
                onAllShardsProcessed();
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
