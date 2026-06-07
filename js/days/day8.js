export default {
    title: 'Portree to Armadale, Skye',
    subtitle: 'Final ride to the finish',
    from: { name: 'Portree, Skye', lat: 57.413346, lon: -6.1947426 },
    to: { name: 'Armadale, Skye', lat: 57.0648485, lon: -5.9010319 },
    distanceKm: 55,
    distanceNote: '~55 km to Armadale ferry terminal',
    gpxFile: null,
    mapLink: null,

    sections: [
        {
            id: 'food',
            title: 'food.options()',
            items: [
                { name: 'Broadford Shops (placeholder)', meta: 'various', notes: 'Last major stop before Armadale' },
                { name: 'Armadale Castle cafe (placeholder)', meta: 'cafe', notes: 'Near the ferry terminal' },
            ],
        },
        {
            id: 'campsites',
            title: 'campsites.list()',
            items: [
                { name: 'Armadale Campsite (placeholder)', notes: 'Near ferry terminal \u2014 celebrate!' },
            ],
        },
    ],
};
