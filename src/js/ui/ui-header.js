/**
 * UI HEADER
 * ==================
 * This module manages dynamic UI elements within the main application header,
 * such as swapping the clock for a personalized user greeting.
 */

UI.Header = {
  /**
   * Initializes the header UI state.
   */
  init: function() {
    this.updateGreeting();
  },

  /**
   * Updates the header to show either the clock or a personalized greeting,
   * based on the user's name and settings.
   */
  updateGreeting: function() {
    const clockWidget = document.getElementById('clockWidget');
    const headerGreeting = document.getElementById('headerGreeting');
    
    if (!clockWidget || !headerGreeting) return;

    const displayName = state.settings.displayName;
    const showGreeting = state.settings.showGreetingInHeader;

    if (showGreeting && displayName) {
      headerGreeting.textContent = `Welcome, ${displayName}`;
      clockWidget.hidden = true;
      headerGreeting.hidden = false;
    } else {
      clockWidget.hidden = false;
      headerGreeting.hidden = true;
    }
  }
};