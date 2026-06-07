export default {
    title: 'Callanish to Butt of Lewis',
    subtitle: 'Northernmost point of the Hebrides',
    from: { name: 'Callanish, Lewis', lat: 58.201502, lon: -6.744959 },
    to: { name: 'Butt of Lewis', lat: 58.5166667, lon: -6.2666667 },
    distanceKm: 45,
    distanceNote: '~45 km to the northern tip',
    gpxFile: null,
    mapLink: null,

    sections: [
        {
            id: 'food',
            title: 'food.options()',
            items: [
                { name: 'Cross Inn (placeholder)', meta: 'pub', notes: 'Ness, near Butt of Lewis' },
                { name: 'Harbour View Gallery & Cafe (placeholder)', meta: 'cafe', notes: 'Port of Ness' },
            ],
        },
        {
            id: 'campsites',
            title: 'campsites.list()',
            items: [
                { name: 'Ness Campsite (placeholder)', notes: 'Near the Butt of Lewis lighthouse' },
                { name: 'Wild camp near coast (placeholder)', notes: 'Dramatic clifftop spots' },
            ],
        },
    ],
};
