"use client";

import Image from "next/image";

const FALLBACK_IMAGE = "/images/products/hero_Img5.jpg";

// Wide banner used on the homepage to tell the brand story.
export default function HomeStoryBanner({
  image = FALLBACK_IMAGE,
  video,
}) {
  return (
    <section
      className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#0C1412] text-white shadow-[0_30px_60px_rgba(12,20,18,0.35)]"
    >
      <div className={`relative mx-auto w-full overflow-hidden ${video ? 'h-screen' : 'aspect-[2/1] max-w-[1400px]'}`}>
        {video ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            aria-label="Background video of e-bike rider"
          />
        ) : (
          <Image
            src={image}
            alt="Rider preparing an electric bike for the next trip"
            fill
            sizes="(min-width: 1536px) 1400px, 100vw"
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1412]/90 via-[#0C1412]/75 to-transparent" />
      </div>
    </section>
  );
}


