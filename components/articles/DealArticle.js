import Link from "next/link";
import Image from "next/image";
import AnimatedButton from "@/components/AnimatedButton";
import DealCountdown from "@/components/DealCountdown";
import SidebarContent from "@/components/SidebarContent";
import { getReviewLinkForDeal } from "@/lib/review-links";

function DealBadge({ badge }) {
  if (!badge) return null;

  return (
    <div className="absolute left-0 top-0 z-10 rounded-br-xl bg-gradient-to-r from-[#0C1412]/95 to-[#1a1a2e]/95 px-3 py-1.5 shadow-lg backdrop-blur-sm sm:px-4 sm:py-2">
      <span className="text-xs font-semibold text-white sm:text-sm">{badge}</span>
    </div>
  );
}

function parsePrice(value) {
  if (!value) return null;
  const numeric = String(value).replace(/[^0-9.]/g, "");
  const parsed = parseFloat(numeric);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatSavings(dealPrice, originalPrice) {
  const deal = parsePrice(dealPrice);
  const original = parsePrice(originalPrice);
  if (deal == null || original == null || original <= deal) return null;

  const amount = original - deal;
  const percent = Math.round((amount / original) * 100);
  return {
    amount: `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
    percent: `${percent}% off`,
  };
}

function LimitedStockChip({ compact = false }) {
  return (
    <span
      className={`rounded-md bg-black text-white shadow-sm font-normal ${
        compact ? "inline-block w-fit px-2 py-0.5 text-xs" : "inline-flex items-center px-3 py-1 text-xs sm:px-3.5 sm:py-1.5 sm:text-sm"
      }`}
    >
      Limited Stock
    </span>
  );
}

function getPromoLabels(deal) {
  const labels = [];
  const priceCut = formatSavings(deal.dealPrice, deal.originalPrice);

  if (priceCut) {
    const percentValue = priceCut.percent.replace(/\s*off/i, "").trim();
    labels.push({
      key: "percent",
      text: `Now ${percentValue} Off`,
      variant: "percent",
    });
  }

  return labels;
}

const PROMO_LABEL_STYLES = {
  percent:
    "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-sm",
};

function PromoLabel({ text, variant }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-bold sm:px-3.5 sm:py-1.5 sm:text-sm ${PROMO_LABEL_STYLES[variant]}`}
    >
      {text}
    </span>
  );
}

function DealPromoLabels({ deal, compact = false, showLimitedStock = true }) {
  const labels = getPromoLabels(deal);
  if (!labels.length && !(showLimitedStock && deal.limitedStock)) return null;

  return (
    <div className={`flex flex-wrap items-center ${compact ? "gap-1.5" : "gap-2"}`}>
      {labels.map((label) => (
        <PromoLabel
          key={label.key}
          text={label.text}
          variant={label.variant}
        />
      ))}
      {showLimitedStock && deal.limitedStock && <LimitedStockChip compact={compact} />}
    </div>
  );
}

function DealSummaryBox({ deal }) {
  const isBonusOnly = deal.dealType === "bonus-only" || (!deal.dealPrice && deal.originalPrice);
  const promoLabels = getPromoLabels(deal);
  const hasPricing = deal.dealPrice || deal.originalPrice || deal.totalSavings || deal.offer;

  if (!hasPricing) return null;

  return (
    <div className="space-y-3 rounded-lg bg-white p-3.5 sm:space-y-4 sm:p-4">
      {(promoLabels.length > 0 || deal.limitedStock) && (
        <DealPromoLabels deal={deal} />
      )}

      {(deal.dealPrice || deal.originalPrice) && (
        <div className="space-y-1 text-left">
          {deal.dealPrice ? (
            <>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 sm:text-xs">
                Today&apos;s Price
              </p>
              <p className="text-base font-semibold text-[#0C1412] tracking-wide sm:text-lg">
                <span className="text-xl font-bold text-emerald-700 sm:text-2xl">
                  {deal.dealPrice}
                </span>
                {deal.originalPrice && (
                  <span className="ml-3 text-base font-normal text-[#666666] line-through sm:text-lg">
                    {deal.originalPrice}
                  </span>
                )}
              </p>
            </>
          ) : isBonusOnly && deal.originalPrice ? (
            <>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#3e3ce7] sm:text-xs">
                Full Price — Free Bonuses
              </p>
              <p className="text-base font-semibold text-[#0C1412] tracking-wide sm:text-lg">
                <span className="text-xl font-bold sm:text-2xl">{deal.originalPrice}</span>
              </p>
            </>
          ) : null}
        </div>
      )}

      {deal.offer && (
        <div className="space-y-2 border-t border-[#0C1412]/10 pt-3 sm:pt-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/icons/gift.svg"
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] shrink-0"
              aria-hidden="true"
            />
            <h4 className="text-base font-semibold text-[#0C1412] sm:text-lg">
              Free Gift
            </h4>
          </div>
          <p className="text-sm leading-normal text-[#1f2937] tracking-wide text-left sm:text-base">
            {deal.offer}
          </p>
        </div>
      )}
    </div>
  );
}

