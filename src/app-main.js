/**
 * APP MAIN
 * ==================
 * This file is the central orchestrator for the application. It kicks off
 * the initialization sequence and attaches all global event listeners.
 */

// --- APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', init);

function init() {
    try {
        Features.Settings.init();
        LocationFeature.init();
        
        const useFallback = state.settings.offlineMode || typeof Fuse === 'undefined';
        if (useFallback) {
            searchService = {
                search: (query) => BILLERS.filter(b => 
                    b.name.toLowerCase().includes(query.toLowerCase()) || 
                    b.tla.toLowerCase().includes(query.toLowerCase())
                ).map(item => ({ item }))
            };
        } else {
            searchService = new Fuse(BILLERS, {
                keys: [{ name: 'tla', weight: 0.9 }, { name: 'name', weight: 0.7 }, { name: 'aliases', weight: 0.5 }],
                includeMatches: true, threshold: 0.4, minMatchCharLength: 1,
            });
        }
        
        UI.Theme.init();
        UI.Modal.generateBillerDirectory();
        Features.Favorites.init();
        Features.Analytics.init();
        Utils.onOfflineStatusChange(UI.updateOfflineIndicator);
        
        attachEventListeners();
        console.log("Ultimate Biller Hub initialized successfully.");
    } catch (error) {
        console.error("Fatal error during application initialization:", error);
        document.body.innerHTML = `<div style="padding: 2rem; text-align: center; font-family: sans-serif; color: #b91c1c; background-color: #fef2f2;"><h1>Application Error</h1><p>Something went wrong. Please check the console for details.</p><p><strong>Error:</strong> ${error.message}</p></div>`;
    }
}

function attachEventListeners() {
    dom.searchInput.addEventListener('input', Utils.debounce(handleSearchInput, 200));
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
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (state.activeModal) UI.Modal.close(state.activeModal);
            if (state.activeDrawer) UI.Drawer.close(state.activeDrawer);
            if (state.activePopover) UI.Popover.close(state.activePopover.popover, state.activePopover.button);
        }
        
        const shortcuts = {
            'T': dom.themeToggleBtn, 'F': dom.favoritesBtn,
            'D': dom.directoryBtn, 'W': dom.toolsBtn,
        };
        const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
        if (!isTyping && shortcuts[e.key.toUpperCase()]) {
            e.preventDefault();
            shortcuts[e.key.toUpperCase()].click();
        }
    });
    
    dom.toggleAreaZipUI.addEventListener('change', (e) => Features.Settings.handleToggle(e));
    dom.toggleSuggestions.addEventListener('change', (e) => Features.Settings.handleToggle(e));
    dom.toggleNotifications.addEventListener('change', (e) => Features.Settings.handleToggle(e));
    dom.toggleOfflineMode.addEventListener('change', (e) => Features.Settings.handleToggle(e));
    dom.toggleAnalytics.addEventListener('change', (e) => Features.Settings.handleToggle(e));
}

// Register the Service Worker
window.addEventListener('load', () => {
  if ('serviceWorker' in navigator && (location.protocol === 'http:' || location.protocol === 'https:')) {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => console.log('ServiceWorker registration successful with scope: ', registration.scope))
      .catch(error => console.log('ServiceWorker registration failed: ', error));
  }
});