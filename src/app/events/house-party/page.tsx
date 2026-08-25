'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Calendar, Clock, Users, Star, Instagram,
  CheckCircle, X, Loader2, ChevronLeft, Shield,
  Smartphone, Wine, Music2, Flame, PartyPopper, ChevronRight,
  BadgeCheck, AlertTriangle, RefreshCw
} from 'lucide-react';

interface TicketTier {
  id: string;
  label: string;
  note: string;
  price: number;
  defaultPrice: number;
  updatedAt: string | null;
}

const TICKET_CONFIG: Record<string, {
  emoji: string;
  gradient: string;
  ring: string;
  highlight: boolean;
  perks: string[];
  tag: string;
}> = {
  female: {
    emoji: '👑',
    gradient: 'from-pink-500/20 to-rose-500/10',
    ring: 'ring-pink-500/50',
    highlight: false,
    tag: 'Ladies Special',
    perks: ['Solo female entry', 'Welcome drink on arrival', 'Craft mocktails bar access', 'Meet & mingle with travellers'],
  },
  single: {
    emoji: '🔥',
    gradient: 'from-indigo-500/20 to-purple-500/10',
    ring: 'ring-indigo-500/60',
    highlight: true,
    tag: 'Stag Entry',
    perks: ['Solo male entry', 'Welcome drink on arrival', 'DJ + dance floor access', 'Travel tribe mixer'],
  },
  couple: {
    emoji: '💫',
    gradient: 'from-amber-500/20 to-orange-500/10',
    ring: 'ring-amber-500/50',
    highlight: false,
    tag: 'Couple / Friends',
    perks: ['Entry for 2 people', '2 welcome drinks', 'Priority zone access', 'Couples photo spot'],
  },
};

const TICKET_ORDER = ['female', 'single', 'couple'];

const REVIEWS = [
  { name: 'Jatin Balani', ig: '@jatin___balani__', rating: 5, text: 'Literally the best night of my life. The vibe was IMMACULATE. Made 6 new travel bestiesss!!', avatar: 'JB', color: 'from-pink-400 to-rose-500' },
  { name: 'Sagar Wadhwa', ig: '@wadhwa.sagar', rating: 5, text: 'Came alone, left with a whole squad planning Bali. The music was different level fr fr 🔥', avatar: 'SW', color: 'from-indigo-400 to-purple-500' },
  { name: 'Deepak Bargali', ig: '@pahadi_fitnesss', rating: 5, text: 'The pool + party combo was ELITE. No boring crowd — only travel people. Already booked next one ngl', avatar: 'DB', color: 'from-violet-400 to-purple-500' },
  { name: 'Manvi Saroya', ig: '@a_tallgirl__', rating: 5, text: 'The BYOB policy was such a vibe — brought my fave whisky, made cocktails with the bar setup. W event 🙌', avatar: 'MS', color: 'from-amber-400 to-orange-500' },
];

