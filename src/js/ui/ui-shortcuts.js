/**
 * UI SHORTCUTS
 * ==================
 * This new module manages the UI for the "View Shortcuts" modal,
 * providing a simple interface to open and close it.
 */

UI.Shortcuts = {
  modalElement: null,

  /**
   * Initializes the Shortcuts Modal by caching its DOM elements and attaching listeners.
   */
  init() {
    this.modalElement = document.getElementById('shortcutsModal');
    if (!this.modalElement) return;
    
    const closeBtn = document.getElementById('shortcutsCloseBtn');
    closeBtn?.addEventListener('click', () => this.close());
  },

  /**
   * Opens the shortcuts modal.
   */
  open() {
    if (!this.modalElement) return;
    UI.Modal.open(this.modalElement);
  },

  /**
   * Closes the shortcuts modal.
   */
  close() {
    if (!this.modalElement) return;
    UI.Modal.close(this.modalElement);
  }
};