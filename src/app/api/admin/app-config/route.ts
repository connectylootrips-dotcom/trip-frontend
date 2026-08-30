import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firestore';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://trip-backend-65232427280.asia-south1.run.app/api';
const DOC_ID = 'app_config';
const COLLECTION = 'app_config';

async function isAuthorised(req: NextRequest): Promise<boolean> {
  const adminSecret = process.env.ADMIN_SECRET;
  const directToken = req.headers.get('x-admin-secret') || req.headers.get('x-admin-token');
  if (adminSecret && directToken === adminSecret) return true;

  const bearer = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!bearer) return false;
  try {
    const res = await fetch(`${BACKEND_URL}/admin/verify`, {
      headers: { Authorization: `Bearer ${bearer}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!await isAuthorised(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const doc = await db().collection(COLLECTION).doc(DOC_ID).get();
    const data = doc.exists ? doc.data() : {};
    return NextResponse.json({ data: data ?? {} });
  } catch (err) {
    console.error('app-config GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!await isAuthorised(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    await db().collection(COLLECTION).doc(DOC_ID).set({
      ...body,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('app-config PUT error:', err);
    return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
  }
}
