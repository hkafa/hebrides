export default {
    title: 'Butt of Lewis to Tarbert, Harris',
    subtitle: 'Long ride south \u2014 consider Pentland Road alternative',
    from: { name: 'Butt of Lewis', lat: 58.5166667, lon: -6.2666667 },
    to: { name: 'Tarbert, Harris', lat: 57.898166, lon: -6.806825 },
    distanceKm: 90,
    distanceNote: '~90 km \u2014 longest day. Pentland Road is quieter alternative to A857.',
    gpxFile: null,
    mapLink: null,

    sections: [
        {
            id: 'food',
            title: 'food.options()',
            items: [
                { name: 'Stornoway shops & cafes', meta: 'various', notes: 'Stock up in Stornoway on the way through' },
                { name: 'An Lanntair Cafe (placeholder)', meta: 'cafe', notes: 'Arts centre cafe in Stornoway' },
                { name: 'Co-op Tarbert', meta: 'shop', notes: 'End of day provisions' },
            ],
        },
        {
            id: 'campsites',
            title: 'campsites.list()',
            items: [
                { name: 'Tarbert Campsite (placeholder)', notes: 'Same as Day 3 stop' },
                { name: 'Seilebost Beach (placeholder)', notes: 'Wild camping with incredible views' },
            ],
        },
    ],
};