/* ── Booking Modal ────────────────────────────────────────────── */
function BookingModal({ ticket, onClose }: { ticket: TicketTier; onClose: () => void }) {
  const cfg = TICKET_CONFIG[ticket.id];
  const [form, setForm] = useState({ name: '', phone: '', email: '', instagram: '', qty: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const guests = ticket.id === 'couple' ? form.qty * 2 : form.qty;
  const total = ticket.price * form.qty;

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.phone.replace(/\D/g, '').length !== 10) { setError('Enter valid 10-digit number'); return; }
    if (!form.email.includes('@')) { setError('Enter valid email'); return; }
    setLoading(true);
    try {
      const ref = `HP-${ticket.id.toUpperCase()}-${Date.now()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
      const res = await fetch('/api/payment/initiate-partial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingReference: ref,
          chargeNow: total,
          totalAmount: total,
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          tripTitle: `House Party — ${ticket.label} x${guests}${form.instagram ? ` IG:${form.instagram}` : ''}`,
          paymentMethod: 'upi',
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Payment failed. Try WhatsApp.'); return; }
      if (data.redirectUrl) window.location.href = data.redirectUrl;
      else if (data.html) { document.open(); document.write(data.html); document.close(); }
      else setError('Could not start payment. WhatsApp us to book.');
    } catch { setError('Network error. Try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
        style={{ maxHeight: 'min(96dvh,96vh)', background: 'linear-gradient(135deg,#0d0d1f 0%,#130d1f 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>

        {/* glow top */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cfg.gradient.replace('/20', '').replace('/10', '')}`} style={{ background: ticket.id === 'female' ? 'linear-gradient(90deg,#ec4899,#f43f5e)' : ticket.id === 'single' ? 'linear-gradient(90deg,#6366f1,#a855f7)' : 'linear-gradient(90deg,#f59e0b,#f97316)' }} />

        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{cfg.emoji}</span>
            <div>
              <p className="font-black text-white text-sm">{ticket.label} Ticket</p>
              <p className="text-xs text-white/40">&#8377;{ticket.price.toLocaleString('en-IN')} {ticket.id === 'couple' ? '/ 2 people' : '/ person'}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20"><X size={16} /></button>
        </div>

        <div className="overflow-y-auto flex-1" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          <form onSubmit={pay} className="p-5 space-y-4 pb-10">

            {ticket.id !== 'couple' && (
              <div>
                <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Tickets</p>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setForm(f => ({ ...f, qty: Math.max(1, f.qty - 1) }))}
                    className="w-9 h-9 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 flex items-center justify-center">−</button>
                  <span className="text-xl font-black text-white w-8 text-center">{form.qty}</span>
                  <button type="button" onClick={() => setForm(f => ({ ...f, qty: Math.min(10, f.qty + 1) }))}
                    className="w-9 h-9 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 flex items-center justify-center">+</button>
                  <span className="text-sm text-white/40">{guests} {guests === 1 ? 'guest' : 'guests'}</span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider block mb-1.5">Your Name *</label>
                <input required placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl text-sm text-white placeholder:text-white/25 outline-none focus:ring-1 focus:ring-indigo-500"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }} />
              </div>
              <div>
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider block mb-1.5">WhatsApp *</label>
                <div className="flex">
                  <span className="px-3 py-3 text-sm text-white/40 rounded-l-2xl flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRight: 0 }}>+91</span>
                  <input required type="tel" maxLength={10} placeholder="10-digit number" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') }))}
                    className="flex-1 px-4 py-3 rounded-r-2xl text-sm text-white placeholder:text-white/25 outline-none focus:ring-1 focus:ring-indigo-500"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }} />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider block mb-1.5">Email *</label>
                <input required type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl text-sm text-white placeholder:text-white/25 outline-none focus:ring-1 focus:ring-indigo-500"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }} />
              </div>
              <div>
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider block mb-1.5">
                  Instagram <span className="normal-case text-white/25 font-normal">(optional — we'll tag you in pics)</span>
                </label>
                <div className="flex">
                  <span className="px-3 py-3 flex items-center rounded-l-2xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRight: 0 }}>
                    <Instagram size={14} className="text-pink-400" />
                  </span>
                  <input type="text" placeholder="@yourhandle" value={form.instagram} onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))}
                    className="flex-1 px-4 py-3 rounded-r-2xl text-sm text-white placeholder:text-white/25 outline-none focus:ring-1 focus:ring-pink-500"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }} />
                </div>
              </div>
            </div>

            {/* UPI note */}
            <div className="flex items-center gap-2.5 rounded-2xl px-4 py-3" style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}>
              <Smartphone size={16} className="text-indigo-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-indigo-300">UPI Payment Only</p>
                <p className="text-xs text-white/35 mt-0.5">GPay · PhonePe · Paytm · BHIM · Any UPI app</p>
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-2xl p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">{ticket.label} × {form.qty}</span>
                <span className="text-white font-bold">&#8377;{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-white/35">
                <span>Food & welcome drink incl.</span>
                <span className="text-green-400">✓ Included</span>
              </div>
              <div className="flex justify-between text-xs text-white/35">
                <span>BYOB allowed</span>
                <span className="text-green-400">✓ Welcome</span>
              </div>
              <div className="pt-2 border-t border-white/8 flex justify-between font-black text-white">
                <span>Total</span>
                <span>&#8377;{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {error && <p className="text-sm text-red-400 text-center">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all"
              style={{ background: ticket.id === 'female' ? 'linear-gradient(135deg,#ec4899,#f43f5e)' : ticket.id === 'single' ? 'linear-gradient(135deg,#6366f1,#a855f7)' : 'linear-gradient(135deg,#f59e0b,#f97316)', opacity: loading ? 0.7 : 1 }}>
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Opening UPI…</> : <><Shield size={15} /> Pay &#8377;{total.toLocaleString('en-IN')} via UPI</>}
            </button>

            <p className="text-xs text-center text-white/25">Gurugram venue · Exact address on WhatsApp 24-48h before event · Full refund if cancelled 48h+ early</p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Hardcoded fallback prices (used if API unavailable) ─────── */
