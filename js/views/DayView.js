/**
 * Day detail view — fully dynamic renderer.
 * Reads sections from per-day config files (js/days/dayN.js).
 * Sections are rendered in the order they appear in the config.
 */

import { TRIP_DATA } from '../data.js';

export class DayView {
    constructor(mapManager, weatherService) {
        this.mapManager = mapManager;
        this.weatherService = weatherService;
    }

    render(container, dayIndex) {
        const day = TRIP_DATA.days[dayIndex];
        if (!day) {
            container.innerHTML = '<p class="error-msg">Day not found.</p>';
            return;
        }

        const prevLink = dayIndex > 0 ? `#/day/${dayIndex - 1}` : null;
        const nextLink = dayIndex < TRIP_DATA.days.length - 1 ? `#/day/${dayIndex + 1}` : null;
        const now = new Date();
        const defaultDate = `${now.getFullYear()}-09-15`;

        container.innerHTML = `
            <div class="day-page">
                <section class="weather-section">
                    <div class="section-header">
                        <h2><span class="prompt">&gt;</span> weather.forecast()</h2>
                    </div>
                    <div class="weather-card">
                        <div class="weather-date-picker">
                            <label for="weather-date">Select date:</label>
                            <input type="date" id="weather-date" value="${defaultDate}" />
                        </div>
                        <div class="weather-data" id="weather-data">
                            <div class="weather-loading">Fetching weather...</div>
                        </div>
                    </div>
                </section>

                <nav class="day-nav">
                    ${prevLink ? `<a href="${prevLink}" class="nav-link">&lt; Day ${dayIndex - 1}</a>` : '<span class="nav-link disabled">&lt;</span>'}
                    <a href="#/" class="nav-link nav-overview">overview</a>
                    ${nextLink ? `<a href="${nextLink}" class="nav-link">Day ${dayIndex + 1} &gt;</a>` : '<span class="nav-link disabled">&gt;</span>'}
                </nav>

                <header class="day-header">
                    <div class="day-number">Day ${day.day}</div>
                    <h1 class="day-title">${day.title}</h1>
                    <p class="day-subtitle">${day.subtitle}</p>
                </header>

                <section class="day-map-section">
                    <div id="map"></div>
                </section>

                ${this._renderPlan(day)}

                <div class="day-distance">
                    <span class="distance-value">${day.distanceKm}</span>
                    <span class="distance-unit">km</span>
                    <span class="distance-note">${day.distanceNote}</span>
                    ${day.gpxFile ? `<a href="${day.gpxFile}" download class="gpx-download">Download GPX</a>` : '<span class="gpx-pending">GPX coming soon</span>'}
                </div>

                <div id="day-sections"></div>
            </div>

            <footer>
                <p>// hebrides trip planner &mdash; 2026</p>
            </footer>
        `;

        // Render dynamic sections
        this._renderSections(day);

        // Mount map
        this.mapManager.mount('map');
        this.mapManager.showDayRoute(day);

        // Wire weather
        const dateInput = document.getElementById('weather-date');
        dateInput.addEventListener('change', () => {
            this._loadWeather(day, dateInput.value);
        });
        this._loadWeather(day, defaultDate);
    }

    async _loadWeather(day, dateStr) {
        const weatherDiv = document.getElementById('weather-data');
        if (!weatherDiv) return;
        weatherDiv.innerHTML = '<div class="weather-loading">Fetching weather...</div>';

        try {
            const loc = day.to;
            const weather = await this.weatherService.getWeather(loc.lat, loc.lon, dateStr);
            const iconClass = this.weatherService.getWeatherIcon(weather.weatherCode);

            const sourceLabels = {
                'forecast': 'forecast',
                'historical': 'historical',
                'historical-proxy': 'last year',
                'fallback': 'estimate',
            };
            const sourceLabel = sourceLabels[weather.source] || weather.source;

            weatherDiv.innerHTML = `
                <div class="weather-grid">
                    <div class="weather-main">
                        <div class="weather-icon weather-icon--${iconClass}"></div>
                        <div class="weather-temps">
                            <span class="weather-high">${weather.tempMax}&deg;C</span>
                            <span class="weather-sep">/</span>
                            <span class="weather-low">${weather.tempMin}&deg;C</span>
                        </div>
                        <div class="weather-desc">${weather.description}</div>
                    </div>
                    <div class="weather-details">
                        <div class="weather-detail">
                            <span class="weather-detail-label">Rain</span>
                            <span class="weather-detail-value">${weather.precipitation.toFixed(1)} mm</span>
                        </div>
                        <div class="weather-detail">
                            <span class="weather-detail-label">Wind</span>
                            <span class="weather-detail-value">${weather.windSpeed} km/h</span>
                        </div>
                        <div class="weather-detail">
                            <span class="weather-detail-label">Source</span>
                            <span class="weather-detail-value weather-source">${sourceLabel}</span>
                        </div>
                    </div>
                </div>
            `;
        } catch (err) {
            weatherDiv.innerHTML = `<div class="weather-error">Failed to load weather: ${err.message}</div>`;
        }
    }

    _renderPlan(day) {
        if (!day.plan && !day.mapLink) return '';

        const planHtml = day.plan
            ? `<div class="plan-text">${day.plan}</div>`
            : '';

        const mapLinkHtml = day.mapLink
            ? `<a href="${day.mapLink}" target="_blank" rel="noopener" class="map-open-link">Open in Google Maps &gt;</a>`
            : '';

        return `
            <section class="day-section plan-section">
                <div class="section-header">
                    <h2><span class="prompt">&gt;</span> plan.today()</h2>
                </div>
                ${planHtml}
                ${mapLinkHtml}
            </section>
        `;
    }

    /**
     * Render all sections from the day config dynamically.
     * Each section has: id, title, items[].
     * The `id` determines the card border color (ferry/food/campsites/custom).
     */
    _renderSections(day) {
        const sectionsContainer = document.getElementById('day-sections');
        if (!sectionsContainer || !day.sections) return;

        for (const section of day.sections) {
            if (!section.items?.length) continue;

            const sectionEl = document.createElement('section');
            sectionEl.className = 'day-section';

            sectionEl.innerHTML = `
                <div class="section-header">
                    <h2><span class="prompt">&gt;</span> ${section.title}</h2>
                </div>
                <div class="info-cards">
                    ${section.items.map(item => this._renderCard(item, section.id)).join('')}
                </div>
            `;

            sectionsContainer.appendChild(sectionEl);
        }
    }

    /**
     * Render a single card. Works for any section type.
     */
    _renderCard(item, sectionId) {
        const styleClass = this._getCardStyle(sectionId);
        const meta = item.meta ? `<div class="card-meta">${item.meta}</div>` : '';
        const notes = item.notes ? `<p class="card-notes">${item.notes}</p>` : '';

        let linkHtml = '';
        if (item.link) {
            const linkText = item.linkText || 'Details';
            linkHtml = `<a href="${item.link}" target="_blank" rel="noopener" class="card-link">${linkText} &gt;</a>`;
        } else if (sectionId === 'ferry') {
            linkHtml = '<span class="card-link-pending">Booking link TBC</span>';
        }

        return `
            <div class="info-card ${styleClass}">
                <div class="info-card-header">
                    <span class="card-title">${item.name}</span>
                </div>
                ${meta}
                ${notes}
                ${linkHtml}
            </div>
        `;
    }

    _getCardStyle(sectionId) {
        const styles = {
            ferry: 'ferry-card',
            food: 'food-card',
            campsites: 'camp-card',
        };
        return styles[sectionId] || 'custom-card';
    }
}
