import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const CLIENT_DEMOS: Record<string, string> = {
  DESIGNEDBYTD: '/demos',
  '8889': '/client-demos/client-8889',
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { code?: string };
    const code = body.code?.trim().toUpperCase() ?? '';
    const href = CLIENT_DEMOS[code];

    if (!href) {
      return NextResponse.json({ error: 'Demo code not found' }, { status: 404 });
    }

    return NextResponse.json({ href });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
