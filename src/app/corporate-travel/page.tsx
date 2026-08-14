'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2, Users, FileText, HeadphonesIcon, BadgeCheck,
  ChevronRight, CheckCircle2, Phone, Mail, ArrowRight, Star,
  Briefcase, Globe, CreditCard, Shield,
} from 'lucide-react';

const BENEFITS = [
  {
    icon: CreditCard,
    title: 'GST-Compliant Invoicing',
    desc: 'Every trip comes with a proper B2B invoice under GST No. 07BATPV1942C1ZF — ready for expense claims and reimbursements.',
  },
  {
    icon: Users,
    title: 'Volume Discounts',
    desc: 'Groups of 10+ get preferential rates. The more colleagues you send, the better the deal — custom quote within 4 hours.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Account Manager',
    desc: 'A single point of contact on WhatsApp for all bookings, changes, and on-ground emergencies. No IVR, no bots.',
  },
  {
    icon: FileText,
    title: 'Flexible Payment Terms',
    desc: 'Corporate PO-based payments accepted. Advance of 25% to confirm; balance 15 days before travel. Invoice-based settlement available.',
  },
  {
    icon: Globe,
    title: '50+ Destinations',
    desc: 'Domestic offsites (Goa, Shimla, Coorg, Ooty) and international incentive trips (Dubai, Bali, Thailand, Europe) — all from one desk.',
  },
  {
    icon: Shield,
    title: 'MSME Registered',
    desc: 'UDYAM-HR-05-0141455 — eligible for government vendor empanelment and MSME procurement benefits.',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Share your brief', desc: 'Tell us: number of employees, destination preference, travel dates, and per-head budget. WhatsApp or the form below.' },
  { step: '02', title: 'Get a custom quote', desc: 'We send a detailed itinerary with group rates, hotel options, and a GST-compliant quote within 4–6 hours.' },
  { step: '03', title: 'Confirm & travel', desc: 'Lock the booking with 25% advance on PO or NEFT. Rest follows 15 days before travel. Sit back — we handle everything.' },
];

const PACKAGES = [
  { label: 'Team Offsite', icon: '🏕️', desc: 'Goa, Coorg, Rishikesh, Shimla — 2–4 nights for 10–100 people. Includes resort, meals, team activities.', price: '₹4,500/person onwards' },
  { label: 'Incentive Travel', icon: '✈️', desc: 'Dubai, Bali, Thailand, Singapore — reward your top performers with international trips that motivate the whole team.', price: '₹18,000/person onwards' },
  { label: 'MICE Events', icon: '🎤', desc: 'Meetings, conferences, product launches — venue scouting, AV setup, catering, and accommodation under one roof.', price: 'Custom quote' },
  { label: 'Executive Retreats', icon: '🏔️', desc: 'Boutique properties, private transfers, curated experiences for leadership teams of 5–25 people.', price: 'Custom quote' },
];

export default function CorporateTravelPage() {
  const [form, setForm] = useState({
    company: '', name: '', phone: '', email: '',
    employees: '', destination: '', dates: '', budget: '',
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `*Corporate Travel Enquiry — YlooTrips*`,
      ``,
      `Company: ${form.company}`,
      `Contact: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Employees: ${form.employees}`,
      `Destination: ${form.destination}`,
      `Travel dates: ${form.dates}`,
      `Budget (per head): ${form.budget}`,
    ].join('\n');
    window.open(`https://wa.me/918427831127?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  return (
    <main className="bg-[#F4F1EA] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#1C1C1C] text-white pt-32 pb-20 md:pt-40 md:pb-28">
        {/* subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white/60 mb-8">
            <Briefcase size={11} />
            Corporate &amp; B2B Travel
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
            Business travel your team<br />
            <span className="text-[#C9A96E]">will actually enjoy.</span>
          </h1>
          <p className="text-white/65 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            From quick team offsites in Goa to incentive trips in Dubai — GST invoicing, volume discounts, and a dedicated account manager included as standard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#enquire"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A96E] text-black font-semibold px-8 py-4 rounded-full hover:bg-[#E2C68F] transition-colors"
            >
              Get a Corporate Quote <ArrowRight size={16} />
            </a>
            <a
              href="https://wa.me/918427831127?text=Hi%2C%20I'm%20interested%20in%20corporate%20travel%20packages%20from%20YlooTrips."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
            >
              <Phone size={15} /> WhatsApp Us
            </a>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-14 text-sm text-white/50">
            {[
              'GST: 07BATPV1942C1ZF',
              'MSME: UDYAM-HR-05-0141455',
              '25,000+ travellers',
              '4.9★ Google Rating',
              'Est. 2022 · New Delhi',
            ].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={11} className="text-[#C9A96E]" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why YlooTrips for Corporate ── */}
      <section className="py-20 md:py-28 max-w-6xl mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355] mb-3">Why us</p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C] mb-4">Built for business travel.</h2>
        <p className="text-[#6B5E4E] max-w-xl mb-14 leading-relaxed">
          We handle the logistics so your HR and finance teams don't have to. GST-ready from day one, with the care of a boutique travel partner.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-7 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] flex items-center justify-center mb-4">
                <Icon size={20} className="text-[#8B7355]" />
              </div>
              <h3 className="font-semibold text-[#1C1C1C] mb-2">{title}</h3>
              <p className="text-sm text-[#6B5E4E] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Popular Corporate Packages ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355] mb-3">What we offer</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C] mb-14">Popular corporate formats.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PACKAGES.map(({ label, icon, desc, price }) => (
              <div key={label} className="border border-black/8 rounded-2xl p-7 flex gap-5 hover:border-[#C9A96E]/40 hover:bg-[#FDFCF8] transition-all">
                <span className="text-3xl shrink-0">{icon}</span>
                <div>
                  <h3 className="font-semibold text-[#1C1C1C] mb-1">{label}</h3>
                  <p className="text-sm text-[#6B5E4E] leading-relaxed mb-3">{desc}</p>
                  <span className="inline-block text-xs font-semibold text-[#8B7355] bg-[#F4F1EA] px-3 py-1 rounded-full">{price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355] mb-3">Process</p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C] mb-14">Book in 3 steps.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className="relative">
              <p className="font-serif text-7xl font-bold text-black/6 leading-none mb-4 select-none">{step}</p>
              <h3 className="font-semibold text-[#1C1C1C] mb-2">{title}</h3>
              <p className="text-sm text-[#6B5E4E] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GST Callout ── */}
      <section className="bg-[#1C1C1C] text-white py-14">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
            <BadgeCheck size={32} className="text-[#C9A96E]" />
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-xl md:text-2xl mb-2">Finance-ready from day one.</h3>
            <p className="text-white/60 leading-relaxed">
              Every corporate booking gets a proper GST invoice under <strong className="text-white/85">07BATPV1942C1ZF</strong> (Ambe Enterprise, trading as YlooTrips). MSME-registered under <strong className="text-white/85">UDYAM-HR-05-0141455</strong> — eligible for government vendor empanelment. Your accounts team will thank you.
            </p>
          </div>
          <a
            href="#enquire"
            className="shrink-0 inline-flex items-center gap-2 bg-[#C9A96E] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#E2C68F] transition-colors text-sm"
          >
            Start Enquiry <ChevronRight size={14} />
          </a>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355] mb-3">What teams say</p>
        <h2 className="font-serif text-3xl text-[#1C1C1C] mb-10">Trusted by Indian businesses.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'Rohan Mehta', role: 'HR Manager', company: 'TechStartup, Gurugram',
              text: 'Organised our annual offsite to Coorg for 60 people. The GST invoice was ready within hours — our accounts team was impressed. Flawless execution, great pricing.',
            },
            {
              name: 'Priyanka Sharma', role: 'Admin Head', company: 'FMCG Company, Delhi',
              text: 'Used YlooTrips for our sales incentive trip to Dubai (28 people). Dedicated manager available on WhatsApp at 11pm. That kind of responsiveness you just don\'t get from big OTAs.',
            },
          ].map(({ name, role, company, text }) => (
            <div key={name} className="bg-white rounded-2xl p-7">
              <div className="flex gap-0.5 mb-4">
                {Array(5).fill(0).map((_, i) => <Star key={i} size={14} fill="#C9A96E" className="text-[#C9A96E]" />)}
              </div>
              <p className="text-[#1C1C1C] leading-relaxed mb-5 text-sm">&ldquo;{text}&rdquo;</p>
              <div>
                <p className="font-semibold text-sm text-[#1C1C1C]">{name}</p>
                <p className="text-xs text-[#8B7355]">{role} · {company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Enquiry Form ── */}
      <section id="enquire" className="bg-white py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355] mb-3">Get a quote</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C] mb-3">Tell us about your trip.</h2>
          <p className="text-[#6B5E4E] mb-10">We respond within 4–6 hours with a detailed, GST-ready quote.</p>

          {sent ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h3 className="font-serif text-2xl text-[#1C1C1C] mb-2">Enquiry sent!</h3>
              <p className="text-[#6B5E4E] mb-6">Opening WhatsApp with your details. We'll respond within 4–6 hours.</p>
              <button onClick={() => setSent(false)} className="text-sm text-[#8B7355] underline">Submit another enquiry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8B7355] mb-2">Company Name *</label>
                  <input name="company" value={form.company} onChange={handleChange} required
                    className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B7355] bg-[#FDFCF8]"
                    placeholder="Acme Pvt. Ltd." />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8B7355] mb-2">Your Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required
                    className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B7355] bg-[#FDFCF8]"
                    placeholder="Rohan Mehta" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8B7355] mb-2">Phone / WhatsApp *</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} required
                    className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B7355] bg-[#FDFCF8]"
                    placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8B7355] mb-2">Work Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B7355] bg-[#FDFCF8]"
                    placeholder="rohan@acme.com" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8B7355] mb-2">No. of Employees *</label>
                  <select name="employees" value={form.employees} onChange={handleChange} required
                    className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B7355] bg-[#FDFCF8]">
                    <option value="">Select group size</option>
                    <option>10–25 people</option>
                    <option>26–50 people</option>
                    <option>51–100 people</option>
                    <option>100+ people</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8B7355] mb-2">Destination Preference</label>
                  <input name="destination" value={form.destination} onChange={handleChange}
                    className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B7355] bg-[#FDFCF8]"
                    placeholder="Goa, Dubai, Bali — or surprise us" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8B7355] mb-2">Preferred Travel Dates</label>
                  <input name="dates" value={form.dates} onChange={handleChange}
                    className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B7355] bg-[#FDFCF8]"
                    placeholder="e.g. Oct 10–13, 2026 (flexible)" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8B7355] mb-2">Budget per Person</label>
                  <select name="budget" value={form.budget} onChange={handleChange}
                    className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B7355] bg-[#FDFCF8]">
                    <option value="">Select range</option>
                    <option>Under ₹5,000</option>
                    <option>₹5,000–₹10,000</option>
                    <option>₹10,000–₹20,000</option>
                    <option>₹20,000–₹50,000</option>
                    <option>₹50,000+</option>
                  </select>
                </div>
              </div>

              <button type="submit"
                className="w-full flex items-center justify-center gap-2.5 bg-[#1C1C1C] text-white font-semibold py-4 rounded-full hover:bg-black transition-colors mt-2">
                <Phone size={16} />
                Send via WhatsApp — Get Quote in 4–6 hrs
              </button>
              <p className="text-center text-xs text-[#8B7355] mt-2">
                Or email us at{' '}
                <a href="mailto:hello@ylootrips.com" className="underline">hello@ylootrips.com</a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-14 max-w-4xl mx-auto px-6 text-center">
        <p className="text-[#8B7355] text-sm mb-2">Not a business? No worries.</p>
        <p className="text-[#1C1C1C] font-serif text-xl mb-6">Looking for a personal or group trip?</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/destinations" className="inline-flex items-center justify-center gap-2 border border-[#1C1C1C] text-[#1C1C1C] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#1C1C1C] hover:text-white transition-colors">
            Explore Destinations <ChevronRight size={14} />
          </Link>
          <Link href="/group-travel" className="inline-flex items-center justify-center gap-2 border border-[#8B7355] text-[#8B7355] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#8B7355] hover:text-white transition-colors">
            Group Travel <ChevronRight size={14} />
          </Link>
        </div>
      </section>

    </main>
  );
}
