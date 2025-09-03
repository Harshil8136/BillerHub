/**
 * APP MAIN
 * ==================
 * UPDATED: The loadBillerData function now includes all biller-specific
 * note files (like DNE.js) to ensure their data is available to the app.
 *
 * This file is the central orchestrator for the application. It kicks off
 * the initialization sequence and attaches all global event listeners.
 */

// --- GLOBAL DATA CONTAINER ---
let BILLERS = [];

// --- APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', init);

async function init() {
    try {
        Utils.debugLog('Initializing application...');
        Features.Settings.init();
        Features.Theme.init();
        LocationFeature.init();

        dom.searchInput.disabled = true;
        dom.searchInput.placeholder = "Loading data...";

        const [cachedVersion, cachedBillers] = await Promise.all([
            DB.get('data-version'),
            DB.get('billers-cache')
        ]);

        if (cachedVersion === DATA_VERSION && cachedBillers && cachedBillers.length > 0) {
            Utils.debugLog(`Cache is fresh (v${cachedVersion}). Using cached data.`);
            BILLERS = cachedBillers;
            onDataReady();
        } else {
            Utils.debugLog(`Cache is stale (v${cachedVersion}) or missing. Loading from files...`);
            loadBillerData(() => {
                Utils.debugLog(`Saving new data (v${DATA_VERSION}) to cache.`);
                Promise.all([
                    DB.set('billers-cache', BILLERS),
                    DB.set('data-version', DATA_VERSION)
                ]);
                onDataReady();
            });
        }
    } catch (error) {
        console.error("Fatal error during application initialization:", error);
        Utils.debugLog(`FATAL: ${error.message}`);
        document.body.innerHTML = `<div style="padding: 2rem; text-align: center;"><h1>Application Error</h1><p>Something went wrong. Please check the console.</p></div>`;
    }
}

function onDataReady() {
    Utils.debugLog(`Data ready. Initializing UI with ${BILLERS.length} records...`);

    const isFileProtocol = location.protocol === 'file:';
    const canUseWorker = !isFileProtocol && window.Worker;

    if (canUseWorker) {
        Utils.debugLog('Initializing search worker...');
        try {
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
        } catch (error) {
            console.error("Failed to initialize search worker:", error);
            Utils.debugLog(`ERROR: Worker init failed. ${error.message}`);
            searchWorker = null;
            dom.searchInput.disabled = false;
            dom.searchInput.placeholder = "Search is unavailable.";
        }
    } else {
        Utils.debugLog('Using main-thread search fallback.');
        if (isFileProtocol) console.warn("Running on file:// protocol. Using main-thread search.");

        const useFuse = typeof Fuse !== 'undefined';
        if (useFuse) {
            searchService = new Fuse(BILLERS, { keys: [{ name: 'tla', weight: 0.8 }, { name: 'name', weight: 0.6 }], threshold: 0.4 });
        } else {
            searchService = { search: (query) => BILLERS.filter(b => b.name.toLowerCase().includes(query.toLowerCase()) || b.tla.toLowerCase().includes(query.toLowerCase())).map(item => ({ item })) };
        }
        dom.searchInput.disabled = false;
        dom.searchInput.placeholder = "Search by name, TLA, or alias...";
    }

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

    dom.favoritesBtn.addEventListener('click', () => UI.Favorites.toggleVisibility());
    dom.directoryBtn.addEventListener('click', () => UI.Modal.open(dom.directoryModal));
    dom.directoryCloseBtn.addEventListener('click', () => UI.Modal.close(dom.directoryModal));
    dom.toolsBtn.addEventListener('click', () => UI.Tools.toggle());
    dom.settingsBtn.addEventListener('click', () => UI.Popover.toggle(dom.settingsPopover, dom.settingsBtn));

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleGlobalKeydown);

    dom.settingsPopover.addEventListener('change', (e) => {
        if (e.target.closest('.toggle-switch')) Features.Settings.handleToggle(e);
    });
}

function handleGlobalKeydown(e) {
    if (e.key === 'Escape') {
        if (state.activeModal) UI.Modal.close(state.activeModal);
        else if (state.activeDrawer) UI.Drawer.close(state.activeDrawer);
        else if (state.activePopover) UI.Popover.close(state.activePopover.popover, state.activePopover.button);
        else UI.clearSuggestions();
    }

    const shortcuts = { 'F': dom.favoritesBtn, 'D': dom.directoryBtn, 'W': dom.toolsBtn };
    const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
    if (!isTyping && shortcuts[e.key.toUpperCase()]) {
        e.preventDefault();
        shortcuts[e.key.toUpperCase()]?.click();
    }
}

function loadBillerData(callback) {
    const scriptsToLoad = [
        // Biller Data Shards
        './src/js/data/billers-a-c.js',
        './src/js/data/billers-d-f.js',
        // Biller-Specific Note Files
        './src/live/BGE.js',
        './src/live/CEMI.js',
        './src/live/NSRC.js',
        './src/live/DNE.js'
    ];
    let loadedCount = 0;

    const onAllScriptsProcessed = () => {
        Utils.debugLog('All data scripts processed.');
        if (BILLERS.length > 0) {
            callback();
        } else {
            console.error("CRITICAL: Failed to load any biller data. Application cannot start.");
            Utils.debugLog('ERROR: Failed to load biller data from files.');
            UI.showNotification("Critical error: Could not load biller data.", "error");
            dom.searchInput.placeholder = "Data loading failed.";
        }
    };

    if (scriptsToLoad.length === 0) {
        onAllScriptsProcessed();
        return;
    }

    scriptsToLoad.forEach(scriptUrl => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = () => {
            loadedCount++;
            if (loadedCount === scriptsToLoad.length) onAllScriptsProcessed();
        };
        script.onerror = () => {
            console.error(`Failed to load data script: ${scriptUrl}`);
            loadedCount++;
            if (loadedCount === scriptsToLoad.length) onAllScriptsProcessed();
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