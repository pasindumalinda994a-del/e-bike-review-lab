# Google Analytics 4 (GA4) Setup Guide

This guide will walk you through setting up Google Analytics 4 (GA4) for your e-bike review website.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Create a Google Analytics Account](#step-1-create-a-google-analytics-account)
3. [Step 2: Create a GA4 Property](#step-2-create-a-ga4-property)
4. [Step 3: Get Your Measurement ID](#step-3-get-your-measurement-id)
5. [Step 4: Configure Environment Variables](#step-4-configure-environment-variables)
6. [Step 5: Verify Installation](#step-5-verify-installation)
7. [Advanced Configuration](#advanced-configuration)
8. [Event Tracking Examples](#event-tracking-examples)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- A Google account
- Access to your website's codebase
- Ability to modify environment variables

---

## Step 1: Create a Google Analytics Account

1. **Go to Google Analytics**
   - Visit [https://analytics.google.com/](https://analytics.google.com/)
   - Sign in with your Google account

2. **Create an Account**
   - Click **"Start measuring"** or **"Admin"** (gear icon) → **"Create Account"**
   - Enter an **Account name** (e.g., "E-Bike Review Lab")
   - Configure account settings:
     - **Account Data Sharing Settings**: Choose your preferences
   - Click **"Next"**

---

## Step 2: Create a GA4 Property

1. **Set Up Property**
   - Enter a **Property name** (e.g., "E-Bike Review Lab Website")
   - Select your **Reporting time zone**
   - Choose your **Currency**
   - Click **"Next"**

2. **Business Information**
   - Select your **Industry category** (e.g., "Technology" or "Retail")
   - Choose your **Business size**
   - Select your **Business objectives** (e.g., "Generate leads", "Drive online sales")
   - Click **"Create"**

3. **Accept Terms**
   - Read and accept the Google Analytics Terms of Service
   - Click **"I Accept"**

---

## Step 3: Get Your Measurement ID

1. **Access Data Streams**
   - In your GA4 property, go to **Admin** (gear icon) → **Data Streams**
   - Click **"Add stream"** → **"Web"**

2. **Configure Web Stream**
   - Enter your **Website URL** (e.g., `https://yourdomain.com`)
   - Enter a **Stream name** (e.g., "Main Website")
   - Click **"Create stream"**

3. **Copy Your Measurement ID**
   - After creating the stream, you'll see your **Measurement ID**
   - It will look like: `G-XXXXXXXXXX` (where X's are alphanumeric characters)
   - **Copy this ID** - you'll need it in the next step

---

## Step 4: Configure Environment Variables

### For Local Development

1. **Create `.env.local` file** in your project root (if it doesn't exist):
   ```bash
   # Create the file
   touch .env.local
   ```

2. **Add your Measurement ID** to `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual Measurement ID.

3. **Restart your development server**:
   ```bash
   npm run dev
   ```

### For Production (Vercel, Netlify, etc.)

#### Vercel
1. Go to your project dashboard on [vercel.com](https://vercel.com)
2. Navigate to **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Add:
   - **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX` (your actual Measurement ID)
   - **Environment**: Select all (Production, Preview, Development)
5. Click **"Save"**
6. **Redeploy** your application

#### Netlify
1. Go to your site dashboard on [netlify.com](https://netlify.com)
2. Navigate to **Site settings** → **Environment variables**
3. Click **"Add a variable"**
4. Add:
   - **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX` (your actual Measurement ID)
   - **Scopes**: Select all (Production, Deploy previews, Branch deploys)
5. Click **"Save"**
6. **Redeploy** your site

#### Other Hosting Platforms
- Add the environment variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` with your Measurement ID value
- Ensure the variable is available in all environments (production, staging, development)
- Restart/redeploy your application after adding the variable

---

## Step 5: Verify Installation

### Method 1: Google Analytics Real-Time Reports

1. **Open Google Analytics**
   - Go to [https://analytics.google.com/](https://analytics.google.com/)
   - Select your property

2. **Check Real-Time Reports**
   - Navigate to **Reports** → **Realtime**
   - Visit your website in a new browser tab
   - You should see your visit appear in the Real-Time report within 10-30 seconds

### Method 2: Browser Developer Tools

1. **Open Browser DevTools**
   - Visit your website
   - Press `F12` or right-click → **"Inspect"**
   - Go to the **Network** tab

2. **Check for GA Requests**
   - Filter by `gtag` or `collect`
   - You should see requests to `www.googletagmanager.com`
   - Status should be `200 OK`

3. **Check Console**
   - Go to the **Console** tab
   - In development mode, you should see a warning if GA is not configured
   - In production, there should be no errors related to GA

### Method 3: Google Tag Assistant

1. **Install Google Tag Assistant** (Chrome Extension)
   - Install from [Chrome Web Store](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)

2. **Test Your Site**
   - Visit your website
   - Click the Tag Assistant icon
   - It should detect your GA4 tag and show it as active

---

## Advanced Configuration

### Custom Event Tracking

The Google Analytics component includes helper functions for tracking custom events:

```javascript
import { trackEvent } from '@/components/GoogleAnalytics';

// Track a button click
trackEvent('button_click', {
  button_name: 'buy_now',
  location: 'article_header',
  article_title: 'Best Electric Bikes 2024'
});

// Track newsletter signup
trackEvent('newsletter_signup', {
  method: 'homepage_banner',
  source: 'hero_section'
});

// Track article engagement
trackEvent('article_read', {
  article_title: 'Best Electric Bikes 2024',
  category: 'reviews',
  read_time: 120 // seconds
});
```

### Conversion Tracking

Track important conversions:

```javascript
import { trackConversion } from '@/components/GoogleAnalytics';

// Track newsletter subscription as conversion
trackConversion('newsletter_subscription', {
  value: 1.0,
  currency: 'USD'
});
```

### Example: Add Event Tracking to Newsletter Component

```javascript
'use client';

import { trackEvent } from '@/components/GoogleAnalytics';

export default function NewsletterForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... your newsletter logic ...
    
    // Track the event
    trackEvent('newsletter_signup', {
      method: 'homepage_form',
      source: 'footer'
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

---

## Event Tracking Examples

### Recommended Events to Track

1. **Newsletter Signups**
   ```javascript
   trackEvent('newsletter_signup', {
     method: 'homepage_banner',
     source: 'hero_section'
   });
   ```

2. **Article Views**
   ```javascript
   trackEvent('article_view', {
     article_title: post.title,
     category: post.category,
     content_type: post.contentType
   });
   ```

3. **External Link Clicks**
   ```javascript
   trackEvent('external_link_click', {
     link_url: affiliateUrl,
     link_text: 'Buy Now',
     article_title: post.title
   });
   ```

4. **Contact Form Submissions**
   ```javascript
   trackEvent('contact_form_submit', {
     form_type: 'contact',
     inquiry_type: formData.inquiryType
   });
   ```

5. **Video Plays**
   ```javascript
   trackEvent('video_play', {
     video_title: 'E-Bike Experience Video',
     video_location: 'homepage'
   });
   ```

---

## Troubleshooting

### GA Not Tracking

**Problem**: No data appearing in Google Analytics

**Solutions**:
1. ✅ Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
2. ✅ Check that the environment variable is available in production
3. ✅ Ensure you've redeployed after adding the environment variable
4. ✅ Check browser console for errors
5. ✅ Verify ad blockers aren't blocking GA (test in incognito mode)
6. ✅ Wait 24-48 hours for data to appear in standard reports (Real-Time should work immediately)

### Development Mode Warnings

**Problem**: Seeing warnings in console about missing Measurement ID

**Solution**: This is expected in development if you haven't set the environment variable. Add it to `.env.local` to remove the warning.

### Events Not Showing

**Problem**: Custom events not appearing in GA

**Solutions**:
1. ✅ Verify events are being triggered (check console logs in development)
2. ✅ Check Real-Time → Events in GA4
3. ✅ Wait up to 24 hours for events to appear in standard reports
4. ✅ Ensure event names follow GA4 naming conventions (lowercase, underscores)

### Multiple Page Views

**Problem**: Seeing duplicate page views

**Solution**: The component automatically tracks page views on route changes. If you're manually tracking page views elsewhere, remove the manual tracking.

---

## Privacy Considerations

### GDPR Compliance

If your website serves users in the EU, consider:

1. **Cookie Consent**: Implement a cookie consent banner
2. **IP Anonymization**: GA4 anonymizes IPs by default
3. **Privacy Policy**: Update your privacy policy to mention Google Analytics

### Disable Analytics in Development

The component automatically skips loading GA if the Measurement ID is not set, which is perfect for development.

---

## Additional Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Event Tracking Guide](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382)

---

## Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review Google Analytics [Help Center](https://support.google.com/analytics)
3. Check browser console for JavaScript errors
4. Verify your Measurement ID is correct

---

## Quick Reference

**Environment Variable**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`

**Format**: `G-XXXXXXXXXX`

**Component Location**: `components/GoogleAnalytics.js`

**Usage**: Already integrated in `app/layout.js`

**Helper Functions**:
- `trackEvent(eventName, eventParams)` - Track custom events
- `trackConversion(conversionLabel, conversionParams)` - Track conversions

---

**Setup Complete!** 🎉

Your Google Analytics is now configured and will start tracking visitors once you:
1. ✅ Set the `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable
2. ✅ Deploy your changes to production
3. ✅ Visit your website to generate your first tracking event

