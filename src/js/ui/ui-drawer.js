/**
 * UI DRAWER
 * ==================
 * This module contains the generic UI logic for opening and closing
 * the slide-out drawer panel.
 */

UI.Drawer = {
  /**
   * Opens a drawer panel.
   * @param {HTMLElement} drawerElement The drawer element to open.
   */
  open(drawerElement) {
      state.activeDrawer = drawerElement;
      drawerElement.hidden = false;
      requestAnimationFrame(() => {
          drawerElement.classList.add('is-open');
          const firstFocusable = drawerElement.querySelector('button, input, [href]');
          if (firstFocusable) firstFocusable.focus();
      });
  },

  /**
   * Closes an active drawer panel.
   * @param {HTMLElement} drawerElement The drawer element to close.
   */
  close(drawerElement) {
      if (!drawerElement) return;
      state.activeDrawer = null;
      drawerElement.classList.remove('is-open');
      setTimeout(() => {
          if (!state.activeDrawer) drawerElement.hidden = true;
      }, 300); // Matches the CSS transition duration
  }
};