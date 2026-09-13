import { ferlaArticles } from "./ferla";
import { helokeepArticles } from "./helokeep";
import { retrospecArticles } from "./retrospec";
import { velotricArticles } from "./velotric";

export const brandArticles = [
  ...retrospecArticles,
  ...velotricArticles,
  ...ferlaArticles,
  ...helokeepArticles,
];
