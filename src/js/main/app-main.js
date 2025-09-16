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
        cacheDOMElements(); 

        handleTelemetryConsent();
        
        UI.Popovers.init();
        UI.Search.init();
        UI.FeeTool.init();
        UI.ToolMenu.init();
        UI.KbModal.init();

        Telemetry.init();

        if (typeof BILLERS === 'undefined' || BILLERS.length === 0) {
            throw new Error("CRITICAL: Biller data failed to load. Application cannot start.");
        }

        Clock.init();
        ThemeFeature.init();
        Features.FontSize.init();
        Features.Settings.init();
        LocationFeature.init();
        Features.Favorites.init();

        initializeSearchService();
        initializeTitleObserver();
        attachEventListeners();
        
        dom.searchInput.disabled = false;
        dom.searchInput.placeholder = "Search by name or TLA...";

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

function cacheDOMElements() {
    dom.searchWrapper = document.getElementById('searchWrapper');
    dom.searchInput = document.getElementById('searchInput');
    dom.suggestionsList = document.getElementById('suggestionsList');
    dom.billerCard = document.getElementById('billerCard');
    dom.locationCard = document.getElementById('locationCard');
    dom.appTitle = document.querySelector('.app-title');
    dom.clockWidget = document.getElementById('clockWidget');
    dom.sidebarFavoritesList = document.getElementById('sidebarFavoritesList');
    dom.favoritesSection = document.querySelector('.favorites-section');
    dom.areaLookupContainer = document.getElementById('areaLookupContainer');
    dom.areaLookupBtn = document.getElementById('areaLookupBtn');
    dom.areaLookupInput = document.getElementById('areaLookupInput');
    dom.areaLookupResultsBox = document.getElementById('areaLookupResultsBox');
    dom.settingsBtn = document.getElementById('settingsBtn');
    dom.settingsPopover = document.getElementById('settingsPopover');
    dom.toolsBtn = document.getElementById('toolsBtn');
    dom.toolsMenu = document.getElementById('toolsMenu');
    dom.decreaseFontBtn = document.getElementById('decreaseFontBtn');
    dom.increaseFontBtn = document.getElementById('increaseFontBtn');
    dom.resetCacheBtn = document.getElementById('resetCacheBtn');
    dom.notificationBanner = document.getElementById('notificationBanner');
    dom.debugLog = document.getElementById('debugLog');
    dom.directoryModal = document.getElementById('directoryModal');
    dom.directoryCloseBtn = document.getElementById('directoryCloseBtn');
    dom.themePanel = document.getElementById('themePanel');
    dom.themePanelTemplate = document.getElementById('themePanelTemplate');
    dom.feeToolModal = document.getElementById('feeToolModal');
    dom.feeToolCloseBtn = document.getElementById('feeToolCloseBtn');
    dom.kbModal = document.getElementById('kbModal');
    dom.kbModalCloseBtn = document.getElementById('kbModalCloseBtn');
    dom.kbSearchInput = document.getElementById('kbSearchInput');
    dom.kbResultsList = document.getElementById('kbResultsList');
}

function handleTelemetryConsent() {
    const consent = Utils.storageGet('telemetry-consent');
    if (consent === null) {
        Utils.storageSet('telemetry-consent', true);
    }
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
    dom.areaLookupBtn?.addEventListener('click', () => LocationFeature.toggleLookup());
    dom.areaLookupInput?.addEventListener('input', Utils.debounce(LocationFeature.handleInput.bind(LocationFeature), 200));
    dom.areaLookupInput?.addEventListener('keydown', handleAreaLookupKeydown);
    document.getElementById('settingsMenuDirectory')?.addEventListener('click', () => { UI.Modal.open(dom.directoryModal); UI.Popovers.closeActive(); });
    document.getElementById('settingsMenuThemes')?.addEventListener('click', () => { UI.Themes.toggle(); UI.Popovers.closeActive(); });
    dom.directoryCloseBtn?.addEventListener('click', () => UI.Modal.close(dom.directoryModal));
    if(dom.settingsPopover) {
        dom.settingsPopover.addEventListener('change', (e) => {
            if (e.target.closest('.toggle-switch')) Features.Settings.handleToggle(e);
        });
    }
    dom.increaseFontBtn?.addEventListener('click', () => Features.FontSize.increase());
    dom.decreaseFontBtn?.addEventListener('click', () => Features.FontSize.decrease());
    dom.resetCacheBtn?.addEventListener('click', () => Features.System.resetApplication());
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
        else if (dom.areaLookupInput.value) LocationFeature.toggleLookup(false);
        else UI.Search.clearSuggestions();
    }
    if (e.altKey) {
        let shortcutHandled = true;
        const key = e.key.toLowerCase();
        
        switch (key) {
            case 't': UI.ToolMenu.toggle(); break;
            case 's': LocationFeature.toggleLookup(); break;
            case 'k': UI.KbModal.open(); break;
            case '1': UI.FeeTool.open(); break;
            case '2': {
                const tool = TOOLS_DATA.find(t => t.id === 'emailGen');
                if (tool) window.open(tool.url, '_blank');
                break;
            }
            case '3': {
                const tool = TOOLS_DATA.find(t => t.id === 'stickyNotes');
                if (tool) window.open(tool.url, '_blank');
                break;
            }
            default: shortcutHandled = false; break;
        }

        if (shortcutHandled) {
            e.preventDefault();
            if (state.activePopover && key !== 't') UI.Popovers.closeActive();
        }
    }
}

function handleAreaLookupKeydown(e) {
    const { key } = e;
    const suggestionsCount = state.currentLocationSuggestions.length;
    if (suggestionsCount === 0 && key !== 'Enter') return;
    switch (key) {
        case 'ArrowDown':
            e.preventDefault();
            state.activeLocationSuggestionIndex = (state.activeLocationSuggestionIndex + 1) % suggestionsCount;
            UI.Location.updateActiveSuggestion();
            break;
        case 'ArrowUp':
            e.preventDefault();
            state.activeLocationSuggestionIndex = (state.activeLocationSuggestionIndex - 1 + suggestionsCount) % suggestionsCount;
            UI.Location.updateActiveSuggestion();
            break;
        case 'Enter':
            e.preventDefault();
            if (state.activeLocationSuggestionIndex > -1) {
                const selectedBiller = state.currentLocationSuggestions[state.activeLocationSuggestionIndex];
                selectBillerById(selectedBiller.id);
                LocationFeature.toggleLookup(false);
            }
            break;
    }
}