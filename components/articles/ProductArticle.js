import Image from "next/image";
import Link from "next/link";
import {
  Battery,
  CircleDot,
  ClipboardList,
  Disc3,
  DollarSign,
  Gauge,
  Layers,
  Package,
  Ruler,
  Settings,
  Sparkles,
  Target,
  Weight,
  Zap,
} from "lucide-react";
import SidebarContent from "@/components/SidebarContent";
import AnimatedButton from "@/components/AnimatedButton";

/**
 * ProductArticle Component
 *
 * Full layout for individual product review articles optimized for SEO.
 * All content comes from product.js – no hardcoded product copy here.
 *
 * SEO HEADING HIERARCHY (Critical for ranking):
 * - H1: ONE only - main headline (line 85)
 * - H2: Main sections (Introduction, Specs, Design, Features, Performance, etc.)
 * - H3: Subsections under H2s (feature groups, image sections)
 * - H4: Sub-subsections (Pros/Cons labels within Pros & Cons section)
 *
 * Expected post shape is documented in content/posts/product.js.
 *
 * @param {Object} props
 * @param {Object} props.post - Product article data from product.js
 * @param {string} props.publishedDate - Formatted publication date
 */
export default function ProductArticle({ post, publishedDate }) {
  if (!post) return null;

  const headline = safeString(post.h1) ?? safeString(post.title);
  const heroImageAlt = safeString(post.heroImageAlt) ?? headline ?? "";
  const articleHeroImage =
    safeString(post.articleHeroImage) ??
    safeString(post.heroImage) ??
    "/default-og.png";

  const introduction = post.introduction ?? {};
  const specs = post.specs ?? {};
  const designAndBuild = post.designAndBuild ?? {};
  const features = post.features ?? {};
  const performance = post.performance ?? {};
  const userExperience = post.userExperience ?? {};
  const comparisons = post.comparisons ?? {};
  const whoItsBestFor = post.whoItsBestFor ?? null;
  const prosCons = post.prosCons ?? {};
  const conclusion = post.conclusion ?? {};
  const imagePrimary = post.imagePrimary ?? null;
  const imageSecondary = post.imageSecondary ?? null;
  const imageTertiary = post.imageTertiary ?? null;
  const imageQuaternary = post.imageQuaternary ?? null;
  const imageQuinary = post.imageQuinary ?? null;
  const affiliateLink = safeString(post.affiliateLink);
  const badge = safeString(post.badge);
  const ctaLabel = safeString(post.ctaLabel) ?? "Check Current Price";

  // Format date for display below hero image
  const dateObj = post.publishedAt ? new Date(post.publishedAt) : publishedDate ? new Date(publishedDate) : null;
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).toUpperCase()
    : publishedDate || '';

  return (
    <article className="mx-auto flex w-full max-w-[1440px] flex-col space-y-4 px-4 sm:px-6 md:px-12 lg:px-16">
      {/* Header - Clean, minimal, impactful */}
      <header className="pt-12 pb-2 sm:pt-16 sm:pb-4 lg:pt-20 lg:pb-4">
        <div className="space-y-6">
          {/* Text content wrapper - constrained width */}
          <div className="max-w-4xl">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-[#666666]">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-[#0C1412]"
                  >
                    Home
                  </Link>
                </li>
                {post.categorySlug && post.category && (
                  <>
                    <li className="text-[#999999]">/</li>
                    <li>
                      <Link
                        href={`/${post.categorySlug}`}
                        className="transition-colors hover:text-[#0C1412]"
                      >
                        {post.category}
                      </Link>
                    </li>
                  </>
                )}
                {headline && (
                  <>
                    <li className="text-[#999999]">/</li>
                    <li className="text-[#0C1412] font-medium" aria-current="page">
                      {headline}
                    </li>
                  </>
                )}
              </ol>
            </nav>


            {/* SEO: H1 - Only ONE per page, different from SEO title, includes keyword variation */}
            {headline && (
              <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.02em] text-[#0C1412] sm:text-3xl md:text-4xl lg:text-5xl text-left">
                {headline}
              </h1>
            )}

            {/* Meta Description - Below title */}
            {post.metaDescription && (
              <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left mt-4 sm:mt-5">
                {post.metaDescription}
              </p>
            )}
          </div>

          {/* Profile Image and Username - Above hero image */}
          <div className="flex items-center gap-3 mt-6 sm:mt-8">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
              <Image
                src="/EBRLLogo.png"
                alt="E-Bike Review Lab"
                fill
                sizes="48px"
                className="rounded-full object-cover"
                quality={75}
              />
            </div>
            <span className="text-sm sm:text-base font-medium text-[#0C1412]">
              @ebikereviewlab
            </span>
          </div>

          {/* Hero Image - Main image container below title - Full width */}
          {articleHeroImage && (
            <figure className="relative overflow-hidden rounded-2xl mt-6 sm:mt-8">
              <div className="aspect-[21/9] w-full">
                <Image
                  src={articleHeroImage}
                  alt={heroImageAlt}
                  fill
                  sizes="(min-width: 1024px) 1024px, (min-width: 768px) 90vw, 100vw"
                  className="object-cover"
                  priority
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k="
                />
              </div>
              {badge && (
                <div className="absolute left-0 top-0 z-10 rounded-br-xl bg-[#0C1412]/95 px-3 py-1.5 shadow-lg backdrop-blur-sm sm:px-4 sm:py-2">
                  <span className="text-xs font-semibold text-white sm:text-sm">{badge}</span>
                </div>
              )}
              {heroImageAlt && (
                <figcaption className="sr-only">{heroImageAlt}</figcaption>
              )}
            </figure>
          )}

          {/* Category Label and Date - Below hero image */}
          {(post.category || publishedDate || post.publishedAt) && (
            <div className="flex flex-wrap items-center gap-4 mt-4 sm:mt-6">
              {/* Category Label */}
              {post.category && (
                <span className="inline-flex items-center justify-center px-4 py-2 bg-black text-white text-xs font-semibold tracking-wide uppercase rounded-lg">
                  {post.category}
                </span>
              )}
              
              {/* Date with Calendar Icon */}
              {(publishedDate || post.publishedAt) && (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-[#0C1412]"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <time
                    dateTime={dateObj ? dateObj.toISOString() : undefined}
                    className="text-sm font-medium text-[#0C1412]"
                  >
                    {formattedDate}
                  </time>
                </div>
              )}
            </div>
          )}

        </div>
      </header>

      {/* Main Content Grid - All sections below hero image with sidebar on right */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
        {/* Left Column - All content sections */}
        <div className="space-y-16 lg:col-span-8">
          {/* Introduction thesis and paragraphs - First section in grid */}
          {(introduction.thesis || introduction.paragraphs?.length) && (
            <section className="pt-0 sm:pt-2">
              <div className="max-w-4xl space-y-4">
                {introduction.thesis && (
                  <p className="text-base leading-relaxed text-[#0C1412]/80 sm:text-lg text-left font-semibold">
                    {introduction.thesis}
                  </p>
                )}
                {Array.isArray(introduction.paragraphs) &&
                  introduction.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-base leading-normal text-black sm:text-base tracking-wide text-left">{paragraph}</p>
                  ))}
              </div>
            </section>
          )}

          {/* Affiliate Link Button - match money article CTA style */}
          {affiliateLink && (
            <div className="pt-6 sm:pt-8">
              <AnimatedButton
                href={affiliateLink}
                external={true}
                rel="sponsored nofollow noopener"
                className="w-auto text-sm sm:text-base"
              >
                {ctaLabel}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </AnimatedButton>
            </div>
          )}

          {/* Introduction Section */}
          {(introduction.heading || introduction.paragraphs?.length) && (
            <section className="pt-6 sm:pt-8" aria-labelledby="introduction-heading">
              <div className="max-w-4xl space-y-4">
                {introduction.heading && (
                  <h2
                    id="introduction-heading"
                    className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                  >
                    {introduction.heading}
                  </h2>
                )}
                {Array.isArray(introduction.paragraphs) && introduction.paragraphs.length > 0 && (
                  <div className="space-y-4">
                    {introduction.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                        {renderMarkdownBold(paragraph)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Specifications Section */}
          {(specs.heading || specs.items?.length) && (
            <section className="pt-6 sm:pt-8" aria-labelledby="specs-heading">
              <div className="max-w-4xl space-y-4">
                {specs.heading && (
                  <h2
                    id="specs-heading"
                    className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                  >
                    {specs.heading || "Specifications & Key Details"}
                  </h2>
                )}
                {Array.isArray(specs.items) && specs.items.length > 0 && (
                  <dl className="grid gap-5 rounded-lg bg-white p-6 sm:grid-cols-2 sm:gap-6 sm:p-8">
                    {specs.items.map((item, index) => {
                      if (!item?.label && !item?.value) return null;
                      return (
                        <div key={index} className="space-y-2">
                          {item.label && (
                            <dt className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-[#6b7280] sm:text-base">
                              <SpecIcon label={item.label} />
                              {item.label}
                            </dt>
                          )}
                          {item.value && (
                            <dd className="text-md font-medium leading-normal text-[#111827]">
                              {item.value}
                            </dd>
                          )}
                        </div>
                      );
                    })}
                  </dl>
                )}
                {affiliateLink && (
                  <div className="pt-4">
                    <AnimatedButton
                      href={affiliateLink}
                      external={true}
                      rel="sponsored nofollow noopener"
                      className="w-auto text-sm sm:text-base"
                    >
                      {ctaLabel}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </AnimatedButton>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Primary Image Section */}
          {imagePrimary?.image && (
            <section className="pt-6 sm:pt-8">
              <div className="max-w-4xl space-y-4">
                {imagePrimary.heading && (
                  <h3 className="text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#0C1412] sm:text-2xl text-left">
                    {imagePrimary.heading}
                  </h3>
                )}
                <figure className="relative overflow-hidden rounded-lg">
                  <div className="aspect-[16/9] w-full relative">
                    <Image
                      src={imagePrimary.image}
                      alt={imagePrimary.alt || headline || ""}
                      fill
                      sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
                      className="object-cover"
                      quality={75}
                      priority={false}
                      loading="lazy"
                    />
                  </div>
                  {imagePrimary.description && (
                    <figcaption className="sr-only">{imagePrimary.description}</figcaption>
                  )}
                </figure>
                {imagePrimary.description && (
                  <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                    {imagePrimary.description}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Design & Build Quality Section */}
          {(designAndBuild.heading || designAndBuild.paragraphs?.length) && (
            <section className="pt-6 sm:pt-8" aria-labelledby="design-heading">
              <div className="max-w-4xl space-y-4">
                {designAndBuild.heading && (
                  <h2
                    id="design-heading"
                    className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                  >
                    {designAndBuild.heading}
                  </h2>
                )}
                {Array.isArray(designAndBuild.paragraphs) && designAndBuild.paragraphs.length > 0 && (
                  <div className="space-y-4">
                    {designAndBuild.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                        {renderMarkdownBold(paragraph)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Tertiary Image Section */}
          {imageTertiary?.image && (
            <section className="pt-6 sm:pt-8">
              <div className="max-w-4xl space-y-4">
                {imageTertiary.heading && (
                  <h3 className="text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#0C1412] sm:text-2xl text-left">
                    {imageTertiary.heading}
                  </h3>
                )}
                <figure className="relative overflow-hidden rounded-lg">
                  <div className="aspect-[16/9] w-full relative">
                    <Image
                      src={imageTertiary.image}
                      alt={imageTertiary.alt || headline || ""}
                      fill
                      sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
                      className="object-cover"
                      quality={75}
                      priority={false}
                      loading="lazy"
                    />
                  </div>
                  {imageTertiary.description && (
                    <figcaption className="sr-only">{imageTertiary.description}</figcaption>
                  )}
                </figure>
                {imageTertiary.description && (
                  <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                    {imageTertiary.description}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Features Section */}
          {(features.heading || features.groups?.length) && (
            <section className="pt-6 sm:pt-8" aria-labelledby="features-heading">
              <div className="max-w-4xl space-y-6">
                {features.heading && (
                  <h2
                    id="features-heading"
                    className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                  >
                    {features.heading || "Features Breakdown"}
                  </h2>
                )}
                {Array.isArray(features.groups) && features.groups.length > 0 && (
                  <div className="space-y-5">
                    {features.groups.map((group, index) => (
                      <div
                        key={group?.title || index}
                        className="rounded-lg bg-white p-6 sm:p-7"
                      >
                        {group?.title && (
                          <h3 className="mb-3 text-lg font-semibold text-[#0C1412] sm:text-xl text-left">
                            {group.title}
                          </h3>
                        )}
                        {Array.isArray(group?.bullets) && group.bullets.length > 0 && (
                          <ul className="space-y-2 text-left">
                            {group.bullets.map((bullet, bulletIndex) => (
                              <li key={bulletIndex} className="text-sm leading-normal text-black sm:text-base tracking-wide relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-black before:content-['']">
                                {renderMarkdownBold(bullet)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Quaternary Image Section */}
          {imageQuaternary?.image && (
            <section className="pt-6 sm:pt-8">
              <div className="max-w-4xl space-y-4">
                {imageQuaternary.heading && (
                  <h3 className="text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#0C1412] sm:text-2xl text-left">
                    {imageQuaternary.heading}
                  </h3>
                )}
                <figure className="relative overflow-hidden rounded-lg">
                  <div className="aspect-[16/9] w-full relative">
                    <Image
                      src={imageQuaternary.image}
                      alt={imageQuaternary.alt || headline || ""}
                      fill
                      sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
                      className="object-cover"
                      quality={75}
                      priority={false}
                      loading="lazy"
                    />
                  </div>
                  {imageQuaternary.description && (
                    <figcaption className="sr-only">{imageQuaternary.description}</figcaption>
                  )}
                </figure>
                {imageQuaternary.description && (
                  <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                    {imageQuaternary.description}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Performance Section */}
          {(performance.heading || performance.paragraphs?.length) && (
            <section className="pt-6 sm:pt-8" aria-labelledby="performance-heading">
              <div className="max-w-4xl space-y-4">
                {performance.heading && (
                  <h2
                    id="performance-heading"
                    className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                  >
                    {performance.heading}
                  </h2>
                )}
                {Array.isArray(performance.paragraphs) && performance.paragraphs.length > 0 && (
                  <div className="space-y-4">
                    {performance.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                        {renderMarkdownBold(paragraph)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Secondary Image Section */}
          {imageSecondary?.image && (
            <section className="pt-6 sm:pt-8">
              <div className="max-w-4xl space-y-4">
                {imageSecondary.heading && (
                  <h3 className="text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#0C1412] sm:text-2xl text-left">
                    {imageSecondary.heading}
                  </h3>
                )}
                <figure className="relative overflow-hidden rounded-lg">
                  <div className="aspect-[16/9] w-full relative">
                    <Image
                      src={imageSecondary.image}
                      alt={imageSecondary.alt || headline || ""}
                      fill
                      sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
                      className="object-cover"
                      quality={75}
                      priority={false}
                      loading="lazy"
                    />
                  </div>
                  {imageSecondary.description && (
                    <figcaption className="sr-only">{imageSecondary.description}</figcaption>
                  )}
                </figure>
                {imageSecondary.description && (
                  <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                    {imageSecondary.description}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* User Experience Section */}
          {(userExperience.heading || userExperience.paragraphs?.length) && (
            <section className="pt-6 sm:pt-8" aria-labelledby="user-experience-heading">
              <div className="max-w-4xl space-y-4">
                {userExperience.heading && (
                  <h2
                    id="user-experience-heading"
                    className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                  >
                    {userExperience.heading}
                  </h2>
                )}
                {Array.isArray(userExperience.paragraphs) && userExperience.paragraphs.length > 0 && (
                  <div className="space-y-4">
                    {userExperience.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                        {renderMarkdownBold(paragraph)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Quinary Image Section */}
          {imageQuinary?.image && (
            <section className="pt-6 sm:pt-8">
              <div className="max-w-4xl space-y-4">
                {imageQuinary.heading && (
                  <h3 className="text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#0C1412] sm:text-2xl text-left">
                    {imageQuinary.heading}
                  </h3>
                )}
                <figure className="relative overflow-hidden rounded-lg">
                  <div className="aspect-[16/9] w-full relative">
                    <Image
                      src={imageQuinary.image}
                      alt={imageQuinary.alt || headline || ""}
                      fill
                      sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
                      className="object-cover"
                      quality={75}
                      priority={false}
                      loading="lazy"
                    />
                  </div>
                  {imageQuinary.description && (
                    <figcaption className="sr-only">{imageQuinary.description}</figcaption>
                  )}
                </figure>
                {imageQuinary.description && (
                  <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                    {imageQuinary.description}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Comparisons Section */}
          {(comparisons.heading || comparisons.paragraphs?.length) && (
            <section className="pt-6 sm:pt-8" aria-labelledby="comparisons-heading">
              <div className="max-w-4xl space-y-4">
                {comparisons.heading && (
                  <h2
                    id="comparisons-heading"
                    className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                  >
                    {comparisons.heading}
                  </h2>
                )}
                {Array.isArray(comparisons.paragraphs) && comparisons.paragraphs.length > 0 && (
                  <div className="space-y-4">
                    {comparisons.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                        {renderMarkdownBold(paragraph)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Who It's Best For Section */}
          {whoItsBestFor?.text && (
            <section className="pt-6 sm:pt-8" aria-labelledby="who-best-heading">
              <div className="max-w-4xl space-y-4">
                <h2
                  id="who-best-heading"
                  className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                >
                  Who This Product Is Best For
                </h2>
                <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                  {whoItsBestFor.text}
                </p>
                {affiliateLink && (
                  <div className="pt-4">
                    <AnimatedButton
                      href={affiliateLink}
                      external={true}
                      rel="sponsored nofollow noopener"
                      className="w-auto text-sm sm:text-base"
                    >
                      {ctaLabel}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </AnimatedButton>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Pros & Cons Section */}
          {(prosCons.heading || prosCons.pros?.length || prosCons.cons?.length) && (
            <section className="pt-6 sm:pt-8" aria-labelledby="pros-cons-heading">
              <div className="max-w-4xl space-y-6">
                {prosCons.heading && (
                  <h2
                    id="pros-cons-heading"
                    className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                  >
                    {prosCons.heading || "Pros & Cons"}
                  </h2>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  {Array.isArray(prosCons.pros) && prosCons.pros.length > 0 && (
                    <div className="rounded-lg bg-white p-6 sm:p-7">
                      <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-green-700 text-left">
                        Pros
                      </h4>
                      <ul className="space-y-3 text-left">
                        {prosCons.pros.map((text, index) => (
                          <li key={index} className="text-sm leading-normal text-black sm:text-base tracking-wide relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-black before:content-['']">
                            {renderMarkdownBold(text)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {Array.isArray(prosCons.cons) && prosCons.cons.length > 0 && (
                    <div className="rounded-lg bg-white p-6 sm:p-7">
                      <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-amber-700 text-left">
                        Cons
                      </h4>
                      <ul className="space-y-3 text-left">
                        {prosCons.cons.map((text, index) => (
                          <li key={index} className="text-sm leading-normal text-black sm:text-base tracking-wide relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-black before:content-['']">
                            {renderMarkdownBold(text)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {affiliateLink && (
                  <div className="pt-4">
                    <AnimatedButton
                      href={affiliateLink}
                      external={true}
                      rel="sponsored nofollow noopener"
                      className="w-auto text-sm sm:text-base"
                    >
                      {ctaLabel}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </AnimatedButton>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Conclusion Section */}
          {(conclusion.heading ||
            conclusion.verdict ||
            conclusion.paragraphs?.length) && (
            <section className="pt-6 sm:pt-8" aria-labelledby="conclusion-heading">
              <div className="max-w-4xl space-y-4">
                {conclusion.heading && (
                  <h2
                    id="conclusion-heading"
                    className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                  >
                    {conclusion.heading}
                  </h2>
                )}
                {Array.isArray(conclusion.paragraphs) &&
                  conclusion.paragraphs.length > 0 && (
                    <div className="space-y-4">
                      {conclusion.paragraphs.map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-sm leading-normal text-black sm:text-base tracking-wide text-left"
                        >
                          {renderMarkdownBold(paragraph)}
                        </p>
                      ))}
                    </div>
                  )}
                {conclusion.verdict && (
                    <div className="rounded-lg bg-white p-6 sm:p-8">
                    <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                      {conclusion.verdict}
                    </p>
                  </div>
                )}
                {affiliateLink && (
                  <div className="pt-4">
                    <AnimatedButton
                      href={affiliateLink}
                      external={true}
                      rel="sponsored nofollow noopener"
                      className="w-auto text-sm sm:text-base"
                    >
                      {ctaLabel}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </AnimatedButton>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* FAQ Section - Toggle Box Style (matching MoneyArticle.js) */}
          {post.faq && Array.isArray(post.faq) && post.faq.length > 0 && post.faqTitle && (
            <section className="space-y-8 py-12" aria-labelledby="faq-heading">
              <header className="max-w-4xl space-y-3">
                <h2
                  id="faq-heading"
                  className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                >
                  {post.faqTitle}
                </h2>
              </header>
              <div className="max-w-4xl space-y-3">
                {post.faq.map((item, index) => {
                  const question = item.question ?? `FAQ ${index + 1}`;
                  const answer = item.answer ?? '';
                  const summaryId = `faq-summary-${index}`;
                  const contentId = `faq-panel-${index}`;

                  return (
                    <details
                      key={index}
                      className="group rounded-lg bg-white p-5 sm:p-6"
                    >
                      <summary
                        id={summaryId}
                        className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold text-[#111827] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7] focus-visible:ring-offset-2 sm:text-lg"
                      >
                        <span>{question}</span>
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#6b7280] transition-all group-open:rotate-45 group-open:border-[#3e3ce7] group-open:text-[#3e3ce7]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                            aria-hidden="true"
                          >
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                          </svg>
                        </span>
                      </summary>
                      {answer && (
                        <div
                          id={contentId}
                          role="region"
                          aria-labelledby={summaryId}
                          className="mt-4 space-y-4 pt-4"
                        >
                          {Array.isArray(answer) ? (
                            answer.map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-base leading-normal text-black sm:text-base tracking-wide text-left">{paragraph}</p>
                            ))
                          ) : (
                            <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">{answer}</p>
                          )}
                        </div>
                      )}
                    </details>
                  );
                })}
              </div>
            </section>
          )}

          {/* Internal Links Section - SEO optimized */}
          {post.internalLinks && Array.isArray(post.internalLinks) && post.internalLinks.length > 0 && post.internalLinksTitle && (
            <section className="space-y-4" aria-labelledby="related-content">
              <div className="max-w-4xl">
                <h2
                  id="related-content"
                  className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                >
                  {post.internalLinksTitle}
                </h2>
                <nav aria-label="Related articles">
                  <ul className="space-y-3 mt-4">
                    {post.internalLinks.map((link, index) => (
                      <li key={index}>
                        <Link
                          href={link.url}
                          className="group flex items-start gap-3 pt-4 transition-all"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#3e3ce7] transition-colors group-hover:text-[#3e3ce7]/80"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                          </svg>
                          <div className="flex-1">
                            <span className="font-semibold text-[#0C1412] transition-colors group-hover:text-[#3e3ce7]">
                              {link.text}
                            </span>
                            {link.description && (
                              <p className="mt-1 text-base leading-normal text-black sm:text-base tracking-wide text-left">{link.description}</p>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4">
          <SidebarContent />
        </div>
      </div>
    </article>
  );
}


function safeString(value) {
  return typeof value === "string" && value.trim().length
    ? value.trim()
    : null;
}

function getSpecIcon(label) {
  const normalized = (label || "").toLowerCase();

  if (/price|msrp|cost/.test(normalized)) return DollarSign;
  if (/motor/.test(normalized)) return Zap;
  if (/battery/.test(normalized)) return Battery;
  if (/weight/.test(normalized)) return Weight;
  if (/range/.test(normalized) && !/rider/.test(normalized)) return Gauge;
  if (/cargo|payload|load/.test(normalized)) return Package;
  if (/rider|height|fit|size/.test(normalized)) return Ruler;
  if (/best for/.test(normalized)) return Target;
  if (/wheel|tire/.test(normalized)) return CircleDot;
  if (/brake/.test(normalized)) return Disc3;
  if (/drivetrain|gear/.test(normalized)) return Settings;
  if (/class|speed/.test(normalized)) return Gauge;
  if (/dimension/.test(normalized)) return Ruler;
  if (/frame|suspension/.test(normalized)) return Layers;
  if (/feature|unique/.test(normalized)) return Sparkles;

  return ClipboardList;
}

function SpecIcon({ label }) {
  const Icon = getSpecIcon(label);

  return (
    <Icon
      className="h-5 w-5 flex-shrink-0 text-[#6b7280] sm:h-[22px] sm:w-[22px]"
      strokeWidth={2}
      aria-hidden="true"
    />
  );
}

function renderMarkdownBold(text) {
  if (typeof text !== "string") return text;

  const parts = [];
  let lastIndex = 0;
  const regex = /\*\*(.+?)\*\*/g;
  let match;

  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <strong key={match.index}>
        {match[1]}
      </strong>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function BackgroundPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
      aria-hidden="true"
    />
  );
}

/**
 * SectionHeader Component
 * 
 * Creates H2 headings for main sections (SEO requirement: proper H2 hierarchy).
 * Used for: Introduction, Specs, Design, Features, Performance, User Experience,
 * Comparisons, Who It's Best For, Pros & Cons, Conclusion.
 * 
 * @param {Object} props
 * @param {string} props.label - Optional label text (small uppercase)
 * @param {string} props.title - H2 heading text (required)
 */
function SectionHeader({ label, title }) {
  if (!title) return null;

  return (
    <header className="space-y-3">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
          {label}
        </p>
      )}
      <h2 className="text-3xl font-bold leading-[1.25] tracking-[-0.01em] text-[#111827] sm:text-4xl">
        {title}
      </h2>
    </header>
  );
}

function ImageSection({ heading, description, image, alt }) {
  if (!image) return null;

  return (
    <section className="mx-auto max-w-5xl space-y-4">
      {heading && (
        <h3 className="text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#111827] sm:text-2xl">
          {heading}
        </h3>
      )}
      <figure className="relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
        <div className="aspect-[16/9] w-full">
          <Image
            src={image}
            alt={alt || heading || ""}
            fill
            sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
            className="object-cover"
            quality={75}
          />
        </div>
        {description && (
          <figcaption className="text-justify border-t border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm leading-relaxed text-[#4b5563] sm:px-5 sm:py-4">
            {description}
          </figcaption>
        )}
      </figure>
    </section>
  );
}

function ContentSection({ label, title, paragraphs }) {
  if (!title && !Array.isArray(paragraphs)) return null;

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      {(label || title) && <SectionHeader label={label} title={title} />}
      {Array.isArray(paragraphs) && paragraphs.length > 0 && (
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-justify text-lg leading-[1.75] tracking-[0.01em] text-[#1f2937] sm:text-xl"
            >
              {renderMarkdownBold(paragraph)}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

function BenefitCard({ text, type }) {
  if (!text) return null;

  return (
    <div className="rounded-lg border border-[#e5e7eb] bg-white p-4 sm:p-5">
      <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
        {renderMarkdownBold(text)}
      </p>
    </div>
  );
}


