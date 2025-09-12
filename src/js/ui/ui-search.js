/**
 * UI SEARCH
 * ==================
 * This module handles all rendering logic for the main search bar's
 * suggestion dropdown and its interactions.
 */

UI.Search = {
  virtualList: null,

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
   * Renders the search suggestion list with a staggered entrance animation.
   * @param {Array<object>} suggestions An array of biller objects to display.
   * @param {string} query The user's search query for highlighting.
   */
  renderSuggestions: function(suggestions, query) {
    this.clearSuggestions(true); // Pass true to skip clearing the active state
    if (suggestions.length === 0) return;

    const queryRegex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'ig');
    const renderItem = (biller, index) => {
      const highlightedName = biller.name.replace(queryRegex, `<strong>$1</strong>`);
      return `<li class="suggestion-item ${biller.live ? 'is-live' : ''}" id="suggestion-${index}" role="option" data-id="${biller.id}"><span>${highlightedName}</span><span class="suggestion-tla">${biller.tla}</span></li>`;
    };

    dom.suggestionsList.innerHTML = suggestions.map((b, i) => renderItem(b, i)).join('');
    
    dom.suggestionsList.hidden = false;
    dom.searchWrapper.setAttribute('aria-expanded', 'true');
    state.activeSuggestionIndex = -1;

    // Stagger animation
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
   * Updates the visual state of the active (keyboard-selected) suggestion.
   */
  updateActiveSuggestion: function() {
    const activeItemData = state.currentSuggestions[state.activeSuggestionIndex];
    if (!activeItemData) return;

    dom.suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
        item.classList.remove('is-active');
        item.setAttribute('aria-selected', 'false');
    });

    const itemToActivate = dom.suggestionsList.querySelector(`#suggestion-${state.activeSuggestionIndex}`);
    if (itemToActivate) {
        itemToActivate.classList.add('is-active');
        itemToActivate.setAttribute('aria-selected', 'true');
        dom.searchInput.setAttribute('aria-activedescendant', itemToActivate.id);
        itemToActivate.scrollIntoView({ block: 'nearest' });
    }
  }
};