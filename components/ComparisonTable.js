"use client";

import AnimatedButton from '@/components/AnimatedButton';

/**
 * Renders star rating display.
 *
 * @param {Object} props - Component props
 * @param {number|string} props.rating - Rating value (e.g., 4.5, "4.5", "4.5/5")
 * @returns {JSX.Element} Star rating component
 */
function StarRating({ rating }) {
  if (!rating) return null;

  // Parse rating value
  let numericRating = 0;
  if (typeof rating === 'number') {
    numericRating = rating;
  } else if (typeof rating === 'string') {
    // Handle formats like "4.5", "4.5/5", "4.5 stars"
    const match = rating.match(/(\d+\.?\d*)/);
    if (match) {
      numericRating = parseFloat(match[1]);
    }
  }

  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          className="h-4 w-4 fill-amber-400 text-amber-400"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalfStar && (
        <div className="relative h-4 w-4">
          <svg
            className="absolute h-4 w-4 fill-gray-300 text-gray-300"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="absolute h-4 w-4 fill-amber-400 text-amber-400"
            viewBox="0 0 20 20"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="h-4 w-4 fill-gray-300 text-gray-300"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-medium text-[#1f2937] sm:text-base">{numericRating.toFixed(1)}</span>
    </div>
  );
}

/**
 * ComparisonTable Component
 * 
 * Displays a quick comparison table of all products before detailed reviews.
 * Shows: Model, Price, Star Ratings, and Check Price button.
 * 
 * Data Structure (from money.js):
 * - comparisonTable.title: H2 heading (required)
 * - comparisonTable.description: Description text below heading (optional)
 * - comparisonTable.ctaLabel: Button label text (required)
 * - comparisonTable.noRatingText: Text when no rating available (optional)
 * - comparisonTable.data: Array of objects with { model, price, affiliateLink, avgRating }
 * 
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of product objects (for rating lookup if not in data)
 * @param {Object} props.comparison - Comparison table data object from money.js
 */
export default function ComparisonTable({ products, comparison }) {
  if (!comparison || typeof comparison !== 'object') {
    return null;
  }

  const comparisonData = comparison.data || [];
  const comparisonTitle = comparison.title;
  const comparisonDescription = comparison.description;
  const ctaLabel = comparison.ctaLabel;
  const noRatingText = comparison.noRatingText;

  if (!Array.isArray(comparisonData) || comparisonData.length === 0 || !comparisonTitle || !ctaLabel) {
    return null;
  }

  // Create a map of products by model name for quick rating lookup
  const productMap = new Map();
  if (Array.isArray(products)) {
    products.forEach((product) => {
      // Extract model name from product name (before " - ")
      const modelName = product.name?.split(' - ')[0] || '';
      if (modelName) {
        productMap.set(modelName, product);
      }
    });
  }

  return (
    <section className="my-8 sm:my-12" aria-labelledby="comparison-table">
      <div className="max-w-4xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="comparison-table" className="text-2xl font-bold text-[#0C1412] sm:text-3xl text-left">
            {comparisonTitle}
          </h2>
          {comparisonDescription && (
            <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
              {comparisonDescription}
            </p>
          )}
        </div>
        <div className="mt-4 sm:mt-5 overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white">
          <caption className="sr-only">
            {comparisonDescription || `Comparison table: ${comparisonTitle}`}
          </caption>
          <thead className="bg-gradient-to-r from-[#0C1412] to-[#1a1a2e]">
            <tr>
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90 sm:py-4 sm:px-6 sm:text-sm"
              >
                Model
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90 sm:py-4 sm:px-6 sm:text-sm"
              >
                Price
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90 sm:py-4 sm:px-6 sm:text-sm"
              >
                Reviews
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wide text-white/90 sm:py-4 sm:px-6 sm:text-sm"
              >
                View Product
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row) => {
              // Get rating from row data first, then fallback to products array
              const product = productMap.get(row.model);
              const rating = row.avgRating ?? product?.avgRating ?? null;

              return (
                <tr key={row.model} className="transition-colors hover:bg-[#3e3ce7]/5">
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <div className="text-base font-semibold text-[#0C1412] sm:text-lg">
                      {row.model}
                    </div>
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <span className="text-base font-semibold text-[#1f2937] sm:text-lg">{row.price}</span>
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    {rating ? (
                      <StarRating rating={rating} />
                    ) : (
                      noRatingText && (
                        <span className="text-sm font-medium text-[#6b7280] sm:text-base">
                          {noRatingText}
                        </span>
                      )
                    )}
                  </td>
                  <td className="py-3 px-4 text-center sm:py-4 sm:px-6">
                    {row.affiliateLink && ctaLabel && (
                      <AnimatedButton
                        href={row.affiliateLink}
                        external
                        rel="sponsored nofollow noopener"
                        className="text-xs sm:text-sm"
                      >
                        {ctaLabel}
                      </AnimatedButton>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </section>
  );
}
