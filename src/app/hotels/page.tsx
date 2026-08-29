import type { Metadata } from 'next';
import { Suspense } from 'react';
import HotelSearch from '@/components/HotelSearch';

export const metadata: Metadata = {
  title: 'Hotel Search — Live Rates for India',
  description:
    'Search live hotel rates across India. Compare prices, amenities, and ratings — then book through YlooTrips for the best deal.',
  openGraph: {
    title: 'Find Hotels in India — Live Rates',
    description: 'Compare live hotel prices across India. Powered by Google Hotels.',
    url: 'https://www.ylootrips.com/hotels',
  },
};

export default function HotelsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-light" />}>
      <HotelSearch />
    </Suspense>
  );
}
