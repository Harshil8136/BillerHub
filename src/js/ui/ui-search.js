/**
 * UI SEARCH
 * ==================
 * This module controls the UI for the main search combobox, including displaying
 * suggestions and ensuring the first result is auto-selected.
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
    });
    dom.searchInput.addEventListener('blur', () => {
        dom.searchWrapper.classList.remove('is-focused');
    });
  },

  /**
   * Renders the search suggestion list and automatically highlights the first item.
   * @param {Array<object>} suggestions An array of biller objects to display.
   * @param {string} query The user's search query for highlighting.
   */
  renderSuggestions: function(suggestions, query) {
    this.clearSuggestions(true);
    if (!suggestions || suggestions.length === 0) return;

    const queryRegex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'ig');
    const renderItem = (biller, index) => {
      const highlightedName = biller.name.replace(queryRegex, `<strong>$1</strong>`);
      const statusIndicator = biller.live ? '<span class="status-dot is-live"></span>' : '';
      return `<li class="suggestion-item" id="suggestion-${index}" role="option" data-id="${biller.id}"><span>${statusIndicator}${highlightedName}</span><span class="suggestion-tla">${biller.tla}</span></li>`;
    };

    dom.suggestionsList.innerHTML = suggestions.map((b, i) => renderItem(b, i)).join('');
    dom.suggestionsList.hidden = false;
    dom.searchWrapper.setAttribute('aria-expanded', 'true');
    
    // Auto-select the first item for immediate "Enter" key activation.
    state.activeSuggestionIndex = 0;
    this.updateActiveSuggestion();

    // Staggered entrance animation
    const items = dom.suggestionsList.querySelectorAll('.suggestion-item');
    requestAnimationFrame(() => {
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('is-revealed');
            }, index * 30);
        });
    });
  },

  /**
   * Clears the search suggestions and resets the state.
   * @param {boolean} [keepFocusState=false] - If true, doesn't remove the focus class.
   */
  clearSuggestions: function(keepFocusState = false) {
    state.currentSuggestions = [];
    state.activeSuggestionIndex = -1;
    dom.suggestionsList.innerHTML = '';
    dom.suggestionsList.hidden = true;
    dom.searchWrapper.setAttribute('aria-expanded', 'false');
    dom.searchInput.removeAttribute('aria-activedescendant');
    if (!keepFocusState) {
        dom.searchWrapper.classList.remove('is-focused');
    }
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
  }
};