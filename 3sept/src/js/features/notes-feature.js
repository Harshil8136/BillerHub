/**
 * NOTES FEATURE
 * ==================
 * UPDATED: Logic added to detect new "Composite" biller note structures (like DNE)
 * and pass the type to the UI renderer. The notes map is updated to include DNE.
 *
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
      'DNE': typeof DNE_NOTES !== 'undefined' ? DNE_NOTES : null,
    };

    this.currentBillerNotes = notesDataMap[biller.tla] || null;
    
    // Determine the type of note structure to inform the renderer.
    let noteType = 'stateless'; // Default type
    if (this.currentBillerNotes) {
        if (this.currentBillerNotes.services) {
            noteType = 'composite'; // For complex billers like DNE
        } else if (this.currentBillerNotes.states) {
            noteType = 'stateful'; // For billers with state-by-state info
        }
    }
    
    // Set the default active category based on the note type and data available.
    this.activeCategory = 'all';
    if (noteType === 'composite' && this.currentBillerNotes.alerts) {
      this.activeCategory = 'alerts'; // Default to alerts for composite billers
    } else if (this.currentBillerNotes && this.currentBillerNotes.alert) {
      this.activeCategory = 'alert'; // Fallback for older alert structures
    }

    // Call the UI to render the notes component, passing the determined type.
    UI_Notes.render(this.currentBillerNotes, this.activeCategory, noteType);
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