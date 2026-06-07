/**
 * Home/welcome page view — hero, resources, map, timeline.
 */

import { TRIP_DATA } from '../data.js';

export class HomeView {
    constructor(mapManager) {
        this.mapManager = mapManager;
    }

    render(container) {
        container.innerHTML = `
            <header class="hero">
                <div class="hero-content">
                    <h1 class="hero-title">Outer Hebrides</h1>
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-value">~${TRIP_DATA.meta.totalKm}</span>
                            <span class="stat-label">km</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${TRIP_DATA.stops.length}</span>
                            <span class="stat-label">stops</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${TRIP_DATA.meta.totalDays}</span>
                            <span class="stat-label">days</span>
                        </div>
                    </div>
                </div>
            </header>

            <div class="content-wrap">
                <section class="resources-section">
                    <div class="section-header">
                        <h2>Useful links</h2>
                    </div>
                    <ul class="resources-list">
                        <li>
                            <a href="https://www.visitouterhebrides.co.uk/see-and-do/activities/the-hebridean-way" target="_blank" rel="noopener">The Hebridean Way</a>
                            <span class="resource-desc">&mdash; official route info</span>
                        </li>
                        <li>
                            <a href="https://www.tripadvisor.co.uk/Attraction_Review-g186500-d10145498-Reviews-The_Hebridean_Way-Scotland.html" target="_blank" rel="noopener">TripAdvisor reviews</a>
                            <span class="resource-desc">&mdash; real experiences from cyclists</span>
                        </li>
                        <li>
                            <a href="https://www.calmac.co.uk/" target="_blank" rel="noopener">CalMac Ferries</a>
                            <span class="resource-desc">&mdash; book ferry crossings</span>
                        </li>
                        <li>
                            <a href="https://www.visitouterhebrides.co.uk/planning-your-trip/camping" target="_blank" rel="noopener">Camping guide</a>
                            <span class="resource-desc">&mdash; wild camping &amp; campsite info</span>
                        </li>
                        <li>
                            <a href="https://www.scotrail.co.uk/" target="_blank" rel="noopener">ScotRail</a>
                            <span class="resource-desc">&mdash; train connections</span>
                        </li>
                    </ul>
                </section>

                <section class="map-section">
                    <div class="section-header">
                        <h2>Route overview</h2>
                    </div>
                    <div id="map"></div>
                </section>

                <section class="timeline-section">
                    <div class="section-header">
                        <h2>Daily stops</h2>
                    </div>
                    <div class="timeline" id="timeline"></div>
                </section>
            </div>

            <footer>
                <p>Hebrides trip planner &mdash; 2026</p>
            </footer>
        `;

        this.mapManager.mount('map');
        this.mapManager.showOverview();
        this._renderTimeline();
    }

    _renderTimeline() {
        const container = document.getElementById('timeline');
        const stops = TRIP_DATA.stops;

        stops.forEach((stop, i) => {
            const item = document.createElement('div');
            item.className = 'timeline-item';

            let badgeHtml = '';
            if (stop.badge) {
                badgeHtml = `<span class="timeline-badge badge-${stop.badge}">${stop.badgeText}</span>`;
            }

            const isStart = i === 0;
            const isEnd = i === stops.length - 1;
            const markerClass = isStart ? 'timeline-marker--start' : isEnd ? 'timeline-marker--end' : '';

            item.innerHTML = `
                <div class="timeline-card">
                    <div class="timeline-marker ${markerClass}">${stop.dayLabel}</div>
                    <div class="timeline-info">
                        <div class="timeline-name">${stop.name}</div>
                        <div class="timeline-detail">${stop.detail}</div>
                    </div>
                    ${badgeHtml}
                </div>
            `;

            item.addEventListener('click', () => {
                location.hash = `#/day/${stop.day}`;
            });

            container.appendChild(item);
        });
    }
}
