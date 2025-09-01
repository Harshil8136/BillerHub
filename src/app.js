// --- APPLICATION STATE ---
const state = {
    activeSuggestionIndex: -1,
    currentSuggestions: [],
    activeDrawer: null, // For the right-side tools panel
    activeModal: null, // For the biller directory
    activePopover: null, // For the settings dropdown
    settings: {
        showAreaZipUI: false,
        suggestionsEnabled: true,
        offlineMode: false,
    }
};

// --- DOM ELEMENTS ---
const dom = {
    // Search & Main Content
    searchWrapper: document.getElementById('searchWrapper'),
    searchInput: document.getElementById('searchInput'),
    suggestionsList: document.getElementById('suggestionsList'),
    billerCard: document.getElementById('billerCard'),
    areaZipLookup: document.getElementById('areaZipLookup'),
    locationInput: document.getElementById('locationInput'),
    locationLookupBtn: document.getElementById('locationLookupBtn'),
    locationResult: document.getElementById('locationResult'),
    // New Header Actions
    headerActions: document.querySelector('.header-actions'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    directoryBtn: document.getElementById('directoryBtn'),
    toolsBtn: document.getElementById('toolsBtn'),
    settingsBtn: document.getElementById('settingsBtn'),
    // Popover & Modal
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
    toggleOfflineMode: document.getElementById('toggleOfflineMode'),
};

// --- INITIALIZATION ---
let searchService;
let locationMap;
let isToolsPanelLoaded = false;

document.addEventListener('DOMContentLoaded', init);

function init() {
    SettingsModule.init();
    
    const useFallback = state.settings.offlineMode || typeof Fuse === 'undefined';
    if (useFallback) {
        console.warn("Using basic fallback search (Offline Mode or Fuse.js not loaded).");
        searchService = {
            search: (query) => {
                const lowerQuery = query.toLowerCase();
                return BILLERS.filter(b => 
                    b.name.toLowerCase().includes(lowerQuery) || 
                    b.tla.toLowerCase().includes(lowerQuery) ||
                    (b.aliases || []).some(a => a.toLowerCase().includes(lowerQuery))
                ).map(item => ({ item }));
            }
        };
    } else {
        searchService = new Fuse(BILLERS, {
            keys: [{ name: 'tla', weight: 0.9 }, { name: 'name', weight: 0.7 }, { name: 'aliases', weight: 0.5 }],
            includeMatches: true, threshold: 0.4, minMatchCharLength: 1,
        });
    }

    locationMap = new Map();
    BILLERS.forEach(biller => {
        (biller.areas || []).forEach(area => locationMap.set(area, biller.id));
        (biller.zips || []).forEach(zip => locationMap.set(zip, biller.id));
    });
    
    ThemeModule.init();
    ModalModule.generateBillerDirectory();
    attachEventListeners();
}

function attachEventListeners() {
    // Search
    dom.searchInput.addEventListener('input', handleSearchInput);
    dom.searchInput.addEventListener('keydown', handleSearchKeydown);
    dom.suggestionsList.addEventListener('click', handleSuggestionClick);
    
    // Header Actions
    dom.themeToggleBtn.addEventListener('click', ThemeModule.toggle);
    dom.directoryBtn.addEventListener('click', () => ModalModule.open(dom.directoryModal));
    dom.directoryCloseBtn.addEventListener('click', () => ModalModule.close(dom.directoryModal));
    dom.toolsBtn.addEventListener('click', handleToolsSwitch);
    dom.settingsBtn.addEventListener('click', () => PopoverModule.toggle(dom.settingsPopover, dom.settingsBtn));
    
    // Global Listeners for closing popups/suggestions
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (state.activeModal) ModalModule.close(state.activeModal);
            if (state.activeDrawer) DrawerModule.close(state.activeDrawer);
            if (state.activePopover) PopoverModule.close(state.activePopover.popover, state.activePopover.button);
        }
    });
    
    // Toggles & Lookups
    dom.locationLookupBtn.addEventListener('click', LocationModule.handleLookup);
    dom.toggleAreaZipUI.addEventListener('change', SettingsModule.handleToggle);
    dom.toggleSuggestions.addEventListener('change', SettingsModule.handleToggle);
    dom.toggleOfflineMode.addEventListener('change', SettingsModule.handleToggle);
}

// --- MODULE: UI & DYNAMIC CONTENT ---

