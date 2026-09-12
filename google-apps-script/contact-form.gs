const SPREADSHEET_ID = '1yMJoyYozpwjdd5TsciXGOKTgjcqDb9vgw_zO1eCs7DE';
const SHEET_NAME = 'Website Leads';
const NOTIFICATION_EMAIL = 'designedbytd.studio@gmail.com';

function doPost(e) {
  try {
    const payload = JSON.parse((e.postData && e.postData.contents) || '{}');

    const name = clean(payload.name);
    const email = clean(payload.email).toLowerCase();
    const phone = clean(payload.phone);
    const company = clean(payload.company) || 'Not provided';
    const message = clean(payload.message);
    const submittedAt = payload.submittedAt
      ? new Date(payload.submittedAt)
      : new Date();

    if (!name || !email || !phone || !message) {
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

    sheet.appendRow([
      submittedAt,
      safeCell(name),
      safeCell(email),
      safeCell(phone),
      safeCell(company),
      safeCell(message),
      'New',
    ]);

    sheet
      .getRange(sheet.getLastRow(), 1)
      .setNumberFormat('M/d/yyyy h:mm AM/PM');

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `New website request from ${name}`,
      body: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Business: ${company}`,
        '',
        'Project details:',
        message,
        '',
        'This lead was also saved in your Google Sheet.',
      ].join('\n'),
      htmlBody: buildEmailHtml(name, email, phone, company, message),
      name: 'DesignedbyTD Website',
    });

    return jsonResponse({
      success: true,
      message: 'Lead saved and notification sent.',
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
  sheet.autoResizeColumns(1, 7);
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

function buildEmailHtml(name, email, phone, company, message) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeCompany = escapeHtml(company);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171717;max-width:640px;margin:0 auto;">
      <div style="background:#111;color:#fff;padding:24px 28px;">
        <p style="margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#bdbdbd;">DesignedbyTD Studio</p>
        <h1 style="margin:8px 0 0;font-size:26px;">New website request</h1>
      </div>
      <div style="border:1px solid #e5e5e5;border-top:0;padding:28px;">
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>
        <p><strong>Business:</strong> ${safeCompany}</p>
        <p style="margin-top:24px;"><strong>Project details:</strong></p>
        <div style="background:#f7f7f7;border:1px solid #ececec;padding:18px;">${safeMessage}</div>
        <p style="margin-top:24px;color:#737373;font-size:13px;">Reply to this email to contact ${safeName}. The lead is saved in Google Sheets.</p>
      </div>
    </div>
  `;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
