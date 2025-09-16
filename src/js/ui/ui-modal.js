/**
 * UI MODAL
 * ==================
 * This module contains the logic for the Biller Directory modal.
 */

UI.Modal = {
  directoryVirtualList: null,
  
  /**
   * Opens a modal overlay.
   * @param {HTMLElement} modalElement The modal element to open.
   */
  open(modalElement) {
    state.activeModal = modalElement;
    modalElement.hidden = false; 
    requestAnimationFrame(() => {
      modalElement.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });

    if (modalElement === dom.directoryModal && !this.directoryVirtualList && BILLERS?.length > 0) {
      const sortedBillers = DataHelpers.sortBillersByName(BILLERS);
      const modalBody = modalElement.querySelector('.modal-body');
      
      this.directoryVirtualList = new VirtualList({
        container: modalBody,
        items: sortedBillers,
        itemHeight: 46,
        renderItem: (biller) => `
          <li class="directory-item ${biller.live ? 'is-live' : ''}" data-id="${biller.id}" role="button" tabindex="0">
            <span class="status-dot ${biller.live ? 'is-live' : 'is-offline'}"></span>
            <span class="directory-name">${biller.name}</span>
            <span class="directory-tla">${biller.tla}</span>
          </li>`
      });
      modalBody.addEventListener('click', this.handleItemClick);
    }
  },
  
  /**
   * Closes an active modal.
   * @param {HTMLElement} modalElement The modal element to close.
   */
  close(modalElement) {
    const modalBody = modalElement.querySelector('.modal-body');
    if (modalElement === dom.directoryModal && this.directoryVirtualList) {
      this.directoryVirtualList.destroy();
      this.directoryVirtualList = null;
      modalBody.removeEventListener('click', this.handleItemClick);
      modalBody.innerHTML = '';
    }
    state.activeModal = null; 
    modalElement.classList.remove('is-open');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      if (!state.activeModal) modalElement.hidden = true;
    }, 300);
  },
  
  /**
   * Handles clicks on items within the directory modal list.
   * @param {Event} e The click event.
   */
  handleItemClick(e) {
    const item = e.target.closest('.directory-item');
    if (item?.dataset.id) {
      selectBillerById(item.dataset.id);
      UI.Modal.close(dom.directoryModal);
    }
  }
};