import Link from "next/link";
import Image from "next/image";
import ComparisonTable from "@/components/ComparisonTable";
import DetailedProductReviews from "@/components/DetailedProductReviews";
import BuyersGuide from "@/components/BuyersGuide";

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

  return (
    <article className="mx-auto max-w-6xl space-y-16">
      {/* Header - Clean, minimal, impactful */}
      <header className="relative overflow-hidden rounded-3xl border border-[#0C1412]/10 bg-gradient-to-br from-[#0C1412] via-[#1a1a2e] to-[#16213e] px-6 py-12 text-white shadow-xl sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        {/* Subtle background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        
        <div className="relative mx-auto max-w-5xl space-y-6">
          {/* Meta information - minimal and clean */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-wide text-white/60">
            {post.category && (
              <>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" aria-hidden="true" />
                  {post.category}
                </span>
                <span className="text-white/20" aria-hidden="true">•</span>
              </>
            )}
            {publishedDate && (
              <time dateTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined}>
                {publishedDate}
              </time>
            )}
            {post.estimatedReadingTime && (
              <>
                <span className="text-white/20" aria-hidden="true">•</span>
                <span>{post.estimatedReadingTime} min read</span>
              </>
            )}
          </div>

          {/* SEO: H1 - Only ONE per page, different from SEO title, includes keyword variation */}
          {post.h1 && (
            <h1 className="text-3xl font-bold leading-[1.2] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {post.h1}
            </h1>
          )}

          {/* Introduction paragraphs - clean, readable */}
          {introductionParagraphs.length || secondaryParagraphs.length ? (
            <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 text-base leading-[1.75] tracking-[0.01em] text-white/90 backdrop-blur-sm sm:p-8 sm:text-lg">
              {introductionParagraphs.map((paragraph, index) => (
                <p key={index} className="text-justify">{paragraph}</p>
              ))}
              {secondaryParagraphs.map((paragraph, index) => (
                <p key={`secondary-${index}`} className="text-justify">{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {/* Hero Image */}
      {post.articleHeroImage && (
        <figure className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#0C1412]/10 bg-white shadow-lg">
          <div className="aspect-[4/3] w-full">
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

      {/* Top Products Intro */}
      {post.topProductsIntro && (
        <section className="mx-auto max-w-5xl rounded-2xl border border-[#0C1412]/10 bg-gradient-to-br from-white to-[#3e3ce7]/5 p-6 shadow-sm sm:p-8" aria-labelledby="top-products-intro">
          <div className="space-y-4">
            {post.topProductsIntroLabel && (
              <span className="inline-flex items-center rounded-full bg-[#3e3ce7]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
                {post.topProductsIntroLabel}
              </span>
            )}
            {post.topProductsIntroHeading && (
              <h2 id="top-products-intro" className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl">
                {post.topProductsIntroHeading}
              </h2>
            )}
            <p className="text-justify text-base leading-[1.75] tracking-[0.01em] text-[#1f2937] sm:text-lg">
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
        <section className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#0C1412]/10 bg-gradient-to-br from-[#0C1412] via-[#1a1a2e] to-[#16213e] px-6 py-12 text-white shadow-xl sm:px-8 sm:py-16" aria-labelledby="buyers-guide-heading">
          {/* Subtle background pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden
          />
          
          <div className="relative mx-auto max-w-4xl space-y-10">
            {/* Section header */}
            <div className="space-y-4">
              {post.buyersGuideLabel && (
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
                  {post.buyersGuideLabel}
                </span>
              )}
              {post.buyersGuideTitle && (
                <h2 id="buyers-guide-heading" className="text-3xl font-bold leading-[1.25] tracking-[-0.01em] sm:text-4xl">
                  {post.buyersGuideTitle}
                </h2>
              )}
            </div>

            {/* Buyer's Guide Image */}
            {post.buyersGuideImage && (
              <figure className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-lg">
                <div className="aspect-[16/9] w-full relative">
                  <Image
                    src={post.buyersGuideImage}
                    alt={post.buyersGuideImageAlt || post.buyersGuideTitle || 'Buyer\'s guide image'}
                    fill
                    sizes="(min-width: 1024px) 768px, (min-width: 768px) 90vw, 100vw"
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
            )}

            {/* Guide sections */}
            <div className="space-y-6">
              {post.buyersGuideSections.map((section, index) => (
                <div
                  key={section.title || index}
                  className="rounded-xl p-6 sm:p-8"
                >
                  <h3 className="mb-4 text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-white sm:text-2xl">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.paragraphs?.map((paragraph, index) => (
                      <p key={index} className="text-justify text-base leading-[1.75] tracking-[0.01em] text-white/90 sm:text-lg">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets?.length ? (
                      <ul className="ml-6 space-y-3 text-base leading-[1.75] tracking-[0.01em] text-white/90 sm:text-lg">
                        {section.bullets.map((bullet, index) => (
                          <li key={index} className="text-justify relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-white/70 before:content-['']">
                            {bullet}
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
        <section className="mx-auto max-w-5xl space-y-8 py-12" aria-labelledby="faq-heading">
          <header className="space-y-3">
            {post.faqLabel && (
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
                {post.faqLabel}
              </p>
            )}
            <h2 id="faq-heading" className="text-3xl font-bold leading-[1.25] tracking-[-0.01em] text-[#111827] sm:text-4xl">
              {post.faqTitle}
            </h2>
          </header>
          <div className="space-y-3">
            {post.faq.map((item, index) => {
              const question = item.question ?? `FAQ ${index + 1}`;
              const answer = item.answer ?? '';
              const summaryId = `faq-summary-${index}`;
              const contentId = `faq-panel-${index}`;

              return (
                <details
                  key={index}
                  className="group rounded-2xl border border-[#0C1412]/10 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-md hover:shadow-[#3e3ce7]/10 sm:p-6"
                >
                  <summary
                    id={summaryId}
                    className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold text-[#111827] transition-colors hover:text-[#3e3ce7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7] focus-visible:ring-offset-2 sm:text-lg"
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
                      className="mt-4 space-y-4 text-sm leading-[1.75] tracking-[0.01em] text-[#4b5563] sm:text-base"
                    >
                      {Array.isArray(answer) ? (
                        answer.map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-justify">{paragraph}</p>
                        ))
                      ) : (
                        <p className="text-justify">{answer}</p>
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
        <section className="mx-auto max-w-5xl space-y-4" aria-labelledby="related-content">
          <h2 id="related-content" className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl">
            {post.internalLinksTitle}
          </h2>
          <nav aria-label="Related articles">
            <ul className="space-y-3">
              {post.internalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className="group flex items-start gap-3 rounded-lg border border-[#e5e7eb] bg-white p-4 transition-all hover:border-[#3e3ce7]/30 hover:bg-[#3e3ce7]/5 hover:shadow-sm"
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
                        <p className="text-justify mt-1 text-sm leading-[1.7] tracking-[0.01em] text-[#6b7280]">{link.description}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      )}

    </article>
  );
}
