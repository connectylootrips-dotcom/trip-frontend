import type { Metadata } from 'next';
import PackagePageLayout, { type PackageData } from '@/components/PackagePageLayout';
import { getPackagePrice } from '@/lib/packagePrices';

export const metadata: Metadata = {
  title: 'Goa Tour Package 2026 — 3 Nights Starting ₹9,999',
  description: 'Book Goa tour packages starting ₹9,999 per person (group rate, min 20 persons, land only). 3 nights / 4 days — North Goa beaches, water sports at Baga, Dudhsagar Falls. Hotel + transfers + 2 activities included.',
  openGraph: {
    title: 'Goa Tour Package 2026 — 3 Nights Starting ₹9,999',
    description: 'Goa group tour package — North Goa beaches, water sports, Dudhsagar Falls, South Goa, Old Goa churches. Hotel + transfers included. Land cost only.',
    url: 'https://www.ylootrips.com/goa-tour-package',
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80', width: 1200, height: 630, alt: 'Goa beach sunset tour package from India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goa Tour Package — ₹9,999 Onwards',
    description: 'North Goa beaches + Water Sports + Dudhsagar Falls + South Goa. Hotel + transfers included. Group rate, land only.',
    images: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80'],
  },
  alternates: { canonical: 'https://www.ylootrips.com/goa-tour-package' },
};

