"use client";

import Link from "next/link";
import { useState } from "react";

// Email capture form for the homepage.
export default function HomeNewsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle', 'success', 'error'
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    const formData = new FormData(e.target);
    const emailValue = formData.get('email')?.toString().trim() || '';
    
    try {
      const response = await fetch('/newsletter/subscribe', {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      });
      
      // Check if response was successful
      if (response.ok || response.redirected) {
        setSubmitStatus('success');
        setEmail(''); // Clear the form
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="newsletter-signup"
      className="w-full"
    >
      <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-[#0C1412]/10 bg-gradient-to-br from-white to-[#3e3ce7]/5 p-8 shadow-xl sm:space-y-10 sm:p-12 md:p-16">
        <div className="space-y-4 text-center">
          <h2
            id="newsletter-signup"
            className="text-3xl font-bold leading-tight tracking-tight text-[#0C1412] sm:text-4xl md:text-5xl"
          >
            Join the EBikeReviewLab Insider Brief
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#0C1412]/80 sm:text-lg">
            Weekly ride logs, firmware notes, launch alerts, and upgrade ideas to
            help you dial in the perfect commuter, cargo hauler, or trail rig.
            No fluff—just actionable testing insights.
          </p>
        </div>
        <div className="space-y-5">
          {submitStatus === 'success' && (
            <div className="mx-auto max-w-2xl rounded-2xl bg-green-50 border border-green-200 p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-green-900">Successfully subscribed!</p>
                <p className="text-sm text-green-700 mt-1">Check your inbox (and spam folder) for confirmation.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mx-auto max-w-2xl rounded-2xl bg-red-50 border border-red-200 p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-red-900">Something went wrong</p>
                <p className="text-sm text-red-700 mt-1">Please try again or check your email address.</p>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-2xl flex-col gap-4 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={isSubmitting}
              className="flex-1 rounded-full border border-[#0C1412]/20 bg-white px-6 py-4 text-base text-[#0C1412] placeholder:text-[#0C1412]/50 shadow-sm transition-all duration-300 focus:border-[#3e3ce7] focus:outline-none focus:ring-2 focus:ring-[#3e3ce7]/20 focus:shadow-md disabled:opacity-60 disabled:cursor-not-allowed sm:px-7 sm:py-4"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-[#3e3ce7] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#3e3ce7]/30 transition-all duration-300 hover:bg-[#3e3ce7]/90 hover:shadow-xl hover:shadow-[#3e3ce7]/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3e3ce7] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 sm:px-10"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          <p className="text-center text-xs leading-relaxed text-[#0C1412]/60 sm:text-sm">
            By subscribing, you agree to our{" "}
            <Link
              href="/privacy"
              className="font-semibold text-[#3e3ce7] underline decoration-2 underline-offset-2 transition-colors duration-300 hover:text-[#3e3ce7]/80"
            >
              privacy policy
            </Link>{" "}
            and confirm you're 18 or older. You can unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}


