/**
 * POSITIONING UTILITY
 * ==================
 * This module provides functions to dynamically position elements within the viewport,
 * preventing them from rendering off-screen.
 */

const Positioning = {
  /**
   * Adjusts the vertical position of a popover element to ensure it
   * fits within the viewport. It will position the popover below the
   * trigger element if space allows, otherwise it will position it above.
   *
   * @param {HTMLElement} triggerEl The element that triggers the popover.
   * @param {HTMLElement} popoverEl The popover element to be positioned.
   * @param {number} [offset=8] The space in pixels between the trigger and the popover.
   */
  adjust(triggerEl, popoverEl, offset = 8) {
    if (!triggerEl || !popoverEl) {
      return;
    }

    const triggerRect = triggerEl.getBoundingClientRect();
    const popoverHeight = popoverEl.offsetHeight;
    const viewportHeight = window.innerHeight;

    // Check if there is enough space below the trigger element
    const hasSpaceBelow = triggerRect.bottom + popoverHeight + offset < viewportHeight;

    // Reset previous positioning styles
    popoverEl.style.top = '';
    popoverEl.style.bottom = '';

    if (hasSpaceBelow) {
      // Position below the trigger
      popoverEl.style.top = `${triggerRect.bottom + offset}px`;
    } else {
      // Position above the trigger
      popoverEl.style.bottom = `${viewportHeight - triggerRect.top + offset}px`;
    }
  }
};