# Google Sheets Contact Form Setup

The website contact form now sends submissions to a Google Apps Script web app. The script saves each lead in a Google Sheet and emails a notification to `designedbytd.studio@gmail.com`.

## 1. Create the Google Sheet

1. Create a new Google Sheet named `DesignedbyTD Website Leads`.
2. Copy the spreadsheet ID from the URL. It is the long value between `/d/` and `/edit`.
3. In the Sheet, choose **Extensions → Apps Script**.

## 2. Add the Apps Script

1. Open `google-apps-script/contact-form.gs` from this repository.
2. Copy the entire file into the Apps Script editor, replacing the sample code.
3. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with the spreadsheet ID.
4. Create a long private secret, for example a random mix of letters and numbers with at least 32 characters.
5. Replace `PASTE_THE_SAME_SECRET_USED_IN_VERCEL` with that secret.
6. Save the script.
7. Select the `setupSheet` function and click **Run** once.
8. Approve the Google permissions. This creates the `Website Leads` tab and its header row.

## 3. Deploy the Script as a Web App

1. In Apps Script, choose **Deploy → New deployment**.
2. Select **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone**.
5. Click **Deploy** and approve permissions if asked.
6. Copy the Web App URL ending in `/exec`.

## 4. Add Vercel Environment Variables

In the Vercel project, go to **Settings → Environment Variables** and add:

- `GOOGLE_SHEETS_WEBHOOK_URL` = the Apps Script Web App URL ending in `/exec`
- `CONTACT_WEBHOOK_SECRET` = the exact same secret used in the Apps Script file

Enable both variables for **Production** and **Preview**.

The old `RESEND_API_KEY` is no longer required and can be deleted.

## 5. Redeploy and Test

1. Redeploy the newest Vercel deployment.
2. Submit a test message on the website contact form.
3. Confirm that a new row appears in the `Website Leads` sheet.
4. Confirm that `designedbytd.studio@gmail.com` receives a notification email.

## Updating the Script Later

After changing Apps Script code, choose **Deploy → Manage deployments → Edit**, select **New version**, and deploy again. The same `/exec` URL can remain in Vercel.
