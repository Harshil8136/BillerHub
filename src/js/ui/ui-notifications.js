/**
 * UI NOTIFICATIONS
 * ==================
 * This module manages the app-wide notification banner.
 */

UI.Notifications = {
  /**
   * Displays a notification banner at the top of the page.
   * @param {string} message The message to display.
   * @param {string} [type='info'] The type of notification ('info', 'success', 'error').
   */
  show: function(message, type = 'info') {
    if (!dom.notificationBanner) return;
    dom.notificationBanner.textContent = message;
    dom.notificationBanner.className = `notification-banner is-${type}`;
    dom.notificationBanner.hidden = false;
    setTimeout(() => { dom.notificationBanner.hidden = true; }, 4000);
  },

  /**
   * Shows or hides a notification based on the browser's online status.
   * @param {boolean} isOnline True if the browser is online.
   */
  updateOfflineIndicator: function(isOnline) {
    if (!isOnline) {
      this.show('You are currently offline. Some features may be limited.', 'error');
    } else {
      // Only show the "back online" message if a banner was already visible
      if (dom.notificationBanner && !dom.notificationBanner.hidden) {
        this.show('You are back online!', 'success');
      }
    }
  },
};