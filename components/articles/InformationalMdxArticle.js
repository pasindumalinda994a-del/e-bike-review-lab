import Link from "next/link";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import SidebarContent from "@/components/SidebarContent";
import {
  informationalMdxComponents,
  RelatedGuides,
} from "@/components/mdx/informational-components";

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k=";

/**
 * MDX informational article using the same heading, hero, and sidebar
 * shell as MoneyArticle.
 */
export default async function InformationalMdxArticle({
  post,
  publishedDate,
  source,
  heroImage,
}) {
  const headline = post.h1 ?? post.title;
  const articleHeroImage =
    heroImage ?? post.articleHeroImage ?? post.heroImage;
  const heroImageAlt = post.heroImageAlt ?? headline ?? "";
  const relatedGuides = post.relatedGuides ?? [];

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

  const { content } = await compileMDX({
    source,
    components: informationalMdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <article className="mx-auto flex w-full max-w-[1440px] flex-col space-y-4 px-4 sm:px-6 md:px-12 lg:px-16">
      <header className="pt-12 pb-2 sm:pt-16 sm:pb-4 lg:pt-20 lg:pb-4">
        <div className="space-y-6">
          <div className="max-w-4xl">
            <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-[#666666]">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-[#0C1412]"
                  >
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
                {headline && (
                  <>
                    <li className="text-[#999999]">/</li>
                    <li
                      className="font-medium text-[#0C1412]"
                      aria-current="page"
                    >
                      {headline}
                    </li>
                  </>
                )}
              </ol>
            </nav>

            {headline && (
              <h1 className="text-left text-3xl font-bold leading-[1.2] tracking-[-0.02em] text-[#0C1412] sm:text-3xl md:text-4xl lg:text-5xl">
                {headline}
              </h1>
            )}

            {post.metaDescription && (
              <p className="mt-4 text-left text-base leading-normal tracking-wide text-black sm:mt-5 sm:text-base">
                {post.metaDescription}
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3 sm:mt-8">
            <div className="relative h-10 w-10 flex-shrink-0 sm:h-12 sm:w-12">
              <Image
                src="/EBRLLogo.png"
                alt="E-Bike Review Lab"
                fill
                sizes="48px"
                className="rounded-full object-cover"
                quality={75}
              />
            </div>
            <span className="text-sm font-medium text-[#0C1412] sm:text-base">
              @ebikereviewlab
            </span>
          </div>

          {articleHeroImage && (
            <figure className="relative mt-4 overflow-hidden rounded-2xl sm:mt-6">
              <div className="aspect-[21/9] w-full">
                <Image
                  src={articleHeroImage}
                  alt={heroImageAlt}
                  fill
                  sizes="(min-width: 1024px) 1024px, (min-width: 768px) 90vw, 100vw"
                  className="object-cover"
                  priority
                  quality={75}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
              {heroImageAlt && (
                <figcaption className="sr-only">{heroImageAlt}</figcaption>
              )}
            </figure>
          )}

          {(post.category || publishedDate || post.publishedAt) && (
            <div className="mt-4 flex flex-wrap items-center gap-4 sm:mt-6">
              {post.category && (
                <span className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
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
        <div className="space-y-8 lg:col-span-8">
          {content}

          {relatedGuides.length > 0 && (
            <RelatedGuides guides={relatedGuides} />
          )}
        </div>

        <div className="lg:col-span-4">
          <SidebarContent />
        </div>
      </div>
    </article>
  );
}
