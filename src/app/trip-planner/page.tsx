import type { Metadata } from 'next';
import { Suspense } from 'react';
import TripPlannerChat from '@/components/TripPlannerChat';

export const metadata: Metadata = {
  title: 'Free AI Trip Planner — Day-by-Day Itinerary for Dubai, Goa, Bali, Thailand & More',
  description: 'Plan your perfect trip with YlooTrips free AI trip planner. Get instant day-by-day itineraries for Dubai, Goa, Bali, Thailand, Vietnam, Kashmir, Manali, Kerala and 100+ destinations. Free personalised travel planning.',
  keywords: 'AI trip planner, free trip planner, travel itinerary planner, Dubai trip planner, Goa trip planner, Bali trip planner, Thailand trip planner, Vietnam itinerary, trip planner India, holiday planner, travel planner free, ylootrips',
  alternates: { canonical: 'https://www.ylootrips.com/trip-planner' },
  openGraph: {
    title: 'Free AI Trip Planner — Instant Itineraries for Any Destination',
    description: 'Get a free personalised day-by-day itinerary in seconds for Dubai, Goa, Bali, Thailand, Vietnam, Kashmir, Manali, Kerala and more.',
    url: 'https://www.ylootrips.com/trip-planner',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'YlooTrips Free AI Trip Planner',
  url: 'https://www.ylootrips.com/trip-planner',
  description: 'Free AI-powered trip planner that generates personalised day-by-day travel itineraries for any destination — Dubai, Goa, Bali, Thailand, Vietnam, Kashmir, Manali, Kerala and 100+ more.',
  applicationCategory: 'TravelApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  provider: {
    '@type': 'TravelAgency',
    name: 'YlooTrips',
    url: 'https://www.ylootrips.com',
    telephone: '+91-84278-31127',
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '25000' },
  },
  featureList: [
    'AI-generated day-by-day itineraries',
    'Dubai trip planning',
    'Goa trip planning',
    'Bali holiday planning',
    'Thailand travel itinerary',
    'Vietnam trip planner',
    'Kashmir tour planning',
    'Manali trip planning',
    'Kerala backwaters itinerary',
    'Budget travel planning',
    'Honeymoon package planning',
    'Family trip planning',
    'Free to use',
  ],
};

export default function TripPlannerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Static SEO content — crawlable by Google */}
      <div className="sr-only">
        <h1>Free AI Trip Planner — Plan Your Perfect Holiday with YlooTrips</h1>
        <p>
          YlooTrips AI Trip Planner helps you plan personalised day-by-day travel itineraries
          for any destination — completely free. Whether you are planning a Dubai trip, Goa holiday,
          Bali honeymoon, Thailand vacation, Vietnam tour, Kashmir trip, Manali getaway, or Kerala
          backwaters tour, our AI travel planner creates a custom itinerary in seconds.
        </p>
        <h2>Popular Trip Destinations</h2>
        <ul>
          <li>Dubai trip planner — 5 nights 6 days packages from ₹35,000 per person</li>
          <li>Goa trip planner — 4 nights 5 days beach holidays from ₹12,000 per person</li>
          <li>Bali trip planner — 5 nights 6 days honeymoon packages from ₹30,000 per person</li>
          <li>Thailand trip planner — Bangkok, Phuket, Pattaya itineraries from ₹28,000 per person</li>
          <li>Vietnam trip planner — 6 nights 7 days tours from ₹30,000 per person</li>
          <li>Kashmir trip planner — Srinagar, Gulmarg, Pahalgam tours from ₹18,000 per person</li>
          <li>Manali trip planner — Himachal Pradesh holidays from ₹15,000 per person</li>
          <li>Kerala trip planner — backwaters and beaches from ₹20,000 per person</li>
          <li>Singapore trip planner — 4 nights 5 days packages from ₹35,000 per person</li>
          <li>Maldives trip planner — luxury overwater packages from ₹55,000 per person</li>
        </ul>
        <h2>Why Use YlooTrips AI Trip Planner?</h2>
        <ul>
          <li>100% free AI-generated itineraries</li>
          <li>Personalised day-by-day travel plans</li>
          <li>Budget estimates in Indian Rupees</li>
          <li>Book directly with YlooTrips — India&apos;s trusted travel experts since 2012</li>
          <li>25,000+ happy travellers from 40+ countries</li>
          <li>4.9 star Google rating</li>
          <li>EMI options available on all bookings</li>
        </ul>
      </div>
      <Suspense fallback={<div className="min-h-screen bg-cream-light animate-pulse"><div className="bg-primary h-56" /></div>}>
        <TripPlannerChat />
      </Suspense>
    </>
  );
}
