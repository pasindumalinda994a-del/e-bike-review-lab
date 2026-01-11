"use client";

import Image from "next/image";
import Link from "next/link";

// Category hero with breadcrumb navigation, square image, and title/description layout.
export default function CategoryHero({ categoryName, image, description }) {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col px-4 pt-12 pb-0 text-[#0C1412] sm:px-6 sm:pt-16 sm:pb-2 md:px-12 md:pt-20 md:pb-4 lg:px-16 bg-[#F5F5F5]">
      <div className="mx-auto w-full max-w-7xl">
        {/* Breadcrumb Navigation */}
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
            <li className="text-[#999999]">/</li>
            <li className="text-[#0C1412] font-medium" aria-current="page">
              {categoryName}
            </li>
          </ol>
        </nav>

        {/* Main Content: Image and Text */}
        <div className="flex flex-row gap-4 sm:gap-8 md:gap-10">
          {/* Square Image Container */}
          {image && (
            <div className="relative aspect-square w-[130px] flex-shrink-0 overflow-hidden rounded-lg bg-[#E5E5E5] sm:w-[100px] md:w-[130px] lg:w-[160px]">
              <Image
                src={image}
                alt={categoryName}
                fill
                sizes="(max-width: 640px) 130px, (max-width: 768px) 100px, (max-width: 1024px) 130px, 160px"
                className="object-cover"
                priority
                quality={75}
              />
            </div>
          )}

          {/* Title and Description */}
          <div className="flex flex-col justify-center max-w-md">
            <h1 className="mb-4 text-xl font-bold leading-tight text-[#0C1412] sm:text-2xl md:text-3xl lg:text-4xl">
              {categoryName}
            </h1>
            {description && (
              <p className="text-base leading-relaxed text-[#666666] sm:text-base md:text-md">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


