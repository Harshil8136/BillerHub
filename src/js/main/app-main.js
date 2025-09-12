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
        UI.Templates.inject();
        reCacheInjectedDOMElements();

        // Sets telemetry consent to ON by default for first-time users.
        handleTelemetryConsent();
        Telemetry.init();

        if (typeof BILLERS === 'undefined' || BILLERS.length === 0) {
            const errorMsg = "CRITICAL: Biller data failed to load. Application cannot start.";
            console.error(errorMsg);
            UI.Notifications.show(errorMsg, "error");
            Telemetry.logError(new Error(errorMsg));
            return;
        }

        // Initialize all core and UI features
        Clock.init();
        ThemeFeature.init();
        Features.FontSize.init();
        Features.Settings.init();
        LocationFeature.init();
        Features.Favorites.init();
        UI.Header.init();
        UI.Popovers.init();
        UI.Search.init();

        initializeSearchService();
        initializeTitleObserver();

        dom.searchInput.disabled = false;
        dom.searchInput.placeholder = "Search by name or TLA...";
        attachEventListeners();

        const displayName = Utils.storageGet('telemetry-displayName', '');
        if (displayName) {
            UI.Toasts.show(`Welcome back, ${displayName}!`);
        }

        console.log("Biller Hub initialized successfully.");

    } catch (error) {
        console.error("A critical error occurred during initialization:", error);
        UI.Notifications.show("A critical error occurred. Please try resetting the application.", "error");
        if (typeof Telemetry !== 'undefined' && Telemetry.logError) {
            Telemetry.logError(error, 'init');
        }
    }
}

/**
 * Sets telemetry consent to true by default if it has not been set before.
 */
function handleTelemetryConsent() {
    const consent = Utils.storageGet('telemetry-consent');
    if (consent === null) {
        Utils.storageSet('telemetry-consent', true);
    }
}

function reCacheInjectedDOMElements() {
    dom.directoryModal = document.getElementById('directoryModal');
    dom.directoryCloseBtn = document.getElementById('directoryCloseBtn');
    dom.toolsPanel = document.getElementById('toolsPanel');
    dom.toolsPanelTemplate = document.getElementById('toolsPanelTemplate');
}

function initializeSearchService() {
    const useFuse = typeof Fuse !== 'undefined';
    if (useFuse) {
        searchService = new Fuse(BILLERS, { keys: [{ name: 'tla', weight: 0.8 }, { name: 'name', weight: 0.6 }, { name: 'aliases', weight: 0.4 }], includeScore: true, threshold: 0.4, minMatchCharLength: 2 });
    } else {
        searchService = { search: (query) => { const lq = query.toLowerCase(); return BILLERS.filter(b => b.name.toLowerCase().includes(lq) || b.tla.toLowerCase().includes(lq)).map(item => ({ item })); } };
    }
}

function initializeTitleObserver() {
    if (!dom.appTitle) return;
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('has-entered-viewport');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 1.0 });
    observer.observe(dom.appTitle);
}

function attachEventListeners() {
    dom.suggestionsList.addEventListener('click', handleSuggestionClick);
    dom.areaLookupBtn.addEventListener('click', () => LocationFeature.toggleLookup());
    dom.areaLookupInput.addEventListener('input', Utils.debounce(LocationFeature.handleInput.bind(LocationFeature), 200));
    dom.areaLookupInput.addEventListener('keydown', handleAreaLookupKeydown);
    dom.directoryBtn.addEventListener('click', () => UI.Modal.open(dom.directoryModal));
    dom.toolsBtn.addEventListener('click', () => UI.Tools.toggle());

    if (dom.directoryCloseBtn) {
        dom.directoryCloseBtn.addEventListener('click', () => UI.Modal.close(dom.directoryModal));
    }

    if(dom.settingsPopover) {
        dom.settingsPopover.addEventListener('change', (e) => {
            if (e.target.closest('.toggle-switch')) Features.Settings.handleToggle(e);
        });
    }
    if (dom.increaseFontBtn) dom.increaseFontBtn.addEventListener('click', () => Features.FontSize.increase());
    if (dom.decreaseFontBtn) dom.decreaseFontBtn.addEventListener('click', () => Features.FontSize.decrease());
    if (dom.resetCacheBtn) dom.resetCacheBtn.addEventListener('click', () => Features.System.resetApplication);

    const flushBtn = document.getElementById('forceFlushBtn');
    if (flushBtn) {
        flushBtn.addEventListener('click', () => Telemetry.forceFlush());
    }

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleGlobalKeydown);
}

function handleGlobalKeydown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        dom.searchInput.focus();
        dom.searchInput.select();
        return;
    }

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

function handleAreaLookupKeydown(e) {
    const { key } = e;
    const suggestionsCount = state.currentLocationSuggestions.length;
    if (suggestionsCount === 0) return;
    switch (key) {
        case 'ArrowDown': e.preventDefault(); state.activeLocationSuggestionIndex = (state.activeLocationSuggestionIndex + 1) % suggestionsCount; UI.Location.updateActiveSuggestion(); break;
        case 'ArrowUp': e.preventDefault(); state.activeLocationSuggestionIndex = (state.activeLocationSuggestionIndex - 1 + suggestionsCount) % suggestionsCount; UI.Location.updateActiveSuggestion(); break;
        case 'Enter': e.preventDefault(); if (state.activeLocationSuggestionIndex > -1) { const sb = state.currentLocationSuggestions[state.activeLocationSuggestionIndex]; selectBillerById(sb.id); LocationFeature.toggleLookup(false); } break;
    }
}