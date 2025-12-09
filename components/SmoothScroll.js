"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll component that initializes Lenis smooth scrolling
 * This component wraps the app and provides smooth scroll behavior
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Initialize Lenis with optimized settings for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for smooth feel
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // Disable on touch devices for better native feel
      touchMultiplier: 2,
      infinite: false,
    });

    // Animation frame function for smooth updates
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the animation loop
    requestAnimationFrame(raf);

    // Handle resize events to recalculate scroll bounds
    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

