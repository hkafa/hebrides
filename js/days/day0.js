/**
 * Day 0 — Oban to Castlebay, Barra
 *
 * Edit this file to add/remove/reorder sections.
 * Each section in the `sections` array is rendered in order.
 *
 * Section format:
 *   {
 *       id: 'unique-id',           // used for CSS styling: 'ferry', 'food', 'campsites', or any custom id
 *       title: 'section.name()',   // displayed as "> section.name()" header
 *       items: [                   // array of cards
 *           {
 *               name: 'Card title',
 *               meta: 'subtitle',       // optional — small uppercase label
 *               notes: 'Description',   // optional — body text
 *               link: 'https://...',    // optional — makes a clickable link
 *               linkText: 'Click me',   // optional — label for the link (default: 'Details')
 *           }
 *       ]
 *   }
 *
 * plan: free text describing the plan for the day. Rendered above the sections.
 *   Example: 'Ferry arrives at 8:15, cycle to campsite by noon.'
 *
 * mapLink: any Google Maps link — rendered as a clickable "Open in Google Maps" button.
 *   Example: 'https://maps.app.goo.gl/abc123'
 */

export default {
    title: 'Oban to Castlebay, Barra',
    subtitle: 'Ferry crossing + optional cycle to Vatersay',
    from: { name: 'Oban', lat: 56.4120, lon: -5.4714 },
    to: { name: 'Castlebay, Barra', lat: 56.9546, lon: -7.4884 },
    distanceKm: 10,
    distanceNote: '~10 km from Castlebay to Vatersay and back (optional)',
    gpxFile: null,
    plan: 'Ferry arrives to Castlebay at 8:15 and here we have an option to either camp in Barra or cycle 6 miles south to Vatersay for the official start point of the route.',
    mapLink: 'https://maps.app.goo.gl/2tAd9QogC1S9P5VL8',

    sections: [
        {
            id: 'ferry',
            title: 'ferry.info()',
            items: [
                {
                    name: 'Oban \u2192 Castlebay',
                    meta: 'CalMac',
                    notes: 'Long crossing (~5 hours). Book bikes in advance.',
                    link: null,
                    linkText: 'Book tickets',
                },
            ],
        },
        {
            id: 'food',
            title: 'food.options()',
            items: [
                { name: 'Castlebay Bar', meta: 'pub', notes: 'Pub meals near the ferry terminal' },
                { name: 'The Deck', meta: 'cafe', notes: 'Cafe with views of Kisimul Castle' },
                { name: 'Co-op Castlebay', meta: 'shop', notes: 'Stock up \u2014 limited shops further north' },
            ],
        },
        {
            id: 'campsites',
            title: 'campsites.list()',
            items: [
                { name: 'Borve Campsite (placeholder)', notes: 'Near beach, basic facilities' },
                { name: 'Wild camp Vatersay Beach', notes: 'Official start of the Hebridean Way \u2014 stunning beach camping' },
            ],
        },
    ],
};
