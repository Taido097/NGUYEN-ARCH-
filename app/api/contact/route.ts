import { after, NextRequest, NextResponse } from 'next/server';
import { getContactRecipient } from './routing';
import { buildEmailPayload, sendViaResend } from './email';

export const runtime = 'nodejs';

const GOOGLE_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxINK0_TdSjvn5yJI_cdbG-m24MBcPFRRynVDX_bY2m3leSCTCZshZ5h6j0vJ9ruVse/exec';

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

async function saveLead(payload: Record<string, unknown>) {
  try {
    const leadPayload = {
      name,
      email,
      phone,
      company,
      message,
      inquiryType,
      projectType,
      budget,
      notifyTo,
      notifyFromName: NOTIFY_FROM_NAME,
      submittedAt: new Date().toISOString(),
      // Resend delivers the notification from the verified client domain. Apps Script
      // remains the lead store and must not send a duplicate Gmail notification.
      skipNotification: sentViaResend,
    };

    if (sentViaResend) {
      after(async () => {
        const saveError = await saveLead(leadPayload);
        if (saveError) {
          console.error('Resend email sent, but Google Sheets lead save failed:', saveError);
        }
      });

      return NextResponse.json(
        { success: true, message: 'Your request was sent successfully.' },
        { status: 200 }
      );
    }

    const saveError = await saveLead(leadPayload);
    if (saveError) {
      return NextResponse.json({ error: saveError }, { status: 502 });
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
