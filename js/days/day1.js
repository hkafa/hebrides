export default {
    title: 'Barra to South Uist',
    subtitle: 'Causeways and machair',
    from: { name: 'Castlebay, Barra', lat: 56.9546, lon: -7.4884 },
    to: { name: 'South Uist', lat: 57.264214, lon: -7.33121 },
    distanceKm: 55,
    distanceNote: '~55 km via Eriskay causeway',
    plan: 'Day 1 is the first day on the route and the plan is to cycle to South Uist, which includes a ferry to Eriskay',
    gpxFile: null,
    mapLink: null,

    sections: [
        {
            id: 'ferry',
            title: 'ferry',
            items: [
                {
                    name: 'Ardmhor \u2192 Eriskay',
                    meta: 'CalMac',
                    notes: 'Ferry every 2 hours on summer timetable from 5 AM',
                    link: 'https://www.google.com/maps/dir/Vatersay,+Isle+of+Barra+HS9+5YW/South+Uist/@56.9946156,-7.4875566,11.96z/data=!4m14!4m13!1m5!1m1!1s0x488cafdc8b82c2c5:0xa41abdd4d4290d41!2m2!1d-7.537883!2d56.91793!1m5!1m1!1s0x488ce9bb54bc392b:0xe2479fea442b2099!2m2!1d-7.33121!2d57.264214!3e1?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D',
                    linkText: 'Summer timetable',
                },
            ],
        },
        {
            id: 'food',
            title: 'food',
            items: [
                { name: 'Am Politician', meta: 'pub', notes: 'Named after the SS Politician shipwreck. Eriskay.' },
                { name: 'Kilbride Cafe (placeholder)', meta: 'cafe', notes: 'Light meals and coffee' },
                { name: 'Co-op Daliburgh', meta: 'shop', notes: 'Grocery stop in South Uist' },
            ],
        },
        {
            id: 'campsites',
            title: 'campsites',
            items: [
                { name: 'Howmore Hostel & Camping (placeholder)', notes: 'Historic setting near ruins' },
                { name: 'Lochboisdale Campsite (placeholder)', notes: 'Near ferry terminal' },
            ],
        },
    ],
};