function displayBiller(biller) {
    if (!biller) { dom.billerCard.hidden = true; return; }

    const createActionButton = (url, text, icon, type) => {
        if (!url) return '';
        return `<button class="btn-biller-card btn-${type}" data-link="${url}"><i class="fa-solid ${icon}"></i> ${text}</button>`;
    };
    const createCopyableField = (label, value) => {
        if (!value) return '';
        return `<div class="card-item"><strong>${label}</strong><div class="copyable-field"><span>${value}</span><button class="icon-btn-copy" aria-label="Copy ${label}"><i class="fa-solid fa-copy"></i></button></div></div>`;
    };

    dom.billerCard.innerHTML = `
        <div class="card-header"><h2 class="card-title">${biller.name} (${biller.tla})</h2><span class="card-status ${biller.live ? 'is-live' : 'is-offline'}">${biller.live ? 'Live' : 'Non-Live'}</span></div>
        <div class="card-actions">${createActionButton(biller.kbLink, 'Open KB', 'fa-book', 'kb')}${createActionButton(biller.adLink, 'Open AD', 'fa-server', 'ad')}</div>
        <div class="card-grid">
            <div class="card-item"><strong>Payments Accepted</strong><div>${(biller.paymentTypes || []).join(', ') || '—'}</div></div>
            ${createCopyableField('IVR Number', biller.ivr)}
            ${createCopyableField('Customer Service', biller.csr)}
            <div class="card-item card-notes"><strong>Notes</strong><div>${biller.notes || '—'}</div></div>
        </div>`;

    dom.billerCard.querySelectorAll('.btn-biller-card').forEach(button => {
        button.addEventListener('click', (e) => {
            const link = e.currentTarget.dataset.link;
            if (link) window.open(link, '_blank', 'noopener,noreferrer');
        });
    });
    
    dom.billerCard.querySelectorAll('.icon-btn-copy').forEach(button => {
        button.addEventListener('click', (e) => {
            const textToCopy = e.currentTarget.previousElementSibling.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const icon = button.querySelector('i');
                icon.classList.replace('fa-copy', 'fa-check');
                button.classList.add('is-copied');
                setTimeout(() => {
                    icon.classList.replace('fa-check', 'fa-copy');
                    button.classList.remove('is-copied');
                }, 1500);
            });
        });
    });
    dom.billerCard.hidden = false;
}

// --- MODULE: SEARCH LOGIC ---

function handleSearchInput() {
    if (!state.settings.suggestionsEnabled) { clearSuggestions(); return; }
    const query = dom.searchInput.value.trim();
    if (query.length < 1) { clearSuggestions(); return; }
    state.currentSuggestions = searchService.search(query).map(result => result.item);
    renderSuggestions(state.currentSuggestions, query);
}

function renderSuggestions(suggestions, query) {
    dom.suggestionsList.innerHTML = '';
    if (suggestions.length === 0) { dom.suggestionsList.hidden = true; dom.searchWrapper.setAttribute('aria-expanded', 'false'); return; }

    const fragment = document.createDocumentFragment();
    const queryRegex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'ig');
    suggestions.slice(0, 7).forEach((biller, index) => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.id = `suggestion-${index}`;
        item.setAttribute('role', 'option');
        item.dataset.id = biller.id;
        const highlightedName = biller.name.replace(queryRegex, '<strong>$1</strong>');
        item.innerHTML = `<span>${highlightedName}</span><span class="suggestion-tla">${biller.tla}</span>`;
        fragment.appendChild(item);
    });
    dom.suggestionsList.appendChild(fragment);
    dom.suggestionsList.hidden = false;
    dom.searchWrapper.setAttribute('aria-expanded', 'true');
    state.activeSuggestionIndex = -1;
}

function clearSuggestions() {
    state.currentSuggestions = []; state.activeSuggestionIndex = -1;
    dom.suggestionsList.innerHTML = ''; dom.suggestionsList.hidden = true;
    dom.searchWrapper.setAttribute('aria-expanded', 'false');
    dom.searchInput.removeAttribute('aria-activedescendant');
}

function selectBillerById(id) {
    const biller = BILLERS.find(b => b.id == id);
    if (biller) {
        dom.searchInput.value = biller.name;
        clearSuggestions();
        displayBiller(biller);
    }
}

