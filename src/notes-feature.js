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
    // A mapping from biller TLA to its notes data object.
    // As you add new files like CEMI.js, you'll add them here.
    const notesDataMap = {
      'BGE': BGE_NOTES,
      // 'CEMI': CEMI_NOTES, // Example for the future
    };

    this.currentBillerNotes = notesDataMap[biller.tla] || null;
    
    // Default to the 'all' category
    this.activeCategory = 'all';

    // Call the UI to render the notes component
    UI_Notes.render(this.currentBillerNotes, this.activeCategory);
  },

  /**
   * Handles a click on a category tab.
   * @param {string} categoryKey The key of the category that was clicked (e.g., 'fees').
   */
  handleCategoryClick(categoryKey) {
    this.activeCategory = categoryKey;
    
    // Call the UI to update the button states and render the new content
    UI_Notes.update(this.currentBillerNotes, this.activeCategory);
  }
};