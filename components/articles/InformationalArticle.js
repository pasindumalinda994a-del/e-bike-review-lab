import Image from 'next/image';
import Link from 'next/link';

// ============================================================================
// CONSTANTS
// ============================================================================

const BACKGROUND_PATTERN_STYLE = {
  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
  backgroundSize: '40px 40px',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Safely extracts and trims string values.
 * Returns null if value is not a valid non-empty string.
 *
 * @param {unknown} value - Value to extract
 * @returns {string|null} Trimmed string or null
 */
function safeString(value) {
  return typeof value === 'string' && value.trim().length ? value.trim() : null;
}

/**
 * Converts markdown bold syntax (**text**) to React strong elements.
 *
 * @param {unknown} text - Text that may contain markdown bold syntax
 * @returns {React.ReactNode} Text with bold elements rendered
 */
function renderMarkdownBold(text) {
  if (typeof text !== 'string') return text;

  const parts = [];
  let lastIndex = 0;
  const regex = /\*\*(.+?)\*\*/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(<strong key={match.index}>{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

/**
 * Finds a section by matching title patterns.
 *
 * @param {Array<Object>|null} sections - Array of section objects
 * @param {string[]} patterns - Array of title patterns to match
 * @returns {Object|null} Matching section or null
 */
function findSectionByTitle(sections, patterns) {
  if (!Array.isArray(sections)) return null;
  return sections.find((section) => {
    const title = section.title ?? section.heading ?? '';
    return patterns.some((pattern) => title.toLowerCase().includes(pattern.toLowerCase()));
  });
}

/**
 * Extracts text from bullet items that may be in various formats.
 *
 * @param {string|Object} bullet - Bullet item (string or object with text/label)
 * @returns {string} Extracted text
 */
function extractBulletText(bullet) {
  if (typeof bullet === 'string') return bullet;
  if (bullet?.text) return bullet.text;
  if (bullet?.label) return bullet.label;
  return '';
}

/**
 * Normalizes comparison table data to a consistent format.
 *
 * @param {Object|Array|null} table - Table data in various formats
 * @returns {Object|null} Normalized table with headers and rows
 */
function normalizeComparisonTable(table) {
  if (!table) return null;

  if (table.headers && table.rows) return table;

  if (Array.isArray(table) && table.length > 0) {
    const firstItem = table[0];
    const headers = Object.keys(firstItem);
    const rows = table.map((item) => headers.map((key) => item[key] ?? ''));
    return { headers, rows };
  }

  return null;
}

/**
 * Normalizes a value to an array format.
 *
 * @param {unknown} value - Value to normalize
 * @returns {unknown[]} Normalized array
 */
function normalizeToArray(value) {
  if (Array.isArray(value)) return value;
  if (value) return [value];
  return [];
}

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

/**
 * Background pattern overlay component.
 *
 * @returns {JSX.Element} Pattern overlay div
 */
function BackgroundPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={BACKGROUND_PATTERN_STYLE}
      aria-hidden="true"
    />
  );
}

/**
 * Section header component with consistent styling.
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Section label (small text)
 * @param {string} props.title - Section title
 * @returns {JSX.Element} Section header
 */
function SectionHeader({ label, title }) {
  if (!title) return null;

  return (
    <header className="space-y-3">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">{label}</p>
      )}
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl">
        {title}
      </h2>
    </header>
  );
}

/**
 * Reusable numbered card component for checklists and lists.
 *
 * @param {Object} props - Component props
 * @param {string} props.text - Card text content
 * @param {number} props.index - Card index (for numbering)
 * @returns {JSX.Element} Numbered card
 */
function NumberedCard({ text, index }) {
  const displayText = extractBulletText(text);
  if (!displayText) return null;

  return (
    <div className="flex items-start gap-4 rounded-xl border border-[#e5e7eb] bg-white p-5 transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-sm sm:p-6">
      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#3e3ce7]/10 text-sm font-semibold text-[#3e3ce7]">
        {index + 1}
      </span>
      <p className="flex-1 text-base leading-[1.75] text-[#374151]">
        {renderMarkdownBold(displayText)}
      </p>
    </div>
  );
}

/**
 * Reusable benefit/drawback card component.
 *
 * @param {Object} props - Component props
 * @param {string} props.text - Card text
 * @param {'benefit'|'drawback'} props.type - Card type for styling
 * @returns {JSX.Element|null} Benefit/drawback card
 */
