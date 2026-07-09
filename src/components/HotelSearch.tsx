'use client';
import { initiateEasebuzzPayment } from '@/lib/easebuzz-checkout';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search, Star, Wifi, Waves, Dumbbell, UtensilsCrossed, Car, MapPin,
  Calendar, Users, BedDouble, ChevronDown, ChevronUp,
  Info, Loader2, AlertCircle, X, CreditCard,
} from 'lucide-react';
import Image from 'next/image';
interface HotelResult {
  id: string;
  isDemo: boolean;
  name: string;
  type: string;
  starClass: number;
  overallRating: number;
  reviewCount: number;
  description: string;
  thumbnail: string;
  images: string[];
  address?: string;
  latitude?: number;
  longitude?: number;
  amenities: string[];
  checkIn: string;
  checkOut: string;
  pricePerNight: number;
  totalPrice: number;
  currency: 'INR';
  link: string;
}

// ── Amenity icon map ───────────────────────────────────────────────────────────
const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'Free WiFi': <Wifi size={12} />,
  'WiFi': <Wifi size={12} />,
  'Pool': <Waves size={12} />,
  'Swimming Pool': <Waves size={12} />,
  'Gym': <Dumbbell size={12} />,
  'Fitness center': <Dumbbell size={12} />,
  'Restaurant': <UtensilsCrossed size={12} />,
  'Parking': <Car size={12} />,
  'Free parking': <Car size={12} />,
};

function AmenityPill({ label }: { label: string }) {
  const icon = Object.entries(AMENITY_ICONS).find(([k]) =>
    label.toLowerCase().includes(k.toLowerCase())
  )?.[1];
  return (
    <span className="flex items-center gap-1 bg-cream-light text-secondary text-[11px] font-medium px-2.5 py-1 rounded-full">
      {icon}
      {label}
    </span>
  );
}

function StarRating({ stars }: { stars: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={10}
          className={i < stars ? 'fill-amber-400 text-amber-400' : 'text-sand/60'}
        />
      ))}
    </span>
  );
}

interface BookingModalProps {
  hotel: HotelResult;
  nights: number;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  roomType: string;
  onClose: () => void;
}

function BookingModal({ hotel, nights, checkIn, checkOut, rooms, adults, roomType, onClose }: BookingModalProps) {
  const [guest, setGuest] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fmt = (n: number) => n ? `₹${n.toLocaleString('en-IN')}` : 'Price on request';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/hotels/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hotel, guest, checkIn, checkOut, rooms, adults, nights }),
      });
      const data = await res.json();
      if (!res.ok || (!data.paymentUrl && !data.accessKey)) {
        setError(data.error || 'Failed to initiate payment. Please try again.');
        setLoading(false);
        return;
      }
      if (data.accessKey) {
        initiateEasebuzzPayment({
          accessKey: data.accessKey,
          onSuccess: () => { window.location.href = `/hotels/booking-success?txnid=${data.txnid}`; },
          onFailure: () => { window.location.href = `/hotels?error=payment_failed`; },
        }).catch(() => { if (data.paymentUrl) window.location.href = data.paymentUrl; });
      } else {
        window.location.href = data.paymentUrl;
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-xl leading-snug">{hotel.name}</h2>
            <p className="text-white/70 text-xs mt-1">
              {roomType} · {checkIn} → {checkOut} · {nights} night{nights > 1 ? 's' : ''} · {rooms} room{rooms > 1 ? 's' : ''} · {adults} guest{adults > 1 ? 's' : ''}
            </p>
          </div>
          <button onClick={onClose} className="shrink-0 text-white/70 hover:text-white transition-colors mt-0.5">
            <X size={20} />
          </button>
        </div>

        {/* Price summary */}
        <div className="bg-cream-light px-5 py-3 flex items-center justify-between">
          <span className="text-sm text-secondary">Total amount</span>
          <span className="font-display text-2xl text-primary">{fmt(hotel.totalPrice)}</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-secondary mb-1.5">Full Name *</label>
            <input
              type="text" required value={guest.name}
              onChange={(e) => setGuest({ ...guest, name: e.target.value })}
              placeholder="As per ID proof"
              className="w-full px-4 py-3 bg-cream-light border border-sand/60 rounded-xl text-primary text-sm placeholder:text-secondary/40 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-secondary mb-1.5">Email Address *</label>
            <input
              type="email" required value={guest.email}
              onChange={(e) => setGuest({ ...guest, email: e.target.value })}
              placeholder="Confirmation will be sent here"
              className="w-full px-4 py-3 bg-cream-light border border-sand/60 rounded-xl text-primary text-sm placeholder:text-secondary/40 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-secondary mb-1.5">Phone Number *</label>
            <input
              type="tel" required value={guest.phone}
              onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-3 bg-cream-light border border-sand/60 rounded-xl text-primary text-sm placeholder:text-secondary/40 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-accent text-primary font-semibold py-3.5 rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /><span>Redirecting to payment…</span></>
            ) : (
              <><CreditCard size={16} /><span>Pay {fmt(hotel.totalPrice)}</span></>
            )}
          </button>
          <p className="text-center text-[11px] text-secondary">
            Secure payment powered by Easebuzz · SSL encrypted
          </p>
        </form>
      </div>
    </div>
  );
}

