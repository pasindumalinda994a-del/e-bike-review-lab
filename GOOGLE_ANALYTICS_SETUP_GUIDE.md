# Google Analytics Setup Guide

This guide will walk you through setting up Google Analytics 4 (GA4) for your e-bike review website.

## Prerequisites

- A Google account
- Access to Google Analytics (free to use)

## Step 1: Create a Google Analytics Account

1. **Go to Google Analytics**
   - Visit [https://analytics.google.com/](https://analytics.google.com/)
   - Sign in with your Google account

2. **Create an Account**
   - Click "Start measuring" or "Admin" → "Create Account"
   - Enter an account name (e.g., "E-Bike Review Lab")
   - Configure account settings:
     - Account name: Your choice
     - Data sharing settings: Choose based on your preferences
   - Click "Next"

3. **Create a Property**
   - Property name: "E-Bike Review Lab Website" (or your site name)
   - Reporting time zone: Select your timezone
   - Currency: Select your currency (e.g., USD)
   - Click "Next"

4. **Configure Business Information**
   - Industry category: Select "Technology" or "Retail/E-commerce"
   - Business size: Select appropriate size
   - How you intend to use Google Analytics: Select relevant options
   - Click "Create"

5. **Accept Terms of Service**
   - Read and accept the Google Analytics Terms of Service
   - Click "I Accept"

## Step 2: Get Your Measurement ID

1. **Find Your Measurement ID**
   - After creating the property, you'll see a "Data Streams" section
   - Click "Add stream" → "Web"
   - Enter your website URL (e.g., `https://yourdomain.com`)
   - Stream name: "E-Bike Review Lab Website" (or your choice)
   - Click "Create stream"

2. **Copy Your Measurement ID**
   - You'll see a "Measurement ID" (format: `G-XXXXXXXXXX`)
   - **Copy this ID** - you'll need it in the next step
   - Example: `G-ABC123XYZ`

## Step 3: Configure Environment Variables

1. **Create Environment File**
   - In your project root, create a file named `.env.local`
   - This file is already in `.gitignore` (so it won't be committed to git)

2. **Add Your Measurement ID**
   - Open `.env.local` and add:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   - Replace `G-XXXXXXXXXX` with your actual Measurement ID from Step 2

3. **Example `.env.local` file:**
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123XYZ
   ```

## Step 4: Verify the Setup

1. **Restart Your Development Server**
   - Stop your current dev server (Ctrl+C)
   - Run `npm run dev` again
   - The environment variable will be loaded

2. **Check the Browser Console**
   - Open your website in the browser
   - Open Developer Tools (F12)
   - Go to the Console tab
   - You should NOT see the warning: `[Google Analytics] NEXT_PUBLIC_GA_MEASUREMENT_ID is not set`
   - If you see this warning, check that your `.env.local` file is correct

3. **Verify in Google Analytics**
   - Go back to Google Analytics
   - Navigate to "Reports" → "Realtime"
   - Visit your website in another browser tab
   - You should see your visit appear in the Realtime report within a few seconds

## Step 5: Test Page View Tracking

1. **Navigate Your Site**
   - Visit different pages on your website
   - Each page view should be tracked automatically

2. **Check Realtime Reports**
   - In Google Analytics, go to "Reports" → "Realtime"
   - You should see:
     - Active users
     - Page views
     - Top pages being viewed

## How It Works

The Google Analytics component (`components/GoogleAnalytics.js`) is already integrated into your site:

- ✅ **Automatic Page View Tracking**: Tracks every page navigation
- ✅ **Next.js Optimized**: Uses Next.js Script component for optimal loading
- ✅ **Client-Side Only**: Only loads in the browser (not during SSR)
- ✅ **Helper Functions**: Includes `trackEvent()` and `trackConversion()` for custom tracking

## Custom Event Tracking

You can track custom events anywhere in your code:

```javascript
import { trackEvent } from '@/components/GoogleAnalytics';

// Example: Track button clicks
function handleButtonClick() {
  trackEvent('button_click', {
    button_name: 'buy_now',
    location: 'article_header'
  });
}

// Example: Track newsletter signups
function handleNewsletterSignup() {
  trackEvent('newsletter_signup', {
    method: 'homepage_banner'
  });
}
```

## Common Events to Track

Consider tracking these events for better insights:

- **Newsletter Signups**: `trackEvent('newsletter_signup', { method: 'homepage' })`
- **Button Clicks**: `trackEvent('button_click', { button_name: 'buy_now' })`
- **Article Reads**: `trackEvent('article_read', { article_title: '...' })`
- **Category Views**: `trackEvent('category_view', { category: 'electric-bikes' })`
- **External Link Clicks**: `trackEvent('external_link_click', { url: '...' })`

## Production Deployment

When deploying to production:

1. **Add Environment Variable to Your Hosting Platform**
   - **Vercel**: Go to Project Settings → Environment Variables
   - **Netlify**: Go to Site Settings → Environment Variables
   - **Other platforms**: Check their documentation for environment variable setup

2. **Set the Variable**
   - Variable name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Variable value: Your Measurement ID (e.g., `G-ABC123XYZ`)

3. **Redeploy**
   - After adding the environment variable, redeploy your site
   - Google Analytics will start tracking production traffic

## Troubleshooting

### Issue: Analytics not working in development
- **Solution**: Make sure `.env.local` exists in the project root (not in a subfolder)
- **Solution**: Restart your dev server after creating/modifying `.env.local`

### Issue: Warning message in console
- **Solution**: Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
- **Solution**: Ensure the variable name starts with `NEXT_PUBLIC_` (required for client-side access)

### Issue: No data in Google Analytics
- **Solution**: Wait 24-48 hours for standard reports (Realtime reports work immediately)
- **Solution**: Check that you're using the correct Measurement ID
- **Solution**: Verify your website is accessible and the GA script is loading (check Network tab in DevTools)

### Issue: Data appearing in Realtime but not in standard reports
- **Solution**: This is normal - standard reports have a 24-48 hour delay
- **Solution**: Realtime reports show data immediately

## Additional Resources

- [Google Analytics Help Center](https://support.google.com/analytics)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## Privacy Considerations

Make sure to:
- Update your Privacy Policy to mention Google Analytics
- Consider adding a cookie consent banner if required by your jurisdiction
- Review Google Analytics data retention settings in Admin → Data Settings

---

**Your Google Analytics setup is complete once you:**
1. ✅ Created a GA4 property
2. ✅ Got your Measurement ID
3. ✅ Added it to `.env.local` as `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. ✅ Restarted your dev server
5. ✅ Verified it's working in Realtime reports

