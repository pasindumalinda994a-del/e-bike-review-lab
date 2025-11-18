# Easy Google Sheets Setup Guide
## Using Google Apps Script (No Google Cloud Console Needed!)

This is the **EASIEST** method - no complex setup, no credentials, no Google Cloud Console!

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it whatever you want (e.g., "EBikeReviewLab Submissions")

**That's it for the sheet setup!** The script will create the tabs and headers automatically.

---

### Step 2: Add Google Apps Script

1. In your Google Sheet, click **"Extensions"** (top menu)
2. Click **"Apps Script"**
3. A new tab will open with the Apps Script editor

---

### Step 3: Paste the Script

1. In the Apps Script editor, **delete all existing code** (if any)
2. Open the file `GOOGLE_APPS_SCRIPT_CODE.gs` from your project
3. **Copy the entire code** from that file
4. **Paste it** into the Apps Script editor
5. Click the **Save icon** (💾) or press `Ctrl+S` / `Cmd+S`

---

### Step 4: Deploy as Web App

1. Click **"Deploy"** button (top right)
2. Click **"New deployment"**
3. Click the **gear icon** ⚙️ next to "Select type"
4. Choose **"Web app"**
5. Fill in the settings:
   - **Description**: "Newsletter and Contact Form Handler" (or anything you want)
   - **Execute as**: **"Me"** (your Google account)
   - **Who has access**: **"Anyone"** (important!)
6. Click **"Deploy"**
7. **Authorize** when prompted:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" > "Go to [project name] (unsafe)"
   - Click "Allow"
8. **Copy the Web App URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

---

### Step 5: Set Environment Variable

1. In your project, open or create `.env.local` file
2. Add this line:
   ```env
   GOOGLE_WEB_APP_URL=https://script.google.com/macros/s/YOUR_URL_HERE/exec
   ```
3. Replace `YOUR_URL_HERE` with the URL you copied
4. Save the file
5. **Restart your Next.js server** (stop and start again)

---

## ✅ Done!

That's it! Your newsletter and contact form will now automatically save to Google Sheets!

---

## 📋 What Gets Saved

### Newsletter Tab:
- **Column A**: Timestamp
- **Column B**: Email

### Contact Submissions Tab:
- **Column A**: Timestamp
- **Column B**: Name
- **Column C**: Email
- **Column D**: Inquiry Type
- **Column E**: Subject
- **Column F**: Message

The script automatically creates these tabs and headers the first time data is submitted.

---

## 🔄 Updating the Script

If you need to update the script:

1. Go to your Google Sheet
2. **Extensions** > **Apps Script**
3. Make your changes
4. Click **Save**
5. Click **Deploy** > **Manage deployments**
6. Click the **pencil icon** (edit) next to your deployment
7. Click **"New version"**
8. Click **"Deploy"**

**Note:** The URL stays the same - no need to update environment variables!

---

## 🔒 Security Notes

- ✅ The Web App URL is public but requires the correct JSON format to work
- ✅ Only your website can submit data (if someone knows your URL, they could submit data)
- ✅ For extra security, you can add a simple token check in the script
- ✅ Your Google Sheet remains private - only you can see it

---

## 🧪 Testing

1. Go to your newsletter page and submit a test email
2. Check your Google Sheet - you should see a new row appear!
3. Go to your contact page and submit a test form
4. Check your Google Sheet - you should see another row in the Contact tab!

---

## ❓ Troubleshooting

### Data not appearing in sheet?
- Check that `GOOGLE_WEB_APP_URL` is set correctly in `.env.local`
- Make sure you restarted your Next.js server after adding the URL
- Check the browser console for any error messages
- Check the Apps Script execution logs: **Executions** tab in Apps Script editor

### "Script execution failed" error?
- Make sure you authorized the script when deploying
- Go to Apps Script > **Executions** to see error details
- Make sure the Web App is set to "Anyone" access

### Script not found error?
- Make sure you deployed it as a Web App (not just saved it)
- Double-check the URL is correct
- Try deploying again and copy a fresh URL

---

## 📝 Quick Checklist

- [ ] Google Sheet created
- [ ] Apps Script added (Extensions > Apps Script)
- [ ] Code pasted from `GOOGLE_APPS_SCRIPT_CODE.gs`
- [ ] Script saved
- [ ] Deployed as Web App (Deploy > New deployment > Web app)
- [ ] Set to "Anyone" access
- [ ] Authorized the script
- [ ] Web App URL copied
- [ ] `GOOGLE_WEB_APP_URL` added to `.env.local`
- [ ] Next.js server restarted
- [ ] Tested newsletter submission
- [ ] Tested contact form submission
- [ ] Data appears in Google Sheets ✅

---

## 🎉 That's It!

This method is **much simpler** than the Google Cloud Console method. No credentials, no JSON files, no complex setup - just paste a script and get a URL!

