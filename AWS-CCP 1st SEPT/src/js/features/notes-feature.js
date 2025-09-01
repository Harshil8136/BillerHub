/**
 * NOTES FEATURE
 * ==================
 * This file contains the logic for the interactive and categorized
 * notes section within the Biller Card.
 */

const NotesFeature = {
  currentBillerNotes: null,
  activeCategory: 'all',

  /**
   * Loads the appropriate notes object for the selected biller and
   * triggers the initial UI render.
   * @param {object} biller The biller object currently displayed.
   */
  loadNotesForBiller(biller) {
    // UPDATED: The map is now ready to accept new biller note files.
    const notesDataMap = {
      'BGE': typeof BGE_NOTES !== 'undefined' ? BGE_NOTES : null,
      'CEMI': typeof CEMI_NOTES !== 'undefined' ? CEMI_NOTES : null, // Ready for CEMI.js
    };

    this.currentBillerNotes = notesDataMap[biller.tla] || null;
    
    // Default to the 'alert' category if it exists, otherwise 'all'.
    this.activeCategory = (this.currentBillerNotes && this.currentBillerNotes.alert) ? 'alert' : 'all';

    // Call the UI to render the notes component
    UI_Notes.render(this.currentBillerNotes, this.activeCategory);
  },

  /**
   * Handles a click on a category tab.
   * @param {string} categoryKey The key of the category that was clicked (e.g., 'fees').
   */
  handleCategoryClick(categoryKey) {
    if (this.activeCategory === categoryKey) return;
    
    this.activeCategory = categoryKey;
    
    // Call the UI to update the button states and render the new content
    UI_Notes.update(this.currentBillerNotes, this.activeCategory);
  }
};