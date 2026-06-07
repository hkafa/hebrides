/**
 * Home/welcome page view — hero, tips, overview map, and timeline.
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
                    <h1 class="glitch-text">Outer Hebrides</h1>
                    <p class="subtitle">// cycling the edge of the world</p>
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-value">~${TRIP_DATA.meta.totalKm}</span>
                            <span class="stat-label">km</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${TRIP_DATA.meta.totalStops}</span>
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
                <section class="tips-section">
                    <div class="section-header">
                        <h2><span class="prompt">&gt;</span> tips.whatToExpect()</h2>
                        <p class="section-subtitle">Wisdom from those who've done it</p>
                    </div>
                    <div class="tips-intro">
                        <p>The Hebridean Way by bike is a challenge all cyclists should consider &mdash; what's not to like about looking at the weather forecast back home and boring your family by pointing out how far north those islands are!</p>
                        <p class="tips-disclosure">Full disclosure: we skimped a little by starting in Barra rather than Vatersay, so strictly speaking we only did 95% of it. If you want a challenge without needing to be super fit, this might be for you.</p>
                    </div>
                    <div class="tips-grid">
                        ${TRIP_DATA.tips.map(tip => `
                            <div class="tip-card">
                                <h3 class="tip-title">${tip.title}</h3>
                                <p class="tip-text">${tip.text}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <section class="map-section">
                    <div class="section-header">
                        <h2><span class="prompt">&gt;</span> route.overview()</h2>
                    </div>
                    <div id="map"></div>
                </section>

                <section class="timeline-section">
                    <div class="section-header">
                        <h2><span class="prompt">&gt;</span> days.list()</h2>
                    </div>
                    <div class="timeline" id="timeline"></div>
                </section>
            </div>

            <footer>
                <p>// hebrides trip planner &mdash; 2026</p>
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

            item.innerHTML = `
                <div class="timeline-card">
                    <div class="timeline-day">Day ${stop.day}</div>
                    <div class="timeline-name">${stop.name}</div>
                    <div class="timeline-detail">${stop.detail}</div>
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
