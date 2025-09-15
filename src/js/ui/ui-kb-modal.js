/**
 * UI KB MODAL
 * ==================
 * This module manages the lightweight pop-up modal for searching
 * Knowledge Base (KB) articles.
 */

UI.KbModal = {
  modalElement: null,
  searchInput: null,
  resultsList: null,

  /**
   * Initializes the KB Modal by caching its DOM elements and attaching listeners.
   */
  init() {
    this.modalElement = document.getElementById('kbModal');
    if (!this.modalElement) return;
    
    const closeBtn = document.getElementById('kbModalCloseBtn');
    this.searchInput = document.getElementById('kbSearchInput');
    this.resultsList = document.getElementById('kbResultsList');

    closeBtn?.addEventListener('click', () => this.close());
    this.searchInput?.addEventListener('input', Utils.debounce(() => this._handleSearch(), 200));
  },

  /**
   * Opens the KB modal, populates the initial full list of articles, and focuses the search input.
   */
  open() {
    if (!this.modalElement) return;
    
    if (typeof KB_ARTICLES !== 'undefined') {
      this._renderList(KB_ARTICLES);
    }
    
    UI.Modal.open(this.modalElement);
    this.searchInput?.focus();
  },

  /**
   * Closes the KB modal and clears the search input.
   */
  close() {
    if (!this.modalElement) return;

    UI.Modal.close(this.modalElement);
    if (this.searchInput) {
        this.searchInput.value = '';
    }
  },

  /**
   * Handles user input in the search field to filter the KB articles.
   * @private
   */
  _handleSearch() {
    if (typeof KB_ARTICLES === 'undefined') return;

    const query = this.searchInput.value.toLowerCase().trim();
    if (!query) {
      this._renderList(KB_ARTICLES);
      return;
    }

    const filtered = KB_ARTICLES.filter(article => 
      article.title.toLowerCase().includes(query)
    );
    this._renderList(filtered);
  },

  /**
   * Renders a list of articles into the modal's result list.
   * @param {Array<object>} articles The array of article objects to render.
   * @private
   */
  _renderList(articles) {
    if (!this.resultsList) return;

    if (articles.length === 0) {
      this.resultsList.innerHTML = `<li class="empty-state">No articles found.</li>`;
      return;
    }

    const itemsHtml = articles.map(article => `
      <li>
        <a href="${article.link}" class="kb-modal-link" target="_blank" rel="noopener noreferrer">
          ${article.title}
        </a>
      </li>
    `).join('');

    this.resultsList.innerHTML = itemsHtml;
  }
};