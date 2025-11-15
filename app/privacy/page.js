import JsonLdSchema from '@/components/JsonLdSchema';
import { buildPolicySchema, createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Privacy Policy',
  description:
    'Understand how EBikeReviewLab collects, uses, and safeguards your information when you read our guides or subscribe to updates.',
  path: '/privacy',
});

const sections = [
  {
    heading: "Information We Collect",
    body: [
      "Email addresses you provide when subscribing to the Insider Brief or contacting us.",
      "Anonymous analytics data such as page views, device type, and referring URLs gathered via Google Analytics.",
      "Affiliate link clicks tracked through partner platforms so we can understand product performance.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "Send newsletters and updates you opt in to receive.",
      "Analyze site performance to improve our testing coverage and reader experience.",
      "Measure the effectiveness of affiliate partnerships without sharing individual user identities.",
    ],
  },
  {
    heading: "Sharing & Disclosure",
    body: [
      "We do not sell your personal data.",
      "Aggregated analytics may be shared with partners, but it never includes personal identifiers.",
      "If required by law, we may disclose information to comply with legal processes.",
    ],
  },
  {
    heading: "Your Choices",
    body: [
      "Unsubscribe from emails at any time using the link included in each newsletter.",
      "Adjust cookie settings in your browser to limit analytics tracking.",
      "Contact us to request updates or deletion of personal information we store.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  const privacySchema = buildPolicySchema({
    path: '/privacy',
    name: 'EBikeReviewLab Privacy Policy',
    type: 'PrivacyPolicy',
  });
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 text-[#0C1412] md:px-12 lg:px-0">
      <JsonLdSchema data={privacySchema} />
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Privacy Policy
        </h1>
        <p className="text-base leading-relaxed text-[#0C1412]/75 md:text-lg">
          Effective as of January 1, 2025
        </p>
        <p className="text-sm leading-relaxed text-[#0C1412]/75">
          This policy explains how EBikeReviewLab collects and uses personal data.
          By browsing our site or subscribing to our newsletter, you agree to
          the practices outlined below.
        </p>
      </header>

      <section className="mt-10 space-y-8">
        {sections.map((section) => (
          <article
            key={section.heading}
            className="space-y-3 rounded-2xl border border-[#3e3ce7]/15 bg-white p-6 shadow-[0_20px_40px_rgba(12,20,18,0.35)]"
          >
            <h2 className="text-xl font-semibold tracking-tight text-[#0C1412]">
              {section.heading}
            </h2>
            <ul className="space-y-2 text-sm leading-relaxed text-[#0C1412]/75">
              {section.body.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-12 space-y-4 rounded-2xl border border-[#3e3ce7]/20 bg-[#3e3ce7]/10 p-6">
        <h2 className="text-lg font-semibold tracking-tight text-[#0C1412]">
          Contacting Us
        </h2>
        <p className="text-sm leading-relaxed text-[#0C1412]/75">
          For privacy questions or requests, email{" "}
          <a
            href="mailto:privacy@ebikereviewlab.com"
            className="font-semibold text-[#3e3ce7] transition hover:opacity-80"
          >
            privacy@ebikereviewlab.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}