function DealKeyDetails({ details }) {
  if (!details?.length) return null;

  return (
    <div className="rounded-lg bg-white p-3.5 sm:p-4">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4">
        {details.map((item, index) => {
          if (!item?.value && !item?.label) return null;
          return (
            <li key={index} className="space-y-0.5 text-left">
              {item.value && (
                <p className="text-base font-bold text-[#0C1412] sm:text-lg">{item.value}</p>
              )}
              {item.label && (
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#666666] sm:text-xs">
                  {item.label}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DealsTable({ deals, ctaLabel, title = "All Deals at a Glance" }) {
  if (!deals?.length) return null;

  return (
    <section className="my-8 sm:my-12" aria-labelledby="deals-table">
      <div className="max-w-4xl">
        <h2
          id="deals-table"
          className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
        >
          {title}
        </h2>
        <div className="mt-4 sm:mt-5 overflow-x-auto rounded-lg border border-[#0C1412]/10">
          <table className="min-w-full bg-white">
            <caption className="sr-only">
              Summary of all e-bike deals and discounts on this page
            </caption>
            <thead className="bg-gradient-to-r from-[#0C1412] to-[#1a1a2e]">
              <tr>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90 sm:py-4 sm:px-6 sm:text-sm"
                >
                  Bike
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90 sm:py-4 sm:px-6 sm:text-sm"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="min-w-[9.5rem] w-[22%] py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90 sm:min-w-[11rem] sm:py-4 sm:px-6 sm:text-sm"
                >
                  Total Savings
                </th>
                <th
                  scope="col"
                  className="hidden py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-white/90 sm:table-cell sm:py-4 sm:px-6 sm:text-sm"
                >
                  Free Gift
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wide text-white/90 sm:py-4 sm:px-6 sm:text-sm"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => {
                const isBonusOnly =
                  deal.dealType === "bonus-only" || (!deal.dealPrice && deal.originalPrice);

                return (
                  <tr
                    key={deal.id ?? deal.name}
                    className="border-t border-[#0C1412]/10 transition-colors hover:bg-[#3e3ce7]/5"
                  >
                    <td className="py-3 px-4 sm:py-4 sm:px-6">
                      {deal.id ? (
                        <a
                          href={`#${deal.id}`}
                          className="text-base font-semibold text-[#0C1412] transition-colors hover:text-[#3e3ce7] sm:text-lg"
                        >
                          {deal.name}
                        </a>
                      ) : (
                        <span className="text-base font-semibold text-[#0C1412] sm:text-lg">
                          {deal.name}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6">
                      {deal.dealPrice || deal.originalPrice || deal.limitedStock ? (
                        <div className="flex flex-col items-start gap-1.5">
                          {(deal.dealPrice || deal.originalPrice) && (
                            <div className="flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2">
                              {deal.dealPrice ? (
                                <span className="text-base font-semibold text-emerald-700 sm:text-lg">
                                  {deal.dealPrice}
                                </span>
                              ) : isBonusOnly && deal.originalPrice ? (
                                <span className="text-base font-semibold text-[#0C1412] sm:text-lg">
                                  {deal.originalPrice}
                                </span>
                              ) : null}
                              {deal.dealPrice && deal.originalPrice ? (
                                <span className="text-sm text-[#666666] line-through sm:text-base">
                                  {deal.originalPrice}
                                </span>
                              ) : null}
                            </div>
                          )}
                          {deal.limitedStock && <LimitedStockChip compact />}
                        </div>
                      ) : (
                        <span className="text-sm text-[#666666]">—</span>
                      )}
                    </td>
                    <td className="min-w-[9.5rem] w-[22%] py-3 px-4 sm:min-w-[11rem] sm:py-4 sm:px-6">
                      {deal.totalSavings || getPromoLabels(deal).length > 0 ? (
                        <div className="flex flex-col items-start gap-1.5">
                          {deal.totalSavings && (
                            <span className="whitespace-nowrap text-base font-semibold text-emerald-700 sm:text-lg">
                              {deal.totalSavings}
                            </span>
                          )}
                          {getPromoLabels(deal).length > 0 && (
                            <DealPromoLabels deal={deal} compact showLimitedStock={false} />
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-[#666666]">—</span>
                      )}
                    </td>
                    <td className="hidden py-3 px-4 sm:table-cell sm:py-4 sm:px-6">
                      {deal.offer ? (
                        <span className="line-clamp-2 text-sm text-[#666666]">{deal.offer}</span>
                      ) : (
                        <span className="text-sm text-[#666666]">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center sm:py-4 sm:px-6">
                      {deal.affiliateLink && ctaLabel ? (
                        <AnimatedButton
                          href={deal.affiliateLink}
                          external
                          rel="sponsored nofollow noopener"
                          className="text-xs sm:text-sm"
                        >
                          {ctaLabel}
                        </AnimatedButton>
                      ) : deal.id ? (
                        <a
                          href={`#${deal.id}`}
                          className="text-sm font-semibold text-[#3e3ce7] transition-colors hover:text-[#3e3ce7]/80"
                        >
                          Read review
                        </a>
                      ) : null}
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

function ProsConsList({ items }) {
  if (!items?.length) return null;

  return (
    <div className="rounded-xl bg-white p-6 sm:p-7">
      <ul className="space-y-3.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3.5">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
            <span className="text-base leading-normal text-black sm:text-base tracking-wide text-left">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DealCard({ deal, index, ctaLabel }) {
  const descriptionParagraphs = Array.isArray(deal.description)
    ? deal.description
    : deal.description
      ? [deal.description]
      : [];
  const hasDealSummary =
    deal.dealPrice || deal.originalPrice || deal.totalSavings || deal.offer;
  const reviewLink = getReviewLinkForDeal(deal);

  return (
    <article id={deal.id} className="scroll-mt-24 pb-16 sm:pb-20 md:pb-24">
      <header className="mb-6 max-w-4xl space-y-4 sm:mb-8">
        <h2 className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left">
          {deal.name}
        </h2>
      </header>

      {deal.imageUrl && (
        <div className="mb-8 max-w-4xl sm:mb-12">
          <div className="relative w-full overflow-hidden rounded-lg aspect-[16/9]">
            <DealBadge badge={deal.badge} />
            <Image
              src={deal.imageUrl}
              alt={deal.name}
              fill
              sizes="(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw"
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              quality={index === 0 ? 75 : 70}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1412]/10 via-transparent to-transparent" />
          </div>
        </div>
      )}

      <div className="max-w-4xl grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6">
        <aside className="lg:col-span-4 lg:order-first">
          <div className="space-y-6">
            {hasDealSummary && <DealSummaryBox deal={deal} />}

            {deal.keyDetails?.length > 0 && <DealKeyDetails details={deal.keyDetails} />}

            {(deal.affiliateLink && ctaLabel) || reviewLink ? (
              <div className="flex flex-row flex-wrap items-start gap-3 sm:flex-col">
                {deal.affiliateLink && ctaLabel && (
                  <AnimatedButton
                    href={deal.affiliateLink}
                    external
                    rel="sponsored nofollow noopener"
                    className="w-auto text-sm sm:w-full sm:text-base"
                  >
                    {ctaLabel}
                  </AnimatedButton>
                )}
                {reviewLink && (
                  <AnimatedButton
                    href={reviewLink}
                    variant="outlined"
                    className="w-auto text-sm sm:w-full sm:text-base"
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
              </div>
            ) : null}
          </div>
        </aside>

        <div className="lg:col-span-8">
          <div className="space-y-8 sm:space-y-10">
            {descriptionParagraphs.length > 0 && (
              <div className="space-y-4">
                {descriptionParagraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="text-base leading-normal text-black sm:text-base tracking-wide text-left"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {deal.pros?.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#0C1412] sm:text-2xl text-left">
                  Pros
                </h3>
                <ProsConsList items={deal.pros} />
              </div>
            )}

            {deal.cons?.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#0C1412] sm:text-2xl text-left">
                  Cons
                </h3>
                <ProsConsList items={deal.cons} />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * DealArticle Component
 *
 * Simplified layout for deal roundup posts (contentType: "deal").
 * Same page shell as MoneyArticle; body is intro, deal cards, internal links.
 */
export default function DealArticle({ post, publishedDate }) {
  const introductionParagraphs = Array.isArray(post.introductionParagraphs)
    ? post.introductionParagraphs
    : [];
  const deals = Array.isArray(post.deals) ? post.deals : [];

  const dateObj = post.publishedAt
    ? new Date(post.publishedAt)
    : publishedDate
      ? new Date(publishedDate)
      : null;
  const formattedDate = dateObj
    ? dateObj
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase()
    : publishedDate || "";

  return (
    <article className="mx-auto flex w-full max-w-[1440px] flex-col space-y-4 px-4 sm:px-6 md:px-12 lg:px-16">
      <header className="pt-12 pb-2 sm:pt-16 sm:pb-4 lg:pt-20 lg:pb-4">
        <div className="space-y-6">
          <div className="max-w-4xl">
            <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-[#666666]">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#0C1412]">
                    Home
                  </Link>
                </li>
                {post.categorySlug && post.category && (
                  <>
                    <li className="text-[#999999]">/</li>
                    <li>
                      <Link
                        href={`/${post.categorySlug}`}
                        className="transition-colors hover:text-[#0C1412]"
                      >
                        {post.category}
                      </Link>
                    </li>
                  </>
                )}
                {post.h1 && (
                  <>
                    <li className="text-[#999999]">/</li>
                    <li className="text-[#0C1412] font-medium" aria-current="page">
                      {post.h1}
                    </li>
                  </>
                )}
              </ol>
            </nav>

            {post.h1 && (
              <h1 className="text-3xl font-bold leading-[1.2] tracking-[-0.02em] text-[#0C1412] sm:text-3xl md:text-4xl lg:text-5xl text-left">
                {post.h1}
              </h1>
            )}

            {post.metaDescription && (
              <p className="text-base leading-normal text-black sm:text-base tracking-wide text-left mt-4 sm:mt-5">
                {post.metaDescription}
              </p>
            )}

            {post.dealEndsAt && (
              <div className="mt-4 sm:mt-5">
                <DealCountdown
                  endAt={post.dealEndsAt}
                  headline={post.countdownHeadline}
                  subline={post.countdownSubline}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 mt-6 sm:mt-8">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
              <Image
                src="/EBRLLogo.png"
                alt="E-Bike Review Lab"
                fill
                sizes="48px"
                className="rounded-full object-cover"
                quality={75}
              />
            </div>
            <span className="text-sm sm:text-base font-medium text-[#0C1412]">
              @ebikereviewlab
            </span>
          </div>

          {post.articleHeroImage && (
            <figure className="relative overflow-hidden rounded-2xl mt-4 sm:mt-6">
              <div className="aspect-[21/9] w-full">
                <Image
                  src={post.articleHeroImage}
                  alt={post.heroImageAlt || post.h1 || ""}
                  fill
                  sizes="(min-width: 1024px) 1024px, (min-width: 768px) 90vw, 100vw"
                  className="object-cover"
                  priority
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k="
                />
              </div>
              {post.heroImageAlt && (
                <figcaption className="sr-only">{post.heroImageAlt}</figcaption>
              )}
            </figure>
          )}

          {(post.category || publishedDate || post.publishedAt) && (
            <div className="flex flex-wrap items-center gap-4 mt-4 sm:mt-6">
              {post.category && (
                <span className="inline-flex items-center justify-center px-4 py-2 bg-black text-white text-xs font-semibold tracking-wide uppercase rounded-lg">
                  {post.category}
                </span>
              )}

              {(publishedDate || post.publishedAt) && (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-[#0C1412]"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <time
                    dateTime={dateObj ? dateObj.toISOString() : undefined}
                    className="text-sm font-medium text-[#0C1412]"
                  >
                    {formattedDate}
                  </time>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-16 lg:col-span-8">
          {introductionParagraphs.length > 0 && (
            <section className="pt-0 sm:pt-2">
              <div className="max-w-4xl space-y-4">
                {introductionParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-normal text-black sm:text-base tracking-wide text-left"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          )}

          {deals.length > 0 && (
            <DealsTable
              deals={deals}
              ctaLabel="Deal"
              title={post.dealsTableTitle}
            />
          )}

          {deals.length > 0 && (
            <section aria-label="Deal picks">
              {deals.map((deal, index) => (
                <DealCard
                  key={deal.id ?? index}
                  deal={deal}
                  index={index}
                  ctaLabel={post.productCtaLabel}
                />
              ))}
            </section>
          )}

          {post.internalLinks &&
            Array.isArray(post.internalLinks) &&
            post.internalLinks.length > 0 &&
            post.internalLinksTitle && (
              <section className="space-y-4" aria-labelledby="related-content">
                <div className="max-w-4xl">
                  <h2
                    id="related-content"
                    className="text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left"
                  >
                    {post.internalLinksTitle}
                  </h2>
                  <nav aria-label="Related articles">
                    <ul className="space-y-3 mt-4">
                      {post.internalLinks.map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link.url}
                            className="group flex items-start gap-3 pt-4 transition-all"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#3e3ce7] transition-colors group-hover:text-[#3e3ce7]/80"
                              aria-hidden="true"
                            >
                              <path d="M5 12h14" />
                              <path d="M12 5l7 7-7 7" />
                            </svg>
                            <div className="flex-1">
                              <span className="font-semibold text-[#0C1412] transition-colors group-hover:text-[#3e3ce7]">
                                {link.text}
                              </span>
                              {link.description && (
                                <p className="mt-1 text-base leading-normal text-black sm:text-base tracking-wide text-left">
                                  {link.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </section>
            )}
        </div>

        <div className="lg:col-span-4">
          <SidebarContent />
        </div>
      </div>
    </article>
  );
}
