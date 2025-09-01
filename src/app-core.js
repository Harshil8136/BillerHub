/**
 * APP CORE
 * ==================
 * This file manages the application's state, caches DOM elements,
 * and houses core event handlers.
 */

// --- GLOBAL APPLICATION STATE ---
const state = {
    activeSuggestionIndex: -1,
    currentSuggestions: [],
    activeLocationSuggestionIndex: -1,
    currentLocationSuggestions: [],
    activeDrawer: null,
    activeModal: null,
    activePopover: null,
    searchHistory: Utils.storageGet('biller-searchHistory', []),
    settings: {
        showAreaZipUI: false,
        suggestionsEnabled: true,
        notificationsEnabled: false,
        offlineMode: false,
        showAnalytics: true, // NEW
    }
};

// --- DOM ELEMENT CACHE ---
const dom = {
    // Search & Main Content
    searchWrapper: document.getElementById('searchWrapper'),
    searchInput: document.getElementById('searchInput'),
    suggestionsList: document.getElementById('suggestionsList'),
    billerCard: document.getElementById('billerCard'),
    locationCard: document.getElementById('locationCard'),
    
    // Header Actions
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    favoritesBtn: document.getElementById('favoritesBtn'),
    directoryBtn: document.getElementById('directoryBtn'),
    toolsBtn: document.getElementById('toolsBtn'),
    settingsBtn: document.getElementById('settingsBtn'),

    // Area Zip Lookup
    areaZipLookup: document.getElementById('areaZipLookup'),
    locationLookupWrapper: document.getElementById('locationLookupWrapper'),
    locationInput: document.getElementById('locationInput'),
    locationSuggestionsList: document.getElementById('locationSuggestionsList'),
    locationResultsBox: document.getElementById('locationResultsBox'), // NEW

    // Popover & Modals
    settingsPopover: document.getElementById('settingsPopover'),
    directoryModal: document.getElementById('directoryModal'),
    directoryModalList: document.getElementById('directoryModalList'),
    directoryCloseBtn: document.getElementById('directoryCloseBtn'),

    // Right-side Drawer (Tools)
    toolsPanel: document.getElementById('toolsPanel'),
    toolsPanelTemplate: document.getElementById('toolsPanelTemplate'),

    // Settings Toggles
    toggleAreaZipUI: document.getElementById('toggleAreaZipUI'),
    toggleSuggestions: document.getElementById('toggleSuggestions'),
    toggleNotifications: document.getElementById('toggleNotifications'),
    toggleOfflineMode: document.getElementById('toggleOfflineMode'),
    toggleAnalytics: document.getElementById('toggleAnalytics'), // NEW

    // Favorites
    favoritesSection: document.getElementById('favoritesSection'),
    favoritesList: document.getElementById('favoritesList'),

    // Analytics & Banners
    analyticsDiv: document.getElementById('analyticsDiv'),
    analyticsChart: document.getElementById('analyticsChart'),
    notificationBanner: document.getElementById('notificationBanner'),
};

// --- INITIALIZATION VARIABLES ---
let searchService;

// --- CORE LOGIC ---

function handleSearchInput() {
    if (!state.settings.suggestionsEnabled) {
        UI.clearSuggestions();
        return;
    }
    const query = dom.searchInput.value.trim();
    if (query.length < 1) {
        UI.clearSuggestions();
        return;
    }
    state.currentSuggestions = searchService.search(query).map(result => result.item);
    UI.renderSuggestions(state.currentSuggestions, query);
}

function selectBillerById(id) {
    const biller = DataHelpers.getBillerById(BILLERS, id);
    if (biller) {
        dom.searchInput.value = biller.name;
        dom.locationInput.value = '';
        UI.clearSuggestions();
        UI.Location.clearSuggestions();
        dom.locationCard.hidden = true;
        UI.displayBiller(biller);
        Features.Analytics.logBillerView(biller);
    }
}

function handleDocumentClick(e) {
    if (!dom.searchWrapper.contains(e.target)) {
        UI.clearSuggestions();
    }
    if (dom.locationLookupWrapper && !dom.locationLookupWrapper.contains(e.target)) {
        UI.Location.clearSuggestions();
    }
    if (state.activePopover && !dom.settingsBtn.contains(e.target) && !dom.settingsPopover.contains(e.target)) {
        UI.Popover.close(state.activePopover.popover, state.activePopover.button);
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
            UI.updateActiveSuggestion();
            break;
        case 'ArrowUp':
            e.preventDefault();
            state.activeSuggestionIndex = (state.activeSuggestionIndex - 1 + suggestionsCount) % suggestionsCount;
            UI.updateActiveSuggestion();
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
            UI.clearSuggestions();
            break;
    }
}

function handleSuggestionClick(e) {
    const target = e.target.closest('.suggestion-item');
    if (target && target.dataset.id) {
        selectBillerById(target.dataset.id);
    }
}