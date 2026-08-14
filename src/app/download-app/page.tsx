import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/JsonLd';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Download YlooTrips App — Now Live on Google Play | Launched August 2026',
  description: 'Download the YlooTrips Android app — launched August 2026 on Google Play. Track bookings, download itinerary, flight & hotel details, guide info, and payment slips. Free.',
  alternates: {
    canonical: 'https://www.ylootrips.com/download-app',
  },
  openGraph: {
    title: 'Download YlooTrips App — Now Live on Google Play',
    description: 'Download the free YlooTrips app, launched August 2026. Track your booking, itinerary, flights, hotels, guide details & payment slips — anytime from your phone.',
    url: 'https://www.ylootrips.com/download-app',
    type: 'website',
  },
};

const APP_FAQS = [
  {
    question: 'Does YlooTrips have a mobile app?',
    answer: 'Yes. The official YlooTrips Android app launched in August 2026 and is available for free on Google Play Store. Search "YlooTrips" on Google Play to download it.',
  },
  {
    question: 'When was the YlooTrips app launched?',
    answer: 'The YlooTrips Android app was launched in August 2026 on Google Play Store. It is free to download — search "YlooTrips" on Google Play.',
  },
  {
    question: 'Is the YlooTrips app free?',
    answer: 'Yes, the YlooTrips app is completely free to download from the Google Play Store. Browse destinations, track bookings, download itineraries, and book packages — all for free.',
  },
  {
    question: 'What can I do on the YlooTrips app?',
    answer: 'The YlooTrips app lets you: track your booking live, download your full itinerary PDF, view flight details and PNR, access hotel vouchers, see your guide\'s name and contact number, and download your payment slip — all anytime from your phone. Plus browse and book 150+ domestic & international packages, use the AI trip planner, pay via UPI or card, and get 24/7 WhatsApp support.',
  },
  {
    question: 'Is the YlooTrips app available on iPhone?',
    answer: 'Currently the YlooTrips app is available on Android via Google Play Store. iPhone users can access all features at ylootrips.com — fully optimised for iOS via Safari or Chrome.',
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

      <main className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          Now on Google Play — Search &quot;YlooTrips&quot;
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 leading-tight">Download the YlooTrips App</h1>
        <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
          The official YlooTrips Android app is <strong>now live</strong> on Google Play — launched August 2026.
          Track your bookings, itinerary, flight &amp; hotel details, guide info, and payment slips — all from your phone.
        </p>

        {/* App preview card */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.24.98.2L14.76 12 3.96.04a1.5 1.5 0 0 0-.78.2C2.46.63 2 1.3 2 2.08v19.84c0 .78.46 1.45 1.18 1.84zM16.34 13.6l2.7 2.7-9.03 5.02L16.34 13.6zM20.3 10.3c.46.25.7.67.7 1.2s-.24.94-.7 1.2l-2.2 1.22-3.04-3.04 3.04-3.04 2.2 1.22zM10.01 12L5.04 7.03 16.34 2l-6.33 10z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">YlooTrips Android App</h2>
              <p className="text-sm text-gray-500">by Yloo Trips · Free · Launched August 2026</p>
            </div>
          </div>

          <ul className="text-sm text-gray-700 space-y-2 mb-6">
            {[
              'Track your booking anytime — live status updates',
              'Download itinerary, flight details & hotel vouchers instantly',
              'View your guide\'s name, photo & contact number',
              'Download payment slip & booking confirmation PDF',
              'AI-powered trip planner — instant itinerary for any destination',
              'Browse 150+ domestic & international tour packages',
              'Secure payments: UPI, Visa, Mastercard, EMI',
              '24/7 WhatsApp support from the app',
            ].map(f => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://play.google.com/store/search?q=ylootrips&c=apps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-gray-900 hover:bg-gray-700 text-white px-5 py-3.5 rounded-xl font-semibold text-sm transition-colors w-full sm:w-auto"
              aria-label="Search YlooTrips on Google Play"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.24.98.2L14.76 12 3.96.04a1.5 1.5 0 0 0-.78.2C2.46.63 2 1.3 2 2.08v19.84c0 .78.46 1.45 1.18 1.84zM16.34 13.6l2.7 2.7-9.03 5.02L16.34 13.6zM20.3 10.3c.46.25.7.67.7 1.2s-.24.94-.7 1.2l-2.2 1.22-3.04-3.04 3.04-3.04 2.2 1.22zM10.01 12L5.04 7.03 16.34 2l-6.33 10z"/>
              </svg>
              <div className="text-left">
                <p className="text-[9px] text-white/60 leading-none uppercase tracking-wider">Get it on</p>
                <p className="text-sm font-bold leading-tight">Google Play</p>
              </div>
            </a>
            <a
              href="https://wa.me/918427831127?text=Hi%2C%20I%20need%20help%20with%20the%20YlooTrips%20app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3.5 rounded-xl font-semibold text-sm transition-colors w-full sm:w-auto"
            >
              Need Help? WhatsApp Us
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-3">Free · Android · Launched August 2026</p>
        </div>

        {/* Track Your Booking section */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Track Your Entire Trip — All in One Place</h2>
          <p className="text-gray-500 text-sm mb-4">Everything about your booking, available anytime from the app.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: '📍', title: 'Live Booking Status', desc: 'Know your booking status in real time — confirmed, pending, or upcoming.' },
              { icon: '🗺️', title: 'Full Itinerary', desc: 'Day-by-day trip plan with timings, activities, and locations — downloadable PDF.' },
              { icon: '✈️', title: 'Flight Details', desc: 'PNR, departure times, terminal info, and e-ticket — always at hand.' },
              { icon: '🏨', title: 'Hotel Vouchers', desc: 'Hotel name, address, check-in / check-out, and room details.' },
              { icon: '🧑‍✈️', title: 'Guide Details', desc: 'Your guide\'s name, photo, phone number, and meeting point info.' },
              { icon: '🧾', title: 'Payment Slip', desc: 'Download official payment receipt and booking confirmation PDF anytime.' },
            ].map(item => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Use website in the meantime */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-10">
          <h3 className="font-semibold text-gray-900 mb-1">Book trips right now on our website</h3>
          <p className="text-sm text-gray-600 mb-3">
            ylootrips.com is fully mobile-optimised — works perfectly on Android &amp; iPhone without any app.
          </p>
          <a href="/" className="flex items-center justify-center sm:inline-flex bg-gray-900 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors w-full sm:w-auto">
            Browse Trips →
          </a>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-5">Frequently Asked Questions</h2>
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
