/**
 * UI BILLER CARD
 * ==================
 * This module is responsible for all rendering logic related to the main
 * biller information card.
 */

UI.BillerCard = {
  /**
   * Returns the appropriate Font Awesome icon class for a given contact type.
   * @param {string} type The contact type (e.g., 'IVR', 'CSR').
   * @returns {string} The icon class.
   */
  _getIconForContactType(type) {
    switch (type) {
      case 'IVR': return 'fa-solid fa-robot';
      case 'CSR': return 'fa-solid fa-headset';
      case 'Internal': return 'fa-solid fa-shield-halved';
      default: return 'fa-solid fa-phone';
    }
  },

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

    const createActionButton = (url, text, icon, type) => {
      if (!url) return '';
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="btn-biller-card btn-${type}"><i class="fa-solid ${icon}"></i> ${text}</a>`;
    };

    const createContactItem = (contact) => {
      const iconClass = this._getIconForContactType(contact.type);
      const tooltipAttr = contact.tooltip ? `data-tooltip="${contact.tooltip}"` : '';
      const isStatic = contact.type === 'Internal' || contact.value.toLowerCase().includes('see notes');
      
      const valueHtml = isStatic
        ? `<span class="contact-value-static">${contact.value}</span>`
        : `<span class="copyable-phone" data-copy-label="Phone Number" ${tooltipAttr} tabindex="0">${contact.value}</span>`;

      return `
        <div class="contact-grid-item">
          <div class="contact-label"><i class="${iconClass} fa-fw"></i> ${contact.label}</div>
          <div class="contact-value">${valueHtml}</div>
        </div>`;
    };

    const groupedContacts = biller.contacts?.reduce((acc, contact) => {
      const groupName = contact.group || 'Contact Information';
      (acc[groupName] = acc[groupName] || []).push(contact);
      return acc;
    }, {});
    
    const contactsHtml = groupedContacts
      ? Object.entries(groupedContacts).map(([groupName, contacts]) => {
          const isInternal = groupName === 'Internal Transfers';
          const groupClass = isInternal ? 'contact-group-internal' : '';
          const noteHtml = isInternal ? '<span class="internal-badge">Internal Use Only</span>' : '';
          const itemsHtml = contacts.map(createContactItem).join('');

          return `<div class="contact-group ${groupClass}">
                    <h3>${groupName} ${noteHtml}</h3>
                    <div class="contact-grid">${itemsHtml}</div>
                  </div>`;
        }).join('')
      : '';

    const customFieldsHtml = biller.customFields?.length > 0
      ? `<div class="notes-section"><h3>Additional Information</h3><div class="notes-content color-border-secondary"><ul>${biller.customFields.map(field => `<li><strong>${field.label}:</strong> ${field.value}</li>`).join('')}</ul></div></div>`
      : '';
    const paymentTypeHtml = biller.paymentTypes?.length > 0
      ? `<span class="payment-type-tag">${biller.paymentTypes.join(', ')}</span>`
      : '';
    const liveTimeHtml = biller.timezone
      ? `<span class="biller-time"><i class="fa-solid fa-clock"></i> ${Utils.getTimeForTimezone(biller.timezone)}</span>`
      : '';
      
    let subtitleHtml = '';
    if (biller.contacts?.some(c => c.type === 'Internal')) {
        subtitleHtml += `<p class="card-subtitle card-subtitle-danger">Internal numbers must not be shared with customers.</p>`;
    }
    if (biller.tla === 'PHI') {
        subtitleHtml += `<p class="card-subtitle">(Includes Atlantic City Electric, Delmarva Power, and Pepco)</p>`;
    }

    dom.billerCard.innerHTML = `
      <div class="card-header">
        <div class="card-title-group" data-biller-id="${biller.id}">
          <h2 class="card-title copyable-text" data-copy-label="Name" tabindex="0">${biller.name}</h2>
          <span class="card-tla copyable-text" data-copy-label="TLA" tabindex="0">(${biller.tla})</span>
          <button id="favoriteToggleBtn" class="icon-btn icon-btn-favorite" aria-label="Toggle Favorite"><i class="fa-regular fa-star"></i></button>
        </div>
        <div class="card-header-meta">${liveTimeHtml}${paymentTypeHtml}<span class="card-status ${biller.live ? 'is-live' : 'is-offline'}">${biller.live ? 'Live' : 'Non-Live'}</span></div>
      </div>
      ${subtitleHtml}
      <div class="biller-action-bar">
        <div class="action-bar-buttons">${createActionButton(biller.kbLink, 'Knowledge Base', 'fa-book', 'kb')}${createActionButton(biller.adLink, 'Agent Dashboard', 'fa-server', 'ad')}</div>
        <div class="action-bar-contacts">${contactsHtml}</div>
      </div>
      <div class="card-grid"><div id="interactiveNotesContainer"></div>${customFieldsHtml}</div>`;

    this.attachEventListeners(biller);
    this._manageFocus();

    NotesFeature.loadNotesForBiller(biller);
    UI.Favorites.updateStar(Features.Favorites.isFavorite(biller.id));
    dom.billerCard.hidden = false;
    if (window.Anim) Anim.enterCard(dom.billerCard);
  },

  attachEventListeners: function(biller) {
    dom.billerCard.querySelector('#favoriteToggleBtn')?.addEventListener('click', () => Features.Favorites.toggle(biller.id));
    dom.billerCard.querySelectorAll('.copyable-text, .copyable-phone').forEach(el => {
      el.addEventListener('click', (e) => this.handleCopy(e.currentTarget));
    });
  },

  handleCopy: function(element) {
    const text = element.textContent.replace(/[()]/g, '').trim();
    const label = element.dataset.copyLabel || 'Value';
    navigator.clipboard.writeText(text).then(() => UI.Toasts.show(`${label} copied to clipboard`));
  },

  _manageFocus: function() {
    const focusableElements = Array.from(
      dom.billerCard.querySelectorAll('a[href], button, [tabindex="0"]')
    );
    if (focusableElements.length === 0) return;

    const adButton = focusableElements.find(el => el.classList.contains('btn-ad'));
    setTimeout(() => {
        if (adButton) adButton.focus();
        else focusableElements[0].focus();
    }, 100);

    dom.billerCard.addEventListener('keydown', (e) => {
      const focusableKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '];
      if (!focusableKeys.includes(e.key)) return;
      
      const currentIndex = focusableElements.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % focusableElements.length;
        focusableElements[nextIndex].focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
        focusableElements[nextIndex].focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        const activeEl = document.activeElement;
        if (activeEl.nodeName !== 'BUTTON' && activeEl.nodeName !== 'A') {
          e.preventDefault();
          activeEl.click();
        }
      }
    });
  }
};