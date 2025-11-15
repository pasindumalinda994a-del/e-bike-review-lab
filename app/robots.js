import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const DISALLOWED_PATHS = ['/private', '/drafts'];

/**
 * @returns {MetadataRoute.Robots}
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
