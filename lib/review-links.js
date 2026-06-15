import { allPosts } from "@/content/posts";

const REVIEW_CONTENT_TYPES = new Set(["product", "brand"]);

function buildReviewLinkMap() {
  const byId = new Map();

  for (const post of allPosts) {
    if (!post.id || !REVIEW_CONTENT_TYPES.has(post.contentType)) continue;

    const path = `/${post.categorySlug}/${post.slug}`;
    const existing = byId.get(post.id);

    if (!existing) {
      byId.set(post.id, { path, publishedAt: post.publishedAt ?? "" });
      continue;
    }

    const nextPublishedAt = post.publishedAt ?? "";
    if (nextPublishedAt > existing.publishedAt) {
      byId.set(post.id, { path, publishedAt: nextPublishedAt });
    }
  }

  return new Map([...byId.entries()].map(([id, { path }]) => [id, path]));
}

const reviewLinkByProductId = buildReviewLinkMap();

export function getReviewLinkForDeal(deal) {
  if (!deal) return null;
  if (deal.reviewLink) return deal.reviewLink;
  if (!deal.id) return null;
  return reviewLinkByProductId.get(deal.id) ?? null;
}
