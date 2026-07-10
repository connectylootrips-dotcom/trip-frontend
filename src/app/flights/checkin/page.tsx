'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
    Plane, Shield, CheckCircle, User, Clock, ArrowRight, Home,
    ChevronRight, Info, Luggage,
} from 'lucide-react';

// ─── Boarding Pass ────────────────────────────────────────────────────────────

function BoardingPass({ pnr, passenger, flight, seat, cabin }: {
    pnr: string;
    passenger: { title: string; firstName: string; lastName: string };
    flight: { airline: string; code?: string; flightNum: string; from: string; to: string; dep: string; arr: string; date: string };
    seat: string;
    cabin: string;
}) {
    const cabinLabels: Record<string, string> = {
        economy: 'ECO', premium_economy: 'PRE', business: 'BUS',
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 print:shadow-none">
            {/* Header strip */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center justify-between">
                <div>
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">YlooTrips</p>
                    <p className="text-white font-bold text-lg">Boarding Pass</p>
                </div>
                <div className="text-right">
                    <p className="text-white/70 text-xs uppercase tracking-wide">Class</p>
                    <p className="text-white font-black text-lg">{cabinLabels[cabin] || 'ECO'}</p>
                </div>
            </div>

            {/* Main section */}
            <div className="p-6">
                {/* Passenger name */}
                <div className="mb-5">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Passenger Name</p>
                    <p className="text-2xl font-black text-gray-900 mt-0.5">
                        {passenger.title} {passenger.firstName.toUpperCase()} {passenger.lastName.toUpperCase()}
                    </p>
                </div>

                {/* Route */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="text-center">
                        <p className="text-4xl font-black text-gray-900 tracking-tight">{flight.dep}</p>
                        <p className="text-xs font-bold text-gray-400 uppercase mt-0.5">{flight.from}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1">
                        <div className="flex items-center w-full gap-2">
                            <div className="flex-1 h-px bg-gray-200" />
                            <Plane size={20} className="text-amber-500 shrink-0" />
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>
                        <p className="text-[11px] font-bold text-gray-400">{flight.airline} · {flight.flightNum}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-black text-gray-900 tracking-tight">{flight.arr}</p>
                        <p className="text-xs font-bold text-gray-400 uppercase mt-0.5">{flight.to}</p>
                    </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-dashed border-gray-200">
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Date</p>
                        <p className="font-bold text-gray-900 text-sm mt-0.5">{flight.date}</p>
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Seat</p>
                        <p className="font-black text-amber-600 text-xl mt-0.5 font-mono">{seat || '—'}</p>
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Gate</p>
                        <p className="font-bold text-gray-900 text-sm mt-0.5">TBA</p>
                    </div>
                </div>

                {/* Tear line */}
                <div className="flex items-center gap-2 my-4">
                    <div className="w-5 h-5 rounded-full bg-gray-100 border-2 border-gray-200 -ml-8" />
                    <div className="flex-1 border-t-2 border-dashed border-gray-200" />
                    <div className="w-5 h-5 rounded-full bg-gray-100 border-2 border-gray-200 -mr-8" />
                </div>

                {/* PNR + barcode stub */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">PNR</p>
                        <p className="text-2xl font-black tracking-widest text-gray-900 font-mono">{pnr}</p>
                    </div>
                    {/* Fake barcode */}
                    <div className="flex gap-0.5 h-12 items-end">
                        {[3,1,4,1,5,2,6,1,3,2,4,3,1,5,2,3,4,1,2,5,3,1,4,2].map((h, i) => (
                            <div key={i} style={{ height: `${h * 10}%` }} className="w-1 bg-gray-900" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom strip */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Luggage size={12} /> 15 kg check-in · 7 kg cabin
                </div>
                <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
                    <CheckCircle size={12} /> Checked In
                </div>
            </div>
        </div>
    );
}

// ─── Check-in Form ────────────────────────────────────────────────────────────

function CheckInContent() {
    const sp = useSearchParams();
    const prefillPnr = sp.get('pnr') || '';
    const prefillLn = sp.get('ln') || '';

    const [pnr, setPnr] = useState(prefillPnr);
    const [lastName, setLastName] = useState(prefillLn);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [checkedIn, setCheckedIn] = useState(false);
    const [booking, setBooking] = useState<{
        pnr: string;
        passenger: { title: string; firstName: string; lastName: string };
        flight: { airline: string; code?: string; flightNum: string; from: string; to: string; dep: string; arr: string; date: string };
        seat: string;
        cabin: string;
    } | null>(null);

    // Auto-populate from session if prefilled
    useEffect(() => {
        if (prefillPnr && prefillLn && typeof window !== 'undefined') {
            const raw = sessionStorage.getItem('pendingFlightBooking');
            if (!raw) return;
            try {
                const data = JSON.parse(raw);
                const fn = data.passengers?.[0];
                if (fn && fn.lastName.toUpperCase() === prefillLn.toUpperCase()) {
                    setBooking({
                        pnr: prefillPnr,
                        passenger: { title: fn.title, firstName: fn.firstName, lastName: fn.lastName },
                        flight: data.flight,
                        seat: data.seats?.[0] || '',
                        cabin: data.flight?.cabin || 'economy',
                    });
                }
            } catch { /* ignore */ }
        }
    }, [prefillPnr, prefillLn]);

    const handleSearch = () => {
        if (!pnr.trim() || !lastName.trim()) {
            setError('Please enter both PNR and last name.');
            return;
        }
        setError('');
        setLoading(true);

        // Try session storage first
        setTimeout(() => {
            if (typeof window !== 'undefined') {
                const raw = sessionStorage.getItem('pendingFlightBooking');
                if (raw) {
                    try {
                        const data = JSON.parse(raw);
                        const fn = data.passengers?.[0];
                        if (fn && fn.lastName.toUpperCase() === lastName.trim().toUpperCase()) {
                            setBooking({
                                pnr: pnr.trim().toUpperCase(),
                                passenger: { title: fn.title, firstName: fn.firstName, lastName: fn.lastName },
                                flight: data.flight,
                                seat: data.seats?.[0] || '',
                                cabin: data.flight?.cabin || 'economy',
                            });
                            setLoading(false);
                            return;
                        }
                    } catch { /* ignore */ }
                }
            }
            setError('Booking not found. Please check your PNR and last name. If the issue persists, contact us on WhatsApp.');
            setLoading(false);
        }, 1000);
    };

    const handleCheckIn = () => {
        setCheckedIn(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-amber-600">YlooTrips</Link>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Plane size={14} className="text-amber-500" /> Web Check-in
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full font-semibold">
                        <Shield size={12} /> Secure
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="bg-amber-500">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        {['Find Booking', 'Review Details', 'Get Boarding Pass'].map((label, i) => {
                            const done = (i === 0 && (booking || checkedIn)) || (i === 1 && checkedIn);
                            const active = (i === 0 && !booking) || (i === 1 && booking && !checkedIn) || (i === 2 && checkedIn);
                            return (
                                <div key={label} className="flex items-center gap-2">
                                    {i > 0 && <ChevronRight size={14} className="text-amber-200 shrink-0" />}
                                    <div className={`flex items-center gap-2 transition-opacity ${active ? 'opacity-100' : done ? 'opacity-80' : 'opacity-50'}`}>
                                        <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${active ? 'bg-white text-amber-600' : done ? 'bg-amber-400 text-white' : 'border border-amber-200 text-amber-100'}`}>
                                            {done ? <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> : i + 1}
                                        </span>
                                        <span className="hidden sm:inline">{label}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">

                {/* ── Boarding Pass (after check-in) ── */}
                {checkedIn && booking && (
                    <>
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold text-gray-900">Your Boarding Pass</h1>
                            <button onClick={() => window.print()}
                                className="flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 border border-amber-300 rounded-lg px-3 py-1.5 hover:bg-amber-50 transition-colors">
                                Print
                            </button>
                        </div>
                        <BoardingPass
                            pnr={booking.pnr}
                            passenger={booking.passenger}
                            flight={booking.flight}
                            seat={booking.seat}
                            cabin={booking.cabin}
                        />
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                            <Info size={16} className="text-amber-600 mt-0.5 shrink-0" />
                            <div className="text-sm text-amber-800">
                                <p className="font-semibold mb-1">Before you fly</p>
                                <ul className="space-y-1 text-amber-700 text-xs list-disc list-inside">
                                    <li>Arrive at the airport at least 2 hours before departure (3h for international)</li>
                                    <li>Carry a valid government-issued photo ID</li>
                                    <li>Check-in baggage drop closes 45 minutes before departure</li>
                                    <li>Gate number will be displayed at the airport</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/"
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors">
                                <Home size={16} /> Back to Home
                            </Link>
                            <a href="https://wa.me/918427831127"
                                target="_blank" rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-xl transition-colors">
                                Need Help?
                            </a>
                        </div>
                    </>
                )}

                {/* ── Review + Confirm (booking found, not yet checked in) ── */}
                {booking && !checkedIn && (
                    <>
                        <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 flex items-center gap-3">
                            <CheckCircle size={20} className="text-green-600 shrink-0" />
                            <div>
                                <p className="font-bold text-green-800">Booking Found</p>
                                <p className="text-sm text-green-700">PNR <strong>{booking.pnr}</strong> — please review your details below and confirm check-in.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-4">Flight Details</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold shrink-0">
                                    {booking.flight.code || booking.flight.airline.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900">{booking.flight.airline} · {booking.flight.flightNum}</p>
                                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                                        <span className="font-semibold">{booking.flight.from}</span>
                                        <ArrowRight size={12} />
                                        <span className="font-semibold">{booking.flight.to}</span>
                                        <span className="text-gray-400">·</span>
                                        <Clock size={11} />
                                        <span>{booking.flight.dep} → {booking.flight.arr}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400">{booking.flight.date}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3">Passenger & Seat</p>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
                                    <User size={16} className="text-amber-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900 text-sm">
                                        {booking.passenger.title} {booking.passenger.firstName} {booking.passenger.lastName}
                                    </p>
                                    <p className="text-xs text-gray-400">{booking.cabin === 'business' ? 'Business Class' : booking.cabin === 'premium_economy' ? 'Premium Economy' : 'Economy Class'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[11px] text-gray-400 uppercase">Seat</p>
                                    <p className="text-xl font-black text-amber-600 font-mono">{booking.seat || '—'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                            <Info size={15} className="text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-800">
                                By confirming check-in, you acknowledge that all details are correct and you are ready to fly.
                                Ensure you have a valid government-issued photo ID.
                            </p>
                        </div>

                        <button onClick={handleCheckIn}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-3">
                            <CheckCircle size={18} /> Confirm Check-in & Get Boarding Pass
                        </button>
                    </>
                )}

                {/* ── Search Form (no booking yet) ── */}
                {!booking && (
                    <>
                        <div className="text-center mb-2">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Plane size={28} className="text-amber-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Web Check-in</h1>
                            <p className="text-gray-500 text-sm mt-1">Available 48 hours to 1 hour before departure</p>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                            <h2 className="font-bold text-gray-900 mb-5">Find Your Booking</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">PNR / Booking Reference *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. YLXYZ123"
                                        value={pnr}
                                        onChange={e => setPnr(e.target.value.toUpperCase())}
                                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-mono uppercase focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Last Name *</label>
                                    <input
                                        type="text"
                                        placeholder="As on your ticket"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                                    />
                                </div>

                                {error && (
                                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                        <Info size={15} className="mt-0.5 shrink-0" /> {error}
                                    </div>
                                )}

                                <button onClick={handleSearch} disabled={loading}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-60 text-white font-bold text-base transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-3">
                                    {loading ? (
                                        <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Searching...</>
                                    ) : (
                                        <>Search Booking <ChevronRight size={18} /></>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Check-in Tips</p>
                            <div className="space-y-3">
                                {[
                                    { icon: Clock, text: 'Check-in opens 48 hours before departure and closes 1 hour before.' },
                                    { icon: User, text: 'You will need your PNR number and the last name used during booking.' },
                                    { icon: Luggage, text: 'Baggage drop counters at the airport close 45 minutes before departure.' },
                                    { icon: Shield, text: 'Carry a valid government-issued photo ID (Aadhaar, Passport, Driving Licence).' },
                                ].map(({ icon: Icon, text }) => (
                                    <div key={text} className="flex items-start gap-3 text-sm text-gray-600">
                                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                                            <Icon size={14} className="text-amber-600" />
                                        </div>
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-500">
                                Need help?{' '}
                                <a href="https://wa.me/918427831127" target="_blank" rel="noopener noreferrer"
                                    className="text-amber-600 font-semibold hover:underline">
                                    WhatsApp us
                                </a>
                                {' '}or call{' '}
                                <a href="tel:+918427831127" className="text-amber-600 font-semibold hover:underline">
                                    +91 84278 31127
                                </a>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function CheckInPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <CheckInContent />
        </Suspense>
    );
}
