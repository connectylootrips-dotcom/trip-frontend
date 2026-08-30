'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save, RefreshCw, Plus, Trash2, ChevronDown, ChevronUp,
  Smartphone, Tag, Gift, Zap, Globe, Image, Map, Clock,
  ToggleLeft, ToggleRight, TrendingUp, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

// ── types ─────────────────────────────────────────────────────────────────────

interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
  imageUrl: string;
  packageSlug: string;
  validUntil: string;
}

interface Promo {
  id: string;
  code: string;
  title: string;
  description: string;
  discountPercent: number;
  maxDiscount: number;
  minOrderValue: number;
  validUntil: string;
  isActive: boolean;
}

interface Banner {
  id: string;
  imageUrl: string;
  linkUrl: string;
  title: string;
  isActive: boolean;
}

interface TrendingItem {
  id: string;
  packageSlug: string;
  title: string;
  imageUrl: string;
  badge: string;
}

interface WebRoute {
  path: string;
  label: string;
  isActive: boolean;
}

interface FeatureFlags {
  showDeals: boolean;
  showPromos: boolean;
  showFlashSale: boolean;
  showBanners: boolean;
  showTrending: boolean;
  maintenanceMode: boolean;
  forceUpdate: boolean;
}

interface AppConfig {
  minAppVersion: string;
  flashSaleEndTime: string;
  featureFlags: FeatureFlags;
  deals: Deal[];
  promos: Promo[];
  banners: Banner[];
  trending: TrendingItem[];
  webRoutes: WebRoute[];
  packageItineraries: Record<string, string>;
  packageGalleries: Record<string, string[]>;
  visaData: string;
  bestTimeData: string;
}

const DEFAULT_CONFIG: AppConfig = {
  minAppVersion: '1.0.0',
  flashSaleEndTime: '',
  featureFlags: {
    showDeals: true,
    showPromos: true,
    showFlashSale: false,
    showBanners: true,
    showTrending: true,
    maintenanceMode: false,
    forceUpdate: false,
  },
  deals: [],
  promos: [],
  banners: [],
  trending: [],
  webRoutes: [],
  packageItineraries: {},
  packageGalleries: {},
  visaData: '',
  bestTimeData: '',
};

// ── helpers ───────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function adminHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ── section wrapper ───────────────────────────────────────────────────────────

