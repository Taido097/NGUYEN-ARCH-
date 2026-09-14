import { NextRequest, NextResponse } from 'next/server';
import { buildEmailPayload, sendViaResend } from './email';

export const runtime = 'nodejs';

function normalize(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = normalize(body.name);
    const email = normalize(body.email).toLowerCase();
    const phone = normalize(body.phone);
    const company = normalize(body.company);
    const inquiryType = normalize(body.inquiryType);
    const projectType = normalize(body.projectType);
    const budget = normalize(body.budget);
    const message = normalize(body.message);
    const website = normalize(body.website);

    // Honeypot: a filled hidden field means a bot — accept silently, send nothing.
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!name || !email || !phone || !message || (inquiryType && !projectType)) {
      return NextResponse.json(
        {
          error:
            'Please complete your name, required email, phone number, and project details.',
        },
        { status: 400 }
      );
    }

    if (
      name.length > 100 ||
      phone.length > 30 ||
      company.length > 150 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: 'One or more fields are too long.' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Please include a little more detail about your project.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number.' },
        { status: 400 }
      );
    }

    let payload;
    try {
      payload = buildEmailPayload({
        name,
        email,
        phone,
        company,
        message,
        inquiryType,
        projectType,
        budget,
      });
    } catch {
      return NextResponse.json(
        { error: 'Please select a valid inquiry type.' },
        { status: 400 }
      );
    }

    const result = await sendViaResend(payload);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 502 });
    }

    return NextResponse.json(
      { success: true, message: 'Your request was sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Contact form error:', message);

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
