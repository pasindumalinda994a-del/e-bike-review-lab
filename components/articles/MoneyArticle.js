import Link from "next/link";
import Image from "next/image";
import ComparisonTable from "@/components/ComparisonTable";
import DetailedProductReviews from "@/components/DetailedProductReviews";
import BuyersGuide from "@/components/BuyersGuide";
import SidebarContent from "@/components/SidebarContent";
import { renderInlineMarkdownLinks } from "@/lib/render-inline-markdown-links";

/**
 * MoneyArticle Component
 * 
 * Full layout for commercial "money" posts (product review roundups).
 * All content comes from money.js - no hardcoded content here.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.post - Article data from money.js
 * @param {string} props.publishedDate - Formatted publication date
 */
export default function MoneyArticle({ post, publishedDate }) {
  // Normalize introduction paragraphs (money.js uses array format)
  const introductionParagraphs = Array.isArray(post.introductionParagraphs)
    ? post.introductionParagraphs
    : [];

  // Normalize secondary introduction (optional additional paragraphs)
  const secondaryParagraphs = Array.isArray(post.secondaryIntroduction)
    ? post.secondaryIntroduction
    : [];

  // Check if buyer's guide uses structured sections (money.js uses this format)
  const hasBuyersGuideSections =
    Array.isArray(post.buyersGuideSections) && post.buyersGuideSections.length > 0;

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
                {post.h1 && (
                  <>
                    <li className="text-[#999999]">/</li>
                    <li className="text-[#0C1412] font-medium" aria-current="page">
                      {post.h1}
                    </li>
                  </>
                )}
              </ol>
            </nav>

            {/* SEO: H1 - Only ONE per page, different from SEO title, includes keyword variation */}
            {post.h1 && (
              <h1 className="text-3xl font-bold leading-[1.2] tracking-[-0.02em] text-[#0C1412] sm:text-3xl md:text-4xl lg:text-5xl text-left">
                {post.h1}
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
          {post.articleHeroImage && (
            <figure className="relative overflow-hidden rounded-2xl mt-4 sm:mt-6">
              <div className="aspect-[21/9] w-full">
                <Image
                  src={post.articleHeroImage}
                  alt={post.heroImageAlt || post.h1 || ''}
                  fill
                  sizes="(min-width: 1024px) 1024px, (min-width: 768px) 90vw, 100vw"
                  className="object-cover"
                  priority
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k="
                />
              </div>
              {post.heroImageAlt && (
                <figcaption className="sr-only">{post.heroImageAlt}</figcaption>
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
          {/* Introduction paragraphs - First section in grid */}
          {introductionParagraphs.length || secondaryParagraphs.length ? (
            <section className="pt-0 sm:pt-2">
              <div className="max-w-4xl space-y-4">
                {introductionParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-base leading-normal text-black sm:text-base tracking-wide text-left">{renderInlineMarkdownLinks(paragraph)}</p>
                ))}
                {secondaryParagraphs.map((paragraph, index) => (
                  <p key={`secondary-${index}`} className="text-base leading-normal text-black sm:text-base tracking-wide text-left">{renderInlineMarkdownLinks(paragraph)}</p>
                ))}
              </div>
            </section>
          ) : null}

          {/* Top Products Intro */}
          {post.topProductsIntro && (
            <section className="pt-6 sm:pt-8" aria-labelledby="top-products-intro">
              <div className="max-w-4xl space-y-4">
                {post.topProductsIntroHeading && (
                  <h2
                    id="top-products-intro"
                    className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                  >
                    {post.topProductsIntroHeading}
                  </h2>
                )}
                <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                  {post.topProductsIntro}
                </p>
              </div>
            </section>
          )}

          {/* Comparison Table */}
          {post.comparisonTable && (
            <ComparisonTable products={post.products} comparison={post.comparisonTable} />
          )}

          {/* Detailed Product Reviews */}
          {post.topProductsHeading && post.productCtaLabel && (
            <DetailedProductReviews
              products={post.products}
              heading={post.topProductsHeading}
              ctaLabel={post.productCtaLabel}
            />
          )}

          {/* Buyer's Guide Section - Dark gradient matching header */}
          {hasBuyersGuideSections ? (
            <section className="py-12 sm:py-16" aria-labelledby="buyers-guide-heading">
              <div className="space-y-10">
                {/* Section header - constrained width */}
                <div className="max-w-4xl space-y-4">
                  {post.buyersGuideTitle && (
                    <h2
                      id="buyers-guide-heading"
                      className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                    >
                      {post.buyersGuideTitle}
                    </h2>
                  )}
                </div>

                {/* Buyer's Guide Image - Content width */}
                {post.buyersGuideImage && (
                  <div className="max-w-4xl">
                    <figure className="relative overflow-hidden rounded-lg">
                      <div className="aspect-[16/9] w-full relative">
                        <Image
                          src={post.buyersGuideImage}
                          alt={post.buyersGuideImageAlt || post.buyersGuideTitle || 'Buyer\'s guide image'}
                          fill
                          sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
                          className="object-cover"
                          quality={75}
                          priority={false}
                          loading="lazy"
                        />
                      </div>
                      {post.buyersGuideImageAlt && (
                        <figcaption className="sr-only">{post.buyersGuideImageAlt}</figcaption>
                      )}
                    </figure>
                  </div>
                )}

                {/* Guide sections - constrained width */}
                <div className="max-w-4xl space-y-6">
                  {post.buyersGuideSections.map((section, index) => (
                    <div
                      key={section.title || index}
                      className="pt-6 sm:pt-8"
                    >
                      <h3 className="mb-4 text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#0C1412] sm:text-2xl text-left">
                        {section.title}
                      </h3>
                      <div className="space-y-4">
                        {section.paragraphs?.map((paragraph, index) => (
                          <p key={index} className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                            {renderInlineMarkdownLinks(paragraph)}
                          </p>
                        ))}
                        {section.bullets?.length ? (
                          <ul className="space-y-3 text-left">
                            {section.bullets.map((bullet, index) => (
                              <li key={index} className="text-base leading-normal text-black sm:text-base tracking-wide relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-black before:content-['']">
                                {renderInlineMarkdownLinks(bullet)}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            post.buyersGuide && (
              <BuyersGuide 
                content={post.buyersGuide} 
                title={post.buyersGuideTitle}
                label={post.buyersGuideLabel}
              />
            )
          )}

          {/* FAQ Section - Toggle Box Style (matching InformationalArticle.js) */}
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
                              <p key={pIndex} className="text-base leading-normal text-black sm:text-base tracking-wide text-left">{renderInlineMarkdownLinks(paragraph)}</p>
                            ))
                          ) : (
                            <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">{renderInlineMarkdownLinks(answer)}</p>
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
