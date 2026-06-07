export default {
    title: 'Tarbert to Uig & Portree, Skye',
    subtitle: 'Ferry to Skye then ride to Portree',
    from: { name: 'Tarbert, Harris', lat: 57.898166, lon: -6.806825 },
    to: { name: 'Portree, Skye', lat: 57.413346, lon: -6.1947426 },
    extraStop: { name: 'Uig Ferry Terminal', lat: 57.5868588, lon: -6.3758522 },
    distanceKm: 30,
    distanceNote: '~30 km cycling (Uig to Portree) after ferry',
    gpxFile: null,
    mapLink: null,

    sections: [
        {
            id: 'ferry',
            title: 'ferry.info()',
            items: [
                {
                    name: 'Tarbert \u2192 Uig (Uig Triangle)',
                    meta: 'CalMac',
                    notes: 'Part of the Uig Triangle route. Then cycle Uig \u2192 Portree same day.',
                    link: null,
                    linkText: 'Book tickets',
                },
            ],
        },
        {
            id: 'food',
            title: 'food.options()',
            items: [
                { name: 'Portree High Street (placeholder)', meta: 'various', notes: 'Multiple options in Portree \u2014 biggest town on Skye' },
                { name: 'The Bosville Hotel (placeholder)', meta: 'restaurant', notes: 'Good food with harbour views' },
                { name: 'Co-op Portree', meta: 'shop', notes: 'Well-stocked supermarket' },
            ],
        },
        {
            id: 'campsites',
            title: 'campsites.list()',
            items: [
                { name: 'Torvaig Campsite (placeholder)', notes: 'Near Portree, good facilities' },
                { name: 'Portree Campsite (placeholder)', notes: 'Walking distance from town' },
            ],
        },
    ],
};
