/**
 * NOTES FEATURE
 * ==================
 * This file contains the logic for the interactive and categorized
 * notes section within the Biller Card. It loads the correct data
 * for the selected biller.
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
    // This map determines which notes object to load based on the biller's TLA.
    const notesDataMap = {
      'BGE': typeof BGE_NOTES !== 'undefined' ? BGE_NOTES : null,
      'CEMI': typeof CEMI_NOTES !== 'undefined' ? CEMI_NOTES : null,
      'NSRC': typeof NSRC_NOTES !== 'undefined' ? NSRC_NOTES : null,
    };

    this.currentBillerNotes = notesDataMap[biller.tla] || null;
    
    // Default to the 'alert' category if it exists, otherwise 'all'.
    this.activeCategory = (this.currentBillerNotes && this.currentBillerNotes.alert) ? 'alert' : 'all';

    // Call the UI to render the notes component
    UI_Notes.render(this.currentBillerNotes, this.activeCategory);
  },

  /**
   * Handles a click on a standard category tab (for stateless notes like BGE/CEMI).
   * @param {string} categoryKey The key of the category that was clicked (e.g., 'fees').
   */
  handleCategoryClick(categoryKey) {
    if (this.activeCategory === categoryKey) return;
    
    this.activeCategory = categoryKey;
    
    // Call the UI to update the button states and render the new content
    UI_Notes.update(this.currentBillerNotes, this.activeCategory);
  }
};