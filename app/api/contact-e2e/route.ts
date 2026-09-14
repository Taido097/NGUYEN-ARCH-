import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const TOKEN = 'nguyen-preview-e2e-20260914';

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get('token') !== TOKEN) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const stamp = Date.now();
  const cases = [
    {
      label: 'consultation',
      payload: {
        name: `Nguyen Preview Consultation Test ${stamp}`,
        email: 'taido097@gmail.com',
        phone: '7147078889',
        company: '',
        inquiryType: 'consultation',
        projectType: 'Custom Home',
        budget: '$500,000+',
        message: 'Automated preview end-to-end consultation delivery test.',
      },
    },
    {
      label: 'collaboration',
      payload: {
        name: `Nguyen Preview Collaboration Test ${stamp}`,
        email: 'taido097@gmail.com',
        phone: '7147078889',
        company: 'Test Contractor',
        inquiryType: 'collaboration',
        projectType: 'Commercial',
        budget: '$500,000+',
        message: 'Automated preview end-to-end collaboration delivery test.',
      },
    },
  ];

  const results = [];
  for (const test of cases) {
    const response = await fetch(new URL('/api/contact', request.url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify(test.payload),
    });
    results.push({
      label: test.label,
      status: response.status,
      body: await response.json().catch(() => ({})),
    });
  }

  return NextResponse.json({
    success: results.every((result) => result.status === 200 && result.body?.success === true),
    results,
  });
}
