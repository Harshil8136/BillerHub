/**
 * WEATHER FEATURE
 * ==================
 * This module handles fetching live weather data from an external API
 * and caching the results to minimize requests.
 */

const WeatherFeature = {
    // Cache results for 15 minutes (15 * 60 * 1000 milliseconds)
    CACHE_DURATION: 900000, 

    // Hardcoded locations for the weather display
    LOCATIONS: {
        richmondHill: { name: 'Richmond Hill', lat: 43.88, lon: -79.44 },
        toronto: { name: 'Toronto', lat: 43.65, lon: -79.38 }
    },

    /**
     * Fetches weather for a given location, using a cache to prevent excessive API calls.
     * @param {string} locationKey The key of the location from the LOCATIONS object (e.g., 'richmondHill').
     * @returns {Promise<object|null>} A promise that resolves with formatted weather data or null on error.
     */
    async getWeather(locationKey) {
        const location = this.LOCATIONS[locationKey];
        if (!location) {
            console.error(`Weather location "${locationKey}" not found.`);
            return null;
        }

        const cacheKey = `weather-cache-${locationKey}`;
        const cachedItem = sessionStorage.getItem(cacheKey);

        if (cachedItem) {
            const { data, timestamp } = JSON.parse(cachedItem);
            if (Date.now() - timestamp < this.CACHE_DURATION) {
                return data;
            }
        }

        try {
            const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`;
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
            
            const weatherData = await response.json();
            const current = weatherData.current_weather;

            const formattedData = {
                name: location.name,
                temperature: Math.round(current.temperature),
                icon: this._getIconFromCode(current.weathercode)
            };

            sessionStorage.setItem(cacheKey, JSON.stringify({ data: formattedData, timestamp: Date.now() }));
            return formattedData;

        } catch (error) {
            console.error(`Failed to fetch weather for ${location.name}:`, error);
            return null;
        }
    },

    /**
     * Maps a WMO weather code to a Font Awesome icon class.
     * @param {number} code The WMO weather code from the API.
     * @returns {string} The corresponding icon class.
     * @private
     */
    _getIconFromCode(code) {
        if (code === 0) return 'fa-sun'; // Clear sky
        if (code >= 1 && code <= 3) return 'fa-cloud-sun'; // Mainly clear, partly cloudy, overcast
        if (code >= 45 && code <= 48) return 'fa-smog'; // Fog
        if (code >= 51 && code <= 57) return 'fa-cloud-rain'; // Drizzle
        if (code >= 61 && code <= 67) return 'fa-cloud-showers-heavy'; // Rain
        if (code >= 71 && code <= 77) return 'fa-snowflake'; // Snowfall
        if (code >= 80 && code <= 82) return 'fa-cloud-showers-heavy'; // Rain showers
        if (code >= 85 && code <= 86) return 'fa-snowflake'; // Snow showers
        if (code >= 95 && code <= 99) return 'fa-cloud-bolt'; // Thunderstorm
        return 'fa-question-circle'; // Default
    }
};