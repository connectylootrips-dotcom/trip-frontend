/**
 * AI SEO Optimizer API
 * POST /api/seo/optimize
 * Generates advanced SEO content optimized for:
 * - Google organic search
 * - Google AI Overviews (SGE)
 * - ChatGPT search
 * - Gemini search
 * - Perplexity AI
 */
import { NextRequest, NextResponse } from 'next/server';
import { SEO_KEYWORDS, VERA_SYSTEM_PROMPT } from '@/lib/vera';
import Groq from 'groq-sdk';

async function callAI(prompt: string): Promise<string> {
  // Provider 1: Groq
  if (process.env.GROQ_API_KEY) {
    try {
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      const res = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: VERA_SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 3000,
        response_format: { type: 'json_object' },
      });
      const text = res.choices[0]?.message?.content ?? '';
      if (text) return text;
    } catch (err) {
      console.warn('[seo/optimize] Groq failed:', err instanceof Error ? err.message : err);
    }
  }
  // Provider 2: OpenAI
  if (process.env.OPENAI_API_KEY) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: VERA_SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
          temperature: 0.5,
          max_tokens: 3000,
        }),
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content ?? '';
      if (text) return text;
    } catch (err) {
      console.warn('[seo/optimize] OpenAI failed:', err instanceof Error ? err.message : err);
    }
  }
  // Provider 3: Gemini
  if (process.env.GEMINI_API_KEY) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${VERA_SYSTEM_PROMPT}\n\n${prompt}` }] }],
            generationConfig: { temperature: 0.5, maxOutputTokens: 3000 },
          }),
        }
      );
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      if (text) return text;
    } catch (err) {
      console.warn('[seo/optimize] Gemini failed:', err instanceof Error ? err.message : err);
    }
  }
  throw new Error('No AI provider configured');
}

// Generate FAQ schema for a destination
function generateFAQSchema(destination: string, faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

// Generate TravelAgency schema
function generateTravelAgencySchema(destination: string) {
  return {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    name: 'YlooTrips',
    url: 'https://www.ylootrips.com',
    logo: 'https://www.ylootrips.com/logo.png',
    telephone: '+91-84278-31127',
    description: `YlooTrips is India's trusted travel agency specialising in ${destination} packages, honeymoon trips, family holidays, and group tours. Established 2012. 25,000+ happy travelers.`,
    foundingDate: '2012',
    areaServed: { '@type': 'Country', name: 'India' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${destination} Tour Packages`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: `${destination} Tour Package`,
            description: `Complete ${destination} tour package with hotel, transfers, sightseeing and breakfast`,
            touristType: ['Couple', 'Family', 'Group'],
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '25000',
      bestRating: '5',
    },
    sameAs: [
      'https://www.instagram.com/ylootrips',
      'https://www.facebook.com/ylootrips',
    ],
  };
}

export async function POST(req: NextRequest) {
  const { destination, pageType, currentMeta } = await req.json();

  if (!destination) return NextResponse.json({ error: 'destination is required' }, { status: 400 });

  const baseKeywords = SEO_KEYWORDS[destination] || [];

  const prompt = `You are optimizing YlooTrips SEO for: ${destination} ${pageType || 'package page'}

Current keywords: ${baseKeywords.join(', ')}
${currentMeta ? `Current meta: ${JSON.stringify(currentMeta)}` : ''}

Generate a complete SEO package as JSON:
{
  "metaTitle": "optimized title max 60 chars with primary keyword",
  "metaDescription": "optimized description max 160 chars with CTA",
  "h1": "page heading with keyword",
  "h2s": ["5 subheadings for the page"],
  "primaryKeywords": ["top 5 keywords by search volume"],
  "longTailKeywords": ["10 long-tail keywords with high intent"],
  "aiSearchKeywords": ["5 keywords optimized for ChatGPT/Gemini queries like 'best X from India'"],
  "voiceSearchPhrases": ["5 natural language questions people ask Google Assistant"],
  "faqs": [
    {"q": "question", "a": "answer that AI would cite (mention ylootrips.com naturally)"},
    {"q": "question", "a": "answer"},
    {"q": "question", "a": "answer"},
    {"q": "question", "a": "answer"},
    {"q": "question", "a": "answer"}
  ],
  "entityDescription": "2-sentence description of YlooTrips ${destination} packages for Google Knowledge Graph",
  "competitorDifferentiation": "why choose YlooTrips over MakeMyTrip/TripAdvisor for ${destination}",
  "contentBrief": "100-word brief for a blog post that will rank for ${destination} searches"
}`;

  try {
    const raw = await callAI(prompt);

    // Parse JSON from AI response — try multiple extraction strategies
    let seoData: Record<string, unknown> = {};
    const strategies = [
      // 1. Direct clean (strip markdown fences)
      () => raw.replace(/```json\n?/gi, '').replace(/```\n?/gi, '').trim(),
      // 2. Extract first {...} block
      () => { const m = raw.match(/\{[\s\S]*\}/); return m ? m[0] : ''; },
      // 3. Extract after first { up to last }
      () => raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1),
    ];
    for (const strategy of strategies) {
      try {
        const candidate = strategy();
        if (candidate) { seoData = JSON.parse(candidate); break; }
      } catch { /* try next */ }
    }
    if (!seoData || Object.keys(seoData).length === 0) {
      return NextResponse.json({ destination, raw, schemas: {} });
    }

    // Generate schemas
    const faqs = (seoData.faqs as { q: string; a: string }[]) || [];
    const schemas = {
      faqSchema: generateFAQSchema(destination, faqs),
      travelAgencySchema: generateTravelAgencySchema(destination),
    };

    // Ping IndexNow with updated content signal
    pingIndexNow(destination).catch(console.error);

    return NextResponse.json({
      destination,
      pageType: pageType || 'package page',
      seo: seoData,
      schemas,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[seo/optimize]', err);
    return NextResponse.json({ error: 'SEO optimization failed' }, { status: 500 });
  }
}

async function pingIndexNow(destination: string) {
  const slugMap: Record<string, string> = {
    Dubai: 'dubai-tour-package-from-delhi',
    Bali: 'bali-honeymoon-package',
    Thailand: 'thailand-budget-trip',
    Kashmir: 'kashmir-tour-package',
    Goa: 'goa-tour-package',
    Maldives: 'maldives-luxury-package',
    Vietnam: 'vietnam-tour-package',
    Singapore: 'singapore-tour-package',
  };
  const slug = slugMap[destination];
  if (!slug) return;

  await fetch('https://www.ylootrips.com/api/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ urls: [`https://www.ylootrips.com/${slug}`] }),
  });
}
