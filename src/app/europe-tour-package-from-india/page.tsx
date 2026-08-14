import type { Metadata } from 'next';
import PackagePageLayout, { type PackageData } from '@/components/PackagePageLayout';
import { getPackagePrice } from '@/lib/packagePrices';

export const metadata: Metadata = {
  title: 'Europe Tour Package from India 2026 — 10 Nights Starting ₹1,24,999 | YlooTrips',
  description: 'Book Europe tour packages from India starting ₹1,24,999. Paris, Rome, Barcelona, Amsterdam, Prague — 10 nights / 11 days across Western Europe. Hotels, transfers & Schengen visa support included. Flights not included.',
  openGraph: {
    title: 'Europe Tour Package from India 2026 — 10 Nights Starting ₹1,24,999',
    description: 'Paris, Rome, Barcelona, Amsterdam, Prague — 10 nights covering the best of Western Europe.',
    url: 'https://www.ylootrips.com/europe-tour-package-from-india',
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80', width: 1200, height: 630, alt: 'Europe Eiffel Tower Paris tour from India' }],
  },
  alternates: { canonical: 'https://www.ylootrips.com/europe-tour-package-from-india' },
};

export default async function EuropePackagePage() {
  const prices = await getPackagePrice('europe-tour-package-from-india');

  const pkg: PackageData = {
    slug: 'europe-tour-package-from-india',
    canonicalUrl: 'https://www.ylootrips.com/europe-tour-package-from-india',
    metaTitle: 'Europe Tour Package from India 2026 — 10 Nights Starting ₹1,24,999 | YlooTrips',
    metaDescription: 'Paris, Rome, Barcelona, Amsterdam, Prague — 10 nights of European magic. Schengen visa assistance, flights, hotels, and transfers included.',
    ogImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80',

    heroImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&q=85',
    heroTitle: 'Europe Tour Package from India',
    heroSubtitle: 'Paris · Rome · Barcelona · Amsterdam · Prague — 11 Days of European Magic',
    tagline: 'A Dream Come True',

    duration: '10 Nights / 11 Days',
    groupSize: 'Couple, Family or Group',
    difficulty: 'Easy (city walking)',
    startLocation: 'Delhi/Mumbai → Paris (CDG)',

    priceINR: prices.priceINR,
    priceUSD: Math.round(prices.priceINR / 83),
    originalPriceINR: prices.originalPriceINR,
    depositPercent: 25,

    overview: [
      'Europe has been the dream destination for Indian travelers for decades — and for good reason. In 10 nights, you can experience the romance of Paris, the timeless grandeur of Rome, the vibrant street culture of Barcelona, the canal cities of Amsterdam, and the fairy-tale architecture of Prague. Our package covers all five.',
      'We handle the most stressful part — the Schengen visa. Our team prepares your documentation, books the VFS appointment, and guides you through the application. We\'ve helped over 2,000 Indian travelers get their Schengen visas.',
      'Best months: April–June (spring, flowers) and September–October (autumn, fewer crowds). July–August is peak season — beautiful but crowded and expensive. We recommend September–October for the best balance of weather, crowd, and price.',
    ],

    highlights: [
      'Paris — Eiffel Tower, Louvre, Notre-Dame, Seine river cruise',
      'Rome — Colosseum, Vatican, Trevi Fountain, Roman Forum',
      'Barcelona — Sagrada Família, Park Güell, La Rambla, Gothic Quarter',
      'Amsterdam — Canal cruise, Rijksmuseum, Anne Frank House, tulip markets',
      'Prague — Old Town Square, Charles Bridge, Prague Castle, Astronomical Clock',
      'Schengen visa documentation support included',
      'All inter-city transfers (Eurostar/Thalys trains or budget flights)',
    ],

    gallery: [
      { src: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80', alt: 'Paris Eiffel Tower night Europe tour', label: 'Paris' },
      { src: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80', alt: 'Rome Colosseum Italy Europe', label: 'Rome' },
      { src: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80', alt: 'Barcelona Sagrada Familia Spain', label: 'Barcelona' },
      { src: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80', alt: 'Amsterdam canal boat Netherlands', label: 'Amsterdam' },
      { src: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80', alt: 'Prague Old Town Charles Bridge', label: 'Prague' },
    ],

    itinerary: [
      { day: 1, title: 'Fly to Paris — City of Light Arrival', description: 'Overnight flight from Delhi/Mumbai to Paris Charles de Gaulle Airport. Take RER B train to city centre. Check in to hotel in central Paris (near Opéra or Marais). Afternoon rest and jet-lag recovery. Evening: Champs-Élysées stroll — the most famous avenue in the world. Arc de Triomphe (climb for panoramic city views). Dinner at a brasserie.', meals: 'Dinner', hotel: '3★ Hotel, Central Paris', activities: ['Arrive Paris CDG', 'Champs-Élysées walk', 'Arc de Triomphe', 'First Paris dinner'] },
      { day: 2, title: 'Paris — Eiffel Tower, Louvre, Seine Cruise', description: 'Full day Paris exploration. Morning: Eiffel Tower (book tickets in advance — queues are brutal without them). Second floor or summit depending on preference. Afternoon: The Louvre — the world\'s largest art museum. Don\'t try to see everything — head straight for the Mona Lisa, Venus de Milo, and Winged Victory. Evening: Seine river cruise by Bateaux Mouches — 75 minutes, the Eiffel Tower sparkles on the hour after dark.', meals: 'Breakfast', hotel: '3★ Hotel, Central Paris', activities: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame (exterior, reconstruction)', 'Seine River cruise'] },
      { day: 3, title: 'Paris → Rome — The Eternal City', description: 'Morning flight to Rome Fiumicino (2.5 hours). Check in to hotel near the Colosseum or Trevi. Afternoon: Trevi Fountain (throw a coin — legend says you\'ll return) and Spanish Steps. The Pantheon (free entry) — the best preserved ancient Roman building, built in 125 CE. Evening: aperitivo hour in a piazza. Rome\'s evening atmosphere is magical.', meals: 'Breakfast, Dinner', hotel: '3★ Hotel, Rome', activities: ['Fly Paris → Rome', 'Trevi Fountain', 'Spanish Steps', 'Pantheon'] },
      { day: 4, title: 'Rome — Colosseum, Vatican & Roman Forum', description: 'The biggest sightseeing day. Colosseum (book skip-the-line tickets well ahead — best way is early morning). Roman Forum and Palatine Hill are included in the same ticket — allow 3 hours. Afternoon: Vatican City — St. Peter\'s Basilica (climb the dome for views), Vatican Museums, Sistine Chapel (Michelangelo\'s ceiling). The Vatican is technically a separate country.', meals: 'Breakfast', hotel: '3★ Hotel, Rome', activities: ['Colosseum', 'Roman Forum & Palatine Hill', 'Vatican City & St. Peter\'s', 'Sistine Chapel'] },
      { day: 5, title: 'Rome → Barcelona — Vibrant Catalan Capital', description: 'Morning flight to Barcelona El Prat (2 hours). Check in to hotel in Eixample or Gothic Quarter. Afternoon: La Rambla — the famous pedestrian boulevard. Gothic Quarter — ancient Roman walls and medieval streets. Barceloneta Beach for a Mediterranean dip. Evening: tapas and sangria in El Born neighbourhood — the best food area in Barcelona.', meals: 'Breakfast', hotel: '3★ Hotel, Barcelona', activities: ['Fly Rome → Barcelona', 'La Rambla', 'Gothic Quarter', 'Barceloneta Beach'] },
      { day: 6, title: 'Barcelona — Gaudí Day', description: 'Barcelona is synonymous with Antoni Gaudí. Sagrada Família (pre-book for specific entry time — the most visited building in Spain, still under construction since 1882). Park Güell (mosaic terraces, city views, book timed entry). Palau Güell (Gaudí\'s early masterpiece near La Rambla). Casa Batlló or Casa Milà (La Pedrera) exteriors. Evening: Flamenco show (optional) or live music in El Born.', meals: 'Breakfast', hotel: '3★ Hotel, Barcelona', activities: ['Sagrada Família', 'Park Güell', 'Palau Güell', 'Casa Batlló/Casa Milà'] },
      { day: 7, title: 'Barcelona → Amsterdam — Canal City', description: 'Morning flight to Amsterdam Schiphol (2 hours). Check in. Amsterdam is compact and best explored on foot or bicycle. Afternoon: canal walk along the Herengracht and Prinsengracht. Cheese and flower markets. Heineken Experience (optional). Rijksmuseum (Rembrandt\'s Night Watch) or Van Gogh Museum — choose one, both are world-class. Evening: canal-side dinner.', meals: 'Breakfast', hotel: '3★ Hotel, Amsterdam', activities: ['Fly Barcelona → Amsterdam', 'Canal walk', 'Rijksmuseum or Van Gogh Museum', 'Dutch cheese market'] },
      { day: 8, title: 'Amsterdam — Anne Frank House & Day Trip', description: 'Morning: Anne Frank House (pre-book months in advance — the most in-demand museum in Europe). The hiding place where Anne Frank wrote her diary, preserved exactly as it was. Afternoon: day trip to Keukenhof Gardens (March–May, world\'s most stunning tulip park) or Zaanse Schans (traditional windmills, 20 minutes from Amsterdam). Evening: Amsterdam by water — evening canal boat tour.', meals: 'Breakfast', hotel: '3★ Hotel, Amsterdam', activities: ['Anne Frank House', 'Keukenhof Gardens / Zaanse Schans', 'Evening canal boat tour'] },
      { day: 9, title: 'Amsterdam → Prague — Fairy Tale City', description: 'Train or flight to Prague (4 hours by train or 1.5h by flight). Prague is the most beautiful medieval city in Central Europe — an impossibly preserved old town that feels like walking into a fairy tale. Check in. Afternoon: Old Town Square — the Astronomical Clock (Orloj, 1410) performs on the hour. Jan Hus Memorial. St. Nicholas Church. Prague is also famous for very affordable prices compared to Western Europe.', meals: 'Breakfast, Dinner', hotel: '3★ Hotel, Prague', activities: ['Train/fly Amsterdam → Prague', 'Old Town Square', 'Astronomical Clock', 'St. Nicholas Church'] },
      { day: 10, title: 'Prague — Castle, Charles Bridge & Jewish Quarter', description: 'Prague Castle — the largest ancient castle complex in the world, with St. Vitus Cathedral. Charles Bridge (1357) with 30 Baroque statues — cross it at dawn for the best photos without crowds. Jewish Quarter (Josefov) — one of Europe\'s most preserved medieval Jewish neighbourhoods. Afternoon: boat ride on the Vltava River. Evening: traditional Czech dinner (svíčková, goulash, trdelník).', meals: 'Breakfast', hotel: '3★ Hotel, Prague', activities: ['Prague Castle & St. Vitus Cathedral', 'Charles Bridge at dawn', 'Jewish Quarter (Josefov)', 'Vltava River boat ride'] },
      { day: 11, title: 'Prague — Last Morning & Return to India', description: 'Final morning in Prague. Wenceslas Square and Narodni Trida (November 17 memorial). Shopping — Bohemian crystal, marionette puppets, and Becherovka are famous Czech exports. Transfer to Václav Havel Airport. Return flight to India via Frankfurt/Amsterdam.', meals: 'Breakfast', hotel: 'Departure', activities: ['Wenceslas Square', 'Prague souvenirs', 'Return flight to India'] },
    ],

    priceNote: 'Land only · Flights not included',

    includes: [
      'All inter-city travel within Europe (trains recommended)',
      '10 nights in 3-star hotels (city centre locations)',
      'Daily breakfast throughout',
      'Seine River cruise, Paris',
      'Airport and train station transfers throughout',
      'Schengen visa documentation support (not the fee)',
      'Dedicated YlooTrips Europe coordinator',
      '24/7 WhatsApp emergency support',
    ],

    excludes: [
      'International flights India ↔ Europe (book separately)',
      'Schengen visa fee (EUR 80 / ~₹7,700)',
      'Louvre, Colosseum, Sagrada Família, Anne Frank House entry tickets',
      'Travel insurance with minimum EUR 30,000 cover (Schengen mandatory)',
      'Meals except breakfast',
      'City transport passes (day passes recommended: ~EUR 8–12/day)',
    ],

    reviews: [
      { name: 'Suresh & Kamala Pillai', country: 'Chennai, India', flag: '🇮🇳', rating: 5, text: 'First time in Europe — it was overwhelming and wonderful. YlooTrips helped with our Schengen visa and everything was organised. Paris was beyond our dreams. Prague was the surprise favourite.', date: 'September 2025', trip: 'Europe 10N Package' },
      { name: 'Rohit & Priya Jain', country: 'Delhi, India', flag: '🇮🇳', rating: 4, text: 'Great itinerary — 5 cities in 11 days sounds intense but was very manageable. Pre-booked tickets for Eiffel, Colosseum, and Sagrada — strongly recommend doing that. Excellent value for a first Europe trip.', date: 'May 2026', trip: 'Europe First Timer Package' },
    ],

    avgRating: 4.8,
    reviewCount: 1230,

    related: [
      { title: 'Vietnam Tour Package — 6 Nights', href: '/vietnam-tour-package', priceINR: 38999, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80' },
      { title: 'Dubai Tour Package', href: '/dubai-tour-package-from-delhi', priceINR: 34999, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80' },
      { title: 'Singapore Tour Package', href: '/singapore-tour-package', priceINR: 42999, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80' },
    ],
    whatsappMsg: "Hi! I'm interested in the Europe Tour Package (10 nights ₹1,24,999). Please share availability.",
    bookingHref: '/contact?package=europe-tour-package-from-india',

    faqs: [
      { question: 'Do I need a Schengen visa for Europe?', answer: 'Yes — Indian passport holders need a Schengen visa. YlooTrips provides full documentation guidance and prepares your visa file. The fee is EUR 80 (~₹7,700) paid to the embassy. Processing takes 15 days — apply at least 6 weeks before travel.' },
      { question: 'What is the best time to visit Europe from India?', answer: 'April–June (spring) and September–October (autumn) offer the best weather and manageable crowds. July–August is peak — very crowded at major attractions (Eiffel, Colosseum, Sagrada) and expensive. September is ideal.' },
      { question: 'Is Europe safe for Indian tourists?', answer: 'Europe is very safe for tourists. The destinations on this itinerary (Paris, Rome, Barcelona, Amsterdam, Prague) are all heavily touristed — pickpocketing near major attractions is the main risk. Use money belts and avoid flashing expensive items in crowded areas.' },
      { question: 'Can I extend to Switzerland or Greece?', answer: 'Yes — we offer extended Europe packages that include Switzerland (Zurich, Interlaken, Jungfrau) and Greece (Athens, Santorini, Mykonos). WhatsApp us for a custom quote.' },
    ],

    mustVisitPlaces: [
      { name: 'Eiffel Tower & Seine River Cruise — Paris', description: 'The world\'s most visited monument is non-negotiable. Book the summit elevator 60 days ahead. The 1-hour Seine cruise at night, with the Tower sparkling every hour on the hour, is Paris\'s finest experience.', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80', type: 'landmark', tip: 'Book Eiffel Tower summit tickets online at least 60 days ahead — walk-up tickets sell out. Evening visits (6–10pm) have shorter queues and more atmosphere.' },
      { name: 'Colosseum & Roman Forum — Rome', description: 'The 2,000-year-old amphitheatre where gladiators fought to 50,000 spectators. The Roman Forum and Palatine Hill adjacent are included in the same ticket — 3 sites, 4 hours minimum.', image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80', type: 'landmark', tip: 'Book Colosseum tickets at coopculture.it 2 months ahead. Go first thing (8:30am) or late afternoon (4pm) to avoid peak crowds. The underground Arena floor experience is worth the premium ticket.' },
      { name: 'Sagrada Familia — Barcelona', description: 'Gaudí\'s unfinished masterpiece — a modernist basilica under construction since 1882 and scheduled for completion around 2026. The interior is one of Europe\'s most extraordinary spaces, with natural light filtered through stained glass into a forest of stone columns.', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80', type: 'landmark', tip: 'Book tower access tickets 3 months ahead — they sell out weeks in advance. Morning light from the east towers is warmer; afternoon from the west.' },
    ],
    packageActivities: [
      { name: 'Amsterdam Canal Boat Tour', description: 'A 1-hour glass-boat canal cruise through Amsterdam\'s UNESCO-listed canal ring — 165 canals, 1,281 bridges, and 17th-century merchant townhouses reflected in the still water.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', duration: '1 hour', cost: 'Included in package' },
      { name: 'Prague Old Town Walking Tour', description: 'Walk through Central Europe\'s best-preserved medieval city — the astronomical clock, Charles Bridge at dawn, and the labyrinthine Old Town lanes untouched since the 14th century.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', duration: '3 hours', cost: 'Included in package' },
    ],
    travelTips: [
      'Schengen visa for Indians takes 15 working days. Apply 6 weeks before travel. YlooTrips provides full documentation support.',
      'September–October is ideal for Europe — pleasant weather, 30% cheaper hotels and flights vs July–August peak.',
      'Get a 7-day Eurail pass if doing multiple countries — it covers trains across all Schengen countries. Book seat reservations in advance for high-speed trains.',
      'Carry EUR 100 cash as backup — many smaller European businesses only accept contactless/chip cards. American-style magnetic strip cards often don\'t work.',
    ],
  };

  return <PackagePageLayout pkg={pkg} />;
}
