/**
 * UI CLOCK
 * ==================
 * This module manages the UI for the interactive clock widget,
 * including its settings popover and weather display.
 */

UI.Clock = {
    
    /**
     * Initializes the interactive clock by attaching the popover trigger.
     */
    init() {
        if (dom.clockWidget) {
            dom.clockWidget.addEventListener('click', () => this.toggle());
        }
    },

    /**
     * Toggles the visibility of the clock's settings popover.
     */
    toggle() {
        const isAlreadyOpen = state.activePopover && state.activePopover.popover === dom.clockPopover;
        
        if (state.activePopover) {
            UI.Popovers.closeActive();
        }

        if (!isAlreadyOpen) {
            this.open();
        }
    },

    /**
     * Opens the clock popover, fetches weather data, and attaches listeners.
     */
    open() {
        if (!dom.clockPopover || !dom.clockWidget) return;
        
        UI.Popovers.open(dom.clockPopover, dom.clockWidget);
        this._updateWeatherDisplay();
        this._attachSettingsListener();
    },

    /**
     * Fetches weather for all locations and renders it into the popover.
     * @private
     */
    async _updateWeatherDisplay() {
        const weatherDisplay = dom.clockPopover.querySelector('.weather-display');
        if (!weatherDisplay) return;

        weatherDisplay.innerHTML = `<div class="weather-loading">Loading weather...</div>`;

        const weatherPromises = Object.keys(WeatherFeature.LOCATIONS).map(key => WeatherFeature.getWeather(key));
        const weatherResults = await Promise.all(weatherPromises);

        const weatherHtml = weatherResults.map(result => {
            if (!result) return '';
            return `
                <div class="weather-item">
                    <i class="fa-solid ${result.icon} fa-2x"></i>
                    <div class="weather-details">
                        <span class="weather-temp">${result.temperature}°C</span>
                        <span class="weather-location">${result.name}</span>
                    </div>
                </div>
            `;
        }).join('');

        weatherDisplay.innerHTML = weatherHtml;
    },

    /**
     * Attaches the event listener for the settings toggle within the popover.
     * @private
     */
    _attachSettingsListener() {
        const toggle = dom.clockPopover.querySelector('#toggleClockLocation');
        if (toggle) {
            // Use .onclick to ensure we don't double-bind if the popover is reopened
            toggle.onchange = (e) => Features.Settings.handleToggle(e);
        }
    }
};