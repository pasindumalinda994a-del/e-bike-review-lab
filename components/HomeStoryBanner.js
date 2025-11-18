"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FALLBACK_IMAGE = "/default-og.png";

// Wide banner used on the homepage to tell the brand story.
export default function HomeStoryBanner({
  image = FALLBACK_IMAGE,
  video,
  heading,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Intersection Observer for lazy loading and pausing when out of view
  useEffect(() => {
    if (!video || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          setIsInView(isVisible);

          // Load video when it enters viewport
          if (isVisible && !shouldLoadVideo) {
            setShouldLoadVideo(true);
          }

          // Play/pause video based on visibility and reduced motion preference
          if (videoRef.current) {
            if (isVisible && !prefersReducedMotion) {
              videoRef.current.play().catch(() => {
                // Silently handle autoplay restrictions
              });
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        threshold: 0.25, // Trigger when 25% of video is visible
        rootMargin: "50px", // Start loading slightly before entering viewport
      }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [video, shouldLoadVideo, prefersReducedMotion]);

  // Handle video errors gracefully
  const handleVideoError = () => {
    if (videoRef.current) {
      videoRef.current.style.display = "none";
    }
  };

  return (
    <section
      className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#0C1412] text-white"
    >
      <div
        ref={containerRef}
        className={`relative mx-auto w-full overflow-hidden rounded-3xl ${video ? 'h-[60vh] min-h-[400px] sm:h-[70vh] sm:min-h-[500px] md:h-[80vh] md:min-h-[600px]' : 'aspect-[2/1] max-w-[1400px]'}`}
      >
        {video ? (
          <>
            {/* Poster image as fallback and placeholder */}
            <Image
              src={image}
              alt="Rider preparing an electric bike for the next trip"
              fill
              sizes="(min-width: 1536px) 1400px, 100vw"
              className={`object-cover transition-opacity duration-300 ${
                shouldLoadVideo && isInView ? "opacity-0" : "opacity-100"
              }`}
              priority
            />
            {/* Video element - only loads when in viewport */}
            {shouldLoadVideo && (
              <video
                ref={videoRef}
                src={video}
                autoPlay={isInView && !prefersReducedMotion}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
                aria-label="Background video of e-bike rider"
                onError={handleVideoError}
                onLoadedData={() => {
                  // Ensure video plays when loaded if in view
                  if (videoRef.current && isInView && !prefersReducedMotion) {
                    videoRef.current.play().catch(() => {
                      // Silently handle autoplay restrictions
                    });
                  }
                }}
              />
            )}
          </>
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1412]/95 via-[#0C1412]/80 to-[#0C1412]/60" />
        
        {/* Attractive Heading Overlay */}
        {heading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
            <h2 className="max-w-5xl text-center text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              {heading}
            </h2>
          </div>
        )}
      </div>
    </section>
  );
}


