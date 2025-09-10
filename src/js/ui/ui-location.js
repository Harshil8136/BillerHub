/**
 * UI LOCATION
 * ==================
 * This module handles rendering the UI for the Area Code Lookup results.
 */

UI.Location = {
  /**
   * Displays the results of an area code search.
   * @param {object} locationData The processed location data to display.
   */
  displayResults(locationData) {
    if (!dom.areaLookupResultsBox) return;

    let billersHtml = `<div class="empty-state" style="padding: var(--space-md) var(--space-lg);">No primary billers listed for this area.</div>`;
    if (locationData.billers.length > 0) {
        billersHtml = locationData.billers.map(biller => 
            `<li>
                <button class="location-result-item" data-id="${biller.id}">
                    <strong>${biller.tla}</strong>
                    <span class="truncate">${biller.name}</span>
                </button>
            </li>`
        ).join('');
    }

    dom.areaLookupResultsBox.innerHTML = `
        <div class="location-result-header">
            <h4 class="location-result-title">${locationData.name}</h4>
            <div class="location-result-meta">
                <span><i class="fa-solid fa-globe"></i> ${locationData.country}</span>
                <span><i class="fa-solid fa-clock"></i> ${locationData.localTime}</span>
            </div>
        </div>
        <ul class="location-result-list">${billersHtml}</ul>
    `;

    dom.areaLookupResultsBox.querySelectorAll('.location-result-item').forEach(button => {
        button.addEventListener('click', (e) => {
            selectBillerById(e.currentTarget.dataset.id);
            LocationFeature.toggleLookup(false);
        });
    });
    
    dom.areaLookupResultsBox.hidden = false;
  },

  /**
   * Clears the area code results box.
   */
  clearResults() {
    if (dom.areaLookupResultsBox) {
        dom.areaLookupResultsBox.innerHTML = '';
        dom.areaLookupResultsBox.hidden = true;
    }
  },

  /**
   * Displays a "no results found" message.
   * @param {string} query The search query that yielded no results.
   */
  displayNoResults(query) {
    if (!dom.areaLookupResultsBox) return;
    dom.areaLookupResultsBox.innerHTML = `<div class="empty-state" style="padding: var(--space-lg);">No location found for "${query}".</div>`;
    dom.areaLookupResultsBox.hidden = false;
  }
};