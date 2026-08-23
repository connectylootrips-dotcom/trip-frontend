/**
 * Weekly Posts Cron Job
 * GET /api/cron/weekly-posts
 * Runs every Monday at 9 AM IST (via Vercel Cron)
 * Generates and sends weekly content for:
 * - Google My Business
 * - WhatsApp broadcast
 * - Instagram/Facebook (returns copy for scheduling)
 */
import { NextRequest, NextResponse } from 'next/server';
import { WEEKLY_DESTINATIONS, VERA_SYSTEM_PROMPT } from '@/lib/vera';
import Groq from 'groq-sdk';

// Vercel Cron config — runs every Monday 3:30 AM UTC (9 AM IST)
export const dynamic = 'force-dynamic';

const WEEK_ROTATION = [
  'Dubai', 'Bali', 'Thailand', 'Kashmir',
  'Goa', 'Maldives', 'Vietnam', 'Singapore',
];

async function generateWeeklyContent(destination: string, destData: typeof WEEKLY_DESTINATIONS[0]) {
  if (!process.env.GROQ_API_KEY && !process.env.OPENAI_API_KEY) {
    throw new Error('No AI provider configured');
  }

  const prompt = `Generate this week's marketing content for YlooTrips — Focus: ${destination} (${destData.price}/person, ${destData.tag})

Create:
1. GOOGLE MY BUSINESS POST (max 300 chars, professional, include price + ylootrips.com link)
2. WHATSAPP BROADCAST (casual Hindi/Hinglish friendly, max 200 chars, include wa.me/918427831127)
3. INSTAGRAM CAPTION (engaging, storytelling, 150-200 chars + 15 hashtags)
4. FACEBOOK POST (informative, 200-250 chars, include social proof "25,000+ travelers")
5. INSTAGRAM REEL SCRIPT (30-second hook + body + CTA, spoken word)
6. EMAIL SUBJECT LINE (for weekly newsletter, max 50 chars, high open rate)

All content must:
- Feel authentic, not salesy
- Include specific price: ${destData.price}/person
- CTA: WhatsApp +91 84278 31127 or ylootrips.com/${destData.slug}
- Mention 0% EMI where relevant
- Use ${destData.emoji} emoji sparingly

Respond as JSON with keys: gmb, whatsapp, instagram, facebook, reelScript, emailSubject`;

  if (process.env.GROQ_API_KEY) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const res = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: VERA_SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 2048,
      response_format: { type: 'json_object' },
    });
    const text = res.choices[0]?.message?.content ?? '{}';
    return JSON.parse(text);
  }

  // OpenAI fallback
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: VERA_SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 2048,
      response_format: { type: 'json_object' },
    }),
  });
  const data = await res.json();
  return JSON.parse(data.choices[0]?.message?.content ?? '{}');
}

async function postToGoogleMyBusiness(content: string) {
  // Google My Business API
  if (!process.env.GOOGLE_MY_BUSINESS_TOKEN || !process.env.GOOGLE_MY_BUSINESS_LOCATION_ID) {
    console.log('[weekly-posts] GMB not configured — skipping');
    return null;
  }

  const locationId = process.env.GOOGLE_MY_BUSINESS_LOCATION_ID;
  const res = await fetch(
    `https://mybusiness.googleapis.com/v4/accounts/-/locations/${locationId}/localPosts`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GOOGLE_MY_BUSINESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        languageCode: 'en',
        summary: content,
        callToAction: { actionType: 'CALL', url: 'https://www.ylootrips.com' },
        topicType: 'STANDARD',
      }),
    }
  );
  return res.ok ? await res.json() : null;
}

async function sendWhatsAppBroadcast(content: string) {
  // Send to team for manual broadcast (auto-broadcast requires WhatsApp Business API approval)
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) return null;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
  const teamNumber = process.env.TEAM_WHATSAPP_NUMBER || 'whatsapp:+918427831127';

  const message = `📢 *This Week's WhatsApp Broadcast* (from Vera AI)\n\n${content}\n\n_Send this to your broadcast list today._`;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ From: fromNumber, To: teamNumber, Body: message }),
  });
  return res.ok;
}

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Pick destination based on week number
    const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % WEEK_ROTATION.length;
    const destination = WEEK_ROTATION[weekNumber];
    const destData = WEEKLY_DESTINATIONS.find(d => d.name === destination) || WEEKLY_DESTINATIONS[0];

    console.log(`[weekly-posts] Generating content for: ${destination}`);

    const content = await generateWeeklyContent(destination, destData);

    // Post to channels
    const [gmbResult, waResult] = await Promise.allSettled([
      postToGoogleMyBusiness(content.gmb || ''),
      sendWhatsAppBroadcast(content.whatsapp || ''),
    ]);

    return NextResponse.json({
      success: true,
      week: weekNumber,
      destination,
      content,
      channels: {
        googleMyBusiness: gmbResult.status === 'fulfilled' ? 'posted' : 'skipped',
        whatsappBroadcast: waResult.status === 'fulfilled' ? 'sent_to_team' : 'skipped',
        instagram: 'ready_to_schedule',
        facebook: 'ready_to_schedule',
      },
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[weekly-posts] Error:', err);
    return NextResponse.json({ error: 'Weekly content generation failed' }, { status: 500 });
  }
}
