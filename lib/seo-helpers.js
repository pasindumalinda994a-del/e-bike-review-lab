import {
  SITE_NAME,
  SITE_URL,
  SITE_TAGLINE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
} from './seo';

const TITLE_LIMIT = 58;
const META_LIMIT = 158;
const MONEY_TITLE_MODIFIER = 'Top Picks & Buying Guide';
const INFO_TITLE_MODIFIER = 'Expert Guide & Insights';

const ensureLeadingSlash = (value = '/') => {
  if (!value) return '/';
  return value.startsWith('/') ? value : `/${value}`;
};

const toTitleCase = (value = '') =>
  value
    .split(/[\s-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const humanizeSlug = (slug = '') =>
  slug
    .split('/')
    .filter(Boolean)
    .map((segment) =>
      segment
        .split('-')
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    )
    .join(' ');

const sanitizeCopy = (value) => (typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '');

const truncateCopy = (value, limit) => {
  const text = sanitizeCopy(value);
  if (!text) {
    return '';
  }
  if (text.length <= limit) {
    return text;
  }
  return `${text.slice(0, limit - 1).trimEnd()}…`;
};

const dedupeList = (items = []) => Array.from(new Set(items.filter(Boolean).map((item) => item.trim())));

const pluralizeKeyword = (keyword) => {
  if (!keyword) return [];
  const lower = keyword.toLowerCase();
  if (lower.endsWith('s')) {
    return [];
  }
  if (lower.endsWith('y')) {
    return [`${keyword.slice(0, -1)}ies`];
  }
  return [`${keyword}s`];
};

const resolveAbsoluteUrl = (path) => {
  if (!path) {
    return `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  }
  if (path.startsWith('http')) {
    return path;
  }
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

const ensureTitleLength = (title) => {
  if (!title) return '';
  return title.length <= TITLE_LIMIT ? title : truncateCopy(title, TITLE_LIMIT);
};

const ensureMetaDescription = (description) => {
  const text = sanitizeCopy(description) || DEFAULT_DESCRIPTION;
  return truncateCopy(text, META_LIMIT);
};

const deriveFocusKeyword = (post) => {
  if (!post) return '';
  return (
    sanitizeCopy(
      post.focusKeyword ??
        post.primaryKeyword ??
        post.h1 ??
        post.title ??
        humanizeSlug(post.slug ?? ''),
    ) || ''
  );
};

const resolveArticleImage = (post) =>
  post?.articleHeroImage ??
  post?.heroImage ??
  post?.products?.find((product) => product?.imageUrl)?.imageUrl ??
  DEFAULT_OG_IMAGE;

const buildKeywordVariants = (focusKeyword, categoryName) =>
  dedupeList([
    focusKeyword,
    ...pluralizeKeyword(focusKeyword),
    `${focusKeyword} reviews`,
    `${focusKeyword} guide`,
    categoryName ? `${categoryName} reviews` : null,
  ]);

export function buildArticleSeo(post) {
  if (!post) {
    return null;
  }

  const focusKeyword = deriveFocusKeyword(post);
  const categoryName = post.category ?? humanizeSlug(post.categorySlug ?? '');
  const postYear =
    post.year ??
    (post.publishedAt ? new Date(post.publishedAt).getFullYear() : undefined) ??
    undefined;

  const baseTitle = sanitizeCopy(post.seoTitle) || [focusKeyword, postYear].filter(Boolean).join(' ').trim();
  const modifier =
    post.titleModifier ??
    (post.contentType === 'information' ? INFO_TITLE_MODIFIER : MONEY_TITLE_MODIFIER);

  const shouldAppendModifier = modifier && !baseTitle.toLowerCase().includes(modifier.toLowerCase());
  const composedTitle = ensureTitleLength(
    shouldAppendModifier ? `${baseTitle} – ${modifier}` : baseTitle,
  );

  const headingBase = sanitizeCopy(post.h1) || sanitizeCopy(post.title) || focusKeyword;
  let resolvedH1 = headingBase || focusKeyword;
  if (resolvedH1 === composedTitle) {
    const qualifier = post.contentType === 'information' ? 'Explained' : 'Reviewed';
    resolvedH1 = `${focusKeyword}${postYear ? ` ${postYear}` : ''} ${qualifier}`;
  }

  const metaDescription = ensureMetaDescription(
    post.metaDescription ??
      post.introduction ??
      post.introductionParagraphs?.[0] ??
      post.secondaryIntroduction?.[0] ??
      DEFAULT_DESCRIPTION,
  );

  const canonicalPath = ensureLeadingSlash(`${post.categorySlug}/${post.slug}`.replace(/\/+/g, '/'));
  const heroImage = resolveArticleImage(post);
  const keywordVariants = buildKeywordVariants(focusKeyword, categoryName);

  return {
    focusKeyword,
    keywordVariants,
    seoTitle: composedTitle,
    h1: resolvedH1,
    metaDescription,
    canonicalPath,
    heroImage,
    twitterImage: heroImage ?? DEFAULT_TWITTER_IMAGE,
    publishedTime: post.publishedAt ?? null,
    updatedTime: post.updatedAt ?? post.publishedAt ?? null,
    readingTime: post.estimatedReadingTime ?? null,
  };
}

export function buildArticleMetadata(post) {
  const seo = buildArticleSeo(post);
  if (!seo) {
    return null;
  }

  const absoluteUrl = `${SITE_URL}${seo.canonicalPath}`;
  const imageUrl = resolveAbsoluteUrl(seo.heroImage);

  return {
    title: seo.seoTitle,
    description: seo.metaDescription,
    keywords: seo.keywordVariants,
    alternates: {
      canonical: seo.canonicalPath,
    },
    openGraph: {
      title: `${seo.seoTitle} | ${SITE_NAME}`,
      description: seo.metaDescription,
      url: absoluteUrl,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: seo.publishedTime ?? undefined,
      modifiedTime: seo.updatedTime ?? undefined,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: seo.seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${seo.seoTitle} | ${SITE_NAME}`,
      description: seo.metaDescription,
      images: [imageUrl ?? resolveAbsoluteUrl(DEFAULT_TWITTER_IMAGE)],
    },
  };
}

export function buildArticleSchemas(post, { seo: providedSeo } = {}) {
  const seo = providedSeo ?? buildArticleSeo(post);
  if (!seo) {
    return null;
  }

  const absoluteUrl = `${SITE_URL}${seo.canonicalPath}`;
  const categoryName = post.category ?? humanizeSlug(post.categorySlug ?? '');
  const imageUrl = resolveAbsoluteUrl(seo.heroImage);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl,
    },
    headline: seo.h1,
    description: seo.metaDescription,
    image: [imageUrl],
    author: {
      '@type': 'Person',
      name: post.authorName ?? SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: resolveAbsoluteUrl(DEFAULT_OG_IMAGE),
      },
    },
    datePublished: seo.publishedTime ?? undefined,
    dateModified: seo.updatedTime ?? undefined,
    articleSection: categoryName,
    keywords: seo.keywordVariants?.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: SITE_NAME,
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName,
        item: `${SITE_URL}/${post.categorySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: seo.h1,
        item: absoluteUrl,
      },
    ],
  };

  return [articleSchema, breadcrumbSchema];
}

export function buildCategorySeo({ categorySlug, categoryMeta, posts }) {
  if (!categorySlug) return null;
  const categoryName =
    categoryMeta?.name ?? posts?.[0]?.category ?? humanizeSlug(categorySlug);
  const focusKeyword = `${categoryName} Electric Bikes`;
  const currentYear = new Date().getFullYear();

  const seoTitle = ensureTitleLength(`${focusKeyword} ${currentYear} – Buyer's Guide`);
  const metaDescription = ensureMetaDescription(
    categoryMeta?.description ?? posts?.[0]?.metaDescription ?? DEFAULT_DESCRIPTION,
  );
  const canonicalPath = ensureLeadingSlash(categorySlug);
  const heroImage =
    categoryMeta?.heroImage ??
    posts?.[0]?.heroImage ??
    posts?.[0]?.products?.[0]?.imageUrl ??
    DEFAULT_OG_IMAGE;

  return {
    categoryName,
    focusKeyword,
    seoTitle,
    metaDescription,
    canonicalPath,
    heroHeading: `${categoryName} Electric Bike Guides`,
    heroImage,
    keywordVariants: buildKeywordVariants(focusKeyword, categoryName),
  };
}

