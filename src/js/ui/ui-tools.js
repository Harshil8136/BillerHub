/**
 * UI TOOLS
 * ==================
 * This module manages the UI for the "Workplace Tools" drawer,
 * including its lazy-loading mechanism.
 */

UI.Tools = {
    isLoaded: false,

    /**
     * Toggles the visibility of the tools drawer.
     */
    toggle() {
        if (!this.isLoaded) this.load();
        UI.Drawer.open(dom.toolsPanel);
    },

    /**
     * Loads the drawer's content from the <template> on first open.
     */
    load() {
        if (this.isLoaded || !dom.toolsPanelTemplate) return;

        const templateContent = dom.toolsPanelTemplate.content.cloneNode(true);
        dom.toolsPanel.appendChild(templateContent);
        
        // Add event listeners to the new content
        dom.toolsPanel.querySelector('#toolsCloseBtn')?.addEventListener('click', () => UI.Drawer.close(dom.toolsPanel));
        document.getElementById('toolsKbSearch')?.addEventListener('input', Utils.debounce(Features.Tools.handleSearch, 200));
        
        this.isLoaded = true;
        Features.Tools.init();
    },

    /**
     * Renders the list of Knowledge Base articles.
     * @param {Array<object>} articles The articles to render.
     */
    renderKBArticles(articles) {
      const kbList = document.getElementById('kbList');
      if (!kbList) return;
      kbList.innerHTML = '';

      if (articles.length === 0) {
          kbList.innerHTML = `<li class="empty-state">No articles found.</li>`;
          return;
      }

      const fragment = document.createDocumentFragment();
      articles.forEach(article => {
          const item = document.createElement('li');
          item.innerHTML = `<a href="${article.link}" target="_blank" rel="noopener noreferrer">${article.title}</a>`;
          fragment.appendChild(item);
      });
      kbList.appendChild(fragment);
    }
};