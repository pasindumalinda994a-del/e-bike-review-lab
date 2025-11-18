# AvantLink Verification Guide

## Current Implementation

The AvantLink verification script has been added to your homepage (`app/page.js`) using a component that injects it as raw HTML.

**Location**: `components/AvantLinkScript.js`  
**Used in**: `app/page.js`

## Verification Steps

### Step 1: Deploy to Production
1. Commit and push your changes
2. Deploy to your hosting platform (Vercel, Netlify, etc.)
3. **Important**: Do NOT test on localhost - verification only works on production

### Step 2: Clear Cache
- If using Vercel: Go to your deployment → Settings → Clear Cache
- If using Netlify: Go to Deploys → Trigger deploy → Clear cache and deploy site
- If using Cloudflare: Go to Caching → Purge Everything

### Step 3: Verify Script is in Page Source
1. Visit your live site: https://www.ebikereviewlab.com/
2. Right-click anywhere on the page → **"View Page Source"** (or press `Ctrl+U` / `Cmd+U`)
3. Press `Ctrl+F` (or `Cmd+F`) to search
4. Search for: `2bc0b499` (part of your auth code)
5. **You should see**:
   ```html
   <script type="text/javascript" src="https://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=2bc0b4990742f0b5b37770c9932999e8e29dec03"></script>
   ```

### Step 4: Verify with AvantLink
1. Visit: https://classic.avantlink.com/affiliate_app_confirm.php?mode=verify-js&application_id=1526285
2. Click "Try to confirm your application again"
3. If successful, you'll see a confirmation message

## If Verification Still Fails

### Option 1: Contact AvantLink Support (Recommended)
Since Next.js App Router can be tricky with verification scripts, contact AvantLink support:

**Email**: affiliateapps@avantlink.com

**Include**:
- Application ID: `1526285`
- Website URL: `https://www.ebikereviewlab.com`
- Email you applied with
- Screenshot showing where you placed the JavaScript (screenshot of your code)

### Option 2: HTML File Upload Method (Easier for Next.js)
AvantLink also supports uploading a verification file. This is often easier for Next.js sites:

1. Create a file named: `avantlink_verification.txt`
2. Add this content:
   ```
   2bc0b4990742f0b5b37770c9932999e8e29dec03
   ```
3. Upload this file to your `public` folder in Next.js
4. The file will be accessible at: `https://www.ebikereviewlab.com/avantlink_verification.txt`
5. Contact AvantLink support and mention you're using the file upload method

### Option 3: Add to Public Folder (Alternative)
If the script method doesn't work, you can also:

1. Create `public/avantlink_verification.txt`
2. Add the auth code: `2bc0b4990742f0b5b37770c9932999e8e29dec03`
3. Contact AvantLink to verify via file upload

## Troubleshooting

### Script Not in Page Source?
- Make sure you've deployed to production (not localhost)
- Clear your browser cache and CDN cache
- Check that the component is imported and used in `app/page.js`
- Verify the build completed successfully

### Mixed Content Warning?
- The script uses HTTPS, so this shouldn't be an issue
- If you see warnings, check browser console for details

### Still Not Working?
1. Take a screenshot of your page source showing the script
2. Take a screenshot of your code showing where the script is placed
3. Contact AvantLink support with the information above

## After Successful Verification

Once AvantLink confirms your application:
1. Remove the `<AvantLinkScript />` component from `app/page.js`
2. Delete the `components/AvantLinkScript.js` file
3. The verification script is only needed once for approval

---

**Application Details**:
- Application ID: `1526285`
- Website: `https://www.ebikereviewlab.com`
- Verification URL: https://classic.avantlink.com/affiliate_app_confirm.php?mode=verify-js&application_id=1526285

