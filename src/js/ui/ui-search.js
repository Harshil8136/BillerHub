/**
 * UI SEARCH
 * ==================
 * This module handles all rendering logic for the main search bar's
 * suggestion dropdown.
 */

UI.Search = {
  virtualList: null,

  /**
   * Renders the search suggestion list.
   * @param {Array<object>} suggestions An array of biller objects to display.
   * @param {string} query The user's search query for highlighting.
   */
  renderSuggestions: function(suggestions, query) {
    this.clearSuggestions();
    if (suggestions.length === 0) return;

    const VIRTUAL_LIST_THRESHOLD = 10;
    const queryRegex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'ig');

    const renderItem = (biller, index) => {
      const highlightedName = biller.name.replace(queryRegex, `<strong>$1</strong>`);
      // CORRECTED: Fixed the typo from highlightName to highlightedName.
      return `<li class="suggestion-item ${biller.live ? 'is-live' : ''}" id="suggestion-${index}" role="option" data-id="${biller.id}">
                <span>${highlightedName}</span>
                <span class="suggestion-tla">${biller.tla}</span>
              </li>`;
    };

    if (suggestions.length > VIRTUAL_LIST_THRESHOLD) {
      this.virtualList = new VirtualList({
        container: dom.suggestionsList,
        items: suggestions,
        itemHeight: 44,
        renderItem: renderItem
      });
    } else {
      const suggestionsHtml = suggestions.map((biller, index) => renderItem(biller, index)).join('');
      dom.suggestionsList.innerHTML = suggestionsHtml;
    }
    
    dom.suggestionsList.hidden = false;
    dom.searchWrapper.setAttribute('aria-expanded', 'true');
    state.activeSuggestionIndex = -1;
  },

  /**
   * Clears the search suggestions and resets the state.
   */
  clearSuggestions: function() {
    if (this.virtualList) {
      this.virtualList.destroy();
      this.virtualList = null;
    }
    state.currentSuggestions = [];
    state.activeSuggestionIndex = -1;
    dom.suggestionsList.innerHTML = '';
    dom.suggestionsList.hidden = true;
    dom.searchWrapper.setAttribute('aria-expanded', 'false');
    dom.searchInput.removeAttribute('aria-activedescendant');
  },

  /**
   * Updates the visual state of the active (keyboard-selected) suggestion.
   */
  updateActiveSuggestion: function() {
    const activeItem = state.currentSuggestions[state.activeSuggestionIndex];
    if (!activeItem) return;

    // Remove active class from all visible items first
    dom.suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
        item.classList.remove('is-active');
        item.setAttribute('aria-selected', 'false');
    });

    // Find the specific item to activate, if it's rendered
    const itemToActivate = dom.suggestionsList.querySelector(`[data-id="${activeItem.id}"]`);
    if (itemToActivate) {
        itemToActivate.classList.add('is-active');
        itemToActivate.setAttribute('aria-selected', 'true');
        dom.searchInput.setAttribute('aria-activedescendant', itemToActivate.id);
        // Ensure the item is visible in the scrollable list
        itemToActivate.scrollIntoView({ block: 'nearest' });
    }
  }
};