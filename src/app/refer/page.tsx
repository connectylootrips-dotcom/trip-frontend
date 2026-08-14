'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gift, Copy, CheckCircle2, Share2, Wallet, ArrowRight, Smartphone } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

const GOLD = '#C9A96E';
const BASE_URL = 'https://www.ylootrips.com';
const APP_DOWNLOAD = 'https://play.google.com/store/apps/details?id=com.ylootrips.app';

function makeAutoCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = 'YL';
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export default function ReferPage() {
  const { creditWallet, balance } = useWallet();
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState<'link' | 'msg' | null>(null);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [bonusClaimed, setBonusClaimed] = useState(false);

  useEffect(() => {
    // Check inbound referral
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || localStorage.getItem('ylootrips-referral-from');
    if (ref) setReferredBy(ref);

    // Auto-generate or restore code
    const saved = localStorage.getItem('ylootrips-my-ref-code');
    if (saved) {
      setCode(saved);
    } else {
      const c = makeAutoCode();
      localStorage.setItem('ylootrips-my-ref-code', c);
      setCode(c);
    }
  }, []);

  const referralLink = `${BASE_URL}/?ref=${code}`;

  const shareMessage = `Hey! 🌏 I use YlooTrips for travel — amazing deals on India trips, Bali, Dubai & more.\n\nUse my link and we BOTH get ₹1,000 wallet credit on your first booking:\n👉 ${referralLink}\n\nCode: *${code}*\n\n📱 Download app: ${APP_DOWNLOAD}`;

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(referralLink); } catch { /* */ }
    setCopied('link');
    setTimeout(() => setCopied(null), 2500);
  };

  const whatsappShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank');
  };

  const instagramShare = async () => {
    // Copy message then open Instagram (user pastes in DM/story)
    try { await navigator.clipboard.writeText(shareMessage); } catch { /* */ }
    setCopied('msg');
    setTimeout(() => setCopied(null), 3000);
    window.open('https://www.instagram.com/direct/inbox/', '_blank');
  };

  const nativeShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: 'Join YlooTrips — Earn ₹1,000', text: shareMessage, url: referralLink });
    } else {
      whatsappShare();
    }
  };

  const handleClaimBonus = () => {
    creditWallet(1000, `REF-BONUS-${referredBy}`, `🎁 Referral bonus — referred by ${referredBy}`);
    localStorage.removeItem('ylootrips-referral-from');
    setReferredBy(null);
    setBonusClaimed(true);
  };

  const HOW_IT_WORKS = [
    { icon: '🔗', title: 'Your link is ready', desc: 'Copy your unique referral link and share it anywhere — WhatsApp, Instagram, email.' },
    { icon: '📤', title: 'Friend books a trip', desc: 'When your friend clicks your link and completes a booking on YlooTrips.' },
    { icon: '💰', title: 'Both earn ₹1,000', desc: 'You and your friend both receive ₹1,000 WanderLoot wallet credits automatically.' },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-20">

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 px-5 text-center overflow-hidden">
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
          <p className="text-white/55 leading-relaxed text-base mb-6">
            Share your personal link. When your friend makes their first booking, both of you get ₹1,000 WanderLoot credit — automatically.
          </p>
          {balance > 0 && (
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2"
              style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.2)' }}>
              <Wallet size={14} style={{ color: GOLD }} />
              <span className="text-sm font-semibold" style={{ color: GOLD }}>Wallet: ₹{balance.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Inbound referral banner ── */}
      {referredBy && !bonusClaimed && (
        <div className="max-w-md mx-auto px-5 mb-8">
          <div className="rounded-2xl p-5 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.15), rgba(226,198,143,0.08))', border: '1px solid rgba(201,169,110,0.3)' }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(201,169,110,0.6)' }}>You were referred!</p>
            <p className="text-white font-semibold mb-1">Code: <strong style={{ color: GOLD }}>{referredBy}</strong></p>
            <p className="text-white/50 text-sm mb-4">Book any trip and both of you earn ₹1,000 WanderLoot credit.</p>
            <button onClick={handleClaimBonus}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-black text-sm"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #E2C68F)` }}>
              <Gift size={14} /> Claim ₹1,000 Welcome Bonus
            </button>
          </div>
        </div>
      )}

      {bonusClaimed && (
        <div className="max-w-md mx-auto px-5 mb-8">
          <div className="rounded-2xl p-5 text-center"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <CheckCircle2 size={24} className="text-green-400 mx-auto mb-2" />
            <p className="text-green-400 font-semibold">₹1,000 added to your WanderLoot wallet!</p>
          </div>
        </div>
      )}

      {/* ── Share Card ── */}
      {code && (
        <section className="max-w-md mx-auto px-5 mb-10">
          <div className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,169,110,0.2)' }}>

            {/* Code badge */}
            <div className="text-center mb-5">
              <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Your referral code</p>
              <p className="font-mono text-2xl font-bold tracking-widest" style={{ color: GOLD }}>{code}</p>
            </div>

            {/* Link row */}
            <div className="flex items-center gap-2 rounded-xl px-4 py-3 mb-5"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="flex-1 text-sm text-white/50 truncate">{referralLink}</span>
              <button onClick={copyLink}
                className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                style={{ background: copied === 'link' ? 'rgba(34,197,94,0.15)' : 'rgba(201,169,110,0.15)', color: copied === 'link' ? '#4ade80' : GOLD }}>
                {copied === 'link' ? <><CheckCircle2 size={12} /> Copied!</> : <><Copy size={12} /> Copy Link</>}
              </button>
            </div>

            {/* Share buttons */}
            <div className="space-y-3 mb-5">
              {/* WhatsApp */}
              <button onClick={whatsappShare}
                className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#fff' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Send on WhatsApp
              </button>

              {/* Instagram */}
              <button onClick={instagramShare}
                className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                {copied === 'msg' ? 'Message copied — paste in Instagram!' : 'Share on Instagram'}
              </button>

              {/* Native share / other */}
              <button onClick={nativeShare}
                className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-sm text-white/80"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Share2 size={16} />
                More sharing options
              </button>
            </div>

            {/* App download */}
            <a href={APP_DOWNLOAD} target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold text-white/50 transition-colors hover:text-white/70"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <Smartphone size={14} /> Download YlooTrips App — share link works in-app too
            </a>

            <p className="text-center text-[11px] text-white/30 mt-4 leading-relaxed">
              Friend books any trip → both earn <strong style={{ color: GOLD }}>₹1,000 WanderLoot credit</strong>. No cap on referrals.
            </p>
          </div>
        </section>
      )}

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
            <li>Credits are added to both wallets within 24 hours of confirmed payment.</li>
            <li>Credit is valid for 12 months and redeemable on any YlooTrips booking.</li>
            <li>Self-referrals are not eligible. Each new customer can only be referred once.</li>
            <li>YlooTrips reserves the right to withhold credit in case of suspected fraud.</li>
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
