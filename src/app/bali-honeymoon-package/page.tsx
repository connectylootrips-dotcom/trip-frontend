import type { Metadata } from 'next';
import PackagePageLayout, { type PackageData } from '@/components/PackagePageLayout';
import { getPackagePrice } from '@/lib/packagePrices';

export const metadata: Metadata = {
  title: 'Bali Honeymoon Package 2026 — 6 Nights Starting ₹52,499',
  description: 'Romantic Bali honeymoon packages from India starting ₹52,499 for 2. 6 nights in Ubud + Seminyak — private villa, rice terraces, temple tours, sunset dinner. Hotel + transfers + activities included.',
  openGraph: {
    title: 'Bali Honeymoon Package 2026 — ₹52,499 Per Person',
    description: 'Romantic Bali honeymoon — private villa in Ubud, sunrise at Tegalalang, couples spa, sunset at Tanah Lot. Visa free for Indians.',
    url: 'https://www.ylootrips.com/bali-honeymoon-package',
    images: [{ url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80', width: 1200, height: 630, alt: 'Bali honeymoon package rice terraces Ubud Indonesia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bali Honeymoon Package 2026 — ₹52,499 Per Person',
    description: 'Private villa · Rice terraces · Couples spa · Tanah Lot sunset. Book your Bali honeymoon now.',
    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80'],
  },
  alternates: { canonical: 'https://www.ylootrips.com/bali-honeymoon-package' },
};

const pkg: PackageData = {
  slug: 'bali-honeymoon-package',
  canonicalUrl: 'https://www.ylootrips.com/bali-honeymoon-package',
  metaTitle: 'Bali Honeymoon Package 2026 — 6 Nights Starting ₹52,499',
  metaDescription: 'Romantic Bali honeymoon packages from India starting ₹52,499 per person. 6 nights in Ubud & Seminyak — private villa, Tegalalang, Tanah Lot. Hotel + transfers + activities included.',
  ogImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',

  heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=85',
  heroTitle: 'Bali Honeymoon Package',
  heroSubtitle: 'Rice Terraces · Private Villas · Ancient Temples · World-Class Sunsets — Romance Perfected in the Island of Gods',
  tagline: '6 Nights · Ubud + Seminyak · All-Inclusive',

  duration: '6 Nights / 7 Days',
  groupSize: 'Couples (2 travelers)',
  difficulty: 'Easy (Couples)',
  startLocation: 'Delhi/Mumbai/Chennai → Bali (DPS)',

  priceINR: 52499,
  priceUSD: 629,
  originalPriceINR: 65999,
  depositPercent: 25,

  overview: [
    'Bali — Indonesia\'s Island of Gods — is the world\'s most romantic honeymoon destination and easily India\'s top choice for couples. With its emerald-green rice terraces, ancient Hindu temples, world-class spa culture, dramatic cliff-top ocean views, and warm Balinese hospitality, Bali casts a spell that brings couples back again and again.',
    'Our 6-night Bali honeymoon package splits your time between Ubud (Bali\'s cultural and spiritual heart, surrounded by jungle and rice paddies) and Seminyak (the chic beach town famous for sunset cocktails and luxury boutiques). Stay in a private pool villa — your own slice of paradise — and enjoy curated romantic experiences including a sunrise Tegalalang rice terrace walk, a traditional Balinese couples\' spa treatment, a private sunset dinner at Tanah Lot temple, and a guided walk through the Sacred Monkey Forest.',
    'Bali is visa-free for Indian passport holders (30-day visa on arrival, extendable). It\'s also incredibly affordable — world-class food, transport, and activities cost a fraction of what you\'d pay in Europe or the Maldives. Our package is fully customizable: add more nights, upgrade to a 5-star resort, or extend to Lombok or Nusa Penida island.',
    'We take care of everything from your Bali arrival to your villa — visa assistance, transfers, and all activities are pre-booked so you arrive and start making memories immediately.',
  ],

  highlights: [
    'Tegalalang Rice Terrace sunrise walk (most Instagrammed spot in Bali)',
    'Private pool villa in Ubud — your own jungle paradise',
    'Sunset dinner at Tanah Lot sea temple',
    'Traditional Balinese couples\' spa (90-minute treatment)',
    'Uluwatu Cliff Temple + Kecak Fire Dance at sunset',
    'Ubud Art Market and local cooking class',
    'Sacred Monkey Forest guided walk',
    'Seminyak beach club day with infinity pool',
    'Volcano sunrise trek at Mt. Batur (optional add-on)',
    'Visa-free entry for Indian passport holders',
  ],

  gallery: [
    { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', alt: 'Bali Tegalalang rice terraces Ubud Indonesia green', label: 'Tegalalang' },
    { src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80', alt: 'Tanah Lot temple sunset Bali ocean waves', label: 'Tanah Lot' },
    { src: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&q=80', alt: 'Bali private pool villa jungle view', label: 'Private Villa' },
    { src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80', alt: 'Uluwatu cliff temple Bali ocean sunset', label: 'Uluwatu' },
    { src: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80', alt: 'Bali Seminyak beach sunset ocean view', label: 'Seminyak' },
  ],

  itinerary: [
    { day: 1, title: 'Arrival in Bali — Ubud Welcome', description: 'Arrive at Ngurah Rai International Airport (DPS). Your private driver meets you at arrivals. 1.5-hour scenic drive through rice paddies and villages to your private villa in Ubud. Check in, change, and head for a romantic welcome dinner at a jungle-view restaurant in Ubud town. Stroll the atmospheric Ubud streets lined with galleries, cafes, and wayang puppet makers.', meals: 'Dinner', hotel: 'Private Pool Villa, Ubud', activities: ['Airport transfer', 'Villa check-in', 'Welcome dinner at jungle restaurant', 'Ubud town evening stroll'] },
    { day: 2, title: 'Tegalalang Rice Terrace + Ubud Highlights', description: 'Wake at 6:30 AM for the golden-hour Tegalalang Rice Terrace walk — the most photographed spot in Bali, best experienced before the crowds arrive. Breakfast back at your villa with views of the jungle. Morning visit to Ubud Palace and Ubud Market for handmade Balinese crafts. Afternoon: Sacred Monkey Forest Sanctuary — 700 macaques roam freely through ancient temple ruins. Evening: 90-minute traditional Balinese couples\' massage and spa treatment at a top-rated spa.', meals: 'Breakfast', hotel: 'Private Pool Villa, Ubud', activities: ['Tegalalang sunrise walk', 'Ubud Palace and Market', 'Sacred Monkey Forest', 'Balinese couples spa 90 min'] },
    { day: 3, title: 'Volcano + Waterfalls + Cooking Class', description: 'Morning drive to the Kintamani highlands for views of Mount Batur (an active volcano) reflected in Lake Batur — stop for local Luwak coffee tasting. Visit Tirta Empul holy spring temple — watch locals purify themselves in sacred fountain pools. Afternoon at Tegenungan Waterfall — swim in the natural pool at the base of this 15-metre jungle cascade. Evening: hands-on Balinese cooking class with a local family, learning to make Nasi Goreng, Satay, and Jamu herbal tonic.', meals: 'Breakfast, Cooking Class Lunch', hotel: 'Private Pool Villa, Ubud', activities: ['Mount Batur viewpoint', 'Luwak coffee tasting', 'Tirta Empul temple', 'Tegenungan Waterfall swim', 'Balinese cooking class'] },
    { day: 4, title: 'Tanah Lot Sunset Dinner — Most Romantic Evening', description: 'Morning at leisure in your villa — swim in your private pool, have a lazy breakfast, or book an optional sunrise trek up Mount Batur (4 AM start, 2-hour climb, extraordinary crater sunrise). Afternoon check-out and drive 1.5 hours to Seminyak on the southern coast. Check into your beachfront hotel or villa. Late afternoon: head to Tanah Lot sea temple for the most spectacular sunset in Bali, perched on a rocky outcrop surrounded by ocean waves. Private candlelit dinner at a restaurant overlooking Tanah Lot at sunset.', meals: 'Breakfast, Romantic Dinner', hotel: 'Boutique Villa, Seminyak', activities: ['Villa pool morning', 'Drive to Seminyak', 'Tanah Lot sunset', 'Romantic candlelit dinner'] },
    { day: 5, title: 'Uluwatu Cliff Temple + Kecak Fire Dance', description: 'Full day on the stunning Bukit Peninsula. Morning at Bingin or Padang Padang beach — small, crystal-clear bays reached by steep stone steps. Late afternoon drive to Uluwatu Temple — a 6th-century Hindu sea temple perched 70 metres above the crashing Indian Ocean. Just before sunset, watch the legendary Kecak Fire Dance performed on the clifftop stage as the sun sets behind the ocean — one of the most theatrical experiences in Southeast Asia. Dinner at Jimbaran Bay seafood on the beach with your feet in the sand.', meals: 'Breakfast, Dinner', hotel: 'Boutique Villa, Seminyak', activities: ['Bingin Beach', 'Uluwatu Cliff Temple', 'Kecak Fire Dance at sunset', 'Jimbaran Bay seafood dinner'] },
    { day: 6, title: 'Seminyak Beach Day + Shopping', description: 'Relaxed final full day. Morning at Seminyak or Petitenget beach — calm waves, sunbeds under umbrellas, and legendary beach clubs with infinity pools overlooking the ocean. Afternoon explore Seminyak\'s boutique shopping strip — Jl Laksmana (Eat Street) is lined with high-end fashion boutiques, artisan galleries, and designer homeware. Optional: Pura Petitenget temple visit (a sacred sea temple famous for ceremonies). Final sunset cocktails at Ku De Ta or Potato Head beach club.', meals: 'Breakfast', hotel: 'Boutique Villa, Seminyak', activities: ['Seminyak Beach', 'Beach club pool day', 'Boutique shopping strip', 'Sunset cocktails at beach club'] },
    { day: 7, title: 'Departure — Fly Home', description: 'Morning at leisure. Hotel checkout by 12:00 PM. Your driver will transfer you to Ngurah Rai Airport in time for your departure flight. Arrive in Delhi/Mumbai/Chennai in the afternoon or evening. Trip ends here — carrying Bali in your hearts forever. Selamat Tinggal!', meals: 'Breakfast', hotel: 'Departure', activities: ['Hotel checkout', 'Airport transfer', 'Depart Bali', 'Arrive India'] },
  ],

  includes: [
    'Bali Visa on Arrival assistance (free for Indian passport holders)',
    '3 nights private pool villa in Ubud (jungle view)',
    '3 nights boutique villa/resort in Seminyak (ocean view)',
    'Daily breakfast at both properties',
    'All airport and inter-hotel transfers (private AC vehicle)',
    'Tegalalang Rice Terrace guided visit',
    'Ubud highlights tour (Palace, Market, Monkey Forest)',
    'Balinese couples spa treatment (90 minutes)',
    'Tanah Lot sunset visit with romantic dinner',
    'Uluwatu temple + Kecak Fire Dance tickets',
    'Jimbaran Bay seafood beach dinner',
    'Balinese cooking class (Day 3)',
    '24/7 YlooTrips WhatsApp support',
  ],

  excludes: [
    'International flights India ↔ Bali (book separately)',
    'Travel insurance (strongly recommended)',
    'Meals other than daily breakfast and stated dinners',
    'Mount Batur sunrise trek (optional add-on — ₹3,500/couple)',
    'Nusa Penida island day trip (optional — ₹4,500/couple)',
    'Personal shopping and souvenirs',
    'Alcohol and bar bills',
    'Spa treatments beyond the included 90-min couples session',
    'Gratuities for drivers and guides',
  ],

  reviews: [
    { name: 'Sneha & Arjun', country: 'Mumbai, India', flag: '🇮🇳', rating: 5, text: 'Our Bali honeymoon with YlooTrips was absolutely magical. The private pool villa in Ubud was stunning — waking up to jungle sounds every morning was incredible. The Tanah Lot dinner is a memory we will treasure forever. Every single detail was perfectly arranged.', date: 'March 2026', trip: 'Bali Honeymoon Package' },
    { name: 'Kavita Menon', country: 'Bangalore, India', flag: '🇮🇳', rating: 5, text: 'First international trip together and we could not have asked for a better destination or travel partner. YlooTrips took care of everything — even our flight delay was handled smoothly with a quick hotel extension. Bali is beautiful and we will definitely be back.', date: 'February 2026', trip: 'Bali Honeymoon 7 Days' },
    { name: 'Rohan Kapoor', country: 'Delhi, India', flag: '🇮🇳', rating: 5, text: 'The Kecak Fire Dance at Uluwatu at sunset was worth the entire trip by itself. Add to that the Tegalalang sunrise, the cooking class, and the most relaxing massage of our lives — Bali is truly the island of gods. YlooTrips made it effortless.', date: 'January 2026', trip: 'Bali Honeymoon Package' },
    { name: 'Deepika Rao', country: 'Hyderabad, India', flag: '🇮🇳', rating: 4, text: 'Amazing experience overall. The villa in Ubud was everything I dreamed of. Small feedback: I wish the Seminyak hotel was slightly closer to the beach. Otherwise the package is excellent value — you cannot get this quality elsewhere at this price.', date: 'November 2025', trip: 'Bali Couple Package' },
  ],

  avgRating: 4.9,
  reviewCount: 623,

  faqs: [
    { question: 'How much does a Bali honeymoon trip from India cost in 2026?', answer: 'Our Bali honeymoon package starts at ₹52,499 per person (₹1,04,998 for a couple) for 6 nights. This includes private pool villa, breakfast, all listed activities, and transfers. International flights are booked separately. Budget ₹30,000–₹50,000 extra per couple for flights, additional dining, shopping, and optional activities like Mount Batur trek or Nusa Penida.' },
    { question: 'Do Indians need a visa for Bali?', answer: 'No! Indian passport holders get a free Visa on Arrival in Bali (Indonesia) for 30 days. You just need a valid Indian passport with 6+ months validity, a return ticket, proof of hotel booking, and USD $50 equivalent in cash or card for the visa fee (which our package includes as an assistance service).' },
    { question: 'Which is the best time to visit Bali for a honeymoon?', answer: 'April to October is Bali\'s dry season — the best time to visit. July and August are the busiest months but also the most beautiful. November to March is the wet season with heavier afternoon showers but fewer tourists and lower prices. We recommend avoiding July–August if you prefer quieter experiences.' },
    { question: 'Is Ubud or Seminyak better for a Bali honeymoon?', answer: 'Both! Ubud is Bali\'s cultural heart — jungle, rice terraces, temples, and spiritual experiences. Seminyak is the chic beach side — sunset cocktails, luxury boutiques, infinity pools, and world-class dining. Our package gives you the best of both worlds with 3 nights in each.' },
    { question: 'Can I upgrade to a 5-star resort for the Bali package?', answer: 'Absolutely! We can upgrade to Alaya Ubud, Komaneka at Bisma, Four Seasons Jimbaran, or The Legian Seminyak. WhatsApp us at +91-84278-31127 for a custom quote with your preferred properties and dates.' },
    { question: 'Is Bali safe for Indian couples and solo female travelers?', answer: 'Bali is extremely safe and welcoming for Indian travelers. It\'s one of the world\'s most popular tourist destinations with excellent infrastructure. The Balinese people are warm and hospitable. Dress modestly when visiting temples (free sarongs provided at most). Keep your belongings safe in crowded market areas.' },
  ],

  related: [
    { title: 'Dubai Tour Package from Delhi — 5 Nights', href: '/dubai-tour-package-from-delhi', priceINR: 36499, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80' },
    { title: 'Thailand Budget Trip — 5 Nights', href: '/thailand-budget-trip', priceINR: 49499, image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=600&q=80' },
    { title: 'Maldives Luxury Package — 4 Nights', href: '/maldives-luxury-package', priceINR: 89999, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80' },
  ],

  whatsappMsg: "Hi! I'm interested in the Bali Honeymoon Package (6 nights ₹52,499/person). Please share availability.",
  bookingHref: '/contact?package=bali-honeymoon-package',
  schemaHighlights: ['Tegalalang Rice Terrace sunrise', 'Private pool villa Ubud', 'Tanah Lot sunset dinner', 'Balinese couples spa', 'Uluwatu Kecak Fire Dance'],

  mustVisitPlaces: [
    {
      name: 'Tegalalang Rice Terrace, Ubud',
      description: 'UNESCO-listed rice terraces carved into steep jungle hillsides north of Ubud, illuminated by dawn light. The ancient subak irrigation system still runs through every terrace — farmers in conical hats working at sunrise makes for the most iconic Bali image.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      type: 'nature',
      tip: 'Arrive by 6:30am before the swing operators and selfie crowds. The terrace path going right (north) is quieter than the main swing area on the left.',
    },
    {
      name: 'Tanah Lot Sea Temple at Sunset',
      description: 'A 16th-century Hindu temple perched on a dramatic offshore rock, silhouetted against Bali\'s most spectacular sunsets. Sacred sea snakes guard the temple base. The sunset view from the clifftop cafe behind is unforgettable.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      type: 'landmark',
      tip: 'Arrive 1 hour before sunset and walk north along the cliff path for the best angle. The main viewing area gets very crowded — the clifftop above the temple is far better.',
    },
    {
      name: 'Uluwatu Temple & Kecak Fire Dance',
      description: 'A Shaivite sea temple on a 70m limestone cliff at the Bukit Peninsula\'s southern tip, above turquoise Indian Ocean. Every evening at 6pm, a 100-man Kecak Fire Dance is performed on the cliff edge against the sunset.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      type: 'culture',
      tip: 'Book Kecak seats (₹400) in advance through your hotel — it sells out daily. Sit on the left side of the open-air stage for the best sunset-and-dance composition.',
    },
    {
      name: 'Seminyak & Potato Head Beach Club',
      description: 'Bali\'s most beautiful beach club — a stunning curved architecture with infinity pools, sunbeds, world-class cocktails, and DJ sets as the sun sets over the Indian Ocean. Seminyak has Bali\'s finest dining and shopping nearby.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      type: 'experience',
      tip: 'Reserve a sunbed (minimum spend applies) by 10am — they\'re fully booked by noon in peak season. The restaurant\'s sunset cocktails are worth every rupiah.',
    },
    {
      name: 'Sacred Monkey Forest, Ubud',
      description: 'A 14-hectare ancient Hindu forest sanctuary with 1,200 free-roaming long-tailed macaques and three moss-covered pura (temples) dating to the 14th century. The roots of giant banyan trees engulf stone steps and statues.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      type: 'nature',
      tip: 'Don\'t carry food or wear anything shiny — monkeys will grab both. Morning visits (8–10am) have less tourist congestion and more active monkeys.',
    },
  ],

  packageActivities: [
    {
      name: 'Private Couples Balinese Spa',
      description: 'A 3-hour couples spa ritual in a private villa cabana — traditional Boreh body scrub with turmeric and ginger, 90-min four-hands Balinese massage, and a flower petal bath drawn by your therapist.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      duration: '3 hours',
      cost: 'Included in package',
    },
    {
      name: 'White-Water Rafting — Ayung River',
      description: 'Raft through 10km of Grade 2–3 rapids on the Ayung River, passing through dense tropical jungle, rice terraces, and hidden waterfalls. Guides navigate, you just paddle and scream.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      duration: '2.5 hours on water',
      cost: '₹2,000–3,000 per person',
    },
    {
      name: 'Sunrise Mount Batur Trek',
      description: 'Trek an active volcano (1,717m) in pitch darkness starting 3am, arriving at the summit for one of Southeast Asia\'s most breathtaking sunrises — the crater below glowing red, clouds far below, and the full Bali landscape emerging in first light.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      duration: '5–6 hours (start 3am)',
      cost: '₹2,500–3,500 per person with guide',
    },
    {
      name: 'Jimbaran Seafood Beach Dinner',
      description: 'Dinner on the sand at Jimbaran Bay as fishing boats come in at dusk. Tables set right at the water\'s edge, grilled fresh-catch seafood platter, and Bali\'s famous sunset light on the sea.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      duration: '2 hours',
      cost: '₹1,500–2,500 per person',
    },
  ],

  travelTips: [
    'Bali time zone is WITA (UTC+8) — 2.5 hours ahead of IST. No jet lag from India.',
    'April–October is dry season (best for beaches). November–March is wet season — cheaper prices, green rice terraces, dramatic skies.',
    'Visa on Arrival for Indian passport holders (30 days, $35 USD) — get it at Ngurah Rai Airport on arrival. Queue can be 45 mins.',
    'Use Grab (rideshare app) instead of metered taxis — 50–70% cheaper. Works seamlessly across Bali.',
    'Dress modestly at all temples — sarong and sash required (provided free at most temples). Shoulders and knees must be covered.',
    'The Bali stomach (Bali belly) is real — eat at busy restaurants, avoid ice at street stalls, and drink only bottled water for the first 2 days.',
    'Exchange USD cash at moneychangers in Seminyak or Ubud for the best rates (never at the airport). ₹1 = approx 165 IDR.',
    'Traffic between Seminyak and Ubud (35km) can take 90 minutes in peak hours (4–7pm). Plan your day around it.',
  ],
};

export default async function BaliHoneymoonPage() {
  const prices = await getPackagePrice('bali-honeymoon-package');
  return <PackagePageLayout pkg={{ ...pkg, ...prices }} />;
}
