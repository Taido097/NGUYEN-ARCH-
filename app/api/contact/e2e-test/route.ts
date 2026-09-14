import { NextRequest, NextResponse } from 'next/server';
import { POST as submitContact } from '../route';

export const dynamic = 'force-dynamic';

const TEST_TOKEN = 'nguyen-routing-e2e-20260914';

async function submitCase(origin: string, body: Record<string, string>) {
  const response = await submitContact(
    new NextRequest(new URL('/api/contact', origin), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  );

  return {
    status: response.status,
    body: await response.json(),
  };
}

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get('token') !== TEST_TOKEN) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  const stamp = new Date().toISOString();
  const common = {
    email: 'taido097@gmail.com',
    phone: '(714) 707-8889',
    projectType: 'Custom Home',
    budget: '2,500 - 10,000 sq ft',
    website: '',
  };

  const consultation = await submitCase(request.nextUrl.origin, {
    ...common,
    inquiryType: 'consultation',
    name: 'Codex Consultation Routing Test ' + stamp,
    company: '',
    message: 'Automated end-to-end test of the customer consultation email route.',
  });

  const collaboration = await submitCase(request.nextUrl.origin, {
    ...common,
    inquiryType: 'collaboration',
    name: 'Codex Collaboration Routing Test ' + stamp,
    company: 'Codex Test Contractor',
    message: 'Automated end-to-end test of the contractor collaboration email route.',
  });

  const success =
    consultation.status === 200 &&
    consultation.body?.success === true &&
    collaboration.status === 200 &&
    collaboration.body?.success === true;

  return NextResponse.json(
    { success, stamp, consultation, collaboration },
    { status: success ? 200 : 502 }
  );
}
