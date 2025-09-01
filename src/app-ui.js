/**
 * APP UI
 * ==================
 * This file is the dedicated "view" layer for the application. It contains
 * all functions that directly manipulate the DOM and is responsible for
 * rendering all visual updates for the user.
 */

const UI = {
  /**
   * Renders the main Biller Details card with the updated header layout.
   * @param {object} biller - The biller object to display.
   */
  displayBiller(biller) {
    if (!biller) {
      dom.billerCard.hidden = true;
      return;
    }
    // Hide the other card types to prevent overlap
    dom.locationCard.hidden = true;
    dom.locationResultsBox.hidden = true;

    const paymentTypeHtml = biller.paymentTypes && biller.paymentTypes.length > 0 
      ? `<span class="payment-type-tag">${biller.paymentTypes.join(', ')}</span>`
      : '';

    const createActionButton = (url, text, icon, type) => {
      if (!url) return '';
      return `<button class="btn-biller-card btn-${type}" data-link="${url}"><i class="fa-solid ${icon}"></i> ${text}</button>`;
    };
    const createCopyableField = (label, value) => {
      if (!value) return '';
      return `<div class="card-item"><strong>${label}</strong><div class="copyable-field"><span>${value}</span><button class="icon-btn icon-btn-copy" aria-label="Copy ${label}"><i class="fa-solid fa-copy"></i></button></div></div>`;
    };

    dom.billerCard.innerHTML = `
      <div class="card-header">
        <div class="card-title-group" data-biller-id="${biller.id}">
          <h2 class="card-title">${biller.name} (${biller.tla})</h2>
          <button id="favoriteToggleBtn" class="icon-btn icon-btn-favorite" aria-label="Toggle Favorite">
            <i class="fa-regular fa-star"></i>
          </button>
        </div>
        <div class="card-header-meta">
            ${paymentTypeHtml}
            <span class="card-status ${biller.live ? 'is-live' : 'is-offline'}">${biller.live ? 'Live' : 'Non-Live'}</span>
        </div>
      </div>
      <div class="card-actions">
        ${createActionButton(biller.kbLink, 'Open KB', 'fa-book', 'kb')}
        ${createActionButton(biller.adLink, 'Open AD', 'fa-server', 'ad')}
      </div>
      <div class="card-grid">
        ${createCopyableField('IVR Number', biller.ivr)}
        ${createCopyableField('Customer Service', biller.csr)}
        <div class="card-item card-notes"><strong>Notes</strong><div>${biller.notes || '—'}</div></div>
      </div>`;

    dom.billerCard.querySelectorAll('.btn-biller-card, .icon-btn-copy, #favoriteToggleBtn').forEach(button => {
        button.addEventListener('click', (e) => {
            const currentTarget = e.currentTarget;
            if (currentTarget.dataset.link) {
                window.open(currentTarget.dataset.link, '_blank', 'noopener,noreferrer');
            } else if (currentTarget.classList.contains('icon-btn-copy')) {
                const textToCopy = currentTarget.previousElementSibling.textContent;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const icon = currentTarget.querySelector('i');
                    icon.classList.replace('fa-copy', 'fa-check');
                    currentTarget.classList.add('is-copied');
                    setTimeout(() => {
                        icon.classList.replace('fa-check', 'fa-copy');
                        currentTarget.classList.remove('is-copied');
                    }, 1500);
                });
            } else if (currentTarget.id === 'favoriteToggleBtn') {
                Features.Favorites.toggle(biller.id);
            }
        });
    });

    UI.Favorites.updateStar(Features.Favorites.isFavorite(biller.id));
    dom.billerCard.hidden = false;
  },

  renderSuggestions(suggestions, query) {
    dom.suggestionsList.innerHTML = '';
    if (suggestions.length === 0) { this.clearSuggestions(); return; }
    const fragment = document.createDocumentFragment();
    const queryRegex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'ig');
    suggestions.slice(0, 7).forEach((biller, index) => {
      const item = document.createElement('li');
      item.className = 'suggestion-item';
      item.id = `suggestion-${index}`;
      item.dataset.id = biller.id;
      const highlightedName = biller.name.replace(queryRegex, `<strong>$1</strong>`);
      item.innerHTML = `<span>${highlightedName}</span><span class="suggestion-tla">${biller.tla}</span>`;
      fragment.appendChild(item);
    });
    dom.suggestionsList.appendChild(fragment);
    dom.suggestionsList.hidden = false;
    dom.searchWrapper.setAttribute('aria-expanded', 'true');
    if (suggestions.length > 0) {
      state.activeSuggestionIndex = 0;
      this.updateActiveSuggestion();
    } else {
      state.activeSuggestionIndex = -1;
    }
  },

  clearSuggestions() {
    state.currentSuggestions = [];
    state.activeSuggestionIndex = -1;
    dom.suggestionsList.innerHTML = '';
    dom.suggestionsList.hidden = true;
    dom.searchWrapper.setAttribute('aria-expanded', 'false');
    dom.searchInput.removeAttribute('aria-activedescendant');
  },

  updateActiveSuggestion() {
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
  },

  showNotification(message, type = 'info') {
    dom.notificationBanner.textContent = message;
    dom.notificationBanner.className = `notification-banner is-${type}`;
    dom.notificationBanner.hidden = false;
    setTimeout(() => { dom.notificationBanner.hidden = true; }, 4000);
  },

  updateOfflineIndicator(isOnline) {
    if (!isOnline) {
      this.showNotification('You are currently offline. Some features may be limited.', 'error');
    } else {
      if (!dom.notificationBanner.hidden) {
        this.showNotification('You are back online!', 'success');
      }
    }
  },

  // --- UI SUB-MODULES ---

  Favorites: {
    render(favoriteIds) {
      dom.favoritesList.innerHTML = '';
      if (favoriteIds.length === 0) {
        dom.favoritesList.innerHTML = `<li class="empty-state">Star a biller to add a favorite!</li>`;
        return;
      }
      const fragment = document.createDocumentFragment();
      favoriteIds.forEach(id => {
        const biller = DataHelpers.getBillerById(BILLERS, id);
        if (biller) {
          const item = document.createElement('li');
          item.className = 'favorite-item';
          item.dataset.id = biller.id;
          item.innerHTML = `<span class="status-dot ${biller.live ? 'is-live' : 'is-offline'}"></span>
                            <span class="favorite-name">${biller.name}</span>
                            <button class="icon-btn icon-btn-remove" aria-label="Remove ${biller.name} from favorites"><i class="fa-solid fa-times"></i></button>`;
          fragment.appendChild(item);
        }
      });
      dom.favoritesList.appendChild(fragment);
      this.attachEventListeners();
    },
    attachEventListeners() {
        dom.favoritesList.querySelectorAll('.favorite-item').forEach(item => {
            item.querySelector('.favorite-name').addEventListener('click', (e) => {
                selectBillerById(e.currentTarget.parentElement.dataset.id);
            });
            item.querySelector('.icon-btn-remove').addEventListener('click', (e) => {
                Features.Favorites.toggle(parseInt(e.currentTarget.parentElement.dataset.id));
            });
        });
    },
    updateStar(isFavorite) {
      const starBtn = dom.billerCard.querySelector('#favoriteToggleBtn');
      if (starBtn) {
        starBtn.classList.toggle('is-favorite', isFavorite);
        const icon = starBtn.querySelector('i');
        icon.className = isFavorite ? 'fa-solid fa-star' : 'fa-regular fa-star';
      }
    },
    toggleVisibility() {
      dom.favoritesSection.classList.toggle('is-expanded');
    }
  },

  Settings: {
    /**
     * FIXED: This function now checks if a DOM element exists before
     * trying to set its `checked` property, preventing crashes.
     */
    syncToggles(settings) {
      if (dom.toggleAreaZipUI) dom.toggleAreaZipUI.checked = settings.showAreaZipUI;
      if (dom.toggleSuggestions) dom.toggleSuggestions.checked = settings.suggestionsEnabled;
      if (dom.toggleNotifications) dom.toggleNotifications.checked = settings.notificationsEnabled;
      if (dom.toggleOfflineMode) dom.toggleOfflineMode.checked = settings.offlineMode;
      if (dom.toggleAnalytics) dom.toggleAnalytics.checked = settings.showAnalytics;
    },
    apply(settings) {
      if (settings.showAreaZipUI !== undefined) {
        dom.areaZipLookup.hidden = !settings.showAreaZipUI;
      }
      if (settings.showAnalytics !== undefined) {
        dom.analyticsDiv.hidden = !settings.showAnalytics;
      }
    }
  },
  
  Analytics: {
    chartInstance: null,
    renderChart(chartData) {
        if (typeof Chart === 'undefined') {
            dom.analyticsDiv.innerHTML = '<h3 id="analytics-heading">Usage Analytics</h3><p class="empty-state">Charting library not available.</p>';
            return;
        }
        if (this.chartInstance) this.chartInstance.destroy();
        if (!dom.analyticsChart) return;
        const ctx = dom.analyticsChart.getContext('2d');
        this.chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Most Viewed Billers',
                    data: chartData.data,
                    backgroundColor: 'rgba(58, 130, 246, 0.6)',
                    borderColor: 'rgba(58, 130, 246, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: { y: { beginAtZero: true } },
                plugins: { legend: { display: false } }
            }
        });
    }
  },
  
  Location: {
    clearSuggestions() {
      LocationFeature.currentSuggestions = [];
      LocationFeature.activeSuggestionIndex = -1;
      dom.locationSuggestionsList.innerHTML = '';
      dom.locationSuggestionsList.hidden = true;
      dom.locationInput.removeAttribute('aria-activedescendant');
      dom.locationResultsBox.hidden = true;
    },
    renderSuggestions(suggestions) {
      dom.locationSuggestionsList.innerHTML = '';
      if (!suggestions || suggestions.length === 0) { this.clearSuggestions(); return; }
      const fragment = document.createDocumentFragment();
      suggestions.slice(0, 5).forEach((suggestion, index) => {
        const item = document.createElement('li');
        item.className = 'suggestion-item';
        item.id = `location-suggestion-${index}`;
        item.dataset.code = suggestion.code;
        item.innerHTML = `<span>${suggestion.code}</span><span class="suggestion-tla">${suggestion.location}</span>`;
        fragment.appendChild(item);
      });
      dom.locationSuggestionsList.appendChild(fragment);
      dom.locationSuggestionsList.hidden = false;
      if (suggestions.length > 0) {
        LocationFeature.activeSuggestionIndex = 0;
        this.updateActiveSuggestion(LocationFeature.activeSuggestionIndex);
      }
    },
    updateActiveSuggestion(activeIndex) {
      dom.locationSuggestionsList.querySelectorAll('.suggestion-item').forEach((item, index) => {
        if (index === activeIndex) {
          item.classList.add('is-active');
          item.setAttribute('aria-selected', 'true');
          dom.locationInput.setAttribute('aria-activedescendant', item.id);
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('is-active');
          item.setAttribute('aria-selected', 'false');
        }
      });
    },
    displayLocationResultBox(locationData) {
        let billersHtml = `<div class="empty-state">No primary billers listed.</div>`;
        if (locationData.billers.length > 0) {
            billersHtml = locationData.billers.map(biller => 
                `<button class="location-result-item" data-id="${biller.id}">
                    <strong>${biller.tla}</strong>
                    <span>${biller.name}</span>
                </button>`
            ).join('');
        }
        dom.locationResultsBox.innerHTML = billersHtml;
        dom.locationResultsBox.querySelectorAll('.location-result-item').forEach(button => {
            button.addEventListener('click', (e) => selectBillerById(e.currentTarget.dataset.id));
        });
        dom.locationResultsBox.hidden = false;
    }
  },

  Theme: {
    init() { const savedTheme = Utils.storageGet('biller-theme') || 'light'; this.apply(savedTheme); },
    apply(themeName) {
      document.body.className = `theme-${themeName}`;
      Utils.storageSet('biller-theme', themeName);
      const icon = dom.themeToggleBtn.querySelector('i');
      icon.className = themeName === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    },
    toggle() {
      const currentTheme = Utils.storageGet('biller-theme') || 'light';
      this.apply(currentTheme === 'light' ? 'dark' : 'light');
    }
  },
  
  Popover: {
    toggle(popover, button) { popover.hidden ? this.open(popover, button) : this.close(popover, button); },
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
  },

  Modal: {
    open(modalElement) {
      this.lastFocused = document.activeElement; state.activeModal = modalElement;
      modalElement.hidden = false; modalElement.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      modalElement.querySelector('[role="dialog"]').focus();
    },
    close(modalElement) {
      state.activeModal = null; modalElement.classList.remove('is-open');
      document.body.style.overflow = '';
      if (this.lastFocused) this.lastFocused.focus();
    },
    generateBillerDirectory() {
      const sortedBillers = DataHelpers.sortBillersByName(BILLERS);
      const listHtml = sortedBillers.map(biller => `
        <li class="directory-item">
          <span class="status-dot ${biller.live ? 'is-live' : 'is-offline'}"></span>
          <span class="directory-name">${biller.name}</span>
          <span class="directory-tla">${biller.tla}</span>
        </li>`).join('');
      dom.directoryModalList.innerHTML = `<ul role="list">${listHtml}</ul>`;
    }
  },

  Drawer: {
    open(drawerElement) {
        this.lastFocused = document.activeElement; state.activeDrawer = drawerElement;
        drawerElement.hidden = false;
        requestAnimationFrame(() => {
            document.body.style.overflow = 'hidden'; drawerElement.classList.add('is-open');
            const firstFocusable = drawerElement.querySelector('button, input, [href]');
            if (firstFocusable) firstFocusable.focus();
        });
    },
    close(drawerElement) {
        if (!drawerElement) return;
        drawerElement.classList.remove('is-open'); document.body.style.overflow = '';
        if (this.lastFocused) this.lastFocused.focus();
        state.activeDrawer = null;
    }
  },
  
  Tools: {
      isLoaded: false,
      toggle() {
          if (!this.isLoaded) this.load();
          UI.Drawer.open(dom.toolsPanel);
      },
      load() {
          const templateContent = dom.toolsPanelTemplate.content.cloneNode(true);
          dom.toolsPanel.appendChild(templateContent);
          dom.toolsKbSearch = document.getElementById('toolsKbSearch');
          dom.kbList = document.getElementById('kbList');
          dom.toolsPanel.querySelector('#toolsCloseBtn').addEventListener('click', () => UI.Drawer.close(dom.toolsPanel));
          dom.toolsKbSearch.addEventListener('input', Utils.debounce(Features.Tools.handleSearch, 200));
          this.isLoaded = true;
          Features.Tools.init();
      },
      renderKBArticles(articles) {
        if (!dom.kbList) return;
        dom.kbList.innerHTML = '';
        if (articles.length === 0) {
            dom.kbList.innerHTML = `<li class="empty-state">No articles found.</li>`;
            return;
        }
        const fragment = document.createDocumentFragment();
        articles.forEach(article => {
            const item = document.createElement('li');
            item.innerHTML = `<a href="${article.link}" target="_blank" rel="noopener noreferrer">${article.title}</a>`;
            fragment.appendChild(item);
        });
        dom.kbList.appendChild(fragment);
      }
  }
};


