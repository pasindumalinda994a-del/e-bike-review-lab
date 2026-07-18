import Link from "next/link";
import Image from "next/image";

/**
 * MDX component map — H2 / body typography matched to MoneyArticle.
 */

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k=";

const H2_CLASS =
  "text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0C1412] sm:text-3xl text-left";
const H3_CLASS =
  "text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-[#0C1412] sm:text-2xl text-left";
const P_CLASS =
  "text-base leading-normal text-black sm:text-base tracking-wide text-left";

export function H2({ children }) {
  return (
    <h2 className={`${H2_CLASS} pt-6`}>
      {children}
    </h2>
  );
}

export function H3({ children }) {
  return (
    <h3 className={`${H3_CLASS} pt-2`}>
      {children}
    </h3>
  );
}

export function Paragraph({ children }) {
  return <p className={P_CLASS}>{children}</p>;
}

export function UnorderedList({ children }) {
  return (
    <ul className="space-y-3 text-left [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.6em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-black [&>li]:before:content-['']">
      {children}
    </ul>
  );
}

export function OrderedList({ children }) {
  return (
    <ol className="list-decimal space-y-3 pl-6 text-left marker:font-semibold marker:text-[#0C1412]">
      {children}
    </ol>
  );
}

export function ListItem({ children }) {
  return (
    <li className="text-base leading-normal text-black sm:text-base tracking-wide">
      {children}
    </li>
  );
}

export function Strong({ children }) {
  return <strong className="font-semibold text-[#0C1412]">{children}</strong>;
}

export function Blockquote({ children }) {
  return (
    <blockquote className="border-l-4 border-[#0C1412] bg-[#f9fafb] pl-6 pr-4 py-4 sm:pl-8">
      <div className={`${P_CLASS} font-medium`}>{children}</div>
    </blockquote>
  );
}

export function Anchor({ href, children }) {
  const className =
    "font-medium text-[#3e3ce7] underline-offset-2 transition-colors hover:text-[#0C1412] hover:underline";

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function Table({ children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">{children}</table>
      </div>
    </div>
  );
}

export function TableHead({ children }) {
  return <thead className="bg-[#f9fafb]">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return (
    <tr className="border-t border-[#e5e7eb] transition-colors hover:bg-[#f9fafb] first:border-t-0">
      {children}
    </tr>
  );
}

export function TableHeader({ children }) {
  return (
    <th className="px-4 py-3 text-left text-sm font-semibold text-[#0C1412] first:pl-6">
      {children}
    </th>
  );
}

export function TableCell({ children }) {
  return (
    <td className={`px-4 py-3 first:pl-6 ${P_CLASS}`}>
      {children}
    </td>
  );
}

/**
 * FAQ accordion — matches MoneyArticle FAQ toggle design.
 */
export function FAQ({ children, heading = "Frequently Asked Questions" }) {
  return (
    <section className="space-y-8 py-12" aria-labelledby="faq-heading">
      <header className="max-w-4xl space-y-3">
        <h2 id="faq-heading" className={H2_CLASS}>
          {heading}
        </h2>
      </header>
      <div className="max-w-4xl space-y-3">{children}</div>
    </section>
  );
}

export function FAQItem({ question, children }) {
  const summaryId = `faq-${String(question).slice(0, 24).replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <details className="group rounded-lg bg-white p-5 sm:p-6">
      <summary
        id={summaryId}
        className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold text-[#111827] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7] focus-visible:ring-offset-2 sm:text-lg"
      >
        <span>{question}</span>
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#6b7280] transition-all group-open:rotate-45 group-open:border-[#3e3ce7] group-open:text-[#3e3ce7]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </span>
      </summary>
      <div
        id={`${summaryId}-panel`}
        role="region"
        aria-labelledby={summaryId}
        className="mt-4 space-y-4 pt-4 [&_p]:text-base [&_p]:leading-normal [&_p]:tracking-wide [&_p]:text-black"
      >
        {children}
      </div>
    </details>
  );
}

/**
 * Inline article image — use inside MDX bodies only.
 * Matches MoneyArticle buyers-guide image proportions (16/9, rounded).
 */
export function ArticleImage({ src, alt = "", caption }) {
  if (!src) return null;

  return (
    <figure className="my-8 max-w-4xl">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 768px, (min-width: 768px) 90vw, 100vw"
          className="object-cover"
          quality={75}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm leading-normal tracking-wide text-[#666666]">
          {caption}
        </figcaption>
      ) : alt ? (
        <figcaption className="sr-only">{alt}</figcaption>
      ) : null}
    </figure>
  );
}

export function RelatedGuides({ guides = [], heading = "Further Reading & Resources" }) {
  if (!guides.length) return null;

  return (
    <section className="space-y-6 py-4">
      <h2 className={H2_CLASS}>{heading}</h2>
      <ul className="space-y-3">
        {guides.map((guide) => {
          const title = guide?.title;
          const url = guide?.url;
          if (!title || !url) return null;
          return (
            <li key={url}>
              <Link
                href={url}
                className="group inline-flex items-center gap-2 text-base font-medium text-[#3e3ce7] transition-colors hover:text-[#0C1412]"
              >
                <span className="border-b border-transparent group-hover:border-[#3e3ce7]">
                  {title}
                </span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Default MDX element → component map for MDXRemote */
export const informationalMdxComponents = {
  h2: H2,
  h3: H3,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  strong: Strong,
  a: Anchor,
  blockquote: Blockquote,
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  FAQ,
  FAQItem,
  ArticleImage,
  RelatedGuides,
};
