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
   * HTML structure for the Workplace Tools drawer panel.
   */
  toolsPanel: `
    <aside id="toolsPanel" class="drawer" role="complementary" aria-labelledby="tools-header"></aside>
    <template id="toolsPanelTemplate">
      <div class="drawer-header">
        <h2 id="tools-header" class="drawer-title">Workplace Tools</h2>
        <button id="toolsCloseBtn" class="icon-btn" aria-label="Close Tools Panel"><i class="fa-solid fa-times"></i></button>
      </div>
      <div class="drawer-content">
        <section aria-labelledby="kb-heading">
          <h3 id="kb-heading">KB Articles</h3>
          <div class="search-wrapper">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" id="toolsKbSearch" class="menu-input" placeholder="Search articles...">
          </div>
          <ul id="kbList" class="kb-list"></ul>
        </section>
      </div>
    </template>
  `,
  
  /**
   * HTML structure for the new Theme Selector drawer panel.
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
   * Injects all templates into the document body.
   */
  inject: function() {
    document.body.insertAdjacentHTML('beforeend', this.directoryModal);
    document.body.insertAdjacentHTML('beforeend', this.toolsPanel);
    document.body.insertAdjacentHTML('beforeend', this.themePanel);
  }
};
