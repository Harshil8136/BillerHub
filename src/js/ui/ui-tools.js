/**
 * UI TOOLS
 * ==================
 * REFACTORED: This module now dynamically builds a list of tools from
 * tools-data.js, making the drawer a scalable hub for new features.
 * It co-exists with the original KB Articles functionality.
 */

UI.Tools = {
    isLoaded: false,

    /**
     * Toggles the visibility of the tools drawer.
     */
    toggle() {
        if (!this.isLoaded) {
            this.load();
        }
        UI.Drawer.open(dom.toolsPanel);
    },

    /**
     * Loads the drawer's content from the <template> on first open,
     * builds the dynamic tools list, and initializes the KB article search.
     */
    load() {
        if (this.isLoaded || !dom.toolsPanelTemplate) return;

        const templateContent = dom.toolsPanelTemplate.content.cloneNode(true);
        dom.toolsPanel.appendChild(templateContent);
        
        this._buildToolsList();

        const kbSearchInput = document.getElementById('toolsKbSearch');
        if(kbSearchInput) {
            kbSearchInput.addEventListener('input', Utils.debounce(Features.Tools.handleSearch, 200));
        }
        
        dom.toolsPanel.querySelector('#toolsCloseBtn')?.addEventListener('click', () => UI.Drawer.close(dom.toolsPanel));
        
        this.isLoaded = true;
        Features.Tools.init();
    },

    /**
     * Builds the list of tools from TOOLS_DATA and prepends it to the drawer.
     * @private
     */
    _buildToolsList() {
        if (typeof TOOLS_DATA === 'undefined' || !dom.toolsPanel) return;
        
        const drawerContent = dom.toolsPanel.querySelector('.drawer-content');
        if (!drawerContent) return;

        const toolsSection = document.createElement('section');
        toolsSection.setAttribute('aria-labelledby', 'tools-heading');

        const buttonsHtml = TOOLS_DATA.map(tool => {
            const itemClass = tool.type === 'link' ? 'menu-item' : 'menu-item';
            const target = tool.type === 'link' ? `target="_blank" rel="noopener noreferrer"` : '';
            const href = tool.type === 'link' ? `href="${tool.url}"` : '';
            const tag = tool.type === 'link' ? 'a' : 'button';
            
            return `
                <li>
                    <${tag} class="${itemClass}" data-tool-id="${tool.id}" ${href} ${target}>
                        <i class="${tool.icon} fa-fw"></i>
                        <span>${tool.title}</span>
                    </${tag}>
                </li>
            `;
        }).join('');

        toolsSection.innerHTML = `
            <h3 id="tools-heading">Quick Tools</h3>
            <ul class="tools-list">${buttonsHtml}</ul>
        `;

        drawerContent.prepend(toolsSection);

        toolsSection.querySelectorAll('button[data-tool-id]').forEach(button => {
            button.addEventListener('click', () => {
                const toolId = button.dataset.toolId;
                if (toolId === 'feeTool') {
                    UI.FeeTool.open();
                }
            });
        });
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