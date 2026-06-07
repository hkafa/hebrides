export default {
    title: 'South Uist to Lochmaddy',
    subtitle: 'North through the Uists',
    from: { name: 'South Uist', lat: 57.264214, lon: -7.33121 },
    to: { name: 'Lochmaddy, North Uist', lat: 57.6045975, lon: -7.1622117 },
    distanceKm: 50,
    distanceNote: '~50 km via Benbecula causeway',
    gpxFile: null,
    mapLink: null,

    sections: [
        {
            id: 'food',
            title: 'food.options()',
            items: [
                { name: 'Stepping Stone Restaurant (placeholder)', meta: 'restaurant', notes: 'Benbecula, near the causeway' },
                { name: 'Lochmaddy Hotel', meta: 'pub', notes: 'Meals and drinks near the ferry port' },
                { name: 'Claddach Kirkibost Centre (placeholder)', meta: 'cafe', notes: 'Cafe and crafts' },
            ],
        },
        {
            id: 'campsites',
            title: 'campsites.list()',
            items: [
                { name: 'Lochmaddy Campsite (placeholder)', notes: 'Near ferry terminal, basic facilities' },
                { name: 'Wild camp near beach (placeholder)', notes: 'Several quiet spots along the coast' },
            ],
        },
    ],
};
