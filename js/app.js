/**
 * Outer Hebrides Cycling Trip — Main App
 */

import { TRIP_DATA } from './data.js';
import { Router } from './router.js';
import { WeatherService } from './weather.js';
import { HomeView } from './views/HomeView.js';
import { DayView } from './views/DayView.js';

class MapManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.routeLine = null;
        this.routeData = null;
    }

    mount(containerId) {
        const el = document.getElementById(containerId);
        if (!el) return;

        if (this.map) {
            // Leaflet can't re-mount — destroy and recreate
            this.map.remove();
            this.map = null;
            this.markers = [];
            this.routeLine = null;
        }

        this.map = L.map(containerId, {
            zoomControl: true,
            attributionControl: true,
        }).setView([57.8, -6.8], 7);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
        }).addTo(this.map);
    }

    async showOverview() {
        if (!this.map) return;

        // Load overall GPX route
        await this._loadOverallRoute();

        // Add stop markers
        this._clearMarkers();
        TRIP_DATA.stops.forEach((stop, i) => {
            const icon = this._createIcon(stop, i, TRIP_DATA.stops.length);
            const marker = L.marker([stop.lat, stop.lon], { icon })
                .addTo(this.map)
                .bindPopup(`
                    <div class="popup-title">${stop.name}</div>
                    <div class="popup-detail">${stop.detail}</div>
                    <div class="popup-detail">Day ${stop.day}</div>
                `);
            this.markers.push(marker);

            if (stop.extraMarker) {
                const em = stop.extraMarker;
                const extraIcon = this._createIcon(stop, i, TRIP_DATA.stops.length);
                L.marker([em.lat, em.lon], { icon: extraIcon })
                    .addTo(this.map)
                    .bindPopup(`
                        <div class="popup-title">${em.name}</div>
                        <div class="popup-detail">Same day as Uig Ferry</div>
                        <div class="popup-detail">Day ${stop.day}</div>
                    `);
            }
        });
    }

    showDayRoute(day) {
        if (!this.map) return;
        this._clearMarkers();

        const points = [];

        // From marker
        if (day.from) {
            const fromIcon = this._createColorIcon('#3fb950');
            const m = L.marker([day.from.lat, day.from.lon], { icon: fromIcon })
                .addTo(this.map)
                .bindPopup(`<div class="popup-title">${day.from.name}</div><div class="popup-detail">Start</div>`);
            this.markers.push(m);
            points.push([day.from.lat, day.from.lon]);
        }

        // Extra stop (e.g. Uig on Day 7)
        if (day.extraStop) {
            const extraIcon = this._createColorIcon('#bc8cff');
            const m = L.marker([day.extraStop.lat, day.extraStop.lon], { icon: extraIcon })
                .addTo(this.map)
                .bindPopup(`<div class="popup-title">${day.extraStop.name}</div><div class="popup-detail">Stop</div>`);
            this.markers.push(m);
            points.push([day.extraStop.lat, day.extraStop.lon]);
        }

        // To marker
        const toIcon = this._createColorIcon('#f85149');
        const m = L.marker([day.to.lat, day.to.lon], { icon: toIcon })
            .addTo(this.map)
            .bindPopup(`<div class="popup-title">${day.to.name}</div><div class="popup-detail">End</div>`);
        this.markers.push(m);
        points.push([day.to.lat, day.to.lon]);

        // Fit bounds
        if (points.length > 1) {
            const bounds = L.latLngBounds(points);
            this.map.fitBounds(bounds, { padding: [50, 50], maxZoom: 11 });
        } else {
            this.map.setView(points[0], 11);
        }

        // Draw a simple line between points
        if (points.length > 1) {
            const line = L.polyline(points, {
                color: '#58a6ff',
                weight: 3,
                opacity: 0.6,
                dashArray: '8, 8',
            }).addTo(this.map);
            this.markers.push(line);
        }
    }

    async _loadOverallRoute() {
        if (this.routeData) {
            this._drawRoute(this.routeData);
            return;
        }
        try {
            const res = await fetch('overall_route.gpx');
            const gpxText = await res.text();
            const parser = new DOMParser();
            const gpx = parser.parseFromString(gpxText, 'text/xml');
            const trackPoints = gpx.querySelectorAll('trkpt');

            const latlngs = [];
            trackPoints.forEach(pt => {
                latlngs.push([
                    parseFloat(pt.getAttribute('lat')),
                    parseFloat(pt.getAttribute('lon')),
                ]);
            });

            this.routeData = latlngs;
            this._drawRoute(latlngs);
        } catch (err) {
            console.error('Failed to load GPX:', err);
        }
    }

    _drawRoute(latlngs) {
        if (!latlngs.length) return;
        this.routeLine = L.polyline(latlngs, {
            color: '#58a6ff',
            weight: 3,
            opacity: 0.7,
            smoothFactor: 1,
        }).addTo(this.map);

        const bounds = L.latLngBounds(latlngs);
        this.map.fitBounds(bounds, { padding: [30, 30] });
    }

    _clearMarkers() {
        this.markers.forEach(m => m.remove());
        this.markers = [];
        if (this.routeLine) {
            this.routeLine.remove();
            this.routeLine = null;
        }
    }

    _createIcon(stop, index, total) {
        const isStart = index === 0;
        const isEnd = index === total - 1;
        let color = '#58a6ff';
        if (isStart) color = '#3fb950';
        if (isEnd) color = '#f85149';
        return this._createColorIcon(color);
    }

    _createColorIcon(color) {
        return L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                width: 14px; height: 14px; border-radius: 50%;
                background: ${color}; border: 2px solid ${color};
                box-shadow: 0 0 10px ${color}80;
            "></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
            popupAnchor: [0, -10],
        });
    }
}

class HebridesApp {
    constructor() {
        this.mapManager = new MapManager();
        this.weatherService = new WeatherService();
        this.homeView = new HomeView(this.mapManager);
        this.dayView = new DayView(this.mapManager, this.weatherService);
        this.container = document.getElementById('app');

        this.router = new Router({
            '/': () => this.showHome(),
            '/day/:n': (params) => this.showDay(parseInt(params.n, 10)),
        });
    }

    showHome() {
        window.scrollTo(0, 0);
        this.homeView.render(this.container);
    }

    showDay(dayIndex) {
        window.scrollTo(0, 0);
        this.dayView.render(this.container, dayIndex);
    }
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
    new HebridesApp();
});
