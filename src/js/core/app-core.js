/**
 * APP CORE
 * ==================
 * This file manages the application's state, caches DOM elements,
 * and houses core event handlers and selection logic.
 */

// --- GLOBAL APP VARIABLES ---
const DATA_VERSION = 7; // Incremented for UI/UX refactor
let searchWorker;
let searchService;

// --- GLOBAL APPLICATION STATE ---
const state = {
    activeSuggestionIndex: -1,
    currentSuggestions: [],
    activeDrawer: null,
    activeModal: null,
    activePopover: null,
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

    // Modals & Drawers
    directoryModal: document.getElementById('directoryModal'),
    directoryCloseBtn: document.getElementById('directoryCloseBtn'),
    toolsPanel: document.getElementById('toolsPanel'),
    toolsPanelTemplate: document.getElementById('toolsPanelTemplate'),

    // Analytics & Banners
    analyticsDiv: document.getElementById('analyticsDiv'),
    analyticsChart: document.getElementById('analyticsChart'),
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
    
    if (searchWorker) {
        searchWorker.postMessage({ type: 'SEARCH', payload: { query } });
    } else if (searchService) {
        const results = searchService.search(query);
        const minimalResults = results.map(result => result.item);
        state.currentSuggestions = minimalResults;
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
            Features.Analytics.logBillerView(biller);
        } else {
            console.warn(`Biller with ID "${id}" not found.`);
            UI.Notifications.show(`Could not find details for the selected biller.`, 'error');
        }
    } catch (error) {
        console.error('Error displaying biller details:', error);
        UI.Notifications.show('An error occurred while displaying biller details.', 'error');
    }
}

function handleDocumentClick(e) {
    // Close search suggestions if click is outside the search wrapper
    if (dom.searchWrapper && !dom.searchWrapper.contains(e.target)) {
        UI.Search.clearSuggestions();
    }
    
    // Close any active popover if click is outside of it
    if (state.activePopover && !state.activePopover.popover.contains(e.target)) {
        UI.Popovers.closeActive();
    }
    
    // Close area lookup if it's open and the click is outside its container
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
        case 'ArrowDown':
            e.preventDefault();
            state.activeSuggestionIndex = (state.activeSuggestionIndex + 1) % suggestionsCount;
            UI.Search.updateActiveSuggestion();
            break;
        case 'ArrowUp':
            e.preventDefault();
            state.activeSuggestionIndex = (state.activeSuggestionIndex - 1 + suggestionsCount) % suggestionsCount;
            UI.Search.updateActiveSuggestion();
            break;
        case 'Enter':
            e.preventDefault();
            if (state.activeSuggestionIndex > -1) {
                selectBillerById(state.currentSuggestions[state.activeSuggestionIndex].id);
            } else if (state.currentSuggestions.length > 0) {
                selectBillerById(state.currentSuggestions[0].id);
            }
            break;
        case 'Escape':
            UI.Search.clearSuggestions();
            break;
    }
}

function handleSuggestionClick(e) {
    const target = e.target.closest('.suggestion-item');
    if (target && target.dataset.id) {
        selectBillerById(target.dataset.id);
    }
}