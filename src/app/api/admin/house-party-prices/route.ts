import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firestore';

const DEFAULTS = {
  female: { label: 'Female', price: 499, note: 'Limited time offer' },
  single: { label: 'Single', price: 999, note: 'Early bird offer' },
  couple: { label: 'Couple / Friends', price: 1499, note: 'For 2 people' },
};

export async function GET() {
  try {
    const snap = await db().collection('house_party_prices').get();
    const docsMap: Record<string, Record<string, unknown>> = {};
    snap.docs.forEach((d: { id: string; data: () => Record<string, unknown> }) => {
      docsMap[d.id] = d.data();
    });

    const result = Object.entries(DEFAULTS).map(([id, def]) => {
      const override = docsMap[id];
      return {
        id,
        label: def.label,
        note: def.note,
        price: (override?.price as number) ?? def.price,
        defaultPrice: def.price,
        updatedAt: override?.updatedAt ?? null,
      };
    });

    return NextResponse.json({ data: result });
  } catch {
    // Firestore unavailable — return defaults
    const result = Object.entries(DEFAULTS).map(([id, def]) => ({
      id, label: def.label, note: def.note,
      price: def.price, defaultPrice: def.price, updatedAt: null,
    }));
    return NextResponse.json({ data: result });
  }
}

export async function PUT(req: NextRequest) {
  const adminToken = req.headers.get('x-admin-token');
  if (!adminToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, price } = await req.json();
  if (!id || !DEFAULTS[id as keyof typeof DEFAULTS]) {
    return NextResponse.json({ error: 'Invalid ticket type' }, { status: 400 });
  }
  if (!price || Number(price) <= 0) {
    return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
  }

  try {
    await db().collection('house_party_prices').doc(id).set({
      id,
      label: DEFAULTS[id as keyof typeof DEFAULTS].label,
      price: Number(price),
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('house-party-prices PUT error:', err);
    return NextResponse.json({ error: 'Failed to update price' }, { status: 500 });
  }
}
