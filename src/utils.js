/**
 * ==================================================================
 *
 * PASTE THE ENTIRE FUSE.JS CODE THAT YOU COPIED FROM THE URL HERE
 *
 * ==================================================================
 */



/**
 * ==================================================================
 * APP UTILS
 * ==================================================================
 * This file provides a set of globally available helper functions
 * through the `Utils` object.
 * ==================================================================
 */
const Utils = {
  /**
   * Safely saves a value to localStorage after converting it to a JSON string.
   * @param {string} key The key to save the data under.
   * @param {*} value The value to save (can be an object, array, etc.).
   */
  storageSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  },

  /**
   * Safely retrieves and parses a value from localStorage.
   * @param {string} key The key of the data to retrieve.
   * @param {*} [defaultValue=null] The value to return if the key doesn't exist or data is corrupt.
   * @returns {*} The parsed value or the default value.
   */
  storageGet(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.error("Failed to retrieve from localStorage", e);
      return defaultValue;
    }
  },

  /**
   * Sets up event listeners to notify when the browser's online status changes.
   * @param {function(boolean): void} callback The function to call with the new status (true for online, false for offline).
   */
  onOfflineStatusChange(callback) {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));
    // Also call it once on init to set the initial state
    callback(navigator.onLine);
  },

  /**
   * Simulates an "AI" prediction by finding the most frequent search term in history.
   * @param {string[]} history An array of past search queries.
   * @returns {string|null} The predicted search term or null if no prediction can be made.
   */
  getPrediction(history) {
    if (!history || history.length < 3) {
      return null;
    }
    const frequency = history.reduce((acc, term) => {
      // Don't count very short terms
      if (term.length > 2) {
        acc[term] = (acc[term] || 0) + 1;
      }
      return acc;
    }, {});

    let maxCount = 0;
    let prediction = null;

    for (const term in frequency) {
      if (frequency[term] > maxCount) {
        maxCount = frequency[term];
        prediction = term;
      }
    }

    // Don't predict the term that was just searched
    if (prediction === history[history.length - 1]) {
      return null;
    }

    return prediction;
  },
  
  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was invoked.
   * @param {function} func The function to debounce.
   * @param {number} wait The number of milliseconds to delay.
   * @returns {function} The new debounced function.
   */
  debounce(func, wait = 300) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  },
};