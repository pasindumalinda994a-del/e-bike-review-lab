# ⚡ SUPER EASY Google Sheets Setup
## No Google Cloud Console Needed!

This is the **simplest method** to connect your newsletter and contact form to Google Sheets.

---

## 🎯 What You Need

- ✅ A Google account (that's it!)
- ✅ 5 minutes of your time

---

## 📝 Quick Setup (3 Steps)

### Step 1: Create Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a blank spreadsheet
3. Done! (Script will create tabs automatically)

### Step 2: Add Google Apps Script
1. In your Google Sheet: **Extensions** > **Apps Script**
2. Paste the code from `GOOGLE_APPS_SCRIPT_CODE.gs`
3. Click **Save** 💾

### Step 3: Deploy & Get URL
1. Click **Deploy** > **New deployment**
2. Click gear icon ⚙️ > **Web app**
3. Set **Who has access** to: **Anyone**
4. Click **Deploy**
5. **Copy the URL** (looks like: `https://script.google.com/macros/s/.../exec`)

### Step 4: Add URL to Environment
1. Open `.env.local` in your project
2. Add this line:
   ```env
   GOOGLE_WEB_APP_URL=your_copied_url_here
   ```
3. Restart your Next.js server

---

## ✅ Done!

That's it! Your forms will now save to Google Sheets automatically.

---

## 📖 Full Guide

For detailed step-by-step instructions, see: **[EASY_GOOGLE_SHEETS_SETUP.md](./EASY_GOOGLE_SHEETS_SETUP.md)**

---

## 🔍 What Gets Saved?

### Newsletter Tab:
- Timestamp | Email

### Contact Submissions Tab:
- Timestamp | Name | Email | Inquiry Type | Subject | Message

---

## 🆘 Need Help?

1. Check the Apps Script execution logs: **Executions** tab
2. Make sure Web App is set to "Anyone" access
3. Verify the URL is correct in `.env.local`
4. Restart your Next.js server after adding the URL

---

**This method is 10x easier than the Google Cloud method! No credentials, no JSON files, just paste and deploy! 🚀**

