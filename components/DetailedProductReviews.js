"use client";

import Image from 'next/image';
import Link from 'next/link';
import AnimatedButton from '@/components/AnimatedButton';

/**
 * Normalizes a value to an array format.
 * If the value is already an array, returns it.
 * If it's a truthy value, wraps it in an array.
 * Otherwise, returns an empty array.
 *
 * @param {unknown} value - The value to normalize
 * @returns {unknown[]} Normalized array
 */
function normalizeToArray(value) {
  if (Array.isArray(value)) return value;
  if (value) return [value];
  return [];
}

/**
 * Renders a badge overlay on the product image.
 *
 * @param {string} badge - Badge text to display
 * @returns {JSX.Element|null} Badge component or null
 */
function ProductBadge({ badge }) {
  if (!badge) return null;

  return (
    <div className="absolute left-0 top-0 z-10 rounded-br-xl bg-gradient-to-r from-[#0C1412]/95 to-[#1a1a2e]/95 px-3 py-1.5 shadow-lg backdrop-blur-sm sm:px-4 sm:py-2">
      <span className="text-xs font-semibold text-white sm:text-sm">{badge}</span>
    </div>
  );
}

/**
 * Renders a full-width cover image for the product review.
 * Optimized for hero display below the title.
 *
 * @param {Object} props - Component props
 * @param {string} props.imageUrl - Product image URL
 * @param {string} props.name - Product name for alt text
 * @param {string|null} props.badge - Optional badge text
 * @param {boolean} props.isPriority - Whether to prioritize image loading
 * @returns {JSX.Element} Cover image component
 */
function CoverImage({ imageUrl, name, badge, isPriority }) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg aspect-[16/9]">
      <ProductBadge badge={badge} />
      <Image
        src={imageUrl}
        alt={name}
        fill
        sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
        className="object-cover"
        priority={isPriority}
        loading={isPriority ? undefined : 'lazy'}
        quality={isPriority ? 75 : 70}
      />
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1412]/10 via-transparent to-transparent" />
    </div>
  );
}

/**
 * Renders a compact product image for sidebar/compact views.
 *
 * @param {Object} props - Component props
 * @param {string} props.imageUrl - Product image URL
 * @param {string} props.name - Product name for alt text
 * @param {string|null} props.badge - Optional badge text
 * @param {boolean} props.isPriority - Whether to prioritize image loading
 * @returns {JSX.Element} Product image component
 */
function ProductImage({ imageUrl, name, badge, isPriority }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
      <ProductBadge badge={badge} />
      <Image
        src={imageUrl}
        alt={name}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover"
        priority={isPriority}
        loading={isPriority ? undefined : 'lazy'}
        quality={isPriority ? 75 : 70}
      />
    </div>
  );
}

/**
 * Renders a review chart with performance metrics and progress bars.
 *
 * @param {Object} props - Component props
 * @param {Array<{category: string, rating: number, weight: number}>} props.metrics - Array of performance metrics
 * @returns {JSX.Element|null} Review chart or null
 */
