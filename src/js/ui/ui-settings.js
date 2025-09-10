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
        'toggleSuggestions': settings.suggestionsEnabled,
        'toggleCompactDensity': settings.compactDensity,
        'toggleAnalytics': settings.showAnalytics,
        'toggleDebugLog': settings.showDebugLog,
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
    if (settings.showAnalytics !== undefined && dom.analyticsDiv) {
      dom.analyticsDiv.hidden = !settings.showAnalytics;
    }
    if (settings.compactDensity !== undefined) {
      document.body.classList.toggle('density-compact', settings.compactDensity);
    }
    if (settings.showDebugLog !== undefined && dom.debugLog) {
      dom.debugLog.hidden = !settings.showDebugLog;
    }
  }
};