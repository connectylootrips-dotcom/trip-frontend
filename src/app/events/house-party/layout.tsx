import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'House Party Vibes — Delhi NCR | YLOO Trips | 5 September 2026',
  description:
    'Book your spot at YLOO\'s House Party in Gurugram on 5 Sept 2026. DJ all night, chef food, BYOB welcome, safety-first venue. Female ₹499 · Stag ₹1,999 · Couple ₹1,999. Come Single. Go Mingle.',
  keywords: [
    'house party delhi',
    'house party gurugram',
    'BYOB party delhi ncr',
    'travel party delhi',
    'singles party gurgaon',
    'DJ night gurgaon 2026',
    'ylootrips events',
    'travel tribe party',
  ],
  openGraph: {
    title: 'House Party Vibes — Come Single. Go Mingle. 🎉',
    description:
      'DJ all night · Chef food · BYOB welcome · 21+ · Safety-first. Book your ticket now — Female ₹499, Stag ₹1,999, Couple ₹1,999. Gurugram, 5 Sept 2026.',
    url: 'https://www.ylootrips.com/events/house-party',
    siteName: 'YLOO Trips',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574270981993-49ccc2e7f63e?w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'YLOO House Party — Delhi NCR',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House Party Vibes — Come Single. Go Mingle. 🎉',
    description: 'DJ all night · Chef food · BYOB · 21+ · Gurugram, 5 Sept 2026. Book now on ylootrips.com',
    images: ['https://images.unsplash.com/photo-1574270981993-49ccc2e7f63e?w=1200&q=85'],
  },
};

export default function HousePartyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
