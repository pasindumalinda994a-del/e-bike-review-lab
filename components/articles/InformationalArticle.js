import Image from "next/image";
import Link from "next/link";

// Helper function to safely extract string values
const safeString = (value) =>
  typeof value === "string" && value.trim().length ? value.trim() : null;

// Helper to convert markdown bold (**text**) to React elements
const renderMarkdownBold = (text) => {
  if (typeof text !== "string") return text;
  
  const parts = [];
  let lastIndex = 0;
  const regex = /\*\*(.+?)\*\*/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Add the bold text
    parts.push(<strong key={match.index}>{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
};

// Helper to extract sections by title pattern
const findSectionByTitle = (sections, patterns) => {
  if (!Array.isArray(sections)) return null;
  return sections.find((section) => {
    const title = section.title ?? section.heading ?? "";
    return patterns.some((pattern) =>
      title.toLowerCase().includes(pattern.toLowerCase())
    );
  });
};

// Helper to extract bullet text from various formats
const extractBulletText = (bullet) => {
  if (typeof bullet === "string") return bullet;
  if (bullet?.text) return bullet.text;
  if (bullet?.label) return bullet.label;
  return "";
};

// Helper to normalize comparison table data
const normalizeComparisonTable = (table) => {
  if (!table) return null;
  
  // If it's already in object format with headers/rows
  if (table.headers && table.rows) return table;
  
  // If it's an array of objects (from money.js structure)
  if (Array.isArray(table) && table.length > 0) {
    const firstItem = table[0];
    const headers = Object.keys(firstItem);
    const rows = table.map((item) => headers.map((key) => item[key] ?? ""));
    return { headers, rows };
  }
  
  return null;
};

// 1. Headline + Sub-headline Section
function HeadlineSection({ headline, subheadline, category, publishedDate, readingTime }) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-gradient-to-br from-[#0C1412] via-[#1a1a2e] to-[#16213e] px-6 py-12 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      
      <div className="relative mx-auto max-w-4xl space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-wide text-white/60">
          {category && (
            <>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                {category}
              </span>
              <span className="text-white/20">•</span>
            </>
          )}
          {publishedDate && <span>{publishedDate}</span>}
          {readingTime && (
            <>
              <span className="text-white/20">•</span>
              <span>{readingTime} min read</span>
            </>
          )}
        </div>

        {headline && (
          <h1 className="text-3xl font-bold leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {headline}
          </h1>
        )}

        {subheadline && (
          <p className="text-lg leading-relaxed text-white/85 sm:text-xl md:text-2xl">
            {subheadline}
          </p>
        )}
      </div>
    </header>
  );
}

// 2. Opening / Hook Section
function OpeningSection({ hook, context, expectation, introductionParagraphs = [] }) {
  if (!hook && !context && !expectation && !introductionParagraphs.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-8 py-8">
      {context && (
        <p className="text-lg leading-[1.8] text-[#1f2937] sm:text-xl">
          {context}
        </p>
      )}

      {introductionParagraphs.length > 0 && (
        <div className="space-y-4">
          {introductionParagraphs.map((paragraph, index) => (
            <p key={index} className="text-lg leading-[1.8] text-[#1f2937] sm:text-xl">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {hook && (
        <blockquote className="relative border-l-4 border-[#3e3ce7] bg-[#f9fafb] pl-6 pr-4 py-6 sm:pl-8 sm:py-8">
          <span className="absolute left-0 top-0 text-6xl font-serif leading-none text-[#3e3ce7]/10">
            &ldquo;
          </span>
          <p className="relative text-lg font-medium leading-[1.7] text-[#111827] sm:text-xl">
            {hook}
          </p>
        </blockquote>
      )}

      {expectation && (
        <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 sm:p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#3e3ce7]">
            What You&rsquo;ll Learn
          </p>
          <p className="text-base leading-[1.75] text-[#374151] sm:text-lg">
            {expectation}
          </p>
        </div>
      )}
    </section>
  );
}

// 3. What is it / How it works Section
function WhatIsItSection({ heading, definition, types, whyConsider }) {
  // Only show if there's actual content, not just a heading
  if (!definition && !types?.length && !whyConsider) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-12 py-12">
      {heading && (
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
            Understanding
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl">
            {heading}
          </h2>
        </header>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {definition && (
          <div className="group rounded-xl border border-[#e5e7eb] bg-white p-6 transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-md sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3e3ce7]/10 text-sm font-semibold text-[#3e3ce7]">
                01
              </span>
              <h3 className="text-xl font-semibold text-[#111827]">
                What It Is
              </h3>
            </div>
            <p className="text-base leading-[1.75] text-[#4b5563]">
              {definition}
            </p>
          </div>
        )}

        {types?.length ? (
          <div className="group rounded-xl border border-[#e5e7eb] bg-white p-6 transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-md sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3e3ce7]/10 text-sm font-semibold text-[#3e3ce7]">
                02
              </span>
              <h3 className="text-xl font-semibold text-[#111827]">
                Types & Variants
              </h3>
            </div>
            <ul className="space-y-3">
              {types.map((type, index) => {
                const typeText = extractBulletText(type);
                if (!typeText) return null;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3e3ce7]" />
                    <span className="text-base leading-[1.7] text-[#4b5563]">{renderMarkdownBold(typeText)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>

      {whyConsider && (
        <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 sm:p-8">
          <h3 className="mb-4 text-xl font-semibold text-[#111827]">
            Why People Consider It
          </h3>
          <p className="text-base leading-[1.75] text-[#4b5563]">
            {whyConsider}
          </p>
        </div>
      )}
    </section>
  );
}

// 4. Advantages / Benefits Section
function AdvantagesSection({ heading, benefits = [], paragraphs = [] }) {
  if (!heading && !benefits.length && !paragraphs.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      {heading && (
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
            Benefits
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl">
            {heading}
          </h2>
        </header>
      )}

      {paragraphs.length > 0 && (
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg leading-[1.8] text-[#1f2937] sm:text-xl">
              {renderMarkdownBold(paragraph)}
            </p>
          ))}
        </div>
      )}

      {benefits.length > 0 && (
      <div className="grid gap-5 sm:grid-cols-2">
        {benefits.map((benefit, index) => {
          const benefitText = extractBulletText(benefit);
          if (!benefitText) return null;
          return (
            <div
              key={index}
              className="group rounded-xl border border-[#e5e7eb] bg-white p-5 transition-all duration-300 hover:border-green-200 hover:bg-green-50/50 hover:shadow-sm sm:p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              </div>
              <p className="text-sm leading-[1.7] text-[#374151] sm:text-base">
                {renderMarkdownBold(benefitText)}
              </p>
            </div>
          );
        })}
      </div>
      )}
    </section>
  );
}

// 5. Drawbacks / Things to Consider Section
function DrawbacksSection({ heading, drawbacks = [], paragraphs = [] }) {
  if (!heading && !drawbacks.length && !paragraphs.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      {heading && (
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
            Considerations
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl">
            {heading}
          </h2>
        </header>
      )}

      {paragraphs.length > 0 && (
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg leading-[1.8] text-[#1f2937] sm:text-xl">
              {renderMarkdownBold(paragraph)}
            </p>
          ))}
        </div>
      )}

      {drawbacks.length > 0 && (
      <div className="grid gap-5 sm:grid-cols-2">
        {drawbacks.map((drawback, index) => {
          const drawbackText = extractBulletText(drawback);
          if (!drawbackText) return null;
          return (
            <div
              key={index}
              className="group rounded-xl border border-[#e5e7eb] bg-white p-5 transition-all duration-300 hover:border-amber-200 hover:bg-amber-50/50 hover:shadow-sm sm:p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </span>
              </div>
              <p className="text-sm leading-[1.7] text-[#374151] sm:text-base">
                {renderMarkdownBold(drawbackText)}
              </p>
            </div>
          );
        })}
      </div>
      )}
    </section>
  );
}

// 6. How to Decide / Choose the Right One Section
function HowToDecideSection({ heading, checklist = [], selfAudit, paragraphs = [] }) {
  if (!heading && !checklist.length && !selfAudit && !paragraphs.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      {heading && (
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
            Decision Guide
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl">
            {heading}
          </h2>
        </header>
      )}

      {paragraphs.length > 0 && (
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg leading-[1.8] text-[#1f2937] sm:text-xl">
              {renderMarkdownBold(paragraph)}
            </p>
          ))}
        </div>
      )}

      {checklist.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {checklist.map((item, index) => {
            const itemText = extractBulletText(item);
            if (!itemText) return null;
            return (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-[#e5e7eb] bg-white p-5 transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-sm sm:p-6"
              >
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#3e3ce7]/10 text-sm font-semibold text-[#3e3ce7]">
                  {index + 1}
                </span>
                <p className="flex-1 text-base leading-[1.75] text-[#374151]">
                  {renderMarkdownBold(itemText)}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}

      {selfAudit && (
        <div className="rounded-xl border-2 border-[#3e3ce7]/20 bg-gradient-to-br from-[#3e3ce7]/5 to-white p-6 sm:p-8">
          <h3 className="mb-4 text-xl font-semibold text-[#111827]">
            Self-Audit Questions
          </h3>
          <p className="text-base leading-[1.75] text-[#4b5563]">
            {selfAudit}
          </p>
        </div>
      )}
    </section>
  );
}

// Generic Core Section Component (for sections like "You Should Get", etc.)
function GenericCoreSection({ title, paragraphs = [], bullets = [] }) {
  if (!title && !paragraphs.length && !bullets.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      {title && (
        <header className="space-y-3">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl">
            {title}
          </h2>
        </header>
      )}

      {paragraphs.length > 0 && (
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg leading-[1.8] text-[#1f2937] sm:text-xl">
              {renderMarkdownBold(paragraph)}
            </p>
          ))}
        </div>
      )}

      {bullets.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {bullets.map((bullet, index) => {
            const bulletText = extractBulletText(bullet);
            if (!bulletText) return null;
            return (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-[#e5e7eb] bg-white p-5 transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-sm sm:p-6"
              >
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#3e3ce7]/10 text-sm font-semibold text-[#3e3ce7]">
                  {index + 1}
                </span>
                <p className="flex-1 text-base leading-[1.75] text-[#374151]">
                  {renderMarkdownBold(bulletText)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// Takeaway Section Component
function TakeawaySection({ heading, bullets = [] }) {
  if (!heading && !bullets.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      {heading && (
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
            Key Takeaways
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl">
            {heading}
          </h2>
        </header>
      )}

      {bullets.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {bullets.map((bullet, index) => {
            const bulletText = extractBulletText(bullet);
            if (!bulletText) return null;
            return (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-[#e5e7eb] bg-white p-5 transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-sm sm:p-6"
              >
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#3e3ce7]/10 text-sm font-semibold text-[#3e3ce7]">
                  {index + 1}
                </span>
                <p className="flex-1 text-base leading-[1.75] text-[#374151]">
                  {renderMarkdownBold(bulletText)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// 7. Final Verdict / Summary Section
function FinalVerdictSection({ heading, summary, verdict, paragraphs = [] }) {
  if (!heading && !summary && !verdict && !paragraphs.length) return null;

  return (
    <section className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#e5e7eb] bg-gradient-to-br from-[#0C1412] via-[#1a1a2e] to-[#16213e] p-8 text-white shadow-lg sm:p-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      
      <div className="relative space-y-6">
        {heading && (
          <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            {heading}
          </h2>
        )}
        {summary && (
          <p className="text-lg leading-[1.8] text-white/95 sm:text-xl">
            {summary}
          </p>
        )}
        {paragraphs.length > 0 && (
          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg leading-[1.8] text-white/95 sm:text-xl">
                {renderMarkdownBold(paragraph)}
              </p>
            ))}
          </div>
        )}
        {verdict && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
            <p className="text-base leading-[1.75] text-white/90 sm:text-lg">
              {verdict}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// 8. Call to Action / Reader Engagement Section
function CallToActionSection({ heading, actions = [], inviteText, resources = [] }) {
  if (!heading && !actions.length && !inviteText && !resources.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      {heading && (
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
            Next Steps
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl">
            {heading}
          </h2>
        </header>
      )}

      {inviteText && (
        <p className="text-lg leading-[1.8] text-[#374151] sm:text-xl">
          {inviteText}
        </p>
      )}

      {actions.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {actions.map((action, index) => {
            const actionText = extractBulletText(action);
            if (!actionText) return null;
            return (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-[#e5e7eb] bg-white p-5 transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-sm sm:p-6"
              >
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#3e3ce7] text-xs font-semibold text-white">
                  →
                </span>
                <p className="flex-1 text-base leading-[1.75] text-[#374151]">
                  {renderMarkdownBold(actionText)}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}

      {resources.length ? (
        <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 sm:p-8">
          <h3 className="mb-5 text-xl font-semibold text-[#111827]">
            Further Reading & Resources
          </h3>
          <ul className="space-y-3">
            {resources.map((resource, index) => {
              const url = resource.url ?? resource.href ?? "#";
              const title = resource.title ?? resource.label ?? `Resource ${index + 1}`;
              return (
                <li key={index}>
                  <Link
                    href={url}
                    className="group inline-flex items-center gap-2 text-base font-medium text-[#3e3ce7] transition-colors hover:text-[#111827]"
                  >
                    <span className="border-b border-transparent group-hover:border-[#3e3ce7]">
                      {title}
                    </span>
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

// 9. Optional Extras / Enhancements Section
function OptionalExtrasSection({ pulloutQuotes = [], didYouKnow = [], comparisonTable }) {
  if (!pulloutQuotes.length && !didYouKnow.length && !comparisonTable) return null;

  const normalizedTable = normalizeComparisonTable(comparisonTable);

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      {pulloutQuotes.length ? (
        <div className="space-y-6">
          {pulloutQuotes.map((quote, index) => {
            const quoteText = typeof quote === "string" ? quote : quote?.text ?? "";
            if (!quoteText) return null;
            return (
              <blockquote
                key={index}
                className="relative border-l-4 border-[#3e3ce7] bg-[#f9fafb] pl-6 pr-4 py-6 sm:pl-8 sm:py-8"
              >
                <span className="absolute left-0 top-0 text-6xl font-serif leading-none text-[#3e3ce7]/10">
                  &ldquo;
                </span>
                <p className="relative text-lg font-medium italic leading-[1.7] text-[#111827] sm:text-xl">
                  {quoteText}
                </p>
              </blockquote>
            );
          })}
        </div>
      ) : null}

      {didYouKnow.length ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {didYouKnow.map((fact, index) => {
            const factText = typeof fact === "string" ? fact : fact?.text ?? "";
            const factTitle = typeof fact === "object" ? fact?.title ?? "Did You Know?" : "Did You Know?";
            if (!factText) return null;
            return (
              <div
                key={index}
                className="rounded-xl border border-[#e5e7eb] bg-gradient-to-br from-[#3e3ce7]/5 to-white p-5 sm:p-6"
              >
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
                  {factTitle}
                </h4>
                <p className="text-sm leading-[1.7] text-[#4b5563] sm:text-base">
                  {factText}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}

      {normalizedTable ? (
        <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  {normalizedTable.headers?.map((header, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-sm font-semibold text-[#111827] first:pl-6"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {normalizedTable.rows?.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-t border-[#e5e7eb] transition-colors hover:bg-[#f9fafb]"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-3 text-sm leading-[1.6] text-[#4b5563] first:pl-6"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}

// Main Component
export default function InformationalArticle({
  post,
  publishedDate,
  heroImage,
  supportingProducts = [],
}) {
  // ===== HEADLINE & SUBHEADLINE =====
  const headline = safeString(post.h1) ?? safeString(post.title);
  const subheadline = safeString(post.subheadline) ?? safeString(post.subtitle);

  // ===== OPENING / HOOK DATA =====
  // Support both informational.js and money.js structures
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

  const allIntroductionParagraphs = [...introductionParagraphs, ...secondaryParagraphs];

  const openingContext = safeString(post.openingContext) ?? safeString(post.introduction);
  const openingHook = safeString(post.introductionHook) ?? safeString(post.hook) ?? safeString(post.snippetAnswer);
  const openingExpectation = safeString(post.roadmap) ?? safeString(post.introductionRoadmap) ?? safeString(post.expectation);

  // ===== WHAT IS IT / HOW IT WORKS =====
  const whatIsItHeading = safeString(post.whatIsItHeading) ?? "What Is It & How It Works";
  const whatIsItDefinition = safeString(post.whatIsItDefinition) ?? safeString(post.definition);
  const whatIsItTypes = Array.isArray(post.types) ? post.types : [];
  const whatIsItWhyConsider = safeString(post.whyConsider);

  // ===== CORE HEADING =====
  const coreHeading = safeString(post.coreHeading);

  // ===== ADVANTAGES / BENEFITS =====
  // Extract from coreSections (informational.js) or direct fields
  const prosSection = findSectionByTitle(post.coreSections, ["pros", "benefits", "advantages", "why", "the pros"]);
  const advantagesHeading = safeString(post.advantagesHeading) ?? prosSection?.title ?? "Advantages & Benefits";
  const advantages = prosSection?.bullets ?? post.advantages ?? post.benefits ?? [];
  const advantagesParagraphs = prosSection?.paragraphs ?? [];

  // ===== DRAWBACKS / CONSIDERATIONS =====
  const consSection = findSectionByTitle(post.coreSections, ["cons", "drawbacks", "disadvantages", "considerations", "the cons"]);
  const drawbacksHeading = safeString(post.drawbacksHeading) ?? consSection?.title ?? "Drawbacks & Things to Consider";
  const drawbacks = consSection?.bullets ?? post.drawbacks ?? post.cons ?? [];
  const drawbacksParagraphs = consSection?.paragraphs ?? [];

  // ===== HOW TO DECIDE / CHOOSE =====
  const decideSection = findSectionByTitle(post.coreSections, ["how to choose", "how to decide", "choose the right", "decision"]);
  const decideHeading = safeString(post.decideHeading) ?? decideSection?.title ?? "How to Decide & Choose the Right One";
  const decideChecklist = decideSection?.bullets ?? post.checklist ?? post.decisionFactors ?? [];
  const decideSelfAudit = safeString(post.selfAudit) ?? safeString(decideSection?.selfAudit);
  const decideParagraphs = decideSection?.paragraphs ?? [];

  // ===== FINAL VERDICT / SUMMARY =====
  const verdictSection = findSectionByTitle(post.coreSections, ["bottom line", "final verdict", "summary", "conclusion", "verdict", "the bottom line"]);
  const verdictHeading = safeString(post.verdictHeading) ?? verdictSection?.title ?? "Final Verdict";
  const verdictSummary = safeString(post.verdictSummary) ?? safeString(verdictSection?.summary);
  const verdictParagraphs = Array.isArray(verdictSection?.paragraphs) ? verdictSection.paragraphs : [];
  const verdictText = safeString(post.verdict) ?? safeString(verdictSection?.verdict);

  // ===== YOU SHOULD GET / YOU PROBABLY SHOULDN'T GET =====
  const shouldGetSection = findSectionByTitle(post.coreSections, ["you should get", "you should", "should get"]);
  const shouldntGetSection = findSectionByTitle(post.coreSections, ["you probably shouldn't", "you shouldn't", "shouldn't get", "probably shouldn't"]);

  // ===== CALL TO ACTION =====
  const ctaSection = findSectionByTitle(post.coreSections, ["next steps", "call to action", "your next", "action"]);
  const ctaHeading = safeString(post.ctaHeading) ?? ctaSection?.title ?? "Your Next Steps";
  const ctaActions = ctaSection?.bullets ?? post.ctaActions ?? post.nextSteps ?? [];
  const ctaInviteText = safeString(post.ctaInviteText) ?? safeString(ctaSection?.inviteText);
  const ctaResources = post.relatedGuides ?? post.resources ?? [];
  const ctaParagraphs = ctaSection?.paragraphs ?? [];

  // ===== TAKEAWAYS =====
  const takeawayHeading = safeString(post.takeawayHeading);
  const takeawayBullets = post.takeawayBullets ?? [];

  // ===== OPTIONAL EXTRAS =====
  const pulloutQuotes = post.pulloutQuotes ?? [];
  const didYouKnow = post.didYouKnow ?? post.facts ?? [];
  const comparisonTable = post.comparisonTable ?? null;

  // ===== HERO IMAGE =====
  const heroImageAlt = safeString(post.heroImageAlt) ?? headline;
  const articleHeroImage =
    heroImage ??
    safeString(post.articleHeroImage) ??
    "/default-og.png";

  // ===== TOP PRODUCTS INTRO (for money articles) =====
  const topProductsIntro = safeString(post.topProductsIntro);

  return (
    <article className="mx-auto max-w-5xl space-y-16 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* 1. Headline + Sub-headline */}
      <HeadlineSection
        headline={headline}
        subheadline={subheadline}
        category={post.category}
        publishedDate={publishedDate}
        readingTime={post.estimatedReadingTime}
      />

      {/* 2. Opening / Hook */}
      <OpeningSection
        hook={openingHook}
        context={openingContext}
        expectation={openingExpectation}
        introductionParagraphs={allIntroductionParagraphs}
      />

      {/* Hero Image */}
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

      {/* Top Products Intro (for money articles) */}
      {topProductsIntro && (
        <section className="mx-auto max-w-4xl rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 sm:p-8">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-[#3e3ce7]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
              What to Expect
            </span>
            <p className="text-base leading-[1.75] text-[#374151] sm:text-lg">
              {topProductsIntro}
            </p>
          </div>
        </section>
      )}

      {/* 3. What is it / How it works */}
      <WhatIsItSection
        heading={whatIsItHeading}
        definition={whatIsItDefinition}
        types={whatIsItTypes}
        whyConsider={whatIsItWhyConsider}
      />

      {/* Core Heading */}
      {coreHeading && (
        <section className="mx-auto max-w-4xl py-8">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl">
            {coreHeading}
          </h2>
        </section>
      )}

      {/* 4. Advantages / Benefits */}
      <AdvantagesSection
        heading={advantagesHeading}
        benefits={advantages}
        paragraphs={advantagesParagraphs}
      />

      {/* 5. Drawbacks / Things to consider */}
      <DrawbacksSection
        heading={drawbacksHeading}
        drawbacks={drawbacks}
        paragraphs={drawbacksParagraphs}
      />

      {/* You Should Get Section */}
      {shouldGetSection && (
        <GenericCoreSection
          title={shouldGetSection.title}
          paragraphs={shouldGetSection.paragraphs ?? []}
          bullets={shouldGetSection.bullets ?? []}
        />
      )}

      {/* You Probably Shouldn't Get Section */}
      {shouldntGetSection && (
        <GenericCoreSection
          title={shouldntGetSection.title}
          paragraphs={shouldntGetSection.paragraphs ?? []}
          bullets={shouldntGetSection.bullets ?? []}
        />
      )}

      {/* 6. How to decide / Choose the right one */}
      <HowToDecideSection
        heading={decideHeading}
        checklist={decideChecklist}
        selfAudit={decideSelfAudit}
        paragraphs={decideParagraphs}
      />

      {/* 7. Final Verdict / Summary */}
      <FinalVerdictSection
        heading={verdictHeading}
        summary={verdictSummary}
        verdict={verdictText}
        paragraphs={verdictParagraphs}
      />

      {/* 8. Call to Action / Reader Engagement */}
      <CallToActionSection
        heading={ctaHeading}
        actions={ctaActions}
        inviteText={ctaInviteText}
        resources={ctaResources}
      />

      {/* 9. Optional Extras / Enhancements */}
      <OptionalExtrasSection
        pulloutQuotes={pulloutQuotes}
        didYouKnow={didYouKnow}
        comparisonTable={comparisonTable}
      />

      {/* Takeaway Section */}
      <TakeawaySection
        heading={takeawayHeading}
        bullets={takeawayBullets}
      />

      {/* Supporting Products (if any) */}
      {supportingProducts.length ? (
        <section className="mx-auto max-w-4xl space-y-6 py-12">
          <h2 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
            Featured Products
          </h2>
          <ul className="grid gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
            {supportingProducts.map((product) => (
              <li key={product.id} className="space-y-2">
                <h3 className="text-base font-semibold text-[#111827] sm:text-lg">
                  {product.name}
                </h3>
                {product.description ? (
                  <p className="text-sm leading-[1.7] text-[#6b7280] sm:text-base">
                    {product.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* FAQs Section */}
      {post.contextFAQs?.length ? (
        <section className="mx-auto max-w-4xl space-y-8 py-12">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
              Common Questions
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl">
              {safeString(post.contextHeading) ?? "Frequently Asked Questions"}
            </h2>
          </header>
          <div className="space-y-3">
            {post.contextFAQs.map((faq, index) => {
              const question =
                faq?.question ??
                faq?.heading ??
                faq?.title ??
                `FAQ ${index + 1}`;
              const answer = faq?.answer ?? faq?.response ?? "";
              const cta =
                faq?.cta ??
                (faq?.ctaHref
                  ? { href: faq.ctaHref, label: faq.ctaLabel ?? "Learn more" }
                  : null);

              const summaryId = `faq-summary-${index}`;
              const contentId = `faq-panel-${index}`;

              return (
                <details
                  key={question}
                  className="group rounded-xl border border-[#e5e7eb] bg-white p-5 transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-sm sm:p-6"
                >
                  <summary
                    id={summaryId}
                    className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold text-[#111827] transition-colors hover:text-[#3e3ce7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7] focus-visible:ring-offset-2 sm:text-lg"
                  >
                    <span>{question}</span>
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] text-sm text-[#6b7280] transition-all group-open:rotate-45 group-open:border-[#3e3ce7] group-open:text-[#3e3ce7]">
                      +
                    </span>
                  </summary>
                  {answer ? (
                    <div
                      id={contentId}
                      role="region"
                      aria-labelledby={summaryId}
                      className="mt-4 space-y-4 text-sm leading-[1.75] text-[#4b5563] sm:text-base"
                    >
                      <p>{answer}</p>
                      {cta ? (
                        <Link
                          href={cta.href}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#3e3ce7] transition-colors hover:text-[#111827]"
                        >
                          {cta.label}
                          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </details>
              );
            })}
          </div>
        </section>
      ) : null}
    </article>
  );
}
