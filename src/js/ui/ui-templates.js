/**
 * UI TEMPLATES
 * ==================
 * UPDATED: Added the HTML structure for the new, shared global tooltip
 * element and the new clock settings popover.
 *
 * This file contains the HTML structures for components that are injected into
 * the DOM at runtime. This keeps the main index.html file clean.
 */

UI.Templates = {
  /**
   * HTML structure for the Biller Directory modal.
   */
  directoryModal: `
    <div id="directoryModal" class="modal-overlay" hidden>
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="directory-header">
        <div class="modal-header">
          <h2 id="directory-header">Biller Directory</h2>
          <button id="directoryCloseBtn" class="icon-btn" aria-label="Close Directory"><i class="fa-solid fa-times"></i></button>
        </div>
        <div class="modal-body"></div>
      </div>
    </div>
  `,
  
  /**
   * HTML structure for the Theme Selector drawer panel.
   */
  themePanel: `
    <aside id="themePanel" class="drawer" role="complementary" aria-labelledby="themes-header"></aside>
    <template id="themePanelTemplate">
        <div class="drawer-header">
            <h2 id="themes-header" class="drawer-title">Select Theme</h2>
            <button id="themesCloseBtn" class="icon-btn" aria-label="Close Themes Panel"><i class="fa-solid fa-times"></i></button>
        </div>
        <div id="themeSelector" class="drawer-content">
            </div>
    </template>
  `,

  /**
   * HTML structure for the Fee Tool modal.
   */
  feeToolModal: `
    <div id="feeToolModal" class="modal-overlay" hidden>
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="fee-tool-header">
        <div class="modal-header">
          <h2 id="fee-tool-header">Paymentus Processing Fee Tool</h2>
          <button id="feeToolCloseBtn" class="icon-btn" aria-label="Close Fee Tool"><i class="fa-solid fa-times"></i></button>
        </div>
        <div class="modal-body fee-tool-body"></div>
      </div>
    </div>
  `,

  /**
   * HTML structure for the new KB Articles search modal.
   */
  kbModal: `
    <div id="kbModal" class="modal-overlay" hidden>
      <div class="modal-content modal-sm" role="dialog" aria-modal="true" aria-labelledby="kb-modal-header">
        <div class="modal-header">
          <h2 id="kb-modal-header">KB Article Search</h2>
          <button id="kbModalCloseBtn" class="icon-btn" aria-label="Close KB Search"><i class="fa-solid fa-times"></i></button>
        </div>
        <div class="modal-body kb-modal-body">
          <div class="search-wrapper">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" id="kbSearchInput" class="menu-input" placeholder="Search articles...">
          </div>
          <ul id="kbResultsList" class="kb-modal-list"></ul>
        </div>
      </div>
    </div>
  `,
  
  /**
   * HTML structure for the new clock settings popover.
   */
  clockPopover: `
    <div id="clockPopover" class="popover popover-sm" hidden>
        <div class="popover-header">
            <h4>Clock Options</h4>
        </div>
        <div class="popover-content">
            <div class="weather-display"></div>
            <div class="clock-settings">
                <label class="toggle-switch">
                    <input type="checkbox" id="toggleClockLocation">
                    <span class="switch-label">Show Location Info</span>
                    <div class="switch-track"><div class="switch-handle"></div></div>
                </label>
            </div>
        </div>
    </div>
  `,

  /**
   * HTML structure for the "View Shortcuts" modal.
   */
  shortcutsModal: `
    <div id="shortcutsModal" class="modal-overlay" hidden>
      <div class="modal-content modal-sm" role="dialog" aria-modal="true" aria-labelledby="shortcuts-header">
        <div class="modal-header">
          <h2 id="shortcuts-header">Keyboard Shortcuts</h2>
          <button id="shortcutsCloseBtn" class="icon-btn" aria-label="Close Shortcuts"><i class="fa-solid fa-times"></i></button>
        </div>
        <div class="modal-body shortcuts-modal-body">
            <dl class="shortcuts-list">
                <dt><code>Alt + T</code></dt><dd>Open Tools Menu</dd>
                <dt><code>Alt + S</code></dt><dd>Open Area Lookup</dd>
                <dt><code>Alt + K</code></dt><dd>Open KB Article Search</dd>
                <dt><code>Alt + 1</code></dt><dd>Open Fee Tool</dd>
                <dt><code>Ctrl + F</code></dt><dd>Focus Main Search Bar</dd>
                <dt><code>Esc</code></dt><dd>Close Active Window (Modal, Popover, etc.)</dd>
                <dt><code>&uarr; / &darr;</code></dt><dd>Navigate Lists</dd>
                <dt><code>Enter</code></dt><dd>Select Item from List</dd>
            </dl>
        </div>
      </div>
    </div>
  `,

  /**
   * HTML structure for the single, shared tooltip element.
   */
  globalTooltip: `
    <div id="globalTooltip" class="global-tooltip" role="tooltip"></div>
  `,

  /**
   * Injects all templates into the document body.
   */
  inject: function() {
    document.body.insertAdjacentHTML('beforeend', this.directoryModal);
    document.body.insertAdjacentHTML('beforeend', this.themePanel);
    document.body.insertAdjacentHTML('beforeend', this.feeToolModal);
    document.body.insertAdjacentHTML('beforeend', this.kbModal);
    document.body.insertAdjacentHTML('beforeend', this.clockPopover);
    document.body.insertAdjacentHTML('beforeend', this.shortcutsModal);
    document.body.insertAdjacentHTML('beforeend', this.globalTooltip);
  }
};