function Section({
  title, icon, children, defaultOpen = false,
}: {
  title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2 font-semibold text-gray-800">
          {icon} {title}
        </div>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="p-5 space-y-4">{children}</div>}
    </div>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────

export default function AdminAppPage() {
  const router = useRouter();
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/app-config', { headers: adminHeaders() });
      if (res.status === 401) { router.replace('/admin'); return; }
      const { data } = await res.json();
      if (data) setConfig(prev => ({ ...prev, ...data }));
    } catch (e) {
      console.error('Failed to load app config', e);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) { router.replace('/admin'); return; }
    load();
  }, [load, router]);

  const save = async () => {
    setSaving(true);
    setMsg({ type: '', text: '' });
    try {
      const res = await fetch('/api/admin/app-config', {
        method: 'PUT',
        headers: adminHeaders(),
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error('Save failed');
      setMsg({ type: 'success', text: 'App config saved successfully!' });
    } catch {
      setMsg({ type: 'error', text: 'Failed to save config. Please try again.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg({ type: '', text: '' }), 4000);
    }
  };

  const set = <K extends keyof AppConfig>(key: K, value: AppConfig[K]) =>
    setConfig(prev => ({ ...prev, [key]: value }));

  const setFlag = (key: keyof FeatureFlags, value: boolean) =>
    setConfig(prev => ({
      ...prev,
      featureFlags: { ...prev.featureFlags, [key]: value },
    }));

  // ── deals ────────────────────────────────────────────────────────────────

  const addDeal = () => set('deals', [...config.deals, {
    id: uid(), title: '', description: '', discount: '', imageUrl: '', packageSlug: '', validUntil: '',
  }]);

  const updateDeal = (idx: number, patch: Partial<Deal>) =>
    set('deals', config.deals.map((d, i) => i === idx ? { ...d, ...patch } : d));

  const removeDeal = (idx: number) =>
    set('deals', config.deals.filter((_, i) => i !== idx));

  // ── promos ───────────────────────────────────────────────────────────────

  const addPromo = () => set('promos', [...config.promos, {
    id: uid(), code: '', title: '', description: '',
    discountPercent: 10, maxDiscount: 500, minOrderValue: 0, validUntil: '', isActive: true,
  }]);

  const updatePromo = (idx: number, patch: Partial<Promo>) =>
    set('promos', config.promos.map((p, i) => i === idx ? { ...p, ...patch } : p));

  const removePromo = (idx: number) =>
    set('promos', config.promos.filter((_, i) => i !== idx));

  // ── banners ──────────────────────────────────────────────────────────────

  const addBanner = () => set('banners', [...config.banners, {
    id: uid(), imageUrl: '', linkUrl: '', title: '', isActive: true,
  }]);

  const updateBanner = (idx: number, patch: Partial<Banner>) =>
    set('banners', config.banners.map((b, i) => i === idx ? { ...b, ...patch } : b));

  const removeBanner = (idx: number) =>
    set('banners', config.banners.filter((_, i) => i !== idx));

  // ── trending ─────────────────────────────────────────────────────────────

  const addTrending = () => set('trending', [...config.trending, {
    id: uid(), packageSlug: '', title: '', imageUrl: '', badge: '',
  }]);

  const updateTrending = (idx: number, patch: Partial<TrendingItem>) =>
    set('trending', config.trending.map((t, i) => i === idx ? { ...t, ...patch } : t));

  const removeTrending = (idx: number) =>
    set('trending', config.trending.filter((_, i) => i !== idx));

  // ── web routes ───────────────────────────────────────────────────────────

  const addRoute = () => set('webRoutes', [...config.webRoutes, { path: '', label: '', isActive: true }]);

  const updateRoute = (idx: number, patch: Partial<WebRoute>) =>
    set('webRoutes', config.webRoutes.map((r, i) => i === idx ? { ...r, ...patch } : r));

  const removeRoute = (idx: number) =>
    set('webRoutes', config.webRoutes.filter((_, i) => i !== idx));

  // ── package itineraries / galleries ──────────────────────────────────────

  const [itinSlug, setItinSlug] = useState('');
  const addItinerary = () => {
    if (!itinSlug.trim()) return;
    setConfig(prev => ({
      ...prev,
      packageItineraries: { ...prev.packageItineraries, [itinSlug.trim()]: '' },
    }));
    setItinSlug('');
  };

  const [gallerySlug, setGallerySlug] = useState('');
  const addGallery = () => {
    if (!gallerySlug.trim()) return;
    setConfig(prev => ({
      ...prev,
      packageGalleries: { ...prev.packageGalleries, [gallerySlug.trim()]: [] },
    }));
    setGallerySlug('');
  };

  // ── render ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="animate-spin text-amber-600" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <Smartphone className="text-amber-600" size={24} />
        <h1 className="text-2xl font-bold text-gray-900">App Configuration</h1>
        <span className="ml-auto text-xs text-gray-400">Live Google Play App</span>
      </div>

      {/* Status message */}
      {msg.text && (
        <div className={`mb-5 px-4 py-3 rounded-lg text-sm font-medium ${
          msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {msg.text}
        </div>
      )}

      {/* ── App Version ─────────────────────────────────────────────────── */}
      <Section title="App Version & Flash Sale" icon={<Smartphone size={16} />} defaultOpen>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-1 block">Min App Version</span>
            <input
              type="text"
              placeholder="e.g. 1.2.0"
              value={config.minAppVersion}
              onChange={e => set('minAppVersion', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <p className="text-xs text-gray-400 mt-1">Users below this version will be prompted to update.</p>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-1 block">Flash Sale End Time</span>
            <input
              type="datetime-local"
              value={config.flashSaleEndTime}
              onChange={e => set('flashSaleEndTime', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <p className="text-xs text-gray-400 mt-1">Countdown timer shown in the app.</p>
          </label>
        </div>
      </Section>

      {/* ── Feature Flags ──────────────────────────────────────────────── */}
      <Section title="Feature Flags" icon={<ToggleRight size={16} />} defaultOpen>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(Object.keys(config.featureFlags) as (keyof FeatureFlags)[]).map(flag => (
            <label key={flag} className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50">
              <span className="text-sm text-gray-800 capitalize">{flag.replace(/([A-Z])/g, ' $1')}</span>
              <button
                type="button"
                onClick={() => setFlag(flag, !config.featureFlags[flag])}
                className={`transition-colors ${config.featureFlags[flag] ? 'text-amber-500' : 'text-gray-300'}`}
              >
                {config.featureFlags[flag] ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </label>
          ))}
        </div>
      </Section>

      {/* ── Deals ──────────────────────────────────────────────────────── */}
      <Section title={`Deals (${config.deals.length})`} icon={<Tag size={16} />}>
        <div className="space-y-4">
          {config.deals.map((deal, idx) => (
            <div key={deal.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase">Deal #{idx + 1}</span>
                <button type="button" onClick={() => removeDeal(idx)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="Title" value={deal.title} onChange={e => updateDeal(idx, { title: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input placeholder="Discount (e.g. 20% OFF)" value={deal.discount} onChange={e => updateDeal(idx, { discount: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input placeholder="Package Slug" value={deal.packageSlug} onChange={e => updateDeal(idx, { packageSlug: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input placeholder="Valid Until (YYYY-MM-DD)" value={deal.validUntil} onChange={e => updateDeal(idx, { validUntil: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input placeholder="Image URL" value={deal.imageUrl} onChange={e => updateDeal(idx, { imageUrl: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400 sm:col-span-2" />
                <textarea placeholder="Description" value={deal.description} onChange={e => updateDeal(idx, { description: e.target.value })} rows={2}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400 sm:col-span-2" />
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addDeal}
          className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium mt-2">
          <Plus size={15} /> Add Deal
        </button>
      </Section>

      {/* ── Promos ─────────────────────────────────────────────────────── */}
      <Section title={`Promos / Promo Codes (${config.promos.length})`} icon={<Gift size={16} />}>
        <div className="space-y-4">
          {config.promos.map((promo, idx) => (
            <div key={promo.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase">Promo #{idx + 1}</span>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={promo.isActive} onChange={e => updatePromo(idx, { isActive: e.target.checked })} />
                    Active
                  </label>
                  <button type="button" onClick={() => removePromo(idx)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="Promo Code (e.g. YLOO20)" value={promo.code} onChange={e => updatePromo(idx, { code: e.target.value.toUpperCase() })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono" />
                <input placeholder="Title" value={promo.title} onChange={e => updatePromo(idx, { title: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input type="number" placeholder="Discount %" value={promo.discountPercent} onChange={e => updatePromo(idx, { discountPercent: Number(e.target.value) })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input type="number" placeholder="Max Discount (₹)" value={promo.maxDiscount} onChange={e => updatePromo(idx, { maxDiscount: Number(e.target.value) })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input type="number" placeholder="Min Order Value (₹)" value={promo.minOrderValue} onChange={e => updatePromo(idx, { minOrderValue: Number(e.target.value) })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input placeholder="Valid Until (YYYY-MM-DD)" value={promo.validUntil} onChange={e => updatePromo(idx, { validUntil: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <textarea placeholder="Description" value={promo.description} onChange={e => updatePromo(idx, { description: e.target.value })} rows={2}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400 sm:col-span-2" />
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addPromo}
          className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium mt-2">
          <Plus size={15} /> Add Promo Code
        </button>
      </Section>

      {/* ── Banners ────────────────────────────────────────────────────── */}
      <Section title={`Banners (${config.banners.length})`} icon={<Image size={16} />}>
        <div className="space-y-4">
          {config.banners.map((banner, idx) => (
            <div key={banner.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase">Banner #{idx + 1}</span>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={banner.isActive} onChange={e => updateBanner(idx, { isActive: e.target.checked })} />
                    Active
                  </label>
                  <button type="button" onClick={() => removeBanner(idx)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="Title" value={banner.title} onChange={e => updateBanner(idx, { title: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400 sm:col-span-2" />
                <input placeholder="Image URL" value={banner.imageUrl} onChange={e => updateBanner(idx, { imageUrl: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input placeholder="Link URL / deep link" value={banner.linkUrl} onChange={e => updateBanner(idx, { linkUrl: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
              {banner.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={banner.imageUrl} alt={banner.title} className="w-full h-24 object-cover rounded-lg mt-2" />
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={addBanner}
          className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium mt-2">
          <Plus size={15} /> Add Banner
        </button>
      </Section>

      {/* ── Trending ───────────────────────────────────────────────────── */}
      <Section title={`Trending (${config.trending.length})`} icon={<TrendingUp size={16} />}>
        <div className="space-y-4">
          {config.trending.map((item, idx) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase">#{idx + 1}</span>
                <button type="button" onClick={() => removeTrending(idx)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="Package Slug" value={item.packageSlug} onChange={e => updateTrending(idx, { packageSlug: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input placeholder="Title" value={item.title} onChange={e => updateTrending(idx, { title: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input placeholder="Image URL" value={item.imageUrl} onChange={e => updateTrending(idx, { imageUrl: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input placeholder="Badge (e.g. Hot 🔥)" value={item.badge} onChange={e => updateTrending(idx, { badge: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addTrending}
          className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium mt-2">
          <Plus size={15} /> Add Trending Item
        </button>
      </Section>

      {/* ── Web Routes ─────────────────────────────────────────────────── */}
      <Section title={`Web Routes (${config.webRoutes.length})`} icon={<Globe size={16} />}>
        <p className="text-xs text-gray-500 mb-3">These routes are shown in the app&apos;s embedded web view navigation.</p>
        <div className="space-y-3">
          {config.webRoutes.map((route, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <input placeholder="/path" value={route.path} onChange={e => updateRoute(idx, { path: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              <input placeholder="Label" value={route.label} onChange={e => updateRoute(idx, { label: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              <label className="flex items-center gap-1 text-xs text-gray-600 whitespace-nowrap cursor-pointer">
                <input type="checkbox" checked={route.isActive} onChange={e => updateRoute(idx, { isActive: e.target.checked })} />
                Active
              </label>
              <button type="button" onClick={() => removeRoute(idx)} className="text-red-400 hover:text-red-600">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addRoute}
          className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium mt-2">
          <Plus size={15} /> Add Route
        </button>
      </Section>

      {/* ── Package Itineraries ────────────────────────────────────────── */}
      <Section title="Package Itineraries" icon={<Map size={16} />}>
        <p className="text-xs text-gray-500 mb-3">Override itinerary text per package slug (Markdown or plain text).</p>
        <div className="flex gap-2 mb-4">
          <input placeholder="Package slug (e.g. manali-5-days)" value={itinSlug} onChange={e => setItinSlug(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          <button type="button" onClick={addItinerary}
            className="flex items-center gap-1 bg-amber-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-amber-700">
            <Plus size={14} /> Add
          </button>
        </div>
        {Object.entries(config.packageItineraries).map(([slug, text]) => (
          <div key={slug} className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 font-mono">{slug}</span>
              <button type="button"
                onClick={() => {
                  const next = { ...config.packageItineraries };
                  delete next[slug];
                  set('packageItineraries', next);
                }}
                className="text-red-400 hover:text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
            <textarea rows={4} value={text}
              onChange={e => setConfig(prev => ({
                ...prev,
                packageItineraries: { ...prev.packageItineraries, [slug]: e.target.value },
              }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
            />
          </div>
        ))}
      </Section>

      {/* ── Package Galleries ──────────────────────────────────────────── */}
      <Section title="Package Galleries" icon={<Image size={16} />}>
        <p className="text-xs text-gray-500 mb-3">Image URLs per package slug (one per line).</p>
        <div className="flex gap-2 mb-4">
          <input placeholder="Package slug" value={gallerySlug} onChange={e => setGallerySlug(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          <button type="button" onClick={addGallery}
            className="flex items-center gap-1 bg-amber-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-amber-700">
            <Plus size={14} /> Add
          </button>
        </div>
        {Object.entries(config.packageGalleries).map(([slug, urls]) => (
          <div key={slug} className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 font-mono">{slug}</span>
              <button type="button"
                onClick={() => {
                  const next = { ...config.packageGalleries };
                  delete next[slug];
                  set('packageGalleries', next);
                }}
                className="text-red-400 hover:text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
            <textarea rows={4}
              value={urls.join('\n')}
              onChange={e => setConfig(prev => ({
                ...prev,
                packageGalleries: {
                  ...prev.packageGalleries,
                  [slug]: e.target.value.split('\n').map(s => s.trim()).filter(Boolean),
                },
              }))}
              placeholder="https://example.com/img1.jpg&#10;https://example.com/img2.jpg"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
            />
          </div>
        ))}
      </Section>

      {/* ── Visa Data ──────────────────────────────────────────────────── */}
      <Section title="Visa Data (JSON)" icon={<Zap size={16} />}>
        <p className="text-xs text-gray-500 mb-2">Raw JSON blob served to the app for visa requirements. Leave blank to use default.</p>
        <textarea
          rows={8}
          value={config.visaData}
          onChange={e => set('visaData', e.target.value)}
          placeholder='{"bali": {"fee": "Free", "type": "VOA"}, ...}'
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </Section>

      {/* ── Best Time Data ─────────────────────────────────────────────── */}
      <Section title="Best Time to Travel Data (JSON)" icon={<Clock size={16} />}>
        <p className="text-xs text-gray-500 mb-2">Raw JSON blob for the &quot;Best Time&quot; section in the app. Leave blank to use default.</p>
        <textarea
          rows={8}
          value={config.bestTimeData}
          onChange={e => set('bestTimeData', e.target.value)}
          placeholder='{"manali": {"peak": "Oct-Feb", "offPeak": "Jun-Sep"}, ...}'
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </Section>

      {/* ── Save button ─────────────────────────────────────────────────── */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 -mx-4 px-4 py-4 mt-6 flex items-center justify-between">
        <p className="text-xs text-gray-400">Changes go live in the app immediately after save.</p>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-colors"
        >
          {saving ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
          {saving ? 'Saving…' : 'Save App Config'}
        </button>
      </div>
    </div>
  );
}
