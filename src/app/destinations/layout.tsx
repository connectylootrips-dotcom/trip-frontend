import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'India Destinations — Explore Rajasthan, Kerala, Himalayas & More',
    template: '%s | YlooTrips',
  },
  description: 'Discover 150+ India travel destinations — Rajasthan palaces, Kerala backwaters, Himalayan treks, Goa beaches, and cultural hubs. Plan your perfect India journey with YlooTrips.',
  openGraph: {
    title: 'India Destinations | YlooTrips — India Travel Experts',
    description: 'Explore 150+ India destinations — Rajasthan palaces, Kerala backwaters, Himalayan treks, Goa beaches. Curated by travel experts.',
    url: 'https://www.ylootrips.com/destinations',
    images: [
      {
        url: 'https://www.ylootrips.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'India destinations — Rajasthan, Kerala, Himalaya, Goa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Destinations',
    description: 'Explore 150+ India destinations — Rajasthan, Kerala, Himalaya, Goa and beyond.',
    images: ['https://www.ylootrips.com/og-image.jpg'],
  },
  alternates: { canonical: 'https://www.ylootrips.com/destinations' },
};

export default function DestinationsLayout({ children }: { children: ReactNode }) {
  return children;
}
