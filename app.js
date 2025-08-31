import { BILLERS } from './billers.js';

// --- APPLICATION STATE ---
// Central object to hold the dynamic state of the application.
const state = {
    activeSuggestionIndex: -1,
    currentSuggestions: [],
    activeDrawer: null,
};

// --- DOM ELEMENTS ---
// Caching all necessary DOM elements for better performance.
const dom = {
    // Search
    searchWrapper: document.getElementById('searchWrapper'),
    searchInput: document.getElementById('searchInput'),
    suggestionsList: document.getElementById('suggestionsList'),
    billerCard: document.getElementById('billerCard'),
    // Main Menu
    menuBtn: document.getElementById('menuBtn'),
    mainMenu: document.getElementById('mainMenu'),
    menuCloseBtn: document.getElementById('menuCloseBtn'),
    drawerOverlay: document.getElementById('drawerOverlay'),
    // Tools Panel
    toolsSwitchBtn: document.getElementById('toolsSwitchBtn'),
    toolsPanel: document.getElementById('toolsPanel'),
    toolsPanelTemplate: document.getElementById('toolsPanelTemplate'),
    // Theme
    themeSelector: document.getElementById('themeSelector'),
    // Location
    locationInput: document.getElementById('locationInput'),
    locationLookupBtn: document.getElementById('locationLookupBtn'),
    locationResult: document.getElementById('locationResult'),
};

// --- INITIALIZATION ---
let searchService; // Will hold either Fuse.js or a fallback search function.
let locationMap;
let isToolsPanelLoaded = false;

// Initialize the application once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', init);

/**
 * Main initialization function.
 */
function init() {
    // 1. Initialize the search service.
    // This is a major improvement: If the Fuse.js CDN fails to load,
    // the app will fall back to a simpler, native search, ensuring it never breaks.
    if (typeof Fuse === 'undefined') {
        console.error("Fuse.js library not loaded. Using basic fallback search.");
        searchService = {
            search: (query) => {
                const lowerQuery = query.toLowerCase();
                return BILLERS
                    .filter(b => 
                        b.name.toLowerCase().includes(lowerQuery) || 
                        b.tla.toLowerCase().includes(lowerQuery) ||
                        (b.aliases || []).some(a => a.toLowerCase().includes(lowerQuery))
                    )
                    .map(item => ({ item })); // Mimic Fuse's output structure.
            }
        };
    } else {
        searchService = new Fuse(BILLERS, {
            keys: [
                { name: 'tla', weight: 0.9 }, 
                { name: 'name', weight: 0.7 },
                { name: 'aliases', weight: 0.5 }
            ],
            includeMatches: true,
            threshold: 0.4,
            minMatchCharLength: 1,
        });
    }
    
    // 2. Create a location-to-biller reverse map for quick lookups.
    locationMap = new Map();
    BILLERS.forEach(biller => {
        (biller.areas || []).forEach(area => locationMap.set(area, biller.tla));
        (biller.zips || []).forEach(zip => locationMap.set(zip, biller.tla));
    });

    // 3. Initialize the theme from localStorage.
    ThemeModule.init();

    // 4. Attach all global event listeners.
    attachEventListeners();
}

/**
 * Central function to attach all primary event listeners.
 */
function attachEventListeners() {
    // Search interactions
    dom.searchInput.addEventListener('input', handleSearchInput);
    dom.searchInput.addEventListener('keydown', handleSearchKeydown);
    dom.suggestionsList.addEventListener('click', handleSuggestionClick);
    
    // Global click listener to close suggestions when clicking away.
    document.addEventListener('click', handleDocumentClick);

    // Drawer interactions
    dom.menuBtn.addEventListener('click', () => DrawerModule.open(dom.mainMenu));
    dom.menuCloseBtn.addEventListener('click', () => DrawerModule.close(dom.mainMenu));
    dom.toolsSwitchBtn.addEventListener('click', handleToolsSwitch);
    dom.drawerOverlay.addEventListener('click', () => DrawerModule.close(state.activeDrawer));
    
    // Global keydown listener for closing drawers with the Escape key.
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.activeDrawer) {
            DrawerModule.close(state.activeDrawer);
        }
    });

    // Menu control interactions
    dom.themeSelector.addEventListener('click', ThemeModule.handleThemeChange);
    dom.locationLookupBtn.addEventListener('click', LocationModule.handleLookup);
}