// --- MODULE: KEYBOARD & MOUSE INTERACTIONS ---

function handleSearchKeydown(e) {
    const { key } = e; const suggestionsCount = state.currentSuggestions.length; if (suggestionsCount === 0) return;
    switch (key) {
        case 'ArrowDown': e.preventDefault(); state.activeSuggestionIndex = (state.activeSuggestionIndex + 1) % suggestionsCount; updateActiveSuggestion(); break;
        case 'ArrowUp': e.preventDefault(); state.activeSuggestionIndex = (state.activeSuggestionIndex - 1 + suggestionsCount) % suggestionsCount; updateActiveSuggestion(); break;
        case 'Enter': e.preventDefault(); if (state.activeSuggestionIndex > -1) { selectBillerById(state.currentSuggestions[state.activeSuggestionIndex].id); } break;
        case 'Escape': clearSuggestions(); break;
    }
}

function updateActiveSuggestion() {
    dom.suggestionsList.querySelectorAll('.suggestion-item').forEach((item, index) => {
        if (index === state.activeSuggestionIndex) {
            item.classList.add('is-active'); item.setAttribute('aria-selected', 'true');
            dom.searchInput.setAttribute('aria-activedescendant', item.id); item.scrollIntoView({ block: 'nearest' });
        } else { item.classList.remove('is-active'); item.setAttribute('aria-selected', 'false'); }
    });
}

function handleSuggestionClick(e) {
    const target = e.target.closest('.suggestion-item'); if (target && target.dataset.id) { selectBillerById(target.dataset.id); }
}

function handleDocumentClick(e) {
    if (!dom.searchWrapper.contains(e.target)) { clearSuggestions(); }
    if (state.activePopover && !state.activePopover.button.contains(e.target) && !state.activePopover.popover.contains(e.target)) {
        PopoverModule.close(state.activePopover.popover, state.activePopover.button);
    }
}

// --- MODULE: SETTINGS & LOCALSTORAGE ---

