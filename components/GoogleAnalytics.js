'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

/**
 * Internal component that uses useSearchParams
 * Must be wrapped in Suspense boundary
 */
function GoogleAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Track page views when route changes
  useEffect(() => {
    if (!gaMeasurementId) {
      return;
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', gaMeasurementId, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, gaMeasurementId]);

  return null;
}

/**
 * Google Analytics 4 (GA4) Component
 * 
 * This component handles:
 * - Loading the GA4 script
 * - Tracking page views
 * - Supporting custom event tracking
 * 
 * Usage:
 * Add <GoogleAnalytics /> to your root layout
 * 
 * Environment Variable Required:
 * NEXT_PUBLIC_GA_MEASUREMENT_ID - Your GA4 Measurement ID (e.g., G-XXXXXXXXXX)
 */
export default function GoogleAnalytics() {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Don't render if measurement ID is not provided
  if (!gaMeasurementId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Google Analytics] NEXT_PUBLIC_GA_MEASUREMENT_ID is not set. Analytics will not be loaded.');
    }
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
      {/* Track page views - wrapped in Suspense for useSearchParams */}
      <Suspense fallback={null}>
        <GoogleAnalyticsInner />
      </Suspense>
    </>
  );
}

/**
 * Helper function to track custom events
 * 
 * @param {string} eventName - Name of the event (e.g., 'button_click', 'newsletter_signup')
 * @param {Object} eventParams - Additional event parameters
 * 
 * Example usage:
 * trackEvent('newsletter_signup', { method: 'homepage_banner' });
 * trackEvent('button_click', { button_name: 'buy_now', location: 'article_header' });
 */
export function trackEvent(eventName, eventParams = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  } else if (process.env.NODE_ENV === 'development') {
    console.log('[GA Event]', eventName, eventParams);
  }
}

/**
 * Helper function to track conversions
 * 
 * @param {string} conversionLabel - Conversion label
 * @param {Object} conversionParams - Additional conversion parameters
 * 
 * Example usage:
 * trackConversion('newsletter_subscription', { value: 1.0, currency: 'USD' });
 */
export function trackConversion(conversionLabel, conversionParams = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionLabel,
      ...conversionParams,
    });
  } else if (process.env.NODE_ENV === 'development') {
    console.log('[GA Conversion]', conversionLabel, conversionParams);
  }
}

