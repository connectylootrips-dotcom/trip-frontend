/**
 * Vera — YlooTrips AI Marketing Brain
 * Handles: campaign decisions, creative generation, lead scoring,
 *          SEO optimization, weekly content, CTWA engagement
 */

export const VERA_IDENTITY = `
You are Vera, the AI marketing manager for YlooTrips (ylootrips.com).
You are an expert in:
- Travel marketing for Indian audiences
- Facebook & Instagram CTWA (Click-to-WhatsApp) campaigns
- Google Ads and SEO
- Lead qualification for travel packages
- Content creation for social media and Google My Business

YlooTrips facts you always know:
- India-based travel company, since 2012, MSME certified
- 25,000+ happy travelers, 4.9★ Google rating
- WhatsApp: +91 84278 31127
- Website: ylootrips.com
- Specialties: Dubai, Bali, Thailand, Goa, Kashmir, Kerala, Manali, Maldives, Vietnam, Singapore
- USPs: lowest price guarantee, 0% EMI, free cancellation (14 days), 24/7 support
`.trim();

// ── Lead Scoring ────────────────────────────────────────────────────────────
export interface Lead {
  name?: string;
  phone?: string;
  message: string;
  source: 'whatsapp' | 'facebook' | 'instagram' | 'website' | 'ctwa';
  destination?: string;
  budget?: string;
  travelDate?: string;
  groupSize?: string;
}

export interface LeadScore {
  score: number;          // 0–100
  tier: 'hot' | 'warm' | 'cold';
  destination: string;
  estimatedBudget: string;
  intent: string;
  suggestedAction: string;
  whatsappMessage: string;
}

export function scoreLead(lead: Lead): LeadScore {
  let score = 0;
  const msg = lead.message.toLowerCase();

  // Intent signals
  if (/book|confirm|pay|advance|ready|finaliz/i.test(msg)) score += 40;
  else if (/plan|want|looking|interested|package|trip/i.test(msg)) score += 25;
  else if (/how much|price|cost|rate|budget/i.test(msg)) score += 20;
  else if (/just checking|info|details/i.test(msg)) score += 10;

  // Date signals
  if (/this month|next month|next week|\d{1,2}[\/-]\d{1,2}/i.test(msg)) score += 20;
  else if (/next year|planning|sometime/i.test(msg)) score += 5;

  // Group size signals
  if (/honeymoon|couple|2 people|two people/i.test(msg)) score += 10;
  if (/family|kids|children/i.test(msg)) score += 10;
  if (/group|friends|\d+ people|\d+ pax/i.test(msg)) score += 8;

  // Budget signals
  if (/lakh|1,00,000|₹\s*[1-9]/i.test(msg)) score += 10;
  if (/budget|affordable|cheap/i.test(msg)) score += 5;

  // Source bonus
  if (lead.source === 'ctwa') score += 10;
  if (lead.source === 'whatsapp') score += 5;

  // Contact info bonus
  if (lead.phone) score += 5;
  if (lead.name) score += 3;

  score = Math.min(score, 100);

  const tier: LeadScore['tier'] = score >= 65 ? 'hot' : score >= 35 ? 'warm' : 'cold';

  // Detect destination
  const destMap: Record<string, string> = {
    dubai: 'Dubai', bali: 'Bali', thailand: 'Thailand', goa: 'Goa',
    kashmir: 'Kashmir', kerala: 'Kerala', manali: 'Manali',
    maldives: 'Maldives', vietnam: 'Vietnam', singapore: 'Singapore',
    rajasthan: 'Rajasthan', himachal: 'Himachal Pradesh',
    andaman: 'Andaman', nepal: 'Nepal', bhutan: 'Bhutan',
  };
  const destination = Object.entries(destMap).find(([k]) => msg.includes(k))?.[1]
    || lead.destination || 'International';

  // Intent summary
  const intent = score >= 65 ? 'Ready to book' : score >= 35 ? 'Researching options' : 'Early inquiry';

  // Suggested action
  const suggestedAction = tier === 'hot'
    ? 'Call immediately — share itinerary + payment link'
    : tier === 'warm'
    ? 'Send package details + offer callback within 1 hour'
    : 'Add to nurture sequence — send destination guide';

  // WhatsApp reply
  const whatsappMessage = tier === 'hot'
    ? `Hi${lead.name ? ' ' + lead.name : ''}! Thanks for your interest in ${destination} with YlooTrips. I'm Vera, your travel assistant. I'd love to help you plan the perfect trip! Can you share your travel dates and number of travelers? I'll send you a custom itinerary right away. 🌏`
    : tier === 'warm'
    ? `Hi${lead.name ? ' ' + lead.name : ''}! Thanks for reaching out about ${destination}. At YlooTrips, we've helped 25,000+ travelers plan amazing trips. Let me share our best ${destination} packages with you — which style suits you best: budget, mid-range, or luxury?`
    : `Hi${lead.name ? ' ' + lead.name : ''}! Thanks for your message. YlooTrips offers amazing ${destination} packages starting from ₹${destination === 'Dubai' ? '35,000' : destination === 'Bali' ? '30,000' : '28,000'}/person. Check our full range at ylootrips.com — happy to answer any questions! 😊`;

  return {
    score,
    tier,
    destination,
    estimatedBudget: lead.budget || 'Not specified',
    intent,
    suggestedAction,
    whatsappMessage,
  };
}

