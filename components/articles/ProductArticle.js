import Image from "next/image";
import Link from "next/link";

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
  const affiliateLink = safeString(post.affiliateLink);
  const badge = safeString(post.badge);
  const ctaLabel = safeString(post.ctaLabel) ?? "Check Current Price";

  return (
    <article className="mx-auto max-w-6xl space-y-16 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="relative overflow-hidden rounded-3xl border border-[#0C1412]/10 bg-gradient-to-br from-[#0C1412] via-[#1a1a2e] to-[#16213e] px-6 py-12 text-white shadow-xl sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <BackgroundPattern />

        <div className="relative mx-auto max-w-5xl space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-wide text-white/60">
            {post.category && (
              <>
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-white/40"
                    aria-hidden="true"
                  />
                  {post.category}
                </span>
                <span className="text-white/20" aria-hidden="true">
                  •
                </span>
              </>
            )}
            {publishedDate && (
              <time
                dateTime={
                  post.publishedAt
                    ? new Date(post.publishedAt).toISOString()
                    : undefined
                }
              >
                {publishedDate}
              </time>
            )}
            {post.estimatedReadingTime && (
              <>
                <span className="text-white/20" aria-hidden="true">
                  •
                </span>
                <span>{post.estimatedReadingTime} min read</span>
              </>
            )}
          </div>

          {headline && (
            <h1 className="text-3xl font-bold leading-[1.2] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {headline}
            </h1>
          )}

          {(introduction.thesis || introduction.paragraphs?.length) && (
            <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 text-base leading-[1.75] tracking-[0.01em] text-white/90 backdrop-blur-sm sm:p-8 sm:text-lg">
              {introduction.thesis && (
                <p className="text-lg font-semibold sm:text-xl">
                  {introduction.thesis}
                </p>
              )}
              {Array.isArray(introduction.paragraphs) &&
                introduction.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          )}
        </div>
      </header>

      <figure className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#0C1412]/10 bg-white shadow-lg">
        <div className="aspect-[4/3] w-full">
          <Image
            src={articleHeroImage}
            alt={heroImageAlt}
            fill
            sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
            className="object-cover"
            priority
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k="
          />
        </div>
        {badge && (
          <div className="absolute left-0 top-0 z-10 rounded-br-xl bg-gradient-to-r from-[#0C1412]/95 to-[#1a1a2e]/95 px-3 py-1.5 shadow-lg backdrop-blur-sm sm:px-4 sm:py-2">
            <span className="text-xs font-semibold text-white sm:text-sm">{badge}</span>
          </div>
        )}
        {heroImageAlt && (
          <figcaption className="sr-only">{heroImageAlt}</figcaption>
        )}
      </figure>

      {affiliateLink && (
        <div className="mx-auto max-w-5xl">
          <a
            href={affiliateLink}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="group inline-flex items-center justify-start gap-2 rounded-full bg-[#3e3ce7] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#3e3ce7]/30 transition-all duration-300 hover:bg-[#3e3ce7]/90 hover:shadow-xl hover:shadow-[#3e3ce7]/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#3e3ce7] focus:ring-offset-2 sm:px-8 sm:py-4 sm:text-lg"
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
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}

      {(introduction.heading || introduction.paragraphs?.length) && (
        <ContentSection
          label="Introduction"
          title={introduction.heading}
          paragraphs={introduction.paragraphs}
        />
      )}

      {(specs.heading || specs.items?.length) && (
        <section className="mx-auto max-w-5xl space-y-6">
          <SectionHeader
            label="Specifications Overview"
            title={specs.heading || "Specifications & Key Details"}
          />
          {Array.isArray(specs.items) && specs.items.length > 0 && (
            <dl className="grid gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-6 text-sm text-[#111827] shadow-sm sm:grid-cols-2 sm:p-8 sm:text-base">
              {specs.items.map((item, index) => {
                if (!item?.label && !item?.value) return null;
                return (
                  <div key={index} className="space-y-1">
                    {item.label && (
                      <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6b7280]">
                        {item.label}
                      </dt>
                    )}
                    {item.value && (
                      <dd className="font-medium text-[#111827]">
                        {item.value}
                      </dd>
                    )}
                  </div>
                );
              })}
            </dl>
          )}
        </section>
      )}

      {imagePrimary?.image && (
        <ImageSection
          heading={imagePrimary.heading}
          description={imagePrimary.description}
          image={imagePrimary.image}
          alt={imagePrimary.alt || headline || ""}
        />
      )}

      {(designAndBuild.heading || designAndBuild.paragraphs?.length) && (
        <ContentSection
          label="Design & Build Quality"
          title={designAndBuild.heading}
          paragraphs={designAndBuild.paragraphs}
        />
      )}

      {(features.heading || features.groups?.length) && (
        <section className="mx-auto max-w-5xl space-y-6">
          <SectionHeader
            label="Features"
            title={features.heading || "Features Breakdown"}
          />
          {Array.isArray(features.groups) && features.groups.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {features.groups.map((group, index) => (
                <div
                  key={group?.title || index}
                  className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:p-7"
                >
                  {group?.title && (
                    <h3 className="mb-3 text-lg font-semibold text-[#111827] sm:text-xl">
                      {group.title}
                    </h3>
                  )}
                  {Array.isArray(group?.bullets) && group.bullets.length > 0 && (
                    <ul className="space-y-2 text-sm leading-[1.7] tracking-[0.01em] text-[#4b5563] sm:text-base">
                      {group.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3e3ce7]" />
                          <span>{renderMarkdownBold(bullet)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {(performance.heading || performance.paragraphs?.length) && (
        <ContentSection
          label="Performance Testing"
          title={performance.heading}
          paragraphs={performance.paragraphs}
        />
      )}

      {imageSecondary?.image && (
        <ImageSection
          heading={imageSecondary.heading}
          description={imageSecondary.description}
          image={imageSecondary.image}
          alt={imageSecondary.alt || headline || ""}
        />
      )}

      {(userExperience.heading || userExperience.paragraphs?.length) && (
        <ContentSection
          label="User Experience"
          title={userExperience.heading}
          paragraphs={userExperience.paragraphs}
        />
      )}

      {(comparisons.heading || comparisons.paragraphs?.length) && (
        <ContentSection
          label="Comparisons"
          title={comparisons.heading}
          paragraphs={comparisons.paragraphs}
        />
      )}

      {whoItsBestFor?.text && (
        <section className="mx-auto max-w-5xl space-y-6">
          <SectionHeader
            label="Who It's Best For"
            title="Who This Product Is Best For"
          />
          <div className="rounded-2xl border-2 border-[#3e3ce7]/20 bg-gradient-to-br from-[#3e3ce7]/5 to-white p-6 shadow-sm sm:p-8">
            <p className="text-base leading-[1.75] tracking-[0.01em] text-[#4b5563] sm:text-lg">
              {whoItsBestFor.text}
            </p>
          </div>
        </section>
      )}

      {(prosCons.heading || prosCons.pros?.length || prosCons.cons?.length) && (
        <section className="mx-auto max-w-5xl space-y-8">
          <SectionHeader
            label="Pros & Cons"
            title={prosCons.heading || "Pros & Cons"}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {Array.isArray(prosCons.pros) && prosCons.pros.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-green-700">
                  Pros
                </h4>
                <div className="space-y-3">
                  {prosCons.pros.map((text, index) => (
                    <BenefitCard key={index} text={text} type="benefit" />
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(prosCons.cons) && prosCons.cons.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-amber-700">
                  Cons
                </h4>
                <div className="space-y-3">
                  {prosCons.cons.map((text, index) => (
                    <BenefitCard key={index} text={text} type="drawback" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {(conclusion.heading ||
        conclusion.verdict ||
        conclusion.paragraphs?.length) && (
        <section className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#0C1412]/10 bg-gradient-to-br from-[#0C1412] via-[#1a1a2e] to-[#16213e] p-8 text-white shadow-xl sm:p-12">
          <BackgroundPattern />

          <div className="relative space-y-6">
            {conclusion.heading && (
              <h2 className="text-3xl font-bold leading-[1.25] tracking-[-0.01em] text-white sm:text-4xl">
                {conclusion.heading}
              </h2>
            )}
            {Array.isArray(conclusion.paragraphs) &&
              conclusion.paragraphs.length > 0 && (
                <div className="space-y-4">
                  {conclusion.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-lg leading-[1.75] tracking-[0.01em] text-white/95 sm:text-xl"
                    >
                      {renderMarkdownBold(paragraph)}
                    </p>
                  ))}
                </div>
              )}
            {conclusion.verdict && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
                <p className="text-base leading-[1.75] tracking-[0.01em] text-white/90 sm:text-lg">
                  {conclusion.verdict}
                </p>
              </div>
            )}
            {affiliateLink && (
              <div className="pt-4">
                <a
                  href={affiliateLink}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  className="group inline-flex items-center justify-start gap-2 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-[#3e3ce7] shadow-lg shadow-white/20 transition-all duration-300 hover:bg-white/95 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1a1a2e] sm:px-8 sm:py-4 sm:text-lg"
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
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </section>
      )}

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
                          <p key={pIndex}>{paragraph}</p>
                        ))
                      ) : (
                        <p>{answer}</p>
                      )}
                    </div>
                  )}
                </details>
              );
            })}
          </div>
        </section>
      )}

      {post.internalLinks && Array.isArray(post.internalLinks) && post.internalLinks.length > 0 && post.internalLinksTitle && (
        <section className="mx-auto max-w-5xl space-y-4 py-12" aria-labelledby="related-content">
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
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <div className="flex-1">
                      <p className="font-semibold text-[#111827] transition-colors group-hover:text-[#3e3ce7]">
                        {link.text}
                      </p>
                      {link.description && (
                        <p className="mt-1 text-sm text-[#6b7280]">
                          {link.description}
                        </p>
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
            quality={80}
          />
        </div>
        {description && (
          <figcaption className="border-t border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm leading-relaxed text-[#4b5563] sm:px-5 sm:py-4">
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
              className="text-lg leading-[1.75] tracking-[0.01em] text-[#1f2937] sm:text-xl"
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

  const isBenefit = type === "benefit";
  const iconColor = isBenefit ? "text-green-600" : "text-amber-600";
  const bgColor = isBenefit ? "bg-green-100" : "bg-amber-100";
  const hoverBorder = isBenefit ? "hover:border-green-200" : "hover:border-amber-200";
  const hoverBg = isBenefit ? "hover:bg-green-50/50" : "hover:bg-amber-50/50";

  const icon = isBenefit ? (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  ) : (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  );

  return (
    <div
      className={`group rounded-xl border border-[#e5e7eb] bg-white p-5 transition-all duration-300 ${hoverBorder} ${hoverBg} hover:shadow-sm sm:p-6`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${bgColor} ${iconColor}`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon}
          </svg>
        </span>
      </div>
      <p className="text-sm leading-[1.7] tracking-[0.01em] text-[#374151] sm:text-base">
        {renderMarkdownBold(text)}
      </p>
    </div>
  );
}


