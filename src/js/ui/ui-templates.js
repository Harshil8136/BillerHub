/**
 * UI TEMPLATES
 * ==================
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
   * Injects all templates into the document body.
   */
  inject: function() {
    document.body.insertAdjacentHTML('beforeend', this.directoryModal);
    document.body.insertAdjacentHTML('beforeend', this.themePanel);
    document.body.insertAdjacentHTML('beforeend', this.feeToolModal);
    document.body.insertAdjacentHTML('beforeend', this.kbModal);
  }
};