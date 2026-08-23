/**
 * Lead Qualification API
 * POST /api/leads/qualify
 * Scores inbound leads from WhatsApp, Facebook, Instagram, website
 * Routes hot leads immediately, nurtures warm/cold leads
 */
import { NextRequest, NextResponse } from 'next/server';
import { scoreLead, type Lead } from '@/lib/vera';
import Groq from 'groq-sdk';

const QUALIFIER_PROMPT = `You are Vera, YlooTrips AI lead qualifier.
Given a lead message, extract structured info and generate the perfect WhatsApp reply.
Respond ONLY with valid JSON — no markdown, no explanation.
{
  "destination": "detected destination or null",
  "budget": "detected budget or null",
  "travelDate": "detected date or null",
  "groupSize": "detected group size or null",
  "travelType": "honeymoon/family/solo/group/corporate or null",
  "urgency": "immediate/this_month/planning/unknown",
  "language": "english/hindi/hinglish",
  "whatsappReply": "perfect reply in detected language, warm and helpful, max 150 words"
}`;

async function aiQualify(message: string): Promise<Record<string, string | null>> {
  if (process.env.GROQ_API_KEY) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const res = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: QUALIFIER_PROMPT },
        { role: 'user', content: `Lead message: "${message}"` },
      ],
      temperature: 0.3,
      max_tokens: 512,
      response_format: { type: 'json_object' },
    });
    const text = res.choices[0]?.message?.content ?? '{}';
    return JSON.parse(text);
  }
  return {};
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, message, source } = body;

  if (!message) return NextResponse.json({ error: 'message is required' }, { status: 400 });

  const lead: Lead = { name, phone, message, source: source || 'website' };

  // Rule-based scoring (instant)
  const scored = scoreLead(lead);

  // AI enrichment (async — adds destination, travel type, language-aware reply)
  let aiData: Record<string, string | null> = {};
  try {
    aiData = await aiQualify(message);
  } catch {
    // Non-fatal — use rule-based data
  }

  // Merge AI data into scored lead
  const finalDestination = aiData.destination || scored.destination;
  const finalReply = aiData.whatsappReply || scored.whatsappMessage;

  // Notify team for hot leads via WhatsApp (fire-and-forget)
  if (scored.tier === 'hot' && phone) {
    notifyTeam({ name, phone, destination: finalDestination, score: scored.score, message })
      .catch(console.error);
  }

  // Log lead to contact API
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ylootrips.com'}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name || 'Lead',
        email: 'lead@ylootrips.com',
        phone: phone || '',
        destination: finalDestination,
        message: `[${source?.toUpperCase() || 'WEB'} LEAD | Score: ${scored.score} | ${scored.tier.toUpperCase()}] ${message}`,
      }),
    });
  } catch { /* non-fatal */ }

  return NextResponse.json({
    score: scored.score,
    tier: scored.tier,
    intent: scored.intent,
    destination: finalDestination,
    budget: aiData.budget || scored.estimatedBudget,
    travelDate: aiData.travelDate || null,
    groupSize: aiData.groupSize || null,
    travelType: aiData.travelType || null,
    urgency: aiData.urgency || 'unknown',
    language: aiData.language || 'english',
    suggestedAction: scored.suggestedAction,
    whatsappReply: finalReply,
    routing: {
      autoReply: true,
      escalateToHuman: scored.tier === 'hot',
      addToNurture: scored.tier === 'cold',
      callbackRequired: scored.tier === 'hot',
    },
  });
}

async function notifyTeam(lead: {
  name?: string;
  phone?: string;
  destination: string;
  score: number;
  message: string;
}) {
  // Send hot lead alert via WhatsApp Business API (Twilio)
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) return;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
  const toNumber = process.env.TEAM_WHATSAPP_NUMBER || 'whatsapp:+918427831127';

  const alertMessage =
    `🔥 *HOT LEAD ALERT* (Score: ${lead.score}/100)\n\n` +
    `Name: ${lead.name || 'Unknown'}\n` +
    `Phone: ${lead.phone || 'Not provided'}\n` +
    `Destination: ${lead.destination}\n` +
    `Message: "${lead.message.slice(0, 100)}..."\n\n` +
    `⚡ Call within 5 minutes for best conversion!`;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ From: fromNumber, To: toNumber, Body: alertMessage }),
  });
}
