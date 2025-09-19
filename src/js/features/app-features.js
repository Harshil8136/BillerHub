/**
 * APP FEATURES
 * ==================
 * This file contains the logic for the application's major features.
 */

const Features = {

  Favorites: {
    list: [],
    
    _updateSidebarVisibility() {
      const favoritesSection = document.querySelector('.favorites-section');
      if (!favoritesSection) return;

      // Only show the sidebar if the setting is enabled AND there are favorites.
      const shouldShow = state.settings.showFavoritesSidebar && this.list.length > 0;
      favoritesSection.style.display = shouldShow ? 'block' : 'none';
      
      if (shouldShow) {
        UI.Favorites.renderInSidebar(this.list);
      }
    },

    init() { 
      this.list = Utils.storageGet('biller-favorites', []); 
      // Visibility is now handled by UI.Settings.apply() on init, but we call this
      // to render the list if it's already supposed to be visible.
      this._updateSidebarVisibility();
    },

    toggle(billerId) {
      const billerIdInt = parseInt(billerId);
      const index = this.list.indexOf(billerIdInt);
      let isFavorite = false;
      
      if (index > -1) {
        this.list.splice(index, 1);
      } else {
        this.list.push(billerIdInt);
        isFavorite = true;
      }
      
      Utils.storageSet('biller-favorites', this.list);

      const displayedBillerId = dom.billerCard.querySelector('.card-title-group')?.dataset.billerId;
      if (displayedBillerId == billerId) {
          UI.Favorites.updateStar(isFavorite);
      }
      
      this._updateSidebarVisibility();

      if (state.activePopover && document.getElementById('settingsMenuFavorites')) {
          UI.Favorites.renderInSettings(this.list);
      }
    },

    isFavorite(billerId) { return this.list.includes(parseInt(billerId)); }
  },

  Settings: {
    init() {
      const settings = {
        suggestionsEnabled: Utils.storageGet('biller-setting-suggestionsEnabled', true),
        compactDensity: Utils.storageGet('biller-setting-compactDensity', false),
        telemetryEnabled: Utils.storageGet('telemetry-consent', true),
        displayName: Utils.storageGet('telemetry-displayName', ''),
        animatedTitleEnabled: Utils.storageGet('biller-setting-animatedTitle', true),
        clockShowLocation: Utils.storageGet('biller-setting-clockShowLocation', true),
        showFavoritesSidebar: Utils.storageGet('biller-setting-showFavoritesSidebar', false)
      };
      state.settings = settings;
      UI.Settings.syncToggles(settings);
      UI.Settings.apply(settings);

      this.initDisplayNameEditor();
    },

    initDisplayNameEditor() {
        const greetingContainer = document.getElementById('settingsGreetingContainer');
        const greetingEl = document.getElementById('settingsGreeting');
        const editBtn = document.getElementById('editNameBtn');
        const inputWrapper = document.getElementById('displayNameWrapper');
        const displayNameInput = document.getElementById('displayNameInput');

        if (!greetingContainer || !greetingEl || !editBtn || !inputWrapper || !displayNameInput) return;

        const saveName = () => {
            const newName = displayNameInput.value.trim();
            Utils.storageSet('telemetry-displayName', newName);
            state.settings.displayName = newName;
            Telemetry.displayName = newName;
            
            greetingEl.textContent = newName ? `Hi, ${newName}!` : 'Settings';
            inputWrapper.hidden = true;
            greetingContainer.hidden = false;
        };

        editBtn.addEventListener('click', () => {
            greetingContainer.hidden = true;
            inputWrapper.hidden = false;
            displayNameInput.value = state.settings.displayName;
            displayNameInput.focus();
        });

        displayNameInput.addEventListener('blur', saveName);
        displayNameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveName();
            } else if (e.key === 'Escape') {
                inputWrapper.hidden = true;
                greetingContainer.hidden = false;
            }
        });
    },

    handleToggle(e) {
      const { id, checked } = e.target;
      let settingKey;
      switch (id) {
        case 'toggleTelemetry':
            settingKey = 'telemetry-consent';
            state.settings.telemetryEnabled = checked;
            break;
        case 'toggleSuggestions':
            settingKey = 'biller-setting-suggestionsEnabled';
            state.settings.suggestionsEnabled = checked;
            if (!checked) UI.Search.clearSuggestions();
            break;
        case 'toggleCompactDensity':
            settingKey = 'biller-setting-compactDensity';
            state.settings.compactDensity = checked;
            break;
        case 'toggleDebugLog':
            settingKey = 'biller-setting-showDebugLog';
            state.settings.showDebugLog = checked;
            break;
        case 'toggleTitleAnimation':
            settingKey = 'biller-setting-animatedTitle';
            state.settings.animatedTitleEnabled = checked;
            break;
        case 'toggleClockLocation':
            settingKey = 'biller-setting-clockShowLocation';
            state.settings.clockShowLocation = checked;
            break;
        case 'toggleFavoritesSidebar':
            settingKey = 'biller-setting-showFavoritesSidebar';
            state.settings.showFavoritesSidebar = checked;
            // Also need to update sidebar visibility immediately
            this.Favorites._updateSidebarVisibility();
            break;
      }
      if (settingKey) Utils.storageSet(settingKey, checked);
      UI.Settings.apply(state.settings);
    }
  },

  FontSize: {
    BASE_SIZE: 16, MIN_SIZE: 12, MAX_SIZE: 20, STEP: 1, currentSize: 16,
    init() { this.currentSize = Utils.storageGet('biller-fontSize', this.BASE_SIZE); this.apply(this.currentSize); },
    increase() { this.apply(Math.min(this.currentSize + this.STEP, this.MAX_SIZE)); },
    decrease() { this.apply(Math.max(this.currentSize - this.STEP, this.MIN_SIZE)); },
    apply(size) {
      const multiplier = size / this.BASE_SIZE;
      document.body.style.setProperty('--biller-font-size-multiplier', multiplier);
      this.currentSize = size;
      Utils.storageSet('biller-fontSize', size);
    }
  },

  Analytics: {
    logBillerView(biller) {
      Telemetry.logEvent('biller_view', { tla: biller.tla, biller_id: biller.id });
    }
  },
  
  Tools: {
    init() { if (typeof KB_ARTICLES !== 'undefined') UI.Tools.renderKBArticles(KB_ARTICLES); },
    handleSearch(e) {
      const query = e.target.value.toLowerCase().trim();
      if (typeof KB_ARTICLES === 'undefined') return;
      if (!query) {
          UI.Tools.renderKBArticles(KB_ARTICLES);
          return;
      }
      const filtered = KB_ARTICLES.filter(a => a.title.toLowerCase().includes(query));  
      UI.Tools.renderKBArticles(filtered);
    }
  },

  System: {
    async resetApplication() {
      if (confirm("Are you sure you want to reset the application?\nThis will clear all data and reload.")) {
        try {
          UI.Notifications.show('Resetting application...', 'info');
          await DB.deleteDatabase();
          localStorage.clear();
          caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))));
          location.reload(true);
        } catch (error) {
          UI.Notifications.show('Reset failed. Please clear browser data manually.', 'error');
          Telemetry.logError(error, 'resetApplication');
        }
      }
    }
  }
};

// Make Favorites accessible to the Settings handler
Features.Settings.Favorites = Features.Favorites;