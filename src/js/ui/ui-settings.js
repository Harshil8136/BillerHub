/**
 * UI SETTINGS
 * ==================
 * This module handles the UI logic for the Settings popover,
 * such as synchronizing toggle switches and applying visual changes.
 */

UI.Settings = {
  /**
   * Synchronizes the state of the toggle switches in the UI with the
   * provided settings object.
   * @param {object} settings The application's current settings.
   */
  syncToggles(settings) {
    const toggles = {
        'toggleTelemetry': settings.telemetryEnabled,
        'toggleSuggestions': settings.suggestionsEnabled,
        'toggleCompactDensity': settings.compactDensity,
        'toggleHeaderGreeting': settings.showGreetingInHeader,
        'toggleTitleAnimation': settings.animatedTitleEnabled,
        'toggleDebugLog': settings.showDebugLog,
        'toggleFavoritesSidebar': settings.showFavoritesSidebar
    };
    for (const id in toggles) {
        const el = document.getElementById(id);
        if (el) el.checked = toggles[id];
    }
  },

  /**
   * Applies settings changes to the DOM.
   * @param {object} settings The application's current settings.
   */
  apply(settings) {
    if (settings.compactDensity !== undefined) {
      document.body.classList.toggle('density-compact', settings.compactDensity);
    }
    if (settings.showDebugLog !== undefined && dom.debugLog) {
      dom.debugLog.hidden = !settings.showDebugLog;
    }
    if (settings.animatedTitleEnabled !== undefined && dom.appTitle) {
      dom.appTitle.classList.toggle('is-animated', settings.animatedTitleEnabled);
    }
    if (settings.showFavoritesSidebar !== undefined) {
      document.body.classList.toggle('sidebar-is-enabled', settings.showFavoritesSidebar);
    }
  }
};