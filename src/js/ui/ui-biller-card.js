/**
 * UI BILLER CARD
 * ==================
 * This module is responsible for all rendering logic related to the main
 * biller information card.
 */

UI.BillerCard = {
  /**
   * Renders the complete biller card UI for a given biller object.
   * @param {object} biller The biller object to display.
   */
  display: function(biller) {
    if (!biller) {
      dom.billerCard.hidden = true;
      return;
    }
    dom.locationCard.hidden = true;

    // --- Helper functions for creating UI elements ---
    const createActionButton = (url, text, icon, type) => {
      if (!url) return '';
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="btn-biller-card btn-${type}"><i class="fa-solid ${icon}"></i> ${text}</a>`;
    };

    const createContactField = (contact) => {
      const { type, label, value, note } = contact;
      if (!value) return '';
      let labelHtml = `<strong>${label}</strong>`;
      if (type === 'Internal') {
        labelHtml = `<strong>${label} <span class="internal-badge">Internal Use</span></strong>`;
      }
      let valueHtml = '';
      let itemClass = 'quick-link-item';
      if (value.toLowerCase().includes('see notes') || value.toLowerCase().includes('refer to kb')) {
        itemClass += ' non-copyable';
        valueHtml = `<span>${value}</span>`;
      } else {
        valueHtml = `<span class="copyable-phone" data-copy-label="Phone Number">${value}</span>`;
      }
      const noteHtml = note ? `<small class="contact-note-danger">${note}</small>` : '';
      return `<div class="${itemClass}">${labelHtml}${valueHtml}${noteHtml}</div>`;
    };

    // --- Generate dynamic HTML sections ---
    const contactsHtml = biller.contacts?.map(createContactField).join('') || '';

    const customFieldsHtml = biller.customFields && biller.customFields.length > 0
      ? `<div class="notes-section">
           <h3>Additional Information</h3>
           <div class="notes-content color-border-secondary">
             <ul>${biller.customFields.map(field => `<li><strong>${field.label}:</strong> ${field.value}</li>`).join('')}</ul>
           </div>
         </div>`
      : '';

    const paymentTypeHtml = biller.paymentTypes?.length > 0
      ? `<span class="payment-type-tag">${biller.paymentTypes.join(', ')}</span>`
      : '';
      
    const liveTimeHtml = biller.timezone
      ? `<span class="biller-time"><i class="fa-solid fa-clock"></i> ${Utils.getTimeForTimezone(biller.timezone)}</span>`
      : '';
      
    // Special subtitle for complex billers like PHI
    const subtitleHtml = biller.tla === 'PHI'
      ? `<p class="card-subtitle">(Includes Atlantic City Electric, Delmarva Power, and Pepco)</p>`
      : '';

    // --- Main HTML Template ---
    dom.billerCard.innerHTML = `
      <div class="card-header">
        <div class="card-title-group" data-biller-id="${biller.id}">
          <h2 class="card-title copyable-text" data-copy-label="Name">${biller.name}</h2>
          <span class="card-tla copyable-text" data-copy-label="TLA">(${biller.tla})</span>
          <button id="favoriteToggleBtn" class="icon-btn icon-btn-favorite" aria-label="Toggle Favorite">
            <i class="fa-regular fa-star"></i>
          </button>
        </div>
        <div class="card-header-meta">
            ${liveTimeHtml}
            ${paymentTypeHtml}
            <span class="card-status ${biller.live ? 'is-live' : 'is-offline'}">${biller.live ? 'Live' : 'Non-Live'}</span>
        </div>
      </div>
      ${subtitleHtml}
      <div class="biller-action-bar">
        <div class="action-bar-buttons">
          ${createActionButton(biller.kbLink, 'Knowledge Base', 'fa-book', 'kb')}
          ${createActionButton(biller.adLink, 'Agent Dashboard', 'fa-server', 'ad')}
        </div>
        <div class="action-bar-contacts">${contactsHtml}</div>
      </div>
      <div class="card-grid">
        <div id="interactiveNotesContainer"></div>
        ${customFieldsHtml}
      </div>`;

    // --- Attach Event Listeners ---
    this.attachEventListeners(biller);

    NotesFeature.loadNotesForBiller(biller);
    UI.Favorites.updateStar(Features.Favorites.isFavorite(biller.id));
    dom.billerCard.hidden = false;
    if (window.Anim) Anim.enterCard(dom.billerCard);
  },

  /**
   * Attaches all event listeners for the biller card's interactive elements.
   * @param {object} biller The biller object.
   */
  attachEventListeners: function(biller) {
    dom.billerCard.querySelector('#favoriteToggleBtn').addEventListener('click', () => {
      Features.Favorites.toggle(biller.id);
    });

    dom.billerCard.querySelectorAll('.copyable-text, .copyable-phone').forEach(el => {
      el.addEventListener('click', (e) => this.handleCopy(e.currentTarget));
    });
  },

  /**
   * Handles the copy-to-clipboard action and provides user feedback via a toast.
   * @param {HTMLElement} element The element that was clicked.
   */
  handleCopy: function(element) {
    const text = element.textContent.replace(/[()]/g, '').trim();
    const label = element.dataset.copyLabel || 'Value';
    navigator.clipboard.writeText(text).then(() => {
      UI.Toasts.show(`${label} copied to clipboard`);
    });
  }
};