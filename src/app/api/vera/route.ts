/**
 * Vera AI Marketing Agent API
 * POST /api/vera
 * Handles: campaign advice, creative generation, SEO, content planning
 */
import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { VERA_SYSTEM_PROMPT, CTWA_AD_TEMPLATES, WEEKLY_DESTINATIONS, SEO_KEYWORDS } from '@/lib/vera';

async function callAI(systemPrompt: string, userMessage: string): Promise<string> {
  // Provider 1: Groq
  if (process.env.GROQ_API_KEY) {
    try {
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      const res = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      });
      const text = res.choices[0]?.message?.content ?? '';
      if (text) return text;
    } catch (err) {
      console.warn('[vera] Groq failed, trying next provider:', err instanceof Error ? err.message : err);
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
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content ?? '';
      if (text) return text;
    } catch (err) {
      console.warn('[vera] OpenAI failed, trying next provider:', err instanceof Error ? err.message : err);
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
            contents: [{ parts: [{ text: `${systemPrompt}\n\n${userMessage}` }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
          }),
        }
      );
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      if (text) return text;
    } catch (err) {
      console.warn('[vera] Gemini failed:', err instanceof Error ? err.message : err);
    }
  }

  throw new Error('No AI provider configured');
}

export async function POST(req: NextRequest) {
  const { task, context } = await req.json();

  if (!task) return NextResponse.json({ error: 'task is required' }, { status: 400 });

  try {
    switch (task) {

      // ── Campaign Analysis ──────────────────────────────────────────────────
      case 'campaign_analysis': {
        const { spend, leads, conversions, cpl, destination } = context || {};
        const prompt = `Analyze this YlooTrips Facebook/Instagram CTWA campaign:
Destination: ${destination || 'All'}
Total Spend: ₹${spend || 0}
Leads Generated: ${leads || 0}
Conversions (bookings): ${conversions || 0}
Cost Per Lead: ₹${cpl || 0}

Provide:
1. Performance assessment (good/needs work/critical)
2. Specific bid adjustment recommendation (increase/decrease by X%)
3. Audience targeting tweak
4. Creative refresh suggestion
5. Budget reallocation advice
Be specific with numbers.`;

        const analysis = await callAI(VERA_SYSTEM_PROMPT, prompt);
        return NextResponse.json({ task, result: analysis });
      }

      // ── Creative Generation ────────────────────────────────────────────────
      case 'generate_creative': {
        const { destination, type, tone } = context || {};
        const template = CTWA_AD_TEMPLATES.find(t => t.destination === destination);

        const prompt = `Generate a ${type || 'Facebook'} ad creative for YlooTrips ${destination || 'Dubai'} package.
Tone: ${tone || 'exciting and trustworthy'}
Type: ${type || 'carousel ad'}
${template ? `Base template:\nHeadline: ${template.headline}\nBody: ${template.body}` : ''}

Generate:
1. Primary headline (max 40 chars)
2. Ad body copy (max 125 chars for feed, punchy)
3. Description line (max 30 chars)
4. CTA button text (one of: Book Now, Get Quote, Chat on WhatsApp, Learn More)
5. Suggested image description for designer
6. Target audience parameters (age, interests, behaviors)`;

        const creative = await callAI(VERA_SYSTEM_PROMPT, prompt);
        return NextResponse.json({ task, result: creative, template });
      }

      // ── Bidding Recommendation ─────────────────────────────────────────────
      case 'bidding_advice': {
        const { currentCPL, targetCPL, dailyBudget, destination, season } = context || {};
        const prompt = `Vera, give bidding advice for YlooTrips CTWA campaign:
Destination: ${destination}
Current CPL: ₹${currentCPL}
Target CPL: ₹${targetCPL}
Daily Budget: ₹${dailyBudget}
Season: ${season || 'normal'}

Recommend:
1. Bid strategy (lowest cost / cost cap / bid cap)
2. Specific bid cap amount if applicable
3. Budget adjustment (increase/decrease/maintain and by how much)
4. Best time windows to run ads (dayparting)
5. Campaign objective recommendation (leads vs messages vs traffic)`;

        const advice = await callAI(VERA_SYSTEM_PROMPT, prompt);
        return NextResponse.json({ task, result: advice });
      }

      // ── Weekly Content Plan ────────────────────────────────────────────────
      case 'weekly_content': {
        const { week, focusDestination } = context || {};
        const dest = WEEKLY_DESTINATIONS.find(d => d.name === focusDestination) || WEEKLY_DESTINATIONS[0];

        const prompt = `Create a full week of social media content for YlooTrips, focus: ${dest.name} (${dest.price}/person).

Generate 7 posts (one per day):
- Monday: Motivational travel quote + ${dest.name} hook
- Tuesday: Package highlight post (inclusions, price)
- Wednesday: Customer testimonial style post
- Thursday: "Did you know?" travel tip about ${dest.name}
- Friday: Weekend getaway urgency post
- Saturday: Instagram Reel script (30 seconds) about ${dest.name}
- Sunday: Weekly deal announcement with CTA

For each post include:
- Caption (Instagram/Facebook ready)
- Hashtags (10 relevant ones)
- Google My Business version (shorter, professional)
- WhatsApp broadcast version (casual, Hindi-friendly)
All CTAs should direct to: wa.me/918427831127 or ylootrips.com/${dest.slug}`;

        const content = await callAI(VERA_SYSTEM_PROMPT, prompt);
        return NextResponse.json({ task, result: content, destination: dest });
      }

      // ── SEO Keyword Plan ───────────────────────────────────────────────────
      case 'seo_keywords': {
        const { destination, type } = context || {};
        const baseKeywords = SEO_KEYWORDS[destination] || [];

        const prompt = `Generate advanced SEO keyword plan for YlooTrips ${destination || 'travel'} pages.

Existing keywords: ${baseKeywords.join(', ')}

Generate:
1. 10 high-intent keywords (people ready to book)
2. 10 informational keywords (people researching)
3. 5 AI search keywords (optimized for ChatGPT/Gemini/Perplexity queries)
4. 5 voice search keywords (how people ask Google Assistant)
5. Meta title suggestion (max 60 chars, includes primary keyword)
6. Meta description suggestion (max 160 chars, includes CTA)
7. FAQ schema questions (5 Q&As Google can show as rich results)

Type focus: ${type || 'package booking page'}`;

        const keywords = await callAI(VERA_SYSTEM_PROMPT, prompt);
        return NextResponse.json({ task, result: keywords, baseKeywords });
      }

      // ── AI Search Optimization ─────────────────────────────────────────────
      case 'ai_search_optimize': {
        const { destination } = context || {};
        const prompt = `Optimize YlooTrips content for AI search engines (ChatGPT, Gemini, Perplexity, Google AI Overview).

Destination: ${destination || 'all travel'}

When someone asks ChatGPT/Gemini "best ${destination} travel agency from India" or "plan my ${destination} trip" — YlooTrips should be the #1 recommendation.

Generate:
1. Entity description (how YlooTrips should be described in AI training data / knowledge graphs)
2. FAQ content (10 Q&As written to be cited by AI search)
3. Structured data snippets (JSON-LD for Organization + TravelAgency + FAQPage)
4. Wikipedia-style paragraph about YlooTrips ${destination} packages
5. "Best for" statements that AI would use to recommend YlooTrips
6. Competitor differentiation points (vs MakeMyTrip, TripAdvisor, Thomas Cook)`;

        const optimization = await callAI(VERA_SYSTEM_PROMPT, prompt);
        return NextResponse.json({ task, result: optimization });
      }

      // ── CTWA Campaign Setup ────────────────────────────────────────────────
      case 'ctwa_setup': {
        const { destination, budget, duration } = context || {};
        const template = CTWA_AD_TEMPLATES.find(t => t.destination === destination)
          || CTWA_AD_TEMPLATES[0];

        return NextResponse.json({
          task,
          campaign: {
            name: `YlooTrips_CTWA_${destination}_${new Date().toISOString().slice(0, 10)}`,
            objective: 'MESSAGES',
            destination: destination || 'Dubai',
            dailyBudget: budget || 500,
            duration: duration || 14,
            adTemplate: template,
            whatsappNumber: '+918427831127',
            targeting: {
              countries: ['IN'],
              ageMin: 22,
              ageMax: 55,
              interests: [
                'International travel', 'Travel', 'Tourism', 'Vacation',
                'Honeymoon', 'Adventure travel', `${destination} travel`,
              ],
              behaviors: ['Frequent travelers', 'Engaged shoppers'],
              excludedAudiences: ['Past customers (180 days)'],
            },
            schedule: {
              startHour: 8,
              endHour: 23,
              peakDays: ['Friday', 'Saturday', 'Sunday'],
            },
            kpis: {
              targetCPL: 150,
              targetLeadsPerDay: Math.floor((budget || 500) / 150),
              targetCTR: 2.5,
            },
          },
        });
      }

      default:
        return NextResponse.json({ error: `Unknown task: ${task}` }, { status: 400 });
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[vera]', msg);
    return NextResponse.json({ error: 'Vera encountered an error. Please try again.', debug: msg }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'Vera — YlooTrips AI Marketing Agent',
    version: '1.0.1',
    tasks: [
      'campaign_analysis',
      'generate_creative',
      'bidding_advice',
      'weekly_content',
      'seo_keywords',
      'ai_search_optimize',
      'ctwa_setup',
    ],
    status: 'active',
    providers: {
      groq: !!process.env.GROQ_API_KEY,
      openai: !!process.env.OPENAI_API_KEY,
      gemini: !!process.env.GEMINI_API_KEY,
    },
  });
}