const FALLBACK_TICKETS: TicketTier[] = [
  { id: 'female', label: 'Female', note: 'Ladies special', price: 499,  defaultPrice: 499,  updatedAt: null },
  { id: 'single', label: 'Stag (Men)', note: 'Single entry',  price: 1999, defaultPrice: 1999, updatedAt: null },
  { id: 'couple', label: 'Couple',    note: 'For 2 people',   price: 1999, defaultPrice: 1999, updatedAt: null },
];

/* ── Page ─────────────────────────────────────────────────────── */
export default function HousePartyPage() {
  const [tickets, setTickets] = useState<TicketTier[]>(FALLBACK_TICKETS);
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [selected, setSelected] = useState<TicketTier | null>(null);

  useEffect(() => {
    fetch('/api/admin/house-party-prices')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.data?.length) setTickets(d.data); })
      .catch(() => {});
  }, []);

  const orderedTickets = TICKET_ORDER.map(id => tickets.find(t => t.id === id)).filter(Boolean) as TicketTier[];

  return (
    <div className="min-h-screen text-white" style={{ background: '#07070f' }}>

      {/* back */}
      <div className="fixed top-4 left-4 z-20">
        <Link href="/events" className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-bold px-3 py-2 rounded-full backdrop-blur-md transition-all"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <ChevronLeft size={14} /> EVENTS
        </Link>
      </div>

      {/* ═══════════════════════════════════════ HERO ══ */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* bg image */}
        <Image src="https://images.unsplash.com/photo-1574270981993-49ccc2e7f63e?w=1600&q=90"
          alt="House Party" fill className="object-cover" priority style={{ opacity: 0.35 }} />

        {/* animated gradient overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #07070f 30%, transparent 80%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(99,102,241,0.25) 0%, transparent 60%)' }} />

        {/* neon glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(236,72,153,0.08)' }} />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(99,102,241,0.1)' }} />

        <div className="relative z-10 px-5 pb-20 pt-28 max-w-3xl mx-auto w-full text-center">
          {/* tag pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {['Delhi NCR', '5 Sept', 'Limited Seats', 'BYOB', '21+ Only'].map(tag => (
              <span key={tag} className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: tag === '21+ Only' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.08)', border: tag === '21+ Only' ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.15)', color: tag === '21+ Only' ? '#f87171' : 'rgba(255,255,255,0.7)' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* headline */}
          <h1 className="font-black leading-none mb-5" style={{ fontSize: 'clamp(3rem,10vw,5.5rem)' }}>
            <span style={{ background: 'linear-gradient(135deg,#fff 30%,rgba(255,255,255,0.5))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              House Party
            </span>
            <br />
            <span style={{ background: 'linear-gradient(135deg,#ec4899,#a855f7,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Vibes ✦
            </span>
          </h1>

          {/* Tagline */}
          <div className="mb-6">
            <p className="font-black text-white mb-1" style={{ fontSize: 'clamp(1.3rem,4vw,2rem)', letterSpacing: '-0.02em' }}>
              Come Single.{' '}
              <span style={{ background: 'linear-gradient(135deg,#ec4899,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Go Mingle.
              </span>
            </p>
            <p className="text-white/40 text-sm font-medium tracking-wide">
              A night where strangers become your travel squad — and maybe something more&nbsp;😉
            </p>
          </div>

          <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Pool access · DJ all night · Chef food · BYOB welcome<br />
            <span className="text-white/30">Come alone — leave with a whole crew.</span>
          </p>

          {/* event info pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-4 text-sm">
            {[
              { icon: Calendar, text: '5 September 2026', color: '#a855f7' },
              { icon: Clock, text: '8:30 PM onwards', color: '#ec4899' },
              { icon: MapPin, text: 'Gurugram, Delhi NCR', color: '#f59e0b' },
              { icon: Users, text: 'Limited seats', color: '#22c55e' },
            ].map(({ icon: Icon, text, color }) => (
              <span key={text} className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
                <Icon size={13} style={{ color }} /> {text}
              </span>
            ))}
          </div>
          {/* Venue transparency note */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}>
            <Shield size={12} className="text-indigo-400" />
            <span className="text-white/50">Exact venue address confirmed via WhatsApp 24-48h before event — standard for all our private parties</span>
          </div>

          <button onClick={() => { const el = document.getElementById('tickets'); el?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7,#ec4899)', boxShadow: '0 0 40px rgba(168,85,247,0.4)' }}>
            <PartyPopper size={16} /> Grab Your Spot
          </button>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <span className="text-xs text-white/50 font-medium">scroll</span>
          <ChevronRight size={16} className="text-white rotate-90 animate-bounce" />
        </div>
      </section>

      {/* ═══════════════════════════════ BYOB SECTION ══ */}
      <section className="py-14 px-5">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl p-7 text-center" style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.1),rgba(249,115,22,0.08))', border: '1px solid rgba(245,158,11,0.2)' }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wine size={28} className="text-amber-400" />
              <h2 className="text-2xl font-black text-white">BYOB Policy</h2>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}>
              <span className="text-amber-400 font-black text-sm">B · Y · O · B</span>
            </div>
            <p className="text-white font-bold text-lg mb-2">Bring Your Own Bottle / Beer / Booze / Beverage</p>
            <p className="text-white/55 text-sm leading-relaxed max-w-lg mx-auto mb-5">
              We keep things real — the venue won't provide alcohol. Bring your own drink of choice
              and we'll provide the ice, mixers, glasses & vibe. Welcome drinks & mocktails are on us for everyone.
            </p>
            <div className="grid grid-cols-3 gap-3 text-sm">
              {['Whisky & Rum', 'Beer & Wine', 'Anything 🎉'].map(item => (
                <div key={item} className="rounded-xl py-2.5 px-3 text-amber-300 font-semibold text-xs"
                  style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.15)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ SAFETY ══ */}
      <section className="py-10 px-5">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl p-7" style={{ background: 'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(16,185,129,0.05))', border: '1px solid rgba(34,197,94,0.2)' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.15)' }}>
                <Shield size={20} className="text-green-400" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Your Safety, Our Priority</h2>
                <p className="text-xs text-white/40">Every YLOO event follows a strict safety protocol</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: BadgeCheck, text: 'ID verified entry — Aadhaar or DL checked at door' },
                { icon: Shield, text: 'Security personnel on-site throughout the event' },
                { icon: Users, text: 'Female safety coordinator present all night' },
                { icon: AlertTriangle, text: 'Zero harassment policy — violators removed immediately' },
                { icon: BadgeCheck, text: '21+ only event — age strictly enforced at entry' },
                { icon: Smartphone, text: 'Emergency WhatsApp contact shared post-booking' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <Icon size={14} className="text-green-400 mt-0.5 shrink-0" />
                  <p className="text-white/60 text-xs leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <p className="text-white/25 text-xs mt-4 text-center">Questions? WhatsApp us at +91 84278 31127 before booking</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ TICKETS ══ */}
      <section id="tickets" className="py-14 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black tracking-[0.3em] text-indigo-400 uppercase mb-3">Entry Charges</p>
            <h2 className="font-black text-white mb-2" style={{ fontSize: 'clamp(1.8rem,5vw,3rem)' }}>
              Choose Your Vibe
            </h2>
            <p className="text-white/40 text-sm">All tickets include food + welcome drink · BYOB welcome · Pay via UPI</p>
          </div>

          {loadingPrices ? (
            <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-indigo-400" /></div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              {orderedTickets.map(ticket => {
                const cfg = TICKET_CONFIG[ticket.id];
                const gradientBg = ticket.id === 'female'
                  ? 'linear-gradient(135deg,rgba(236,72,153,0.12),rgba(244,63,94,0.06))'
                  : ticket.id === 'single'
                  ? 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(168,85,247,0.08))'
                  : 'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(249,115,22,0.06))';
                const borderColor = ticket.id === 'female' ? 'rgba(236,72,153,0.35)' : ticket.id === 'single' ? 'rgba(99,102,241,0.45)' : 'rgba(245,158,11,0.35)';
                const glowColor = ticket.id === 'female' ? 'rgba(236,72,153,0.2)' : ticket.id === 'single' ? 'rgba(99,102,241,0.25)' : 'rgba(245,158,11,0.2)';
                const btnGradient = ticket.id === 'female' ? 'linear-gradient(135deg,#ec4899,#f43f5e)' : ticket.id === 'single' ? 'linear-gradient(135deg,#6366f1,#a855f7)' : 'linear-gradient(135deg,#f59e0b,#f97316)';

                return (
                  <div key={ticket.id} className="relative rounded-3xl p-6 cursor-pointer transition-all hover:-translate-y-1"
                    style={{ background: gradientBg, border: `1px solid ${borderColor}`, boxShadow: cfg.highlight ? `0 0 40px ${glowColor}` : 'none' }}
                    onClick={() => setSelected(ticket)}>

                    {cfg.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <span className="text-white text-xs font-black px-4 py-1 rounded-full"
                          style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
                          🔥 Most Popular
                        </span>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{cfg.emoji}</span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {cfg.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white mb-1">{ticket.label}</h3>
                    <p className="text-white/35 text-xs mb-4">{ticket.note}</p>

                    <div className="mb-5">
                      <span className="text-white/40 text-base">₹</span>
                      <span className="text-5xl font-black text-white">{ticket.price.toLocaleString('en-IN')}</span>
                      <span className="text-white/35 text-sm ml-1">{ticket.id === 'couple' ? '/ 2 people' : '/ person'}</span>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {cfg.perks.map(p => (
                        <li key={p} className="flex items-center gap-2 text-sm text-white/65">
                          <CheckCircle size={14} className="text-green-400 shrink-0" /> {p}
                        </li>
                      ))}
                      <li className="flex items-center gap-2 text-sm text-amber-300/80">
                        <Wine size={14} className="shrink-0" /> BYOB welcome
                      </li>
                    </ul>

                    <button onClick={e => { e.stopPropagation(); setSelected(ticket); }}
                      className="w-full py-3.5 rounded-2xl font-black text-sm text-white transition-all hover:opacity-90 active:scale-95"
                      style={{ background: btnGradient }}>
                      Book Now — ₹{ticket.price.toLocaleString('en-IN')}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-center text-white/20 text-xs mt-6">
            Secure payment via Easebuzz · UPI only · Venue address shared on WhatsApp 24-48h before event
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ CANCELLATION POLICY ══ */}
      <section className="py-6 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs font-black text-white/50 uppercase tracking-widest mb-4 text-center">Cancellation & Refund Policy</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { icon: CheckCircle, color: '#22c55e', title: 'Full Refund', sub: 'Cancel 48h+ before the event' },
                { icon: AlertTriangle, color: '#f59e0b', title: 'No Refund', sub: 'Within 48h of the event start' },
                { icon: RefreshCw, color: '#6366f1', title: 'Free Transfer', sub: 'Event postponed → shift to next date' },
              ].map(({ icon: Icon, color, title, sub }) => (
                <div key={title} className="flex items-center gap-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <Icon size={18} style={{ color }} className="shrink-0" />
                  <div>
                    <p className="text-white text-xs font-bold">{title}</p>
                    <p className="text-white/35 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ VIBES ══ */}
      <section className="py-14 px-5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-black tracking-[0.3em] text-pink-400 uppercase mb-3 text-center">What's the vibe</p>
          <h2 className="text-center font-black text-white mb-10" style={{ fontSize: 'clamp(1.6rem,4vw,2.5rem)' }}>A night you won't forget</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: Music2, label: 'DJ All Night', desc: 'Live DJ + curated playlist', color: '#a855f7' },
              { icon: Flame, label: 'Chef Food', desc: 'Finger food & desserts', color: '#f43f5e' },
              { icon: Wine, label: 'BYOB Friendly', desc: 'Bring your own drinks', color: '#f59e0b' },
              { icon: Instagram, label: 'Aesthetic Setup', desc: 'Perfect for the gram', color: '#ec4899' },
              { icon: Users, label: 'Travel Tribe', desc: 'Meet your next trip squad', color: '#22c55e' },
              { icon: PartyPopper, label: 'Surprise Acts', desc: 'Something special every time', color: '#6366f1' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl p-5 group hover:-translate-y-0.5 transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${item.color}18` }}>
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <p className="font-bold text-sm text-white">{item.label}</p>
                  <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ REVIEWS ══ */}
      <section className="py-14 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-black tracking-[0.3em] text-amber-400 uppercase mb-3 text-center">Real people, real vibes</p>
          <h2 className="text-center font-black text-white mb-2" style={{ fontSize: 'clamp(1.6rem,4vw,2.5rem)' }}>
            What they said
          </h2>
          <div className="flex justify-center items-center gap-1 mb-10">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" className="text-amber-400" />)}
            <span className="text-white/40 text-sm ml-2">4.9 avg · 200+ attendees</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white shrink-0"
                    style={{ background: `linear-gradient(135deg,${r.color})` }}>
                    {r.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{r.name}</p>
                    <span className="text-pink-400 text-xs flex items-center gap-1"><Instagram size={10} /> {r.ig}</span>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(r.rating)].map((_, j) => <Star key={j} size={11} fill="#f59e0b" className="text-amber-400" />)}
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ FINAL CTA ══ */}
      <section className="py-20 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative rounded-3xl overflow-hidden p-10"
            style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(236,72,153,0.15))', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(168,85,247,0.2),transparent 70%)' }} />
            <p className="text-4xl mb-4">🎉</p>
            <h2 className="font-black text-white text-3xl mb-3">Don't sleep on this.</h2>
            <p className="text-white/50 mb-8 text-sm leading-relaxed">
              Seats are going fast. Once it's sold out, it's sold out. <br />No walk-ins. No excuses.
            </p>
            {!loadingPrices && (
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {orderedTickets.map(t => {
                  const gradient = t.id === 'female' ? 'linear-gradient(135deg,#ec4899,#f43f5e)' : t.id === 'single' ? 'linear-gradient(135deg,#6366f1,#a855f7)' : 'linear-gradient(135deg,#f59e0b,#f97316)';
                  return (
                    <button key={t.id} onClick={() => setSelected(t)}
                      className="px-5 py-3 rounded-2xl font-black text-sm text-white transition-all hover:scale-105 active:scale-95"
                      style={{ background: gradient }}>
                      {TICKET_CONFIG[t.id].emoji} {t.label} — ₹{t.price.toLocaleString('en-IN')}
                    </button>
                  );
                })}
              </div>
            )}
            <a href="https://wa.me/918427831127?text=Hi!%20I%20want%20to%20book%20the%20House%20Party%20ticket."
              target="_blank" rel="noopener noreferrer"
              className="text-xs text-green-400 hover:text-green-300 underline underline-offset-4">
              or WhatsApp us: +91 84278 31127
            </a>
          </div>
        </div>
      </section>

      {selected && <BookingModal ticket={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
