import Script from 'next/script';

const ADSENSE_CLIENT_ID = 'ca-pub-7694034398037540';

export default function GoogleAdSense() {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
