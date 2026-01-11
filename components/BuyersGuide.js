/**
 * BuyersGuide Component
 * 
 * Simple section for long-form buyer guidance copy.
 * All content comes from money.js - no hardcoded defaults.
 * 
 * @param {Object} props - Component props
 * @param {string} props.content - Guide content text
 * @param {string} props.title - H2 heading (required - no default)
 * @param {string} props.label - Badge label above heading (optional)
 */
export default function BuyersGuide({ content, title, label }) {
  // Don't render if required fields are missing
  if (!content || !title) return null;

  return (
    <section
      aria-labelledby="buyers-guide"
      className="flex w-full max-w-none flex-col py-12 sm:py-16"
    >
      <div className="max-w-4xl space-y-6">
        <div className="space-y-4">
          {label && (
            <span className="inline-flex items-center rounded-full bg-[#3e3ce7]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
              {label}
            </span>
          )}
          <h2 id="buyers-guide" className="text-3xl font-bold leading-tight tracking-tight text-[#0C1412] sm:text-4xl text-left">
            {title}
          </h2>
        </div>
        <p className="text-base leading-normal text-black sm:text-base tracking-wide whitespace-pre-line text-left">{content}</p>
      </div>
    </section>
  );
}