interface HotelCardProps {
  hotel: HotelResult;
  nights: number;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
}

function HotelCard({ hotel, nights, checkIn, checkOut, rooms, adults }: HotelCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);

  const ROOM_TYPES = [
    { label: 'Standard Room', multiplier: 1, bed: '1 Double Bed', desc: 'Comfortable room with essential amenities' },
    { label: 'Deluxe Room', multiplier: 1.3, bed: '1 King Bed', desc: 'Spacious room with premium furnishings & view' },
    { label: 'Suite', multiplier: 1.7, bed: '1 King + Sofa Bed', desc: 'Luxury suite with separate living area' },
  ];

  const roomType = ROOM_TYPES[selectedRoomIdx];
  const base = hotel.pricePerNight;
  const adjustedPPN = base ? Math.ceil(base * roomType.multiplier / 100) * 100 : 0;
  const adjustedTotal = adjustedPPN * nights * rooms;

  const images = hotel.images?.length ? hotel.images : hotel.thumbnail ? [hotel.thumbnail] : [];
  const mapUrl = hotel.latitude && hotel.longitude
    ? `https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}`
    : `https://www.google.com/maps/search/${encodeURIComponent(hotel.name)}`;
  const fmt = (n: number) => n ? `₹${n.toLocaleString('en-IN')}` : 'Price on request';

  return (
    <>
      {showModal && (
        <BookingModal
          hotel={{ ...hotel, pricePerNight: adjustedPPN, totalPrice: adjustedTotal }}
          nights={nights}
          checkIn={checkIn}
          checkOut={checkOut}
          rooms={rooms}
          adults={adults}
          roomType={roomType.label}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="bg-white rounded-2xl overflow-hidden border border-sand/50 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row">
          {/* Image section with carousel */}
          <div className="relative sm:w-52 md:w-60 h-52 sm:h-auto flex-shrink-0 overflow-hidden">
            {images.length > 0 ? (
              <>
                <Image
                  src={images[imgIdx]}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 208px, 240px"
                  quality={90}
                  unoptimized={!images[imgIdx]?.startsWith('https://images.unsplash.com')}
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setImgIdx(i => Math.max(0, i - 1)); }}
                      className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/50 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-black/70 transition-colors"
                    >‹</button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setImgIdx(i => Math.min(images.length - 1, i + 1)); }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/50 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-black/70 transition-colors"
                    >›</button>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                      {images.slice(0, 5).map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={(e) => { e.stopPropagation(); setImgIdx(dotIdx); }}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${dotIdx === imgIdx ? 'bg-white' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="h-full bg-sand/40 flex items-center justify-center">
                <BedDouble size={40} className="text-secondary/30" />
              </div>
            )}
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              {hotel.type}
            </span>
            {hotel.isDemo && (
              <span className="absolute top-3 right-3 bg-amber-400/90 text-primary text-[10px] font-bold px-2 py-1 rounded-full">
                Sample
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <StarRating stars={hotel.starClass} />
                <h3 className="font-display text-lg text-primary leading-snug mt-0.5">{hotel.name}</h3>
                {/* Location */}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-accent hover:underline mt-0.5"
                >
                  <MapPin size={11} />
                  <span className="truncate">{hotel.address ?? 'View on map'}</span>
                </a>
                {hotel.overallRating > 0 && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="bg-green-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                      {hotel.overallRating.toFixed(1)}
                    </span>
                    <span className="text-xs text-secondary">
                      {hotel.reviewCount > 0 && `${hotel.reviewCount.toLocaleString('en-IN')} reviews`}
                    </span>
                  </div>
                )}
              </div>
              {/* Price */}
              <div className="text-right shrink-0">
                <p className="font-display text-xl text-primary">{fmt(adjustedPPN)}</p>
                <p className="text-[11px] text-secondary">per night</p>
                {nights > 1 && (
                  <p className="text-xs text-secondary/70 mt-0.5">{fmt(adjustedTotal)} for {nights}N</p>
                )}
              </div>
            </div>

            {/* Description */}
            {hotel.description && (
              <p className={`text-xs text-secondary leading-relaxed mt-2 ${expanded ? '' : 'line-clamp-2'}`}>
                {hotel.description}
              </p>
            )}

            {/* Amenities */}
            {hotel.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {hotel.amenities.slice(0, expanded ? undefined : 4).map((a) => (
                  <AmenityPill key={a} label={a} />
                ))}
                {!expanded && hotel.amenities.length > 4 && (
                  <span className="text-[11px] text-accent font-medium self-center">
                    +{hotel.amenities.length - 4} more
                  </span>
                )}
              </div>
            )}

            {/* Expanded: Room selection + map */}
            {expanded && (
              <div className="mt-4 border-t border-sand/30 pt-4 space-y-4">
                <div>
                  <p className="text-[11px] font-semibold text-secondary uppercase tracking-widest mb-2">Choose Room Type</p>
                  <div className="space-y-2">
                    {ROOM_TYPES.map((rt, i) => {
                      const rtPrice = base ? Math.ceil(base * rt.multiplier / 100) * 100 : 0;
                      return (
                        <label
                          key={rt.label}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                            selectedRoomIdx === i
                              ? 'border-accent bg-accent/5'
                              : 'border-sand/50 hover:border-accent/40 hover:bg-cream-light/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`room-${hotel.id}`}
                            checked={selectedRoomIdx === i}
                            onChange={() => setSelectedRoomIdx(i)}
                            className="mt-0.5 accent-amber-400 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-semibold text-primary">{rt.label}</span>
                              <span className="text-sm font-display text-primary shrink-0">
                                {fmt(rtPrice)}<span className="text-[11px] text-secondary font-normal">/night</span>
                              </span>
                            </div>
                            <p className="text-[11px] text-secondary mt-0.5 flex items-center gap-1">
                              <BedDouble size={10} className="shrink-0" />{rt.bed} · {rt.desc}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex gap-4 text-[11px] text-secondary/70">
                    <span>Check-in: <strong className="text-primary">{hotel.checkIn}</strong></span>
                    <span>Check-out: <strong className="text-primary">{hotel.checkOut}</strong></span>
                  </div>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-accent hover:underline font-medium"
                  >
                    <MapPin size={12} />
                    View on Google Maps
                  </a>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-3 pt-1">
              <button
                onClick={() => setShowModal(true)}
                disabled={!adjustedTotal}
                className="flex-1 flex items-center justify-center gap-2 bg-accent text-primary text-sm font-semibold py-2.5 rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard size={14} />
                {adjustedTotal ? `Book · ${fmt(adjustedTotal)}` : 'Book Now'}
              </button>
              <button
                onClick={() => setExpanded(v => !v)}
                title={expanded ? 'Show less' : 'Room details & more'}
                className="px-3 py-2.5 rounded-xl border border-sand/60 text-secondary hover:bg-cream-light transition-colors"
              >
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Today + tomorrow helpers ──────────────────────────────────────────────────
function today() {
  return new Date().toISOString().slice(0, 10);
}
function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

// ── Sort options ──────────────────────────────────────────────────────────────
type SortKey = 'rating' | 'price_asc' | 'price_desc' | 'reviews';
const SORT_LABELS: { value: SortKey; label: string }[] = [
  { value: 'rating', label: 'Best rated' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'reviews', label: 'Most reviewed' },
];

function sortHotels(hotels: HotelResult[], key: SortKey) {
  return [...hotels].sort((a, b) => {
    if (key === 'rating') return b.overallRating - a.overallRating;
    if (key === 'price_asc') return a.pricePerNight - b.pricePerNight;
    if (key === 'price_desc') return b.pricePerNight - a.pricePerNight;
    if (key === 'reviews') return b.reviewCount - a.reviewCount;
    return 0;
  });
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HotelSearch() {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [checkIn, setCheckIn] = useState(searchParams.get('check_in') ?? today());
  const [checkOut, setCheckOut] = useState(searchParams.get('check_out') ?? tomorrow());
  const [adults, setAdults] = useState(parseInt(searchParams.get('adults') ?? '2'));
  const [rooms, setRooms] = useState(parseInt(searchParams.get('rooms') ?? '1'));

  const [results, setResults] = useState<HotelResult[]>([]);
  const [nights, setNights] = useState(1);
  const [resultQuery, setResultQuery] = useState('');
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('rating');
  const [searched, setSearched] = useState(false);
  const didAutoSearch = useRef(false);

  const search = useCallback(async () => {
    if (!query.trim() || !checkIn || !checkOut) return;
    setLoading(true);
    setError('');
    setSearched(true);

    const params = new URLSearchParams({
      q: query.trim(),
      check_in: checkIn,
      check_out: checkOut,
      adults: String(adults),
      rooms: String(rooms),
    });

    const res = await fetch(`/api/hotels/search?${params}`);
    if (!res.ok) {
      setError('Failed to fetch hotels. Please try again.');
      setLoading(false);
      return;
    }

    const data = await res.json();
    setResults(data.data ?? []);
    setNights(data.nights ?? 1);
    setResultQuery(data.query ?? query);
    setIsDemo(data.isDemo ?? false);
    setLoading(false);
  }, [query, checkIn, checkOut, adults, rooms]);

  const sorted = useMemo(() => sortHotels(results, sortKey), [results, sortKey]);

  // Auto-search when ?q= is present in the URL
  useEffect(() => {
    if (didAutoSearch.current) return;
    if (query.trim() && checkIn && checkOut) {
      didAutoSearch.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      search();
    }
  }, [query, checkIn, checkOut, search]);

  return (
    <div className="min-h-screen bg-cream-light">
      {/* Hero */}
      <section className="bg-primary py-14 px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Hotels</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-3">Find Your Perfect Stay</h1>
          <p className="text-white/60 text-sm">Live rates from Google Hotels · Curated by YlooTrips</p>
        </div>

        {/* Search card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* Destination */}
            <div className="md:col-span-2 flex items-center gap-2 bg-cream-light rounded-xl px-4 py-3">
              <MapPin size={16} className="text-accent shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && search()}
                placeholder="Where are you going?"
                className="bg-transparent text-sm text-primary placeholder:text-secondary/50 outline-none w-full"
              />
            </div>

            {/* Check-in */}
            <div className="flex items-center gap-2 bg-cream-light rounded-xl px-4 py-3">
              <Calendar size={15} className="text-accent shrink-0" />
              <input
                type="date"
                value={checkIn}
                min={today()}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-sm text-primary outline-none w-full"
              />
            </div>

            {/* Check-out */}
            <div className="flex items-center gap-2 bg-cream-light rounded-xl px-4 py-3">
              <Calendar size={15} className="text-accent shrink-0" />
              <input
                type="date"
                value={checkOut}
                min={checkIn || today()}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-sm text-primary outline-none w-full"
              />
            </div>

            {/* Search button */}
            <button
              onClick={search}
              disabled={loading || !query.trim()}
              className="flex items-center justify-center gap-2 bg-accent text-primary font-semibold rounded-xl py-3 hover:bg-accent/90 transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              {loading ? 'Searching…' : 'Search'}
            </button>
          </div>

          {/* Guests row */}
          <div className="flex flex-wrap gap-4 mt-3 px-1">
            <label className="flex items-center gap-2 text-sm text-secondary">
              <Users size={14} className="text-accent" />
              <span>Adults:</span>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="bg-cream-light text-primary rounded-lg px-2 py-2 outline-none min-h-[40px]"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm text-secondary">
              <BedDouble size={14} className="text-accent" />
              <span>Rooms:</span>
              <select
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="bg-cream-light text-primary rounded-lg px-2 py-2 outline-none min-h-[40px]"
              >
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse border border-sand/50">
                <div className="h-48 bg-sand/60" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-sand/60 rounded w-3/4" />
                  <div className="h-4 bg-sand/60 rounded w-1/2" />
                  <div className="h-3 bg-sand/60 rounded w-full" />
                  <div className="h-3 bg-sand/60 rounded w-5/6" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-10 bg-sand/60 rounded-xl flex-1" />
                    <div className="h-10 bg-sand/60 rounded-xl w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && searched && results.length > 0 && (
          <>
            {/* Result header */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
              <div>
                <h2 className="font-display text-2xl text-primary">
                  Hotels in {resultQuery}
                </h2>
                <p className="text-sm text-secondary mt-0.5">
                  {results.length} options · {nights} night{nights > 1 ? 's' : ''} · {adults} guest{adults > 1 ? 's' : ''}
                </p>
              </div>

              {/* Sort */}
              <div className="flex gap-1.5 flex-wrap">
                {SORT_LABELS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setSortKey(value)}
                    className={`text-xs font-semibold px-3 py-2 rounded-full transition-colors min-h-[36px] ${
                      sortKey === value
                        ? 'bg-primary text-white'
                        : 'bg-white text-secondary border border-sand/50 hover:bg-cream-light'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Demo notice */}
            {isDemo && (
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl px-4 py-3 mb-5">
                <Info size={15} className="shrink-0 mt-0.5" />
                <span>
                  Showing <strong>sample hotel prices</strong> — add your SerpAPI key to see live rates.
                  Prices shown include YlooTrips service.
                </span>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 gap-5">
              {sorted.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  nights={nights}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  rooms={rooms}
                  adults={adults}
                />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 bg-primary rounded-2xl p-6 text-center">
              <p className="font-display text-xl text-white mb-2">Need help choosing?</p>
              <p className="text-white/70 text-sm mb-5">
                Our travel experts can find you the best deal and bundle it with flights + activities.
              </p>
              <a
                href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi! I'm looking for a hotel in ${resultQuery} from ${checkIn} to ${checkOut} for ${adults} guests.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-primary font-semibold px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
              >
                Chat with a Travel Expert
              </a>
            </div>
          </>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🏨</p>
            <p className="font-display text-2xl text-primary mb-2">No hotels found</p>
            <p className="text-secondary text-sm">Try a different destination or travel dates.</p>
          </div>
        )}

        {!searched && (
          <div className="text-center py-20 text-secondary">
            <p className="text-5xl mb-4">🏨</p>
            <p className="font-display text-2xl text-primary mb-2">Search hotels worldwide</p>
            <p className="text-sm">Live rates from Google Hotels with instant pricing</p>
          </div>
        )}
      </section>
    </div>
  );
}
