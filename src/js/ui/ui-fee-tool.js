/**
 * UI FEE TOOL
 * ==================
 * This module manages the UI for the "Paymentus Processing Fee" modal.
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
        closeBtn.addEventListener('click', () => {
            // Clean up the modifier class when closing
            this.modalElement.querySelector('.modal-content')?.classList.remove('modal-lg');
            UI.Modal.close(this.modalElement);
        });
    }
  },

  /**
   * Opens the Fee Tool modal, populates its content, and initializes its features.
   */
  open() {
    const toolData = TOOLS_DATA.find(tool => tool.id === 'feeTool');
    if (!toolData) {
      console.error('Fee Tool data not found in TOOLS_DATA.');
      UI.Notifications.show('Could not load the Fee Tool data.', 'error');
      return;
    }
    
    // Add the 'modal-lg' class to make the modal wider
    this.modalElement.querySelector('.modal-content')?.classList.add('modal-lg');

    this._buildContent(toolData.data);
    UI.Modal.open(this.modalElement);
    
    // After the modal content is rendered, initialize the notes feature logic.
    if (Features.InvestigationNotes) {
        Features.InvestigationNotes.init();
    }
    
    // Add 'is-visited' state listener for Paymentus links.
    this.modalElement.querySelectorAll('.btn-fee-tool').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.add('is-visited');
        }, { once: true }); // Listener fires only once per button.
    });
  },

  /**
   * Builds the inner HTML of the modal with a two-pane layout.
   * @param {object} data The data object for the fee tool from tools-data.js.
   * @private
   */
  _buildContent(data) {
    const body = this.modalElement.querySelector('.modal-body');
    if (!body) return;

    // --- Left Pane: Paymentus Links (Card-based Layout) ---
    const paymentusSectionsHtml = data.sections.map(section => {
      const categoryClass = section.category ? `links-category-${section.category}` : 'links-category-info';
      const iconHtml = section.icon ? `<i class="${section.icon} link-card-icon"></i>` : '';
      const linksHtml = section.links.map(link => 
        `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn-fee-tool">${link.label}</a>`
      ).join('');

      return `
        <div class="link-card ${categoryClass}">
          <div class="link-card-header">
            ${iconHtml}
            <h4 class="link-card-title">${section.title}</h4>
          </div>
          <div class="fee-tool-links">${linksHtml}</div>
        </div>
      `;
    }).join('');

    const paymentusPaneHtml = `<div class="fee-tool-pane">${paymentusSectionsHtml}</div>`;

    // --- Right Pane: Investigation Notes ---
    const mopOptions = ['Visa', 'Mastercard', 'Discover', 'AMEX', 'Electronic Cheque (ACH)', 'Paypal', 'Amazon Pay', 'Apple Pay'];
    const notesFieldsHtml = Features.InvestigationNotes.fields.map(field => {
        let fieldHtml = '';
        if (field.id === 'mop') {
            const optionsHtml = mopOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('');
            fieldHtml = `<select id="${field.id}" name="${field.id}" class="notes-select"><option value="" disabled selected>Select a MOP</option>${optionsHtml}</select>`;
        } else {
            const placeholder = field.id === 'dateAppeared' ? 'placeholder="MM/DD/YYYY"' : '';
            fieldHtml = `<input id="${field.id}" name="${field.id}" class="notes-input" type="text" autocomplete="off" ${placeholder} />`;
        }

        return `
            <div class="notes-field">
                <label class="notes-label" for="${field.id}">${field.label}</label>
                <div class="notes-input-row">
                    ${fieldHtml}
                    <button type="button" class="notes-copy-line" data-field="${field.id}" aria-label="Copy ${field.label} line"><i class="fa-solid fa-copy"></i></button>
                </div>
            </div>
        `;
    }).join('');

    const notesPaneHtml = `
        <div class="fee-tool-pane">
            <div class="pane-header"><h3 class="pane-title">Investigation Notes</h3></div>
            <form class="investigation-notes-form">
                ${notesFieldsHtml}
                <div class="notes-actions">
                    <button type="button" class="notes-action-btn notes-copy-all">Copy All</button>
                    <button type="button" class="notes-action-btn btn-clear notes-clear">Clear</button>
                </div>
                <hr class="notes-separator" />
                <div class="notes-tl-section">
                    <div class="notes-tl-header">Sending to Team Leads?</div>
                    <button type="button" class="notes-tl-copy">Copy for TLs</button>
                </div>
            </form>
        </div>
    `;

    // --- Final Combined Layout ---
    body.innerHTML = paymentusPaneHtml + notesPaneHtml;
  }
};