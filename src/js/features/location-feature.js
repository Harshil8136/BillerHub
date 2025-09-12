/**
 * LOCATION FEATURE
 * ==================
 * This file contains the feature logic for the Area Code lookup.
 */

const LocationFeature = {
  isActive: false,

  /**
   * Initializes the location feature. Called once at startup.
   */
  init() {
    console.log("Location Feature initialized.");
  },

  /**
   * Toggles the visibility of the header-integrated area lookup input.
   * @param {boolean} [forceState] - Optional flag to force a state (true for open, false for closed).
   */
  toggleLookup(forceState = null) {
    this.isActive = forceState !== null ? forceState : !this.isActive;
    
    dom.areaLookupContainer.classList.toggle('lookup-active', this.isActive);
    Anim.toggleAreaLookup(this.isActive);

    if (this.isActive) {
        setTimeout(() => dom.areaLookupInput.focus(), 50);
    } else {
        dom.areaLookupInput.blur();
        dom.areaLookupInput.value = '';
        UI.Location.clearResults();
    }
  },

  /**
   * Handles live input from the user in the area lookup box.
   */
  handleInput() {
    const query = dom.areaLookupInput.value.trim();

    if (query.length < 3) {
      UI.Location.clearResults();
      return;
    }

    const locationInfo = AREA_CODES[query];
    if (!locationInfo) {
      UI.Location.displayNoResults(query);
      return;
    }
    
    // Reconstruct the key for the LOCATION_BILLERS map from the structured data
    const billerLookupKey = `${locationInfo.name}, ${locationInfo.country}`;
    const billerTLAs = LOCATION_BILLERS[billerLookupKey] || [];
    
    const foundBillers = billerTLAs.map(tla => {
        const cleanTla = tla.split('-')[0].trim();
        return BILLERS.find(biller => biller.tla === cleanTla || (biller.aliases && biller.aliases.includes(cleanTla)));
    }).filter(Boolean);

    const locationData = {
      areaCode: query,
      name: locationInfo.name,
      country: locationInfo.country,
      localTime: Utils.getTimeForTimezone(locationInfo.timezone),
      billers: foundBillers,
    };
    
    // Update state for keyboard navigation
    state.currentLocationSuggestions = foundBillers;
    state.activeLocationSuggestionIndex = foundBillers.length > 0 ? 0 : -1;

    UI.Location.displayResults(locationData);
  },
};