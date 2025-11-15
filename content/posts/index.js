// Combine the two content buckets so the rest of the app can loop everything.
import { moneyArticles } from "./money";
import { informationalArticles } from "./informational";

export const allPosts = [...moneyArticles, ...informationalArticles];

