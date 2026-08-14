import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isRateLimited, getClientIp } from '@/lib/ratelimit';

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'hello@ylootrips.com',
        to: process.env.ADMIN_EMAIL || 'hello@ylootrips.com',
        replyTo: email,
        subject: `🗺️ Free Trip Plan Request — ${destination || 'Not specified'}`,
        html: `
<!DOCTYPE html><html><body style="font-family:-apple-system,sans-serif;background:#f3f4f6;margin:0;padding:32px;">
<div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
  <div style="background:#111827;padding:24px 28px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:0.15em;color:#9ca3af;text-transform:uppercase;margin-bottom:4px;">YlooTrips — Free Trip Plan Request</div>
    <div style="font-size:20px;font-weight:700;color:#fff;">📩 New Lead from Popup</div>
  </div>
  <div style="padding:24px 28px;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 0;color:#6b7280;width:120px;">Email</td><td style="padding:6px 0;"><a href="mailto:${esc(email)}" style="color:#f59e0b;font-weight:600;">${esc(email)}</a></td></tr>
      <tr><td style="padding:6px 0;color:#6b7280;">Destination</td><td style="padding:6px 0;font-weight:600;color:#111827;">${esc(destination || 'Not specified')}</td></tr>
      <tr><td style="padding:6px 0;color:#6b7280;">Source</td><td style="padding:6px 0;color:#111827;">${esc(source || 'popup')}</td></tr>
    </table>
    <div style="margin-top:20px;padding:12px 14px;background:#fffbeb;border-radius:6px;font-size:12px;color:#92400e;">
      💡 Reply directly to this email to reach the visitor. Send them a personalised itinerary for <strong>${esc(destination || 'their destination')}</strong>.
    </div>
  </div>
</div>
</body></html>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[email-capture]', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
