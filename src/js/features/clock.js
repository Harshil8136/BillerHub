/**
 * CLOCK WIDGET
 * ==================
 * This new module manages the live clock and time-of-day visual effects
 * in the application's header. It is self-contained and runs client-side.
 */

const Clock = {
  widgetElement: null,
  
  /**
   * Initializes the clock feature.
   * Finds the DOM element and starts the update interval.
   */
  init() {
    this.widgetElement = document.getElementById('clockWidget');
    if (this.widgetElement) {
      this.update(); // Initial call to display immediately
      setInterval(() => this.update(), 1000); // Update every second
    }
  },

  /**
   * Main update function, called every second.
   * Gets the current time for the target timezone, updates the DOM,
   * and applies the appropriate class for time-of-day effects.
   */
  update() {
    const now = new Date();
    const timezone = 'America/Toronto'; // Target timezone for Richmond Hill, ON

    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: timezone,
    };
    
    const dateOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: timezone,
    };

    const localTime = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
    const localDate = new Intl.DateTimeFormat('en-US', dateOptions).format(now);

    // Get the current hour in the target timezone to determine time of day
    const hourOptions = { hour: 'numeric', hour12: false, timeZone: timezone };
    const currentHour = parseInt(new Intl.DateTimeFormat('en-US', hourOptions).format(now));

    const timeOfDay = this.getTimeOfDay(currentHour);
    const weatherIcon = this.getWeatherIcon(timeOfDay);
    
    // Update the UI
    this.widgetElement.innerHTML = `
        <i class="fa-solid ${weatherIcon}"></i>
        <div class="time-details">
            <span class="time">${localTime}</span>
            <span class="date">Richmond Hill, ON &bull; ${localDate}</span>
        </div>
    `;
    
    // Apply time-of-day class for CSS animations
    if (!this.widgetElement.classList.contains(timeOfDay)) {
        this.widgetElement.className = 'clock-widget'; // Reset classes
        this.widgetElement.classList.add(timeOfDay);
    }
  },

  /**
   * Determines the time of day based on the hour.
   * @param {number} hour The current hour (0-23).
   * @returns {string} The name of the time period (e.g., 'night').
   */
  getTimeOfDay(hour) {
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'noon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  },

  /**
   * Gets a representative static weather icon based on the time of day.
   * @param {string} timeOfDay The current time of day period.
   * @returns {string} A Font Awesome icon class.
   */
  getWeatherIcon(timeOfDay) {
      switch(timeOfDay) {
          case 'morning': return 'fa-sun';
          case 'noon': return 'fa-sun';
          case 'evening': return 'fa-cloud-moon';
          case 'night': return 'fa-moon';
          default: return 'fa-sun';
      }
  }
};