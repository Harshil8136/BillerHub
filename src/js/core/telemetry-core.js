/**
 * TELEMETRY CORE
 * ==================
 * This module handles the core logic for anonymous analytics, including
 * Firebase initialization, authentication, and event queuing/flushing.
 */

const Telemetry = {
  isInitialized: false,
  isConsented: false,
  authUid: null,
  firestore: null,
  queue: [],
  flushInterval: null,
  displayName: '',

  /**
   * Initializes the telemetry system.
   */
  init: async function() {
    this.isConsented = Utils.storageGet('telemetry-consent', false);
    this.displayName = Utils.storageGet('telemetry-displayName', '');
    
    if (!this.isConsented) {
      console.log('Telemetry consent not given. Analytics disabled.');
      return;
    }

    try {
      if (typeof firebase === 'undefined' || typeof firebaseConfig === 'undefined') {
        throw new Error('Firebase SDK or config is not loaded.');
      }
      
      firebase.initializeApp(firebaseConfig);
      this.firestore = firebase.firestore();
      const auth = firebase.auth();

      await auth.signInAnonymously();
      this.authUid = auth.currentUser.uid;
      
      this.isInitialized = true;
      console.log('Firebase initialized and user signed in anonymously:', this.authUid);

      await this.loadQueue();
      this.flushInterval = setInterval(() => this._flushQueue(), 10000);
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') this._flushQueue();
      });

    } catch (error) {
      console.error('Telemetry: CRITICAL - Firebase init failed. Telemetry will be queued only.', error);
      this.isInitialized = false;
      await this.loadQueue();
    }
  },

  /**
   * Logs a structured event to the queue.
   */
  logEvent: function(eventType, data = {}) {
    if (!this.isConsented) return;
    
    const event = {
      collection: 'events',
      payload: {
        event_type: eventType,
        ...data,
      }
    };
    this.queue.push(event);
    this._saveQueue();
  },

  /**
   * Logs a structured, sanitized error to the queue.
   */
  logError: function(error, context = 'global', extra = {}) {
    if (!this.isConsented) return;
    
    const errorEvent = {
        collection: 'errors',
        payload: {
            message: error.message,
            stack_truncated: error.stack ? error.stack.substring(0, 1000) : 'No stack available.',
            context: context,
            filename: extra.source || (error.fileName || 'N/A'),
            line: extra.lineno || (error.lineNumber || -1),
        }
    };
    this.queue.push(errorEvent);
    this._saveQueue();
  },

  /**
   * Attempts to send all queued events to Firestore.
   */
  _flushQueue: async function() {
    if (!this.isInitialized || !navigator.onLine || this.queue.length === 0) {
      return;
    }

    const eventsToFlush = [...this.queue];
    this.queue = [];

    try {
      const batch = this.firestore.batch();
      
      eventsToFlush.forEach(event => {
        // FIX: Reconstruct the payload to guarantee it conforms to security rules,
        // which fixes issues with old, malformed data in the queue.
        const collectionName = event.collection || 'events';
        const docRef = this.firestore.collection(collectionName).doc();
        
        const finalPayload = { 
            ...(event.payload || {}), // Safely spread payload, defaulting to an empty object
            user_id: this.authUid,
            display_name: this.displayName,
            ts_server: firebase.firestore.FieldValue.serverTimestamp() 
        };
        
        batch.set(docRef, finalPayload);
      });

      await batch.commit();
      console.log(`Successfully flushed ${eventsToFlush.length} events.`);
      
    } catch (error) {
      console.error('Failed to flush telemetry queue. Re-queuing events.', error);
      this.queue = [...eventsToFlush, ...this.queue];
    }
    
    this._saveQueue();
  },

  /**
   * Saves the current event queue to IndexedDB for persistence.
   */
  _saveQueue: function() {
    DB.set('telemetry-queue', this.queue).catch(err => console.error("Error saving telemetry queue to DB:", err));
  },
  
  /**
   * Loads the event queue from IndexedDB on startup.
   */
  loadQueue: async function() {
    this.queue = await DB.get('telemetry-queue') || [];
    if (this.queue.length > 0) {
      console.log(`Loaded ${this.queue.length} events from IndexedDB.`);
      this._flushQueue();
    }
  }
};