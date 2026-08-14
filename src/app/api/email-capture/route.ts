import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import Groq from 'groq-sdk';
import { isRateLimited, getClientIp } from '@/lib/ratelimit';

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Generate a short itinerary for the destination using Groq
async function generateQuickItinerary(destination: string): Promise<string> {
  if (!process.env.GROQ_API_KEY) return '';
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `You are a travel expert for YlooTrips. Generate a concise 3-day itinerary for the given destination for Indian travelers.
Respond ONLY with a valid JSON object, no markdown:
{
  "destination": "Name",
  "duration": "3 Days / 2 Nights",
  "estimatedBudget": "₹X,XXX – ₹X,XXX per person",
  "bestTime": "Month range",
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "highlights": ["Activity 1", "Activity 2", "Activity 3"]
    }
  ],
  "tips": ["Tip 1", "Tip 2", "Tip 3"],
  "bookingNote": "One sentence about why to book with YlooTrips."
}`,
      },
      { role: 'user', content: `Destination: ${destination}` },
    ],
    temperature: 0.7,
    max_tokens: 800,
    response_format: { type: 'json_object' },
  });
  return completion.choices[0]?.message?.content ?? '';
}

// Build client itinerary HTML email
function buildClientEmail(destination: string, itinerary: string): string {
  let itin: {
    destination?: string;
    duration?: string;
    estimatedBudget?: string;
    bestTime?: string;
    days?: { day: number; title: string; highlights: string[] }[];
    tips?: string[];
    bookingNote?: string;
  } = {};
  try { itin = JSON.parse(itinerary); } catch { /* use empty */ }

  const dest = esc(itin.destination || destination);
  const daysHtml = (itin.days || []).map(d => `
    <div style="margin-bottom:16px;">
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#f59e0b;margin-bottom:4px;">Day ${d.day}</div>
      <div style="font-size:15px;font-weight:700;color:#111827;margin-bottom:6px;">${esc(d.title)}</div>
      <ul style="margin:0;padding-left:18px;">
        ${(d.highlights || []).map(h => `<li style="font-size:13px;color:#374151;margin-bottom:3px;">${esc(h)}</li>`).join('')}
      </ul>
    </div>`).join('');

  const tipsHtml = (itin.tips || []).map(t =>
    `<li style="font-size:13px;color:#374151;margin-bottom:4px;">💡 ${esc(t)}</li>`
  ).join('');

  return `<!DOCTYPE html><html><body style="font-family:-apple-system,sans-serif;background:#f3f4f6;margin:0;padding:24px;">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
  <!-- Header -->
  <div style="background:#111827;padding:28px;">
    <img src="https://www.ylootrips.com/logo.png" alt="YlooTrips" style="height:32px;margin-bottom:16px;" />
    <div style="font-size:22px;font-weight:700;color:#fff;">Your Free ${dest} Itinerary 🗺️</div>
    <div style="font-size:13px;color:#9ca3af;margin-top:4px;">Crafted just for you by YlooTrips</div>
  </div>

  <!-- Trip snapshot -->
  ${itin.duration || itin.estimatedBudget || itin.bestTime ? `
  <div style="background:#fffbeb;padding:16px 24px;display:flex;gap:24px;border-bottom:1px solid #fde68a;">
    ${itin.duration ? `<div><div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase;">Duration</div><div style="font-size:14px;font-weight:600;color:#111827;">${esc(itin.duration)}</div></div>` : ''}
    ${itin.estimatedBudget ? `<div><div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase;">Budget</div><div style="font-size:14px;font-weight:600;color:#111827;">${esc(itin.estimatedBudget)}</div></div>` : ''}
    ${itin.bestTime ? `<div><div style="font-size:10px;color:#92400e;font-weight:700;text-transform:uppercase;">Best Time</div><div style="font-size:14px;font-weight:600;color:#111827;">${esc(itin.bestTime)}</div></div>` : ''}
  </div>` : ''}

  <div style="padding:24px;">
    <!-- Day by day -->
    ${daysHtml || `<p style="color:#6b7280;font-size:14px;">Our travel experts are preparing your personalised ${dest} itinerary and will send it shortly.</p>`}

    <!-- Tips -->
    ${tipsHtml ? `<div style="margin-top:16px;padding:14px;background:#f9fafb;border-radius:8px;">
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:#6b7280;margin-bottom:8px;">Insider Tips</div>
      <ul style="margin:0;padding-left:18px;">${tipsHtml}</ul>
    </div>` : ''}

    <!-- Booking note -->
    ${itin.bookingNote ? `<p style="font-size:13px;color:#6b7280;margin-top:16px;font-style:italic;">${esc(itin.bookingNote)}</p>` : ''}

    <!-- CTA -->
    <div style="margin-top:24px;text-align:center;">
      <a href="https://wa.me/918427831127?text=Hi%2C%20I%20received%20my%20${encodeURIComponent(destination)}%20itinerary%20and%20want%20to%20book!"
        style="display:inline-block;background:#f59e0b;color:#fff;font-weight:700;font-size:14px;padding:14px 28px;border-radius:8px;text-decoration:none;">
        Book This Trip on WhatsApp →
      </a>
      <p style="font-size:12px;color:#9ca3af;margin-top:8px;">Or browse packages at <a href="https://www.ylootrips.com" style="color:#f59e0b;">ylootrips.com</a></p>
    </div>
  </div>

  <!-- Footer -->
  <div style="background:#f9fafb;padding:16px 24px;border-top:1px solid #e5e7eb;text-align:center;">
    <p style="font-size:11px;color:#9ca3af;margin:0;">YlooTrips · Operated by Ambe Enterprise · MSME: UDYAM-HR-05-0141455</p>
    <p style="font-size:11px;color:#9ca3af;margin:4px 0 0;">4.9★ rated · 25,000+ travelers · <a href="https://wa.me/918427831127" style="color:#9ca3af;">+91 84278 31127</a></p>
  </div>
</div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(`email-capture:${ip}`, 3, 60_000)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const { email, destination, source } = await req.json();

    if (!email || typeof email !== 'string' || email.length > 200) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const dest = destination || 'Not specified';

    // Generate itinerary (non-blocking if it fails)
    let itinerary = '';
    if (dest !== 'Not specified') {
      try { itinerary = await generateQuickItinerary(dest); } catch { /* send without itinerary */ }
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      const from = process.env.EMAIL_FROM || 'hello@ylootrips.com';
      const adminEmail = process.env.ADMIN_EMAIL || 'hello@ylootrips.com';

      await Promise.all([
        // 1 — Admin notification
        resend.emails.send({
          from,
          to: adminEmail,
          replyTo: email,
          subject: `🗺️ Free Trip Plan Request — ${dest}`,
          html: `<!DOCTYPE html><html><body style="font-family:-apple-system,sans-serif;background:#f3f4f6;margin:0;padding:32px;">
<div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
  <div style="background:#111827;padding:24px 28px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:0.15em;color:#9ca3af;text-transform:uppercase;margin-bottom:4px;">YlooTrips — Popup Lead</div>
    <div style="font-size:20px;font-weight:700;color:#fff;">📩 New Free Trip Plan Request</div>
  </div>
  <div style="padding:24px 28px;font-size:14px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:#6b7280;width:120px;">Email</td><td style="padding:6px 0;"><a href="mailto:${esc(email)}" style="color:#f59e0b;font-weight:600;">${esc(email)}</a></td></tr>
      <tr><td style="padding:6px 0;color:#6b7280;">Destination</td><td style="padding:6px 0;font-weight:600;color:#111827;">${esc(dest)}</td></tr>
      <tr><td style="padding:6px 0;color:#6b7280;">Source</td><td style="padding:6px 0;color:#111827;">${esc(source || 'popup')}</td></tr>
    </table>
    <div style="margin-top:16px;padding:12px 14px;background:#fffbeb;border-radius:6px;font-size:12px;color:#92400e;">
      ✅ Itinerary email ${itinerary ? 'sent automatically' : 'NOT sent (no destination or AI unavailable)'} to the visitor. Follow up on WhatsApp if needed.
    </div>
  </div>
</div>
</body></html>`,
        }),

        // 2 — Client itinerary email (only if we have an email and itinerary)
        ...(itinerary
          ? [resend.emails.send({
              from,
              to: email,
              subject: `Your free ${dest} itinerary from YlooTrips 🗺️`,
              html: buildClientEmail(dest, itinerary),
            })]
          : []),
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[email-capture]', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