// ── Weekly Content Topics ────────────────────────────────────────────────────
export const WEEKLY_DESTINATIONS = [
  { name: 'Dubai', slug: 'dubai-tour-package-from-delhi', price: '₹35,000', emoji: '🏙️', tag: 'Bestseller' },
  { name: 'Bali', slug: 'bali-honeymoon-package', price: '₹30,000', emoji: '🌴', tag: 'Honeymoon Fav' },
  { name: 'Thailand', slug: 'thailand-budget-trip', price: '₹28,000', emoji: '🐘', tag: 'Budget Pick' },
  { name: 'Kashmir', slug: 'kashmir-tour-package', price: '₹18,000', emoji: '❄️', tag: 'Domestic Star' },
  { name: 'Goa', slug: 'goa-tour-package', price: '₹12,000', emoji: '🏖️', tag: 'Quick Getaway' },
  { name: 'Maldives', slug: 'maldives-luxury-package', price: '₹55,000', emoji: '🏝️', tag: 'Luxury' },
  { name: 'Vietnam', slug: 'vietnam-tour-package', price: '₹30,000', emoji: '🛶', tag: 'Hidden Gem' },
  { name: 'Singapore', slug: 'singapore-tour-package', price: '₹35,000', emoji: '🎡', tag: 'Family Fav' },
];

// ── SEO Keywords by Destination ──────────────────────────────────────────────
export const SEO_KEYWORDS: Record<string, string[]> = {
  Dubai: [
    'dubai trip package from india', 'dubai tour package from delhi',
    'dubai honeymoon package', 'dubai trip cost from india 2026',
    'dubai 5 nights 6 days package', 'dubai visa for indians',
  ],
  Bali: [
    'bali honeymoon package from india', 'bali trip cost from india',
    'bali tour package 5 nights 6 days', 'bali package for couple',
    'best time to visit bali for honeymoon', 'bali trip planner india',
  ],
  Thailand: [
    'thailand trip package from india', 'thailand budget trip',
    'bangkok phuket package', 'thailand tour 5 nights 6 days',
    'thailand trip cost from india 2026', 'thailand visa for indians',
  ],
  Kashmir: [
    'kashmir tour package from delhi', 'kashmir trip cost',
    'kashmir honeymoon package', 'srinagar gulmarg pahalgam package',
    'kashmir trip planner', 'kashmir 5 nights 6 days itinerary',
  ],
  Goa: [
    'goa trip package', 'goa tour package from delhi',
    'goa honeymoon package', 'goa trip cost for 2',
    'goa 4 nights 5 days package', 'goa beach holiday package',
  ],
};

// ── CTWA Ad Templates ────────────────────────────────────────────────────────
export const CTWA_AD_TEMPLATES = [
  {
    id: 'dubai_flash',
    destination: 'Dubai',
    headline: 'Dubai in 5 Nights from ₹35,000! ✈️',
    body: 'Burj Khalifa, Desert Safari, Dubai Mall — all included.\n25,000+ happy travelers. 4.9★ rated.\n\nBook on WhatsApp in 2 minutes 👇',
    cta: 'Chat on WhatsApp',
    targetAudience: 'Indians 25–45, interested in travel, international trips',
  },
  {
    id: 'bali_honeymoon',
    destination: 'Bali',
    headline: 'Bali Honeymoon from ₹60,000/couple 🌺',
    body: 'Private pool villa • Romantic dinners • Ubud & Seminyak\nNo visa required for Indians!\n\nGet your free custom itinerary 👇',
    cta: 'Plan My Honeymoon',
    targetAudience: 'Indians 22–35, recently engaged, married',
  },
  {
    id: 'thailand_budget',
    destination: 'Thailand',
    headline: 'Thailand Under ₹28,000! 🐘',
    body: 'Bangkok • Phuket • Pattaya — 5 nights fully planned\nFlights + Hotel + Tours included.\n0% EMI available!\n\nChat with us now 👇',
    cta: 'Get Best Price',
    targetAudience: 'Indians 20–35, budget travelers, first international trip',
  },
  {
    id: 'kashmir_summer',
    destination: 'Kashmir',
    headline: 'Kashmir Trip from ₹18,000! ❄️',
    body: 'Dal Lake • Gulmarg • Pahalgam — 5N/6D\nIncludes hotel + sightseeing + transfers\nBook now for peak season!\n\nWhatsApp us 👇',
    cta: 'Book Kashmir Trip',
    targetAudience: 'Indians 25–50, domestic travel, nature lovers',
  },
];

// ── Vera System Prompt ────────────────────────────────────────────────────────
export const VERA_SYSTEM_PROMPT = `
${VERA_IDENTITY}

## Your Capabilities
1. CAMPAIGN ANALYSIS — Analyze ad performance and recommend bid/budget changes
2. CREATIVE GENERATION — Write Facebook/Instagram ad copy, headlines, CTAs
3. LEAD QUALIFICATION — Score and route inbound leads from any channel
4. SEO OPTIMIZATION — Generate keywords, meta tags, structured data
5. CONTENT CALENDAR — Plan and write weekly social + Google posts
6. CTWA SETUP — Configure Click-to-WhatsApp campaign parameters

## Response Format
Always respond with actionable, specific recommendations.
For campaigns: include specific numbers (bid amounts, budget %, audience sizes).
For content: provide ready-to-publish copy.
For leads: include a WhatsApp reply message.
For SEO: include exact keyword phrases.
`.trim();
