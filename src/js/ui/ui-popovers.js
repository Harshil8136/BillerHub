/**
 * UI POPOVERS
 * ==================
 * This file contains the UI logic for creating and managing the
 * header-driven popover menus.
 */

UI.Popovers = {
  _boundHandlers: {},
  _originalParents: new WeakMap(),

  /**
   * Initializes the popover system by attaching click listeners.
   */
  init() {
    const popoverButtons = {
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
   * Opens a specific popover, moves it to the dedicated layer, and positions it.
   */
  open(popoverEl, buttonEl) {
    if (!popoverEl || !buttonEl) return;
    
    const popoverLayer = document.getElementById('popover-layer');
    if (!popoverLayer) {
      console.error('Critical: #popover-layer element not found in the DOM.');
      return;
    }

    // Store original parent and move popover to the dedicated layer
    this._originalParents.set(popoverEl, popoverEl.parentElement);
    popoverLayer.appendChild(popoverEl);

    popoverEl.hidden = false;
    buttonEl.setAttribute('aria-expanded', 'true');
    state.activePopover = { popover: popoverEl, button: buttonEl };
    
    requestAnimationFrame(() => {
        Positioning.adjust(buttonEl, popoverEl, { align: 'right' });
    });

    this._addEventListeners();

    if (popoverEl === dom.settingsPopover) {
        const greetingEl = document.getElementById('settingsGreeting');
        if (greetingEl) {
            const displayName = Utils.storageGet('telemetry-displayName', '');
            greetingEl.textContent = displayName ? `Hi, ${displayName}!` : 'Settings';
        }
        document.getElementById('settingsGreetingContainer').hidden = false;
        document.getElementById('displayNameWrapper').hidden = true;
    }
  },

  /**
   * Closes the currently active popover and cleans up listeners.
   */
  closeActive() {
    if (!state.activePopover) return;
    const { popover, button } = state.activePopover;
    
    popover.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    
    const originalParent = this._originalParents.get(popover);
    if (originalParent) {
        originalParent.appendChild(popover);
    }

    this._removeEventListeners();
    state.activePopover = null;
  },
  
  _addEventListeners() {
    this._boundHandlers.reposition = this._handleReposition.bind(this);
    this._boundHandlers.outsideClick = this._handleOutsideClick.bind(this);
    this._boundHandlers.escapeKey = this._handleEscapeKey.bind(this);

    window.addEventListener('resize', this._boundHandlers.reposition, { passive: true });
    document.addEventListener('scroll', this._boundHandlers.reposition, { capture: true, passive: true });
    document.addEventListener('click', this._boundHandlers.outsideClick);
    document.addEventListener('keydown', this._boundHandlers.escapeKey);
  },

  _removeEventListeners() {
    window.removeEventListener('resize', this._boundHandlers.reposition);
    document.removeEventListener('scroll', this._boundHandlers.reposition, { capture: true });
    document.removeEventListener('click', this._boundHandlers.outsideClick);
    document.removeEventListener('keydown', this._boundHandlers.escapeKey);
  },
  
  _repositionWithThrottle() {
      if (!this._repositionRequested) {
          this._repositionRequested = true;
          requestAnimationFrame(() => {
              if (state.activePopover) {
                  const { popover, button } = state.activePopover;
                  Positioning.adjust(button, popover, { align: 'right' });
              }
              this._repositionRequested = false;
          });
      }
  },

  _handleReposition() {
    this._repositionWithThrottle();
  },
  
  _handleOutsideClick(event) {
    if (!state.activePopover) return;
    const { popover, button } = state.activePopover;
    if (!popover.contains(event.target) && !button.contains(event.target)) {
      this.closeActive();
    }
  },

  _handleEscapeKey(event) {
    if (event.key === 'Escape') {
      this.closeActive();
    }
  }
};