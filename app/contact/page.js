"use client";

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import JsonLdSchema from '@/components/JsonLdSchema';
import { buildContactPageSchema } from '@/lib/metadata';

const CONTACT_EMAIL = 'pasindumalinda994a@gmail.com';

// Note: Metadata should be handled in a layout or parent component for client components
// This is a client component for form interactivity

export default function ContactPage() {
  const contactSchema = buildContactPageSchema({ email: CONTACT_EMAIL });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  
  // Refs for button animation
  const submitButtonRef = useRef(null);
  const submitTopTextRef = useRef(null);
  const submitBottomTextRef = useRef(null);
  const isInitialMount = useRef(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);

      const response = await fetch('/contact/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '', agreeToTerms: false });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setIsSubmitting(false);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  // GSAP animation for submit button
  useEffect(() => {
    const submitButton = submitButtonRef.current;
    const submitTopText = submitTopTextRef.current;
    const submitBottomText = submitBottomTextRef.current;

    if (!submitButton || !submitTopText || !submitBottomText) return;

    // Set initial state
    if (isInitialMount.current) {
      gsap.set(submitTopText, { y: 0, opacity: 1 });
      gsap.set(submitBottomText, { y: "200%", opacity: 1 });
      isInitialMount.current = false;
    }

    let submitHoverTl = null;

    const handleSubmitMouseEnter = () => {
      if (submitHoverTl) submitHoverTl.kill();
      submitHoverTl = gsap.timeline();
      submitHoverTl.to(submitTopText, {
        y: "-200%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      submitHoverTl.to(submitBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleSubmitMouseLeave = () => {
      if (submitHoverTl) submitHoverTl.kill();
      submitHoverTl = gsap.timeline();
      submitHoverTl.to(submitBottomText, {
        y: "200%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      submitHoverTl.to(submitTopText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleSubmitClick = () => {
      if (submitHoverTl) submitHoverTl.kill();
      submitHoverTl = gsap.timeline();
      submitHoverTl.to(submitTopText, {
        y: "-200%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      submitHoverTl.to(submitBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    // Add event listeners
    submitButton.addEventListener("mouseenter", handleSubmitMouseEnter);
    submitButton.addEventListener("mouseleave", handleSubmitMouseLeave);
    submitButton.addEventListener("click", handleSubmitClick);

    // Cleanup
    return () => {
      submitButton.removeEventListener("mouseenter", handleSubmitMouseEnter);
      submitButton.removeEventListener("mouseleave", handleSubmitMouseLeave);
      submitButton.removeEventListener("click", handleSubmitClick);
      if (submitHoverTl) submitHoverTl.kill();
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 text-[#0C1412] md:px-12 lg:px-16 lg:py-20">
      <JsonLdSchema data={contactSchema} />
      
      {/* Header Section */}
      <header className="mb-12 text-center lg:mb-16">
        <h1 className="mx-auto max-w-3xl text-2xl font-bold tracking-tight text-[#000000] md:text-3xl lg:text-4xl mb-4">
          We're Here to Help You Grow.
        </h1>
        <p className="mx-auto text-sm leading-normal text-black sm:text-base text-center max-w-2xl mb-2">
          Have questions, ideas, or collaboration proposals?
        </p>
        <p className="mx-auto text-sm leading-normal text-black sm:text-base text-center max-w-2xl">
          Reach out and let's connect.
        </p>
      </header>

      {/* Contact Form */}
      <section className="mx-auto max-w-2xl">
        <div className="rounded-lg bg-white p-8 md:p-10">

          {submitStatus === 'success' && (
            <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-green-900">Message sent successfully!</p>
                <p className="text-sm text-green-700 mt-1">We'll get back to you within 2 business days.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-red-900">Something went wrong</p>
                <p className="text-sm text-red-700 mt-1">Please try again or email us directly at {CONTACT_EMAIL}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#0C1412] mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base text-[#0C1412] placeholder:text-gray-400 transition-all focus:border-gray-400 focus:outline-none focus:bg-white"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#0C1412] mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@framer.com"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base text-[#0C1412] placeholder:text-gray-400 transition-all focus:border-gray-400 focus:outline-none focus:bg-white"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#0C1412] mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base text-[#0C1412] placeholder:text-gray-400 transition-all resize-y focus:border-gray-400 focus:outline-none focus:bg-white"
              />
            </div>

            {/* Submit Button */}
            <button
              ref={submitButtonRef}
              type="submit"
              disabled={isSubmitting || !formData.agreeToTerms}
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-md font-normal text-base relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:bg-black disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px]"
            >
              <span className="flex items-center relative">
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <span ref={submitTopTextRef} className="block">
                      Submit
                    </span>
                    <span ref={submitBottomTextRef} className="block absolute top-0 left-0 w-full">
                      Submit
                    </span>
                  </>
                )}
              </span>
            </button>

            {/* Terms and Privacy Checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-black"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-[#0C1412] leading-relaxed">
                By clicking the Subscribe button, you acknowledge that you have read and agree to our{' '}
                <a href="/privacy-policy" className="text-black underline hover:no-underline">
                  Privacy Policy
                </a>
                {' '}and{' '}
                <a href="/terms-of-use" className="text-black underline hover:no-underline">
                  Terms Of Use
                </a>
              </label>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

