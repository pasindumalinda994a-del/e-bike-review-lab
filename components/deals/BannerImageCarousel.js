"use client";

import Image from "next/image";
import Link from "next/link";

export default function BannerImageCarousel({
  images = [],
  href,
  activeIndex = 0,
  onSelect,
  className = "",
}) {
  if (!images.length || !href) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <Link
        href={href}
        className="group relative min-w-0 flex-1 overflow-hidden rounded-md ring-1 ring-[#3e3ce7]/40 transition-shadow hover:ring-[#3e3ce7]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7]"
        aria-label="View current deal promotion"
      >
        <div className="relative aspect-[392/72] w-full bg-[#0C1412]">
          {images.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 480px, 90vw"
              className={`object-contain transition-opacity duration-700 ease-in-out ${
                index === activeIndex
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            />
          ))}
        </div>
      </Link>

      {images.length > 1 ? (
        <div
          className="flex shrink-0 flex-col items-center justify-center gap-1.5 rounded-full bg-white/5 px-1 py-2"
          aria-label="Promo banner slides"
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show promo slide ${index + 1} of ${images.length}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => onSelect?.(index)}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "h-5 w-1.5 bg-[#3e3ce7] shadow-[0_0_8px_rgba(62,60,231,0.6)]"
                  : "h-1.5 w-1.5 bg-white/30 hover:bg-white/55"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
