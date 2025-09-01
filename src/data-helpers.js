/**
 * DATA HELPERS
 * ==================
 * This file provides a set of globally available helper functions for
 * querying and manipulating the application's data (e.g., the BILLERS array).
 * This separates data logic from core application and UI logic.
 *
 * FUNCTIONS:
 * - getBillerById: Finds a single biller by its unique ID.
 * - filterBillers: Filters the biller list based on given criteria.
 * - sortBillersByName: Sorts a list of billers alphabetically by name.
 * - processSearchHistoryForChart: Processes raw search history into a format ready for Chart.js.
 */

const DataHelpers = {
  /**
   * Finds a single biller from an array of billers by its unique ID.
   * @param {Array} billers The array of biller objects to search.
   * @param {number|string} id The unique ID of the biller to find.
   * @returns {object|undefined} The found biller object, or undefined if not found.
   */
  getBillerById(billers, id) {
    // Using == allows for loose comparison as ID from dataset might be a string.
    return billers.find(biller => biller.id == id);
  },

  /**
   * Filters an array of billers based on a criteria object.
   * @param {Array} billers The array of biller objects to filter.
   * @param {object} criteria An object with key-value pairs to match (e.g., { live: true, paymentType: 'Utilities' }).
   * @returns {Array} A new array containing only the billers that match the criteria.
   */
  filterBillers(billers, criteria) {
    return billers.filter(biller => {
      return Object.keys(criteria).every(key => {
        const criteriaValue = criteria[key];
        const billerValue = biller[key];
        
        // If the biller's value is an array, check if it includes the criteria value.
        if (Array.isArray(billerValue)) {
          return billerValue.includes(criteriaValue);
        }
        
        // Otherwise, perform a direct comparison.
        return billerValue === criteriaValue;
      });
    });
  },

  /**
   * Sorts an array of billers alphabetically by name.
   * @param {Array} billers The array of biller objects to sort.
   * @returns {Array} A new, sorted array of billers.
   */
  sortBillersByName(billers) {
    // Create a new array to avoid modifying the original
    return [...billers].sort((a, b) => a.name.localeCompare(b.name));
  },

  /**
   * Processes a raw search history array to find the most frequent searches,
   * returning data formatted for a Chart.js bar chart.
   * @param {Array<object>} history An array of biller objects that were viewed.
   * @param {number} [limit=5] The number of top results to return.
   * @returns {{labels: string[], data: number[]}} An object containing labels and data for a chart.
   */
  processSearchHistoryForChart(history, limit = 5) {
    if (!history || history.length === 0) {
      return { labels: [], data: [] };
    }

    // Count the frequency of each biller view by its ID
    const frequency = history.reduce((acc, biller) => {
      acc[biller.id] = (acc[biller.id] || 0) + 1;
      return acc;
    }, {});
    
    // Sort by frequency in descending order
    const sorted = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]);

    // Get the top 'limit' billers and format for Chart.js
    const topBillerIds = sorted.slice(0, limit);
    const labels = [];
    const data = [];

    topBillerIds.forEach(id => {
      const biller = this.getBillerById(BILLERS, id);
      if (biller) {
        labels.push(biller.tla); // Use TLA for concise chart labels
        data.push(frequency[id]);
      }
    });

    return { labels, data };
  },
};