/**
 * UI FAVORITES
 * ==================
 * This module handles all rendering logic for the Favorites list popover.
 */

UI.Favorites = {
  /**
   * Renders the list of favorite billers in the popover.
   * @param {Array<number>} favoriteIds An array of favorite biller IDs.
   */
  render(favoriteIds) {
    if (!dom.favoritesList) return;
    dom.favoritesList.innerHTML = '';
    
    if (favoriteIds.length === 0) {
      dom.favoritesList.innerHTML = `<li class="empty-state">Star a biller to add it here.</li>`;
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

    dom.favoritesList.appendChild(fragment);
    this.attachEventListeners();
  },

  /**
   * Attaches click listeners to the items in the favorites list.
   */
  attachEventListeners() {
      if (!dom.favoritesList) return;
      dom.favoritesList.querySelectorAll('.favorite-item').forEach(item => {
          const billerId = item.dataset.id;
          
          item.addEventListener('click', () => {
            selectBillerById(billerId);
            UI.Popovers.closeActive(); // Close popover on selection
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