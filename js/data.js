/**
 * Trip data for the Outer Hebrides cycling route.
 * Day-specific data lives in js/days/dayN.js — edit those files directly.
 */

import day0 from './days/day0.js';
import day1 from './days/day1.js';
import day2 from './days/day2.js';
import day3 from './days/day3.js';
import day4 from './days/day4.js';
import day5 from './days/day5.js';
import day6 from './days/day6.js';
import day7 from './days/day7.js';
import day8 from './days/day8.js';

// Attach day index to each config
const DAYS = [day0, day1, day2, day3, day4, day5, day6, day7, day8];
DAYS.forEach((d, i) => { d.day = i; });

export const TRIP_DATA = {
    meta: {
        totalDays: DAYS.length,
        totalKm: 400,
        totalStops: 10,
    },

    days: DAYS,

    coops: [
        { name: 'Co-op Sollas', detail: 'North Uist', lat: 57.6501336, lon: -7.3444987 },
        { name: 'Co-op Creagorry', detail: 'Benbecula', lat: 57.4105727, lon: -7.3348259 },
        { name: 'Co-op Daliburgh', detail: 'South Uist', lat: 57.165778, lon: -7.371257 },
        { name: 'Co-op Portree (Woodlands Rd)', detail: 'Isle of Skye', lat: 57.417597, lon: -6.207789 },
        { name: 'Co-op Portree (Bank St)', detail: 'Isle of Skye', lat: 57.4128304, lon: -6.1923122 },
        { name: 'Co-op Castlebay', detail: 'Barra', lat: 56.9553997, lon: -7.4985678 },
        { name: 'Co-op Stornoway (Cromwell St)', detail: 'Lewis', lat: 58.208771, lon: -6.388179 },
        { name: 'Co-op Stornoway (MacAulay Rd)', detail: 'Lewis', lat: 58.2162569, lon: -6.3839502 },
    ],

    stops: [
        { name: 'Castlebay', detail: 'Ferry from Oban, Isle of Barra', lat: 56.9546, lon: -7.4884, day: 0, dayLabel: '0', badge: 'start', badgeText: 'start' },
        { name: 'South Uist', detail: 'South Uist', lat: 57.264214, lon: -7.33121, day: 1, dayLabel: '1', badge: null },
        { name: 'Lochmaddy', detail: 'Isle of North Uist', lat: 57.6045975, lon: -7.1622117, day: 2, dayLabel: '2', badge: null },
        { name: 'Tarbert', detail: 'Isle of Harris', lat: 57.898166, lon: -6.806825, day: 3, dayLabel: '3', badge: 'ferry', badgeText: 'ferry' },
        { name: 'Callanish', detail: 'Isle of Lewis', lat: 58.201502, lon: -6.744959, day: 4, dayLabel: '4', badge: null },
        { name: 'Butt of Lewis', detail: 'Northernmost point', lat: 58.5166667, lon: -6.2666667, day: 5, dayLabel: '5', badge: null },
        { name: 'Tarbert', detail: 'Isle of Harris (return south)', lat: 57.92, lon: -6.85, day: 6, dayLabel: '6', badge: null },
        { name: 'Uig & Portree', detail: 'Isle of Skye, ferry + same day', lat: 57.5868588, lon: -6.3758522, day: 7, dayLabel: '7', badge: 'combined', badgeText: 'ferry + same day', extraMarker: { lat: 57.413346, lon: -6.1947426, name: 'Portree' } },
        { name: 'Armadale', detail: 'Isle of Skye', lat: 57.0648485, lon: -5.9010319, day: 8, dayLabel: '8', badge: 'end', badgeText: 'finish' },
    ],
};
