'use client';

import Script from 'next/script';

/**
 * AvantLink Affiliate Verification Script
 * 
 * This component loads the verification script using Next.js Script component
 * with beforeInteractive strategy to ensure it's in the HTML source.
 * 
 * Can be removed after successful verification.
 * Verification URL: https://classic.avantlink.com/affiliate_app_confirm.php?mode=verify-js&application_id=1526285
 */

export default function AvantLinkVerification() {
  return (
    <Script
      id="avantlink-verification"
      src="http://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=2bc0b4990742f0b5b37770c9932999e8e29dec03"
      strategy="beforeInteractive"
    />
  );
}

