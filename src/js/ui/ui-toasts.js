/**
 * UI TOASTS
 * ==================
 * This module manages the display of non-intrusive "toast" notifications.
 */

UI.Toasts = {
  /**
   * Displays a short-lived, non-interactive toast notification.
   * @param {string} message The message to display in the toast.
   * @param {number} [duration=1500] How long the toast should be visible in milliseconds.
   */
  show: function(message, duration = 1500) {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // Force reflow to ensure CSS transition is applied
    void toast.offsetWidth; 
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => {
        toast.remove();
        if (toastContainer.children.length === 0) {
          toastContainer.remove();
        }
      }, { once: true });
    }, duration);
  }
};