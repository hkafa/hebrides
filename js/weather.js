/**
 * Weather service using Open-Meteo API (free, no API key required).
 * Selects the appropriate endpoint based on date distance from today.
 */

export class WeatherService {
    constructor() {
        this.cache = new Map();
    }

    async getWeather(lat, lon, dateStr) {
        const cacheKey = `${lat},${lon},${dateStr}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        let result;
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const target = new Date(dateStr + 'T00:00:00');
            const diffDays = Math.round((target - today) / (86400000));

            if (diffDays >= 0 && diffDays <= 15) {
                result = await this._fetchForecast(lat, lon, dateStr);
            } else if (diffDays < 0 && diffDays >= -730) {
                result = await this._fetchHistorical(lat, lon, dateStr);
            } else {
                // For far-future or very old dates, use same-date last year as proxy
                result = await this._fetchHistoricalProxy(lat, lon, dateStr);
            }
        } catch (err) {
            console.warn('Weather API failed, using fallback:', err.message);
            result = this._fallback();
        }

        this.cache.set(cacheKey, result);
        return result;
    }

    async _fetchForecast(lat, lon, dateStr) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code&start_date=${dateStr}&end_date=${dateStr}&timezone=Europe/London`;
        const data = await this._fetch(url);
        return this._parseDailyResponse(data, 'forecast');
    }

    async _fetchHistorical(lat, lon, dateStr) {
        const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code&start_date=${dateStr}&end_date=${dateStr}&timezone=Europe/London`;
        const data = await this._fetch(url);
        return this._parseDailyResponse(data, 'historical');
    }

    async _fetchHistoricalProxy(lat, lon, dateStr) {
        // Use same month/day from last year as a proxy for far-future dates
        const target = new Date(dateStr + 'T00:00:00');
        const lastYear = new Date(target);
        lastYear.setFullYear(lastYear.getFullYear() - 1);

        // Ensure we don't go into the future
        const today = new Date();
        while (lastYear > today) {
            lastYear.setFullYear(lastYear.getFullYear() - 1);
        }

        const proxyDate = lastYear.toISOString().split('T')[0];

        try {
            const result = await this._fetchHistorical(lat, lon, proxyDate);
            result.source = 'historical-proxy';
            result.description += ` (based on ${proxyDate})`;
            return result;
        } catch {
            return this._fallback();
        }
    }

    _parseDailyResponse(data, source) {
        if (!data?.daily?.time?.length) {
            return this._fallback();
        }
        const d = data.daily;
        return {
            tempMax: Math.round(d.temperature_2m_max[0] ?? 14),
            tempMin: Math.round(d.temperature_2m_min[0] ?? 10),
            precipitation: d.precipitation_sum?.[0] ?? 0,
            windSpeed: Math.round(d.wind_speed_10m_max?.[0] ?? 0),
            weatherCode: d.weather_code?.[0] ?? null,
            description: this.getWeatherDescription(d.weather_code?.[0]),
            source: source,
        };
    }

    _fallback() {
        return {
            tempMax: 14,
            tempMin: 10,
            precipitation: 3.5,
            windSpeed: 25,
            weatherCode: 3,
            description: 'Typical Hebrides conditions',
            source: 'fallback',
        };
    }

    async _fetch(url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Weather API ${res.status}: ${res.statusText}`);
        return res.json();
    }

    getWeatherDescription(code) {
        const descriptions = {
            0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
            45: 'Foggy', 48: 'Depositing rime fog',
            51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
            56: 'Freezing light drizzle', 57: 'Freezing dense drizzle',
            61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
            66: 'Freezing light rain', 67: 'Freezing heavy rain',
            71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow', 77: 'Snow grains',
            80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
            85: 'Slight snow showers', 86: 'Heavy snow showers',
            95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
        };
        return descriptions[code] ?? 'Unknown';
    }

    getWeatherIcon(code) {
        if (code === null || code === undefined) return 'cloud-sun';
        if (code === 0) return 'sun';
        if (code <= 3) return 'cloud-sun';
        if (code <= 48) return 'fog';
        if (code <= 57) return 'drizzle';
        if (code <= 67) return 'rain';
        if (code <= 77) return 'snow';
        if (code <= 82) return 'showers';
        return 'storm';
    }
}
