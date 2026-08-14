import type { Metadata } from 'next';
import PackagePageLayout, { type PackageData } from '@/components/PackagePageLayout';
import { getPackagePrice } from '@/lib/packagePrices';

export const metadata: Metadata = {
  title: 'Kenya Safari Package from India 2026 — 7 Nights Starting ₹2,24,999 | YlooTrips',
  description: 'Book Kenya safari packages from India starting ₹2,24,999. Masai Mara, Amboseli, Nairobi, Diani Beach. 7 nights / 8 days — Big Five game drives, Great Migration, and Kilimanjaro views.',
  openGraph: {
    title: 'Kenya Safari Package from India 2026 — 7 Nights Starting ₹2,24,999',
    description: 'Masai Mara, Amboseli, Nairobi, Diani Beach — 7 nights on an unforgettable African safari.',
    url: 'https://www.ylootrips.com/kenya-safari-package',
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80', width: 1200, height: 630, alt: 'Kenya Masai Mara safari lion giraffe' }],
  },
  alternates: { canonical: 'https://www.ylootrips.com/kenya-safari-package' },
};

export default async function KenyaSafariPackagePage() {
  const prices = await getPackagePrice('kenya-safari-package');

  const pkg: PackageData = {
    slug: 'kenya-safari-package',
    canonicalUrl: 'https://www.ylootrips.com/kenya-safari-package',
    metaTitle: 'Kenya Safari Package from India 2026 — 7 Nights Starting ₹2,24,999 | YlooTrips',
    metaDescription: 'Masai Mara Big Five game drives, Great Migration, Amboseli elephant herds with Kilimanjaro views, Nairobi, Diani Beach — 7 nights in wild Africa.',
    ogImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80',

    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=85',
    heroTitle: 'Kenya Safari Package',
    heroSubtitle: 'Masai Mara · Amboseli · Nairobi · Diani Beach — 8 Days of Wild Africa',
    tagline: 'The Greatest Wildlife Spectacle on Earth',

    duration: '7 Nights / 8 Days',
    groupSize: 'Couple, Family or Small Group',
    difficulty: 'Easy',
    startLocation: 'Delhi/Mumbai → Nairobi (NBO)',

    priceINR: prices.priceINR,
    priceUSD: Math.round(prices.priceINR / 83),
    originalPriceINR: prices.originalPriceINR,
    depositPercent: 25,

    overview: [
      'Kenya is the birthplace of the African safari — the word itself comes from Swahili ("journey"). The Masai Mara is home to the greatest wildlife spectacle on Earth: the Great Migration, when 1.5 million wildebeest, 200,000 zebras, and 300,000 gazelles cross the Mara River in a drama of life and death that has no parallel on the planet. But Kenya\'s wildlife is extraordinary year-round — lions, leopards, elephants, buffalo, and rhinos (the Big Five) are seen on virtually every game drive.',
      'Our 7-night package covers Kenya\'s essential highlights. Nairobi (Africa\'s most cosmopolitan capital, with the Karen Blixen Museum and Giraffe Centre) → Masai Mara (4x4 game drives morning and evening, Big Five, hot air balloon optional) → Amboseli National Park (elephant herds against the backdrop of Mt. Kilimanjaro — the most iconic image in Africa) → Diani Beach (Kenya\'s finest white-sand Indian Ocean beach for the perfect safari-and-sea combination).',
      'Best time for the Great Migration: July–October (wildebeest river crossings at Mara River peak August–September). Best overall game viewing: July–October (dry season, animals congregate around waterholes). Amboseli is excellent December–March and June–October. Diani Beach is beautiful year-round.',
    ],

    highlights: [
      'Masai Mara — Big Five game drives (lion, leopard, elephant, buffalo, rhino)',
      'Great Migration — 1.5 million wildebeest crossing Mara River (Jul–Oct)',
      'Amboseli — largest elephant herds in Africa with Mt. Kilimanjaro backdrop',
      'Hot air balloon safari over Masai Mara at sunrise (optional)',
      'Masai village visit — traditional culture, beadwork, jumping dance',
      'Nairobi Giraffe Centre — feed endangered Rothschild giraffes by hand',
      'Karen Blixen Museum — "Out of Africa" colonial farmhouse',
      'Diani Beach — pristine white-sand Indian Ocean beach',
    ],

    gallery: [
      { src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', alt: 'Kenya Masai Mara safari lions giraffe savanna', label: 'Masai Mara' },
      { src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', alt: 'Amboseli elephants Mount Kilimanjaro Kenya', label: 'Amboseli' },
      { src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', alt: 'Great Migration wildebeest zebras Africa savanna', label: 'Great Migration' },
      { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', alt: 'Diani Beach Kenya white sand palm trees Indian Ocean', label: 'Diani Beach' },
      { src: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80', alt: 'Hot air balloon safari Masai Mara Kenya sunrise', label: 'Balloon Safari' },
    ],

    itinerary: [
      {
        day: 1,
        title: 'Arrive Nairobi — Giraffe Centre & Karen Blixen',
        description: 'Fly to Jomo Kenyatta International Airport, Nairobi. Transfer to hotel. Afternoon: Nairobi Giraffe Centre — get face-to-face (literally) with the endangered Rothschild giraffe; these magnificent animals eat pellets from your outstretched hand and occasionally from between your lips. David Sheldrick Wildlife Trust — the world\'s most successful orphaned elephant rescue and rehabilitation programme (book in advance to meet baby elephants during the 11 AM visiting hour). Karen Blixen Museum — the farmhouse of the "Out of Africa" author, preserved exactly as she left it in 1931, surrounded by the Ngong Hills she immortalised.',
        meals: 'Dinner',
        hotel: '3★ Hotel, Nairobi',
        activities: ['Arrive Nairobi NBO', 'Nairobi Giraffe Centre', 'David Sheldrick elephant nursery', 'Karen Blixen Museum'],
      },
      {
        day: 2,
        title: 'Nairobi → Masai Mara — Afternoon Game Drive',
        description: 'Morning drive from Nairobi to the Masai Mara (5–6 hours, or 45-minute charter flight available at extra cost). The Masai Mara National Reserve is a 1,510 sq km extension of the Serengeti ecosystem — the richest wildlife area in Africa. Check into your tented camp or lodge. Afternoon: first game drive in your 4x4 safari vehicle with a professional Masai guide. The Mara\'s open savanna grasslands make for exceptional game viewing — lions are often seen in the first 30 minutes. Sundowner drinks on the savanna as the sun sets behind the acacia trees.',
        meals: 'Breakfast, Lunch, Dinner',
        hotel: 'Tented Camp, Masai Mara',
        activities: ['Drive Nairobi → Masai Mara', 'Afternoon game drive', 'Sundowner on savanna'],
      },
      {
        day: 3,
        title: 'Masai Mara — Full Day Game Drives & Big Five',
        description: 'The full Masai Mara experience. Wake at 6 AM for the morning game drive — the golden hours after sunrise when predators are still active and the light is extraordinary for photography. The Mara\'s resident pride of lions is among Africa\'s most studied and photographed — large prides of 20+ lions are not uncommon. Leopards rest in acacia trees. Cheetahs stalk the open plains at speed. Huge elephant herds move through the bush. Hippos wallow in the Mara River (with crocodiles). Return to camp for breakfast and a midday rest. Afternoon game drive 4–7 PM. If visiting July–October, witness the Great Migration at the Mara River crossing — a scene of raw, savage magnificence.',
        meals: 'Breakfast, Lunch, Dinner',
        hotel: 'Tented Camp, Masai Mara',
        activities: ['Morning game drive (Big Five)', 'Great Migration river crossing (seasonal Jul–Oct)', 'Afternoon game drive', 'Masai village visit (optional)'],
      },
      {
        day: 4,
        title: 'Masai Mara — Balloon Safari & Masai Village',
        description: 'Optional pre-dawn experience: hot air balloon safari over the Masai Mara at sunrise (extra cost ~₹25,000/person). Float silently over the savanna as the sun rises — the view of the migration herds from above is unforgettable. Champagne breakfast in the bush after landing. Morning: Masai village (manyatta) visit — meet the indigenous Masai people who have coexisted with the Mara\'s wildlife for centuries. Experience the Masai jumping dance (adumu), traditional beadwork, and ochre-painted warriors. Afternoon: final Mara game drive before checking out. Drive toward Lake Naivasha or direct to Amboseli (via Nairobi, 4 hours).',
        meals: 'Breakfast, Lunch, Dinner',
        hotel: '3★ Lodge, Amboseli area',
        activities: ['Hot air balloon safari at sunrise (optional)', 'Masai village cultural visit', 'Drive to Amboseli'],
      },
      {
        day: 5,
        title: 'Amboseli — Elephants & Kilimanjaro Views',
        description: 'Amboseli National Park — Kenya\'s second most popular park and home to Africa\'s largest elephant herds. The park is famous for a single, extraordinary image: massive bull elephants with Kilimanjaro (5,895 m, Africa\'s highest peak) rising snow-capped behind them. On a clear morning, this is one of the most magnificent sights in Africa. Full day of game drives — Amboseli\'s open, flat landscape makes it ideal for spotting the Big Five. Observation Hill for a panoramic view of the swamps and elephant herds below. Lion, cheetah, buffalo, and giraffe are frequently seen. Overnight in Amboseli lodge.',
        meals: 'Breakfast, Lunch, Dinner',
        hotel: '3★ Lodge, Amboseli',
        activities: ['Amboseli morning game drive', 'Elephants & Kilimanjaro views', 'Observation Hill viewpoint', 'Afternoon game drive'],
      },
      {
        day: 6,
        title: 'Amboseli → Diani Beach — Indian Ocean',
        description: 'Morning game drive in Amboseli (best wildlife viewing in the first hours). Drive to Mombasa (5 hours) or take a short flight to Ukunda airstrip (1 hour). Transfer to Diani Beach — Kenya\'s finest beach destination, 30 km south of Mombasa. Diani is an 18 km stretch of powdery white coral sand fronting the turquoise Indian Ocean. Check into beachfront resort. Afternoon: relax on the beach, swim in the warm Indian Ocean, and enjoy the perfect transition from wild Africa to the sea. Sundowner cocktails watching the Indian Ocean sunset.',
        meals: 'Breakfast, Dinner',
        hotel: 'Beachfront Resort, Diani Beach',
        activities: ['Amboseli morning game drive', 'Transfer to Diani Beach', 'Indian Ocean beach relaxation', 'Sunset cocktails'],
      },
      {
        day: 7,
        title: 'Diani Beach — Snorkelling & Colobus Monkeys',
        description: 'Full day at Diani Beach. Morning: snorkelling at Kisite-Mpunguti Marine National Park — Kenya\'s best coral reef, home to sea turtles, dolphins, colourful reef fish, and whale sharks (season permitting). Glass-bottom boat trip over the coral gardens. Afternoon: Colobus Conservation Centre — Diani is home to the endangered Angolan black-and-white colobus monkeys; these beautiful primates are found in the coastal forest adjacent to the beach resort. Evening: fresh Swahili Coast seafood dinner — grilled lobster, crab, and freshly caught fish cooked in coconut and spices.',
        meals: 'Breakfast, Dinner',
        hotel: 'Beachfront Resort, Diani Beach',
        activities: ['Kisite Marine Park snorkelling', 'Glass-bottom boat', 'Colobus monkey conservation', 'Swahili seafood dinner'],
      },
      {
        day: 8,
        title: 'Diani Beach → Departure',
        description: 'Leisure morning at the beach — one last swim in the warm Indian Ocean. Transfer to Mombasa Moi International Airport or Ukunda Airstrip for your return flight to Nairobi and onwards to India. Arrive back in India carrying the extraordinary memory of Africa\'s wildlife, the vast savanna skies, and the warmth of East Africa.',
        meals: 'Breakfast',
        hotel: 'Departure',
        activities: ['Morning beach leisure', 'Transfer to Mombasa airport', 'Return flight to India'],
      },
    ],

    priceNote: 'Land only · Flights not included',

    includes: [
      '7 nights accommodation: Nairobi (1N), Masai Mara tented camp (2N), Amboseli lodge (2N), Diani Beach resort (2N)',
      'All meals at safari camps and Amboseli (full board)',
      'Breakfast + dinner at Diani Beach resort',
      'All 4x4 game drives with professional Masai guide',
      'Masai Mara National Reserve conservancy fees',
      'Amboseli National Park entry fees',
      'All airport and inter-park transfers',
      'Nairobi city tour (Giraffe Centre, Karen Blixen)',
      'Kenya e-visa documentation assistance',
      'Dedicated YlooTrips Africa coordinator',
    ],

    excludes: [
      'International flights India ↔ Nairobi (book separately)',
      'Kenya e-visa (USD 50 / ~₹4,200)',
      'Hot air balloon safari (optional, ~₹25,000/person)',
      'Kisite Marine Park snorkelling fees (~₹2,500)',
      'Travel insurance (strongly recommended)',
      'Gratuities for guides and camp staff (customary)',
      'Drinks at safari camps beyond water and standard beverages',
    ],

    reviews: [
      { name: 'Arjun & Meera Sharma', country: 'Delhi, India', flag: '🇮🇳', rating: 5, text: 'The Great Migration was beyond anything I can describe. We watched 500 wildebeest cross the Mara River in 20 minutes — crocodiles in the water, lions on the bank. I wept. YlooTrips arranged an extraordinary experience from start to finish.', date: 'August 2025', trip: 'Kenya Safari 7N Package' },
      { name: 'Sunita Reddy', country: 'Hyderabad, India', flag: '🇮🇳', rating: 5, text: 'The elephant herds at Amboseli with Kilimanjaro behind them — that image will be with me forever. The Diani beach finish was brilliant. A truly bucket-list trip and YlooTrips delivered every element perfectly.', date: 'October 2025', trip: 'Kenya Safari Package' },
    ],

    avgRating: 4.9,
    reviewCount: 134,

    related: [
      { title: 'Maldives Luxury Package — 4 Nights', href: '/maldives-luxury-package', priceINR: 89999, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80' },
      { title: 'Bali Honeymoon Package — 6 Nights', href: '/bali-honeymoon-package', priceINR: 52499, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80' },
      { title: 'Europe Tour Package — 10 Nights', href: '/europe-tour-package-from-india', priceINR: 124999, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80' },
    ],
    whatsappMsg: "Hi! I'm interested in the Kenya Safari Package (7 nights ₹2,24,999). Please share availability and Great Migration dates.",
    bookingHref: '/contact?package=kenya-safari-package',

    faqs: [
      { question: 'Do Indians need a visa for Kenya?', answer: 'Yes — Indian nationals require a Kenya e-visa (Electronic Travel Authorisation / ETA). Apply at etakenya.go.ke. The fee is USD 50 (~₹4,200). Processing takes 3–5 business days. The visa allows 90 days single entry. We provide complete documentation support.' },
      { question: 'When is the best time to see the Great Migration in Kenya?', answer: 'The Great Migration river crossings at the Mara River peak July–October, with August and September typically the most dramatic. However, the Masai Mara has outstanding wildlife year-round — the Big Five (lion, leopard, elephant, buffalo, rhino) are seen in every month. January–March is calving season (wildebeest calves) in Tanzania and offers excellent wildlife with fewer tourists.' },
      { question: 'Is Kenya safe for Indian travelers?', answer: 'The main tourist areas of Kenya — Nairobi (tourist zones), Masai Mara, Amboseli, and Diani Beach — are very safe and well-established for international tourism. We use only professional licensed guides and reputable accommodation. The Kenyan Tourism Board actively ensures tourist safety in all major reserves.' },
      { question: 'What should I pack for a Kenya safari?', answer: 'Khaki and neutral-coloured clothing (avoid bright colours that startle wildlife), long sleeves for evening mosquito protection, comfortable walking shoes, sunscreen and insect repellent, a good camera with telephoto lens (200mm minimum), binoculars, and a light fleece (Masai Mara mornings are surprisingly cold). We send a full packing list after booking.' },
    ],

    mustVisitPlaces: [
      { name: 'Masai Mara — Great Migration River Crossings', description: 'Over 1.5 million wildebeest cross the crocodile-filled Mara River in July–October. A river crossing is one of nature\'s greatest events — 10,000 animals in 20 minutes, with Nile crocodiles surging from the water.', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', type: 'nature', tip: 'August–September has the most river crossings. Position at the crossing point early morning (6am) with your guide and wait — crossings happen unpredictably but your guide can read the herd behaviour.' },
      { name: 'Amboseli National Park — Kilimanjaro Views', description: 'A 392 sq km park at the foot of Mount Kilimanjaro — Africa\'s highest peak. Amboseli has the best elephant herds in Kenya (400+) and on a clear morning, elephants walk with Kilimanjaro\'s snow-capped summit behind.', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', type: 'nature', tip: 'Kilimanjaro is clearest at dawn before cloud builds (6–9am). Stay at the observation hill at sunrise for the classic elephant-Kilimanjaro photograph.' },
      { name: 'Masai Village & Cultural Experience', description: 'Visit an authentic Masai boma (village) and meet warriors, women, and elders in traditional red shukas. Learn about cattle-centric culture, jumping dance, and the warrior rites of passage that still define Masai identity.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', type: 'culture', tip: 'Ask the Masai elder about the morani (warrior) initiation process — it\'s not covered in the standard village tour but deeply fascinating if you ask directly.' },
    ],
    packageActivities: [
      { name: 'Hot Air Balloon Safari — Masai Mara', description: 'Drift silently over the Mara at 500 feet as the sun rises — herds of zebra and wildebeest below, hippos in the river, and lions hunting at dawn. Ends with a champagne breakfast in the bush.', image: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80', duration: '1 hour flight', cost: 'USD 450–500 per person' },
      { name: 'Night Game Drive', description: 'An after-dark game drive with spotlight reveals Kenya\'s nocturnal wildlife — leopards, servals, aardvark, bushbaby, and hyenas that are invisible during day drives. Only available at private conservancies.', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', duration: '3 hours', cost: 'Included in package (conservancy camps)' },
    ],
    travelTips: [
      'July–October for the Great Migration (river crossings). January–February for calving season (fewer tourists, more predator action). Wildlife is excellent year-round.',
      'Kenya ETA (USD 50) at etakenya.go.ke — apply 2 weeks ahead. Processing is 3–5 business days.',
      'Malaria prophylaxis is essential for Kenya. Start 1–2 weeks before travel. Consult your doctor for the right medication (Malarone or Doxycycline).',
      'Photography: 200mm telephoto minimum for wildlife close-ups. A Canon/Nikon 70-200mm f/4 or Sony 100-400mm gives excellent results from the vehicle.',
    ],
  };

  return <PackagePageLayout pkg={pkg} />;
}
