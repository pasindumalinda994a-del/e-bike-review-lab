import { dealArticles } from "@/content/posts/deals";

export const DEALS_BANNER_STORAGE_KEY = "ebrl-deals-banner-dismissed";
export const DEALS_SIDEBAR_STORAGE_KEY = "ebrl-deals-sidebar-dismissed";
export const DEALS_POPUP_STORAGE_KEY = "ebrl-deals-popup-dismissed";

function isDealActive(post) {
  if (!post?.dealEndsAt) return false;
  const end = new Date(post.dealEndsAt);
  return !Number.isNaN(end.getTime()) && end.getTime() > Date.now();
}

function parseSavingsAmount(value) {
  if (!value || typeof value !== "string") return 0;
  const match = value.match(/[\d,]+/);
  if (!match) return 0;
  return Number.parseInt(match[0].replace(/,/g, ""), 10) || 0;
}

function deriveTeaser(deals = []) {
  let maxSavings = 0;

  for (const deal of deals) {
    maxSavings = Math.max(maxSavings, parseSavingsAmount(deal.totalSavings));
  }

  if (maxSavings > 0) {
    return `Save up to $${maxSavings.toLocaleString("en-US")}`;
  }

  const firstPriceCut = deals.find((deal) => deal.dealPrice);
  if (firstPriceCut?.dealPrice) {
    return `Deals from ${firstPriceCut.dealPrice}`;
  }

  return null;
}

function toBannerDeal(post) {
  return {
    slug: post.slug,
    href: `/${post.categorySlug}/${post.slug}`,
    headline: post.countdownHeadline ?? "Deal ends soon",
    subline:
      post.countdownSubline ??
      "Grab these prices before the promotion closes",
    dealEndsAt: post.dealEndsAt,
    teaser: deriveTeaser(post.deals),
    bannerImages: post.bannerImages ?? [],
    sidebarImages: post.sidebarImages ?? [],
  };
}

export function getActiveDealPosts() {
  return dealArticles
    .filter(isDealActive)
    .sort(
      (a, b) =>
        new Date(a.dealEndsAt).getTime() - new Date(b.dealEndsAt).getTime(),
    )
    .map(toBannerDeal);
}

export function getBannerDismissKey(activeDeals) {
  return activeDeals.map((deal) => deal.slug).join("|");
}
