/**
 * UI FEE TOOL
 * ==================
 * This module manages the UI for the "Paymentus Processing Fee" modal,
 * building its content dynamically from the tools-data.js manifest.
 */

UI.FeeTool = {
  modalElement: null,

  /**
   * Initializes the Fee Tool module by caching its DOM elements
   * and attaching event listeners. This should be called once at startup.
   */
  init() {
    this.modalElement = document.getElementById('feeToolModal');
    const closeBtn = document.getElementById('feeToolCloseBtn');
    
    if (this.modalElement && closeBtn) {
        closeBtn.addEventListener('click', () => UI.Modal.close(this.modalElement));
    }
  },

  /**
   * Opens the Fee Tool modal and populates its content from the data source.
   */
  open() {
    const toolData = TOOLS_DATA.find(tool => tool.id === 'feeTool');
    if (!toolData) {
      console.error('Fee Tool data not found in TOOLS_DATA.');
      UI.Notifications.show('Could not load the Fee Tool data.', 'error');
      return;
    }

    const header = this.modalElement.querySelector('#fee-tool-header');
    if (header) {
        header.textContent = toolData.data.title;
    }
    
    this._buildContent(toolData.data);
    UI.Modal.open(this.modalElement);
  },

  /**
   * Builds the inner HTML of the modal from the tool's data object.
   * @param {object} data The data object for the fee tool.
   * @private
   */
  _buildContent(data) {
    const body = this.modalElement.querySelector('.modal-body');
    if (!body) return;

    const sectionsHtml = data.sections.map(section => {
      const highlightClass = section.highlight === 'major' ? 'highlight-major'
                           : section.highlight === 'unique' ? 'highlight-unique'
                           : '';
      
      const noteHtml = section.note ? `<p class="fee-tool-note">${section.note}</p>` : '';

      const linksHtml = section.links.map(link => 
        `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn-fee-tool">${link.label}</a>`
      ).join('');

      return `
        <section class="fee-tool-section">
          <h3 class="fee-tool-heading ${highlightClass}">${section.title}</h3>
          ${noteHtml}
          <div class="fee-tool-links">
            ${linksHtml}
          </div>
        </section>
      `;
    }).join('');

    body.innerHTML = sectionsHtml;
  }
};