import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Luxury International Tour Packages from India — 5★ Hotels & Private Transfers',
  description: 'Book premium luxury international tour packages from India. Maldives overwater villas, Bali private pool resorts, Europe first class, Dubai 5★ stays. Handcrafted itineraries with private guides and transfers. Starting ₹45,000.',
  openGraph: {
    title: 'Luxury International Packages from India — Maldives, Bali, Europe & More | YlooTrips',
    description: 'Premium holidays with 5★ hotels, private transfers, and dedicated concierge. Maldives, Bali, Europe, Dubai, Japan. Handcrafted by YlooTrips.',
    url: 'https://www.ylootrips.com/luxury-international-packages',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Luxury international tour packages — Maldives overwater villa and 5 star resorts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury International Packages | YlooTrips — 5★ Hotels & Private Transfers',
    description: 'Maldives, Bali, Europe, Dubai — handcrafted luxury holidays from India. Private guides, overwater villas, butler service.',
    images: ['https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80'],
  },
  alternates: { canonical: 'https://www.ylootrips.com/luxury-international-packages' },
};

const PACKAGES = [
  {
    destination: 'Maldives',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    duration: '5N / 6D',
    price: '₹85,000',
    tag: 'Most Luxurious',
    highlights: ['Overwater villa', 'Private beach dinner', 'Dolphin cruise', 'Snorkelling & diving'],
    href: '/maldives-luxury-package',
  },
  {
    destination: 'Bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    duration: '6N / 7D',
    price: '₹62,000',
    tag: 'Honeymoon Favourite',
    highlights: ['Private pool villa', 'Volcano sunrise trek', 'Temple ceremonies', 'Spa & wellness'],
    href: '/bali-honeymoon-package',
  },
  {
    destination: 'Europe',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    duration: '10N / 11D',
    price: '₹1,95,000',
    tag: 'Grand Tour',
    highlights: ['4★ & 5★ hotels', 'Private city tours', 'Schengen visa support', 'Airport transfers'],
    href: '/europe-tour-package-from-india',
  },
  {
    destination: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    duration: '5N / 6D',
    price: '₹70,000',
    tag: 'Opulence & Adventure',
    highlights: ['5★ hotel stay', 'Burj Khalifa At The Top', 'Desert safari luxury camp', 'Private yacht'],
    href: '/dubai-tour-package-from-delhi',
  },
  {
    destination: 'Japan',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    duration: '8N / 9D',
    price: '₹1,50,000',
    tag: 'Culture & Modernity',
    highlights: ['Ryokan (traditional inn)', 'Bullet train pass', 'Private tea ceremony', 'Mt. Fuji excursion'],
    href: '/japan-tour-package',
  },
  {
    destination: 'Kenya Safari',
    image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80',
    duration: '7N / 8D',
    price: '₹1,80,000',
    tag: 'Luxury Wildlife',
    highlights: ['Luxury lodge in Masai Mara', 'Private game drives', 'Hot air balloon safari', 'Bush dinners'],
    href: '/kenya-safari-package',
  },
];

const INCLUSIONS = [
  { icon: '🏨', title: '5★ / Boutique Hotels', desc: 'Carefully selected luxury properties — overwater villas, heritage palaces, and design hotels.' },
  { icon: '🚗', title: 'Private Transfers', desc: 'Airport pick-up, hotel drop, and all inter-city travel in private, air-conditioned vehicles.' },
  { icon: '🧳', title: 'Dedicated Concierge', desc: 'A personal travel manager on WhatsApp before and during your trip. Available 24/7.' },
  { icon: '🎟️', title: 'Pre-booked Experiences', desc: 'Tickets, reservations, and guided experiences pre-arranged — no queuing on holiday.' },
  { icon: '📋', title: 'Visa Assistance', desc: 'Documentation guidance and visa processing support for all international destinations.' },
  { icon: '🛡️', title: 'Travel Insurance', desc: 'Comprehensive travel insurance included — medical emergencies, trip cancellations, and luggage.' },
];

const WHATSAPP_URL = 'https://wa.me/918427831127?text=Hi%2C%20I%27m%20interested%20in%20a%20luxury%20international%20package.';

export default function LuxuryInternationalPackagesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative bg-primary text-cream py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #c4a77d 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="section-container relative text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
            Luxury International
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
            The World&apos;s Finest<br />
            <span className="text-accent italic">Crafted for You</span>
          </h1>
          <p className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Overwater villas, private guided tours, 5-star restaurants, and butlers on speed dial. Handcrafted luxury international packages from India — because some trips deserve to be extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-bold py-4 px-8 rounded-xl text-base hover:bg-accent/90 transition-all shadow-lg"
            >
              Plan My Luxury Trip
            </a>
            <Link
              href="/trips"
              className="inline-flex items-center justify-center gap-2 bg-cream/10 text-cream font-semibold py-4 px-8 rounded-xl text-base hover:bg-cream/15 border border-cream/20 transition-all"
            >
              Browse All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Packages grid */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Featured Luxury Packages</h2>
            <p className="text-muted text-base max-w-xl mx-auto">Every package includes 5★ accommodation, private transfers, and a dedicated travel manager.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <Link key={pkg.destination} href={pkg.href} className="group block bg-white border border-sand/30 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pkg.image}
                    alt={`${pkg.destination} luxury tour package from India`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">{pkg.tag}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-xl font-bold text-primary">{pkg.destination}</h3>
                    <span className="text-muted text-sm">{pkg.duration}</span>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {pkg.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-3 border-t border-sand/20">
                    <div>
                      <span className="text-xs text-muted">Starting from</span>
                      <div className="text-primary font-bold text-lg">{pkg.price} <span className="text-xs font-normal text-muted">/ person</span></div>
                    </div>
                    <span className="text-accent text-sm font-semibold">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <section className="py-16 bg-primary/[0.03] border-y border-sand/20">
        <div className="section-container">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">What&apos;s Always Included</h2>
            <p className="text-muted text-base max-w-xl mx-auto">Every luxury package comes with these non-negotiables — because details make the difference.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INCLUSIONS.map((inc) => (
              <div key={inc.title} className="bg-white border border-sand/30 rounded-2xl p-6">
                <div className="text-3xl mb-3">{inc.icon}</div>
                <h3 className="font-semibold text-primary mb-2">{inc.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{inc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '25,000+', label: 'Travelers Served' },
              { value: '4.9 ★', label: 'Average Rating' },
              { value: '40+', label: 'Countries Served' },
              { value: '100%', label: 'Custom Itineraries' },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-sand/30 rounded-2xl p-6">
                <div className="font-bold text-3xl text-primary mb-1">{s.value}</div>
                <div className="text-muted text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-cream">
        <div className="section-container text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Design Your Dream Holiday</h2>
          <p className="text-cream/60 text-base mb-8">
            Tell us your dream destination, travel dates, and budget. We&apos;ll craft a bespoke itinerary with the finest hotels and experiences — within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-bold py-4 px-8 rounded-xl text-base hover:bg-accent/90 transition-all shadow-lg"
            >
              WhatsApp Our Luxury Team
            </a>
            <a
              href="mailto:hello@ylootrips.com"
              className="inline-flex items-center justify-center gap-2 bg-cream/10 text-cream font-semibold py-4 px-8 rounded-xl text-base hover:bg-cream/15 border border-cream/20 transition-all"
            >
              Email Us
            </a>
          </div>
          <p className="text-cream/30 text-xs mt-6">MSME Registered · GST Certified · 4.9★ rated by 25,000+ travelers</p>
        </div>
      </section>
    </div>
  );
}
