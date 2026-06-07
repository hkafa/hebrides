export default {
    title: 'Barra to South Uist',
    subtitle: 'Causeways and machair',
    from: { name: 'Castlebay, Barra', lat: 56.9546, lon: -7.4884 },
    to: { name: 'South Uist', lat: 57.264214, lon: -7.33121 },
    distanceKm: 55,
    distanceNote: '~55 km via Eriskay causeway',
    plan: 'Day 1 is the first day on the route and the plan is to cycle to South Uist, which includes a ferry to Eriskay',
    gpxFile: null,
    mapLink: 'https://www.google.com/maps/dir/Vatersay,+Isle+of+Barra+HS9+5YW/South+Uist/@56.9946156,-7.4875566,11.96z/data=!4m14!4m13!1m5!1m1!1s0x488cafdc8b82c2c5:0xa41abdd4d4290d41!2m2!1d-7.537883!2d56.91793!1m5!1m1!1s0x488ce9bb54bc392b:0xe2479fea442b2099!2m2!1d-7.33121!2d57.264214!3e1?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D',

    sections: [
        {
            id: 'ferry',
            title: 'ferry',
            items: [
                {
                    name: 'Ardmhor \u2192 Eriskay',
                    meta: 'CalMac',
                    notes: 'Ferry every 2 hours on summer timetable from 5 AM',
                    link: 'https://assets.calmac.co.uk/media/ac5flzfl/updated-barra-eriskay-200426.pdf',
                    linkText: 'Summer timetable',
                },
            ],
        },
        {
            id: 'food',
            title: 'food',
            items: [
                { name: 'Am Politician', meta: 'pub', notes: 'Named after the SS Politician shipwreck. Homecooked meals, local seafood, live music at weekends. First food stop off the Eriskay ferry.', link: 'https://www.facebook.com/ampolitician1/', linkText: 'Facebook page' },
                { name: 'Polochar Inn', meta: 'restaurant', notes: 'Historic inn at the southern tip of South Uist. Fresh seafood restaurant, menu changes with the seasons.', link: 'https://polocharinn.com/', linkText: 'Menu & booking' },
                { name: 'Kilbride Cafe', meta: 'cafe', notes: 'Outdoor deck with views over the Sound of Barra. Homemade soup, pancakes, sandwiches. Open 8:30am, last food 3pm.', link: 'https://www.kilbridecampsite.com/', linkText: 'Website' },
                { name: 'Borrodale Hotel', meta: 'pub / restaurant', notes: 'Daliburgh. Local lamb, Highland cattle, shellfish and daily catches. Good whisky selection in the lounge bar.', link: 'https://www.facebook.com/Borrodalehotel/', linkText: 'Facebook page' },
                { name: 'Orasay Inn', meta: 'restaurant', notes: 'Lochcarnan, north end of South Uist. Known across the Hebrides for generous fresh fish dishes. Catch of the Day board.', link: 'https://www.orasayinn.co.uk/restaurant', linkText: 'Menu & booking' },
                { name: 'Salar Smokehouse', meta: 'deli / shop', notes: 'Award-winning smoked salmon since 1987. Tastings, deli counter, takeaway drinks. Mon\u2013Fri 9\u20135, Sat 10\u20134.', link: 'https://www.salarsmokehouse.co.uk/', linkText: 'Website' },
                { name: 'Co-op Daliburgh', meta: 'shop', notes: 'Main grocery shop on South Uist \u2014 stock up here' },
            ],
        },
        {
            id: 'campsites',
            title: 'campsites',
            items: [
                { name: 'Howmore (Gatliff Hostel & Camping)', notes: 'Thatched croft beside 13th-century ruins. Kitchen, common room with coal stove, hot showers. No booking \u2014 first come first served, no one turned away. \u00a312/night. Very popular with Hebridean Way cyclists.', link: 'https://gatliff.org.uk/?page_id=10', linkText: 'Website' },
                { name: 'Kilbride Campsite', notes: 'South coast overlooking Sound of Barra. 30+ pitches with electric hook-ups, showers, launderette, kitchen, free WiFi. On-site cafe. White sand beach adjacent.', link: 'https://www.kilbridecampsite.com/', linkText: 'Website' },
                { name: 'Gleanndal Campsite', notes: 'Near Lochboisdale. Small and peaceful, views across the loch. Showers, access to hostel kitchen. Daliburgh nearby for shops.', link: 'https://campingscotland.com/campsites/gleanndal-campsite-south-uist/', linkText: 'Details' },
            ],
        },
    ],
};
