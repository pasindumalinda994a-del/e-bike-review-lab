"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/content/categories";

const FALLBACK_IMAGE = "/images/products/hero_Img5.jpg";

// Wide banner used on the homepage to tell the brand story.
export default function HomeStoryBanner({
  title = "Built for serious e-bike riders, guided by real-world testing.",
  description = "From commuter stress tests to singletrack shakedowns, we document exactly how every e-bike handles range, power, safety tech, and serviceability. No hype—just transparent ride data.",
  ctaLabel = "Explore our latest guides",
  ctaHref = categories[0] ? `/${categories[0].slug}` : "/",
  image = FALLBACK_IMAGE,
}) {
  return (
    <section
      aria-labelledby="home-story"
      className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#0C1412] text-white shadow-[0_30px_60px_rgba(12,20,18,0.35)]"
    >
      <div className="relative mx-auto aspect-[2/1] w-full max-w-[1400px] overflow-hidden">
        <Image
          src={image}
          alt="Rider preparing an electric bike for the next trip"
          fill
          sizes="(min-width: 1536px) 1400px, 100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1412]/90 via-[#0C1412]/75 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-[1400px] flex-col justify-center gap-6 px-8 py-12 sm:px-16 lg:px-24">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#3e3ce7]">
            Why EBikeReviewLab?
          </p>
          <h2
            id="home-story"
            className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]"
          >
            {title}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
          <div>
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-xl bg-[#3e3ce7] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3e3ce7]/90"
            >
              {ctaLabel} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


