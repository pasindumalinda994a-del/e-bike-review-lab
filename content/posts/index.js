// Combine all content buckets so the rest of the app can loop everything.
import { moneyArticles } from "./money";
import { dealArticles } from "./deals";
import { informationalArticles } from "./informational";
import { productArticles } from "./product";
import { brandArticles } from "./brand-articles";

// Order matters for things like "latest" sorting when timestamps match.
// Money + informational are your main pillars; product reviews slot in alongside.
export const allPosts = [
  ...moneyArticles,
  ...dealArticles,
  ...informationalArticles,
  ...productArticles,
  ...brandArticles,
];


