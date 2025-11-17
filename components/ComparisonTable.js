import Image from 'next/image';

// Snapshot table summarising the products before deep reviews.
export default function ComparisonTable({ products, comparison }) {
  const hasComparisonRows = Array.isArray(comparison) && comparison.length > 0;
  const hasLegacyProducts = Array.isArray(products) && products.length > 0;

  if (!hasComparisonRows && !hasLegacyProducts) {
    return null;
  }

  return (
    <section className="my-12" aria-labelledby="comparison-table">
      <div className="flex items-center justify-between gap-4">
        <h2 id="comparison-table" className="text-3xl font-bold">
          {hasComparisonRows ? 'Electric Bike Comparison Table' : 'Quick Comparison'}
        </h2>
        <p className="text-sm text-[#0C1412]/60">
          {hasComparisonRows
            ? 'Scan the core specs, range, and ideal rider for each pick.'
            : 'Tap to jump into each in-depth review.'}
        </p>
      </div>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-[#3e3ce7]/20 shadow-[0_20px_35px_rgba(12,20,18,0.35)]">
        {hasComparisonRows ? (
          <table className="min-w-full divide-y divide-[#3e3ce7]/10 bg-white">
            <thead className="bg-[#0C1412]">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                  Model
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                  Price
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                  Motor
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                  Battery
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                  Range
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                  Weight
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                  Best For
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3e3ce7]/10">
              {comparison.map((row) => (
                <tr key={row.model} className="transition hover:bg-[#3e3ce7]/10">
                  <td className="py-4 px-4">
                    <div className="text-sm font-semibold text-[#0C1412]">
                      {row.model}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {row.affiliateLink ? (
                      <a
                        href={row.affiliateLink}
                        target="_blank"
                        rel="sponsored nofollow noopener"
                        className="text-sm font-medium text-[#3e3ce7] transition-colors hover:text-[#3e3ce7]/80 hover:underline"
                      >
                        {row.price}
                      </a>
                    ) : (
                      <span className="text-sm text-[#0C1412]/80">{row.price}</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#0C1412]/80">{row.motor}</td>
                  <td className="py-4 px-4 text-sm text-[#0C1412]/80">{row.battery}</td>
                  <td className="py-4 px-4 text-sm text-[#0C1412]/80">{row.range}</td>
                  <td className="py-4 px-4 text-sm text-[#0C1412]/80">{row.weight}</td>
                  <td className="py-4 px-4 text-sm text-[#3e3ce7]">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full divide-y divide-[#3e3ce7]/10 bg-white">
            <thead className="bg-[#3e3ce7]">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                  Product
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                  Average Rating
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                  Review
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3e3ce7]/10">
              {products.map((product) => (
                <tr key={product.id} className="transition hover:bg-[#3e3ce7]/10">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-[#3e3ce7]/15">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-contain"
                          loading="lazy"
                          quality={75}
                        />
                      </div>
                      <span className="font-medium text-[#0C1412]">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-[#0C1412]/80">
                    {product.avgRating}
                  </td>
                  <td className="py-4 px-4">
                    <a
                      href={`#${product.id}`}
                      className="text-sm font-medium text-[#3e3ce7] transition hover:text-white"
                    >
                      Jump to Review
                    </a>
                  </td>
                  <td className="py-4 px-4">
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="sponsored nofollow noopener"
                      className="inline-flex items-center justify-center rounded-xl bg-[#3e3ce7] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3e3ce7]/90"
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
