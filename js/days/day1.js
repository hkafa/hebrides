export default {
    title: 'Barra to South Uist',
    subtitle: 'Causeways and machair',
    from: { name: 'Castlebay, Barra', lat: 56.9546, lon: -7.4884 },
    to: { name: 'South Uist', lat: 57.264214, lon: -7.33121 },
    distanceKm: 55,
    distanceNote: '~55 km via Eriskay causeway',
    gpxFile: null,
    mapLink: null,

    sections: [
        {
            id: 'food',
            title: 'food.options()',
            items: [
                { name: 'Am Politician', meta: 'pub', notes: 'Named after the SS Politician shipwreck. Eriskay.' },
                { name: 'Kilbride Cafe (placeholder)', meta: 'cafe', notes: 'Light meals and coffee' },
                { name: 'Co-op Daliburgh', meta: 'shop', notes: 'Grocery stop in South Uist' },
            ],
        },
        {
            id: 'campsites',
            title: 'campsites.list()',
            items: [
                { name: 'Howmore Hostel & Camping (placeholder)', notes: 'Historic setting near ruins' },
                { name: 'Lochboisdale Campsite (placeholder)', notes: 'Near ferry terminal' },
            ],
        },
    ],
};
