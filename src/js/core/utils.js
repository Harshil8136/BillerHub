/**
 * APP UTILS
 * ==================
 * This file provides a set of globally available helper functions
 * through the `Utils` object for common tasks like local storage and debouncing.
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
  },
  
  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was invoked.
   * @param {function} func The function to debounce.
   * @param {number} wait The number of milliseconds to delay.
   * @returns {function} The new debounced function.
   */
  debounce(func, wait = 200) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  },

  /**
   * Appends a message to an on-screen debug log for troubleshooting.
   * @param {string} message The message to log.
   */
  debugLog(message) {
    // This function relies on an element with id="debugLog" in index.html
    const logContainer = document.getElementById('debugLog');
    if (!logContainer) return;

    const timestamp = new Date().toLocaleTimeString();
    const entry = document.createElement('p');
    entry.textContent = `[${timestamp}] ${message}`;
    
    logContainer.appendChild(entry);
    // Auto-scroll to the latest message
    logContainer.scrollTop = logContainer.scrollHeight;
  }
};