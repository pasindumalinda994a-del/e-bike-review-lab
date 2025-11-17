import Image from 'next/image';

// Snapshot table summarising the products before deep reviews.
export default function ComparisonTable({ products, comparison }) {
  const hasComparisonRows = Array.isArray(comparison) && comparison.length > 0;
  const hasLegacyProducts = Array.isArray(products) && products.length > 0;

  if (!hasComparisonRows && !hasLegacyProducts) {
    return null;
  }

  return (
    <section className="my-8 sm:my-12" aria-labelledby="comparison-table">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="comparison-table" className="text-2xl font-bold sm:text-3xl">
          {hasComparisonRows ? 'Electric Bike Comparison Table' : 'Quick Comparison'}
        </h2>
        <p className="text-xs text-[#0C1412]/60 sm:text-sm">
          {hasComparisonRows
            ? 'Scan the core specs, range, and ideal rider for each pick.'
            : 'Tap to jump into each in-depth review.'}
        </p>
      </div>
      <div className="mt-4 sm:mt-5 overflow-x-auto rounded-2xl border border-[#3e3ce7]/20 shadow-[0_20px_35px_rgba(12,20,18,0.35)] -mx-4 sm:mx-0">
        {hasComparisonRows ? (
          <table className="min-w-full divide-y divide-[#3e3ce7]/10 bg-white">
            <thead className="bg-[#0C1412]">
              <tr>
                <th className="py-2.5 px-3 text-left text-[10px] font-semibold uppercase tracking-wide text-white/90 sm:py-3 sm:px-4 sm:text-xs">
                  Model
                </th>
                <th className="py-2.5 px-3 text-left text-[10px] font-semibold uppercase tracking-wide text-white/90 sm:py-3 sm:px-4 sm:text-xs">
                  Price
                </th>
                <th className="py-2.5 px-3 text-left text-[10px] font-semibold uppercase tracking-wide text-white/90 sm:py-3 sm:px-4 sm:text-xs">
                  Motor
                </th>
                <th className="py-2.5 px-3 text-left text-[10px] font-semibold uppercase tracking-wide text-white/90 sm:py-3 sm:px-4 sm:text-xs">
                  Battery
                </th>
                <th className="py-2.5 px-3 text-left text-[10px] font-semibold uppercase tracking-wide text-white/90 sm:py-3 sm:px-4 sm:text-xs">
                  Range
                </th>
                <th className="py-2.5 px-3 text-left text-[10px] font-semibold uppercase tracking-wide text-white/90 sm:py-3 sm:px-4 sm:text-xs">
                  Weight
                </th>
                <th className="py-2.5 px-3 text-left text-[10px] font-semibold uppercase tracking-wide text-white/90 sm:py-3 sm:px-4 sm:text-xs">
                  Best For
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3e3ce7]/10">
              {comparison.map((row) => (
                <tr key={row.model} className="transition hover:bg-[#3e3ce7]/10">
                  <td className="py-3 px-3 sm:py-4 sm:px-4">
                    <div className="text-xs font-semibold text-[#0C1412] sm:text-sm">
                      {row.model}
                    </div>
                  </td>
                  <td className="py-3 px-3 sm:py-4 sm:px-4">
                    {row.affiliateLink ? (
                      <a
                        href={row.affiliateLink}
                        target="_blank"
                        rel="sponsored nofollow noopener"
                        className="text-xs font-medium text-[#3e3ce7] transition-colors hover:text-[#3e3ce7]/80 hover:underline sm:text-sm"
                      >
                        {row.price}
                      </a>
                    ) : (
                      <span className="text-xs text-[#0C1412]/80 sm:text-sm">{row.price}</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-xs text-[#0C1412]/80 sm:py-4 sm:px-4 sm:text-sm">{row.motor}</td>
                  <td className="py-3 px-3 text-xs text-[#0C1412]/80 sm:py-4 sm:px-4 sm:text-sm">{row.battery}</td>
                  <td className="py-3 px-3 text-xs text-[#0C1412]/80 sm:py-4 sm:px-4 sm:text-sm">{row.range}</td>
                  <td className="py-3 px-3 text-xs text-[#0C1412]/80 sm:py-4 sm:px-4 sm:text-sm">{row.weight}</td>
                  <td className="py-3 px-3 text-xs text-[#3e3ce7] sm:py-4 sm:px-4 sm:text-sm">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full divide-y divide-[#3e3ce7]/10 bg-white">
            <thead className="bg-[#3e3ce7]">
              <tr>
                <th className="py-2.5 px-3 text-left text-[10px] font-semibold uppercase tracking-wide text-white/90 sm:py-3 sm:px-4 sm:text-xs">
                  Product
                </th>
                <th className="py-2.5 px-3 text-left text-[10px] font-semibold uppercase tracking-wide text-white/90 sm:py-3 sm:px-4 sm:text-xs">
                  Rating
                </th>
                <th className="py-2.5 px-3 text-left text-[10px] font-semibold uppercase tracking-wide text-white/90 sm:py-3 sm:px-4 sm:text-xs">
                  Review
                </th>
                <th className="py-2.5 px-3 text-left text-[10px] font-semibold uppercase tracking-wide text-white/90 sm:py-3 sm:px-4 sm:text-xs">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3e3ce7]/10">
              {products.map((product) => (
                <tr key={product.id} className="transition hover:bg-[#3e3ce7]/10">
                  <td className="py-3 px-3 sm:py-4 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-[#3e3ce7]/15 sm:h-12 sm:w-12">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 40px, 48px"
                          className="object-contain"
                          loading="lazy"
                          quality={75}
                        />
                      </div>
                      <span className="text-xs font-medium text-[#0C1412] sm:text-sm">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-xs text-[#0C1412]/80 sm:py-4 sm:px-4 sm:text-sm">
                    {product.avgRating}
                  </td>
                  <td className="py-3 px-3 sm:py-4 sm:px-4">
                    <a
                      href={`#${product.id}`}
                      className="text-xs font-medium text-[#3e3ce7] transition hover:text-white sm:text-sm"
                    >
                      Jump to Review
                    </a>
                  </td>
                  <td className="py-3 px-3 sm:py-4 sm:px-4">
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="sponsored nofollow noopener"
                      className="inline-flex items-center justify-center rounded-lg bg-[#3e3ce7] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#3e3ce7]/90 sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm"
                    >
                      Check Price
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
