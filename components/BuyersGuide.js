// Simple section for long-form buyer guidance copy.
export default function BuyersGuide({ content }) {
  if (!content) return null;

  return (
    <section
      aria-labelledby="buyers-guide"
      className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#e5e7eb] bg-gradient-to-br from-[#0C1412] via-[#1a1a2e] to-[#16213e] px-6 py-12 text-white shadow-lg sm:px-8 sm:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl space-y-6 text-white">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
            Buyer&apos;s Guide
          </span>
          <h2 id="buyers-guide" className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Smart Shopping Tips Before You Checkout
          </h2>
        </div>
        <p className="text-base leading-[1.75] text-white/90 whitespace-pre-line sm:text-lg">{content}</p>
      </div>
    </section>
  );
}

