'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  CheckCircle, Copy, MessageCircle, ArrowRight, PartyPopper,
  Calendar, MapPin, Ticket, User, Instagram, Loader2, Download
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface EntryPassData {
  ref: string;
  name: string;
  email: string;
  phone: string;
  instagram: string;
  ticketType: string;
  ticketId: string;
  guests: number;
  total: number;
  date: string;
  venue: string;
  bookedAt: string;
}

const TICKET_COLORS: Record<string, { gradient: string; glow: string; badge: string }> = {
  female: {
    gradient: 'linear-gradient(135deg,#ec4899,#f43f5e)',
    glow: 'rgba(236,72,153,0.35)',
    badge: 'linear-gradient(135deg,#ec4899,#f43f5e)',
  },
  single: {
    gradient: 'linear-gradient(135deg,#6366f1,#a855f7)',
    glow: 'rgba(99,102,241,0.4)',
    badge: 'linear-gradient(135deg,#6366f1,#a855f7)',
  },
  couple: {
    gradient: 'linear-gradient(135deg,#f59e0b,#f97316)',
    glow: 'rgba(245,158,11,0.35)',
    badge: 'linear-gradient(135deg,#f59e0b,#f97316)',
  },
};

function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {[...Array(18)].map((_, i) => (
        <div key={i} className="absolute animate-bounce"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `-${10 + (i * 7) % 20}px`,
            width: `${6 + (i % 4) * 2}px`,
            height: `${6 + (i % 4) * 2}px`,
            borderRadius: i % 3 === 0 ? '50%' : '2px',
            background: ['#ec4899', '#a855f7', '#6366f1', '#f59e0b', '#22c55e', '#f43f5e'][i % 6],
            animationDelay: `${(i * 0.15) % 1.5}s`,
            animationDuration: `${1.5 + (i % 5) * 0.3}s`,
            opacity: 0.7,
          }} />
      ))}
    </div>
  );
}

function EntryPassContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pass, setPass] = useState<EntryPassData | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const txnid = searchParams?.get('txnid') || params?.get('txnid') || null;
  const hpRef = searchParams?.get('ref') || params?.get('ref') || null;

  useEffect(() => {
    if (!txnid && !hpRef) return;

    // Try txnid first (TRP-xxx saved under that key), then HP- ref
    const raw = sessionStorage.getItem(`hp-entry-${txnid}`) || sessionStorage.getItem(`hp-entry-${hpRef}`);
    if (raw) {
      try {
        const data = JSON.parse(raw) as EntryPassData;
        setPass(data);
        // Also persist to localStorage so /my-booking can find it
        const existing = JSON.parse(localStorage.getItem('ylootrips-hp-bookings') || '[]');
        if (!existing.find((b: EntryPassData) => b.ref === data.ref)) {
          localStorage.setItem('ylootrips-hp-bookings', JSON.stringify([data, ...existing].slice(0, 20)));
        }
      } catch { /* malformed */ }
    }

    // Animate entry
    setTimeout(() => setShowPass(true), 400);
  }, [txnid]);

  const copy = () => {
    const id = hpRef || pass?.ref || txnid || '';
    if (!id) return;
    navigator.clipboard.writeText(id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const colors = TICKET_COLORS[pass?.ticketId || 'single'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 relative overflow-hidden"
      style={{ background: '#07070f' }}>

      <Confetti />

      {/* Glow orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0"
        style={{ background: 'rgba(168,85,247,0.07)' }} />
      <div className="fixed bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none z-0"
        style={{ background: 'rgba(236,72,153,0.06)' }} />

      <div className="relative z-10 w-full max-w-md">

        {/* Success indicator */}
        <div className={`text-center mb-8 transition-all duration-700 ${showPass ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.4)' }}>
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h1 className="text-2xl font-black text-white mb-1">Payment Confirmed! 🎉</h1>
          <p className="text-white/40 text-sm">Your entry pass is ready below</p>
        </div>

        {/* ── ENTRY PASS CARD ── */}
        <div className={`transition-all duration-700 delay-200 ${showPass ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-6'}`}>
          <div className="rounded-3xl overflow-hidden shadow-2xl"
            style={{ boxShadow: `0 0 60px ${colors?.glow || 'rgba(99,102,241,0.3)'}`, border: '1px solid rgba(255,255,255,0.1)' }}>

            {/* Pass top — event info */}
            <div className="relative p-6 pb-4" style={{ background: 'linear-gradient(135deg,#0f0f1f,#1a0f2e)' }}>
              {/* gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: colors?.gradient }} />

              {/* YLOO logo row */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="YLOO Trips" width={32} height={32} className="rounded-lg" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div>
                    <p className="text-white font-black text-sm leading-none">YLOO TRIPS</p>
                    <p className="text-white/30 text-xs">ylootrips.com</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-black"
                  style={{ background: colors?.badge, color: '#fff' }}>
                  ENTRY PASS
                </div>
              </div>

              {/* Event name */}
              <div className="mb-4">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Event</p>
                <h2 className="text-white font-black text-xl leading-tight">House Party Vibes ✦</h2>
                <p className="font-bold text-sm mt-0.5" style={{ background: colors?.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Come Single. Go Mingle.
                </p>
              </div>

              {/* Event details grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-white/40 shrink-0" />
                  <div>
                    <p className="text-white/35">Date</p>
                    <p className="text-white font-bold">{pass?.date || '5 September 2026'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-white/40 shrink-0" />
                  <div>
                    <p className="text-white/35">Venue</p>
                    <p className="text-white font-bold">{pass?.venue || 'Gurugram, Delhi NCR'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Perforation divider */}
            <div className="relative flex items-center" style={{ background: '#07070f' }}>
              <div className="w-6 h-6 rounded-full shrink-0 -ml-3" style={{ background: '#07070f', border: '1px solid rgba(255,255,255,0.08)' }} />
              <div className="flex-1 border-t-2 border-dashed border-white/10" />
              <div className="w-6 h-6 rounded-full shrink-0 -mr-3" style={{ background: '#07070f', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>

            {/* Pass bottom — holder info */}
            <div className="p-6 pt-4" style={{ background: 'linear-gradient(135deg,#0f0f1f,#1a0f2e)' }}>
              <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                <div>
                  <div className="flex items-center gap-1 text-white/35 mb-0.5"><User size={10} /> Holder</div>
                  <p className="text-white font-black text-sm">{pass?.name || '—'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-white/35 mb-0.5"><Ticket size={10} /> Ticket Type</div>
                  <p className="text-white font-black text-sm">{pass?.ticketType || '—'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-white/35 mb-0.5"><User size={10} /> Guests</div>
                  <p className="text-white font-black text-sm">{pass?.guests ?? '—'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-white/35 mb-0.5">₹ Amount Paid</div>
                  <p className="text-white font-black text-sm">₹{pass?.total?.toLocaleString('en-IN') || '—'}</p>
                </div>
                {pass?.instagram && (
                  <div className="col-span-2">
                    <div className="flex items-center gap-1 text-white/35 mb-0.5"><Instagram size={10} /> Instagram</div>
                    <p className="text-pink-400 font-bold text-sm">{pass.instagram}</p>
                  </div>
                )}
              </div>

              {/* Booking ID */}
              <div className="rounded-2xl p-4 mt-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-white/35 text-xs mb-1.5 uppercase tracking-widest">Booking ID</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono font-black text-white text-sm tracking-wider break-all">{hpRef || pass?.ref || txnid || '—'}</p>
                  <button onClick={copy} className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/20"
                    style={{ background: 'rgba(255,255,255,0.08)' }}>
                    {copied ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} className="text-white/60" />}
                  </button>
                </div>
              </div>

              {/* Barcode-style decoration */}
              <div className="mt-4 flex gap-0.5 justify-center opacity-20">
                {[...Array(32)].map((_, i) => (
                  <div key={i} className="bg-white rounded-full" style={{ width: i % 3 === 0 ? '3px' : '1.5px', height: i % 5 === 0 ? '28px' : '20px' }} />
                ))}
              </div>
              <p className="text-center text-white/15 text-xs mt-1 font-mono">{(txnid || pass?.ref || '').slice(0, 24)}</p>

              {/* Note */}
              <p className="text-center text-white/25 text-xs mt-4 leading-relaxed">
                Carry this pass to the venue · ID check at entry · 21+ only
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className={`mt-6 space-y-3 transition-all duration-700 delay-400 ${showPass ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

          <button onClick={() => router.push(`/my-booking?ref=${hpRef || pass?.ref || txnid}`)}
            className="w-full py-4 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
            style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}>
            <Ticket size={16} /> View My Booking <ArrowRight size={16} />
          </button>

          <a href={`https://wa.me/918427831127?text=Hi!%20I%20just%20booked%20a%20House%20Party%20ticket.%20My%20Booking%20ID%20is%20${encodeURIComponent(hpRef || pass?.ref || txnid || '')}.%20Please%20confirm%20venue%20details.`}
            target="_blank" rel="noopener noreferrer"
            className="w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
            style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80' }}>
            <MessageCircle size={16} /> WhatsApp us for venue details
          </a>

          <Link href="/events/house-party"
            className="w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}>
            <PartyPopper size={13} /> Back to House Party Page
          </Link>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Confirmation also sent to {pass?.email || 'your email'} · Save your Booking ID
        </p>
      </div>
    </div>
  );
}

export default function HousePartySuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#07070f' }}>
        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
      </div>
    }>
      <EntryPassContent />
    </Suspense>
  );
}
