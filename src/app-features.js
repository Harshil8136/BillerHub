/**
 * APP FEATURES
 * ==================
 * This file contains the logic for the application's major features.
 */

const Features = {

  // --- FAVORITES MODULE ---
  Favorites: {
    list: [],
    init() {
      this.list = Utils.storageGet('biller-favorites', []);
      UI.Favorites.render(this.list);
    },
    toggle(billerId) {
      let isFavorite = false;
      if (this.list.includes(billerId)) {
        this.list = this.list.filter(id => id !== billerId);
        isFavorite = false;
      } else {
        this.list.push(billerId);
        isFavorite = true;
      }
      Utils.storageSet('biller-favorites', this.list);
      UI.Favorites.render(this.list);
      const displayedBillerId = dom.billerCard.querySelector('.card-title-group')?.dataset.billerId;
      if (displayedBillerId == billerId) {
          UI.Favorites.updateStar(isFavorite);
      }
      return isFavorite;
    },
    isFavorite(billerId) {
      return this.list.includes(billerId);
    }
  },

  // --- SETTINGS MODULE ---
  Settings: {
    init() {
      const settings = {
        showAreaZipUI: Utils.storageGet('biller-setting-showAreaZipUI', false),
        suggestionsEnabled: Utils.storageGet('biller-setting-suggestionsEnabled', true),
        notificationsEnabled: Utils.storageGet('biller-setting-notificationsEnabled', false),
        offlineMode: Utils.storageGet('biller-setting-offlineMode', false),
        showAnalytics: Utils.storageGet('biller-setting-showAnalytics', true), // NEW
      };
      state.settings = settings;
      UI.Settings.syncToggles(settings);
      UI.Settings.apply(settings);
    },
    handleToggle(e) {
      const settingId = e.target.id;
      const isChecked = e.target.checked;
      let settingKey;
      switch (settingId) {
        case 'toggleAreaZipUI':
          settingKey = 'biller-setting-showAreaZipUI';
          state.settings.showAreaZipUI = isChecked;
          UI.Settings.apply({ showAreaZipUI: isChecked });
          break;
        case 'toggleSuggestions':
          settingKey = 'biller-setting-suggestionsEnabled';
          state.settings.suggestionsEnabled = isChecked;
          if (!isChecked) UI.clearSuggestions();
          break;
        case 'toggleNotifications':
          settingKey = 'biller-setting-notificationsEnabled';
          state.settings.notificationsEnabled = isChecked;
          Features.Settings.handleNotificationPermission(isChecked);
          break;
        case 'toggleOfflineMode':
          settingKey = 'biller-setting-offlineMode';
          state.settings.offlineMode = isChecked;
          alert("Reload the page for Offline Mode changes to take effect.");
          break;
        case 'toggleAnalytics': // NEW
          settingKey = 'biller-setting-showAnalytics';
          state.settings.showAnalytics = isChecked;
          UI.Settings.apply({ showAnalytics: isChecked });
          break;
      }
      if (settingKey) Utils.storageSet(settingKey, isChecked);
    },
    handleNotificationPermission(isEnabled) {
      if (!isEnabled || !('Notification' in window)) return;
      if (Notification.permission === 'granted') {
        UI.showNotification('Test Notification', 'You have enabled notifications!');
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            UI.showNotification('Test Notification', 'You have enabled notifications!');
          }
        });
      }
    }
  },

  // --- ANALYTICS MODULE ---
  Analytics: {
    init() { this.updateChart(); },
    logBillerView(biller) {
      const maxHistory = 50;
      state.searchHistory.push(biller);
      if (state.searchHistory.length > maxHistory) {
        state.searchHistory.shift();
      }
      Utils.storageSet('biller-searchHistory', state.searchHistory);
      this.updateChart();
    },
    updateChart() {
      const chartData = DataHelpers.processSearchHistoryForChart(state.searchHistory, 5);
      UI.Analytics.renderChart(chartData);
    }
  },
  
  // --- TOOLS MODULE ---
  Tools: {
    init() {
        UI.Tools.renderKBArticles(KB_ARTICLES);
    },
    handleSearch() {
        const query = dom.toolsKbSearch.value.toLowerCase().trim();
        if (typeof KB_ARTICLES === 'undefined') return;

        if (!query) {
            UI.Tools.renderKBArticles(KB_ARTICLES);
            return;
        }
        
        const filteredArticles = KB_ARTICLES.filter(article => 
            article.title.toLowerCase().includes(query)
        );
        
        UI.Tools.renderKBArticles(filteredArticles);
    }
  }
};