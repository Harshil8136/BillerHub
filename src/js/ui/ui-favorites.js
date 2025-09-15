/**
 * UI FAVORITES
 * ==================
 * This module handles all rendering logic for the Favorites list
 * in the settings popover and the main sidebar.
 */

UI.Favorites = {
  /**
   * Generic internal function to render a list of favorites to a target element.
   * @param {HTMLElement} targetElement The container element for the list.
   * @param {Array<number>} favoriteIds An array of favorite biller IDs.
   */
  _renderList(targetElement, favoriteIds) {
    targetElement.innerHTML = '';
    
    if (favoriteIds.length === 0) {
      targetElement.innerHTML = `<div class="empty-state">Star a biller to add it here.</div>`;
      return;
    }

    const fragment = document.createDocumentFragment();
    favoriteIds.forEach(id => {
      const biller = DataHelpers.getBillerById(BILLERS, id);
      if (biller) {
        const item = document.createElement('li');
        item.className = 'favorite-item';
        item.dataset.id = biller.id;
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.innerHTML = `<span class="favorite-name">${biller.name}</span>
                          <button class="icon-btn icon-btn-remove" aria-label="Remove ${biller.name} from favorites"><i class="fa-solid fa-times"></i></button>`;
        fragment.appendChild(item);
      }
    });

    targetElement.appendChild(fragment);
  },

  /**
   * Renders the favorites list in the settings popover.
   * @param {Array<number>} favoriteIds An array of favorite biller IDs.
   */
  renderInSettings(favoriteIds) {
    const favoritesListContainer = document.getElementById('settingsFavoritesList');
    if (!favoritesListContainer) return;
    this._renderList(favoritesListContainer, favoriteIds);
    this.attachEventListeners(favoritesListContainer, true); // Close popover on select
  },
  
  /**
   * Renders the favorites list in the main sidebar.
   * @param {Array<number>} favoriteIds An array of favorite biller IDs.
   */
  renderInSidebar(favoriteIds) {
    const sidebarList = document.getElementById('sidebarFavoritesList');
    if (!sidebarList) return;
    this._renderList(sidebarList, favoriteIds);
    this.attachEventListeners(sidebarList, false); // Do not close popover on select
  },

  /**
   * Attaches click listeners to the items in a given favorites list container.
   * @param {HTMLElement} container The container element (popover or sidebar).
   * @param {boolean} closePopoverOnClick Whether to close the active popover on selection.
   */
  attachEventListeners(container, closePopoverOnClick) {
      container.querySelectorAll('.favorite-item').forEach(item => {
          const billerId = item.dataset.id;
          
          // Add listener to the main item (but not the remove button)
          item.addEventListener('click', (e) => {
            if (!e.target.closest('.icon-btn-remove')) {
              selectBillerById(billerId);
              if (closePopoverOnClick) {
                UI.Popovers.closeActive();
              }
            }
          });

          item.querySelector('.icon-btn-remove').addEventListener('click', (e) => {
              e.stopPropagation();
              Features.Favorites.toggle(parseInt(billerId));
          });
      });
  },

  /**
   * Updates the star icon on the main biller card.
   * @param {boolean} isFavorite True if the current biller is a favorite.
   */
  updateStar(isFavorite) {
    const starBtn = dom.billerCard.querySelector('#favoriteToggleBtn');
    if (starBtn) {
      starBtn.classList.toggle('is-favorite', isFavorite);
      const icon = starBtn.querySelector('i');
      icon.className = isFavorite ? 'fa-solid fa-star' : 'fa-regular fa-star';
    }
  }
};