import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Travel Management — Group Bookings & MICE',
  description: 'YlooTrips handles corporate travel, team outings, MICE trips, and incentive tours across India & abroad. GST invoicing, dedicated account manager, volume discounts for 10+ employees. Get a quote in 4 hours.',
  openGraph: {
    title: 'Corporate Travel Management — GST Invoicing & Group Discounts',
    description: 'Team outings, incentive trips, MICE events, and corporate holidays. GST-compliant invoicing, volume discounts, dedicated account manager. 25,000+ travelers served.',
    url: 'https://www.ylootrips.com/corporate-travel',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Corporate travel management and team outing packages India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Travel | YlooTrips — Group Bookings & MICE',
    description: 'GST invoicing, volume discounts, dedicated account manager. Quote in 4 hours.',
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80'],
  },
  alternates: { canonical: 'https://www.ylootrips.com/corporate-travel' },
};

export default function CorporateTravelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
