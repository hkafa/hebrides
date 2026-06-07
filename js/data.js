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

    tips: [
        {
            title: 'Book Ahead',
            text: 'Accommodation, restaurants and ferries fill up fast. Many places were fully booked. Call the day before to check opening hours and reserve a table \u2014 there may be only one place for food on a journey.',
        },
        {
            title: 'Sunday Closures',
            text: 'Lewis and Harris observe the Sabbath strictly. Shops, restaurants, and even public toilets close on Sundays. Book a hotel if you need to eat \u2014 they cater for residents.',
        },
        {
            title: 'Pack for All Weather',
            text: 'Beautiful blue skies and 19\u00b0C one moment, sheeting rain and 25mph winds the next. Scotland means packing for warm, cold, rain and wind \u2014 sometimes all in one day.',
        },
        {
            title: 'Pace Yourself',
            text: '30\u201340 miles per day is optimal. Front-loading big days means suffering later. Headwinds can halve your speed on downhills and add serious work to climbs. Don\'t stop too long either \u2014 muscles seize up after a 2-hour lunch.',
        },
        {
            title: 'Pre-Map Your Route',
            text: 'Know your climbs and descents in advance. Some of the best roads are off the official route \u2014 the Peat Road in Harris, the Golden Road, the Pentland Road in Lewis. Alternative quieter roads often have more character.',
        },
        {
            title: 'Single Track Roads',
            text: 'Don\'t be intimidated by cars. There are plenty of passing places and locals are very patient. Tourists less so, but they can bloody well wait a few hundred yards.',
        },
        {
            title: 'Food Surprises',
            text: 'Not a food capital, but surprisingly good: pizzas, mac and cheese, paninis, burgers and artisanal coffee. Check reviews and opening hours. Everything comes via ferry so appreciate what\'s available.',
        },
        {
            title: 'The Hills Are Fierce',
            text: 'The hills between Tarbert and Balallan are brutal. If the wind is in your face, you\'ll be grateful for months of prior training. Get some miles in your legs before the ride.',
        },
        {
            title: 'Enjoy It',
            text: 'Stunning beaches, stone circles 2,000 years older than Stonehenge (without the A303 hassle), island-hopping, and real camaraderie between cyclists. It\'s an achievement and a pleasure at the same time.',
        },
    ],

    days: DAYS,

    stops: [
        { name: 'Oban', detail: 'Starting point \u2014 ferry to Barra', lat: 56.4120, lon: -5.4714, day: 0, badge: 'start', badgeText: 'start' },
        { name: 'Castlebay, Barra', detail: 'Isle of Barra HS9 5UN', lat: 56.9546, lon: -7.4884, day: 0, badge: 'ferry', badgeText: 'ferry' },
        { name: 'South Uist', detail: 'South Uist', lat: 57.264214, lon: -7.33121, day: 1, badge: null },
        { name: 'Lochmaddy', detail: 'Isle of North Uist', lat: 57.6045975, lon: -7.1622117, day: 2, badge: null },
        { name: 'Tarbert', detail: 'Isle of Harris HS3 3DN', lat: 57.898166, lon: -6.806825, day: 3, badge: 'ferry', badgeText: 'ferry' },
        { name: 'Callanish', detail: 'Isle of Lewis HS2 9DY', lat: 58.201502, lon: -6.744959, day: 4, badge: null },
        { name: 'Butt of Lewis', detail: 'Northernmost point', lat: 58.5166667, lon: -6.2666667, day: 5, badge: null },
        { name: 'Tarbert', detail: 'Isle of Harris HS3 3DN (return south)', lat: 57.898166, lon: -6.806825, day: 6, badge: null },
        { name: 'Uig & Portree', detail: 'Isle of Skye \u2014 ferry + same day', lat: 57.5868588, lon: -6.3758522, day: 7, badge: 'combined', badgeText: 'ferry + same day', extraMarker: { lat: 57.413346, lon: -6.1947426, name: 'Portree' } },
        { name: 'Armadale', detail: 'Isle of Skye IV45 8RS', lat: 57.0648485, lon: -5.9010319, day: 8, badge: 'end', badgeText: 'finish' },
    ],
};
