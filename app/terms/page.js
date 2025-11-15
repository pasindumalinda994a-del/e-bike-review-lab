import JsonLdSchema from '@/components/JsonLdSchema';
import { buildPolicySchema, createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Terms & Conditions',
  description:
    'Review the terms that govern your use of EBikeReviewLab, our affiliate content, and any communications we send.',
  path: '/terms',
});

const sections = [
  {
    heading: "Acceptance of Terms",
    content:
      "By accessing EBikeReviewLab you agree to these Terms & Conditions and consent to our Privacy Policy. If you disagree with any part, please discontinue use of the site.",
  },
  {
    heading: "Affiliate Relationships",
    content:
      "Some links on EBikeReviewLab are affiliate links. When you purchase through them we may earn a commission at no additional cost to you. These commissions help fund product testing and editorial coverage.",
  },
  {
    heading: "Content Accuracy",
    content:
      "We strive for accuracy, but product availability, pricing, and specifications can change without notice. Always confirm details with the retailer before purchasing.",
  },
  {
    heading: "Use of Resources",
    content:
      "You may share excerpts from our articles with attribution and a link back to EBikeReviewLab. Republishing complete guides or reviews without written consent is prohibited.",
  },
  {
    heading: "Limitation of Liability",
    content:
      "EBikeReviewLab is not liable for direct or indirect damages arising from the use of information on this site. E-bike selection and usage remain your responsibility.",
  },
  {
    heading: "Updates",
    content:
      "We may update these terms periodically. Continued use of the site after changes take effect constitutes acceptance of the revised terms.",
  },
];

export default function TermsPage() {
  const termsSchema = buildPolicySchema({
    path: '/terms',
    name: 'EBikeReviewLab Terms & Conditions',
    type: 'TermsOfService',
  });
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 text-[#0C1412] md:px-12 lg:px-0">
      <JsonLdSchema data={termsSchema} />
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="text-base leading-relaxed text-[#0C1412]/75 md:text-lg">
          Effective as of January 1, 2025
        </p>
        <p className="text-sm leading-relaxed text-[#0C1412]/75">
          These terms define how you may use EBikeReviewLab and the responsibilities
          of both parties. Please read them carefully.
        </p>
      </header>

      <section className="mt-10 space-y-6">
        {sections.map((section) => (
          <article
            key={section.heading}
            className="space-y-3 rounded-2xl border border-[#3e3ce7]/15 bg-white p-6 shadow-[0_20px_40px_rgba(12,20,18,0.35)]"
          >
            <h2 className="text-xl font-semibold tracking-tight text-[#0C1412]">
              {section.heading}
            </h2>
            <p className="text-sm leading-relaxed text-[#0C1412]/75">
              {section.content}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-12 space-y-3 rounded-2xl border border-[#3e3ce7]/20 bg-[#3e3ce7]/10 p-6">
        <h2 className="text-lg font-semibold tracking-tight text-[#0C1412]">
          Questions?
        </h2>
        <p className="text-sm leading-relaxed text-[#0C1412]/75">
          Reach out to{" "}
          <a
            href="mailto:legal@ebikereviewlab.com"
            className="font-semibold text-[#3e3ce7] transition hover:opacity-80"
          >
            legal@ebikereviewlab.com
          </a>{" "}
          if you need clarification about these terms.
        </p>
      </section>
    </main>
  );
}

