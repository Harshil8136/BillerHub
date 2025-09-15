/**
 * UI SEARCH
 * ==================
 * This module controls the UI and accessibility for the main search combobox,
 * including rendering categorized suggestions, search history, and a clear button.
 */

UI.Search = {
  /**
   * Attaches event listeners specific to the search component.
   */
  init: function() {
    dom.searchInput.addEventListener('input', Utils.debounce(handleSearchInput, 150));
    dom.searchInput.addEventListener('keydown', handleSearchKeydown);
    
    dom.searchInput.addEventListener('focus', () => {
        dom.searchWrapper.classList.add('is-focused');
        handleSearchInput(); // Trigger search/clear on focus
    });
    dom.searchInput.addEventListener('blur', () => {
        dom.searchWrapper.classList.remove('is-focused');
    });

    const clearBtn = document.getElementById('searchClearBtn');
    clearBtn?.addEventListener('click', () => {
        dom.searchInput.value = '';
        UI.Search.clearSuggestions();
        dom.searchInput.focus();
    });
  },

  /**
   * Renders categorized search suggestions and automatically highlights the first item.
   * @param {Array<object>} suggestions An array of biller objects to display.
   * @param {string} query The user's search query for highlighting.
   */
  renderSuggestions: function(suggestions, query) {
    this.clearSuggestions(true);
    if (suggestions.length === 0) {
        this.clearSuggestions(true, `No results found for "${query}"`);
        return;
    }

    const grouped = suggestions.reduce((acc, biller) => {
        const category = biller.paymentTypes[0] || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(biller);
        return acc;
    }, {});

    let finalHtml = '';
    let itemIndex = 0;
    const queryRegex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'ig');

    Object.keys(grouped).sort().forEach(category => {
        finalHtml += `<li class="suggestion-category">${category}</li>`;
        finalHtml += grouped[category].map(biller => {
            const highlightedName = biller.name.replace(queryRegex, `<strong>$1</strong>`);
            const statusIndicator = biller.live ? '<span class="status-dot is-live"></span>' : '';
            const itemHtml = `<li class="suggestion-item" id="suggestion-${itemIndex}" role="option" data-id="${biller.id}"><span>${statusIndicator}${highlightedName}</span><span class="suggestion-tla">${biller.tla}</span></li>`;
            itemIndex++;
            return itemHtml;
        }).join('');
    });

    dom.suggestionsList.innerHTML = finalHtml;
    dom.suggestionsList.hidden = false;
    dom.searchWrapper.setAttribute('aria-expanded', 'true');

    state.activeSuggestionIndex = 0;
    this.updateActiveSuggestion();

    const items = dom.suggestionsList.querySelectorAll('.suggestion-item');
    requestAnimationFrame(() => {
        items.forEach((item, index) => {
            setTimeout(() => { item.classList.add('is-revealed'); }, index * 30);
        });
    });
  },

  /**
   * Clears the search suggestions, optionally showing a message.
   * @param {boolean} [keepFocusState=false] - If true, doesn't remove the focus class.
   * @param {string} [message=''] - An optional message to display.
   */
  clearSuggestions: function(keepFocusState = false, message = '') {
    state.currentSuggestions = [];
    state.activeSuggestionIndex = -1;
    
    if (message) {
        dom.suggestionsList.innerHTML = `<li class="suggestion-item-none">${message}</li>`;
        dom.suggestionsList.hidden = false;
    } else {
        dom.suggestionsList.innerHTML = '';
        dom.suggestionsList.hidden = true;
    }
    
    dom.searchWrapper.setAttribute('aria-expanded', 'false');
    dom.searchInput.removeAttribute('aria-activedescendant');
    if (!keepFocusState) {
        dom.searchWrapper.classList.remove('is-focused');
    }
    this.toggleClearButton(dom.searchInput.value.length > 0);
  },

  /**
   * Updates the visual state and ARIA attributes of the active suggestion.
   */
  updateActiveSuggestion: function() {
    dom.suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
        item.classList.remove('is-active');
        item.setAttribute('aria-selected', 'false');
    });
    
    const activeItemData = state.currentSuggestions[state.activeSuggestionIndex];
    if (!activeItemData) return;

    const itemToActivate = dom.suggestionsList.querySelector(`#suggestion-${state.activeSuggestionIndex}`);
    if (itemToActivate) {
        itemToActivate.classList.add('is-active');
        itemToActivate.setAttribute('aria-selected', 'true');
        dom.searchInput.setAttribute('aria-activedescendant', itemToActivate.id);
        itemToActivate.scrollIntoView({ block: 'nearest' });
    }
  },

  /**
   * Shows or hides the clear button inside the search input.
   * @param {boolean} show - True to show the button, false to hide it.
   */
  toggleClearButton: function(show) {
    const clearBtn = document.getElementById('searchClearBtn');
    if (clearBtn) {
        clearBtn.style.visibility = show ? 'visible' : 'hidden';
        clearBtn.style.opacity = show ? '1' : '0';
    }
  }
};