// --- MODULE: SEARCH & UI RENDERING ---

/**
 * Handles the search input event, performs a search, and renders the results.
 */
function handleSearchInput() {
    const query = dom.searchInput.value.trim();
    if (query.length < 1) {
        clearSuggestions();
        return;
    }
    state.currentSuggestions = searchService.search(query).map(result => result.item);
    renderSuggestions(state.currentSuggestions, query);
}

/**
 * Renders the suggestion list in the DOM.
 * @param {Array} suggestions - An array of biller objects to display.
 * @param {string} query - The search query, used for highlighting matches.
 */
function renderSuggestions(suggestions, query) {
    dom.suggestionsList.innerHTML = '';
    if (suggestions.length === 0) {
        dom.suggestionsList.hidden = true;
        dom.searchWrapper.setAttribute('aria-expanded', 'false');
        return;
    }

    const fragment = document.createDocumentFragment();
    const queryRegex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'ig');

    suggestions.slice(0, 7).forEach((biller, index) => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.id = `suggestion-${index}`;
        item.setAttribute('role', 'option');
        item.dataset.tla = biller.tla;
        
        const highlightedName = biller.name.replace(queryRegex, '<strong>$1</strong>');
        item.innerHTML = `
            <span>${highlightedName}</span>
            <span class="suggestion-tla">${biller.tla}</span>
        `;
        fragment.appendChild(item);
    });

    dom.suggestionsList.appendChild(fragment);
    dom.suggestionsList.hidden = false;
    dom.searchWrapper.setAttribute('aria-expanded', 'true');
    state.activeSuggestionIndex = -1;
}

/**
 * Clears the suggestion list and resets the search state.
 */
function clearSuggestions() {
    state.currentSuggestions = [];
    state.activeSuggestionIndex = -1;
    dom.suggestionsList.innerHTML = '';
    dom.suggestionsList.hidden = true;
    dom.searchWrapper.setAttribute('aria-expanded', 'false');
    dom.searchInput.removeAttribute('aria-activedescendant');
}

/**
 * Displays the details of a selected biller in the main card.
 * @param {object} biller - The biller object to display.
 */
function displayBiller(biller) {
    if (!biller) {
        dom.billerCard.hidden = true;
        return;
    }
    
    dom.billerCard.innerHTML = `
        <div class="card-header">
            <h2 class="card-title">${biller.name} (${biller.tla})</h2>
            <span class="card-status ${biller.live ? 'is-live' : 'is-offline'}">
                ${biller.live ? 'Live' : 'Non-Live'}
            </span>
        </div>
        <div class="card-grid">
            <div class="card-item"><strong>Payments Accepted</strong><div>${(biller.paymentTypes || []).join(', ') || '—'}</div></div>
            <div class="card-item"><strong>IVR Number</strong><div>${biller.ivr || '—'}</div></div>
            <div class="card-item"><strong>Customer Service</strong><div>${biller.csr || '—'}</div></div>
            <div class="card-item"><strong>KnowledgeBase Link</strong><div><a href="#" data-link="${biller.kbLink}">${biller.kbLink || '—'}</a></div></div>
            <div class="card-item"><strong>AD Link</strong><div><a href="#" data-link="${biller.adLink}">${biller.adLink || '—'}</a></div></div>
            <div class="card-item card-notes"><strong>Notes</strong><div>${biller.notes || '—'}</div></div>
        </div>
    `;
    // Add non-intrusive event listeners for demo links
    dom.billerCard.querySelectorAll('a').forEach(a => a.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`Demo link clicked. In a real app, this would redirect to: ${e.target.dataset.link}`);
    }));
    dom.billerCard.hidden = false;
}

