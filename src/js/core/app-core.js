/**
 * APP CORE
 * ==================
 * This file manages the application's state, caches DOM elements,
 * and houses core event handlers and selection logic.
 */

// --- GLOBAL APP VARIABLES ---
const DATA_VERSION = 9; // Incremented for UI/UX refactor
let searchWorker;
let searchService;

// --- GLOBAL APPLICATION STATE ---
const state = {
    // Main search state
    activeSuggestionIndex: -1,
    currentSuggestions: [],
    // Area lookup state
    activeLocationSuggestionIndex: -1,
    currentLocationSuggestions: [],
    // UI component state
    activeDrawer: null,
    activeModal: null,
    activePopover: null,
    // User data state
    searchHistory: Utils.storageGet('biller-searchHistory', []),
    settings: {}
};

// --- DOM ELEMENT CACHE ---
const dom = {
    // Search & Main Content
    searchWrapper: document.getElementById('searchWrapper'),
    searchInput: document.getElementById('searchInput'),
    suggestionsList: document.getElementById('suggestionsList'),
    billerCard: document.getElementById('billerCard'),
    locationCard: document.getElementById('locationCard'),
    
    // Header
    appTitle: document.querySelector('.app-title'),
    headerGreeting: document.getElementById('headerGreeting'),
    clockWidget: document.getElementById('clockWidget'),
    directoryBtn: document.getElementById('directoryBtn'),
    toolsBtn: document.getElementById('toolsBtn'),
    
    // Favorites Popover
    favoritesPopoverBtn: document.getElementById('favoritesPopoverBtn'),
    favoritesPopover: document.getElementById('favoritesPopover'),
    favoritesList: document.getElementById('favoritesList'),

    // Area Lookup
    areaLookupContainer: document.getElementById('areaLookupContainer'),
    areaLookupBtn: document.getElementById('areaLookupBtn'),
    areaLookupInput: document.getElementById('areaLookupInput'),
    areaLookupResultsBox: document.getElementById('areaLookupResultsBox'),
    
    // Theme Popover
    themePopoverBtn: document.getElementById('themePopoverBtn'),
    themePopover: document.getElementById('themePopover'),
    themeSelector: document.getElementById('themeSelector'),

    // Settings Popover
    settingsBtn: document.getElementById('settingsBtn'),
    settingsPopover: document.getElementById('settingsPopover'),
    decreaseFontBtn: document.getElementById('decreaseFontBtn'),
    increaseFontBtn: document.getElementById('increaseFontBtn'),
    resetCacheBtn: document.getElementById('resetCacheBtn'),

    // Modals & Drawers are cached after injection in app-main.js

    // Banners & Logs
    notificationBanner: document.getElementById('notificationBanner'),
    debugLog: document.getElementById('debugLog'),
};

// --- CORE LOGIC & EVENT HANDLERS ---

function handleSearchInput() {
    if (state.settings && !state.settings.suggestionsEnabled) {
        UI.Search.clearSuggestions();
        return;
    }
    const query = dom.searchInput.value.trim();
    if (query.length < 1) {
        UI.Search.clearSuggestions();
        return;
    }
    
    if (searchService) {
        const results = searchService.search(query);
        state.currentSuggestions = results.map(result => result.item);
        UI.Search.renderSuggestions(state.currentSuggestions, query);
    }
}

function selectBillerById(id) {
    try {
        const biller = DataHelpers.getBillerById(BILLERS, id);
        if (biller) {
            dom.searchInput.value = biller.name;
            if (dom.areaLookupInput) dom.areaLookupInput.value = '';
            UI.Search.clearSuggestions();
            dom.locationCard.hidden = true;
            UI.BillerCard.display(biller);
            Telemetry.logEvent('biller_view', { tla: biller.tla, biller_id: biller.id });
        } else {
            UI.Notifications.show(`Could not find details for selected biller.`, 'error');
        }
    } catch (error) {
        console.error('Error displaying biller details:', error);
        UI.Notifications.show('An error occurred while displaying biller details.', 'error');
        Telemetry.logError(error, 'selectBillerById');
    }
}

function handleDocumentClick(e) {
    if (dom.searchWrapper && !dom.searchWrapper.contains(e.target)) {
        UI.Search.clearSuggestions();
    }
    if (state.activePopover && !state.activePopover.popover.contains(e.target) && !state.activePopover.button.contains(e.target)) {
        UI.Popovers.closeActive();
    }
    if (dom.areaLookupContainer && dom.areaLookupContainer.classList.contains('lookup-active')) {
        if (!dom.areaLookupContainer.contains(e.target)) {
            LocationFeature.toggleLookup(false);
        }
    }
}

function handleSearchKeydown(e) {
    const { key } = e;
    const suggestionsCount = state.currentSuggestions.length;
    if (suggestionsCount === 0 && key !== 'Enter') return;

    switch (key) {
        case 'ArrowDown': e.preventDefault(); state.activeSuggestionIndex = (state.activeSuggestionIndex + 1) % suggestionsCount; UI.Search.updateActiveSuggestion(); break;
        case 'ArrowUp': e.preventDefault(); state.activeSuggestionIndex = (state.activeSuggestionIndex - 1 + suggestionsCount) % suggestionsCount; UI.Search.updateActiveSuggestion(); break;
        case 'Enter': e.preventDefault(); if (state.activeSuggestionIndex > -1) { selectBillerById(state.currentSuggestions[state.activeSuggestionIndex].id); } else if (state.currentSuggestions.length > 0) { selectBillerById(state.currentSuggestions[0].id); } break;
        case 'Escape': UI.Search.clearSuggestions(); break;
    }
}

function handleSuggestionClick(e) {
    const target = e.target.closest('.suggestion-item');
    if (target && target.dataset.id) {
        Telemetry.logEvent('suggestion_click', { tla: target.querySelector('.suggestion-tla').textContent });
        selectBillerById(target.dataset.id);
    }
}

// --- GLOBAL ERROR HANDLING ---
window.onerror = function(message, source, lineno, colno, error) {
    if (typeof Telemetry !== 'undefined' && Telemetry.logError) {
        Telemetry.logError(error || new Error(message), 'window.onerror', { source, lineno, colno });
    }
    return false;
};

window.onunhandledrejection = function(event) {
    if (typeof Telemetry !== 'undefined' && Telemetry.logError) {
        Telemetry.logError(event.reason, 'window.onunhandledrejection');
    }
};