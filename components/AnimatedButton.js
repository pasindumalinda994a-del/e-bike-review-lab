"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * AnimatedButton Component
 * 
 * Button with the same style and animations as SiteHeader buttons.
 * Features dual-text animation on hover (same as header navigation).
 * 
 * @param {Object} props - Component props
 * @param {string} props.href - Link URL
 * @param {string} props.children - Button text
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.external] - Whether link opens in new tab
 * @param {string} [props.rel] - Link rel attribute
 * @param {string} [props.variant] - Button variant: 'filled' (default) or 'outlined'
 * @param {Function} [props.onClick] - Optional click handler
 */
export default function AnimatedButton({ 
  href, 
  children, 
  className = '', 
  external = false,
  rel = '',
  variant = 'filled',
  onClick
}) {
  const buttonRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const button = buttonRef.current;
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;

    if (!button || !topText || !bottomText) return;

    // Set initial state
    if (isInitialMount.current) {
      gsap.set(topText, { y: 0, opacity: 1 });
      gsap.set(bottomText, { y: "-150%", opacity: 1 });
      isInitialMount.current = false;
    }

    let hoverTl = null;

    const handleMouseEnter = () => {
      if (hoverTl) hoverTl.kill();
      hoverTl = gsap.timeline();
      hoverTl.to(topText, {
        y: "-150%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      hoverTl.to(bottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleMouseLeave = () => {
      if (hoverTl) hoverTl.kill();
      hoverTl = gsap.timeline();
      hoverTl.to(bottomText, {
        y: "150%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      hoverTl.to(topText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleClick = (e) => {
      if (hoverTl) hoverTl.kill();
      hoverTl = gsap.timeline();
      hoverTl.to(topText, {
        y: "-150%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      hoverTl.to(bottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
      
      // Call optional onClick handler
      if (onClick) {
        onClick(e);
      }
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("click", handleClick);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("click", handleClick);
      if (hoverTl) hoverTl.kill();
    };
  }, []);

  const variantClasses = variant === 'outlined'
    ? "inline-flex items-center justify-center border-2 border-black bg-transparent text-black px-5 py-2.5 rounded-md font-normal text-base relative overflow-hidden transition-colors hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
    : "inline-flex items-center justify-center bg-black text-white px-5 py-2.5 rounded-md font-normal text-base relative overflow-hidden transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300";
  const combinedClasses = `${variantClasses} ${className}`;

  const linkProps = external 
    ? { target: "_blank", rel: rel || "nofollow noopener" }
    : {};

  return (
    <a
      ref={buttonRef}
      href={href}
      className={combinedClasses}
      {...linkProps}
    >
      <span className="flex items-center gap-2 relative">
        <span ref={topTextRef} className="flex items-center gap-2">
          {children}
        </span>
        <span ref={bottomTextRef} className="flex items-center gap-2 absolute top-0 left-0 w-full">
          {children}
        </span>
      </span>
    </a>
  );
}
