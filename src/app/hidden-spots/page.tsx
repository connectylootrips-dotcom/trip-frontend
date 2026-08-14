import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Clock, Compass, Calendar, Navigation, CreditCard, Zap, Star } from 'lucide-react';
import hiddenSpots from '@/data/hiddenSpots';

export const metadata: Metadata = {
  title: 'Hidden Gems All Over India — Secret Destinations | YlooTrips',
  description: 'Discover hidden gems all over India — Chopta, Majuli, Dawki, Gokarna, Orchha, Bundi and more. Off-the-beaten-path destinations curated by YlooTrips. Book on EMI with easy payment plans.',
  alternates: { canonical: 'https://www.ylootrips.com/hidden-spots' },
};

const categoryLabel: Record<string, string> = {
  nature: 'Nature',
  heritage: 'Heritage',
  beach: 'Beach',
  hills: 'Hills',
  adventure: 'Adventure',
  spiritual: 'Spiritual',
  wildlife: 'Wildlife',
};

const difficultyColor: Record<string, string> = {
  Easy: 'bg-green-100 text-green-800',
  Moderate: 'bg-amber-100 text-amber-800',
  Challenging: 'bg-red-100 text-red-800',
};

const regionColors: Record<string, string> = {
  'North India': 'bg-blue-50 text-blue-700 border-blue-200',
  'South India': 'bg-teal-50 text-teal-700 border-teal-200',
  'Northeast India': 'bg-purple-50 text-purple-700 border-purple-200',
  'Central India': 'bg-orange-50 text-orange-700 border-orange-200',
  'East India': 'bg-rose-50 text-rose-700 border-rose-200',
  'West India': 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function HiddenSpotsPage() {
  const regions = [...new Set(hiddenSpots.map(s => s.region))];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end bg-[#0f1a12] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1920&q=80"
            alt="Hidden gems all over India"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a12] via-[#0f1a12]/60 to-transparent" />
        </div>
        <div className="relative z-10 section-container pb-16 pt-40">
          <div className="flex items-center gap-2 mb-5">
            <Compass className="w-4 h-4 text-accent" />
            <span className="text-caption uppercase tracking-[0.35em] text-accent">Secret India · All Over India</span>
          </div>
          <h1 className="font-display text-display-xl text-cream mb-5 max-w-3xl">
            Hidden gems<br />
            <span className="italic text-accent">all over India</span>
          </h1>
          <p className="text-cream/60 text-body-lg max-w-2xl leading-relaxed mb-8">
            From Himalayan meadows in the North to transparent rivers in the Northeast, ancient forts in Central India to secret beaches in the South — <strong className="text-cream/80">{hiddenSpots.length} hand-picked destinations</strong> spanning every corner of India. Places that reward the curious — beyond the postcard, away from the crowds.
          </p>
          {/* Region pills */}
          <div className="flex flex-wrap gap-2">
            {regions.map(region => (
              <span key={region} className="bg-white/10 backdrop-blur-sm border border-white/15 text-cream/70 text-[10px] uppercase tracking-widest px-3 py-1.5">
                {region}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-[#0f1a12] border-b border-white/8">
        <div className="section-container py-5">
          <div className="flex flex-wrap gap-x-10 gap-y-3 text-cream/50 text-sm">
            {[
              { v: `${hiddenSpots.length}`, l: 'Hidden spots all over India' },
              { v: '6', l: 'Regions covered' },
              { v: '12+', l: 'Years discovering' },
              { v: 'EMI', l: 'Easy payment plans' },
            ].map(({ v, l }) => (
              <div key={l}>
                <span className="font-display text-xl text-accent mr-1.5">{v}</span>
                <span className="text-[11px] uppercase tracking-widest">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EMI banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-3">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-white">
              <CreditCard className="w-5 h-5 shrink-0" />
              <p className="text-sm font-semibold">
                Book any hidden gem trip on <strong>Easy EMI</strong> — Pay just 25% now. Balance in flexible installments.
              </p>
            </div>
            <a
              href="https://wa.me/918427831127?text=Hi%2C+I+want+to+know+about+EMI+plans+for+a+hidden+gem+trip"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-white text-orange-600 font-bold text-xs uppercase tracking-widest px-5 py-2 hover:bg-orange-50 transition-colors whitespace-nowrap"
            >
              Check EMI Plans →
            </a>
          </div>
        </div>
      </div>

      {/* Full editorial listing */}
      <section className="bg-cream">
        <div className="section-container py-16 md:py-24">

          <div className="mb-12">
            <p className="text-caption uppercase tracking-[0.3em] text-secondary mb-3">Curated Destinations</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-display-lg text-primary">
              Explore hidden places <span className="italic text-secondary">all over India</span>
            </h2>
            <p className="text-primary/50 text-sm mt-3 max-w-xl">
              Each destination below includes the full story, how to get there, best time to visit, and a direct booking link — so you can go from inspired to booked in minutes.
            </p>
          </div>

          <div className="space-y-20">
            {hiddenSpots.map((spot, index) => (
              <article key={spot.slug} id={spot.slug} className="scroll-mt-20">

                {/* Spot card */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border border-primary/10 overflow-hidden shadow-lg ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>

                  {/* Image */}
                  <div className="relative h-[320px] sm:h-[400px] lg:h-auto min-h-[380px] overflow-hidden group">
                    <Image
                      src={spot.imageUrl}
                      alt={spot.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    {/* Overlay badges */}
                    <div className="absolute top-5 left-5 flex flex-col gap-2">
                      {spot.featured && (
                        <span className="bg-accent text-primary text-[9px] uppercase tracking-widest px-2.5 py-1 font-bold">
                          Featured
                        </span>
                      )}
                      <span className="bg-black/50 backdrop-blur-sm text-cream text-[9px] uppercase tracking-widest px-2.5 py-1">
                        {categoryLabel[spot.category]}
                      </span>
                    </div>

                    <div className={`absolute top-5 right-5 text-[9px] uppercase tracking-widest px-2.5 py-1 font-medium ${difficultyColor[spot.difficulty]}`}>
                      {spot.difficulty}
                    </div>

                    {/* Bottom name overlay */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="flex items-center gap-1.5 text-cream/60 text-[10px] uppercase tracking-widest mb-2">
                        <MapPin className="w-3 h-3" />
                        {spot.state} · {spot.region}
                      </div>
                      <h3 className="font-display text-3xl text-cream leading-tight">{spot.name}</h3>
                      <p className="text-cream/70 text-sm mt-1 leading-relaxed line-clamp-2">{spot.tagline}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-cream-light p-7 sm:p-9 flex flex-col">

                    {/* Region + meta row */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <span className={`border text-[9px] uppercase tracking-widest px-2.5 py-1 font-semibold ${regionColors[spot.region]}`}>
                        {spot.region}
                      </span>
                      <span className="flex items-center gap-1 text-primary/50 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {spot.recommendedStay}
                      </span>
                      <span className="flex items-center gap-1 text-primary/50 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        {spot.bestTime.split('·')[0].trim()}
                      </span>
                    </div>

                    {/* Story */}
                    <div className="mb-5">
                      <p className="text-primary/70 text-sm leading-relaxed">
                        {spot.description}
                      </p>
                    </div>

                    {/* Why Hidden */}
                    <div className="bg-primary/5 border-l-2 border-secondary px-4 py-3 mb-5">
                      <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Why it&apos;s still hidden</p>
                      <p className="text-primary/70 text-sm italic">&ldquo;{spot.whyHidden}&rdquo;</p>
                    </div>

                    {/* Highlights */}
                    <div className="mb-5">
                      <p className="text-[10px] uppercase tracking-widest text-primary/40 font-semibold mb-3">Highlights</p>
                      <ul className="space-y-2">
                        {spot.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-primary/65">
                            <Star className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* How to reach */}
                    <div className="flex items-start gap-2 text-xs text-primary/50 mb-6 pb-6 border-b border-primary/8">
                      <Navigation className="w-3.5 h-3.5 shrink-0 mt-0.5 text-secondary" />
                      <span><strong className="text-primary/70">How to reach:</strong> {spot.howToReach}</span>
                    </div>

                    {/* Cost + CTA */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-primary/40 mb-0.5">Estimated Cost</p>
                          <p className="font-display text-lg text-primary">{spot.avgCost}</p>
                        </div>
                        <Link
                          href={`/hidden-spots/${spot.slug}`}
                          className="flex items-center gap-1.5 text-secondary text-xs font-semibold uppercase tracking-widest hover:underline"
                        >
                          Full Story
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      {/* Book Now CTA */}
                      <a
                        href={`https://wa.me/918427831127?text=Hi%2C+I%27d+like+to+book+a+trip+to+${encodeURIComponent(spot.name)}+(${encodeURIComponent(spot.state)})+with+YlooTrips.+Please+share+itinerary+and+EMI+options.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 bg-primary hover:bg-secondary text-cream w-full py-4 font-bold text-sm uppercase tracking-widest transition-colors"
                      >
                        <Zap className="w-4 h-4" />
                        Book Trip to {spot.name} with YlooTrips
                      </a>
                    </div>
                  </div>
                </div>

                {/* EMI / Payment plan strip — after every card */}
                <div className="bg-[#0f1a12] border border-t-0 border-primary/10 px-6 sm:px-9 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-cream/70 text-sm">
                    <CreditCard className="w-4 h-4 text-accent shrink-0" />
                    <span>
                      <strong className="text-cream">Easy EMI available</strong> — Pay just 25% to confirm your {spot.name} trip.
                      Balance in flexible installments via UPI, Card or Net Banking.
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/918427831127?text=Hi%2C+I+want+to+book+${encodeURIComponent(spot.name)}+on+EMI+with+YlooTrips.+What+are+the+payment+plans%3F`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-bold text-xs uppercase tracking-widest px-5 py-2.5 transition-colors whitespace-nowrap"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    View EMI Plans
                  </a>
                </div>

              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plans Section */}
      <section className="py-16 md:py-20 bg-cream-dark border-t border-primary/8">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-caption uppercase tracking-[0.3em] text-secondary mb-3">Flexible Payments</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-display-lg text-primary mb-3">
              Best payment plans<br /><span className="italic text-secondary">for every budget</span>
            </h2>
            <p className="text-primary/50 text-sm max-w-lg mx-auto">
              No reason to delay a dream trip. Book any hidden gem all over India with a small deposit and pay the rest your way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: '💳',
                title: '25% Now, Rest Later',
                desc: 'Confirm your booking with just 25% of the trip cost. Pay the balance up to 30 days before departure.',
                badge: 'Most Popular',
              },
              {
                icon: '📅',
                title: 'Monthly EMI',
                desc: 'Split your trip cost into 3, 6, or 12 monthly installments via credit card or BNPL partners.',
                badge: '0% Processing Fee',
              },
              {
                icon: '⚡',
                title: 'UPI / Card / Net Banking',
                desc: 'Instant confirmation on all major UPI apps, Visa, Mastercard, RuPay, and net banking.',
                badge: 'Instant Confirmation',
              },
            ].map(plan => (
              <div key={plan.title} className="bg-cream border border-primary/10 p-6 relative">
                {plan.badge && (
                  <span className="absolute top-4 right-4 bg-accent text-primary text-[9px] uppercase tracking-widest px-2.5 py-1 font-bold">
                    {plan.badge}
                  </span>
                )}
                <div className="text-3xl mb-4">{plan.icon}</div>
                <h3 className="font-display text-lg text-primary mb-2">{plan.title}</h3>
                <p className="text-primary/60 text-sm leading-relaxed">{plan.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#0f1a12] p-8 text-center">
            <p className="text-cream/50 text-xs uppercase tracking-widest mb-2">Free cancellation available</p>
            <h3 className="font-display text-2xl text-cream mb-3">
              Ready to explore hidden India?
            </h3>
            <p className="text-cream/50 text-sm max-w-md mx-auto mb-6">
              WhatsApp our team and get a custom itinerary + EMI quote for any hidden gem destination — all over India.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/918427831127?text=Hi%2C+I'd+like+to+visit+one+of+your+hidden+gem+destinations+all+over+India.+Please+share+EMI+options+and+packages."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-4 font-semibold text-sm uppercase tracking-widest transition-colors w-full sm:w-auto"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Plan My Hidden Gem Trip
              </a>
              <Link
                href="/destinations/domestic"
                className="flex items-center justify-center gap-2 border border-cream/20 text-cream hover:border-cream/40 hover:bg-white/5 px-8 py-4 text-sm uppercase tracking-widest transition-all w-full sm:w-auto"
              >
                Browse All Trips
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