const SettingsModule = {
    init() {
        const showAreaZipUI = localStorage.getItem('biller-setting-showAreaZipUI') === 'true';
        const suggestionsEnabled = localStorage.getItem('biller-setting-suggestionsEnabled') !== 'false';
        const offlineMode = localStorage.getItem('biller-setting-offlineMode') === 'true';
        state.settings = { showAreaZipUI, suggestionsEnabled, offlineMode };
        dom.toggleAreaZipUI.checked = showAreaZipUI;
        dom.toggleSuggestions.checked = suggestionsEnabled;
        dom.toggleOfflineMode.checked = offlineMode;
        dom.areaZipLookup.hidden = !showAreaZipUI;
    },
    handleToggle(e) {
        const settingId = e.target.id;
        const isChecked = e.target.checked;
        let settingKey;
        switch (settingId) {
            case 'toggleAreaZipUI':
                settingKey = 'biller-setting-showAreaZipUI';
                state.settings.showAreaZipUI = isChecked;
                dom.areaZipLookup.hidden = !isChecked;
                break;
            case 'toggleSuggestions':
                settingKey = 'biller-setting-suggestionsEnabled';
                state.settings.suggestionsEnabled = isChecked;
                if (!isChecked) clearSuggestions();
                break;
            case 'toggleOfflineMode':
                settingKey = 'biller-setting-offlineMode';
                state.settings.offlineMode = isChecked;
                alert("Reload the page for Offline Mode changes to take effect.");
                break;
        }
        if (settingKey) localStorage.setItem(settingKey, isChecked);
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
        const icon = dom.themeToggleBtn.querySelector('i');
        if (themeName === 'dark') {
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    },
    toggle() {
        const currentTheme = localStorage.getItem('biller-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.apply(newTheme);
    }
};

// --- MODULE: LOCATION LOOKUP ---

const LocationModule = {
    handleLookup() {
        const query = dom.locationInput.value.trim();
        if (!query) { dom.locationResult.textContent = 'Please enter an area code or ZIP.'; return; }
        const billerId = locationMap.get(query);
        if (billerId) {
            const biller = BILLERS.find(b => b.id === billerId);
            if (biller) {
                dom.locationResult.innerHTML = `Associated Biller: <a href="#" data-id="${biller.id}">${biller.name} (${biller.tla})</a>`;
                dom.locationResult.querySelector('a').addEventListener('click', this.handleResultClick);
            } else { dom.locationResult.textContent = 'No biller association found.'; }
        } else { dom.locationResult.textContent = 'No biller association found.'; }
    },
    handleResultClick(e) {
        e.preventDefault();
        selectBillerById(e.target.dataset.id);
    }
};

// --- MODULE: POPOVERS ---

const PopoverModule = {
    toggle(popover, button) {
        if (popover.hidden) { this.open(popover, button); } else { this.close(popover, button); }
    },
    open(popover, button) {
        popover.hidden = false;
        button.setAttribute('aria-expanded', 'true');
        state.activePopover = { popover, button };
    },
    close(popover, button) {
        popover.hidden = true;
        button.setAttribute('aria-expanded', 'false');
        state.activePopover = null;
    }
};

// --- MODULE: MODALS ---

const ModalModule = {
    open(modalElement) {
        this.lastFocused = document.activeElement;
        state.activeModal = modalElement;
        modalElement.hidden = false;
        // UPDATED: Add .is-open class to trigger the CSS visibility
        modalElement.classList.add('is-open'); 
        document.body.style.overflow = 'hidden';
        modalElement.querySelector('[role="dialog"]').focus();
    },
    close(modalElement) {
        state.activeModal = null;
        // UPDATED: Remove .is-open class to hide via CSS
        modalElement.classList.remove('is-open'); 
        document.body.style.overflow = '';
        if (this.lastFocused) this.lastFocused.focus();
        // The modal is visually hidden by the CSS transition.
        // We can set it to hidden after the animation for accessibility if needed,
        // but the class-based approach is often sufficient.
        modalElement.addEventListener('transitionend', () => {
             if (!modalElement.classList.contains('is-open')) {
                modalElement.hidden = true;
             }
        }, { once: true });
    },
    generateBillerDirectory() {
        const fragment = document.createDocumentFragment();
        BILLERS.sort((a, b) => a.name.localeCompare(b.name)).forEach(biller => {
            const item = document.createElement('div');
            item.className = 'directory-item';
            item.innerHTML = `<span class="status-dot ${biller.live ? 'is-live' : 'is-offline'}"></span><span class="directory-name">${biller.name}</span><span class="directory-tla">${biller.tla}</span>`;
            fragment.appendChild(item);
        });
        dom.directoryModalList.appendChild(fragment);
    }
};

// --- MODULE: RIGHT-SIDE TOOLS PANEL (Drawer) ---

function handleToolsSwitch() {
    if (!isToolsPanelLoaded) { loadToolsPanel(); }
    DrawerModule.open(dom.toolsPanel);
}

function loadToolsPanel() {
    const templateContent = dom.toolsPanelTemplate.content.cloneNode(true);
    dom.toolsPanel.appendChild(templateContent);
    dom.toolsPanel.querySelector('.close-btn').addEventListener('click', () => DrawerModule.close(dom.toolsPanel));
    isToolsPanelLoaded = true;
}

const DrawerModule = { // For the right-side panel
    focusableElements: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    open(drawerElement) {
        this.lastFocused = document.activeElement; state.activeDrawer = drawerElement; drawerElement.hidden = false;
        requestAnimationFrame(() => {
            document.body.style.overflow = 'hidden'; drawerElement.classList.add('is-open');
            const firstFocusable = drawerElement.querySelector(this.focusableElements);
            if (firstFocusable) firstFocusable.focus();
            drawerElement.addEventListener('keydown', this.trapFocus);
        });
    },
    close(drawerElement) {
        if (!drawerElement) return;
        drawerElement.classList.remove('is-open'); document.body.style.overflow = '';
        drawerElement.removeEventListener('keydown', this.trapFocus);
        drawerElement.addEventListener('transitionend', () => {
            drawerElement.hidden = true; if (this.lastFocused) this.lastFocused.focus(); state.activeDrawer = null;
        }, { once: true });
    },
    trapFocus(e) {
        if (e.key !== 'Tab' || !state.activeDrawer) return;
        const focusable = Array.from(state.activeDrawer.querySelectorAll(DrawerModule.focusableElements));
        const first = focusable[0]; const last = focusable[focusable.length - 1];
        if (e.shiftKey) { if (document.activeElement === first) { last.focus(); e.preventDefault(); }
        } else { if (document.activeElement === last) { first.focus(); e.preventDefault(); } }
    }
};