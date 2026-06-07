export default {
    title: 'Lochmaddy to Tarbert, Harris',
    subtitle: 'Ferry crossing to Harris',
    from: { name: 'Lochmaddy, North Uist', lat: 57.6045975, lon: -7.1622117 },
    to: { name: 'Tarbert, Harris', lat: 57.898166, lon: -6.806825 },
    distanceKm: 30,
    distanceNote: '~30 km cycling after ferry',
    gpxFile: null,
    mapLink: null,

    sections: [
        {
            id: 'ferry',
            title: 'ferry.info()',
            items: [
                {
                    name: 'Lochmaddy \u2192 Tarbert (Uig Triangle)',
                    meta: 'CalMac',
                    notes: 'Part of the Uig Triangle route. Book ahead.',
                    link: null,
                    linkText: 'Book tickets',
                },
            ],
        },
        {
            id: 'food',
            title: 'food.options()',
            items: [
                { name: 'Hotel Hebrides (placeholder)', meta: 'restaurant', notes: 'Tarbert, good seafood' },
                { name: 'The Anchorage (placeholder)', meta: 'cafe', notes: 'Light meals near the pier' },
                { name: 'Co-op Tarbert', meta: 'shop', notes: 'Grocery stop' },
            ],
        },
        {
            id: 'campsites',
            title: 'campsites.list()',
            items: [
                { name: 'Tarbert Campsite (placeholder)', notes: 'Walking distance from village' },
                { name: 'Horgabost Beach (placeholder)', notes: 'Beautiful wild camping spot' },
            ],
        },
    ],
};
