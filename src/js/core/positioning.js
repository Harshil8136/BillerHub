/**
 * POSITIONING UTILITY
 * ==================
 * This module provides functions to dynamically position elements within the viewport,
 * preventing them from rendering off-screen.
 */

const Positioning = {
  /**
   * Adjusts the position of a popover element to ensure it fits within the viewport.
   * It uses a 'fixed' positioning strategy to be independent of parent containers.
   *
   * @param {HTMLElement} triggerEl The element that triggers the popover.
   * @param {HTMLElement} popoverEl The popover element to be positioned.
   * @param {object} [options] - Configuration options.
   * @param {string} [options.align='left'] - Horizontal alignment ('left' or 'right').
   * @param {number} [options.offset=8] - The space in pixels between the trigger and the popover.
   */
  adjust(triggerEl, popoverEl, options = {}) {
    const { align = 'left', offset = 8 } = options;

    if (!triggerEl || !popoverEl) {
      console.warn('Positioning.adjust called with missing elements.');
      return;
    }

    const triggerRect = triggerEl.getBoundingClientRect();
    const popoverRect = popoverEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // --- Vertical Positioning with Clamping ---
    let top;
    // Check if there's enough space below the trigger
    if (triggerRect.bottom + popoverRect.height + offset < viewportHeight) {
      top = triggerRect.bottom + offset;
    } else {
      // Otherwise, position above the trigger
      top = triggerRect.top - popoverRect.height - offset;
    }
    // Clamp the final vertical position to stay within the viewport bounds
    top = Math.max(offset, Math.min(top, viewportHeight - popoverRect.height - offset));

    // --- Horizontal Positioning with Clamping ---
    let left;
    if (align === 'right') {
      // Align the right edge of the popover with the right edge of the trigger
      left = triggerRect.right - popoverRect.width;
    } else {
      // Align the left edge of the popover with the left edge of the trigger
      left = triggerRect.left;
    }
    // Clamp the final horizontal position to stay within the viewport bounds
    left = Math.max(offset, Math.min(left, viewportWidth - popoverRect.width - offset));
    
    // --- Apply Styles ---
    // Use 'fixed' positioning to be relative to the viewport, not a parent container.
    popoverEl.style.position = 'fixed';
    popoverEl.style.top = `${top}px`;
    popoverEl.style.left = `${left}px`;
  }
};