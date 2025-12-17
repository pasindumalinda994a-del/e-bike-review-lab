import './globals.css';
import { Poppins } from 'next/font/google';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SmoothScroll from '@/components/SmoothScroll';
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
} from '@/lib/seo';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  // Optimize font loading for mobile
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
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
        url: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
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
    images: [`${SITE_URL}${DEFAULT_TWITTER_IMAGE}`],
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
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

// Viewport configuration for mobile optimization
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Wrap the app with header/footer, fonts, and analytics scripts.
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} flex min-h-screen flex-col bg-white text-[#0C1412]`} suppressHydrationWarning>
        <SmoothScroll>
          <SiteHeader />
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <GoogleAnalytics />
        </SmoothScroll>
      </body>
    </html>
  );
}