function BenefitCard({ text, type }) {
  const displayText = extractBulletText(text);
  if (!displayText) return null;

  const isBenefit = type === 'benefit';
  const config = {
    benefit: {
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverBorder: 'hover:border-green-200',
      hoverBg: 'hover:bg-green-50/50',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
    },
    drawback: {
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-100',
      hoverBorder: 'hover:border-amber-200',
      hoverBg: 'hover:bg-amber-50/50',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      ),
    },
  };

  const { iconColor, bgColor, hoverBorder, hoverBg, icon } = config[type];

  return (
    <div
      className={`group rounded-xl border border-[#e5e7eb] bg-white p-5 transition-all duration-300 ${hoverBorder} ${hoverBg} hover:shadow-sm sm:p-6`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${bgColor} ${iconColor}`}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon}
          </svg>
        </span>
      </div>
      <p className="text-sm leading-[1.7] text-[#374151] sm:text-base">
        {renderMarkdownBold(displayText)}
      </p>
    </div>
  );
}

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

/**
 * Headline section with metadata and title.
 *
 * @param {Object} props - Component props
 * @param {string} props.headline - Main headline
 * @param {string} props.subheadline - Subheadline text
 * @param {string} props.category - Category name
 * @param {string} props.publishedDate - Publication date
 * @param {string} props.readingTime - Estimated reading time
 * @returns {JSX.Element} Headline section
 */
function HeadlineSection({ headline, subheadline, category, publishedDate, readingTime }) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-gradient-to-br from-[#0C1412] via-[#1a1a2e] to-[#16213e] px-6 py-12 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <BackgroundPattern />

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

/**
 * Opening section with hook, context, and expectations.
 *
 * @param {Object} props - Component props
 * @param {string} props.hook - Hook/quote text
 * @param {string} props.context - Context paragraph
 * @param {string} props.expectation - What to expect text
 * @param {string[]} props.introductionParagraphs - Introduction paragraphs
 * @returns {JSX.Element|null} Opening section or null
 */
function OpeningSection({ hook, context, expectation, introductionParagraphs = [] }) {
  if (!hook && !context && !expectation && !introductionParagraphs.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-8 py-8">
      {context && (
        <p className="text-lg leading-[1.8] text-[#1f2937] sm:text-xl">{context}</p>
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
          <p className="text-base leading-[1.75] text-[#374151] sm:text-lg">{expectation}</p>
        </div>
      )}
    </section>
  );
}

/**
 * What is it / How it works section.
 *
 * @param {Object} props - Component props
 * @param {string} props.heading - Section heading
 * @param {string} props.definition - Definition text
 * @param {Array} props.types - Types/variants array
 * @param {string} props.whyConsider - Why consider text
 * @returns {JSX.Element|null} What is it section or null
 */
function WhatIsItSection({ heading, definition, types, whyConsider }) {
  if (!definition && !types?.length && !whyConsider) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-12 py-12">
      {heading && <SectionHeader label="Understanding" title={heading} />}

      <div className="grid gap-6 md:grid-cols-2">
        {definition && (
          <div className="group rounded-xl border border-[#e5e7eb] bg-white p-6 transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-md sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3e3ce7]/10 text-sm font-semibold text-[#3e3ce7]">
                01
              </span>
              <h3 className="text-xl font-semibold text-[#111827]">What It Is</h3>
            </div>
            <p className="text-base leading-[1.75] text-[#4b5563]">{definition}</p>
          </div>
        )}

        {types?.length > 0 && (
          <div className="group rounded-xl border border-[#e5e7eb] bg-white p-6 transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-md sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3e3ce7]/10 text-sm font-semibold text-[#3e3ce7]">
                02
              </span>
              <h3 className="text-xl font-semibold text-[#111827]">Types & Variants</h3>
            </div>
            <ul className="space-y-3">
              {types.map((type, index) => {
                const typeText = extractBulletText(type);
                if (!typeText) return null;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3e3ce7]" />
                    <span className="text-base leading-[1.7] text-[#4b5563]">
                      {renderMarkdownBold(typeText)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {whyConsider && (
        <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 sm:p-8">
          <h3 className="mb-4 text-xl font-semibold text-[#111827]">Why People Consider It</h3>
          <p className="text-base leading-[1.75] text-[#4b5563]">{whyConsider}</p>
        </div>
      )}
    </section>
  );
}

/**
 * Advantages/Benefits section.
 *
 * @param {Object} props - Component props
 * @param {string} props.heading - Section heading
 * @param {Array} props.benefits - Benefits array
 * @param {string[]} props.paragraphs - Paragraph text array
 * @returns {JSX.Element|null} Advantages section or null
 */
function AdvantagesSection({ heading, benefits = [], paragraphs = [] }) {
  if (!heading && !benefits.length && !paragraphs.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      {heading && <SectionHeader label="Benefits" title={heading} />}

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
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} text={benefit} type="benefit" />
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Drawbacks/Considerations section.
 *
 * @param {Object} props - Component props
 * @param {string} props.heading - Section heading
 * @param {Array} props.drawbacks - Drawbacks array
 * @param {string[]} props.paragraphs - Paragraph text array
 * @returns {JSX.Element|null} Drawbacks section or null
 */
function DrawbacksSection({ heading, drawbacks = [], paragraphs = [] }) {
  if (!heading && !drawbacks.length && !paragraphs.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      {heading && <SectionHeader label="Considerations" title={heading} />}

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
          {drawbacks.map((drawback, index) => (
            <BenefitCard key={index} text={drawback} type="drawback" />
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * How to decide/choose section.
 *
 * @param {Object} props - Component props
 * @param {string} props.heading - Section heading
 * @param {Array} props.checklist - Checklist items
 * @param {string} props.selfAudit - Self-audit questions text
 * @param {string[]} props.paragraphs - Paragraph text array
 * @returns {JSX.Element|null} How to decide section or null
 */
function HowToDecideSection({ heading, checklist = [], selfAudit, paragraphs = [] }) {
  if (!heading && !checklist.length && !selfAudit && !paragraphs.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      {heading && <SectionHeader label="Decision Guide" title={heading} />}

      {paragraphs.length > 0 && (
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg leading-[1.8] text-[#1f2937] sm:text-xl">
              {renderMarkdownBold(paragraph)}
            </p>
          ))}
        </div>
      )}

      {checklist.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {checklist.map((item, index) => (
            <NumberedCard key={index} text={item} index={index} />
          ))}
        </div>
      )}

      {selfAudit && (
        <div className="rounded-xl border-2 border-[#3e3ce7]/20 bg-gradient-to-br from-[#3e3ce7]/5 to-white p-6 sm:p-8">
          <h3 className="mb-4 text-xl font-semibold text-[#111827]">Self-Audit Questions</h3>
          <p className="text-base leading-[1.75] text-[#4b5563]">{selfAudit}</p>
        </div>
      )}
    </section>
  );
}

/**
 * Generic core section for reusable content blocks.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {string[]} props.paragraphs - Paragraph text array
 * @param {Array} props.bullets - Bullet items array
 * @returns {JSX.Element|null} Generic section or null
 */
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
          {bullets.map((bullet, index) => (
            <NumberedCard key={index} text={bullet} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Takeaway section component.
 *
 * @param {Object} props - Component props
 * @param {string} props.heading - Section heading
 * @param {Array} props.bullets - Takeaway bullets
 * @returns {JSX.Element|null} Takeaway section or null
 */
function TakeawaySection({ heading, bullets = [] }) {
  if (!heading && !bullets.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      {heading && <SectionHeader label="Key Takeaways" title={heading} />}

      {bullets.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {bullets.map((bullet, index) => (
            <NumberedCard key={index} text={bullet} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Final verdict/summary section.
 *
 * @param {Object} props - Component props
 * @param {string} props.heading - Section heading
 * @param {string} props.summary - Summary text
 * @param {string} props.verdict - Verdict text
 * @param {string[]} props.paragraphs - Paragraph text array
 * @returns {JSX.Element|null} Final verdict section or null
 */
function FinalVerdictSection({ heading, summary, verdict, paragraphs = [] }) {
  if (!heading && !summary && !verdict && !paragraphs.length) return null;

  return (
    <section className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#e5e7eb] bg-gradient-to-br from-[#0C1412] via-[#1a1a2e] to-[#16213e] p-8 text-white shadow-lg sm:p-12">
      <BackgroundPattern />

      <div className="relative space-y-6">
        {heading && (
          <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{heading}</h2>
        )}
        {summary && (
          <p className="text-lg leading-[1.8] text-white/95 sm:text-xl">{summary}</p>
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
            <p className="text-base leading-[1.75] text-white/90 sm:text-lg">{verdict}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Call to action section.
 *
 * @param {Object} props - Component props
 * @param {string} props.heading - Section heading
 * @param {Array} props.actions - Action items array
 * @param {string} props.inviteText - Invitation text
 * @param {Array} props.resources - Resources array
 * @returns {JSX.Element|null} CTA section or null
 */
function CallToActionSection({ heading, actions = [], inviteText, resources = [] }) {
  if (!heading && !actions.length && !inviteText && !resources.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      {heading && <SectionHeader label="Next Steps" title={heading} />}

      {inviteText && (
        <p className="text-lg leading-[1.8] text-[#374151] sm:text-xl">{inviteText}</p>
      )}

      {actions.length > 0 && (
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
      )}

      {resources.length > 0 && (
        <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 sm:p-8">
          <h3 className="mb-5 text-xl font-semibold text-[#111827]">
            Further Reading & Resources
          </h3>
          <ul className="space-y-3">
            {resources.map((resource, index) => {
              const url = resource.url ?? resource.href ?? '#';
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
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

/**
 * Optional extras section with quotes, facts, and comparison table.
 *
 * @param {Object} props - Component props
 * @param {Array} props.pulloutQuotes - Pullout quotes array
 * @param {Array} props.didYouKnow - Did you know facts array
 * @param {Object|Array|null} props.comparisonTable - Comparison table data
 * @returns {JSX.Element|null} Optional extras section or null
 */
function OptionalExtrasSection({ pulloutQuotes = [], didYouKnow = [], comparisonTable }) {
  if (!pulloutQuotes.length && !didYouKnow.length && !comparisonTable) return null;

  const normalizedTable = normalizeComparisonTable(comparisonTable);

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-12">
      {pulloutQuotes.length > 0 && (
        <div className="space-y-6">
          {pulloutQuotes.map((quote, index) => {
            const quoteText = typeof quote === 'string' ? quote : quote?.text ?? '';
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
      )}

      {didYouKnow.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {didYouKnow.map((fact, index) => {
            const factText = typeof fact === 'string' ? fact : fact?.text ?? '';
            const factTitle =
              typeof fact === 'object' ? fact?.title ?? 'Did You Know?' : 'Did You Know?';
            if (!factText) return null;
            return (
              <div
                key={index}
                className="rounded-xl border border-[#e5e7eb] bg-gradient-to-br from-[#3e3ce7]/5 to-white p-5 sm:p-6"
              >
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
                  {factTitle}
                </h4>
                <p className="text-sm leading-[1.7] text-[#4b5563] sm:text-base">{factText}</p>
              </div>
            );
          })}
        </div>
      )}

      {normalizedTable && (
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
      )}
    </section>
  );
}

/**
 * FAQ section component.
 *
 * @param {Object} props - Component props
 * @param {Array} props.faqs - FAQ items array
 * @param {string} props.heading - Section heading
 * @returns {JSX.Element|null} FAQ section or null
 */
function FAQSection({ faqs = [], heading }) {
  if (!faqs.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-8 py-12">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
          Common Questions
        </p>
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl">
          {heading ?? 'Frequently Asked Questions'}
        </h2>
      </header>
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const question = faq?.question ?? faq?.heading ?? faq?.title ?? `FAQ ${index + 1}`;
          const answer = faq?.answer ?? faq?.response ?? '';
          const cta =
            faq?.cta ??
            (faq?.ctaHref ? { href: faq.ctaHref, label: faq.ctaLabel ?? 'Learn more' } : null);

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
              {answer && (
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={summaryId}
                  className="mt-4 space-y-4 text-sm leading-[1.75] text-[#4b5563] sm:text-base"
                >
                  <p>{answer}</p>
                  {cta && (
                    <Link
                      href={cta.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#3e3ce7] transition-colors hover:text-[#111827]"
                    >
                      {cta.label}
                      <span
                        className="transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  )}
                </div>
              )}
            </details>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * InformationalArticle Component
 *
 * Renders comprehensive informational articles with multiple sections including
 * headlines, opening hooks, definitions, advantages, drawbacks, decision guides,
 * verdicts, CTAs, FAQs, and more. Supports flexible content structures from
 * both informational.js and money.js post formats.
 *
 * @param {Object} props - Component props
 * @param {Object} props.post - Post data object
 * @param {string} props.publishedDate - Formatted publication date
 * @param {string} [props.heroImage] - Optional hero image URL
 * @param {Array<Object>} [props.supportingProducts=[]] - Supporting products array
 * @returns {JSX.Element} Informational article component
 */
export default function InformationalArticle({
  post,
  publishedDate,
  heroImage,
  supportingProducts = [],
}) {
  // Extract and normalize headline data
  const headline = safeString(post.h1) ?? safeString(post.title);
  const subheadline = safeString(post.subheadline) ?? safeString(post.subtitle);

  // Normalize introduction paragraphs
  const introductionParagraphs = normalizeToArray(post.introductionParagraphs);
  const secondaryParagraphs = normalizeToArray(post.secondaryIntroduction);
  const allIntroductionParagraphs = [...introductionParagraphs, ...secondaryParagraphs];

  // Extract opening section data
  const openingContext =
    safeString(post.openingContext) ?? safeString(post.introduction);
  const openingHook =
    safeString(post.introductionHook) ??
    safeString(post.hook) ??
    safeString(post.snippetAnswer);
  const openingExpectation =
    safeString(post.roadmap) ??
    safeString(post.introductionRoadmap) ??
    safeString(post.expectation);

  // Extract what is it section data
  const whatIsItHeading = safeString(post.whatIsItHeading) ?? 'What Is It & How It Works';
  const whatIsItDefinition =
    safeString(post.whatIsItDefinition) ?? safeString(post.definition);
  const whatIsItTypes = normalizeToArray(post.types);
  const whatIsItWhyConsider = safeString(post.whyConsider);

  // Extract core heading
  const coreHeading = safeString(post.coreHeading);

  // Extract advantages/benefits data
  const prosSection = findSectionByTitle(post.coreSections, [
    'pros',
    'benefits',
    'advantages',
    'why',
    'the pros',
  ]);
  const advantagesHeading =
    safeString(post.advantagesHeading) ??
    prosSection?.title ??
    'Advantages & Benefits';
  const advantages = prosSection?.bullets ?? post.advantages ?? post.benefits ?? [];
  const advantagesParagraphs = prosSection?.paragraphs ?? [];

  // Extract drawbacks/considerations data
  const consSection = findSectionByTitle(post.coreSections, [
    'cons',
    'drawbacks',
    'disadvantages',
    'considerations',
    'the cons',
  ]);
  const drawbacksHeading =
    safeString(post.drawbacksHeading) ??
    consSection?.title ??
    "Drawbacks & Things to Consider";
  const drawbacks = consSection?.bullets ?? post.drawbacks ?? post.cons ?? [];
  const drawbacksParagraphs = consSection?.paragraphs ?? [];

  // Extract decision guide data
  const decideSection = findSectionByTitle(post.coreSections, [
    'how to choose',
    'how to decide',
    'choose the right',
    'decision',
  ]);
  const decideHeading =
    safeString(post.decideHeading) ??
    decideSection?.title ??
    'How to Decide & Choose the Right One';
  const decideChecklist =
    decideSection?.bullets ?? post.checklist ?? post.decisionFactors ?? [];
  const decideSelfAudit =
    safeString(post.selfAudit) ?? safeString(decideSection?.selfAudit);
  const decideParagraphs = decideSection?.paragraphs ?? [];

  // Extract final verdict data
  const verdictSection = findSectionByTitle(post.coreSections, [
    'bottom line',
    'final verdict',
    'summary',
    'conclusion',
    'verdict',
    'the bottom line',
  ]);
  const verdictHeading =
    safeString(post.verdictHeading) ?? verdictSection?.title ?? 'Final Verdict';
  const verdictSummary =
    safeString(post.verdictSummary) ?? safeString(verdictSection?.summary);
  const verdictParagraphs = normalizeToArray(verdictSection?.paragraphs);
  const verdictText = safeString(post.verdict) ?? safeString(verdictSection?.verdict);

  // Extract should/shouldn't get sections
  const shouldGetSection = findSectionByTitle(post.coreSections, [
    'you should get',
    'you should',
    'should get',
  ]);
  const shouldntGetSection = findSectionByTitle(post.coreSections, [
    "you probably shouldn't",
    "you shouldn't",
    "shouldn't get",
    "probably shouldn't",
  ]);

  // Extract CTA data
  const ctaSection = findSectionByTitle(post.coreSections, [
    'next steps',
    'call to action',
    'your next',
    'action',
  ]);
  const ctaHeading =
    safeString(post.ctaHeading) ?? ctaSection?.title ?? 'Your Next Steps';
  const ctaActions = ctaSection?.bullets ?? post.ctaActions ?? post.nextSteps ?? [];
  const ctaInviteText =
    safeString(post.ctaInviteText) ?? safeString(ctaSection?.inviteText);
  const ctaResources = post.relatedGuides ?? post.resources ?? [];
  const ctaParagraphs = ctaSection?.paragraphs ?? [];

  // Extract takeaways
  const takeawayHeading = safeString(post.takeawayHeading);
  const takeawayBullets = post.takeawayBullets ?? [];

  // Extract optional extras
  const pulloutQuotes = post.pulloutQuotes ?? [];
  const didYouKnow = post.didYouKnow ?? post.facts ?? [];
  const comparisonTable = post.comparisonTable ?? null;

  // Extract hero image data
  const heroImageAlt = safeString(post.heroImageAlt) ?? headline;
  const articleHeroImage =
    heroImage ?? safeString(post.articleHeroImage) ?? '/default-og.png';

  // Extract top products intro
  const topProductsIntro = safeString(post.topProductsIntro);

  return (
    <article className="mx-auto max-w-5xl space-y-16 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <HeadlineSection
        headline={headline}
        subheadline={subheadline}
        category={post.category}
        publishedDate={publishedDate}
        readingTime={post.estimatedReadingTime}
      />

      <OpeningSection
        hook={openingHook}
        context={openingContext}
        expectation={openingExpectation}
        introductionParagraphs={allIntroductionParagraphs}
      />

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

      <WhatIsItSection
        heading={whatIsItHeading}
        definition={whatIsItDefinition}
        types={whatIsItTypes}
        whyConsider={whatIsItWhyConsider}
      />

      {coreHeading && (
        <section className="mx-auto max-w-4xl py-8">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl">
            {coreHeading}
          </h2>
        </section>
      )}

      <AdvantagesSection
        heading={advantagesHeading}
        benefits={advantages}
        paragraphs={advantagesParagraphs}
      />

      <DrawbacksSection
        heading={drawbacksHeading}
        drawbacks={drawbacks}
        paragraphs={drawbacksParagraphs}
      />

      {shouldGetSection && (
        <GenericCoreSection
          title={shouldGetSection.title}
          paragraphs={shouldGetSection.paragraphs ?? []}
          bullets={shouldGetSection.bullets ?? []}
        />
      )}

      {shouldntGetSection && (
        <GenericCoreSection
          title={shouldntGetSection.title}
          paragraphs={shouldntGetSection.paragraphs ?? []}
          bullets={shouldntGetSection.bullets ?? []}
        />
      )}

      <HowToDecideSection
        heading={decideHeading}
        checklist={decideChecklist}
        selfAudit={decideSelfAudit}
        paragraphs={decideParagraphs}
      />

      <FinalVerdictSection
        heading={verdictHeading}
        summary={verdictSummary}
        verdict={verdictText}
        paragraphs={verdictParagraphs}
      />

      <CallToActionSection
        heading={ctaHeading}
        actions={ctaActions}
        inviteText={ctaInviteText}
        resources={ctaResources}
      />

      <OptionalExtrasSection
        pulloutQuotes={pulloutQuotes}
        didYouKnow={didYouKnow}
        comparisonTable={comparisonTable}
      />

      <TakeawaySection heading={takeawayHeading} bullets={takeawayBullets} />

      {supportingProducts.length > 0 && (
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
                {product.description && (
                  <p className="text-sm leading-[1.7] text-[#6b7280] sm:text-base">
                    {product.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {post.contextFAQs?.length > 0 && (
        <FAQSection
          faqs={post.contextFAQs}
          heading={safeString(post.contextHeading)}
        />
      )}
    </article>
  );
}
