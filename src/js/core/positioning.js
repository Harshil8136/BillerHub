/**
 * POSITIONING UTILITY
 * ==================
 * UPDATED: Added a new `positionTooltip` function to handle smart
 * positioning for the new JavaScript-driven tooltip system. It ensures
 * tooltips are always visible within the viewport.
 *
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
  },

  /**
   * Positions a tooltip element relative to a trigger element, ensuring
   * it remains within the viewport both vertically and horizontally.
   * @param {HTMLElement} triggerEl The element that triggers the tooltip.
   * @param {HTMLElement} tooltipEl The tooltip element to be positioned.
   * @param {number} [offset=8] The space in pixels between the trigger and the tooltip.
   */
  positionTooltip(triggerEl, tooltipEl, offset = 8) {
    if (!triggerEl || !tooltipEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const tooltipHeight = tooltipEl.offsetHeight;
    const tooltipWidth = tooltipEl.offsetWidth;
    const viewportMargin = 8; // Min space from viewport edge

    // Reset previous inline styles before measuring/positioning
    tooltipEl.style.transform = '';
    tooltipEl.style.top = '';
    tooltipEl.style.left = '';

    // --- Vertical Positioning ---
    let top;
    // Prefer below, if space is available
    if (triggerRect.bottom + tooltipHeight + offset < window.innerHeight) {
        top = triggerRect.bottom + offset;
    } else {
        // Otherwise, position above
        top = triggerRect.top - tooltipHeight - offset;
    }

    // --- Horizontal Positioning ---
    // Start with the ideal centered position
    let left = triggerRect.left + (triggerRect.width / 2) - (tooltipWidth / 2);

    // Constrain to the viewport horizontally
    if (left < viewportMargin) {
        left = viewportMargin;
    }
    if (left + tooltipWidth > window.innerWidth - viewportMargin) {
        left = window.innerWidth - tooltipWidth - viewportMargin;
    }

    tooltipEl.style.top = `${top}px`;
    tooltipEl.style.left = `${left}px`;
  }
};