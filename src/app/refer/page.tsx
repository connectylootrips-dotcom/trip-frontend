'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Gift, Copy, CheckCircle2, Share2, Users, Wallet,
  ArrowRight, WholeWord,
} from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

const GOLD = '#C9A96E';
const BASE_URL = 'https://www.ylootrips.com';

function generateCode(name: string, phone: string): string {
  const prefix = name.trim().toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4).padEnd(3, 'X');
  const suffix = phone.replace(/\D/g, '').slice(-4).padStart(4, '0');
  return `YL${prefix}${suffix}`;
}

export default function ReferPage() {
  const { creditWallet, balance } = useWallet();
  const [step, setStep] = useState<'form' | 'link'>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [bonusClaimed, setBonusClaimed] = useState(false);

  // Check if this visitor arrived via a referral link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || localStorage.getItem('ylootrips-referral-from');
    if (ref) setReferredBy(ref);

    // Check if they already have a code stored
    const savedCode = localStorage.getItem('ylootrips-my-ref-code');
    const savedName = localStorage.getItem('ylootrips-my-ref-name');
    if (savedCode && savedName) {
      setName(savedName);
      setCode(savedCode);
      setStep('link');
    }
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 8) return;
    const c = generateCode(name, phone);
    setCode(c);
    localStorage.setItem('ylootrips-my-ref-code', c);
    localStorage.setItem('ylootrips-my-ref-name', name.trim());
    setStep('link');
  };

  const referralLink = `${BASE_URL}/?ref=${code}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* fallback silent */
    }
  };

  const whatsappShare = () => {
    const text = `Hey! I've been using YlooTrips for travel — it's brilliant. Use my link to book and we both earn ₹1,000 wallet credit:\n\n${referralLink}\n\nCode: *${code}*`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleClaimBonus = () => {
    creditWallet(1000, `REF-BONUS-${referredBy}`, `🎁 Referral bonus — referred by ${referredBy}`);
    localStorage.removeItem('ylootrips-referral-from');
    setReferredBy(null);
    setBonusClaimed(true);
  };

  const HOW_IT_WORKS = [
    { icon: '🔗', title: 'Get your link', desc: 'Enter your name and phone to generate a unique referral link in seconds.' },
    { icon: '📤', title: 'Share with friends', desc: 'Send via WhatsApp, Instagram, email — anywhere. No limit on referrals.' },
    { icon: '💰', title: 'Earn ₹1,000 each', desc: 'When your friend books a trip, both of you earn ₹1,000 WanderLoot wallet credits.' },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-20">

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-5 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A96E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.25)' }}>
            <Gift size={28} style={{ color: GOLD }} />
          </div>
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1 text-[10px] uppercase tracking-[0.25em] text-white/40 mb-4">
            Referral Programme
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4">
            Refer a friend.<br />
            <span style={{ color: GOLD }}>Earn ₹1,000 each.</span>
          </h1>
          <p className="text-white/55 leading-relaxed text-base mb-8">
            Share your personal link. When your friend makes their first booking on YlooTrips, both of you get ₹1,000 added to your WanderLoot wallet — automatically.
          </p>

          {/* Wallet balance chip */}
          {balance > 0 && (
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6"
              style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.2)' }}>
              <Wallet size={14} style={{ color: GOLD }} />
              <span className="text-sm font-semibold" style={{ color: GOLD }}>Your wallet: ₹{balance.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Referral bonus banner (if arrived via ref link) ── */}
      {referredBy && !bonusClaimed && (
        <div className="mx-5 mb-8 rounded-2xl p-5 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.15) 0%, rgba(226,198,143,0.08) 100%)', border: '1px solid rgba(201,169,110,0.3)' }}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(201,169,110,0.6)' }}>You were referred!</p>
          <p className="text-white font-semibold mb-1">You arrived via referral code <strong style={{ color: GOLD }}>{referredBy}</strong></p>
          <p className="text-white/50 text-sm mb-4">Book any trip through YlooTrips and both you and your friend earn ₹1,000 WanderLoot credit.</p>
          <button onClick={handleClaimBonus}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-black text-sm"
            style={{ background: `linear-gradient(135deg, ${GOLD}, #E2C68F)` }}>
            <Gift size={14} /> Claim My ₹1,000 Welcome Bonus
          </button>
        </div>
      )}

      {bonusClaimed && (
        <div className="mx-5 mb-8 rounded-2xl p-5 text-center"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <CheckCircle2 size={24} className="text-green-400 mx-auto mb-2" />
          <p className="text-green-400 font-semibold">₹1,000 added to your WanderLoot wallet!</p>
          <p className="text-white/40 text-xs mt-1">Redeem on your first or any future booking.</p>
        </div>
      )}

      {/* ── Generate / Show Link ── */}
      <section className="max-w-md mx-auto px-5 mb-12">
        {step === 'form' ? (
          <div className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 className="font-semibold text-lg mb-1">Get your referral link</h2>
            <p className="text-white/40 text-sm mb-6">Takes 10 seconds. No account needed.</p>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest mb-2" style={{ color: 'rgba(201,169,110,0.6)' }}>Your Name</label>
                <input
                  value={name} onChange={e => setName(e.target.value)} required
                  placeholder="Arjun Sharma"
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest mb-2" style={{ color: 'rgba(201,169,110,0.6)' }}>Phone Number</label>
                <input
                  type="tel" value={phone} onChange={e => setPhone(e.target.value)} required minLength={8}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </div>
              <button type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-black text-sm"
                style={{ background: `linear-gradient(135deg, ${GOLD}, #E2C68F)` }}>
                Generate My Referral Link <ArrowRight size={15} />
              </button>
            </form>
          </div>
        ) : (
          <div className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,169,110,0.2)' }}>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 size={16} className="text-green-400" />
              <span className="text-sm text-white/70">Your referral link is ready, {name.split(' ')[0]}!</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest mb-4" style={{ color: 'rgba(201,169,110,0.5)' }}>
              Code: <strong style={{ color: GOLD }}>{code}</strong>
            </p>

            {/* Link box */}
            <div className="flex items-center gap-2 rounded-xl px-4 py-3 mb-4"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="flex-1 text-sm text-white/60 truncate">{referralLink}</span>
              <button onClick={handleCopy}
                className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                style={{ background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(201,169,110,0.15)', color: copied ? '#4ade80' : GOLD }}>
                {copied ? <><CheckCircle2 size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
              </button>
            </div>

            {/* Share actions */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button onClick={whatsappShare}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-black"
                style={{ background: `linear-gradient(135deg, ${GOLD}, #E2C68F)` }}>
                <Share2 size={14} /> Share on WhatsApp
              </button>
              <button onClick={handleCopy}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white/80"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Copy size={14} /> {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>

            <div className="rounded-xl p-4 text-center"
              style={{ background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.12)' }}>
              <p className="text-[11px] text-white/40 leading-relaxed">
                Your friend books any YlooTrips package → both of you receive <strong style={{ color: GOLD }}>₹1,000 WanderLoot credit</strong> within 24 hours of confirmed payment. No cap on referrals.
              </p>
            </div>

            <button onClick={() => { setStep('form'); setCode(''); setName(''); setPhone(''); localStorage.removeItem('ylootrips-my-ref-code'); localStorage.removeItem('ylootrips-my-ref-name'); }}
              className="w-full text-center text-xs text-white/25 hover:text-white/50 mt-4 transition-colors">
              Reset / use different name
            </button>
          </div>
        )}
      </section>

      {/* ── How it works ── */}
      <section className="max-w-md mx-auto px-5 mb-12">
        <h2 className="font-serif text-xl mb-6 text-center">How it works</h2>
        <div className="space-y-4">
          {HOW_IT_WORKS.map(({ icon, title, desc }, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.15)' }}>
                {icon}
              </div>
              <div>
                <p className="font-semibold text-sm mb-0.5">{title}</p>
                <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-md mx-auto px-5 mb-12">
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: '₹1,000', label: 'Per referral' },
            { value: '∞', label: 'No cap' },
            { value: '24h', label: 'Credit time' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center rounded-2xl py-5 px-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="font-serif text-2xl font-bold mb-1" style={{ color: GOLD }}>{value}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/35">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Terms ── */}
      <section className="max-w-md mx-auto px-5">
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Terms & Conditions</p>
          <ul className="space-y-2 text-xs text-white/35 leading-relaxed list-disc list-inside">
            <li>Referral credit is issued after the referred friend's booking is confirmed and payment received.</li>
            <li>Credits are added to both the referrer's and the referred friend's WanderLoot wallet within 24 hours.</li>
            <li>Credit is valid for 12 months from issue and redeemable on any YlooTrips booking.</li>
            <li>Self-referrals are not eligible. Each new customer can only be referred once.</li>
            <li>YlooTrips reserves the right to withhold credit in case of suspected fraud or chargebacks.</li>
            <li>Credit cannot be transferred or exchanged for cash.</li>
          </ul>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <div className="max-w-md mx-auto px-5 mt-10 text-center">
        <p className="text-white/30 text-xs mb-3">Ready to explore?</p>
        <Link href="/destinations"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black"
          style={{ background: `linear-gradient(135deg, ${GOLD}, #E2C68F)` }}>
          Browse Destinations <ArrowRight size={14} />
        </Link>
      </div>

    </main>
  );
}
