import Image from 'next/image';

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
 * Renders the CTA button for checking product price.
 *
 * @param {Object} props - Component props
 * @param {string} props.affiliateLink - Affiliate link URL
 * @param {string} props.ctaLabel - Button label text
 * @returns {JSX.Element|null} CTA button or null
 */
function ProductCTA({ affiliateLink, ctaLabel }) {
  if (!affiliateLink) return null;

  return (
    <div className="mt-3 sm:mt-4">
      <a
        href={affiliateLink}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="inline-flex w-full items-center justify-center rounded-xl bg-[#3e3ce7] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#3e3ce7]/90 sm:w-auto sm:px-6 sm:py-3 sm:text-sm"
      >
        {ctaLabel}
      </a>
    </div>
  );
}

/**
 * Renders a list of features with bullet points.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {string[]} props.items - Array of feature items
 * @param {string} props.bulletColor - Tailwind color class for bullets
 * @returns {JSX.Element|null} Features list or null
 */
function FeaturesList({ title, items, bulletColor = 'bg-[#3e3ce7]' }) {
  if (!items?.length) return null;

  return (
    <div>
      <h4 className="mb-3 text-lg font-semibold text-[#111827]">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${bulletColor}`} />
            <span className="text-sm leading-[1.7] text-[#374151] sm:text-base">{item}</span>
          </li>
        ))}
      </ul>
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

  const isPros = type === 'pros';
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
        <h4 className="text-lg font-semibold text-[#111827]">{title}</h4>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${bulletColor}`} />
            <span className="text-sm leading-[1.7] text-[#374151] sm:text-base">{item}</span>
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
  const displayTitle =
    typeof product.rank === 'number' ? `${product.rank}. ${product.name}` : product.name;
  const badge = product.badge ?? product.avgRating ?? null;
  const performanceNotes = normalizeToArray(product.performanceNotes);
  const keyFeatures = normalizeToArray(product.keyFeatures);
  const bestFor = normalizeToArray(product.whoItsBestFor);

  return (
    <article key={product.id ?? index} id={product.id} className="scroll-mt-24 space-y-8">
      <h3 className="text-xl font-bold leading-tight tracking-tight text-[#111827] sm:text-2xl md:text-3xl">
        {displayTitle}
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <ProductImage
            imageUrl={product.imageUrl}
            name={product.name}
            badge={badge}
            isPriority={index === 0}
          />
          <ProductCTA affiliateLink={product.affiliateLink} ctaLabel={ctaLabel} />
        </div>

        <div className="space-y-4 md:col-span-8 sm:space-y-6">
          {product.description && (
            <p className="text-base leading-[1.75] text-[#374151] sm:text-lg">
              {product.description}
            </p>
          )}

          <FeaturesList title="Key Features" items={keyFeatures} />

          {performanceNotes.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-[#111827]">Performance Notes</h4>
              {performanceNotes.map((note, noteIndex) => (
                <p key={noteIndex} className="text-base leading-[1.75] text-[#4b5563]">
                  {note}
                </p>
              ))}
            </div>
          )}

          {bestFor.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-[#111827]">Who It&apos;s Best For</h4>
              {bestFor.map((item, bestIndex) => (
                <p key={bestIndex} className="text-base leading-[1.75] text-[#4b5563]">
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ProsConsSection items={product.pros} type="pros" />
        <ProsConsSection items={product.cons} type="cons" />
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
  heading = 'Detailed Product Reviews',
  ctaLabel = 'Check Price',
}) {
  if (!products?.length) return null;

  return (
    <section
      className="mx-auto max-w-4xl space-y-8 py-8 sm:space-y-12 sm:py-12"
      aria-labelledby="detailed-reviews"
    >
      <header className="space-y-2 sm:space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3e3ce7] sm:text-xs">
          Product Reviews
        </p>
        <h2
          id="detailed-reviews"
          className="text-2xl font-bold leading-tight tracking-tight text-[#111827] sm:text-3xl md:text-4xl"
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
