import Image from 'next/image';
import Link from 'next/link';

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
 * Renders the product image with optional badge.
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
    <div className="relative aspect-square overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
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
    <div className="mt-4 space-y-3 rounded-xl border border-[#0C1412]/20 bg-gradient-to-br from-[#0C1412] via-[#1a1a2e] to-[#16213e] p-4 shadow-lg sm:p-5">
      <h3 className="text-base font-semibold text-white sm:text-lg">Performance Ratings</h3>
      <div className="space-y-3.5">
        {metrics.map((metric, index) => {
          const { category, rating, weight } = metric;
          const percentage = (rating / 10) * 100; // Convert 0-10 scale to percentage
          const weightPercent = weight ? `${weight}%` : '';

          return (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white/90 sm:text-base">
                  {category}
                  {weightPercent && (
                    <span className="ml-2 text-xs font-normal text-white/60 sm:text-sm">
                      ({weightPercent})
                    </span>
                  )}
                </span>
                <span className="text-sm font-semibold text-white sm:text-base">{rating.toFixed(1)}</span>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-500"
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
    <div className="overflow-hidden rounded-2xl border border-[#3e3ce7]/20 bg-white shadow-[0_20px_35px_rgba(12,20,18,0.15)] transition-shadow hover:shadow-[0_25px_40px_rgba(12,20,18,0.2)]">
      <table className="min-w-full divide-y divide-[#3e3ce7]/10">
        <caption className="sr-only">
          Key features and specifications for {model}
        </caption>
        <thead className="bg-gradient-to-r from-[#0C1412] via-[#1a1a2e] to-[#16213e]">
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
        <tbody className="divide-y divide-[#3e3ce7]/10 bg-white">
          {specs.map((spec, index) => (
            <tr
              key={index}
              className="group transition-all duration-200 hover:bg-gradient-to-r hover:from-[#3e3ce7]/5 hover:to-[#3e3ce7]/10 hover:shadow-sm"
            >
              <td className="py-3.5 px-4 sm:py-4 sm:px-6">
                <span className="text-sm font-semibold text-[#0C1412] sm:text-base">{spec.label}</span>
              </td>
              <td className="py-3.5 px-4 sm:py-4 sm:px-6">
                <span className="text-sm leading-relaxed text-[#1f2937] transition-colors group-hover:text-[#0C1412] sm:text-base">
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

  const config = {
    pros: {
      title: 'Pros',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      bulletColor: 'bg-green-600',
      hoverBorder: 'hover:border-green-200',
      hoverBg: 'hover:bg-green-50/50',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      ),
    },
    cons: {
      title: 'Cons',
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-100',
      bulletColor: 'bg-amber-600',
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

  const { title, iconColor, bgColor, bulletColor, hoverBorder, hoverBg, icon } = config[type];

  return (
    <div
      className={`group rounded-xl border border-[#e5e7eb] bg-white p-5 transition-all duration-300 ${hoverBorder} ${hoverBg} hover:shadow-sm sm:p-6`}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${bgColor} ${iconColor}`}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon}
          </svg>
        </span>
        <span className="text-lg font-semibold text-[#0C1412]">{title}</span>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${bulletColor}`} />
            <span className="text-sm leading-[1.8] text-[#1f2937] sm:text-base">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Renders a single product review card.
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

  // Parse product name into two parts (before and after " - ")
  const productName = product.name || '';
  const nameParts = productName.includes(' - ') ? productName.split(' - ') : [productName, ''];
  const productNamePart1 = nameParts[0]?.trim() || '';
  const productNamePart2 = nameParts[1]?.trim() || '';
  const rankPrefix = typeof product.rank === 'number' ? `${product.rank}. ` : '';

  return (
    <article id={product.id} className="scroll-mt-24 space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 space-y-3">
          {/* Descriptive Subtitle Badge */}
          {productNamePart2 && (
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#3e3ce7]/20 bg-gradient-to-r from-[#3e3ce7]/8 via-[#6366f1]/10 to-[#3e3ce7]/8 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3e3ce7] shadow-sm shadow-[#3e3ce7]/10 backdrop-blur-sm transition-all duration-300 hover:border-[#3e3ce7]/30 hover:from-[#3e3ce7]/12 hover:via-[#6366f1]/15 hover:to-[#3e3ce7]/12 hover:shadow-md hover:shadow-[#3e3ce7]/20 sm:text-xs sm:px-4 sm:py-2">
                {productNamePart2}
              </span>
            </div>
          )}
          {/* SEO: Product Name as H2 - Each product review is an H2 heading per SEO requirements */}
          <h2 className="flex flex-wrap items-baseline gap-2">
            {rankPrefix && (
              <span className="text-2xl font-bold text-[#0C1412] sm:text-3xl md:text-4xl">
                {rankPrefix}
              </span>
            )}
            <span className="text-2xl font-extrabold leading-tight tracking-tight text-[#0C1412] sm:text-3xl md:text-4xl">
              {productNamePart1}
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <ProductImage
            imageUrl={product.imageUrl}
            name={product.name}
            badge={badge}
            isPriority={index === 0}
          />
          <ReviewChart metrics={product.performanceRatings} />
          <div className="mt-3 flex flex-col gap-3 sm:mt-4">
            {reviewLink && (
              <Link
                href={reviewLink}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#3e3ce7] bg-transparent px-5 py-2.5 text-xs font-semibold text-[#3e3ce7] shadow-md shadow-[#3e3ce7]/20 transition-all duration-300 hover:bg-[#3e3ce7] hover:text-white hover:shadow-lg hover:shadow-[#3e3ce7]/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3e3ce7] focus:ring-offset-2 sm:px-6 sm:py-3 sm:text-sm"
              >
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
              </Link>
            )}
            {product.affiliateLink && (
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#3e3ce7] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#3e3ce7]/30 transition-all duration-300 hover:bg-[#3e3ce7]/90 hover:shadow-xl hover:shadow-[#3e3ce7]/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3e3ce7] focus:ring-offset-2 sm:px-6 sm:py-3 sm:text-sm"
              >
                {ctaLabel}
              </a>
            )}
          </div>
        </div>

        <div className="space-y-4 md:col-span-8 sm:space-y-6">
          {product.description && (
            <p className="text-base leading-[1.8] text-[#1f2937] sm:text-lg">
              {product.description}
            </p>
          )}

          {/* SEO: H3 subsections under product H2 - Key Features, Performance Notes, Best For */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[#0C1412] sm:text-xl">Key Features</h3>
            <KeyFeaturesTable product={product} />
          </div>

          {performanceNotes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#0C1412] sm:text-xl">Performance Notes</h3>
              {performanceNotes.map((note, noteIndex) => (
                <p key={noteIndex} className="text-base leading-[1.8] text-[#1f2937]">
                  {note}
                </p>
              ))}
            </div>
          )}

          {bestFor && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#0C1412] sm:text-xl">Who It&apos;s Best For</h3>
              <p className="text-base leading-[1.8] text-[#1f2937]">{bestFor}</p>
            </div>
          )}
        </div>
      </div>

      {/* SEO: Pros and Cons as H3 under product H2 - Required structure for money pages */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-[#0C1412] sm:text-xl">Pros</h3>
          <ProsConsSection items={product.pros} type="pros" />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-[#0C1412] sm:text-xl">Cons</h3>
          <ProsConsSection items={product.cons} type="cons" />
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
      className="mx-auto max-w-4xl space-y-8 py-8 sm:space-y-12 sm:py-12"
      aria-labelledby="detailed-reviews"
    >
      <header className="space-y-2 sm:space-y-3">
        <h2
          id="detailed-reviews"
          className="text-2xl font-bold leading-tight tracking-tight text-[#0C1412] sm:text-3xl md:text-4xl"
        >
          {heading}
        </h2>
      </header>

      <div className="space-y-12 sm:space-y-16">
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
