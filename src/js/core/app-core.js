/**
 * APP CORE
 * ==================
 * UPDATED: Added a more robust guard to the keyboard handler to
 * prevent navigation attempts when no suggestions are available,
 * hardening the feature against edge cases.
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
    settings: {}
};

// --- DOM ELEMENT CACHE ---
/**
 * The `dom` object is intentionally initialized as empty.
 * It is fully populated by the `cacheDOMElements()` function in `app-main.js`
 * after the DOM is ready and all templates have been injected. This ensures
 * that no scripts attempt to access a DOM element before it exists.
 */
const dom = {};

// --- CORE LOGIC & EVENT HANDLERS ---

function handleSearchInput() {
    const query = dom.searchInput.value.trim();

    if (query.length < 1) {
        UI.Search.clearSuggestions();
        return;
    }
    
    // Use the main-thread search service. This is a defensive check.
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

            // Set focus to the Agent Dashboard button for improved workflow
            setTimeout(() => {
                const adButton = dom.billerCard.querySelector('.btn-ad');
                if (adButton) {
                    adButton.focus();
                }
            }, 100);

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
    const isNavKey = key === 'ArrowDown' || key === 'ArrowUp';

    // Guard: Prevent navigation keys from running if there's nothing to navigate.
    if (isNavKey && suggestionsCount === 0) {
        return;
    }

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