export function buildCategoryMetadata({ categorySlug, categoryMeta, posts }) {
  const seo = buildCategorySeo({ categorySlug, categoryMeta, posts });
  if (!seo) return null;

  const absoluteUrl = `${SITE_URL}${seo.canonicalPath}`;
  const imageUrl = resolveAbsoluteUrl(seo.heroImage);

  return {
    title: seo.seoTitle,
    description: seo.metaDescription,
    keywords: seo.keywordVariants,
    alternates: {
      canonical: seo.canonicalPath,
    },
    openGraph: {
      title: `${seo.seoTitle} | ${SITE_NAME}`,
      description: seo.metaDescription,
      url: absoluteUrl,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: seo.seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${seo.seoTitle} | ${SITE_NAME}`,
      description: seo.metaDescription,
      images: [imageUrl ?? resolveAbsoluteUrl(DEFAULT_TWITTER_IMAGE)],
    },
  };
}

export function buildCategorySchemas({ categorySlug, categoryMeta, posts }, { seo: providedSeo } = {}) {
  const seo = providedSeo ?? buildCategorySeo({ categorySlug, categoryMeta, posts });
  if (!seo) return null;

  const absoluteUrl = `${SITE_URL}${seo.canonicalPath}`;
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: seo.heroHeading,
    description: seo.metaDescription,
    url: absoluteUrl,
    about: seo.focusKeyword,
    mainEntity: posts?.slice(0, 12).map((post) => ({
      '@type': 'Article',
      headline: post.seoTitle ?? post.h1 ?? post.title,
      url: `${SITE_URL}/${post.categorySlug}/${post.slug}`,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: SITE_NAME,
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: seo.categoryName,
        item: absoluteUrl,
      },
    ],
  };

  return [collectionSchema, breadcrumbSchema];
}

export function buildHomeSeo() {
  const currentYear = new Date().getFullYear();
  const focusKeyword = `Best Electric Bike Reviews`;
  const heroHeading = `${focusKeyword} & Buying Guides ${currentYear}`;
  const metaDescription = ensureMetaDescription(
    'EBikeReviewLab delivers independent electric bike reviews, comparison data, and buyer guides so you can choose the perfect e-bike for commuting, cargo, or trail riding.',
  );

  const keywords = dedupeList([
    focusKeyword,
    'electric bike buying guide',
    'top e-bike picks',
    'best e-bikes',
  ]);

  const metadata = {
    title: ensureTitleLength(`${focusKeyword} ${currentYear}`),
    description: metaDescription,
    keywords,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: `${focusKeyword} ${currentYear} | ${SITE_NAME}`,
      description: metaDescription,
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: resolveAbsoluteUrl(DEFAULT_OG_IMAGE),
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} hero image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${focusKeyword} ${currentYear} | ${SITE_NAME}`,
      description: metaDescription,
      images: [resolveAbsoluteUrl(DEFAULT_TWITTER_IMAGE)],
    },
  };

  return {
    heroHeading,
    heroSubheading: SITE_TAGLINE,
    keywords,
    metadata,
  };
}

