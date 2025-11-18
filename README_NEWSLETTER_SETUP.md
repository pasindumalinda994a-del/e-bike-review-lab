# Newsletter & Contact Form Google Sheets Integration Setup

> **📖 For a complete step-by-step guide with screenshots and detailed instructions, see [GOOGLE_SHEETS_SETUP_GUIDE.md](./GOOGLE_SHEETS_SETUP_GUIDE.md)**

This is a quick reference guide. For detailed setup instructions, please refer to the complete guide above.

## Quick Setup Steps

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID

### 2. Enable Google Sheets API
1. In Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for **"Google Sheets API"**
3. Click on it and press **"Enable"**

### 3. Create Service Account
1. Go to **APIs & Services** > **Credentials**
2. Click **"Create Credentials"** > **"Service Account"**
3. Give it a name (e.g., "newsletter-service")
4. Click **"Create and Continue"**
5. Skip optional steps and click **"Done"**

### 4. Create JSON Key
1. Click on the service account you just created
2. Go to the **"Keys"** tab
3. Click **"Add Key"** > **"Create new key"**
4. Choose **"JSON"** format
5. Click **"Create"** - a JSON file will be downloaded
6. **Keep this file secure!** It contains credentials

### 5. Create Google Sheets

#### For Newsletter Subscriptions:
1. Create a new Google Sheet (or use the same one with different tabs)
2. In Row 1, add these headers:
   - Column A: `Timestamp`
   - Column B: `Email`
3. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

#### For Contact Form Submissions:
1. In the same Google Sheet (or create a new one), create a new tab named "Contact Submissions"
2. In Row 1, add these headers:
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`
   - Column D: `Inquiry Type`
   - Column E: `Subject`
   - Column F: `Message`
3. If using a different sheet, copy that Sheet ID as well

### 6. Share Google Sheet with Service Account
1. Open your Google Sheet
2. Click the **"Share"** button (top right)
3. Add the service account email (from the JSON file: `client_email` field)
   - Looks like: `newsletter-service@your-project-id.iam.gserviceaccount.com`
4. Give it **"Editor"** permissions
5. Uncheck **"Notify people"** (optional)
6. Click **"Share"**

### 7. Set Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist):

```env
# Newsletter Sheet ID (get from your Google Sheet URL)
GOOGLE_SHEET_ID=your_sheet_id_here

# Contact Form Sheet ID (optional - if different from newsletter sheet)
# If not set, will use GOOGLE_SHEET_ID
GOOGLE_CONTACT_SHEET_ID=your_contact_sheet_id_here

# Contact Form Sheet Tab Name (optional - defaults to "Contact Submissions")
GOOGLE_CONTACT_SHEET_NAME=Contact Submissions

# From the JSON key file - "client_email" field
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com

# From the JSON key file - "private_key" field
# IMPORTANT: Replace actual newlines with \n and wrap in quotes
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
```

**Note:** You can use the same Google Sheet for both newsletter and contact form by:
- Using the same `GOOGLE_SHEET_ID` for both
- Creating separate tabs: "Sheet1" for newsletter, "Contact Submissions" for contact form
- Or use different sheets by setting `GOOGLE_CONTACT_SHEET_ID`

**Important Notes:**
- The `GOOGLE_PRIVATE_KEY` should be the entire `private_key` field from the JSON file
- Replace actual line breaks with `\n`
- Keep the entire value wrapped in double quotes
- Never commit the `.env.local` file to git!

### 8. Test the Integration

1. Start your development server: `npm run dev`
2. Go to your newsletter page
3. Submit a test email
4. Check your Google Sheet - you should see the email appear!

## Troubleshooting

### "Credentials not configured" error
- Make sure all three environment variables are set in `.env.local`
- Restart your Next.js dev server after adding environment variables

### "Permission denied" error
- Make sure you shared the Google Sheet with the service account email
- The service account needs "Editor" permissions
- Double-check the email address is correct (from JSON key file)

### "Sheet not found" error
- Verify the `GOOGLE_SHEET_ID` is correct
- The Sheet ID is in the URL between `/d/` and `/edit`
- Make sure the sheet is accessible

### Email not appearing in Sheet
- Check the console logs for errors
- Verify the Sheet has headers in Row 1
- Make sure the range is correct (`Sheet1!A:B`)

## Security Best Practices

1. **Never commit** `.env.local` to version control
2. Add `.env.local` to `.gitignore`
3. Keep your service account JSON key file secure
4. Regularly rotate service account keys
5. Only grant necessary permissions (Editor on the specific sheet is sufficient)

## Alternative: Simple Webhook Method

If Google Sheets API setup is too complex, you can also use:
- Google Apps Script with a webhook endpoint
- Zapier/Integromat automation
- Make.com automation

These services can accept form submissions and automatically add rows to Google Sheets.
