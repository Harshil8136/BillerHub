/**
 * CLOCK WIDGET
 * ==================
 * This module manages the live clock and time-of-day visual effects
 * in the application's header. It now integrates with the WeatherFeature
 * to display live data and includes animations.
 */

const Clock = {
  widgetElement: null,
  lastWeatherFetch: 0,
  weatherData: null,
  lastSeconds: -1,
  
  /**
   * Initializes the clock feature.
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
   */
  async update() {
    // Periodically fetch new weather data (every 15 minutes)
    if (Date.now() - this.lastWeatherFetch > WeatherFeature.CACHE_DURATION) {
        this.lastWeatherFetch = Date.now();
        this.weatherData = await WeatherFeature.getWeather('richmondHill');
    }

    const now = new Date();
    const timezone = 'America/Toronto';

    const timeOptions = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true, timeZone: timezone };
    const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', timeZone: timezone };

    let localTime = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
    const localDate = new Intl.DateTimeFormat('en-US', dateOptions).format(now);

    const hourOptions = { hour: 'numeric', hour12: false, timeZone: timezone };
    const currentHour = parseInt(new Intl.DateTimeFormat('en-US', hourOptions).format(now));

    const timeOfDay = this.getTimeOfDay(currentHour);
    const weatherIcon = this.weatherData ? this.weatherData.icon : 'fa-sun';
    
    // Animate the seconds display
    const timeParts = localTime.split(' ');
    const [time, ampm] = timeParts;
    const [hour, minute, second] = time.split(':');
    
    // Only animate if the seconds have actually changed
    if (second !== this.lastSeconds) {
        this.lastSeconds = second;
        // Reconstruct time with a span for animation
        const animatedTimeHtml = `${hour}:${minute}:<span id="clock-seconds" class="clock-seconds-anim">${second}</span> ${ampm}`;
        
        // Conditionally show location text but always show the date
        const locationText = state.settings.clockShowLocation ? 'Richmond Hill, ON &bull; ' : '';
        const dateHtml = `<span class="date">${locationText}${localDate}</span>`;

        this.widgetElement.innerHTML = `
            <i class="fa-solid ${weatherIcon}"></i>
            <div class="time-details">
                <span class="time">${animatedTimeHtml}</span>
                ${dateHtml}
            </div>
        `;

        const secondsEl = document.getElementById('clock-seconds');
        if (secondsEl && window.gsap) {
            // Smoother fade animation
            gsap.fromTo(secondsEl, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.8, ease: 'power1.inOut' }
            );
        }
    }
    
    if (!this.widgetElement.classList.contains(timeOfDay)) {
        this.widgetElement.className = 'clock-widget'; // Reset classes
        this.widgetElement.classList.add(timeOfDay);
    }
  },

  /**
   * Determines the time of day based on the hour.
   * @param {number} hour The current hour (0-23).
   * @returns {string} The name of the time period.
   */
  getTimeOfDay(hour) {
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }
};