function ReviewChart({ metrics }) {
  if (!metrics || !Array.isArray(metrics) || metrics.length === 0) return null;

  return (
    <div className="space-y-2.5 rounded-lg bg-white p-3.5 sm:p-4">
      <h4 className="text-base font-semibold text-[#0C1412] sm:text-lg">Performance Ratings</h4>
      <div className="space-y-3">
        {metrics.map((metric, index) => {
          const { category, rating, weight } = metric;
          const percentage = (rating / 10) * 100; // Convert 0-10 scale to percentage
          const weightPercent = weight ? `${weight}%` : '';

          return (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#0C1412] sm:text-base">
                  {category}
                  {weightPercent && (
                    <span className="ml-2 text-xs font-normal text-[#1f2937] sm:text-sm">
                      ({weightPercent})
                    </span>
                  )}
                </span>
                <span className="text-sm font-semibold text-[#0C1412] sm:text-base">{rating.toFixed(1)}</span>
              </div>
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0C1412] to-[#1a1a2e] transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Extracts specification values from keyFeatures array.
 * Looks for colon-separated values matching common spec names (case-insensitive).
 *
 * @param {string[]} features - Array of feature strings
 * @param {string} specName - Name of the spec to extract (e.g., "Motor", "Battery")
 * @returns {string} Extracted value or empty string
 */
function extractSpec(features, specName) {
  if (!features?.length) return '';
  const specLower = specName.toLowerCase();
  const feature = features.find((f) => {
    if (typeof f !== 'string') return false;
    const lowerF = f.toLowerCase();
    return lowerF.startsWith(specLower + ':');
  });
  if (feature) {
    const colonIndex = feature.indexOf(':');
    return feature.substring(colonIndex + 1).trim();
  }
  return '';
}

/**
 * Renders a key features table with SEO-optimized structure.
 * Displays Model, Price, Motor, Battery, Range, Weight, and Best For.
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data object
 * @returns {JSX.Element|null} Key features table or null
 */
function KeyFeaturesTable({ product }) {
  if (!product) return null;

  // Extract values from keyFeatures array (case-insensitive)
  const motor = extractSpec(product.keyFeatures, 'Motor');
  const battery = extractSpec(product.keyFeatures, 'Battery');
  const range = extractSpec(product.keyFeatures, 'Range');
  const weight = extractSpec(product.keyFeatures, 'Weight');
  const bestFor = extractSpec(product.keyFeatures, 'Best For') || product.whoItsBestFor || '';
  
  // Extract model name (part before " - " in product name)
  const productName = product.name || '';
  const model = productName.includes(' - ') ? productName.split(' - ')[0].trim() : productName;
  const price = product.badge || '';

  // Build specs array
  const specs = [
    { label: 'Model', value: model },
    { label: 'Price', value: price },
    { label: 'Motor', value: motor },
    { label: 'Battery', value: battery },
    { label: 'Range', value: range },
    { label: 'Weight', value: weight },
    { label: 'Best For', value: bestFor },
  ].filter((spec) => spec.value); // Only show specs that have values

  if (!specs.length) return null;

  return (
    <div className="overflow-hidden rounded-lg bg-white">
      <table className="min-w-full">
        <caption className="sr-only">
          Key features and specifications for {model}
        </caption>
        <thead className="bg-black">
          <tr>
            <th
              scope="col"
              className="py-3.5 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90 sm:py-4 sm:px-6 sm:text-sm"
            >
              Feature
            </th>
            <th
              scope="col"
              className="py-3.5 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90 sm:py-4 sm:px-6 sm:text-sm"
            >
              Details
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {specs.map((spec, index) => (
            <tr
              key={index}
            >
              <td className="py-3.5 px-4 sm:py-4 sm:px-6">
                <span className="text-sm font-semibold text-[#0C1412] sm:text-base">{spec.label}</span>
              </td>
              <td className="py-3.5 px-4 sm:py-4 sm:px-6">
                <span className="text-base leading-[1.75] text-[#1f2937] tracking-[0.01em] sm:text-lg">
                  {spec.value}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Renders a pros or cons section with icon and list.
 *
 * @param {Object} props - Component props
 * @param {string[]} props.items - Array of pros or cons
 * @param {'pros'|'cons'} props.type - Type of section
 * @returns {JSX.Element|null} Pros/Cons section or null
 */
function ProsConsSection({ items, type }) {
  if (!items?.length) return null;

  const bulletColor = 'bg-black';

  return (
    <div
      className={`rounded-xl bg-white p-6 sm:p-7`}
    >
      <ul className="space-y-3.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3.5">
            <span className={`mt-2 h-2 w-2 flex-shrink-0 rounded-full ${bulletColor}`} />
            <span className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Renders a single product review card.
 * Optimized for long-form reading with clear visual hierarchy.
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data object
 * @param {number} props.index - Product index in the list
 * @param {string} props.ctaLabel - CTA button label
 * @returns {JSX.Element} Product review article
 */
function ProductReviewCard({ product, index, ctaLabel }) {
  const badge = product.badge ?? null;
  const performanceNotes = normalizeToArray(product.performanceNotes);
  const bestFor = product.whoItsBestFor;
  
  // Get reviewLink from money.js - if null, link to product anchor on same page
  const reviewLink = product.reviewLink || (product.id ? `#${product.id}` : null);

  // Parse product name into two parts (before and after " - " or " – ")
  const productName = product.name || '';
  let nameParts = [productName, ''];

  // Support both hyphen-minus and en dash separators used in money.js
  if (productName.includes(' – ')) {
    nameParts = productName.split(' – ');
  } else if (productName.includes(' - ')) {
    nameParts = productName.split(' - ');
  }
  const productNamePart1 = nameParts[0]?.trim() || '';
  const productNamePart2 = nameParts[1]?.trim() || '';
  const rankPrefix = typeof product.rank === 'number' ? `${product.rank}. ` : '';

  return (
    <article id={product.id} className="scroll-mt-24 pb-16 sm:pb-20 md:pb-24">
      {/* Header Section: Title - constrained width */}
      <header className="max-w-4xl mb-6 space-y-4 sm:mb-8">
        {/* Descriptive Subtitle Badge */}
        {productNamePart2 && (
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-black sm:text-xs sm:px-4 sm:py-2">
              {productNamePart2}
            </span>
          </div>
        )}
        {/* SEO: Product Name as H3 - Section heading is H2, products are H3 for proper hierarchy */}
        <h3 className="flex flex-wrap items-baseline gap-2 leading-tight tracking-tight text-left">
          {rankPrefix && (
            <span className="text-2xl font-bold text-[#0C1412] sm:text-3xl md:text-4xl">
              {rankPrefix}
            </span>
          )}
          <span className="text-2xl font-extrabold text-[#0C1412] sm:text-3xl md:text-4xl">
            {productNamePart1}
          </span>
        </h3>
      </header>

      {/* Cover Image: Full-width hero image */}
      <div className="mb-8 sm:mb-12 max-w-4xl">
        <CoverImage
          imageUrl={product.imageUrl}
          name={product.name}
          badge={badge}
          isPriority={index === 0}
        />
      </div>

      {/* Main Content Area: Optimized for long-form reading - constrained width */}
      <div className="max-w-4xl grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6">
        {/* Sidebar: Review chart and CTAs - Left side */}
        <aside className="lg:col-span-4 lg:order-first">
          <div className="space-y-6">
            {/* Review Chart */}
            <ReviewChart metrics={product.performanceRatings} />

            {/* Action Buttons */}
            <div className="flex flex-row flex-wrap gap-3 items-start sm:flex-col">
              {reviewLink && (
                <AnimatedButton
                  href={reviewLink}
                  variant="outlined"
                  className="w-auto text-sm sm:text-base sm:w-full"
                >
                  <span className="flex items-center gap-2">
                    Read Full Review
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </AnimatedButton>
              )}
              {product.affiliateLink && (
                <AnimatedButton
                  href={product.affiliateLink}
                  external
                  rel="sponsored nofollow noopener"
                  className="w-auto text-sm sm:text-base sm:w-full"
                >
                  {ctaLabel}
                </AnimatedButton>
              )}
            </div>
          </div>
        </aside>

        {/* Primary Content Column: Wide, readable column */}
        <div className="lg:col-span-8">
          <div className="prose prose-lg max-w-none space-y-8 sm:space-y-10">
            {/* Description */}
            {product.description && (
              <div className="space-y-4">
                <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                  {product.description}
                </p>
              </div>
            )}

            {/* Key Features */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-[#0C1412] sm:text-2xl text-left">Key Features</h4>
              <KeyFeaturesTable product={product} />
            </div>

            {/* Performance Notes */}
            {performanceNotes.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#0C1412] sm:text-2xl text-left">Performance Notes</h4>
                <div className="space-y-4">
                  {performanceNotes.map((note, noteIndex) => (
                    <p
                      key={noteIndex}
                      className="text-base leading-normal text-black sm:text-base tracking-wide text-left"
                    >
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Best For */}
            {bestFor && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#0C1412] sm:text-2xl text-left">Who It&apos;s Best For</h4>
                <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
                  {bestFor}
                </p>
              </div>
            )}

            {/* Pros and Cons */}
            <div className="space-y-8 pt-4 sm:space-y-10">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#0C1412] sm:text-2xl text-left">Pros</h4>
                <ProsConsSection items={product.pros} type="pros" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#0C1412] sm:text-2xl text-left">Cons</h4>
                <ProsConsSection items={product.cons} type="cons" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * DetailedProductReviews Component
 *
 * Displays comprehensive product reviews with images, descriptions, features, pros/cons,
 * and affiliate links. Used in article pages to showcase reviewed products.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.products - Array of product objects to display
 * @param {string} [props.heading='Detailed Product Reviews'] - Section heading
 * @param {string} [props.ctaLabel='Check Price'] - CTA button label text
 * @returns {JSX.Element|null} Product reviews section or null if no products
 */
export default function DetailedProductReviews({
  products,
  heading,
  ctaLabel,
}) {
  // Don't render if required fields are missing
  if (!heading || !ctaLabel) {
    return null;
  }
  if (!products?.length) return null;

  return (
    <section
      className="flex w-full max-w-none flex-col space-y-12 py-12 sm:space-y-16 sm:py-16 lg:py-20"
      aria-labelledby="detailed-reviews"
    >
      <header className="max-w-4xl space-y-3 sm:space-y-4">
        <h2
          id="detailed-reviews"
          className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
        >
          {heading}
        </h2>
      </header>

      <div className="max-w-4xl space-y-16 sm:space-y-20 md:space-y-24">
        {products.map((product, index) => (
          <ProductReviewCard
            key={product.id ?? index}
            product={product}
            index={index}
            ctaLabel={ctaLabel}
          />
        ))}
      </div>
    </section>
  );
}
