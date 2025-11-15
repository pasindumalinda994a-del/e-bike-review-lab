import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
} from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// Default metadata shared across the entire application.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'electric bike reviews',
    'e-bike buying guide',
    'field tested e-bikes',
    'electric bike comparisons',
    'e-bike accessories',
    'ebike reviews',
  ],
  openGraph: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} default open graph image`,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_TWITTER_IMAGE],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

// Wrap the app with header/footer, fonts, and analytics scripts.
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex min-h-screen flex-col bg-[#FFFFFF] text-[#0C1412]">
        <SiteHeader />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-8xl px-8 md:px-12 lg:px-16">
            {children}
          </div>
        </main>
        <SiteFooter />
        <Script
          id="ga4-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script id="ga4-inline" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}

