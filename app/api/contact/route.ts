import { NextRequest, NextResponse } from 'next/server';
import { buildContactDetails, getContactRecipient, type InquiryType } from './routing';

export const runtime = 'nodejs';

const GOOGLE_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbzfsoN0dWc1X1c1pyA-0RUsICYtSE_-LJwAPl-zBrG1Mq8meN4Gp3KYjV2MD0nxuU-P/exec';

// Where this site's submissions are emailed. Sent with the payload (rather than set as the script's
// global address) because the same Apps Script also serves the studio site, which keeps its own
// recipient. Hardcoded server-side so a request body can never redirect the notification.
const LEGACY_NOTIFY_TO = 'info@nguyenarchitecture.com,taido097@gmail.com';
const NOTIFY_FROM_NAME = 'NGUYEN Architecture Website';

function normalize(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function getWebhookError(
  responseText: string,
  status: number,
  contentType: string
) {
  const normalized = responseText.toLowerCase();

  if (
    normalized.includes('accounts.google.com') ||
    normalized.includes('sign in') ||
    normalized.includes('authorization required')
  ) {
    return 'The Google Apps Script web app is not publicly accessible. Set Execute as “Me” and Who has access to “Anyone,” then deploy a new version.';
  }

  if (normalized.includes('script function not found')) {
    return 'The Google Apps Script deployment does not contain the doPost function. Save the script and deploy a new version.';
  }

  if (status === 404) {
    return 'The Google Apps Script deployment URL is no longer active. Deploy the script again and use the new Web app URL ending in /exec.';
  }

  if (contentType.includes('text/html')) {
    return 'Google returned an unexpected web page instead of accepting the form. Check the Apps Script deployment permissions and deploy a new version.';
  }

  return 'Your message could not be saved. Please try again in a moment.';
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

    let notifyTo = LEGACY_NOTIFY_TO;
    let notificationMessage = message;

    if (inquiryType) {
      try {
        notifyTo = getContactRecipient(inquiryType);
        notificationMessage = buildContactDetails({
          inquiryType: inquiryType as InquiryType,
          projectType,
          budget,
          message,
        });
      } catch {
        return NextResponse.json(
          { error: 'Please select a valid inquiry type.' },
          { status: 400 }
        );
      }
    }

    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'DesignedbyTD-Studio/1.0',
      },
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        name,
        email,
        phone,
        company,
        message: notificationMessage,
        notifyTo,
        notifyFromName: NOTIFY_FROM_NAME,
        submittedAt: new Date().toISOString(),
      }),
    });

    const contentType = response.headers.get('content-type') || '';
    const responseText = await response.text();
    let result: { success?: boolean; error?: string; message?: string } = {};

    try {
      result = JSON.parse(responseText) as typeof result;
    } catch {
      console.error('Google Sheets webhook returned a non-JSON response:', {
        status: response.status,
        contentType,
        finalUrl: response.url,
        responseText: responseText.slice(0, 500),
      });
    }

    if (!response.ok || result.success !== true) {
      console.error('Google Sheets contact webhook error:', {
        status: response.status,
        contentType,
        finalUrl: response.url,
        result,
      });

      return NextResponse.json(
        {
          error:
            result.error ||
            getWebhookError(responseText, response.status, contentType),
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your request was sent successfully.',
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Contact form error:', message);

    return NextResponse.json(
      {
        error:
          message.includes('timeout') || message.includes('aborted')
            ? 'The request took too long. Please try again.'
            : 'Something went wrong. Please try again.',
      },
      { status: 500 }
    );
  }
}
