import type { Metadata } from 'next';
import PackagePageLayout, { type PackageData } from '@/components/PackagePageLayout';
import { getPackagePrice } from '@/lib/packagePrices';

export const metadata: Metadata = {
  title: 'Georgia & Azerbaijan Tour Package from India 2026 — 6 Nights Starting ₹54,999 | YlooTrips',
  description: 'Book Georgia & Azerbaijan tour packages from India starting ₹54,999. Tbilisi, Kazbegi, Baku, Gabala. 6 nights / 7 days — Caucasus mountains, ancient churches, Baku flame towers.',
  openGraph: {
    title: 'Georgia & Azerbaijan Tour Package from India 2026 — 6 Nights Starting ₹54,999',
    description: 'Tbilisi, Kazbegi, Baku, Gabala — 6 nights across the Caucasus mountains.',
    url: 'https://www.ylootrips.com/georgia-azerbaijan-tour-package',
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&q=80', width: 1200, height: 630, alt: 'Tbilisi old town Georgia Caucasus' }],
  },
  alternates: { canonical: 'https://www.ylootrips.com/georgia-azerbaijan-tour-package' },
};

export default async function GeorgiaAzerbaijanPackagePage() {
  const prices = await getPackagePrice('georgia-azerbaijan-tour-package');

  const pkg: PackageData = {
    slug: 'georgia-azerbaijan-tour-package',
    canonicalUrl: 'https://www.ylootrips.com/georgia-azerbaijan-tour-package',
    metaTitle: 'Georgia & Azerbaijan Tour Package from India 2026 — 6 Nights Starting ₹54,999 | YlooTrips',
    metaDescription: 'Tbilisi, Kazbegi Mountains, Baku Old City, Flame Towers, Gabala — 6 nights across the stunning Caucasus region.',
    ogImage: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&q=80',

    heroImage: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1600&q=85',
    heroTitle: 'Georgia & Azerbaijan Tour Package',
    heroSubtitle: 'Tbilisi · Kazbegi · Baku · Gabala — 7 Days Across the Caucasus',
    tagline: 'Budget Europe That Will Blow Your Mind',

    duration: '6 Nights / 7 Days',
    groupSize: 'Solo, Couple, Family or Group',
    difficulty: 'Easy to Moderate',
    startLocation: 'Delhi/Mumbai → Tbilisi (TBS)',

    priceINR: prices.priceINR,
    priceUSD: Math.round(prices.priceINR / 83),
    originalPriceINR: prices.originalPriceINR,
    depositPercent: 25,

    overview: [
      'Georgia and Azerbaijan are the Caucasus region\'s two most exciting destinations — and together they offer an extraordinary combination of ancient culture, dramatic mountain scenery, vibrant cities, and extraordinary hospitality. They are also the best-value "Europe-adjacent" destinations for Indian travelers.',
      'Georgia is one of the world\'s oldest wine-producing countries (8,000 years of winemaking), home to some of the Caucasus\' most dramatic mountain scenery (Kazbegi), and with one of the most charming old town capitals in Europe (Tbilisi). Indians get visa-free access for up to 365 days — making it the easiest European destination for Indian passport holders.',
      'Azerbaijan is a fascinating contrast — a modern, oil-rich nation where medieval Islamic architecture meets futuristic Zaha Hadid buildings. Baku\'s flame towers, the walled Old City (UNESCO), and the mountain resort of Gabala are highlights. Best months to visit: April–June and September–November.',
    ],

    highlights: [
      'Old Tbilisi — sulphur baths, carved balconies, cable car to Narikala Fortress',
      'Kazbegi — Gergeti Trinity Church at 2,170 m with Mt. Kazbek (5,047 m) behind it',
      'Mtskheta — Georgia\'s ancient capital, UNESCO World Heritage (Jvari Monastery)',
      'Baku Old City (Icheri Sheher) — UNESCO walled medieval city, Maiden Tower',
      'Baku Flame Towers — three futuristic skyscrapers lit as flame at night',
      'Gabala — Azerbaijani mountain resort, cable car, waterfalls',
      'Georgian wine tasting in traditional qvevri (clay pots)',
      'Heydar Aliyev Center — Zaha Hadid\'s masterpiece architecture in Baku',
    ],

    gallery: [
      { src: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80', alt: 'Tbilisi old town Georgia Caucasus', label: 'Old Tbilisi' },
      { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Kazbegi Gergeti Trinity Church Georgia mountains Caucasus', label: 'Kazbegi' },
      { src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80', alt: 'Baku Flame Towers Azerbaijan night skyline', label: 'Baku' },
      { src: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80', alt: 'Baku Old City Icheri Sheher medieval walls Azerbaijan', label: 'Baku Old City' },
      { src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', alt: 'Georgian khinkali dumplings khachapuri food', label: 'Georgian Food' },
    ],

    itinerary: [
      {
        day: 1,
        title: 'Arrive Tbilisi — Old Town & Sulphur Baths',
        description: 'Fly to Tbilisi Shota Rustaveli International Airport. Transfer to hotel in the heart of Old Tbilisi. Afternoon: explore the old town on foot — carved wooden balconies overhanging narrow cobblestone lanes, ancient Orthodox churches and Persian-style caravanserais side by side. The famous Abanotubani sulphur bath district — Tbilisi\'s signature attraction, natural hot sulphur springs that have been used for 1,500 years (Orbeliani Baths have a stunning Persian-Moorish facade). Evening: wine bar in the old town — Georgia is one of the world\'s oldest wine cultures, and natural orange wine is the local speciality.',
        meals: 'Dinner',
        hotel: '3★ Hotel, Old Tbilisi',
        activities: ['Arrive Tbilisi', 'Old Town walk', 'Abanotubani sulphur baths', 'Georgian wine tasting'],
      },
      {
        day: 2,
        title: 'Tbilisi — Narikala, Cable Car & Mtskheta',
        description: 'Morning: cable car to Narikala Fortress — the 4th-century fortress overlooking Tbilisi with panoramic views of the old city, Mtkvari River, and the surrounding hills. Walk down through the old town. Visit the magnificent Metekhi Church perched on a cliff above the river. Afternoon: drive 20 km to Mtskheta — Georgia\'s ancient capital (founded 5th century BCE), a UNESCO World Heritage Site. Svetitskhoveli Cathedral (1010 CE) — Georgia\'s most important church, believed to contain Christ\'s robe. Jvari Monastery (6th century) on a hilltop overlooking the confluence of the Mtkvari and Aragvi rivers — the scene immortalised in Lermontov\'s poem. Return to Tbilisi.',
        meals: 'Breakfast',
        hotel: '3★ Hotel, Tbilisi',
        activities: ['Narikala Fortress cable car', 'Metekhi Church', 'Mtskheta UNESCO', 'Svetitskhoveli Cathedral', 'Jvari Monastery'],
      },
      {
        day: 3,
        title: 'Kazbegi — Gergeti Trinity Church & Mt. Kazbek',
        description: 'Early morning drive from Tbilisi to Kazbegi (150 km, 3.5 hours) along the Georgian Military Highway — one of the most scenic drives in the Caucasus, passing through the Dariali Gorge and the Gudauri ski resort area. Kazbegi (Stepantsminda) sits at 1,750 m in the Greater Caucasus mountains. The iconic Gergeti Trinity Church (14th century) sits on a hilltop at 2,170 m with Mt. Kazbek (5,047 m) rising dramatically behind it — one of the most photographed scenes in the Caucasus. 4x4 drive up to the church. Explore the Kazbegi National Park. Return to Tbilisi in the evening.',
        meals: 'Breakfast',
        hotel: '3★ Hotel, Tbilisi',
        activities: ['Georgian Military Highway drive', 'Gergeti Trinity Church', 'Mt. Kazbek views', 'Kazbegi National Park'],
      },
      {
        day: 4,
        title: 'Tbilisi → Fly to Baku — Old City & Flame Towers',
        description: 'Morning: any remaining Tbilisi sightseeing — Rustaveli Avenue (Georgia\'s most elegant boulevard), the Georgian National Museum, or the Dry Bridge flea market (the best souvenir hunting in the Caucasus). Early afternoon: short flight or drive to Baku, Azerbaijan (1.5 hours). Check into hotel. Evening: the magic hour — Baku\'s Flame Towers, three futuristic 190-metre skyscrapers clad in LED screens displaying animated flames, are best seen at dusk from the seafront boulevard. Walk along the Baku Bulvar — a 3.5 km Caspian Sea promenade. Dinner in Baku\'s old city.',
        meals: 'Breakfast, Dinner',
        hotel: '3★ Hotel, Baku',
        activities: ['Tbilisi morning sightseeing', 'Fly/drive to Baku', 'Flame Towers at dusk', 'Baku Bulvar Caspian promenade'],
      },
      {
        day: 5,
        title: 'Baku — Old City, Heydar Aliyev Center & Mud Volcanoes',
        description: 'Morning: Baku\'s Icheri Sheher (Old City) — a UNESCO-listed medieval walled city within a modern capital. The Maiden Tower (Giz Galasi, 12th century) — Baku\'s most iconic landmark, an 8-storey cylindrical fortress on the Caspian shore. Palace of the Shirvanshahs (15th century) — a stunning example of medieval Azerbaijani architecture. Afternoon: Heydar Aliyev Cultural Center — Zaha Hadid\'s undulating white masterpiece, one of the most beautiful buildings of the 21st century. Optional: Gobustan Mud Volcanoes — 40 km from Baku, the world\'s densest concentration of mud volcanoes bubbling cold mud (a surreal lunar landscape). Gobustan Rock Art UNESCO site — 40,000-year-old petroglyphs.',
        meals: 'Breakfast',
        hotel: '3★ Hotel, Baku',
        activities: ['Icheri Sheher Old City', 'Maiden Tower', 'Heydar Aliyev Center', 'Gobustan Mud Volcanoes', 'Gobustan Rock Art UNESCO'],
      },
      {
        day: 6,
        title: 'Gabala — Mountain Resort & Cable Car',
        description: 'Day trip to Gabala (220 km from Baku, 3 hours) — Azerbaijan\'s premier mountain resort town set in the foothills of the Greater Caucasus. Tufandag Mountain Resort cable car — a spectacular gondola ride through forested slopes with panoramic Caucasus views. Nohur Lake — a serene alpine lake in a forest setting. Gabala Shooting Club (optional — clay pigeon shooting). Ilisu waterfall and Vandam gorge — beautiful natural scenery. Return to Baku in the evening for a farewell dinner of Azerbaijani cuisine — plov (fragrant saffron rice with lamb), dolma, kebabs, and pomegranate molasses.',
        meals: 'Breakfast, Dinner',
        hotel: '3★ Hotel, Baku',
        activities: ['Gabala Tufandag cable car', 'Nohur Lake', 'Ilisu waterfall', 'Farewell Azerbaijani dinner'],
      },
      {
        day: 7,
        title: 'Baku — Departure',
        description: 'Leisure morning in Baku. Optional: Ateshgah Fire Temple (18th century, built around a naturally burning gas vent worshipped by Zoroastrians and Hindu pilgrims) and Yanardag (burning hillside — a natural gas fire that has been burning continuously for centuries). Transfer to Heydar Aliyev International Airport for your return flight to India.',
        meals: 'Breakfast',
        hotel: 'Departure',
        activities: ['Ateshgah Fire Temple (optional)', 'Yanardag burning hillside (optional)', 'Transfer to Baku airport', 'Return flight to India'],
      },
    ],

    priceNote: 'Land only · Flights not included',

    includes: [
      'Tbilisi → Baku flight or transfer',
      '6 nights accommodation: Tbilisi (3N), Baku (3N)',
      'Daily breakfast throughout',
      'Kazbegi day trip by 4x4 vehicle',
      'Mtskheta UNESCO day trip',
      'Gabala mountain resort day trip',
      'All airport and hotel transfers',
      'Dedicated YlooTrips Caucasus coordinator',
    ],

    excludes: [
      'International flights India ↔ Tbilisi (book separately)',
      'Azerbaijan e-visa (approx ₹2,500 for Indians)',
      'Georgia visa-free for Indians (no cost)',
      'Lunch and dinner except where specified',
      'Sulphur bath entry fees (₹800–2,500)',
      'Travel insurance (recommended)',
    ],

    reviews: [
      { name: 'Sameer & Neha Joshi', country: 'Pune, India', flag: '🇮🇳', rating: 5, text: 'Georgia was a revelation — we had zero expectations and were completely blown away. Tbilisi\'s old town is magical. The drive to Kazbegi is one of the most beautiful things we\'ve ever experienced. And the wine! YlooTrips planned every detail perfectly.', date: 'May 2026', trip: 'Georgia & Azerbaijan 6N Package' },
      { name: 'Ananya Krishnan', country: 'Chennai, India', flag: '🇮🇳', rating: 5, text: 'Baku surprised me the most — it\'s a stunning, modern, safe city with incredible food and architecture. The Flame Towers at night are spectacular. Georgia is visa-free for Indians which is a huge bonus.', date: 'October 2025', trip: 'Georgia & Azerbaijan Tour' },
    ],

    avgRating: 4.7,
    reviewCount: 156,

    related: [
      { title: 'Dubai Tour Package — 5 Nights', href: '/dubai-tour-package-from-delhi', priceINR: 36499, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80' },
      { title: 'Europe Tour Package — 10 Nights', href: '/europe-tour-package-from-india', priceINR: 124999, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80' },
      { title: 'Nepal Tour Package — 5 Nights', href: '/nepal-tour-package', priceINR: 18999, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    ],
    whatsappMsg: "Hi! I'm interested in the Georgia & Azerbaijan Tour Package (6 nights ₹54,999). Please share availability.",
    bookingHref: '/contact?package=georgia-azerbaijan-tour-package',

    faqs: [
      { question: 'Do Indians need a visa for Georgia?', answer: 'No! Georgia offers visa-free access to Indian nationals for up to 365 days. You only need a valid Indian passport. This makes Georgia the easiest European-style destination for Indian travelers.' },
      { question: 'Do Indians need a visa for Azerbaijan?', answer: 'Yes — Indians require an e-visa for Azerbaijan (ASAN Visa). Apply online at evisa.gov.az. The fee is approximately USD 30 (~₹2,500). Processing takes 3 business days. We provide complete documentation support.' },
      { question: 'What currency is used in Georgia and Azerbaijan?', answer: 'Georgia uses the Georgian Lari (GEL). Azerbaijan uses the Azerbaijani Manat (AZN). Both countries widely accept USD. Indian Rupees are not accepted — exchange USD or Euros locally. ATMs are widely available in both Tbilisi and Baku.' },
      { question: 'Is this a good trip for vegetarians?', answer: 'Georgia is excellent for vegetarians — khachapuri (cheese bread), lobiani (bean bread), pkhali (walnut-herb appetizers), and Adjarian khachapuri are all vegetarian. Azerbaijan has good vegetarian options too (dolma, gutab flatbreads with herbs). Both cuisines are very Indian-palette friendly.' },
    ],

    mustVisitPlaces: [
      { name: 'Tbilisi Old Town & Narikala Fortress', description: 'Georgia\'s capital is one of Europe\'s most atmospheric cities — sulfur bath houses, twisted wrought-iron balconies, Orthodox churches beside Persian mosques, and the 5th-century Narikala Fortress above.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', type: 'landmark', tip: 'Take the cable car up to Narikala (₹100) at sunset for the best view over the old city. The sulfur bath district (Abanotubani) has baths from ₹300 — a must.' },
      { name: 'Kazbegi (Stepantsminda) — Gergeti Trinity Church', description: 'A 14th-century church perched on a 2,170m cliff above the village of Kazbegi, with Mount Kazbek (5,047m) as the backdrop. One of the most dramatic church locations on earth.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', type: 'landmark', tip: 'Hike up rather than taking a 4WD — the 2.5-hour ascent through wildflower meadows is far more rewarding. Start at 7am to arrive before clouds.' },
      { name: 'Baku Old City — Icheri Sheher', description: 'Azerbaijan\'s UNESCO World Heritage medieval inner city — the 12th-century Maiden Tower, Palace of the Shirvanshahs, and a labyrinth of caravanserai lanes. The contrast with the modern flame towers visible above the city walls is remarkable.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', type: 'culture', tip: 'Walk to the Flame Towers Viewpoint on Baku Boulevard at night — the towers are lit as moving LED flames and reflect off the Caspian Sea promenade.' },
    ],
    packageActivities: [
      { name: 'Georgia Wine Tasting — Kakheti Valley', description: 'The birthplace of wine (8,000 years of winemaking). Taste amber (skin-contact) Rkatsiteli and Saperavi reds at a family winery in the Alazani valley — the world\'s oldest wine tradition explained by the winemaker himself.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', duration: '3 hours', cost: '₹1,500–2,500' },
      { name: 'Baku Caspian Sea Sunset Cruise', description: 'A 1-hour cruise on the Caspian — the world\'s largest lake — with views of Baku\'s flame towers, Oil Rocks (Soviet offshore oil platform settlement), and the vast flat Caspian horizon.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', duration: '1 hour', cost: '₹800–1,500' },
    ],
    travelTips: [
      'Georgia: No visa for Indians (visa-free for 365 days). Azerbaijan: e-visa at evisa.gov.az (USD 30, 3 business days).',
      'Georgian cuisine is one of the world\'s most underrated. Try khinkali (soup dumplings), mtsvadi (skewered meat), and churchkhela (walnut-grape candy) from street stalls.',
      'Both countries are extremely affordable — a full meal costs ₹300–600 in Tbilisi, and taxis are very cheap (₹50–150 for city journeys).',
      'Currency: Georgia (GEL) and Azerbaijan (AZN) — exchange USD at local banks or moneychangers, not at airports.',
    ],
  };

  return <PackagePageLayout pkg={pkg} />;
}
