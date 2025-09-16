/**
 * UI TOOL MENU
 * ==================
 * This module manages the new, accessible "Tools" pop-up menu in the header.
 * It now uses the centralized popover layer and positioning system.
 */

UI.ToolMenu = {
  triggerElement: null,
  menuElement: null,
  menuItems: [],
  activeItemIndex: -1,
  isLoaded: false,
  _boundHandlers: {},
  _originalParent: null,
  _boundMenuKeydown: null,

  /**
   * Initializes the tool menu by caching elements and attaching listeners.
   */
  init() {
    this.triggerElement = document.getElementById('toolsBtn');
    this.menuElement = document.getElementById('toolsMenu');

    if (!this.triggerElement || !this.menuElement) return;

    this.triggerElement.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
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
   * Opens the menu, moves it to the popover layer, positions it, and adds listeners.
   */
  open() {
    if (!this.isLoaded) {
      this._buildMenu();
    }
    
    if (state.activePopover) UI.Popovers.closeActive();
    
    const popoverLayer = document.getElementById('popover-layer');
    if (!popoverLayer) {
        console.error('Critical: #popover-layer element not found in the DOM.');
        return;
    }

    this._originalParent = this.menuElement.parentElement;
    popoverLayer.appendChild(this.menuElement);

    this.menuElement.hidden = false;
    this.triggerElement.setAttribute('aria-expanded', 'true');
    state.activePopover = { popover: this.menuElement, button: this.triggerElement };

    requestAnimationFrame(() => {
        Positioning.adjust(this.triggerElement, this.menuElement, { align: 'right' });
    });
    
    this._addEventListeners();

    this.activeItemIndex = 0;
    this._setActiveItem(this.activeItemIndex);
  },

  /**
   * Closes the menu, returns it to the DOM, and cleans up listeners.
   */
  close() {
    if (!state.activePopover || state.activePopover.popover !== this.menuElement) return;

    this.menuElement.hidden = true;
    this.triggerElement.setAttribute('aria-expanded', 'false');
    
    if (this._originalParent) {
        this._originalParent.appendChild(this.menuElement);
    }

    this._removeEventListeners();
    state.activePopover = null;
    this.triggerElement.focus();
  },

  _addEventListeners() {
    this._boundHandlers.reposition = this._handleReposition.bind(this);
    this._boundHandlers.outsideClick = this._handleOutsideClick.bind(this);
    this._boundHandlers.escapeKey = this._handleEscapeKey.bind(this);
    this._boundMenuKeydown = this._handleMenuKeydown.bind(this);

    window.addEventListener('resize', this._boundHandlers.reposition, { passive: true });
    document.addEventListener('scroll', this._boundHandlers.reposition, { capture: true, passive: true });
    document.addEventListener('click', this._boundHandlers.outsideClick);
    document.addEventListener('keydown', this._boundHandlers.escapeKey);
    this.menuElement.addEventListener('keydown', this._boundMenuKeydown);
  },

  _removeEventListeners() {
    window.removeEventListener('resize', this._boundHandlers.reposition);
    document.removeEventListener('scroll', this._boundHandlers.reposition, { capture: true });
    document.removeEventListener('click', this._boundHandlers.outsideClick);
    document.removeEventListener('keydown', this._boundHandlers.escapeKey);
    this.menuElement.removeEventListener('keydown', this._boundMenuKeydown);
  },

  _repositionWithThrottle() {
      if (!this._repositionRequested) {
          this._repositionRequested = true;
          requestAnimationFrame(() => {
              if (state.activePopover && state.activePopover.popover === this.menuElement) {
                  Positioning.adjust(this.triggerElement, this.menuElement, { align: 'right' });
              }
              this._repositionRequested = false;
          });
      }
  },

  _handleReposition() {
    this._repositionWithThrottle();
  },
  
  _handleOutsideClick(event) {
    if (!state.activePopover) return;
    const { popover, button } = state.activePopover;
    if (!popover.contains(event.target) && !button.contains(event.target)) {
      this.close();
    }
  },

  _handleEscapeKey(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  },

  _buildMenu() {
    if (typeof TOOLS_DATA === 'undefined') return;
    const itemsHtml = TOOLS_DATA.map(tool => {
      const isLink = tool.type === 'link';
      const tag = isLink ? 'a' : 'button';
      const href = isLink ? `href="${tool.url}"` : '';
      const target = isLink ? `target="_blank" rel="noopener noreferrer"` : '';
      const shortcutHtml = tool.shortcut ? `<kbd class="menu-shortcut">${tool.shortcut}</kbd>` : '';

      return `<li role="none"><${tag} class="menu-item" role="menuitem" tabindex="-1" data-tool-id="${tool.id}" ${href} ${target}><i class="${tool.icon} fa-fw"></i><span>${tool.title}</span>${shortcutHtml}</${tag}></li>`;
    }).join('');

    this.menuElement.innerHTML = `<ul role="menu">${itemsHtml}</ul>`;
    this.menuItems = Array.from(this.menuElement.querySelectorAll('[role="menuitem"]'));
    this.menuItems.forEach(item => {
        item.addEventListener('click', (e) => this._handleItemClick(e.currentTarget));
    });
    this.isLoaded = true;
  },
  
  _handleItemClick(item) {
      const toolId = item.dataset.toolId;
      const toolData = TOOLS_DATA.find(t => t.id === toolId);
      
      if (toolData && toolData.type === 'modal') {
          switch (toolId) {
              case 'feeTool': UI.FeeTool.open(); break;
              case 'kbArticles': UI.KbModal.open(); break;
          }
      }
      this.close();
  },

  _handleMenuKeydown(e) {
    const itemCount = this.menuItems.length;
    if (itemCount === 0) return;
    const key = e.key;

    if (key === 'ArrowDown' || key === 'ArrowUp') {
        e.preventDefault();
        this.activeItemIndex = (key === 'ArrowDown')
            ? (this.activeItemIndex + 1) % itemCount
            : (this.activeItemIndex - 1 + itemCount) % itemCount;
        this._setActiveItem(this.activeItemIndex);
    } else if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        this.menuItems[this.activeItemIndex].click();
    }
  },
  
  _setActiveItem(index) {
    this.menuItems.forEach((item, i) => {
        item.classList.toggle('is-active', i === index);
        item.setAttribute('tabindex', i === index ? '0' : '-1');
    });
    const activeItem = this.menuItems[index];
    if (activeItem) {
        activeItem.focus();
    }
  }
};