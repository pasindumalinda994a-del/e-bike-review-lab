# Complete Google Sheets Setup Guide
## For Newsletter & Contact Form Submissions

This guide will walk you through setting up Google Sheets to automatically save newsletter subscriptions and contact form submissions.

---

## 📋 Table of Contents
1. [Create Google Cloud Project](#step-1-create-google-cloud-project)
2. [Enable Google Sheets API](#step-2-enable-google-sheets-api)
3. [Create Service Account](#step-3-create-service-account)
4. [Create JSON Key](#step-4-create-json-key)
5. [Create Google Sheet](#step-5-create-google-sheet)
6. [Share Sheet with Service Account](#step-6-share-sheet-with-service-account)
7. [Set Environment Variables](#step-7-set-environment-variables)
8. [Test the Integration](#step-8-test-the-integration)
9. [Troubleshooting](#troubleshooting)

---

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click on the project dropdown at the top (next to "Google Cloud")
4. Click **"New Project"**
5. Enter a project name (e.g., "EBikeReviewLab")
6. Click **"Create"**
7. Wait for the project to be created, then select it from the dropdown

---

## Step 2: Enable Google Sheets API

1. In Google Cloud Console, go to **"APIs & Services"** > **"Library"** (left sidebar)
2. In the search bar, type: **"Google Sheets API"**
3. Click on **"Google Sheets API"** from the results
4. Click the **"Enable"** button
5. Wait for it to enable (you'll see a checkmark when done)

---

## Step 3: Create Service Account

1. In Google Cloud Console, go to **"APIs & Services"** > **"Credentials"** (left sidebar)
2. Click **"Create Credentials"** (top of the page)
3. Select **"Service Account"** from the dropdown
4. Fill in the details:
   - **Service account name**: `ebike-sheets-service` (or any name you prefer)
   - **Service account ID**: Will auto-fill (you can change it if needed)
   - **Description**: `Service account for saving newsletter and contact form submissions to Google Sheets`
5. Click **"Create and Continue"**
6. **Skip** the optional steps (Grant this service account access to project, Grant users access)
7. Click **"Done"**

---

## Step 4: Create JSON Key

1. In the **"Credentials"** page, find your service account in the list
2. Click on the service account name (the one you just created)
3. Go to the **"Keys"** tab
4. Click **"Add Key"** > **"Create new key"**
5. Select **"JSON"** as the key type
6. Click **"Create"**
7. A JSON file will automatically download - **SAVE THIS FILE SECURELY!**
   - ⚠️ **IMPORTANT**: This file contains sensitive credentials. Never share it publicly or commit it to git.

### What's in the JSON file?
Open the downloaded JSON file. You'll see something like:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "ebike-sheets-service@your-project-id.iam.gserviceaccount.com",
  ...
}
```

**You'll need:**
- `client_email` - This is your service account email
- `private_key` - This is your private key (keep it secret!)

---

## Step 5: Create Google Sheet

### Option A: Use One Sheet with Multiple Tabs (Recommended)

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new blank spreadsheet
3. **Rename the first tab** to "Newsletter" (right-click on "Sheet1" > Rename)
4. In Row 1 of the "Newsletter" tab, add these headers:
   - **Column A**: `Timestamp`
   - **Column B**: `Email`
5. **Create a new tab** (click the "+" button at the bottom)
6. **Rename the new tab** to "Contact Submissions"
7. In Row 1 of the "Contact Submissions" tab, add these headers:
   - **Column A**: `Timestamp`
   - **Column B**: `Name`
   - **Column C**: `Email`
   - **Column D**: `Inquiry Type`
   - **Column E**: `Subject`
   - **Column F**: `Message`
8. **Copy the Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
   ```
   The Sheet ID is the long string between `/d/` and `/edit`

### Option B: Use Separate Sheets

1. **Create Sheet 1 for Newsletter:**
   - Create a new Google Sheet
   - Name it "Newsletter Subscriptions"
   - In Row 1, add headers: `Timestamp` (A), `Email` (B)
   - Copy the Sheet ID from URL

2. **Create Sheet 2 for Contact Form:**
   - Create another new Google Sheet
   - Name it "Contact Form Submissions"
   - In Row 1, add headers: `Timestamp` (A), `Name` (B), `Email` (C), `Inquiry Type` (D), `Subject` (E), `Message` (F)
   - Copy the Sheet ID from URL

---

## Step 6: Share Sheet with Service Account

1. Open your Google Sheet(s)
2. Click the **"Share"** button (top right corner)
3. In the "Add people and groups" field, paste the **service account email**
   - This is the `client_email` from your JSON file
   - Looks like: `ebike-sheets-service@your-project-id.iam.gserviceaccount.com`
4. **IMPORTANT**: Change the permission from "Viewer" to **"Editor"**
5. **Uncheck** "Notify people" (optional - prevents email notification)
6. Click **"Share"**
7. The service account email should now appear in the sharing list

**Repeat this step for both sheets if you're using separate sheets!**

---

## Step 7: Set Environment Variables

1. In your project root folder, create a file named `.env.local` (if it doesn't exist)
2. Open `.env.local` in a text editor
3. Add the following variables:

### If Using One Sheet with Multiple Tabs:
```env
# Google Sheet ID (from the URL)
GOOGLE_SHEET_ID=your_sheet_id_here

# Contact form tab name (optional - defaults to "Contact Submissions")
GOOGLE_CONTACT_SHEET_NAME=Contact Submissions

# Service Account Email (from JSON file - "client_email" field)
GOOGLE_SERVICE_ACCOUNT_EMAIL=ebike-sheets-service@your-project-id.iam.gserviceaccount.com

# Private Key (from JSON file - "private_key" field)
# IMPORTANT: Replace actual newlines with \n and wrap in quotes
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\nWith\nNewlines\nReplaced\nWith\n\\n\n-----END PRIVATE KEY-----\n"
```

### If Using Separate Sheets:
```env
# Newsletter Sheet ID
GOOGLE_SHEET_ID=newsletter_sheet_id_here

# Contact Form Sheet ID (different from newsletter)
GOOGLE_CONTACT_SHEET_ID=contact_sheet_id_here

# Contact form tab name (optional)
GOOGLE_CONTACT_SHEET_NAME=Sheet1

# Service Account Email
GOOGLE_SERVICE_ACCOUNT_EMAIL=ebike-sheets-service@your-project-id.iam.gserviceaccount.com

# Private Key
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
```

### How to Format the Private Key:

The `private_key` from the JSON file looks like this:
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
...many lines...
...more lines...
-----END PRIVATE KEY-----
```

You need to:
1. Copy the ENTIRE private key (including BEGIN and END lines)
2. Replace every actual line break with `\n`
3. Wrap the entire thing in double quotes

**Example:**
```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n...more lines...\n-----END PRIVATE KEY-----\n"
```

**Quick Method:**
1. Copy the `private_key` value from JSON (without quotes)
2. Use a text editor's "Find & Replace" feature:
   - Find: `\n` (actual newline)
   - Replace: `\\n` (backslash + n)
3. Wrap the result in double quotes

---

## Step 8: Test the Integration

1. **Restart your Next.js development server:**
   ```bash
   # Stop the server (Ctrl+C)
   # Then start it again
   npm run dev
   ```

2. **Test Newsletter Subscription:**
   - Go to your website's newsletter page or homepage
   - Enter a test email address
   - Click "Subscribe"
   - Check your Google Sheet "Newsletter" tab - you should see a new row with timestamp and email

3. **Test Contact Form:**
   - Go to your website's contact page
   - Fill out the form with test data
   - Click "Send Message"
   - Check your Google Sheet "Contact Submissions" tab - you should see a new row with all the form data

4. **Check Console Logs:**
   - Open your terminal/console where Next.js is running
   - Look for success messages like:
     ```
     [newsletter] new subscriber added to Google Sheets: test@example.com
     [contact] new submission added to Google Sheets: { email: 'test@example.com', ... }
     ```

---

## Troubleshooting

### ❌ "Credentials not configured" Error

**Problem:** Environment variables not set or incorrect

**Solution:**
1. Check that `.env.local` file exists in project root
2. Verify all environment variables are set correctly
3. Make sure there are no extra spaces or quotes around values
4. Restart your Next.js server after adding/changing `.env.local`

### ❌ "Permission denied" or 403 Error

**Problem:** Service account doesn't have access to the sheet

**Solution:**
1. Open your Google Sheet
2. Click "Share" button
3. Verify the service account email is in the list
4. Make sure it has "Editor" permissions (not "Viewer")
5. If not listed, add it again with "Editor" permissions

### ❌ "Sheet not found" Error

**Problem:** Incorrect Sheet ID

**Solution:**
1. Double-check the Sheet ID in the URL
2. The ID is between `/d/` and `/edit` in the URL
3. Make sure you copied the entire ID (it's a long string)
4. Verify `GOOGLE_SHEET_ID` in `.env.local` matches

### ❌ "Invalid private key" Error

**Problem:** Private key not formatted correctly

**Solution:**
1. Make sure you copied the ENTIRE private key (including BEGIN and END lines)
2. Verify all newlines are replaced with `\n` (backslash + n)
3. Make sure the entire value is wrapped in double quotes
4. Check that there are no extra spaces before/after quotes

### ❌ Data Not Appearing in Sheet

**Problem:** Various possible issues

**Solution:**
1. Check browser console for errors
2. Check Next.js server logs for error messages
3. Verify the sheet tab name matches (case-sensitive!)
4. Make sure headers are in Row 1
5. Try manually adding a test row to ensure sheet is writable

### ❌ "Tab not found" Error (Contact Form)

**Problem:** Tab name doesn't match

**Solution:**
1. Check the exact tab name in your Google Sheet
2. Make sure `GOOGLE_CONTACT_SHEET_NAME` matches exactly (case-sensitive)
3. Default name is "Contact Submissions" if not set
4. If using "Sheet1", set `GOOGLE_CONTACT_SHEET_NAME=Sheet1`

---

## 📝 Quick Reference

### Environment Variables Summary:

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_SHEET_ID` | Yes | Sheet ID for newsletter (and contact if using same sheet) |
| `GOOGLE_CONTACT_SHEET_ID` | No | Separate sheet ID for contact form (optional) |
| `GOOGLE_CONTACT_SHEET_NAME` | No | Tab name for contact form (defaults to "Contact Submissions") |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Yes | Service account email from JSON file |
| `GOOGLE_PRIVATE_KEY` | Yes | Private key from JSON file (with `\n` for newlines) |

### Google Sheet Structure:

**Newsletter Tab:**
- Row 1: Headers (`Timestamp`, `Email`)
- Data starts from Row 2

**Contact Submissions Tab:**
- Row 1: Headers (`Timestamp`, `Name`, `Email`, `Inquiry Type`, `Subject`, `Message`)
- Data starts from Row 2

---

## 🔒 Security Best Practices

1. ✅ **Never commit `.env.local` to git** (already in `.gitignore`)
2. ✅ **Never share your JSON key file publicly**
3. ✅ **Only grant "Editor" permissions** (not "Owner")
4. ✅ **Use separate service accounts** for production vs development
5. ✅ **Regularly rotate service account keys** (create new keys periodically)
6. ✅ **Limit sheet access** to only necessary service accounts

---

## ✅ Success Checklist

- [ ] Google Cloud Project created
- [ ] Google Sheets API enabled
- [ ] Service Account created
- [ ] JSON key downloaded and saved securely
- [ ] Google Sheet created with proper headers
- [ ] Sheet shared with service account (Editor permissions)
- [ ] `.env.local` file created with all variables
- [ ] Private key formatted correctly (with `\n`)
- [ ] Next.js server restarted
- [ ] Newsletter subscription tested successfully
- [ ] Contact form tested successfully
- [ ] Data appears in Google Sheets

---

## 🆘 Need Help?

If you're still having issues:

1. Check the Next.js server console for detailed error messages
2. Verify all steps were completed correctly
3. Double-check environment variable formatting
4. Ensure the service account has Editor access to the sheet
5. Try creating a fresh service account and sheet if issues persist

---

**That's it! Your newsletter and contact form are now connected to Google Sheets! 🎉**

