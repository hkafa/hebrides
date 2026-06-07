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
            this.map.remove();
            this.map = null;
            this.markers = [];
            this.routeLine = null;
        }

        this.map = L.map(containerId, {
            zoomControl: true,
            attributionControl: true,
        }).setView([57.8, -6.8], 7);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
        }).addTo(this.map);
    }

    async showOverview() {
        if (!this.map) return;

        await this._loadOverallRoute();

        this._clearMarkers();
        TRIP_DATA.stops.forEach((stop, i) => {
            const isStart = i === 0;
            const isEnd = i === TRIP_DATA.stops.length - 1;
            const color = isStart ? '#2b8a3e' : isEnd ? '#c92a2a' : '#1971c2';

            const icon = this._createNumberedIcon(stop.dayLabel, color);
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
                const extraIcon = this._createNumberedIcon(stop.dayLabel, color);
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

        if (day.from) {
            const m = L.marker([day.from.lat, day.from.lon], {
                icon: this._createNumberedIcon('A', '#2b8a3e'),
            }).addTo(this.map)
              .bindPopup(`<div class="popup-title">${day.from.name}</div><div class="popup-detail">Start</div>`);
            this.markers.push(m);
            points.push([day.from.lat, day.from.lon]);
        }

        if (day.extraStop) {
            const m = L.marker([day.extraStop.lat, day.extraStop.lon], {
                icon: this._createNumberedIcon('B', '#7048e8'),
            }).addTo(this.map)
              .bindPopup(`<div class="popup-title">${day.extraStop.name}</div><div class="popup-detail">Stop</div>`);
            this.markers.push(m);
            points.push([day.extraStop.lat, day.extraStop.lon]);
        }

        const endLabel = day.extraStop ? 'C' : 'B';
        const m = L.marker([day.to.lat, day.to.lon], {
            icon: this._createNumberedIcon(endLabel, '#c92a2a'),
        }).addTo(this.map)
          .bindPopup(`<div class="popup-title">${day.to.name}</div><div class="popup-detail">End</div>`);
        this.markers.push(m);
        points.push([day.to.lat, day.to.lon]);

        if (points.length > 1) {
            const bounds = L.latLngBounds(points);
            this.map.fitBounds(bounds, { padding: [50, 50], maxZoom: 11 });

            const line = L.polyline(points, {
                color: '#1971c2',
                weight: 3,
                opacity: 0.5,
                dashArray: '8, 8',
            }).addTo(this.map);
            this.markers.push(line);
        } else {
            this.map.setView(points[0], 11);
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
            color: '#1971c2',
            weight: 3,
            opacity: 0.6,
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

    _createNumberedIcon(label, bgColor) {
        return L.divIcon({
            className: '',
            html: `<div class="numbered-marker" style="background:${bgColor};">${label}</div>`,
            iconSize: [26, 26],
            iconAnchor: [13, 13],
            popupAnchor: [0, -15],
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

document.addEventListener('DOMContentLoaded', () => {
    new HebridesApp();
});
