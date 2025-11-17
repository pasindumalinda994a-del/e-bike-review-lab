import Link from "next/link";
import Image from "next/image";
import ComparisonTable from "@/components/ComparisonTable";
import DetailedProductReviews from "@/components/DetailedProductReviews";
import BuyersGuide from "@/components/BuyersGuide";

// Full layout for commercial "money" posts.
export default function MoneyArticle({ post, publishedDate }) {
  const introductionParagraphs = Array.isArray(post.introductionParagraphs)
    ? post.introductionParagraphs
    : post.introduction
      ? [post.introduction]
      : [];

  const secondaryParagraphs = Array.isArray(post.secondaryIntroduction)
    ? post.secondaryIntroduction
    : post.secondaryIntroduction
      ? [post.secondaryIntroduction]
      : [];

  const hasBuyersGuideSections =
    Array.isArray(post.buyersGuideSections) && post.buyersGuideSections.length > 0;

  const buyersGuideTitle = post.buyersGuideTitle ?? "Buyer's Guide";
  const productHeading =
    post.topProductsHeading ?? "Detailed Product Reviews";
  const productCtaLabel = post.productCtaLabel ?? "Check Price on Amazon";
  const articleHeroImage = post.articleHeroImage ?? "/default-og.png";
  const heroImageAlt = post.heroImageAlt ?? post.title ?? post.h1;

  return (
    <article className="mx-auto max-w-5xl space-y-16 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header - Clean, minimal, impactful */}
      <header className="relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-gradient-to-br from-[#0C1412] via-[#1a1a2e] to-[#16213e] px-6 py-12 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        {/* Subtle background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        
        <div className="relative mx-auto max-w-4xl space-y-6">
          {/* Meta information - minimal and clean */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-wide text-white/60">
            {post.category && (
              <>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  {post.category}
                </span>
                <span className="text-white/20">•</span>
              </>
            )}
            {publishedDate && <span>{publishedDate}</span>}
            {post.estimatedReadingTime && (
              <>
                <span className="text-white/20">•</span>
                <span>{post.estimatedReadingTime} min read</span>
              </>
            )}
          </div>

          {/* Headline - large, readable, balanced */}
          {post.h1 && (
            <h1 className="text-3xl font-bold leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {post.h1}
            </h1>
          )}

          {/* Introduction paragraphs - clean, readable */}
          {introductionParagraphs.length || secondaryParagraphs.length ? (
            <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 text-base leading-[1.8] text-white/90 backdrop-blur-sm sm:p-8 sm:text-lg">
              {introductionParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {secondaryParagraphs.map((paragraph, index) => (
                <p key={`secondary-${index}`}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {/* Hero Image - Clean, minimal frame */}
      <figure className="relative mx-auto max-w-4xl overflow-hidden rounded-xl border border-[#e5e7eb] bg-[#f9fafb]">
        <div className="aspect-[4/3] w-full">
          <Image
            src={articleHeroImage}
            alt={heroImageAlt}
            fill
            sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
            className="object-cover"
            priority
            quality={85}
          />
        </div>
      </figure>

      {/* Top Products Intro - Clean section */}
      {post.topProductsIntro ? (
        <section className="mx-auto max-w-4xl rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 sm:p-8">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-[#3e3ce7]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
              What to Expect
            </span>
            <p className="text-base leading-[1.75] text-[#374151] sm:text-lg">
              {post.topProductsIntro}
            </p>
          </div>
        </section>
      ) : null}

      {/* Comparison Table */}
      <ComparisonTable products={post.products} comparison={post.comparisonTable} />

      {/* Detailed Product Reviews */}
      <DetailedProductReviews
        products={post.products}
        heading={productHeading}
        ctaLabel={productCtaLabel}
      />

      {/* Buyer's Guide Section - Dark gradient matching header */}
      {hasBuyersGuideSections ? (
        <section className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#e5e7eb] bg-gradient-to-br from-[#0C1412] via-[#1a1a2e] to-[#16213e] px-6 py-12 text-white shadow-lg sm:px-8 sm:py-16">
          {/* Subtle background pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden
          />
          
          <div className="relative mx-auto max-w-3xl space-y-10">
            {/* Section header */}
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
                Buyer&apos;s Guide
              </span>
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {buyersGuideTitle}
              </h2>
            </div>

            {/* Guide sections */}
            <div className="space-y-6">
              {post.buyersGuideSections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:p-8"
                >
                  <h3 className="mb-4 text-xl font-semibold text-white sm:text-2xl">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.paragraphs?.map((paragraph, index) => (
                      <p key={index} className="text-base leading-[1.75] text-white/90 sm:text-lg">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets?.length ? (
                      <ul className="ml-5 space-y-2.5 text-base leading-[1.7] text-white/85 marker:text-white/60 sm:text-lg">
                        {section.bullets.map((bullet, index) => (
                          <li key={index} className="pl-2">{bullet}</li>
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
        <BuyersGuide content={post.buyersGuide} />
      )}

      {/* Related Guides - Clean, minimal */}
      {post.relatedGuides?.length ? (
        <section className="mx-auto max-w-4xl rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
            Learn More About {post.category}
          </h2>
          <ul className="space-y-3">
            {post.relatedGuides.map((guide) => (
              <li key={guide.url}>
                <Link
                  href={guide.url}
                  className="group inline-flex items-center gap-2 text-base font-medium text-[#3e3ce7] transition-colors hover:text-[#111827] sm:text-lg"
                >
                  <span className="border-b border-transparent group-hover:border-[#3e3ce7]">
                    {guide.title}
                  </span>
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
