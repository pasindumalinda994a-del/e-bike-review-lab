/**
 * AvantLink Verification Script Component
 * 
 * This component renders the AvantLink verification script.
 * Using a native script tag to ensure it appears in the page source.
 * 
 * Can be removed after successful verification.
 * Verification URL: https://classic.avantlink.com/affiliate_app_confirm.php?mode=verify-js&application_id=1526285
 */

export default function AvantLinkScript() {
  // Using dangerouslySetInnerHTML to inject raw script tag
  // This ensures it appears in the HTML source for verification bots
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: '<script type="text/javascript" src="https://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=2bc0b4990742f0b5b37770c9932999e8e29dec03"></script>',
      }}
    />
  );
}

