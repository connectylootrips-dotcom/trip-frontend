import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Globe, Calendar, Award, Users, ThumbsUp, Camera, MessageSquare, CheckCircle, ExternalLink } from 'lucide-react';
import { BreadcrumbJsonLd, ReviewsPageJsonLd } from '@/components/JsonLd';
import { staticReviews } from '@/lib/static-reviews';

export const metadata: Metadata = {
  title: 'YlooTrips Reviews — 4.9★ Rated by 25,000+ Travelers',
  description: 'YlooTrips is rated 4.9★ on Google. Read real traveler testimonials from Kerala, Rajasthan, Manali, Bali, Dubai & more. India\'s most trusted tour operator.',
  keywords: 'YlooTrips reviews, YlooTrips rating, is YlooTrips legit, YlooTrips testimonials, India tour company reviews, best travel company India reviews',
  openGraph: {
    title: 'YlooTrips Reviews | 4.9★ Rated by 25,000+ Travelers',
    description: '4.9★ Google rating. Read why travelers trust YlooTrips for India and international tours.',
    url: 'https://www.ylootrips.com/reviews',
    images: [{ url: 'https://www.ylootrips.com/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.ylootrips.com/reviews' },
};

interface Testimonial {
  id: number;
  userName: string;
  userTitle?: string;
  userImage?: string;
  userAvatar?: string;
  comment: string;
  isFeatured?: boolean;
  rating?: number;
  destination?: string;
  tripDate?: string;
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(
      'https://trip-backend-65232427280.asia-south1.run.app/api/testimonials',
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// Rating calculation:
// Google: 4.9★ × 2,400 reviews = 11,760 pts
// Website: (16×5 + 1×4) = 84 pts across 17 reviews = 4.94★
// Combined: (11,760 + 84) / (2,400 + 17) = 11,844 / 2,417 = 4.90★
const GOOGLE_RATING = 4.9;
const GOOGLE_REVIEWS = 2400;
const WEBSITE_REVIEWS_COUNT = 17;
const WEBSITE_REVIEWS_TOTAL = 84; // 16×5 + 1×4
const COMBINED_REVIEWS = GOOGLE_REVIEWS + WEBSITE_REVIEWS_COUNT;
const COMBINED_AVG = ((GOOGLE_RATING * GOOGLE_REVIEWS) + WEBSITE_REVIEWS_TOTAL) / COMBINED_REVIEWS;
const COMBINED_DISPLAY = COMBINED_AVG.toFixed(1); // "4.9"

const RATING_BREAKDOWN = [
  { stars: 5, percent: 87 },
  { stars: 4, percent: 9 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 0 },
];

const ACHIEVEMENTS = [
  { icon: Award, label: 'MSME Certified', desc: 'Government of India', color: 'text-amber-600 bg-amber-50' },
  { icon: Users, label: '25,000+ Travelers', desc: 'Happy customers served', color: 'text-blue-600 bg-blue-50' },
  { icon: ThumbsUp, label: '4.9★ Google Rating', desc: 'Google Rating', color: 'text-green-600 bg-green-50', href: 'https://share.google/RltJUJHq75aa8yfAl' },
  { icon: CheckCircle, label: '100% Secure', desc: '256-bit SSL encryption', color: 'text-purple-600 bg-purple-50' },
];

const REVIEW_PLATFORMS = [
  {
    name: 'TripAdvisor',
    rating: '4.8',
    reviews: 'New',
    logo: 'https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg',
    link: 'https://www.tripadvisor.in/Profile/ylootrips',
    color: 'border-green-100',
  },
];

function StarRating({ rating = 5, size = 'sm' }: { rating?: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${sizeClass} ${s <= rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </div>
  );
}

function RatingBar({ stars, percent }: { stars: number; percent: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 dark:text-gray-400 w-4 shrink-0">{stars}</span>
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
      <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400 w-8 text-right shrink-0">{percent}%</span>
    </div>
  );
}

export default async function ReviewsPage() {
  const testimonials = await getTestimonials();
  const featured = testimonials.filter((t) => t.isFeatured);
  const all = featured.length > 0 ? featured : testimonials;

  return (
    <>
      <ReviewsPageJsonLd />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.ylootrips.com' },
        { name: 'Reviews', url: 'https://www.ylootrips.com/reviews' },
      ]} />

      {/* ── PROFILE HEADER ── */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 pt-24 pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 pb-0">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-amber-50">
                <Image
                  src="/favicon.png"
                  alt="YlooTrips"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-5 h-5 border-2 border-white" />
            </div>

            {/* Info */}
            <div className="flex-1 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">YLOO Trips</h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">@ylootrips</p>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      India
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Since 2022
                    </span>
                    <Link
                      href="https://www.ylootrips.com"
                      className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      ylootrips.com
                    </Link>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-2 shrink-0">
                  <Link
                    href="/contact"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="https://www.tripadvisor.in/Profile/ylootrips"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 border border-gray-200 hover:border-gray-300 text-gray-700 text-sm font-semibold rounded-full transition-colors flex items-center gap-1.5"
                  >
                    TripAdvisor <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border-t border-gray-100 dark:border-gray-800 mt-2 -mx-4 sm:-mx-6 px-4 sm:px-6 overflow-x-auto">
            {['Reviews', 'About', 'Trips', 'Photos'].map((tab, i) => (
              <button
                key={tab}
                className={`px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  i === 0
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── LEFT SIDEBAR ── */}
            <div className="lg:col-span-1 space-y-4">

              {/* Rating Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4">Overall Rating</h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl font-black text-gray-900 dark:text-white">{COMBINED_DISPLAY}</div>
                  <div>
                    <StarRating rating={5} size="md" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Verified reviews</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {RATING_BREAKDOWN.map((r) => (
                    <RatingBar key={r.stars} stars={r.stars} percent={r.percent} />
                  ))}
                </div>
                {/* Source breakdown */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Rating Sources</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Google
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{GOOGLE_RATING}★ Google</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      YlooTrips.com
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">4.9★ · {WEBSITE_REVIEWS_COUNT} on-site</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-t border-dashed border-gray-200 dark:border-gray-600 pt-2 mt-1">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Combined avg</span>
                    <span className="font-black text-amber-600">{COMBINED_DISPLAY}★ combined</span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  Achievements
                </h2>
                <div className="space-y-3">
                  {ACHIEVEMENTS.map((a) => {
                    const inner = <>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${a.color}`}>
                        <a.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-sm font-semibold text-gray-900 dark:text-white ${'href' in a ? 'underline decoration-dotted underline-offset-2' : ''}`}>{a.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{a.desc}</div>
                      </div>
                    </>;
                    return ('href' in a)
                      ? <Link key={a.label} href={(a as { href: string }).href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">{inner}</Link>
                      : <div key={a.label} className="flex items-center gap-3">{inner}</div>;
                  })}
                </div>
              </div>

              {/* Review on platforms */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4">Find us on</h2>

                {/* Google Business Profile — prominent */}
                <Link
                  href="https://share.google/RltJUJHq75aa8yfAl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border-2 border-blue-100 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 hover:shadow-md transition-all mb-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-gray-900 dark:text-white">Google Business</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">4.9★ Google</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                </Link>

                <div className="space-y-3">
                  {REVIEW_PLATFORMS.map((p) => (
                    <Link
                      key={p.name}
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-xl border ${p.color} dark:border-gray-600 hover:shadow-sm transition-shadow`}
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-900 dark:text-white">{p.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{p.rating}★ · {p.reviews} reviews</div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                    </Link>
                  ))}
                </div>

                <Link
                  href="https://share.google/RltJUJHq75aa8yfAl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full text-center py-2.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-semibold rounded-xl transition-colors"
                >
                  Write a Review
                </Link>
              </div>

              {/* Intro */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                <h2 className="font-bold text-gray-900 dark:text-white mb-3">Intro</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Personalized travel by YlooTrips — curated domestic & international packages,
                  hotel bookings, and flight deals. MSME certified. Trusted by 25,000+ Indian travelers.
                </p>
                <div className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    India (PAN India service)
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    Joined Apr 2022
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <Link href="/" className="text-amber-600 hover:underline">www.ylootrips.com</Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                    <Link href="https://wa.me/918427831127" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
                      WhatsApp us
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ── REVIEWS FEED ── */}
            <div className="lg:col-span-2 space-y-4">

              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg">
                  Customer Reviews
                  <span className="ml-2 text-sm font-normal text-gray-400 dark:text-gray-500">({staticReviews.length} shown)</span>
                </h2>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-100">
                    ✓ Verified Travelers
                  </span>
                </div>
              </div>

              {/* Review Cards — always show static reviews with photos */}
              <div className="space-y-4">
                {staticReviews.map((r, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex">
                    {/* Portrait image — narrow left column so face shows correctly */}
                    {r.avatar && (
                      <div className="relative w-32 sm:w-40 shrink-0 overflow-hidden">
                        <img
                          src={r.avatar}
                          alt={r.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ objectPosition: r.photoPosition || 'center' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                        {/* Trip tag at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <span className="bg-black/50 text-white text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full backdrop-blur-sm block text-center truncate">
                            {r.trip}
                          </span>
                        </div>
                      </div>
                    )}
                    {/* Review content */}
                    <div className="flex-1 p-4 sm:p-5 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">{r.name} {r.flag}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{r.country} · {r.date}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <StarRating rating={r.rating} size="sm" />
                          <span className="text-[10px] text-gray-400">{r.platform}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{r.text}</p>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50 dark:border-gray-700">
                        <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                        <span className="text-xs text-gray-400 dark:text-gray-500">Verified Traveler</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Write a review CTA */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-100 dark:border-amber-800/40 p-6 text-center">
                <Camera className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Traveled with us?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Share your experience and help other travelers discover YlooTrips</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="https://share.google/RltJUJHq75aa8yfAl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition-colors"
                  >
                    Review on Google
                  </Link>
                  <Link
                    href="https://www.tripadvisor.in/Profile/ylootrips"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-full border border-gray-200 dark:border-gray-600 transition-colors"
                  >
                    Review on TripAdvisor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
