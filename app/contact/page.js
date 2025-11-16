"use client";

import { useState } from 'react';
import JsonLdSchema from '@/components/JsonLdSchema';
import { buildContactPageSchema } from '@/lib/metadata';

const CONTACT_EMAIL = 'hello@ebikereviewlab.com';

// Note: Metadata should be handled in a layout or parent component for client components
// This is a client component for form interactivity

export default function ContactPage() {
  const contactSchema = buildContactPageSchema({ email: CONTACT_EMAIL });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission - Replace with actual API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', inquiryType: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 text-[#0C1412] md:px-12 lg:px-16 lg:py-20">
      <JsonLdSchema data={contactSchema} />
      
      {/* Header Section */}
      <header className="mb-12 text-center lg:mb-16">
        <div className="inline-block mb-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3e3ce7] bg-[#3e3ce7]/10 px-4 py-2 rounded-full">
            Get In Touch
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-[#0C1412] md:text-5xl lg:text-6xl mb-4">
          Contact Us
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#0C1412]/80 md:text-lg">
          We love hearing from dedicated e-bike riders, brand partners, and readers.
          Send us a message and the right teammate will get back within two business days.
        </p>
      </header>

      {/* Contact Form */}
      <section className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-[#3e3ce7]/15 bg-white p-8 shadow-[0_25px_50px_rgba(12,20,18,0.1)] md:p-10 lg:p-12">

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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#0C1412] mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-xl border border-[#3e3ce7]/30 bg-white px-4 py-3 text-base text-[#0C1412] placeholder:text-[#0C1412]/40 transition-all focus:border-[#3e3ce7] focus:outline-none focus:ring-2 focus:ring-[#3e3ce7]/30"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#0C1412] mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-[#3e3ce7]/30 bg-white px-4 py-3 text-base text-[#0C1412] placeholder:text-[#0C1412]/40 transition-all focus:border-[#3e3ce7] focus:outline-none focus:ring-2 focus:ring-[#3e3ce7]/30"
              />
            </div>

            {/* Inquiry Type Field */}
            <div>
              <label htmlFor="inquiryType" className="block text-sm font-semibold text-[#0C1412] mb-2">
                Inquiry Type <span className="text-red-500">*</span>
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                required
                value={formData.inquiryType}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#3e3ce7]/30 bg-white px-4 py-3 text-base text-[#0C1412] transition-all focus:border-[#3e3ce7] focus:outline-none focus:ring-2 focus:ring-[#3e3ce7]/30 appearance-none cursor-pointer"
              >
                <option value="">Select an option</option>
                <option value="general">General Inquiry</option>
                <option value="partnership">Partnership Request</option>
                <option value="editorial">Editorial Question</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-[#0C1412] mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Brief subject line"
                className="w-full rounded-xl border border-[#3e3ce7]/30 bg-white px-4 py-3 text-base text-[#0C1412] placeholder:text-[#0C1412]/40 transition-all focus:border-[#3e3ce7] focus:outline-none focus:ring-2 focus:ring-[#3e3ce7]/30"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-[#0C1412] mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                className="w-full rounded-xl border border-[#3e3ce7]/30 bg-white px-4 py-3 text-base text-[#0C1412] placeholder:text-[#0C1412]/40 transition-all resize-none focus:border-[#3e3ce7] focus:outline-none focus:ring-2 focus:ring-[#3e3ce7]/30"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center rounded-xl bg-[#3e3ce7] px-6 py-4 text-base font-semibold text-white transition-all hover:bg-[#3e3ce7]/90 focus:outline-none focus:ring-2 focus:ring-[#3e3ce7] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

