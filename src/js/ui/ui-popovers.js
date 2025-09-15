/**
 * UI POPOVERS
 * ==================
 * This file contains the UI logic for creating and managing the
 * header-driven popover menus.
 */

UI.Popovers = {
  /**
   * Initializes the popover system by attaching click listeners.
   */
  init() {
    const popoverButtons = {
        favoritesPopoverBtn: { popover: dom.favoritesPopover },
        themePopoverBtn: { popover: dom.themePopover },
        settingsBtn: { popover: dom.settingsPopover },
    };

    for (const btnId in popoverButtons) {
        const buttonEl = dom[btnId];
        const popoverEl = popoverButtons[btnId].popover;
        if (buttonEl && popoverEl) {
            buttonEl.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle(popoverEl, buttonEl);
            });
        }
    }
  },

  /**
   * Toggles a popover's visibility, ensuring only one is open at a time.
   */
  toggle(popoverEl, buttonEl) {
    const isAlreadyOpen = state.activePopover && state.activePopover.popover === popoverEl;

    if (state.activePopover) {
      this.closeActive();
    }

    if (!isAlreadyOpen) {
      this.open(popoverEl, buttonEl);
    }
  },

  /**
   * Opens a specific popover and handles any special logic.
   */
  open(popoverEl, buttonEl) {
    if (!popoverEl || !buttonEl) return;

    popoverEl.hidden = false;
    buttonEl.setAttribute('aria-expanded', 'true');
    state.activePopover = { popover: popoverEl, button: buttonEl };

    if (popoverEl === dom.favoritesPopover) {
        UI.Favorites.render(Features.Favorites.list);
    }
    
    if (popoverEl === dom.settingsPopover) {
        // Set the initial state of the greeting when the popover is opened
        const greetingContainer = document.getElementById('settingsGreetingContainer');
        const greetingEl = document.getElementById('settingsGreeting');
        const inputWrapper = document.getElementById('displayNameWrapper');
        const displayName = Utils.storageGet('telemetry-displayName', '');

        if (greetingEl) {
          greetingEl.textContent = displayName ? `Hi, ${displayName}!` : 'Settings';
        }
        if (greetingContainer) greetingContainer.hidden = false;
        if (inputWrapper) inputWrapper.hidden = true;
    }
  },

  /**
   * Closes the currently active popover.
   */
  closeActive() {
    if (!state.activePopover) {
      return;
    }
    const { popover, button } = state.activePopover;
    popover.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    state.activePopover = null;
  }
};