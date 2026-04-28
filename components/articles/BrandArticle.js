import Image from "next/image";
import Link from "next/link";
import SidebarContent from "@/components/SidebarContent";
import AnimatedButton from "@/components/AnimatedButton";

export default function BrandArticle({ post, publishedDate }) {
  if (!post) return null;

  const headline = safeString(post.h1) ?? safeString(post.title);
  const heroImageAlt = safeString(post.heroImageAlt) ?? headline ?? "";
  const articleHeroImage =
    safeString(post.articleHeroImage) ??
    safeString(post.heroImage) ??
    "/default-og.png";

  const dateObj = post.publishedAt
    ? new Date(post.publishedAt)
    : publishedDate
      ? new Date(publishedDate)
      : null;
  const formattedDate = dateObj
    ? dateObj
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase()
    : publishedDate || "";

  const quickSummary = post.quickSummary ?? {};
  const summaryRatingMatrix = quickSummary.ratingMatrix ?? {};
  const prosCons = post.prosCons ?? {};
  const keySpecifications = post.keySpecifications ?? {};
  const priceAndValue = post.priceAndValue ?? {};
  const designAndBuildQuality = post.designAndBuildQuality ?? {};
  const motorPerformanceAndPower = post.motorPerformanceAndPower ?? {};
  const batteryAndRangeTest = post.batteryAndRangeTest ?? {};
  const rideQualityAndComfort = post.rideQualityAndComfort ?? {};
  const componentsAndFeatures = post.componentsAndFeatures ?? {};
  const displayAppUserExperience = post.displayAppUserExperience ?? {};
  const whoThisEBikeIsFor = post.whoThisEBikeIsFor ?? {};
  const alternativesToConsider = post.alternativesToConsider ?? {};
  const finalVerdict = post.finalVerdict ?? {};
  const videoReview = post.videoReview ?? {};
  const quickSummaryParagraphs =
    quickSummary.paragraphs ??
    quickSummary.content ??
    [
      quickSummary.verdict,
      toLabeledLine("Best for", quickSummary.bestFor),
      toLabeledLine("Not ideal for", quickSummary.notIdealFor),
    ].filter(Boolean);
  const designAndBuildParagraphs =
    designAndBuildQuality.paragraphs ??
    designAndBuildQuality.content ??
    [
      designAndBuildQuality.frame,
      designAndBuildQuality.comfort,
      designAndBuildQuality.aesthetics,
      designAndBuildQuality.buildMaterials,
    ].filter(Boolean);
  const motorPerformanceParagraphs =
    motorPerformanceAndPower.paragraphs ??
    motorPerformanceAndPower.content ??
    [
      motorPerformanceAndPower.realWorldFeel,
      motorPerformanceAndPower.acceleration,
      motorPerformanceAndPower.hillClimbing,
    ].filter(Boolean);
  const batteryRangeParagraphs =
    batteryAndRangeTest.paragraphs ??
    batteryAndRangeTest.content ??
    [
      batteryAndRangeTest.realRange,
      batteryAndRangeTest.chargingTime,
      ...(Array.isArray(batteryAndRangeTest.notes) ? batteryAndRangeTest.notes : []),
    ].filter(Boolean);
  const rideQualityParagraphs =
    rideQualityAndComfort.paragraphs ??
    rideQualityAndComfort.content ??
    [
      rideQualityAndComfort.handling,
      rideQualityAndComfort.suspension,
      rideQualityAndComfort.ridingPosture,
    ].filter(Boolean);
  const componentsFeaturesParagraphs =
    componentsAndFeatures.paragraphs ??
    componentsAndFeatures.content ??
    [
      componentsAndFeatures.brakes,
      componentsAndFeatures.drivetrain,
      componentsAndFeatures.tires,
      componentsAndFeatures.extras,
    ].filter(Boolean);
  const displayAppParagraphs =
    displayAppUserExperience.paragraphs ??
    displayAppUserExperience.content ??
    [
      displayAppUserExperience.screenVisibility,
      displayAppUserExperience.appFunctionality,
      displayAppUserExperience.easeOfUse,
    ].filter(Boolean);
  const whoThisBikeIsForParagraphs =
    whoThisEBikeIsFor.paragraphs ??
    whoThisEBikeIsFor.content ??
    [
      toLabeledLine("Commuters", whoThisEBikeIsFor.commuters),
      toLabeledLine("Casual riders", whoThisEBikeIsFor.casualRiders),
      toLabeledLine("Off-road riders", whoThisEBikeIsFor.offRoadRiders),
    ].filter(Boolean);

  const affiliateLink = safeString(post.affiliateLink);
  const ctaLabel = safeString(post.ctaLabel) ?? "Check Current Price";

  return (
    <article className="mx-auto flex w-full max-w-[1440px] flex-col space-y-4 px-4 sm:px-6 md:px-12 lg:px-16">
      <header className="pt-12 pb-2 sm:pt-16 sm:pb-4 lg:pt-20 lg:pb-4">
        <div className="space-y-6">
          <div className="max-w-4xl">
            <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-[#666666]">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#0C1412]">
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

            {headline && (
              <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.02em] text-[#0C1412] sm:text-3xl md:text-4xl lg:text-5xl text-left">
                {headline}
              </h1>
            )}

            {post.metaDescription && (
              <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left mt-4 sm:mt-5">
                {post.metaDescription}
              </p>
            )}
          </div>

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
                />
              </div>
            </figure>
          )}

          {(post.category || publishedDate || post.publishedAt) && (
            <div className="flex flex-wrap items-center gap-4 mt-4 sm:mt-6">
              {post.category && (
                <span className="inline-flex items-center justify-center px-4 py-2 bg-black text-white text-xs font-semibold tracking-wide uppercase rounded-lg">
                  {post.category}
                </span>
              )}
              {(publishedDate || post.publishedAt) && (
                <time
                  dateTime={dateObj ? dateObj.toISOString() : undefined}
                  className="text-sm font-medium text-[#0C1412]"
                >
                  {formattedDate}
                </time>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-16 lg:col-span-8">
          <BrandSection
            id="quick-summary"
            title={quickSummary.heading || "Quick Summary"}
            show={Boolean(
              quickSummaryParagraphs?.length ||
                summaryRatingMatrix.metrics?.length ||
                summaryRatingMatrix.overallRating,
            )}
          >
            {renderParagraphs(quickSummaryParagraphs)}
            {(summaryRatingMatrix.metrics?.length || summaryRatingMatrix.overallRating) && (
              <div className="pt-2">
                <h3 className="mb-4 text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#0C1412] sm:text-2xl text-left">
                  {summaryRatingMatrix.heading || "Rating Matrix"}
                </h3>
                <div className="grid gap-4 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <OverallRatingCard
                      label={summaryRatingMatrix.overallLabel || "Overall Rating"}
                      value={summaryRatingMatrix.overallRating}
                      note={summaryRatingMatrix.overallNote}
                    />
                  </div>
                  <div className="lg:col-span-8">
                    <SummaryRatingMatrix metrics={summaryRatingMatrix.metrics} />
                  </div>
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
            )}
          </BrandSection>

          <BrandSection
            id="pros-cons"
            title={prosCons.heading || "Pros and Cons"}
            show={Boolean(prosCons.whatWeLike?.length || prosCons.whatCouldBeBetter?.length)}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <SummaryListCard title="What We Like" asH3 items={prosCons.whatWeLike} />
              <SummaryListCard
                title="What Could Be Better"
                asH3
                items={prosCons.whatCouldBeBetter}
              />
            </div>
          </BrandSection>

          <BrandSection
            id="key-specifications"
            title={keySpecifications.heading || "Key Specifications"}
            show={Boolean(
              keySpecifications.motorBattery?.length ||
                keySpecifications.performance?.length ||
                keySpecifications.frameBuild?.length ||
                keySpecifications.components?.length,
            )}
          >
            <div className="rounded-lg bg-white p-6 sm:p-8 space-y-8">
              <SpecsGroup
                heading="Motor & Battery"
                iconSrc="/icons/battery.svg"
                rows={keySpecifications.motorBattery}
              />
              <SpecsGroup
                heading="Performance"
                iconSrc="/icons/performance.svg"
                rows={keySpecifications.performance}
              />
              <SpecsGroup
                heading="Frame & Build"
                iconSrc="/icons/build.svg"
                rows={keySpecifications.frameBuild}
              />
              <SpecsGroup
                heading="Components"
                iconSrc="/icons/component.svg"
                rows={keySpecifications.components}
              />
            </div>
          </BrandSection>

          {affiliateLink && (
            <div className="pt-2">
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

          <BrandSection
            id="price-value"
            title={priceAndValue.heading || "Price and Value"}
            show={Boolean(
              priceAndValue.paragraphs?.length ||
                priceAndValue.content?.length ||
                priceAndValue.msrp ||
                priceAndValue.worthIt ||
                priceAndValue.competitorComparison?.length,
            )}
          >
            {renderParagraphs(
              priceAndValue.paragraphs ??
                priceAndValue.content ??
                [
                  priceAndValue.msrp
                    ? `**MSRP:** ${priceAndValue.msrp}`
                    : null,
                  priceAndValue.worthIt,
                  ...(Array.isArray(priceAndValue.competitorComparison)
                    ? priceAndValue.competitorComparison
                    : []),
                ].filter(Boolean),
            )}
          </BrandSection>

          <BrandSection
            id="design-build"
            title={designAndBuildQuality.heading || "Design and Build Quality"}
            show={Boolean(
              designAndBuildParagraphs?.length ||
                designAndBuildQuality.image?.image,
            )}
          >
            <SectionImage
              imageData={designAndBuildQuality.image}
              fallbackAlt={headline}
              headingAsParagraph
            />
            {renderParagraphs(designAndBuildParagraphs)}
          </BrandSection>

          <BrandSection
            id="motor-performance"
            title={motorPerformanceAndPower.heading || "Motor Performance and Power"}
            show={Boolean(
              motorPerformanceParagraphs?.length ||
                motorPerformanceAndPower.image?.image,
            )}
          >
            <SectionImage
              imageData={motorPerformanceAndPower.image}
              fallbackAlt={headline}
              headingAsParagraph
            />
            {renderParagraphs(motorPerformanceParagraphs)}
          </BrandSection>

          <BrandSection
            id="battery-range"
            title={batteryAndRangeTest.heading || "Battery and Range Test"}
            show={Boolean(
              batteryRangeParagraphs?.length ||
                batteryAndRangeTest.image?.image,
            )}
          >
            <SectionImage
              imageData={batteryAndRangeTest.image}
              fallbackAlt={headline}
              headingAsParagraph
            />
            {renderParagraphs(batteryRangeParagraphs)}
          </BrandSection>

          <BrandSection
            id="ride-quality"
            title={rideQualityAndComfort.heading || "Ride Quality and Comfort"}
            show={Boolean(
              rideQualityParagraphs?.length ||
                rideQualityAndComfort.image?.image,
            )}
          >
            <SectionImage
              imageData={rideQualityAndComfort.image}
              fallbackAlt={headline}
              headingAsParagraph
            />
            {renderParagraphs(rideQualityParagraphs)}
          </BrandSection>

          <BrandSection
            id="components-features"
            title={componentsAndFeatures.heading || "Components and Features"}
            show={Boolean(
              componentsFeaturesParagraphs?.length ||
                componentsAndFeatures.image?.image,
            )}
          >
            <SectionImage
              imageData={componentsAndFeatures.image}
              fallbackAlt={headline}
              headingAsParagraph
            />
            {renderParagraphs(componentsFeaturesParagraphs)}
          </BrandSection>

          <BrandSection
            id="display-app-ux"
            title={displayAppUserExperience.heading || "Display, App, and User Experience"}
            show={Boolean(
              displayAppParagraphs?.length ||
                displayAppUserExperience.image?.image,
            )}
          >
            <SectionImage
              imageData={displayAppUserExperience.image}
              fallbackAlt={headline}
              headingAsParagraph
            />
            {renderParagraphs(displayAppParagraphs)}
          </BrandSection>

          <BrandSection
            id="who-is-it-for"
            title={whoThisEBikeIsFor.heading || "Who This E-Bike Is For"}
            show={Boolean(
              whoThisBikeIsForParagraphs?.length,
            )}
          >
            {renderParagraphs(whoThisBikeIsForParagraphs)}
            {affiliateLink && (
              <div className="pt-2">
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
          </BrandSection>

          <BrandSection
            id="alternatives"
            title={alternativesToConsider.heading || "Alternatives to Consider"}
            show={Boolean(alternativesToConsider.comparisons?.length)}
          >
            {Array.isArray(alternativesToConsider.comparisons) &&
              alternativesToConsider.comparisons.map((item, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#0C1412]">
                    {item.modelComparison}
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <ComparisonChoiceCard
                      title={item.optionA?.label || item.leftLabel || "Option A"}
                      points={item.optionA?.points || item.leftPoints}
                    />
                    <ComparisonChoiceCard
                      title={item.optionB?.label || item.rightLabel || "Option B"}
                      points={item.optionB?.points || item.rightPoints}
                    />
                  </div>
                  {!item.optionA?.points &&
                    !item.optionB?.points &&
                    !item.leftPoints &&
                    !item.rightPoints &&
                    item.whyChooseOneOverTheOther && (
                      <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                        {renderMarkdownBold(item.whyChooseOneOverTheOther)}
                      </p>
                    )}
                </div>
              ))}
          </BrandSection>

          <BrandSection
            id="final-verdict"
            title={finalVerdict.heading || "Final Verdict"}
            show={Boolean(finalVerdict.summary || finalVerdict.recommendation)}
          >
            {renderParagraphs(finalVerdict.summary)}
            {finalVerdict.recommendation && (
              <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left font-semibold">
                {renderMarkdownBold(finalVerdict.recommendation)}
              </p>
            )}
            {affiliateLink && (
              <div className="pt-2">
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
          </BrandSection>

          {post.faqTitle && Array.isArray(post.faq) && post.faq.length > 0 && (
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
                  const answer = item.answer ?? "";
                  const summaryId = `faq-summary-${index}`;
                  const contentId = `faq-panel-${index}`;

                  return (
                    <details key={index} className="group rounded-lg bg-white p-5 sm:p-6">
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
                              <p
                                key={pIndex}
                                className="text-base leading-normal text-black sm:text-base tracking-wide text-left"
                              >
                                {renderMarkdownBold(paragraph)}
                              </p>
                            ))
                          ) : (
                            <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                              {renderMarkdownBold(answer)}
                            </p>
                          )}
                        </div>
                      )}
                    </details>
                  );
                })}
              </div>
            </section>
          )}

          <BrandSection
            id="video-review"
            title={videoReview.heading || "Video Review"}
            show={Boolean(videoReview.embedUrl || videoReview.description)}
          >
            {videoReview.embedUrl && (
              <div className="overflow-hidden rounded-xl bg-black">
                <iframe
                  title={videoReview.title || "Brand review video"}
                  src={videoReview.embedUrl}
                  className="aspect-video w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}
            {videoReview.description && (
              <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                {renderMarkdownBold(videoReview.description)}
              </p>
            )}
          </BrandSection>
        </div>

        <div className="lg:col-span-4">
          <SidebarContent />
        </div>
      </div>
    </article>
  );
}

function BrandSection({ id, title, show, children }) {
  if (!show) return null;
  return (
    <section className="pt-6 sm:pt-8" aria-labelledby={id}>
      <div className="max-w-4xl space-y-4">
        <h2
          id={id}
          className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function H3Paragraph({ title, content }) {
  if (!content) return null;
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-[#0C1412]">{title}</h3>
      <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
        {renderMarkdownBold(content)}
      </p>
    </div>
  );
}

function SummaryListCard({ title, items, asH3 = false }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const HeadingTag = asH3 ? "h3" : "p";
  return (
    <div className="rounded-lg bg-white p-6 sm:p-7">
      <HeadingTag className="mb-3 text-lg font-semibold text-[#0C1412]">
        {title}
      </HeadingTag>
      <ul className="space-y-2 text-left">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-base leading-normal text-black sm:text-base tracking-wide relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-black before:content-['']"
          >
            {renderMarkdownBold(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComparisonChoiceCard({ title, points }) {
  if (!Array.isArray(points) || points.length === 0) return null;
  return (
    <div className="rounded-lg bg-white p-6 sm:p-7">
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0C1412] text-left">
        {title}
      </h4>
      <ul className="space-y-3 text-left">
        {points.map((text, index) => (
          <li
            key={index}
            className="text-base leading-normal text-black sm:text-base tracking-wide relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-black before:content-['']"
          >
            {renderMarkdownBold(text)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SpecsGroup({ heading, iconSrc, rows }) {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5">
        {iconSrc && (
          <Image
            src={iconSrc}
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-[22px] flex-shrink-0"
            aria-hidden="true"
          />
        )}
        <h3 className="text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#0C1412] sm:text-2xl text-left">
          {heading}
        </h3>
      </div>
      <dl className="grid gap-4 text-sm text-[#111827] sm:grid-cols-2 sm:text-base">
        {rows.map((row, index) => {
          if (!row?.label && !row?.value) return null;
          return (
            <div key={index} className="space-y-1">
              {row.label && (
                <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6b7280]">
                  {row.label}
                </dt>
              )}
              {row.value && <dd className="font-medium text-[#111827]">{row.value}</dd>}
            </div>
          );
        })}
      </dl>
    </div>
  );
}

function SectionImage({ imageData, fallbackAlt, headingAsParagraph = false }) {
  if (!imageData?.image) return null;
  return (
    <div className="space-y-4">
      {imageData.heading &&
        (headingAsParagraph ? (
          <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
            {renderMarkdownBold(imageData.heading)}
          </p>
        ) : (
          <h3 className="text-xl font-semibold text-[#0C1412]">{imageData.heading}</h3>
        ))}
      <figure className="relative overflow-hidden rounded-lg">
        <div className="aspect-[16/9] w-full relative">
          <Image
            src={imageData.image}
            alt={imageData.alt || fallbackAlt || ""}
            fill
            sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
            className="object-cover"
            quality={75}
            priority={false}
            loading="lazy"
          />
        </div>
        {imageData.description && (
          <figcaption className="sr-only">{imageData.description}</figcaption>
        )}
      </figure>
      {imageData.description && (
        <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
          {renderMarkdownBold(imageData.description)}
        </p>
      )}
    </div>
  );
}

function SummaryRatingMatrix({ metrics }) {
  if (!Array.isArray(metrics) || metrics.length === 0) return null;
  return (
    <div className="space-y-3 rounded-lg bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-3">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6b7280] sm:text-xs">
          Rating Metric
        </p>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6b7280] sm:text-xs">
          Our Rating
        </p>
      </div>
      <div className="space-y-3">
        {metrics.map((metric, index) => {
          const rating = Number(metric?.rating ?? 0);
          const percentage = Math.min(Math.max((rating / 10) * 100, 0), 100);
          return (
            <div key={index} className="grid grid-cols-[1fr_auto] items-center gap-3">
              <div className="space-y-1.5">
                <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                  {metric?.category}
                </p>
                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[#d1d5db]">
                  <div
                    className="h-full rounded-full bg-[#0C1412] transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <p className="text-base font-semibold text-[#0C1412]">
                {Number.isFinite(rating) ? rating.toFixed(1) : "-"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OverallRatingCard({ label, value, note }) {
  if (!value) return null;
  return (
    <div className="rounded-lg bg-white p-5 sm:p-6 text-left">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6b7280]">
        {label}
      </p>
      <p className="mt-2 text-4xl font-bold leading-none text-[#0C1412]">{value}</p>
      {note && (
        <p className="mt-3 text-sm leading-normal text-black sm:text-base tracking-wide text-left">
          {renderMarkdownBold(note)}
        </p>
      )}
    </div>
  );
}

function toLabeledLine(label, value) {
  if (Array.isArray(value) && value.length > 0) {
    return `**${label}:** ${value.join(", ")}`;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    return `**${label}:** ${value.trim()}`;
  }
  return null;
}

function renderParagraphs(value) {
  if (Array.isArray(value)) {
    return value.map((paragraph, index) => (
      <p
        key={index}
        className="text-base leading-normal text-black sm:text-base tracking-wide text-left"
      >
        {renderMarkdownBold(paragraph)}
      </p>
    ));
  }
  if (typeof value === "string" && value.trim().length) {
    return (
      <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
        {renderMarkdownBold(value)}
      </p>
    );
  }
  return null;
}

function renderLabeledParagraph(label, value) {
  if (Array.isArray(value) && value.length > 0) {
    return (
      <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
        <strong>{label}:</strong> {value.join(", ")}
      </p>
    );
  }
  if (typeof value === "string" && value.trim().length > 0) {
    return (
      <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
        <strong>{label}:</strong> {renderMarkdownBold(value)}
      </p>
    );
  }
  return null;
}

function safeString(value) {
  return typeof value === "string" && value.trim().length
    ? value.trim()
    : null;
}

function renderMarkdownBold(text) {
  if (typeof text !== "string") return text;
  const parts = [];
  let lastIndex = 0;
  const regex = /\*\*(.+?)\*\*/g;
  let match;

  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index));
    parts.push(<strong key={match.index}>{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.substring(lastIndex));
  return parts.length > 0 ? parts : text;
}
