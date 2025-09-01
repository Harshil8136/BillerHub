/**
 * DATABASE MODULE (IndexedDB Wrapper)
 * ==================
 * This file provides a simple promise-based interface for interacting
 * with IndexedDB, abstracting away its verbosity.
 */

const DB = {
  DB_NAME: 'BillerHubDB',
  DB_VERSION: 1,
  STORE_NAME: 'keyval',
  _dbPromise: null,

  /**
   * Opens and initializes the database connection.
   * This is called internally and memoizes the promise.
   * @returns {Promise<IDBDatabase>} A promise that resolves with the database instance.
   */
  _connect() {
    if (this._dbPromise) {
      return this._dbPromise;
    }

    this._dbPromise = new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        console.warn('IndexedDB not supported.');
        return reject('IndexedDB not supported.');
      }

      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME);
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.error('Database error:', event.target.error);
        reject(event.target.error);
      };
    });

    return this._dbPromise;
  },

  /**
   * Retrieves a value from the database by its key.
   * @param {string} key - The key of the item to retrieve.
   * @returns {Promise<any>} A promise that resolves with the value, or undefined if not found.
   */
  get(key) {
    return this._connect().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, 'readonly');
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.get(key);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = (event) => {
          console.error(`Error getting key "${key}":`, event.target.error);
          reject(event.target.error);
        };
      });
    });
  },

  /**
   * Saves a value in the database with a given key.
   * @param {string} key - The key to save the item under.
   * @param {any} value - The value to save.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  set(key, value) {
    return this._connect().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, 'readwrite');
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.put(value, key);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = (event) => {
          console.error(`Error setting key "${key}":`, event.target.error);
          reject(event.target.error);
        };
      });
    });
  }
};