// --- APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', init);

function init() {
    try {
        Features.Settings.init();
        LocationFeature.init();
        
        const useFallback = state.settings.offlineMode || typeof Fuse === 'undefined';
        if (useFallback) {
            searchService = { search: (query) => BILLERS.filter(b => b.name.toLowerCase().includes(query.toLowerCase()) || b.tla.toLowerCase().includes(query.toLowerCase())).map(item => ({ item })) };
        } else {
            searchService = new Fuse(BILLERS, { keys: [{ name: 'tla', weight: 0.9 }, { name: 'name', weight: 0.7 }, { name: 'aliases', weight: 0.5 }], includeMatches: true, threshold: 0.4, minMatchCharLength: 1 });
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
        
        const shortcuts = { 'T': dom.themeToggleBtn, 'F': dom.favoritesBtn, 'D': dom.directoryBtn, 'W': dom.toolsBtn };
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

/**
 * FIXED: Service Worker registration now checks the protocol to prevent errors
 * when running from local files (file:///).
 */
window.addEventListener('load', () => {
  if ('serviceWorker' in navigator && (location.protocol === 'http:' || location.protocol === 'https:')) {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => console.log('ServiceWorker registration successful with scope: ', registration.scope))
      .catch(error => console.log('ServiceWorker registration failed: ', error));
  }
});