/**
 * Finds a biller by TLA and displays their details.
 * @param {string} tla - The Three-Letter Acronym of the biller.
 */
function selectBillerByTLA(tla) {
    const biller = BILLERS.find(b => b.tla === tla);
    if (biller) {
        dom.searchInput.value = biller.name;
        clearSuggestions();
        displayBiller(biller);
    }
}


// --- MODULE: KEYBOARD & MOUSE INTERACTIONS ---

/**
 * Handles keyboard navigation (arrows, Enter, Escape) within the suggestions list.
 */
function handleSearchKeydown(e) {
    const { key } = e;
    const suggestionsCount = state.currentSuggestions.length;
    if (suggestionsCount === 0) return;

    switch (key) {
        case 'ArrowDown':
            e.preventDefault();
            state.activeSuggestionIndex = (state.activeSuggestionIndex + 1) % suggestionsCount;
            updateActiveSuggestion();
            break;
        case 'ArrowUp':
            e.preventDefault();
            state.activeSuggestionIndex = (state.activeSuggestionIndex - 1 + suggestionsCount) % suggestionsCount;
            updateActiveSuggestion();
            break;
        case 'Enter':
            e.preventDefault();
            if (state.activeSuggestionIndex > -1) {
                const selectedBiller = state.currentSuggestions[state.activeSuggestionIndex];
                selectBillerByTLA(selectedBiller.tla);
            }
            break;
        case 'Escape':
            clearSuggestions();
            break;
    }
}

/**
 * Updates the visual state of the active suggestion during keyboard navigation.
 */
function updateActiveSuggestion() {
    dom.suggestionsList.querySelectorAll('.suggestion-item').forEach((item, index) => {
        if (index === state.activeSuggestionIndex) {
            item.classList.add('is-active');
            item.setAttribute('aria-selected', 'true');
            dom.searchInput.setAttribute('aria-activedescendant', item.id);
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('is-active');
            item.setAttribute('aria-selected', 'false');
        }
    });
}

/**
 * Handles clicks on a suggestion item.
 */
function handleSuggestionClick(e) {
    const target = e.target.closest('.suggestion-item');
    if (target) {
        selectBillerByTLA(target.dataset.tla);
    }
}

/**
 * Handles clicks outside the search component to close the suggestions.
 */
function handleDocumentClick(e) {
    if (!dom.searchWrapper.contains(e.target)) {
        clearSuggestions();
    }
}


// --- MODULE: DRAWERS (Side Panels) ---

const DrawerModule = {
    focusableElements: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    
    /**
     * Opens a drawer and manages focus.
     * @param {HTMLElement} drawerElement - The drawer to open.
     */
    open(drawerElement) {
        this.lastFocused = document.activeElement;
        state.activeDrawer = drawerElement;
        drawerElement.hidden = false;
        
        requestAnimationFrame(() => {
            document.body.style.overflow = 'hidden';
            dom.drawerOverlay.hidden = false;
            drawerElement.classList.add('is-open');
            dom.menuBtn.setAttribute('aria-expanded', 'true');
            
            const firstFocusable = drawerElement.querySelector(this.focusableElements);
            if (firstFocusable) firstFocusable.focus();

            drawerElement.addEventListener('keydown', this.trapFocus);
        });
    },

    /**
     * Closes a drawer and restores focus.
     * @param {HTMLElement} drawerElement - The drawer to close.
     */
    close(drawerElement) {
        if (!drawerElement) return;
        
        drawerElement.classList.remove('is-open');
        dom.drawerOverlay.hidden = true;
        document.body.style.overflow = '';
        dom.menuBtn.setAttribute('aria-expanded', 'false');
        
        drawerElement.removeEventListener('keydown', this.trapFocus);

        // Wait for animation to finish before hiding the element and restoring focus.
        drawerElement.addEventListener('transitionend', () => {
            drawerElement.hidden = true;
            if (this.lastFocused) this.lastFocused.focus();
            state.activeDrawer = null;
        }, { once: true });
    },

    /**
     * Traps focus within the active drawer for accessibility.
     * @param {KeyboardEvent} e - The keydown event.
     */
    trapFocus(e) {
        if (e.key !== 'Tab' || !state.activeDrawer) return;
        
        const focusable = Array.from(state.activeDrawer.querySelectorAll(DrawerModule.focusableElements));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === first) {
                last.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        }
    }
};


