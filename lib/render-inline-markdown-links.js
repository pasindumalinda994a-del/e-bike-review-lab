import { createElement, Fragment } from "react";
import Link from "next/link";

const LINK_CLASS =
  "font-medium text-[#3e3ce7] underline-offset-2 transition-colors hover:text-[#0C1412] hover:underline";

/**
 * Parse `[label](/path)` or `[label](https://...)` into React nodes with Next.js Link / <a>.
 * Leaves all other text unchanged. Does not enable HTML injection.
 */
export function renderInlineMarkdownLinks(text) {
  if (typeof text !== "string") return text;
  if (!text.includes("[")) return text;

  const parts = [];
  let lastIndex = 0;
  const regex = /\[([^\]]+)\]\((\/[^)\s]+|https?:\/\/[^)\s]+)\)/g;
  let match;
  let key = 0;

  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const label = match[1];
    const href = match[2];

    if (href.startsWith("/")) {
      parts.push(
        createElement(
          Link,
          { key: `md-link-${key++}`, href, className: LINK_CLASS },
          label
        )
      );
    } else {
      parts.push(
        createElement(
          "a",
          {
            key: `md-link-${key++}`,
            href,
            className: LINK_CLASS,
            rel: "noopener noreferrer",
          },
          label
        )
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex === 0) return text;
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? createElement(Fragment, null, ...parts) : text;
}
