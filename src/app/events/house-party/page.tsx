'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  MapPin, Calendar, Clock, Users, Star, Instagram,
  CheckCircle, X, Loader2, ChevronLeft, Sparkles,
  Music, Camera, UtensilsCrossed, Gift, Shield, Zap
} from 'lucide-react';
import Link from 'next/link';

/* ── Ticket Tiers ─────────────────────────────────────────────── */
const TICKETS = [
  {
    id: 'female',
    label: 'Female',
    price: 499,
    badge: 'Best Deal',
    badgeColor: 'bg-pink-500',
    color: 'border-pink-400 bg-pink-50',
    highlight: false,
    note: 'Limited time offer',
    perks: ['Entry for 1 female', 'Welcome drink', 'Goodie bag', 'Photo booth access'],
  },
  {
    id: 'single',
    label: 'Single',
    price: 999,
    badge: 'Early Bird',
    badgeColor: 'bg-indigo-500',
    color: 'border-indigo-400 bg-indigo-50',
    highlight: true,
    note: 'Early bird offer',
    perks: ['Entry for 1 person', 'Welcome drink', 'Goodie bag', 'Photo booth access', 'Travel buddy mixer'],
  },
  {
    id: 'couple',
    label: 'Couple / Friends',
    price: 1499,
    badge: '2 People',
    badgeColor: 'bg-amber-500',
    color: 'border-amber-400 bg-amber-50',
    highlight: false,
    note: 'For 2 people',
    perks: ['Entry for 2 people', '2 Welcome drinks', '2 Goodie bags', 'Photo booth access', 'Priority seating'],
  },
];

