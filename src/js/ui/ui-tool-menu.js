/**
 * UI TOOL MENU
 * ==================
 * This module manages the new, accessible "Tools" pop-up menu in the header,
 * replacing the old Tools drawer. It follows WAI-ARIA patterns for a menu button.
 */

UI.ToolMenu = {
  triggerElement: null,
  menuElement: null,
  menuItems: [],
  activeItemIndex: -1,
  isLoaded: false,

  /**
   * Initializes the tool menu by caching elements and attaching listeners.
   */
  init() {
    this.triggerElement = document.getElementById('toolsBtn');
    this.menuElement = document.getElementById('toolsMenu');

    if (!this.triggerElement || !this.menuElement) return;

    this.triggerElement.addEventListener('click', () => this.toggle());
    this.triggerElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggle();
        }
    });
  },

  /**
   * Toggles the visibility of the menu.
   */
  toggle() {
    const isExpanded = this.triggerElement.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      this.close();
    } else {
      this.open();
    }
  },

  /**
   * Opens the menu, builds its content if needed, and sets focus.
   */
  open() {
    if (!this.isLoaded) {
      this._buildMenu();
    }
    
    // Close any other open popovers first
    if (state.activePopover) UI.Popovers.closeActive();
    state.activePopover = { popover: this.menuElement, button: this.triggerElement };
    
    this.menuElement.hidden = false;
    this.triggerElement.setAttribute('aria-expanded', 'true');
    
    this.menuElement.addEventListener('keydown', this._handleMenuKeydown.bind(this));

    this.activeItemIndex = 0;
    this._setActiveItem(this.activeItemIndex);
  },

  /**
   * Closes the menu and returns focus to the trigger button.
   */
  close() {
    this.menuElement.hidden = true;
    this.triggerElement.setAttribute('aria-expanded', 'false');
    this.menuElement.removeEventListener('keydown', this._handleMenuKeydown.bind(this));
    
    if (state.activePopover && state.activePopover.popover === this.menuElement) {
        state.activePopover = null;
    }

    this.triggerElement.focus();
  },

  /**
   * Builds the menu's HTML content from the TOOLS_DATA manifest.
   * @private
   */
  _buildMenu() {
    if (typeof TOOLS_DATA === 'undefined') return;

    const itemsHtml = TOOLS_DATA.map(tool => {
      const isLink = tool.type === 'link';
      const tag = isLink ? 'a' : 'div';
      const href = isLink ? `href="${tool.url}"` : '';
      const target = isLink ? `target="_blank" rel="noopener noreferrer"` : '';
      const shortcutHtml = tool.shortcut ? `<kbd class="menu-shortcut">${tool.shortcut}</kbd>` : '';

      return `
        <li role="presentation">
          <${tag} class="menu-item" role="menuitem" tabindex="-1" data-tool-id="${tool.id}" ${href} ${target}>
            <i class="${tool.icon} fa-fw"></i>
            <span>${tool.title}</span>
            ${shortcutHtml}
          </${tag}>
        </li>
      `;
    }).join('');

    this.menuElement.innerHTML = `<ul role="presentation">${itemsHtml}</ul>`;
    this.menuItems = Array.from(this.menuElement.querySelectorAll('[role="menuitem"]'));

    this.menuItems.forEach(item => {
        item.addEventListener('click', (e) => this._handleItemClick(e.currentTarget));
    });

    this.isLoaded = true;
  },
  
  /**
   * Handles click events on menu items to perform their actions.
   * @param {HTMLElement} item The clicked menu item.
   * @private
   */
  _handleItemClick(item) {
      const toolId = item.dataset.toolId;
      switch (toolId) {
          case 'feeTool':
              UI.FeeTool.open();
              break;
          case 'kbArticles':
              UI.KbModal.open();
              break;
      }
      this.close();
  },

  /**
   * Handles keyboard navigation within the open menu.
   * @param {KeyboardEvent} e The keydown event.
   * @private
   */
  _handleMenuKeydown(e) {
    const itemCount = this.menuItems.length;
    if (itemCount === 0) return;

    const key = e.key;

    if (key === 'ArrowDown' || key === 'ArrowUp') {
        e.preventDefault();
        if (key === 'ArrowDown') {
            this.activeItemIndex = (this.activeItemIndex + 1) % itemCount;
        } else {
            this.activeItemIndex = (this.activeItemIndex - 1 + itemCount) % itemCount;
        }
        this._setActiveItem(this.activeItemIndex);
    } else if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        this.menuItems[this.activeItemIndex].click();
    } else if (key === 'Escape' || key === 'Tab') {
        e.preventDefault();
        this.close();
    }
  },
  
  /**
   * Sets the active (focused) item in the menu.
   * @param {number} index The index of the item to activate.
   * @private
   */
  _setActiveItem(index) {
    this.menuItems.forEach(item => item.classList.remove('is-active'));
    const activeItem = this.menuItems[index];
    if (activeItem) {
        activeItem.classList.add('is-active');
        activeItem.focus();
    }
  }
};