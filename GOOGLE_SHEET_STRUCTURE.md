# Google Sheet Structure Reference

## Quick Visual Guide

### Option 1: One Sheet with Two Tabs (Recommended)

```
┌─────────────────────────────────────────────────────────┐
│  Google Sheet: "EBikeReviewLab Submissions"            │
├─────────────────────────────────────────────────────────┤
│  Tab 1: "Newsletter" (or "Sheet1")                     │
│  ┌─────────────┬──────────────────────────┐            │
│  │ Timestamp   │ Email                    │            │
│  ├─────────────┼──────────────────────────┤            │
│  │ 2024-01-15  │ john@example.com         │            │
│  │ 2024-01-16  │ jane@example.com         │            │
│  └─────────────┴──────────────────────────┘            │
│                                                          │
│  Tab 2: "Contact Submissions"                           │
│  ┌─────────────┬──────┬──────────────┬───────────────┬──────────┬──────────┐
│  │ Timestamp   │ Name │ Email        │ Inquiry Type │ Subject  │ Message  │
│  ├─────────────┼──────┼──────────────┼───────────────┼──────────┼──────────┤
│  │ 2024-01-15  │ John │ john@ex.com  │ General      │ Question │ Hello... │
│  │ 2024-01-16  │ Jane │ jane@ex.com  │ Partnership  │ Request  │ Hi...    │
│  └─────────────┴──────┴──────────────┴───────────────┴──────────┴──────────┘
└─────────────────────────────────────────────────────────┘
```

### Option 2: Two Separate Sheets

```
Sheet 1: "Newsletter Subscriptions"
┌─────────────┬──────────────────────────┐
│ Timestamp   │ Email                    │
├─────────────┼──────────────────────────┤
│ 2024-01-15  │ john@example.com         │
│ 2024-01-16  │ jane@example.com         │
└─────────────┴──────────────────────────┘

Sheet 2: "Contact Form Submissions"
┌─────────────┬──────┬──────────────┬───────────────┬──────────┬──────────┐
│ Timestamp   │ Name │ Email        │ Inquiry Type │ Subject  │ Message  │
├─────────────┼──────┼──────────────┼───────────────┼──────────┼──────────┤
│ 2024-01-15  │ John │ john@ex.com  │ General      │ Question │ Hello... │
│ 2024-01-16  │ Jane │ jane@ex.com  │ Partnership  │ Request  │ Hi...    │
└─────────────┴──────┴──────────────┴───────────────┴──────────┴──────────┘
```

---

## Exact Headers to Use

### Newsletter Tab Headers (Row 1):
| Column A | Column B |
|----------|----------|
| `Timestamp` | `Email` |

### Contact Submissions Tab Headers (Row 1):
| Column A | Column B | Column C | Column D | Column E | Column F |
|----------|----------|----------|----------|----------|----------|
| `Timestamp` | `Name` | `Email` | `Inquiry Type` | `Subject` | `Message` |

---

## Step-by-Step: Creating the Sheet

### Method 1: One Sheet with Tabs (Easier)

1. **Create New Sheet:**
   - Go to [sheets.google.com](https://sheets.google.com)
   - Click "Blank" to create new spreadsheet
   - Name it: "EBikeReviewLab Submissions"

2. **Set Up Newsletter Tab:**
   - The first tab is already there (usually named "Sheet1")
   - Right-click on "Sheet1" tab → Rename to "Newsletter"
   - Click cell A1, type: `Timestamp`
   - Click cell B1, type: `Email`
   - Select both cells and make them **Bold** (Ctrl+B or Cmd+B)

3. **Set Up Contact Tab:**
   - Click the "+" button at bottom left to add new tab
   - Right-click the new tab → Rename to "Contact Submissions"
   - In Row 1, enter headers:
     - A1: `Timestamp`
     - B1: `Name`
     - C1: `Email`
     - D1: `Inquiry Type`
     - E1: `Subject`
     - F1: `Message`
   - Select Row 1 (click the "1" on the left) and make it **Bold**

4. **Format Headers (Optional but Recommended):**
   - Select Row 1 in both tabs
   - Make text Bold
   - Add background color (light gray works well)
   - Freeze Row 1 (View → Freeze → 1 row)

5. **Get Sheet ID:**
   - Look at the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
   - Copy the part between `/d/` and `/edit`
   - This is your `GOOGLE_SHEET_ID`

---

## Environment Variables for One Sheet Setup:

```env
# Use the same Sheet ID for both
GOOGLE_SHEET_ID=your_sheet_id_from_url

# Tab name for contact form (must match exactly!)
GOOGLE_CONTACT_SHEET_NAME=Contact Submissions

# Service account credentials
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

## Environment Variables for Two Sheets Setup:

```env
# Newsletter sheet
GOOGLE_SHEET_ID=newsletter_sheet_id

# Contact form sheet (different)
GOOGLE_CONTACT_SHEET_ID=contact_sheet_id

# Contact form tab name (usually "Sheet1" for new sheets)
GOOGLE_CONTACT_SHEET_NAME=Sheet1

# Service account credentials
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

## Important Notes:

1. ✅ **Headers must be in Row 1** - Data starts from Row 2
2. ✅ **Tab names are case-sensitive** - "Contact Submissions" ≠ "contact submissions"
3. ✅ **Column order matters** - Make sure headers match the order shown above
4. ✅ **Share with service account** - Don't forget to share the sheet with Editor permissions!

---

## Quick Checklist:

- [ ] Sheet created
- [ ] Newsletter tab has headers: `Timestamp`, `Email`
- [ ] Contact tab has headers: `Timestamp`, `Name`, `Email`, `Inquiry Type`, `Subject`, `Message`
- [ ] Headers are in Row 1
- [ ] Headers are bold (optional but recommended)
- [ ] Sheet ID copied from URL
- [ ] Sheet shared with service account email (Editor permissions)
- [ ] Environment variables set in `.env.local`

---

**That's it! Your sheet structure is ready! 🎉**

