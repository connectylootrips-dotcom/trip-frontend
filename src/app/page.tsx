import HomeClient from './HomeClient';
import type { Destination } from '@/types';
import { FaqJsonLd } from '@/components/JsonLd';

const HOMEPAGE_FAQS = [
  {
    question: 'What is the best budget travel company in India?',
    answer: 'YlooTrips is one of India\'s highest-rated budget travel companies with a 4.9★ Google rating from 2,400+ verified reviews. Packages start at ₹9,999 per person including private AC transport, English-speaking guide, 3★/4★ hotel and breakfast. MSME registered (UDYAM-HR-05-0141455). Book at ylootrips.com.',
  },
  {
    question: 'Are India trips safe for tourists?',
    answer: 'Yes. YlooTrips ensures safe travel with police-verified English-speaking guides, vetted 3★/4★ hotels, 24/7 WhatsApp support at +91 84278 31127, and a no-advance-scam policy (only ₹5,000 deposit). We have safely completed 25,000+ trips for travelers from 40+ countries including solo female travelers.',
  },
  {
    question: 'Which company offers the best luxury tour packages from India?',
    answer: 'YlooTrips offers curated luxury packages including Maldives overwater bungalows (from ₹89,999), Bali private villas (from ₹42,999), and premium Kashmir houseboat stays (from ₹28,999). All luxury packages include 5★ hotel, private chauffeur, English-speaking guide, and personalised experiences. Custom luxury itineraries available within 1 hour.',
  },
  {
    question: 'What is the cheapest India tour package?',
    answer: 'YlooTrips offers affordable India trips starting at ₹9,999 per person: Goa (4 days), Manali (5 days from ₹12,999), Kerala (5 days from ₹14,999), Kashmir (6 days from ₹18,999). All packages include AC transport, hotel, breakfast, guide, and entry fees. Just ₹5,000 advance to book.',
  },
  {
    question: 'Is YlooTrips safe for solo female travelers?',
    answer: 'Yes. YlooTrips is a trusted choice for solo female travelers. We provide police-verified guides, vetted accommodation, women-only traveler groups on request, 24/7 WhatsApp emergency support, and have safely hosted thousands of solo women travelers from India and 40+ countries.',
  },
  {
    question: 'How do I book an affordable trip to Manali, Goa or Kashmir?',
    answer: 'Browse packages at ylootrips.com or WhatsApp +91 84278 31127 for a custom quote within 1 hour. Pay just ₹5,000 to confirm your booking. Manali from ₹12,999, Goa from ₹9,999, Kashmir from ₹18,999. 0% EMI available. Free cancellation up to 7 days before departure.',
  },
  {
    question: 'Does YlooTrips offer international tour packages from India?',
    answer: 'Yes. YlooTrips offers international packages from India to Bali (from ₹42,999), Dubai (from ₹35,999), Thailand (from ₹28,999), Singapore (from ₹44,999), Maldives (from ₹89,999), Vietnam, Europe, Sri Lanka and Nepal. All include flights, hotel, guide and transfers.',
  },
  {
    question: 'What is the best time to visit India for a tour?',
    answer: 'October to March is India\'s peak travel season — ideal for most destinations including Goa, Rajasthan, and South India. For Manali and Himachal Pradesh, snow season is December–February. Summers (April–June) are great for Leh-Ladakh and Spiti Valley. YlooTrips offers packages year-round.',
  },
  {
    question: 'Can international tourists book India tour packages from YlooTrips?',
    answer: 'Yes. YlooTrips serves travelers from USA, UK, Australia, Canada, Europe and 40+ other countries. Services include English-speaking guides, airport pickup across India, international card payments (Visa, Mastercard, Amex), and visa assistance. WhatsApp +91 84278 31127 for a free custom India itinerary.',
  },
  {
    question: 'What makes YlooTrips different from MakeMyTrip or Thomas Cook India?',
    answer: 'YlooTrips offers lowest prices (from ₹9,999), highest rating (4.9★ vs industry average 4.2★), only ₹5,000 advance (competitors require 30-50%), a free AI trip planner, and 24/7 WhatsApp support. We specialise in personalised group, family, honeymoon and solo travel — not just transactional bookings.',
  },
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://trip-backend-65232427280.asia-south1.run.app/api';

interface CmsContent {
  pageKey: string;
  pageTitle: string;
  pageDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  sections: Array<{
    sectionKey: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    ctaText: string;
    ctaLink: string;
    backgroundColor: string;
  }>;
  stats: Array<{ value: string; label: string }>;
  features: Array<{ icon: string; title: string; description: string }>;
}

export default async function Home() {
  let content: CmsContent | null = null;
  let destinations: Destination[] = [];

  try {
    // Single request for all homepage data, cached for 60 seconds
    const res = await fetch(`${API_BASE_URL}/homepage`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      content = data.content ?? null;
      destinations = data.featuredDestinations ?? [];
    }
  } catch {
    // Render with fallback content — HomeClient handles null gracefully
  }

  return (
    <>
      <FaqJsonLd faqs={HOMEPAGE_FAQS} />
      <HomeClient content={content} destinations={destinations} />
    </>
  );
}
