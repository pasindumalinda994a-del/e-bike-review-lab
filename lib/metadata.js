import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
} from './seo';

const OG_IMAGE_DIMENSIONS = {
  width: 1200,
  height: 630,
};

/**
 * Helper to build consistent Metadata objects for static pages.
 * @param {Object} options
 * @param {string} options.title
 * @param {string} [options.description]
 * @param {string} [options.path='/']
 * @param {string} [options.image]
 * @param {string} [options.type='website']
 * @param {Record<string, any>} [options.robots]
 */
export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  robots,
}) {
  const resolvedImage = image ?? DEFAULT_OG_IMAGE;
  const canonicalPath = path.startsWith('http')
    ? path
    : path.startsWith('/')
      ? path
      : `/${path}`;
  const absoluteUrl = canonicalPath.startsWith('http')
    ? canonicalPath
    : `${SITE_URL}${canonicalPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: resolvedImage,
          width: OG_IMAGE_DIMENSIONS.width,
          height: OG_IMAGE_DIMENSIONS.height,
          alt: `${title} open graph image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [resolvedImage ?? DEFAULT_TWITTER_IMAGE],
    },
    robots,
  };
}

/**
 * Default WebSite schema for the root page.
 */
export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Organization schema shared across About/Contact style pages.
 * @param {Object} options
 * @param {string} [options.logoPath]
 */
export function buildOrganizationSchema({ logoPath = DEFAULT_OG_IMAGE } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${logoPath}`,
    sameAs: [
      'https://www.facebook.com/',
      'https://www.instagram.com/',
      'https://www.youtube.com/',
    ],
  };
}

/**
 * ContactPage schema for the contact route.
 * @param {Object} options
 * @param {string} options.email
 */
export function buildContactPageSchema({ email }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          email,
          contactType: 'customer support',
          availableLanguage: ['English'],
        },
      ],
    },
  };
}

export function buildPolicySchema({ path, name, type }) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    url: `${SITE_URL}${path}`,
    name,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

