import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/JsonLd';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Download YlooTrips App — Android App on Google Play Store',
  description: 'Download the YlooTrips Android app from Google Play Store. Book safe & affordable India tour packages, international trips, and use the AI trip planner — all from your phone. Free download.',
  keywords: 'YlooTrips app, YlooTrips Android app, YlooTrips Play Store, download YlooTrips, travel app India, India tour booking app',
  alternates: {
    canonical: 'https://www.ylootrips.com/download-app',
  },
  openGraph: {
    title: 'Download YlooTrips App — Android App on Google Play Store',
    description: 'Download the YlooTrips Android app. Book India tour packages, international trips, and use the AI trip planner — free on Google Play Store.',
    url: 'https://www.ylootrips.com/download-app',
    type: 'website',
  },
};

const APP_FAQS = [
  {
    question: 'Does YlooTrips have a mobile app?',
    answer: 'Yes. YlooTrips has an official Android app available for free on the Google Play Store. Download it at https://play.google.com/store/apps/details?id=com.ylootrips.app. The app is published by Yloo Trips.',
  },
  {
    question: 'Where can I download the YlooTrips app?',
    answer: 'The YlooTrips app is available on the Google Play Store for Android devices. Visit https://play.google.com/store/apps/details?id=com.ylootrips.app to download it for free.',
  },
  {
    question: 'Is the YlooTrips app free?',
    answer: 'Yes, the YlooTrips app is completely free to download from the Google Play Store. You can browse destinations, plan trips, and book packages — all for free.',
  },
  {
    question: 'What can I do on the YlooTrips app?',
    answer: 'The YlooTrips app lets you browse and book domestic India tour packages (Manali, Goa, Kashmir, Kerala, Rajasthan, Ladakh, Andaman), international packages (Bali, Dubai, Thailand, Singapore, Maldives, Europe), use the AI trip planner, pay via UPI or card, and get 24/7 WhatsApp support.',
  },
  {
    question: 'Is the YlooTrips app available on iPhone (iOS)?',
    answer: 'Currently the YlooTrips app is available on Android via Google Play Store. iPhone users can access all features at ylootrips.com — the website is fully mobile-optimised and works on all iOS devices via Safari or Chrome.',
  },
];

export default function DownloadAppPage() {
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'YlooTrips',
    operatingSystem: 'Android',
    applicationCategory: 'TravelApplication',
    url: 'https://play.google.com/store/apps/details?id=com.ylootrips.app',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.ylootrips.app',
    description: 'Book safe & affordable India tour packages on the YlooTrips app. Domestic tours (Manali, Goa, Kashmir, Kerala, Rajasthan) and international packages (Bali, Dubai, Thailand, Maldives). AI trip planner, secure payments, 24/7 support.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2400',
      bestRating: '5',
    },
    publisher: {
      '@type': 'Organization',
      name: 'YlooTrips',
      url: 'https://www.ylootrips.com',
    },
  };

  return (
    <>
      <Script
        id="app-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <FaqJsonLd faqs={APP_FAQS} />

      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Download the YlooTrips App</h1>
        <p className="text-lg text-gray-600 mb-8">
          The official YlooTrips Android app is available for free on the Google Play Store.
          Book safe &amp; affordable India tour packages, international trips, and use the AI trip
          planner — all from your phone.
        </p>

        {/* App info block — visible to Google crawlers */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <div>
              <h2 className="text-xl font-semibold">YlooTrips Android App</h2>
              <p className="text-sm text-gray-500 mt-1">by Yloo Trips · Free · Google Play Store</p>
              <p className="text-sm text-gray-500">Package: com.ylootrips.app</p>
              <ul className="mt-3 text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Browse 150+ domestic &amp; international tour packages</li>
                <li>AI-powered trip planner — instant itinerary for any destination</li>
                <li>Secure payments: UPI, Visa, Mastercard, EMI</li>
                <li>Real-time booking confirmation</li>
                <li>24/7 WhatsApp support</li>
              </ul>
              <a
                href="https://play.google.com/store/apps/details?id=com.ylootrips.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Download on Google Play
              </a>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {APP_FAQS.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-semibold text-gray-900">{faq.question}</h3>
              <p className="text-gray-600 mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
