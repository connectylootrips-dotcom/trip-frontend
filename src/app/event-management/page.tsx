import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Event Management Company India — Corporate Events, Team Outings & Weddings',
  description: 'YlooTrips is a full-service event management company in India. We plan corporate events, team outings, destination weddings, product launches, and MICE travel. GST invoicing. Get a free quote.',
  openGraph: {
    title: 'Event Management in India — Corporate, Wedding & MICE Events',
    description: 'Corporate events, team outings, destination weddings, product launches, and incentive travel — all planned end-to-end by YlooTrips. GST-compliant. 4-hour quote.',
    url: 'https://www.ylootrips.com/event-management',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Event management corporate events and destination weddings India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Management India — Corporate & Wedding Events',
    description: 'End-to-end event planning: corporate events, team outings, destination weddings, MICE. Get a free quote in 4 hours.',
    images: ['https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80'],
  },
  alternates: { canonical: 'https://www.ylootrips.com/event-management' },
};

const EVENT_TYPES = [
  {
    emoji: '🏢',
    title: 'Corporate Events',
    desc: 'Annual conferences, town halls, leadership offsites, and award ceremonies — fully managed from venue selection to A/V setup and catering.',
  },
  {
    emoji: '👥',
    title: 'Team Outings',
    desc: 'Day trips, weekend getaways, and adventure activities for teams of 10 to 500+. Manali, Rishikesh, Goa, Coorg — we handle logistics end-to-end.',
  },
  {
    emoji: '💍',
    title: 'Destination Weddings',
    desc: 'Rajasthan palaces, Goa beaches, Kerala backwaters, or Bali resorts. We coordinate venues, décor, hospitality, and guest travel — all in one package.',
  },
  {
    emoji: '✈️',
    title: 'MICE Travel',
    desc: 'Meetings, Incentives, Conferences, and Exhibitions across India and international destinations. Group airfare, hotel blocks, and ground transport managed seamlessly.',
  },
  {
    emoji: '🚀',
    title: 'Product Launches',
    desc: 'Experiential launch events, press trips, influencer famils, and brand activation tours — designed to create buzz and memories.',
  },
  {
    emoji: '🏆',
    title: 'Incentive Trips',
    desc: 'Reward your top performers with curated luxury getaways — Maldives, Europe, Dubai, or premium Himalayan retreats. Fully customised.',
  },
];

const PROCESS = [
  { step: '01', title: 'Share Requirements', desc: 'Tell us your team size, budget, dates, and preferred destination. We respond within 4 hours with initial options.' },
  { step: '02', title: 'Custom Proposal', desc: 'You get a detailed itinerary with hotel options, activities, transport, catering, and a GST-compliant cost breakdown.' },
  { step: '03', title: 'Lock & Plan', desc: 'Confirm with 25% advance. Our dedicated event manager takes over all vendor coordination, bookings, and logistics.' },
  { step: '04', title: 'Seamless Execution', desc: 'On-ground team present throughout. 24/7 WhatsApp support. Post-event billing with complete GST invoice.' },
];

const WHATSAPP_URL = 'https://wa.me/918427831127?text=Hi%2C%20I%20want%20to%20enquire%20about%20event%20management%20services.';

export default function EventManagementPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative bg-primary text-cream py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #c4a77d 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="section-container relative text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
            Event Management
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
            Events That People<br />
            <span className="text-accent italic">Talk About for Years</span>
          </h1>
          <p className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Corporate events, team outings, destination weddings, and MICE travel — planned end-to-end by YlooTrips. GST invoicing. Dedicated event manager. Quote in 4 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-bold py-4 px-8 rounded-xl text-base hover:bg-accent/90 transition-all shadow-lg"
            >
              Get a Free Quote
            </a>
            <Link
              href="/corporate-travel"
              className="inline-flex items-center justify-center gap-2 bg-cream/10 text-cream font-semibold py-4 px-8 rounded-xl text-base hover:bg-cream/15 border border-cream/20 transition-all"
            >
              Corporate Travel
            </Link>
          </div>
        </div>
      </section>

      {/* Event types */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">What We Plan</h2>
            <p className="text-muted text-base max-w-xl mx-auto">From intimate team outings to large-scale conferences — we've done it all.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENT_TYPES.map((e) => (
              <div key={e.title} className="bg-white border border-sand/30 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{e.emoji}</div>
                <h3 className="font-serif text-xl font-bold text-primary mb-2">{e.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why YlooTrips */}
      <section className="py-16 bg-primary/[0.03] border-y border-sand/20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">Why Companies Choose YlooTrips</h2>
              <div className="space-y-5">
                {[
                  { icon: '📋', title: 'GST-Compliant Invoicing', desc: 'B2B invoice under GST No. 07BATPV1942C1ZF — ready for your finance team.' },
                  { icon: '👤', title: 'Single Point of Contact', desc: 'One dedicated event manager on WhatsApp — no IVR, no bots, no runaround.' },
                  { icon: '💸', title: 'Transparent Pricing', desc: 'No hidden costs. Itemised quotation with hotel, transport, activities, and meals clearly split.' },
                  { icon: '✅', title: 'End-to-End Execution', desc: 'Venue, décor, travel, accommodation, catering, A/V — everything coordinated under one roof.' },
                  { icon: '🌍', title: 'India & International', desc: 'Events anywhere in India or abroad. Domestic and international MICE managed equally well.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl mt-0.5 shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-primary text-sm">{item.title}</p>
                      <p className="text-muted text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary rounded-3xl p-8 text-cream">
              <p className="text-cream/50 text-xs font-bold uppercase tracking-widest mb-2">Trusted by</p>
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-cream/70 mb-8">corporate clients and growing</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Events planned', value: '1,200+' },
                  { label: 'Avg team size', value: '45 pax' },
                  { label: 'Quote turnaround', value: '4 hours' },
                  { label: 'Client rating', value: '4.9 ★' },
                ].map((s) => (
                  <div key={s.label} className="bg-cream/[0.06] border border-cream/10 rounded-xl p-4">
                    <div className="text-accent font-bold text-xl">{s.value}</div>
                    <div className="text-cream/50 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-accent text-primary font-bold py-3.5 rounded-xl text-sm hover:bg-accent/90 transition-all"
              >
                WhatsApp Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">How It Works</h2>
            <p className="text-muted text-base">Four simple steps from enquiry to a flawlessly executed event.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p) => (
              <div key={p.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-lg mx-auto mb-4">
                  {p.step}
                </div>
                <h3 className="font-semibold text-primary mb-2">{p.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-cream">
        <div className="section-container text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Event?</h2>
          <p className="text-cream/60 text-base mb-8">
            Share your requirements and get a detailed proposal with pricing within 4 hours. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-bold py-4 px-8 rounded-xl text-base hover:bg-accent/90 transition-all shadow-lg"
            >
              Get Free Quote on WhatsApp
            </a>
            <a
              href="mailto:hello@ylootrips.com"
              className="inline-flex items-center justify-center gap-2 bg-cream/10 text-cream font-semibold py-4 px-8 rounded-xl text-base hover:bg-cream/15 border border-cream/20 transition-all"
            >
              Email Us
            </a>
          </div>
          <p className="text-cream/30 text-xs mt-6">GST No. 07BATPV1942C1ZF · MSME Registered · hello@ylootrips.com</p>
        </div>
      </section>
    </div>
  );
}
