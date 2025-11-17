import Image from 'next/image';

// Deep dive cards for each product mentioned in the article.
export default function DetailedProductReviews({
  products,
  heading = 'Detailed Product Reviews',
  ctaLabel = 'Check Price on Amazon',
}) {
  if (!products?.length) return null;

  return (
    <section className="mx-auto max-w-4xl space-y-12 py-12" aria-labelledby="detailed-reviews">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3e3ce7]">
          Product Reviews
        </p>
        <h2
          id="detailed-reviews"
          className="text-3xl font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl"
        >
          {heading}
        </h2>
      </header>
      <div className="space-y-16">
        {products.map((product, index) => {
          const displayTitle =
            typeof product.rank === 'number'
              ? `${product.rank}. ${product.name}`
              : product.name;
          const badge = product.badge ?? product.avgRating ?? null;
          const performanceNotes = Array.isArray(product.performanceNotes)
            ? product.performanceNotes
            : product.performanceNotes
              ? [product.performanceNotes]
              : [];
          const keyFeatures = Array.isArray(product.keyFeatures)
            ? product.keyFeatures
            : [];
          const bestFor = Array.isArray(product.whoItsBestFor)
            ? product.whoItsBestFor
            : product.whoItsBestFor
              ? [product.whoItsBestFor]
              : [];

          return (
            <article key={product.id ?? index} id={product.id} className="scroll-mt-24 space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-2xl font-bold leading-tight tracking-tight text-[#111827] sm:text-3xl">
                  {displayTitle}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                <div className="md:col-span-4">
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
                    {badge ? (
                      <div className="absolute left-0 top-0 z-10 rounded-br-xl bg-gradient-to-r from-[#0C1412]/95 to-[#1a1a2e]/95 px-4 py-2 shadow-lg backdrop-blur-sm">
                        <span className="text-sm font-semibold text-white">{badge}</span>
                      </div>
                    ) : null}
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-contain p-4"
                      priority={index === 0}
                      loading={index === 0 ? undefined : "lazy"}
                      quality={85}
                    />
                  </div>
                  {product.affiliateLink ? (
                    <div className="mt-4">
                      <a
                        href={product.affiliateLink}
                        target="_blank"
                        rel="sponsored nofollow noopener"
                        className="inline-flex items-center justify-center rounded-xl bg-[#3e3ce7] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3e3ce7]/90"
                      >
                        {ctaLabel}
                      </a>
                    </div>
                  ) : null}
                </div>
                <div className="space-y-6 md:col-span-8">
                  {product.description ? (
                    <p className="text-base leading-[1.75] text-[#374151] sm:text-lg">
                      {product.description}
                    </p>
                  ) : null}

                  {keyFeatures.length ? (
                    <div>
                      <h4 className="mb-3 text-lg font-semibold text-[#111827]">
                        Key Features
                      </h4>
                      <ul className="space-y-2.5">
                        {keyFeatures.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3e3ce7]" />
                            <span className="text-sm leading-[1.7] text-[#374151] sm:text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {performanceNotes.length ? (
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-[#111827]">
                        Performance Notes
                      </h4>
                      {performanceNotes.map((note, noteIndex) => (
                        <p key={noteIndex} className="text-base leading-[1.75] text-[#4b5563]">
                          {note}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {bestFor.length ? (
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-[#111827]">
                        Who It&apos;s Best For
                      </h4>
                      {bestFor.map((item, bestIndex) => (
                        <p key={bestIndex} className="text-base leading-[1.75] text-[#4b5563]">
                          {item}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {product.pros?.length ? (
                  <div className="group rounded-xl border border-[#e5e7eb] bg-white p-5 transition-all duration-300 hover:border-green-200 hover:bg-green-50/50 hover:shadow-sm sm:p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <h4 className="text-lg font-semibold text-[#111827]">Pros</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {product.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-600" />
                          <span className="text-sm leading-[1.7] text-[#374151] sm:text-base">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {product.cons?.length ? (
                  <div className="group rounded-xl border border-[#e5e7eb] bg-white p-5 transition-all duration-300 hover:border-amber-200 hover:bg-amber-50/50 hover:shadow-sm sm:p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </span>
                      <h4 className="text-lg font-semibold text-[#111827]">Cons</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {product.cons.map((con, conIndex) => (
                        <li key={conIndex} className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600" />
                          <span className="text-sm leading-[1.7] text-[#374151] sm:text-base">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

            </article>
          );
        })}
      </div>
    </section>
  );
}
