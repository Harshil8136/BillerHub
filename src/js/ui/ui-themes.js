/**
 * UI THEMES
 * ==================
 * This module manages the UI for the new "Themes" drawer,
 * including its lazy-loading mechanism.
 */

UI.Themes = {
    isLoaded: false,

    /**
     * Toggles the visibility of the themes drawer.
     */
    toggle() {
        if (!this.isLoaded) {
            this.load();
        }
        UI.Drawer.open(dom.themePanel);
    },

    /**
     * Loads the drawer's content from the <template> on its first opening.
     */
    load() {
        if (this.isLoaded || !dom.themePanelTemplate) return;

        // Clone the content from the template and append it to the drawer
        const templateContent = dom.themePanelTemplate.content.cloneNode(true);
        dom.themePanel.appendChild(templateContent);
        
        // Re-cache the new DOM element for the content area
        dom.themeSelector = document.getElementById('themeSelector');

        // Add event listeners to the newly created content
        dom.themePanel.querySelector('#themesCloseBtn')?.addEventListener('click', () => UI.Drawer.close(dom.themePanel));
        
        // Delegate to the ThemeFeature module to build the UI and sync its state
        ThemeFeature.buildSelector();
        
        this.isLoaded = true;
    }
};