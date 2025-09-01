/**
 * UI COMPONENTS
 * ==================
 * This file defines the global UI object which contains all functions
 * that directly manipulate the DOM and render visual updates.
 */

const UI = {
  suggestionsVirtualList: null,

  displayBiller(biller) {
    if (!biller) {
      dom.billerCard.hidden = true;
      return;
    }
    dom.locationCard.hidden = true;
    if (dom.locationResultsBox) {
        dom.locationResultsBox.hidden = true;
    }

    const paymentTypeHtml = biller.paymentTypes && biller.paymentTypes.length > 0 
      ? `<span class="payment-type-tag">${biller.paymentTypes.join(', ')}</span>`
      : '';

    const createActionButton = (url, text, icon, type) => {
      // Per the plan, if a link is null, we don't render the button.
      if (!url) return '';
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="btn-biller-card btn-${type}"><i class="fa-solid ${icon}"></i> ${text}</a>`;
    };
    
    const createCopyableField = (label, value) => {
      if (!value) return '';
      return `<div class="quick-link-item">
                <strong>${label}</strong>
                <div class="copyable-field compact">
                    <span>${value}</span>
                    <button class="icon-btn icon-btn-copy" aria-label="Copy ${label}"><i class="fa-solid fa-copy"></i></button>
                </div>
              </div>`;
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
      <div class="biller-action-bar">
        <div class="action-bar-buttons">
          ${createActionButton(biller.kbLink, 'Knowledge Base', 'fa-book', 'kb')}
          ${createActionButton(biller.adLink, 'Agent Dashboard', 'fa-server', 'ad')}
        </div>
        <div class="action-bar-contacts">
          ${createCopyableField('IVR Number', biller.ivr)}
          ${createCopyableField('Customer Service', biller.csr)}
        </div>
      </div>
      <div class="card-grid">
        <div id="interactiveNotesContainer"></div>
      </div>`;

    dom.billerCard.querySelectorAll('.icon-btn-copy, #favoriteToggleBtn').forEach(button => {
        button.addEventListener('click', (e) => {
            const currentTarget = e.currentTarget;
            if (currentTarget.classList.contains('icon-btn-copy')) {
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
                Features.Favorites.toggle(parseInt(biller.id));
            }
        });
    });
    
    NotesFeature.loadNotesForBiller(biller);
    UI.Favorites.updateStar(Features.Favorites.isFavorite(biller.id));
    dom.billerCard.hidden = false;
  },

  renderSuggestions(suggestions, query) {
    this.clearSuggestions();
    if (suggestions.length === 0) return;

    const queryRegex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'ig');
    
    this.suggestionsVirtualList = new VirtualList({
      container: dom.suggestionsList,
      items: suggestions,
      itemHeight: 44,
      renderItem: (biller, index) => {
        const highlightedName = biller.name.replace(queryRegex, `<strong>$1</strong>`);
        return `<li class="suggestion-item" id="suggestion-${index}" role="option" data-id="${biller.id}">
                  <span>${highlightedName}</span>
                  <span class="suggestion-tla">${biller.tla}</span>
                </li>`;
      }
    });
    
    dom.suggestionsList.hidden = false;
    dom.searchWrapper.setAttribute('aria-expanded', 'true');
    state.activeSuggestionIndex = -1;
  },

  clearSuggestions() {
    if (this.suggestionsVirtualList) {
      this.suggestionsVirtualList.destroy();
      this.suggestionsVirtualList = null;
    }
    state.currentSuggestions = [];
    state.activeSuggestionIndex = -1;
    dom.suggestionsList.innerHTML = '';
    dom.suggestionsList.hidden = true;
    dom.searchWrapper.setAttribute('aria-expanded', 'false');
    dom.searchInput.removeAttribute('aria-activedescendant');
  },

  updateActiveSuggestion() {
    dom.suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
        const itemId = item.dataset.id;
        const fullListIndex = state.currentSuggestions.findIndex(b => b.id == itemId);

        if (fullListIndex === state.activeSuggestionIndex) {
            item.classList.add('is-active');
            item.setAttribute('aria-selected', 'true');
            dom.searchInput.setAttribute('aria-activedescendant', item.id);
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

  Favorites: {
    render(favoriteIds) {
      dom.favoritesList.innerHTML = '';
      if (favoriteIds.length === 0) {
        dom.favoritesList.innerHTML = `<li class="empty-state">Star a biller to add it here.</li>`;
        return;
      }
      const fragment = document.createDocumentFragment();
      favoriteIds.forEach(id => {
        const biller = DataHelpers.getBillerById(BILLERS, id);
        if (biller) {
          const item = document.createElement('li');
          item.className = 'favorite-item';
          item.dataset.id = biller.id;
          item.setAttribute('role', 'button');
          item.setAttribute('tabindex', '0');
          item.innerHTML = `<span class="favorite-name">${biller.name}</span>
                            <button class="icon-btn icon-btn-remove" aria-label="Remove ${biller.name} from favorites"><i class="fa-solid fa-times"></i></button>`;
          fragment.appendChild(item);
        }
      });
      dom.favoritesList.appendChild(fragment);
      this.attachEventListeners();
    },
    attachEventListeners() {
        dom.favoritesList.querySelectorAll('.favorite-item').forEach(item => {
            const billerId = item.dataset.id;
            item.querySelector('.favorite-name').addEventListener('click', () => selectBillerById(billerId));
            item.querySelector('.icon-btn-remove').addEventListener('click', (e) => {
                e.stopPropagation();
                Features.Favorites.toggle(parseInt(billerId));
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
    syncToggles(settings) {
      if (dom.toggleAreaZipUI) dom.toggleAreaZipUI.checked = settings.showAreaZipUI;
      if (dom.toggleSuggestions) dom.toggleSuggestions.checked = settings.suggestionsEnabled;
      if (dom.toggleNotifications) dom.toggleNotifications.checked = settings.notificationsEnabled;
      if (dom.toggleOfflineMode) dom.toggleOfflineMode.checked = settings.offlineMode;
      if (dom.toggleAnalytics) dom.toggleAnalytics.checked = settings.showAnalytics;
      if (dom.toggleCompactDensity) dom.toggleCompactDensity.checked = settings.compactDensity;
    },
    apply(settings) {
      if (settings.showAreaZipUI !== undefined && dom.areaZipLookup) {
        dom.areaZipLookup.hidden = !settings.showAreaZipUI;
      }
      if (settings.showAnalytics !== undefined && dom.analyticsDiv) {
        dom.analyticsDiv.hidden = !settings.showAnalytics;
      }
      if (settings.compactDensity !== undefined) {
        document.body.classList.toggle('density-compact', settings.compactDensity);
      }
    }
  },
  
  Analytics: {
    chartInstance: null,
    renderChart(chartData) {
        if (typeof Chart === 'undefined') {
            const fallbackHtml = chartData.labels.length > 0
                ? chartData.labels.map((label, i) => `<div class="empty-state-item">${i + 1}. ${label} (${chartData.data[i]})</div>`).join('')
                : '<p class="empty-state">No viewing history yet.</p>';
            dom.analyticsDiv.innerHTML = `<h3 id="analytics-heading">Usage Analytics</h3><div class="empty-state-list">${fallbackHtml}</div>`;
            return;
        }
        if (this.chartInstance) this.chartInstance.destroy();
        const ctx = dom.analyticsChart?.getContext('2d');
        if (!ctx) return;
        this.chartInstance = new Chart(ctx, { /* Chart config... */ });
    }
  },
  
  Location: {
    clearSuggestions() {
      LocationFeature.currentSuggestions = [];
      LocationFeature.activeSuggestionIndex = -1;
      dom.locationSuggestionsList.innerHTML = '';
      dom.locationSuggestionsList.hidden = true;
      dom.locationInput.removeAttribute('aria-activedescendant');
    },
    renderSuggestions(suggestions) {
      dom.locationSuggestionsList.innerHTML = '';
      if (!suggestions || suggestions.length === 0) { 
        this.clearSuggestions(); 
        return; 
      }
      const fragment = document.createDocumentFragment();
      suggestions.slice(0, 5).forEach((suggestion, index) => {
        const item = document.createElement('li');
        item.className = 'suggestion-item';
        item.id = `location-suggestion-${index}`;
        item.setAttribute('role', 'option');
        item.dataset.code = suggestion.code;
        item.innerHTML = `<span>${suggestion.code}</span><span class="suggestion-tla">${suggestion.location}</span>`;
        fragment.appendChild(item);
      });
      dom.locationSuggestionsList.appendChild(fragment);
      dom.locationSuggestionsList.hidden = false;
      this.updateActiveSuggestion(0);
    },
    updateActiveSuggestion(activeIndex) {
      LocationFeature.activeSuggestionIndex = activeIndex;
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
    displayPersistentBillerList(locationData) {
        let billersHtml = `<div class="empty-state">No primary billers listed.</div>`;
        if (locationData.billers.length > 0) {
            billersHtml = locationData.billers.map(biller => 
                `<li>
                    <button class="location-result-item" data-id="${biller.id}">
                        <strong>${biller.tla}</strong>
                        <span>${biller.name}</span>
                    </button>
                </li>`
            ).join('');
        }
        dom.locationResultsBox.innerHTML = `
            <h4 class="location-result-title">${locationData.name}</h4>
            <ul class="location-result-list">${billersHtml}</ul>
        `;
        dom.locationResultsBox.querySelectorAll('.location-result-item').forEach(button => {
            button.addEventListener('click', (e) => selectBillerById(e.currentTarget.dataset.id));
        });
        dom.locationResultsBox.hidden = false;
    }
  },

  Theme: {
    init() { 
        const savedTheme = Utils.storageGet('biller-theme') || 'light'; 
        this.apply(savedTheme); 
    },
    apply(themeName) {
      document.body.className = document.body.className.replace(/theme-\w+/g, '').trim();
      document.body.classList.add(`theme-${themeName}`);
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
    toggle(popover, button) { 
        popover.hidden ? this.open(popover, button) : this.close(popover, button); 
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
  },

  Modal: {
    directoryVirtualList: null,
    
    open(modalElement) {
        state.activeModal = modalElement;
        modalElement.hidden = false; 
        modalElement.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        if (!this.directoryVirtualList && BILLERS.length > 0) {
            const sortedBillers = DataHelpers.sortBillersByName(BILLERS);
            this.directoryVirtualList = new VirtualList({
                container: dom.directoryModalList,
                items: sortedBillers,
                itemHeight: 46,
                renderItem: (biller) => `
                    <li class="directory-item">
                        <span class="status-dot ${biller.live ? 'is-live' : 'is-offline'}"></span>
                        <span class="directory-name">${biller.name}</span>
                        <span class="directory-tla">${biller.tla}</span>
                    </li>`
            });
        }
    },
    close(modalElement) {
        if (this.directoryVirtualList) {
            this.directoryVirtualList.destroy();
            this.directoryVirtualList = null;
        }
        state.activeModal = null; 
        modalElement.classList.remove('is-open');
        document.body.style.overflow = '';
        dom.directoryModalList.innerHTML = '';
    }
  },

  Drawer: {
    open(drawerElement) {
        this.lastFocused = document.activeElement; 
        state.activeDrawer = drawerElement;
        drawerElement.hidden = false;
        requestAnimationFrame(() => {
            drawerElement.classList.add('is-open');
            const firstFocusable = drawerElement.querySelector('button, input, [href]');
            if (firstFocusable) firstFocusable.focus();
        });
    },
    close(drawerElement) {
        if (!drawerElement) return;
        drawerElement.classList.remove('is-open');
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