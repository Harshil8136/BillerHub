/**
 * APP MAIN
 * ==================
 * This is the application's main entry point. It orchestrates the initialization
 * of all features, services, and UI components, and attaches all primary
 * event listeners to make the application interactive.
 */

// --- APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', init);

function init() {
    try {
        // 1. Inject HTML templates first so other scripts can find them.
        UI.Templates.inject();
        
        // 2. Re-cache DOM elements that were just injected.
        reCacheInjectedDOMElements();

        // 3. Check for critical data.
        if (typeof BILLERS === 'undefined' || BILLERS.length === 0) {
            console.error("CRITICAL: Biller data failed to load. Application cannot start.");
            UI.Notifications.show("CRITICAL: Biller data failed to load.", "error");
            return;
        }
        console.log(`Biller data loaded successfully with ${BILLERS.length} records.`);
        
        // 4. Initialize all core features.
        Clock.init();
        ThemeFeature.init();
        Features.FontSize.init();
        Features.Settings.init();
        LocationFeature.init();
        Features.Favorites.init();
        Features.Analytics.init();
        UI.Popovers.init();

        // 5. Initialize the search service.
        initializeSearchService();
        
        // 6. Enable UI and attach listeners.
        dom.searchInput.disabled = false;
        dom.searchInput.placeholder = "Search by name or TLA...";
        attachEventListeners();
        console.log("Biller Hub initialized successfully.");

    } catch (error) {
        console.error("A critical error occurred during initialization:", error);
        // CORRECTED: Called the new, correct notification function.
        UI.Notifications.show("A critical error occurred. Please try resetting the application.", "error");
    }
}

/**
 * Updates the `dom` cache with elements that are injected into the page at runtime.
 */
function reCacheInjectedDOMElements() {
    dom.directoryModal = document.getElementById('directoryModal');
    dom.directoryCloseBtn = document.getElementById('directoryCloseBtn');
    dom.toolsPanel = document.getElementById('toolsPanel');
    dom.toolsPanelTemplate = document.getElementById('toolsPanelTemplate');
}

function initializeSearchService() {
    const useFuse = typeof Fuse !== 'undefined';
    if (useFuse) {
        searchService = new Fuse(BILLERS, {
            keys: [{ name: 'tla', weight: 0.8 }, { name: 'name', weight: 0.6 }, { name: 'aliases', weight: 0.4 }],
            includeScore: true,
            threshold: 0.4,
            minMatchCharLength: 2,
        });
    } else {
        searchService = {
            search: (query) => {
                const lowerQuery = query.toLowerCase();
                return BILLERS.filter(b =>
                    b.name.toLowerCase().includes(lowerQuery) ||
                    b.tla.toLowerCase().includes(lowerQuery)
                ).map(item => ({ item }));
            }
        };
    }
}

function attachEventListeners() {
    // Main Search
    dom.searchInput.addEventListener('input', Utils.debounce(handleSearchInput, 150));
    dom.searchInput.addEventListener('keydown', handleSearchKeydown);
    dom.suggestionsList.addEventListener('click', handleSuggestionClick);

    // Area Lookup (Header Integrated)
    dom.areaLookupBtn.addEventListener('click', () => LocationFeature.toggleLookup());
    dom.areaLookupInput.addEventListener('input', Utils.debounce(LocationFeature.handleInput.bind(LocationFeature), 200));

    // Header Buttons
    dom.directoryBtn.addEventListener('click', () => UI.Modal.open(dom.directoryModal));
    dom.toolsBtn.addEventListener('click', () => UI.Tools.toggle());
    
    // Modal & Drawer Close Buttons
    if (dom.directoryCloseBtn) {
        dom.directoryCloseBtn.addEventListener('click', () => UI.Modal.close(dom.directoryModal));
    }
    
    // Settings Controls
    if(dom.settingsPopover) {
        dom.settingsPopover.addEventListener('change', (e) => {
            if (e.target.closest('.toggle-switch')) Features.Settings.handleToggle(e);
        });
    }
    if (dom.increaseFontBtn) dom.increaseFontBtn.addEventListener('click', () => Features.FontSize.increase());
    if (dom.decreaseFontBtn) dom.decreaseFontBtn.addEventListener('click', () => Features.FontSize.decrease());
    if (dom.resetCacheBtn) dom.resetCacheBtn.addEventListener('click', Features.System.resetApplication);
    
    // Global Listeners
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleGlobalKeydown);
}

function handleGlobalKeydown(e) {
    if (e.key === 'Escape') {
        if (state.activeModal) UI.Modal.close(state.activeModal);
        else if (state.activeDrawer) UI.Drawer.close(state.activeDrawer);
        else if (state.activePopover) UI.Popovers.closeActive();
        else if (LocationFeature.isActive) LocationFeature.toggleLookup(false);
        else UI.Search.clearSuggestions();
    }

    const shortcuts = { 'D': dom.directoryBtn, 'W': dom.toolsBtn };
    const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);

    if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        LocationFeature.toggleLookup();
    }

    if (!isTyping && shortcuts[e.key.toUpperCase()]) {
        e.preventDefault();
        shortcuts[e.key.toUpperCase()]?.click();
    }
}