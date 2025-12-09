# Google Analytics Quick Start

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Your Measurement ID
1. Go to [analytics.google.com](https://analytics.google.com/)
2. Create account → Create property → Add web stream
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### Step 2: Add to Environment Variables
Create `.env.local` in your project root:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
*(Replace with your actual ID)*

### Step 3: Restart Dev Server
```bash
npm run dev
```

### Step 4: Verify
- Open your site in browser
- Check Google Analytics → Reports → Realtime
- You should see your visit appear!

## ✅ What's Already Set Up

- ✅ Google Analytics component integrated in `app/layout.js`
- ✅ Automatic page view tracking
- ✅ Helper functions for custom events
- ✅ TypeScript definitions in `lib/gtag.d.ts`

## 📊 Track Custom Events

```javascript
import { trackEvent } from '@/components/GoogleAnalytics';

// Track button clicks
trackEvent('button_click', { button_name: 'buy_now' });

// Track newsletter signups
trackEvent('newsletter_signup', { method: 'homepage' });
```

## 🔧 Production Deployment

Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to your hosting platform's environment variables:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables

## 📖 Full Guide

See `GOOGLE_ANALYTICS_SETUP_GUIDE.md` for detailed instructions.

