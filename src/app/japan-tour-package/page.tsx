import type { Metadata } from 'next';
import PackagePageLayout, { type PackageData } from '@/components/PackagePageLayout';
import { getPackagePrice } from '@/lib/packagePrices';

export const metadata: Metadata = {
  title: 'Japan Tour Package from India 2026 — 7 Nights Starting ₹1,72,799 | YlooTrips',
  description: 'Book Japan tour packages from India starting ₹1,72,799. Tokyo, Kyoto, Osaka, Nara, Mt. Fuji. 7 nights / 8 days — cherry blossoms, bullet trains, ancient temples & world-class food.',
  openGraph: {
    title: 'Japan Tour Package from India 2026 — 7 Nights Starting ₹1,72,799',
    description: 'Tokyo, Kyoto, Osaka, Nara, Mt. Fuji — 7 nights across the Land of the Rising Sun.',
    url: 'https://www.ylootrips.com/japan-tour-package',
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80', width: 1200, height: 630, alt: 'Japan Mount Fuji cherry blossoms' }],
  },
  alternates: { canonical: 'https://www.ylootrips.com/japan-tour-package' },
};

export default async function JapanPackagePage() {
  const prices = await getPackagePrice('japan-tour-package');

  const pkg: PackageData = {
    slug: 'japan-tour-package',
    canonicalUrl: 'https://www.ylootrips.com/japan-tour-package',
    metaTitle: 'Japan Tour Package from India 2026 — 7 Nights Starting ₹1,72,799 | YlooTrips',
    metaDescription: 'Tokyo, Kyoto, Osaka, Nara, Mt. Fuji — 7 nights of cherry blossoms, bullet trains, ancient temples, and world-class Japanese cuisine.',
    ogImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80',

    heroImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&q=85',
    heroTitle: 'Japan Tour Package',
    heroSubtitle: 'Tokyo · Mt. Fuji · Kyoto · Nara · Osaka — 8 Days Across the Land of the Rising Sun',
    tagline: 'Ancient Tradition Meets the Future',

    duration: '7 Nights / 8 Days',
    groupSize: 'Solo, Couple, Family or Group',
    difficulty: 'Easy (city walking)',
    startLocation: 'Delhi/Mumbai → Tokyo (NRT)',

    priceINR: prices.priceINR,
    priceUSD: Math.round(prices.priceINR / 83),
    originalPriceINR: prices.originalPriceINR,
    depositPercent: 25,

    overview: [
      'Japan is unlike anywhere else on Earth — a country where 1,400-year-old Buddhist temples stand alongside futuristic robot restaurants, where bullet trains arrive to the second, and where every meal (from a ₹150 convenience store onigiri to a Michelin-starred kaiseki dinner) is prepared with extraordinary care. It is one of the safest, cleanest, and most fascinating countries in the world.',
      'Our 7-night circuit covers Japan\'s essential highlights. Tokyo (the world\'s greatest city — Shibuya crossing, Shinjuku, Akihabara, Harajuku, Asakusa temple) → Mt. Fuji (day trip to Kawaguchiko, Japan\'s most iconic view) → Kyoto (the cultural heart — 17 UNESCO World Heritage Sites, geishas, bamboo groves, tea ceremony) → Nara (deer that bow to you, the world\'s largest bronze Buddha) → Osaka (Japan\'s food capital, Dotonbori, street food paradise).',
      'Best time to visit: March–April for cherry blossoms (sakura season), October–November for autumn colours (koyo). Summer (June–August) is hot and humid. Winters (December–February) are cold but beautiful with snow. Japan is excellent year-round — each season has its own magic.',
    ],

    highlights: [
      'Tokyo — Shibuya Crossing, Shinjuku, Senso-ji Temple, Akihabara',
      'Mt. Fuji — Kawaguchiko viewpoint, Chureito Pagoda, Lake Ashi cruise',
      'Kyoto — Fushimi Inari (10,000 torii gates), Arashiyama Bamboo Grove, Kinkaku-ji (Golden Pavilion)',
      'Nara — Todai-ji (world\'s largest bronze Buddha), wild deer park',
      'Osaka — Dotonbori neon district, Osaka Castle, street food (takoyaki, okonomiyaki)',
      'Shinkansen (bullet train) ride — Tokyo to Kyoto at 320 km/h',
      'Traditional tea ceremony in Kyoto',
      'Geisha district (Gion, Kyoto) — evening walk',
    ],

    gallery: [
      { src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80', alt: 'Mount Fuji Japan cherry blossoms reflection', label: 'Mount Fuji' },
      { src: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80', alt: 'Kyoto Fushimi Inari torii gates Japan red', label: 'Fushimi Inari' },
      { src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', alt: 'Tokyo Shibuya crossing Japan night', label: 'Tokyo Shibuya' },
      { src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', alt: 'Kyoto Arashiyama bamboo grove Japan', label: 'Bamboo Grove' },
      { src: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80', alt: 'Japan ramen noodles bowl traditional food', label: 'Japanese Food' },
    ],

    itinerary: [
      {
        day: 1,
        title: 'Arrive Tokyo — Asakusa & Shinjuku',
        description: 'Fly to Tokyo Narita International Airport. Transfer to hotel in central Tokyo. Evening: Senso-ji Temple in Asakusa — Tokyo\'s oldest and most famous temple, founded 628 CE. The Nakamise shopping street leading to the temple is lined with 89 traditional shops selling Japanese sweets, fans, kimono, and souvenirs. Shinjuku at night — the dazzling neon labyrinth of Tokyo. Kabukicho entertainment district, Golden Gai (tiny atmospheric bars), and the Tokyo Metropolitan Government Building (free observation deck, panoramic night views).',
        meals: 'Dinner',
        hotel: '3★ Hotel, Shinjuku, Tokyo',
        activities: ['Arrive Tokyo NRT', 'Senso-ji Temple Asakusa', 'Nakamise shopping street', 'Shinjuku neon district'],
      },
      {
        day: 2,
        title: 'Tokyo — Shibuya, Harajuku & Akihabara',
        description: 'Full day Tokyo exploration. Harajuku — Takeshita Street (Japan\'s wild youth fashion street, crepe shops, cosplay culture) and the serene Meiji Jingu Shrine (dedicated to Emperor Meiji, set in 70 hectares of forested parkland). Shibuya Crossing — the world\'s busiest pedestrian crossing, 3,000 people crossing simultaneously every 2 minutes; best viewed from the Starbucks or Scramble Square observation deck. Akihabara — Tokyo\'s legendary electronics and anime district, the birthplace of otaku culture. Evening: ramen dinner at a traditional ramen shop (Ichiran or Fuunji for the real experience).',
        meals: 'Breakfast',
        hotel: '3★ Hotel, Tokyo',
        activities: ['Harajuku Takeshita Street', 'Meiji Shrine', 'Shibuya Crossing', 'Akihabara electronics district'],
      },
      {
        day: 3,
        title: 'Day Trip — Mt. Fuji & Kawaguchiko',
        description: 'Day trip to Mt. Fuji area (2 hours from Tokyo). Kawaguchiko Lake — the best viewpoint for Mt. Fuji reflections, especially magical at sunrise or with cherry blossoms. Chureito Pagoda — a five-storey pagoda with Mt. Fuji behind it, Japan\'s most photographed image (398 steps to reach it). Lake Ashi cruise — a scenic lake with Mt. Fuji views and Hakone Ropeway. Owakudani volcanic valley — boiling sulphur vents and the famous kuro-tamago (black eggs boiled in sulphurous water, said to add 7 years to your life). Return to Tokyo by evening.',
        meals: 'Breakfast',
        hotel: '3★ Hotel, Tokyo',
        activities: ['Kawaguchiko Lake', 'Chureito Pagoda', 'Lake Ashi cruise', 'Owakudani volcanic valley'],
      },
      {
        day: 4,
        title: 'Shinkansen to Kyoto — Fushimi Inari & Gion',
        description: 'Board the Shinkansen bullet train from Tokyo to Kyoto (2h 15m at 320 km/h — one of the world\'s great train journeys, with Mt. Fuji visible on a clear day). Check in to Kyoto hotel. Afternoon: Fushimi Inari Shrine — 10,000 vermilion torii gates winding through the forested hillside of Mt. Inari; best at dawn or dusk when the gates glow orange. Evening: Gion district — Kyoto\'s famous geisha quarter. Hanamikoji Street, wooden machiya townhouses, and if lucky, a glimpse of a geiko (Kyoto geisha) in full kimono heading to an appointment.',
        meals: 'Breakfast',
        hotel: '3★ Hotel, Kyoto',
        activities: ['Shinkansen Tokyo → Kyoto', 'Fushimi Inari 10,000 torii gates', 'Gion geisha district', 'Hanamikoji Street'],
      },
      {
        day: 5,
        title: 'Kyoto — Arashiyama, Kinkaku-ji & Tea Ceremony',
        description: 'Full day Kyoto. Morning: Arashiyama district — the famous bamboo grove (a towering cathedral of green light), Tenryu-ji Zen garden (UNESCO), and the Togetsukyo "Moon Crossing" Bridge. Kinkaku-ji (Golden Pavilion) — the gold-leaf-covered Zen temple reflected in its pond, one of Japan\'s most iconic images. Afternoon: traditional Japanese tea ceremony — a serene, meditative experience following the ancient Way of Tea (Cha-do). Ryoan-ji — the most famous Zen rock garden in Japan (15 stones arranged in raked gravel; the meaning is deliberately ambiguous). Nijo Castle (1603 CE) — shogun\'s Kyoto palace with "nightingale floors" that chirp underfoot.',
        meals: 'Breakfast',
        hotel: '3★ Hotel, Kyoto',
        activities: ['Arashiyama bamboo grove', 'Tenryu-ji Zen garden', 'Kinkaku-ji Golden Pavilion', 'Tea ceremony', 'Ryoan-ji rock garden'],
      },
      {
        day: 6,
        title: 'Nara Day Trip — Deer & Giant Buddha',
        description: 'Day trip to Nara (45 min from Kyoto by train). Nara Park — home to 1,200 freely roaming sika deer who are considered sacred messengers of the gods. The deer bow their heads to ask for shika senbei (deer crackers) — one of Japan\'s most surreal and delightful experiences. Todai-ji Temple — the world\'s largest wooden building, housing the world\'s largest bronze Buddha (Daibutsu, 15 metres tall, weighing 500 tonnes, cast in 752 CE). Kasuga Grand Shrine — lantern-lined paths through ancient forest, 3,000 stone and bronze lanterns. Return to Kyoto, evening transfer to Osaka (1 hour).',
        meals: 'Breakfast',
        hotel: '3★ Hotel, Osaka',
        activities: ['Nara deer park', 'Todai-ji Great Buddha', 'Kasuga Grand Shrine', 'Transfer to Osaka'],
      },
      {
        day: 7,
        title: 'Osaka — Dotonbori, Osaka Castle & Street Food',
        description: 'Full day Osaka. Dotonbori — Osaka\'s famous entertainment and food district, blazing with neon and giant mechanical crab and puffer fish signs over the canal. This is Japan\'s food capital: takoyaki (octopus balls), okonomiyaki (savoury pancake), kushikatsu (deep-fried skewers), and the best ramen in Japan. Osaka Castle — a stunning 16th-century castle with panoramic city views from the tower, surrounded by beautiful park and cherry trees. Shinsekai retro district — Osaka\'s colourful "New World" neighbourhood with 1950s atmosphere. Evening: farewell dinner at a Japanese izakaya (pub-restaurant).',
        meals: 'Breakfast, Dinner',
        hotel: '3★ Hotel, Osaka',
        activities: ['Dotonbori canal & food street', 'Osaka Castle', 'Shinsekai retro district', 'Farewell dinner izakaya'],
      },
      {
        day: 8,
        title: 'Osaka — Departure',
        description: 'Leisure morning in Osaka. Transfer to Kansai International Airport (KIX) for your return flight to India. Optional morning: Kuromon Ichiba Market (Osaka\'s 170-year-old "kitchen" market — a dazzling covered market of fresh seafood, wagyu beef, Japanese pickles, and street snacks). Board your return flight to India, carrying the extraordinary memories of 8 days in Japan.',
        meals: 'Breakfast',
        hotel: 'Departure',
        activities: ['Kuromon Market (optional)', 'Transfer to Osaka KIX', 'Return flight to India'],
      },
    ],

    includes: [
      'Return economy flights India ↔ Tokyo/Osaka (with one stop)',
      '7 nights accommodation: Tokyo (3N), Kyoto (2N), Osaka (2N)',
      'Daily breakfast throughout',
      'Shinkansen bullet train Tokyo → Kyoto (reserved seats)',
      'All airport and hotel transfers',
      'Mt. Fuji day trip (Kawaguchiko, Chureito Pagoda, Lake Ashi)',
      'Nara day trip (Nara Park, Todai-ji)',
      'Traditional Japanese tea ceremony in Kyoto',
      'Japan Rail Pass (7-day) for unlimited bullet train travel',
      'Dedicated YlooTrips Japan coordinator',
    ],

    excludes: [
      'Japan tourist visa (₹4,500 approx, required for Indians)',
      'Lunch and dinner except where specified',
      'Entry fees to individual attractions',
      'Travel insurance (strongly recommended)',
      'Personal shopping and tips',
    ],

    reviews: [
      { name: 'Rahul & Divya Kapoor', country: 'Mumbai, India', flag: '🇮🇳', rating: 5, text: 'Japan completely exceeded every expectation. The efficiency, the food, the kindness of people — we were stunned at every turn. Fushimi Inari at dawn was otherworldly. YlooTrips handled everything perfectly — the Japan Rail Pass alone saved us enormous stress.', date: 'April 2026', trip: 'Japan 7N Package' },
      { name: 'Priya Nair', country: 'Bangalore, India', flag: '🇮🇳', rating: 5, text: 'Solo trip to Japan — best decision of my life. Tokyo to Kyoto on the Shinkansen is a life experience. Cherry blossom season was pure magic. YlooTrips arranged a wonderful female solo-friendly itinerary.', date: 'March 2026', trip: 'Japan Tour Package' },
    ],

    avgRating: 4.9,
    reviewCount: 198,

    related: [
      { title: 'Singapore Tour Package — 4 Nights', href: '/singapore-tour-package', priceINR: 44999, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80' },
      { title: 'Thailand Budget Trip — 5 Nights', href: '/thailand-budget-trip', priceINR: 49499, image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80' },
      { title: 'Bali Honeymoon Package — 6 Nights', href: '/bali-honeymoon-package', priceINR: 52499, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80' },
    ],
    whatsappMsg: "Hi! I'm interested in the Japan Tour Package (7 nights ₹1,72,799). Please share availability and visa assistance details.",
    bookingHref: '/contact?package=japan-tour-package',

    faqs: [
      { question: 'Do Indians need a visa for Japan?', answer: 'Yes — Indian nationals require a Japan tourist visa. Apply at the Japanese Embassy or consulate in India. Required documents: passport, bank statements (6 months), ITR, employment letter, hotel bookings, and flight tickets. The visa typically takes 5–7 working days. We provide a complete documentation checklist and support throughout.' },
      { question: 'What is the best time to visit Japan?', answer: 'Cherry blossom season (late March–early April) is the most magical and popular. Autumn foliage (mid-October–November) is equally stunning. Spring and autumn are peak seasons. Summer (June–August) is hot and humid with typhoon risk. Winter is cold but beautiful with snow in Kyoto and Mt. Fuji views are often clearest December–February.' },
      { question: 'Is Japan expensive for Indian travelers?', answer: 'Japan is premium-priced but worth every rupee. Accommodation and transport (especially the Shinkansen) are the main costs. Street food (ramen, sushi conveyor belts, convenience stores) is affordable at ₹300–800 per meal. Our package price includes flights, hotels, and the Japan Rail Pass which covers all your bullet train travel.' },
      { question: 'Can vegetarians and Jains eat well in Japan?', answer: 'Japan can be challenging for strict vegetarians as dashi (fish stock) is used in many dishes. However, Kyoto has the best vegetarian options — shojin ryori (Buddhist temple cuisine, entirely plant-based) is exceptional. We flag dietary requirements to all restaurants and accommodations in advance. Convenience store onigiri, edamame, and vegetable tempura are widely available.' },
    ],
  };

  return <PackagePageLayout pkg={pkg} />;
}
