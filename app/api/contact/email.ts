import { buildContactDetails, getContactRecipient, type InquiryType } from './routing';

// Every submission is emailed to all three addresses. Sending from the verified
// nguyenarchitecture.com domain (via Resend) is what lets the two @nguyenarchitecture.com
// mailboxes actually receive — an Apps Script / Gmail sender gets filtered by that domain.
const RECIPIENTS = [
  'info@nguyenarchitecture.com',
  'consultant@nguyenarchitecture.com',
  'taido097@gmail.com',
];

// From address. Must be on a domain verified in Resend (nguyenarchitecture.com).
// Overridable via env so the domain/sender can change without a code edit.
const FROM = process.env.RESEND_FROM || 'NGUYEN Architecture <noreply@nguyenarchitecture.com>';

export type ContactFields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  inquiryType: string;
  projectType: string;
  budget: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildHtml(fields: ContactFields, detailBody: string) {
  const name = escapeHtml(fields.name);
  const email = escapeHtml(fields.email);
  const phone = escapeHtml(fields.phone);
  const company = escapeHtml(fields.company || 'Not provided');
  const details = escapeHtml(detailBody).replace(/\n/g, '<br>');

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171717;max-width:640px;margin:0 auto;">
      <div style="background:#111;color:#fff;padding:24px 28px;">
        <p style="margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#bdbdbd;">NGUYEN Architecture &amp; Engineering</p>
        <h1 style="margin:8px 0 0;font-size:26px;">New architecture project inquiry</h1>
      </div>
      <div style="border:1px solid #e5e5e5;border-top:0;padding:28px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Business / Project:</strong> ${company}</p>
        <p style="margin-top:24px;"><strong>Project details:</strong></p>
        <div style="background:#f7f7f7;border:1px solid #ececec;padding:18px;">${details}</div>
        <p style="margin-top:24px;color:#737373;font-size:13px;">Reply to this email to contact ${name} directly.</p>
      </div>
    </div>
  `;
}

// Build the full Resend request payload from validated fields. Pure — no network — so it can be tested.
export function buildEmailPayload(fields: ContactFields) {
  let detailBody = fields.message;

  if (fields.inquiryType) {
    // Validate the inquiry type (throws for an unknown one — caller maps that to a 400) and
    // build a richer body. Recipients stay all three regardless of type.
    getContactRecipient(fields.inquiryType);
    detailBody = buildContactDetails({
      inquiryType: fields.inquiryType as InquiryType,
      projectType: fields.projectType,
      budget: fields.budget,
      message: fields.message,
    });
  }

  const textLines = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    `Business / Project: ${fields.company || 'Not provided'}`,
    '',
    'Project details:',
    detailBody,
  ];

  return {
    from: FROM,
    to: RECIPIENTS,
    reply_to: fields.email,
    subject: `New architecture project inquiry from ${fields.name}`,
    html: buildHtml(fields, detailBody),
    text: textLines.join('\n'),
  };
}

export type ResendResult = { ok: true } | { ok: false; error: string };

// Send the notification through Resend's REST API. No SDK dependency — a single fetch.
export async function sendViaResend(
  payload: ReturnType<typeof buildEmailPayload>
): Promise<ResendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: 'Email service is not configured (missing RESEND_API_KEY).' };
  }

  let response: Response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify(payload),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      error:
        message.includes('timeout') || message.includes('aborted')
          ? 'The email request took too long. Please try again.'
          : 'Could not reach the email service. Please try again.',
    };
  }

  if (!response.ok) {
    let detail = '';
    try {
      const body = (await response.json()) as { message?: string };
      detail = body?.message || '';
    } catch {
      /* non-JSON error body */
    }
    console.error('Resend email error:', { status: response.status, detail });
    if (response.status === 401 || response.status === 403) {
      return { ok: false, error: 'The email service rejected the request (check RESEND_API_KEY).' };
    }
    if (detail.toLowerCase().includes('domain')) {
      return {
        ok: false,
        error: 'The sending domain is not verified in Resend yet. Verify nguyenarchitecture.com and try again.',
      };
    }
    return { ok: false, error: 'Your message could not be sent right now. Please try again in a moment.' };
  }

  return { ok: true };
}
