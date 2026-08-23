/**
 * CTWA (Click-to-WhatsApp) Lead Webhook
 * POST /api/leads/ctwa
 * Receives leads from Facebook/Instagram CTWA ads
 * Immediately qualifies, auto-replies via WhatsApp, alerts team
 */
import { NextRequest, NextResponse } from 'next/server';
import { scoreLead } from '@/lib/vera';

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Facebook Lead Ads webhook format
  const entry = body?.entry?.[0];
  const changes = entry?.changes?.[0];
  const leadData = changes?.value;

  if (!leadData) {
    // Try direct format (from custom landing pages)
    const { name, phone, message, adName, destination } = body;
    return handleDirectLead({ name, phone, message, adName, destination });
  }

  // Parse Facebook Lead Ads format
  const fieldData: Record<string, string> = {};
  (leadData.field_data || []).forEach((f: { name: string; values: string[] }) => {
    fieldData[f.name] = f.values?.[0] || '';
  });

  const lead = {
    name: fieldData['full_name'] || fieldData['name'] || 'Traveler',
    phone: fieldData['phone_number'] || fieldData['phone'] || '',
    message: `Interested in ${fieldData['destination'] || 'travel package'}. Budget: ${fieldData['budget'] || 'not specified'}. Travel date: ${fieldData['travel_date'] || 'flexible'}.`,
    source: 'ctwa' as const,
    destination: fieldData['destination'],
    budget: fieldData['budget'],
    travelDate: fieldData['travel_date'],
  };

  return handleDirectLead(lead);
}

async function handleDirectLead(lead: {
  name?: string;
  phone?: string;
  message?: string;
  adName?: string;
  destination?: string;
  budget?: string;
  travelDate?: string;
}) {
  const message = lead.message || `Interested in ${lead.destination || 'travel'} package`;
  const scored = scoreLead({
    name: lead.name,
    phone: lead.phone,
    message,
    source: 'ctwa',
    destination: lead.destination,
    budget: lead.budget,
    travelDate: lead.travelDate,
  });

  // Auto-reply via WhatsApp (Twilio)
  if (lead.phone) {
    await sendWhatsAppReply(lead.phone, scored.whatsappMessage);
  }

  // Qualify via internal AI endpoint
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ylootrips.com';
  fetch(`${siteUrl}/api/leads/qualify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: lead.name,
      phone: lead.phone,
      message,
      source: 'ctwa',
    }),
  }).catch(console.error);

  return NextResponse.json({
    received: true,
    leadTier: scored.tier,
    score: scored.score,
    destination: scored.destination,
    autoReplySent: !!lead.phone,
  });
}

async function sendWhatsAppReply(phone: string, message: string) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) return;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

  // Normalize phone number
  const normalizedPhone = phone.startsWith('+') ? phone : `+91${phone.replace(/\D/g, '').slice(-10)}`;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      From: fromNumber,
      To: `whatsapp:${normalizedPhone}`,
      Body: message,
    }),
  });
}

// Facebook webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
