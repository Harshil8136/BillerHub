/**
 * LOCATION FEATURE
 * ==================
 * This file contains the feature logic for the Area Code lookup. It has been
 * streamlined to support the new header-integrated UI, removing the popover
 * in favor of displaying results directly in a floating box.
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
        // Delay focus slightly to allow animation to start
        setTimeout(() => dom.areaLookupInput.focus(), 50);
    } else {
        dom.areaLookupInput.blur();
        dom.areaLookupInput.value = '';
        UI.Location.clearResults();
    }
  },

  /**
   * Handles live input from the user in the area lookup box. When the user
   * enters a valid 3+ digit area code, it performs the search and calls the
   * UI to display the results.
   */
  handleInput() {
    const query = dom.areaLookupInput.value.trim();

    if (query.length < 3) {
      UI.Location.clearResults();
      return;
    }

    const locationInfo = AREA_CODES[query]; // This is now an object, e.g., { name: 'New Jersey', ... }
    if (!locationInfo) {
      UI.Location.displayNoResults(query);
      return;
    }
    
    // Reconstruct the key for the LOCATION_BILLERS map from the structured data
    const billerLookupKey = `${locationInfo.name}, ${locationInfo.country}`;
    const billerTLAs = LOCATION_BILLERS[billerLookupKey] || [];
    
    const foundBillers = billerTLAs.map(tla => {
        // Handle complex TLA strings like "BGE - NSRC" by taking the first part.
        const cleanTla = tla.split('-')[0].trim();
        return BILLERS.find(biller => biller.tla === cleanTla || (biller.aliases && biller.aliases.includes(cleanTla)));
    }).filter(Boolean); // Filter out any undefined results

    const locationData = {
      areaCode: query,
      name: locationInfo.name,
      country: locationInfo.country,
      localTime: this.getTimeForTimezone(locationInfo.timezone),
      billers: foundBillers,
    };

    UI.Location.displayResults(locationData);
  },

  /**
   * Gets the current formatted time for a given IANA timezone.
   * @param {string} timezone - The IANA timezone name (e.g., 'America/New_York').
   * @returns {string} The formatted local time string.
   */
  getTimeForTimezone(timezone) {
      if (!timezone || timezone === 'UTC') return 'N/A';
      try {
          const timeOptions = {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
              timeZone: timezone
          };
          return new Intl.DateTimeFormat('en-US', timeOptions).format(new Date());
      } catch (e) {
          console.warn(`Invalid timezone provided: ${timezone}`);
          return 'Invalid Timezone';
      }
  }
};