const pkg: PackageData = {
  slug: 'goa-tour-package',
  canonicalUrl: 'https://www.ylootrips.com/goa-tour-package',
  metaTitle: 'Goa Tour Package 2026 — 3 Nights Starting ₹9,999 | YlooTrips',
  metaDescription: 'Book Goa group tour packages starting ₹9,999/person (land only). 3 nights 4 days — North Goa beaches, water sports, Dudhsagar Falls, Old Goa churches. Hotel + transfers included.',
  ogImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',

  heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&q=85',
  heroTitle: 'Goa Tour Package',
  heroSubtitle: 'Beaches · Water Sports · Dudhsagar Falls · Sunset Cruises — Sun, Sand & Spice in 4 Days',
  tagline: 'India\'s Most Popular Beach Destination',

  duration: '3 Nights / 4 Days',
  groupSize: 'Group (Min 20 persons)',
  difficulty: 'Easy (All Ages)',
  startLocation: 'Delhi / Mumbai → Goa (GOI/GOX)',

  priceINR: 9999,
  priceUSD: 120,
  originalPriceINR: 13999,
  depositPercent: 25,

  overview: [
    'Goa — India\'s smallest state and its most famous beach destination — is a world unto itself. Portuguese colonial churches, golden beaches stretching for kilometres, coconut-fringed coastlines, spiced seafood, beach shacks serving cold beer at sunset, and a laid-back vibe that\'s impossible to replicate. Whether you\'re after relaxation, adventure, history, or nightlife, Goa delivers it all.',
    'Our 3-night Goa group package covers both the buzzing North and the serene South. Hit the famous North Goa beaches — Baga, Calangute, Anjuna — for water sports and beach shacks. Explore the baroque splendour of Old Goa\'s UNESCO World Heritage churches. Venture to the majestic Dudhsagar Waterfall — one of India\'s tallest at 310 metres. And unwind on the unspoilt white sands of South Goa\'s Palolem and Agonda beaches.',
    'This is a land-only group package (minimum 20 persons) — flights to Goa are not included. Goa is extremely well-connected with direct flights from Delhi (2.5h), Mumbai (1h), Bangalore (1h), and most major Indian cities. Our package includes hotel, all Goa transfers, water sports, and Dudhsagar Falls jeep safari.',
    'Book with ₹2,500 advance. Free cancellation up to 10 days before departure.',
  ],

  highlights: [
    'Land package (group rate, min 20 persons) — hotel + all Goa transfers included',
    'North Goa beaches — Baga, Calangute, Anjuna, Vagator',
    'Water sports at Baga — jet ski, parasailing, banana boat, bumper boat (included)',
    'Dudhsagar Waterfall jeep safari (310 m, one of India\'s tallest) — included',
    'Optional add-on: Old Goa UNESCO heritage tour',
    'Optional add-on: Mandovi River sunset cruise with dinner',
    'Optional add-on: Spice plantation tour with Goan thali lunch',
    'South Goa beaches — Palolem, Colva, Cola',
    'All transfers in Goa by private AC vehicle',
    '24/7 YlooTrips support throughout',
  ],

  gallery: [
    { src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80', alt: 'Goa beach sunset palm trees', label: 'Goa Beach' },
    { src: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&q=80', alt: 'Dudhsagar Waterfall Goa jeep safari', label: 'Dudhsagar Falls' },
    { src: 'https://images.unsplash.com/photo-1559592413-7cbb1a8d1b68?w=800&q=80', alt: 'Old Goa Basilica of Bom Jesus church', label: 'Old Goa' },
    { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', alt: 'Goa water sports parasailing jet ski', label: 'Water Sports' },
    { src: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80', alt: 'South Goa Palolem beach peaceful', label: 'South Goa' },
  ],

  itinerary: [
    {
      day: 1,
      title: 'Arrive Goa — North Goa Beaches & Beach Shacks',
      description: 'Arrive at Goa Airport (Dabolim/Mopa). Your driver will be waiting at arrivals. Transfer to your hotel in North Goa (Calangute/Baga area — the heart of the action). Check in and head straight to the beach. Baga Beach and Calangute Beach are just minutes away — hire a sunbed, take a dip in the Arabian Sea, and settle into the famous Goa pace. Lunch at a beach shack — try prawn curry rice, fish thali, and bebinca (Goan coconut dessert). Afternoon: wander through the colourful Anjuna Flea Market (Wednesdays only) or explore the boutiques in Arpora. Sundowner drinks at Baga Beach with views of the sunset over the sea. Dinner at one of Goa\'s famous beach restaurants — we recommend Britto\'s, Fiesta, or A Reverie.',
      meals: 'None',
      hotel: '3★ Hotel in North Goa',
      activities: ['Airport pickup', 'Baga and Calangute beaches', 'Beach shack lunch', 'Anjuna Flea Market (Wednesdays)', 'Sunset at Baga'],
    },
    {
      day: 2,
      title: 'Water Sports + Old Goa Heritage + Sunset Cruise',
      description: 'Morning at Baga Beach for Goa\'s famous water sports — your package includes jet ski, parasailing, banana boat ride, and bumper boat. For the brave: try the Flyboard (hovering above water on jets, additional cost) or scuba diving (additional cost, year-round). Late morning, drive to Old Goa — the former Portuguese capital and a UNESCO World Heritage Site. Visit the magnificent Basilica of Bom Jesus (1605), which houses the mortal remains of St. Francis Xavier (shown to public every 10 years). Se Cathedral (1619) is the largest church in Asia. The Church of Our Lady of Immaculate Conception in Panaji is unmissable for its famous white baroque facade. Evening: board the sunset cruise on the Mandovi River — live music, Goan buffet dinner, and glittering city lights from the water.',
      meals: 'Breakfast, Dinner (cruise)',
      hotel: '3★ Hotel in North Goa',
      activities: ['Baga water sports (jet ski, parasailing, banana boat)', 'Old Goa UNESCO churches', 'Basilica of Bom Jesus', 'Sunset Mandovi River cruise with dinner'],
    },
    {
      day: 3,
      title: 'Dudhsagar Waterfall + Spice Plantation',
      description: 'Early start for the most spectacular day of the trip — the Dudhsagar Waterfall jeep safari. Drive deep into the Bhagwan Mahavir Wildlife Sanctuary through dense jungle. Board a 4×4 jeep for the thrilling off-road trail to Dudhsagar — a 310-metre, four-tiered waterfall that plunges into an emerald pool ("Dudhsagar" means Sea of Milk). Take a dip in the natural pool at the base — unforgettable. Return via a Goa spice plantation for a guided tour of cardamom, vanilla, black pepper, turmeric, and cashew trees, followed by a traditional Goan thali lunch under the plantation canopy. Afternoon free — relax at the hotel pool or explore the Mapusa Market for Goan cashews, feni (local spirit), and spices.',
      meals: 'Breakfast, Lunch (spice plantation)',
      hotel: '3★ Hotel in North Goa',
      activities: ['Dudhsagar Falls jeep safari', 'Swimming in waterfall pool', 'Goa spice plantation tour', 'Traditional Goan thali lunch', 'Mapusa Market'],
    },
    {
      day: 4,
      title: 'South Goa Beaches + Departure',
      description: 'Check out of hotel (luggage can be stored). Morning drive to South Goa — a completely different world from the North. Palolem Beach is one of India\'s most beautiful crescent beaches, framed by headlands and lined with coconut palms. Cola Beach (hidden gem, 30-minute walk or boat ride) has a stunning freshwater lagoon meeting the sea. Colva Beach is the longest beach in Goa. South Goa has fewer crowds, calmer water, and a more relaxed atmosphere — perfect for a final morning swim and seafood lunch. Transfer to Goa Airport for your departure.',
      meals: 'Breakfast',
      hotel: 'Departure',
      activities: ['South Goa — Palolem Beach', 'Cola Beach (hidden gem)', 'Colva Beach', 'Seafood lunch', 'Airport transfer & departure'],
    },
  ],

  includes: [
    '3 nights in a 3-star hotel in North Goa (breakfast included)',
    'All transfers in Goa by private AC vehicle',
    'Water sports at Baga: jet ski, parasailing, banana boat, bumper boat',
    'Dudhsagar Waterfall jeep safari (includes entry + jeep)',
    'Dedicated YlooTrips coordinator',
    '24/7 WhatsApp emergency support',
  ],

  excludes: [
    'Flights to/from Goa (book separately — IndiGo/Air India/SpiceJet)',
    'Goa spice plantation tour (optional add-on — ₹1,200/person)',
    'Old Goa heritage tour (optional add-on — ₹800/person)',
    'Mandovi River sunset cruise with dinner (optional add-on — ₹1,500/person)',
    'Travel insurance (recommended — from ₹400/person)',
    'Meals other than daily breakfast',
    'Scuba diving (optional — approx. ₹3,500/person)',
    'Flyboard at Baga (optional — approx. ₹2,500/person)',
    'Anjuna Flea Market purchases',
    'Personal shopping and alcohol',
    'Tips for driver and guide (appreciated)',
    'Any service not explicitly listed as included',
  ],

  reviews: [
    {
      name: 'Priyanka & Vivek',
      country: 'Delhi, India',
      flag: '🇮🇳',
      rating: 5,
      text: 'Our Goa honeymoon was absolutely perfect. The Dudhsagar waterfall was breathtaking and the sunset cruise was so romantic. YlooTrips organised everything seamlessly — we just showed up and enjoyed!',
      date: 'February 2026',
      trip: 'Goa Honeymoon Package',
    },
    {
      name: 'Nikhil Joshi',
      country: 'Pune, India',
      flag: '🇮🇳',
      rating: 5,
      text: 'Went with a group of 8 friends. Best trip ever! Water sports were a blast, the beach shacks had amazing food, and Old Goa was surprisingly beautiful. Would book YlooTrips again without hesitation.',
      date: 'January 2026',
      trip: 'Goa Friends Package',
    },
    {
      name: 'Kavita Singh',
      country: 'Hyderabad, India',
      flag: '🇮🇳',
      rating: 4,
      text: 'First time in Goa and it lived up to the hype. The spice plantation lunch was a highlight I didn\'t expect to enjoy so much! South Goa beaches are stunning. Great value package.',
      date: 'March 2026',
      trip: 'Goa Tour Package',
    },
    {
      name: 'Rohan Mehta',
      country: 'Mumbai, India',
      flag: '🇮🇳',
      rating: 5,
      text: 'Smooth trip from start to finish. Driver was punctual, hotel was clean and close to the beach. Dudhsagar in a jeep was incredible. YlooTrips made it all effortless.',
      date: 'December 2025',
      trip: 'Goa Tour Package',
    },
  ],

  avgRating: 4.8,
  reviewCount: 3210,

  faqs: [
    {
      question: 'What is the best time to visit Goa?',
      answer: 'November to February is peak season — clear skies, 27–32°C, calm sea, and all beach shacks open. This is also the busiest and most expensive period. March to May is hot but beach activities continue. June to September is monsoon — dramatic green landscapes, Dudhsagar at its fullest, but rough seas mean water sports are suspended. October is shoulder season — beaches recovering, fewer crowds, better prices.',
    },
    {
      question: 'How much does a Goa trip cost from Delhi?',
      answer: 'Our Goa group land package starts at ₹9,999 per person (minimum 20 persons) for 3 nights. This includes 3-star hotel, water sports at Baga, and Dudhsagar jeep safari. Old Goa tour, spice plantation, and sunset cruise are optional add-ons. Flights to Goa are not included — book separately from Delhi/Mumbai/Bangalore. Budget ₹3,000–₹5,000 extra for flights, optional activities, meals, beach shopping, or nightlife.',
    },
    {
      question: 'Is Goa suitable for families with children?',
      answer: 'Absolutely. Goa is excellent for families. South Goa (Palolem, Colva) has calmer waters ideal for children. Dudhsagar waterfall is a favourite with kids. Old Goa churches and the spice plantation are educational and fun. Most hotels have pools. We recommend families stay in South Goa for a calmer experience.',
    },
    {
      question: 'What is the difference between North and South Goa?',
      answer: 'North Goa (Calangute, Baga, Anjuna, Vagator) is lively, touristy, and packed with beach shacks, water sports, nightlife, and markets. South Goa (Palolem, Agonda, Cola, Colva) is quieter, more scenic, and less commercialised — better for relaxation and honeymooners. Our package covers both.',
    },
    {
      question: 'Is Goa safe for solo female travelers?',
      answer: 'Goa is generally safe and very popular with solo female travelers, especially North Goa which has an established international tourist community. We recommend using our private transfers (avoid shared autos at night), staying in the main tourist areas, and keeping our WhatsApp number saved. Standard precautions apply as with any tourist destination.',
    },
    {
      question: 'Can I extend this package to 5 or 7 nights?',
      answer: 'Yes — we offer Goa packages from 2 nights to 7 nights. A longer stay lets you explore Chapora Fort, Anjuna Cliff, the hidden Butterfly Beach, the Indo-Portuguese mansions of Fontainhas, and a day trip to Dudhsagar by train (the famous train journey). WhatsApp us at +91-84278-31127 for a custom quote.',
    },
  ],

  related: [
    { title: 'Kerala Tour Package — 5 Nights', href: '/kerala-tour-package', priceINR: 15999, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80' },
    { title: 'Manali Tour Package — 4 Nights', href: '/manali-tour-package', priceINR: 6999, image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80' },
    { title: 'Bali Honeymoon Package — 6 Nights', href: '/bali-honeymoon-package', priceINR: 52499, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80' },
  ],

  priceNote: 'Group rate · Min 20 persons · Land only · Flights not included',

  whatsappMsg: "Hi! I'm interested in the Goa Group Tour Package (3 nights ₹9,999/person, land only, min 20 persons). Please share availability and details.",
  bookingHref: '/contact?package=goa-tour-package',

  schemaHighlights: ['North Goa beaches and water sports', 'Dudhsagar Waterfall jeep safari', 'Old Goa UNESCO heritage churches', 'Mandovi River sunset cruise', 'South Goa Palolem beach'],

  mustVisitPlaces: [
    {
      name: 'Baga & Calangute Beach',
      description: 'North Goa\'s most famous beaches — Baga with its water sports and beach shacks, Calangute with its evening market and restaurants. The 7km stretch is the heart of Goa\'s beach culture.',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
      type: 'beach',
      tip: 'Hit the water sports at Baga by 9am before waves get rough. Sunset drinks at Tito\'s Lane or Britto\'s restaurant are the classic Goa ending.',
    },
    {
      name: 'Dudhsagar Waterfall',
      description: 'A 310-metre four-tiered waterfall plunging into an emerald pool inside the Bhagwan Mahavir Wildlife Sanctuary. The name means "Sea of Milk" — monsoon turns it into a roaring white cascade visible from 5km away.',
      image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&q=80',
      type: 'nature',
      tip: 'The jeep safari trail (10km off-road) is only navigable in dry season (Oct–May). Monsoon visits are spectacular but the pool is too dangerous to swim in.',
    },
    {
      name: 'Old Goa — Basilica of Bom Jesus',
      description: 'A 1605 UNESCO World Heritage baroque church housing the mortal remains of St. Francis Xavier — the patron saint of Goa, whose body has been displayed publicly in a silver casket for 450+ years.',
      image: 'https://images.unsplash.com/photo-1559592413-7cbb1a8d1b68?w=800&q=80',
      type: 'landmark',
      tip: 'The body is displayed publicly every 10 years (next in 2034). Year-round the casket is viewable through glass from the nave. Visit at 6am for the dawn mass.',
    },
    {
      name: 'South Goa — Palolem Beach',
      description: 'A crescent-shaped bay framed by two rocky headlands and framed with coconut palms — consistently voted one of India\'s most beautiful beaches. Far calmer, cleaner, and quieter than North Goa.',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
      type: 'beach',
      tip: 'The hidden Cola Beach (7km from Palolem) has a freshwater lagoon meeting the sea — take a boat from Palolem or walk 30 minutes over the headland.',
    },
  ],

  packageActivities: [
    {
      name: 'Baga Water Sports Package',
      description: 'Jet ski, parasailing, banana boat, and bumper boat — all in one session at Baga Beach with certified operators. The parasailing 500-foot ascent over the Arabian Sea is the standout.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      duration: '2–3 hours',
      cost: 'Included in package',
    },
    {
      name: 'Dudhsagar Jeep Safari',
      description: 'A thrilling 4×4 off-road journey through 10km of jungle tracks inside the wildlife sanctuary, ending at the base of the 310m waterfall with a swim in the natural pool.',
      image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&q=80',
      duration: 'Full day (7am–5pm)',
      cost: 'Included in package',
    },
    {
      name: 'Goa Spice Plantation Tour (Optional)',
      description: 'A guided walk through cardamom, vanilla, pepper, turmeric, and cashew trees, ending with a traditional Goan thali lunch under the plantation canopy. One of Goa\'s best non-beach experiences.',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
      duration: '3–4 hours',
      cost: '₹1,200/person add-on',
    },
  ],

  travelTips: [
    'November–February is peak season (best weather, all shacks open). March–May is warm but quieter. June–September monsoon — rough sea, dramatic rain, many shacks close.',
    'Book Dudhsagar jeep safari from Oct 16 onwards when the sanctuary reopens after monsoon. The waterfall is fullest in this period.',
    'Goa has no Uber/Ola — use Rapido bike taxis (fastest, cheapest), GoaMiles app, or pre-arranged hotel transfers.',
    'The GoaPass (tourist transport card, ₹500/day) gives unlimited rides on Goa\'s electric bus network — excellent value for North Goa beach hopping.',
    'Feni (cashew spirit) is Goa\'s signature alcohol — try it at a local bar, not the tourist restaurants. King\'s Beer is the local lager, made in Goa.',
    'This is a group package (minimum 20 persons) — ideal for office trips, college reunions, and large family holidays. WhatsApp us to check if an existing group date suits you.',
  ],
};

export default async function GoaTourPackagePage() {
  const prices = await getPackagePrice('goa-tour-package');
  return <PackagePageLayout pkg={{ ...pkg, ...prices }} />;
}