// --- MODULE: THEME ---

const ThemeModule = {
    init() {
        const savedTheme = localStorage.getItem('biller-theme') || 'light';
        this.apply(savedTheme);
    },
    
    apply(themeName) {
        document.body.className = `theme-${themeName}`;
        localStorage.setItem('biller-theme', themeName);
        
        dom.themeSelector.querySelectorAll('.theme-swatch').forEach(swatch => {
            swatch.classList.toggle('is-active', swatch.dataset.theme === themeName);
            swatch.setAttribute('aria-checked', swatch.dataset.theme === themeName);
        });
    },

    handleThemeChange(e) {
        const target = e.target.closest('.theme-swatch');
        if (target) {
            this.apply(target.dataset.theme);
        }
    }
};


// --- MODULE: LOCATION LOOKUP ---

const LocationModule = {
    handleLookup() {
        const query = dom.locationInput.value.trim();
        if (!query) {
            dom.locationResult.textContent = 'Please enter an area code or ZIP.';
            return;
        }

        if (locationMap.has(query)) {
            const tla = locationMap.get(query);
            const biller = BILLERS.find(b => b.tla === tla);
            dom.locationResult.innerHTML = `Associated Biller: <a href="#" data-tla="${tla}">${biller.name} (${tla})</a>`;
            dom.locationResult.querySelector('a').addEventListener('click', this.handleResultClick);
        } else {
            dom.locationResult.textContent = 'No biller association found.';
        }
    },
    
    handleResultClick(e) {
        e.preventDefault();
        const tla = e.target.dataset.tla;
        selectBillerByTLA(tla);
        DrawerModule.close(dom.mainMenu);
    }
};


// --- MODULE: WORKPLACE TOOLS (Lazy Loaded) ---

/**
 * Opens the tools panel, loading its content on the first click.
 */
function handleToolsSwitch() {
    if (!isToolsPanelLoaded) {
        loadToolsPanel();
    }
    DrawerModule.close(dom.mainMenu);
    
    // Allow the main menu to close before opening the tools panel.
    setTimeout(() => DrawerModule.open(dom.toolsPanel), 50);
}

/**
 * Clones the tools panel template, appends it to the DOM, and attaches its event listeners.
 * This function only runs once.
 */
function loadToolsPanel() {
    const templateContent = dom.toolsPanelTemplate.content.cloneNode(true);
    dom.toolsPanel.appendChild(templateContent);
    
    // Attach event listeners for the newly added elements.
    dom.toolsPanel.querySelector('.close-btn').addEventListener('click', () => DrawerModule.close(dom.toolsPanel));
    dom.toolsPanel.querySelector('#copyTemplateBtn').addEventListener('click', handleCopyTemplate);
    
    isToolsPanelLoaded = true;
}

/**
 * Handles the "Copy Template" button functionality.
 */
function handleCopyTemplate() {
    // In a real app, this data would come from an API or a config file.
    const templates = {
        welcome: `Hello,\n\nWelcome to our service. Your account is now active.\n\nRegards,\nSupport`,
        issue: `Hello,\n\nWe’re looking into your billing issue and will follow up shortly.\n\nRegards,\nSupport`,
        followup: `Hello,\n\nJust checking in to see if the issue is resolved.\n\nRegards,\nSupport`
    };
    const key = dom.toolsPanel.querySelector('#templateSelect').value;
    const textToCopy = templates[key];

    navigator.clipboard.writeText(textToCopy).then(() => {
        const feedbackEl = dom.toolsPanel.querySelector('#copyFeedback');
        feedbackEl.textContent = 'Copied to clipboard!';
        feedbackEl.classList.add('is-visible');
        setTimeout(() => feedbackEl.classList.remove('is-visible'), 2000);
    });
}