/* ── Gallery Photos ───────────────────────────────────────────── */
const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1574270981993-49ccc2e7f63e?w=600&q=80', label: 'House Party Vibes' },
  { src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', label: 'Pool Party Fun' },
  { src: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80', label: 'DJ Night' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', label: 'Chef-made Food' },
  { src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80', label: 'Cocktail Bar' },
  { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80', label: 'Dance Floor' },
  { src: 'https://images.unsplash.com/photo-1597544338545-bcd4fb5dc1f7?w=600&q=80', label: 'Pool Hangout' },
  { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80', label: 'Party Crowd' },
];

/* ── Reviews ──────────────────────────────────────────────────── */
const REVIEWS = [
  {
    name: 'Priya Sharma',
    ig: '@priya.travels',
    rating: 5,
    text: 'Best house party I have ever attended! The vibe was electric, food was amazing, and I made so many new travel friends. Totally worth it!',
    tag: 'House Party',
    avatar: 'PS',
    avatarColor: 'bg-pink-200 text-pink-700',
  },
  {
    name: 'Arjun Mehta',
    ig: '@arjun.wanderer',
    rating: 5,
    text: 'Ylootrips knows how to throw a party. The DJ set was fire, cocktails were top-notch, and the instagram-worthy setup was absolutely stunning.',
    tag: 'Pool Party',
    avatar: 'AM',
    avatarColor: 'bg-blue-200 text-blue-700',
  },
  {
    name: 'Sneha Kapoor',
    ig: '@sneha.adventures',
    rating: 5,
    text: 'Came alone, left with 10 new friends planning our next trip together! The travel mixer concept is genius. Already booked the next one.',
    tag: 'Singles Night',
    avatar: 'SK',
    avatarColor: 'bg-purple-200 text-purple-700',
  },
  {
    name: 'Rahul Verma',
    ig: '@rahul.onthego',
    rating: 5,
    text: 'Pool party + house party combo was incredible. Limited seats meant it was never crowded. Chef-made finger food was absolutely delicious.',
    tag: 'Pool Party',
    avatar: 'RV',
    avatarColor: 'bg-green-200 text-green-700',
  },
];

/* ── Perks ────────────────────────────────────────────────────── */
const EVENT_PERKS = [
  { icon: Music, label: 'DJ + Curated Playlist', desc: 'Live DJ set all night long' },
  { icon: UtensilsCrossed, label: 'Chef-made Food', desc: 'Finger food & desserts included' },
  { icon: Camera, label: 'Instagram-worthy Setup', desc: 'Photo booth & aesthetic decor' },
  { icon: Gift, label: 'Goodie Bag on Entry', desc: 'Surprise goodies for all guests' },
  { icon: Users, label: 'Travel Mixer', desc: 'Meet fellow travellers' },
  { icon: Sparkles, label: 'Craft Cocktails', desc: 'Artisan cocktails & mocktails' },
];

/* ── Booking Modal ────────────────────────────────────────────── */
function BookingModal({
  ticket,
  onClose,
}: {
  ticket: typeof TICKETS[0];
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    instagram: '',
    qty: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalAmount = ticket.price * (ticket.id === 'couple' ? 1 : form.qty);
  const guests = ticket.id === 'couple' ? 2 * form.qty : form.qty;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const phone = form.phone.replace(/\D/g, '');
    if (phone.length !== 10) { setError('Enter a valid 10-digit phone number'); return; }
    if (!form.email.includes('@')) { setError('Enter a valid email address'); return; }

    setLoading(true);
    try {
      const bookingRef = `HP-${Date.now()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

      // Store instagram + guest info in udf fields via Easebuzz
      const res = await fetch('/api/payment/initiate-partial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingReference: bookingRef,
          chargeNow: totalAmount,
          totalAmount,
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          tripTitle: `House Party Ticket — ${ticket.label} x${ticket.id === 'couple' ? form.qty * 2 : form.qty} (${form.instagram || 'no-ig'})`,
          paymentMethod: 'upi',
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Payment initiation failed'); return; }

      // Redirect to Easebuzz
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else if (data.html) {
        document.open(); document.write(data.html); document.close();
      } else {
        setError('Could not initiate payment. Please try WhatsApp.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col"
        style={{ maxHeight: 'min(96dvh, 96vh)', overflow: 'hidden' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h3 className="font-bold text-gray-900 text-base">Book Your Ticket</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {ticket.label} — <span className="font-semibold text-gray-700">&#8377;{ticket.price.toLocaleString('en-IN')}</span>{ticket.id !== 'couple' ? ' per person' : ' for 2'}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"><X size={18} /></button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto flex-1 overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          <form onSubmit={handlePay} className="p-5 space-y-4 pb-8">

            {/* Qty */}
            {ticket.id !== 'couple' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Number of Tickets</label>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setForm(f => ({ ...f, qty: Math.max(1, f.qty - 1) }))}
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50">−</button>
                  <span className="font-bold text-lg text-gray-900 w-6 text-center">{form.qty}</span>
                  <button type="button" onClick={() => setForm(f => ({ ...f, qty: Math.min(10, f.qty + 1) }))}
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50">+</button>
                  <span className="text-sm text-gray-500 ml-1">= {guests} {guests === 1 ? 'guest' : 'guests'}</span>
                </div>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
              <input required type="text" placeholder="Your name" maxLength={80}
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400 placeholder:text-gray-400" />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp Number *</label>
              <div className="flex">
                <span className="px-3 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-500">+91</span>
                <input required type="tel" placeholder="10-digit number" maxLength={10}
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') }))}
                  className="flex-1 px-3 py-3 border border-gray-200 rounded-r-xl text-sm outline-none focus:border-indigo-400 placeholder:text-gray-400" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
              <input required type="email" placeholder="your@email.com"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400 placeholder:text-gray-400" />
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Instagram ID <span className="text-gray-400 font-normal">(optional but recommended)</span>
              </label>
              <div className="flex">
                <span className="px-3 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-500">
                  <Instagram size={15} className="text-pink-500" />
                </span>
                <input type="text" placeholder="@yourhandle"
                  value={form.instagram} onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))}
                  className="flex-1 px-3 py-3 border border-gray-200 rounded-r-xl text-sm outline-none focus:border-pink-400 placeholder:text-gray-400" />
              </div>
              <p className="text-xs text-gray-400 mt-1">We tag guests in party photos after the event</p>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{ticket.label} ticket × {ticket.id === 'couple' ? form.qty * 2 : form.qty}</span>
                <span className="font-semibold">&#8377;{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Food & drinks included</span>
                <span className="text-green-600 font-medium">Incl.</span>
              </div>
              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold text-gray-900">
                <span>Total payable</span>
                <span>&#8377;{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</> : <>
                <Shield className="w-4 h-4" /> Pay &#8377;{totalAmount.toLocaleString('en-IN')} Securely
              </>}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> Easebuzz secured</span>
              <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> UPI / Card / NetBanking</span>
            </div>

            <p className="text-xs text-center text-gray-400">
              Venue shared on WhatsApp after payment · 48-hr cancellation policy
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────────────── */
export default function HousePartyPage() {
  const [selectedTicket, setSelectedTicket] = useState<typeof TICKETS[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">

      {/* Back nav */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/events" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm bg-white/10 backdrop-blur px-3 py-1.5 rounded-full transition-colors">
          <ChevronLeft size={16} /> Events
        </Link>
      </div>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="relative h-[85vh] min-h-[600px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1574270981993-49ccc2e7f63e?w=1400&q=85"
          alt="House Party Vibes"
          fill className="object-cover opacity-50"
          priority
        />
        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/60 to-transparent" />

        <div className="relative z-10 px-5 pb-14 max-w-2xl">
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">House Party</span>
            <span className="bg-pink-500/80 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Pool Party</span>
            <span className="bg-amber-500/80 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Limited Seats</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-4">
            House Party<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Vibes</span>
          </h1>
          <p className="text-white/80 text-lg max-w-lg mb-6">
            Intimate yet electric — curated house party with pool access, chef-crafted finger food,
            artisan cocktails, and a surprise DJ set. Come alone, leave with new travel friends.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-indigo-400" /> 5 September 2026</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-pink-400" /> 8:30 PM onwards</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-amber-400" /> Gurgaon / Noida (shared on booking)</span>
            <span className="flex items-center gap-1.5"><Users size={14} className="text-green-400" /> Limited seats only</span>
          </div>
        </div>
      </div>

      {/* ── Ticket Section ─────────────────────────────────────── */}
      <div className="bg-[#0a0a14] px-5 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase mb-2">Entry Charges</p>
          <h2 className="text-3xl sm:text-4xl font-black">Choose Your Ticket</h2>
          <p className="text-white/50 mt-2">All tickets include food, drinks & goodie bag</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {TICKETS.map(ticket => (
            <div key={ticket.id}
              className={`relative rounded-2xl p-6 border-2 transition-all cursor-pointer ${
                ticket.highlight
                  ? 'border-indigo-500 bg-indigo-950/60 shadow-lg shadow-indigo-900/40'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
              onClick={() => setSelectedTicket(ticket)}>

              {ticket.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                </div>
              )}

              <span className={`inline-block text-white text-xs font-bold px-2.5 py-1 rounded-full mb-4 ${ticket.badgeColor}`}>
                {ticket.badge}
              </span>

              <h3 className="text-xl font-black mb-1">{ticket.label}</h3>
              <p className="text-white/40 text-xs mb-4">{ticket.note}</p>

              <div className="flex items-end gap-1 mb-5">
                <span className="text-white/50 text-lg">&#8377;</span>
                <span className="text-4xl font-black">{ticket.price.toLocaleString('en-IN')}</span>
                <span className="text-white/40 text-sm mb-1">{ticket.id === 'couple' ? '/ 2 people' : '/ person'}</span>
              </div>

              <ul className="space-y-2 mb-6">
                {ticket.perks.map(p => (
                  <li key={p} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle size={14} className="text-green-400 shrink-0" /> {p}
                  </li>
                ))}
              </ul>

              <button
                onClick={e => { e.stopPropagation(); setSelectedTicket(ticket); }}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                  ticket.highlight
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}>
                Book Now — &#8377;{ticket.price.toLocaleString('en-IN')}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Secure payment via Easebuzz · UPI, Card, Net Banking accepted · Venue disclosed after booking
        </p>
      </div>

      {/* ── What's Included ────────────────────────────────────── */}
      <div className="bg-white/5 px-5 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase mb-2 text-center">What's Included</p>
          <h2 className="text-3xl font-black text-center mb-10">What's Waiting for You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {EVENT_PERKS.map(perk => {
              const Icon = perk.icon;
              return (
                <div key={perk.label} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-indigo-400" />
                  </div>
                  <p className="font-bold text-sm">{perk.label}</p>
                  <p className="text-white/40 text-xs mt-1">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Photo Gallery ──────────────────────────────────────── */}
      <div className="px-5 py-16 max-w-5xl mx-auto">
        <p className="text-pink-400 text-xs font-bold tracking-widest uppercase mb-2 text-center">Gallery</p>
        <h2 className="text-3xl font-black text-center mb-3">Pool Party & House Party Pics</h2>
        <p className="text-white/40 text-sm text-center mb-10">From our previous events — tag us @ylootrips</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {GALLERY.map((img, i) => (
            <div key={i} className={`relative rounded-2xl overflow-hidden ${i === 0 || i === 5 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
              style={{ aspectRatio: i === 0 || i === 5 ? '1/1' : '4/3' }}>
              <Image src={img.src} alt={img.label} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/80">{img.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Reviews ────────────────────────────────────────────── */}
      <div className="bg-white/5 px-5 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-2 text-center">Reviews</p>
          <h2 className="text-3xl font-black text-center mb-2">What Guests Say</h2>
          <div className="flex items-center justify-center gap-1 mb-10">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" className="text-amber-400" />)}
            <span className="text-white/60 text-sm ml-2">4.9 · 200+ reviews</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${r.avatarColor}`}>
                    {r.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{r.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-pink-400 text-xs flex items-center gap-1">
                        <Instagram size={10} /> {r.ig}
                      </span>
                      <span className="text-white/30 text-xs">·</span>
                      <span className="text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded-full">{r.tag}</span>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(r.rating)].map((_, j) => <Star key={j} size={12} fill="#f59e0b" className="text-amber-400" />)}
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA Strip ──────────────────────────────────────────── */}
      <div className="px-5 py-16 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-r from-indigo-900/60 to-pink-900/60 border border-white/10 rounded-3xl p-10">
          <Zap className="w-10 h-10 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black mb-2">Limited Seats Left</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Pre-registration required. Venue shared only with confirmed guests. Book now before it sells out.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {TICKETS.map(t => (
              <button key={t.id} onClick={() => setSelectedTicket(t)}
                className="px-6 py-3 bg-white text-gray-900 font-bold rounded-xl text-sm hover:bg-gray-100 transition-colors">
                {t.label} — &#8377;{t.price.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
          <a href="https://wa.me/918427831127?text=Hi!%20I%20want%20to%20book%20the%20House%20Party%20ticket."
            target="_blank" rel="noopener noreferrer"
            className="mt-5 inline-block text-sm text-green-400 hover:text-green-300 underline underline-offset-2">
            Or WhatsApp us: +91 84278 31127
          </a>
        </div>
      </div>

      {/* ── Booking Modal ─────────────────────────────────────── */}
      {selectedTicket && (
        <BookingModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}
    </div>
  );
}
