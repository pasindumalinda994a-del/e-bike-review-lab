import { ferlaArticles } from "./ferla";
import { retrospecArticles } from "./retrospec";
import { velotricArticles } from "./velotric";

export const brandArticles = [
  ...retrospecArticles,
  ...velotricArticles,
  ...ferlaArticles,
];
