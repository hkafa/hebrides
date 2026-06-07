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
            title: 'ferry',
            items: [
                {
                    name: 'Berneray \u2192 Leverburgh (Sound of Harris)',
                    meta: 'CalMac \u2014 ~1 hour',
                    notes: 'The practical route from North Uist to Harris. Multiple daily sailings. Then cycle 34 km from Leverburgh north to Tarbert along the A859 (hilly but scenic). No regular direct Lochmaddy\u2013Tarbert ferry.',
                    link: 'https://www.calmac.co.uk/en-gb/timetables/',
                    linkText: 'Timetables',
                },
            ],
        },
        {
            id: 'food',
            title: 'food',
            items: [
                { name: 'Hotel Hebrides', meta: 'restaurant / bar', notes: 'Pier Road, Tarbert. Pierhouse Restaurant serves modern Scottish cuisine with local seafood. Mote Lounge Bar has bar meals, takeaway pizza, extensive whisky selection, live music nights. Lunch Mon–Fri 12:00–14:30, dinner 17:30–20:00.', link: 'https://www.hotel-hebrides.com/eat-drink/', linkText: 'Menu & info' },
                { name: 'Harris Hotel', meta: 'restaurant / pub', notes: 'Family-owned for over 100 years. A la carte dining with fresh local seafood, lamb, venison. Adjacent Tigh Mo Sheanar pub serves pizza and craft beer — more casual option.', link: 'https://harrishotel.com/', linkText: 'Website' },
                { name: 'Isle of Harris Distillery Canteen', meta: 'cafe', notes: 'Small canteen inside the distillery in Tarbert. Soups, Hebridean scones, brownies, cheese boards, seafood plates in summer. Also offers gin/whisky tours.', link: 'https://www.harrisdistillery.com/', linkText: 'Website' },
                { name: 'Isle of Harris Brewery & Kitchen', meta: 'restaurant', notes: 'At the pier in Leverburgh (21 miles south of Tarbert). Fresh local seafood landed metres from the door, plus craft beer. Good lunch stop before cycling north.', link: 'https://www.anchoragerestaurant.co.uk/', linkText: 'Website' },
                { name: 'Harris Community Shop', meta: 'shop', notes: 'Local goods and essentials in Tarbert.', link: 'https://www.harriscommunityshop.co.uk/', linkText: 'Website' },
                { name: 'Co-op Tarbert', meta: 'shop', notes: 'Small convenience store for basics. For larger shops, Stornoway is 1 hour north.' },
            ],
        },
        {
            id: 'campsites',
            title: 'campsites',
            items: [
                { name: 'Horgabost Campsite', notes: 'Directly on the beach at Horgabost, west coast of Harris, opposite Taransay island. Toilets, coin-operated showers. No electric hookups. Small shop and summer burger van on site. Near Luskentyre Beach. ~15 miles from Tarbert.', link: 'http://horgabostcampsite.co.uk/', linkText: 'Website' },
                { name: 'Lickisto Blackhouse Camping', notes: 'Small site (11 pitches) on the rugged east coast, set in a wooded valley beside a sea loch. Tent pitches, yurts, bothy. Historic blackhouse with showers, cooking facilities, washing machine. Paddle boards available. ~10 miles from Tarbert.', link: 'https://lickistoblackhousecamping.co.uk/', linkText: 'Website' },
                { name: 'Backpackers Stop, Tarbert', notes: '22-bed hostel on Main Street, right by ferry terminal. Self-catering kitchen, lounge, 4 dorms. Free WiFi, breakfast included. Explicitly a "pit stop for those walking or cycling the islands."', link: 'https://www.backpackers-stop.co.uk/', linkText: 'Website' },
                { name: 'Rhenigidale Hostel (Gatliff)', notes: 'Simple 13-bed crofters\' hostel in a secluded bay on the east coast of Harris. Three shared bunk rooms. No booking — just turn up. Remote but stunning views over the Minch to Skye.', link: 'https://gatliff.org.uk/?page_id=11', linkText: 'Website' },
            ],
        },
    ],
};
