const SPREADSHEET_ID = '1ukYVkQToxQBO5_ASzjNdUb4U0Ek39Ll21kDuRO2kDr4';
const SHEET_NAME = 'Website Leads';
const NOTIFICATION_RECIPIENTS = {
  consultation: 'consultant@nguyenarchitecture.com,taido097@gmail.com',
  collaboration: 'info@nguyenarchitecture.com,taido097@gmail.com',
};

function doPost(e) {
  try {
    const payload = JSON.parse((e.postData && e.postData.contents) || '{}');

    const name = clean(payload.name);
    const email = clean(payload.email).toLowerCase();
    const phone = clean(payload.phone);
    const company = clean(payload.company) || 'Not provided';
    const message = clean(payload.message);
    const inquiryType = clean(payload.inquiryType);
    const projectType = clean(payload.projectType);
    const budget = clean(payload.budget) || 'Not provided';
    const submittedAt = payload.submittedAt
      ? new Date(payload.submittedAt)
      : new Date();

    if (!name || !email || !phone || !message || !projectType) {
      return jsonResponse({
        success: false,
        error: 'Missing required contact information.',
      });
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    ensureHeader(sheet);

    const notifyTo = getNotificationRecipients(inquiryType);
    const emailSubject = getEmailSubject(inquiryType, projectType);

    sheet.appendRow([
      submittedAt,
      safeCell(name),
      safeCell(email),
      safeCell(phone),
      safeCell(company),
      safeCell(message),
      'New',
      safeCell(notifyTo),
      safeCell(getInquiryLabel(inquiryType)),
      safeCell(projectType),
      safeCell(budget),
    ]);

    sheet
      .getRange(sheet.getLastRow(), 1)
      .setNumberFormat('M/d/yyyy h:mm AM/PM');

    const notifyFromName = clean(payload.notifyFromName) || 'NGUYEN Architecture Website';

    if (payload.skipNotification !== true) {
      MailApp.sendEmail({
        to: notifyTo,
        replyTo: email,
        subject: emailSubject,
        body: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Business / Project: ${company}`,
          `Inquiry Type: ${getInquiryLabel(inquiryType)}`,
          `Project Type: ${projectType}`,
          `Budget: ${budget}`,
          '',
          'Project details:',
          message,
          '',
          'This inquiry was also saved in your Google Sheet.',
        ].join('\n'),
        htmlBody: buildEmailHtml(name, email, phone, company, inquiryType, projectType, budget, message, notifyFromName),
        name: notifyFromName,
      });
    }

    return jsonResponse({
      success: true,
      message: payload.skipNotification === true ? 'Lead saved.' : 'Lead saved and notification sent.',
    });
  } catch (error) {
    console.error(error);
    return jsonResponse({
      success: false,
      error: 'Google Sheets could not save this submission.',
    });
  }
}

function setupSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  ensureHeader(sheet);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 11);
}

function ensureHeader(sheet) {
  const headers = [
    'Submitted At',
    'Name',
    'Email',
    'Phone',
    'Business',
    'Project Details',
    'Status',
    'Notification Sent To',
    'Inquiry Type',
    'Project Type',
    'Budget',
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  const header = sheet.getRange(1, 1, 1, headers.length);
  header.setFontWeight('bold');
  header.setBackground('#111111');
  header.setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function safeCell(value) {
  const text = String(value || '');
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getNotificationRecipients(inquiryType) {
  const recipients = NOTIFICATION_RECIPIENTS[inquiryType];
  if (!recipients) throw new Error('Invalid inquiry type.');
  return recipients;
}

function getInquiryLabel(inquiryType) {
  if (inquiryType === 'consultation') return 'Project Inquiry';
  if (inquiryType === 'collaboration') return 'Collaboration';
  throw new Error('Invalid inquiry type.');
}

function getEmailSubject(inquiryType, projectType) {
  const prefix = inquiryType === 'consultation'
    ? 'New Project Inquiry'
    : inquiryType === 'collaboration'
      ? 'New Collaboration Request'
      : '';
  if (!prefix) throw new Error('Invalid inquiry type.');
  return `${prefix} — ${clean(projectType) || 'Not provided'}`;
}

function buildEmailHtml(name, email, phone, company, inquiryType, projectType, budget, message, senderName) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeCompany = escapeHtml(company);
  const safeInquiryType = escapeHtml(getInquiryLabel(inquiryType));
  const safeProjectType = escapeHtml(projectType);
  const safeBudget = escapeHtml(budget);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
  const safeSender = escapeHtml(senderName || 'NGUYEN Architecture');

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171717;max-width:640px;margin:0 auto;">
      <div style="background:#111;color:#fff;padding:24px 28px;">
        <p style="margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#bdbdbd;">${safeSender}</p>
        <h1 style="margin:8px 0 0;font-size:26px;">${escapeHtml(getEmailSubject(inquiryType, projectType))}</h1>
      </div>
      <div style="border:1px solid #e5e5e5;border-top:0;padding:28px;">
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>
        <p><strong>Business / Project:</strong> ${safeCompany}</p>
        <p><strong>Inquiry Type:</strong> ${safeInquiryType}</p>
        <p><strong>Project Type:</strong> ${safeProjectType}</p>
        <p><strong>Budget:</strong> ${safeBudget}</p>
        <p style="margin-top:24px;"><strong>Project details:</strong></p>
        <div style="background:#f7f7f7;border:1px solid #ececec;padding:18px;">${safeMessage}</div>
        <p style="margin-top:24px;color:#737373;font-size:13px;">Reply to this email to contact ${safeName} directly. This inquiry is also saved in your Google Sheet.</p>
      </div>
    </div>
  `;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
