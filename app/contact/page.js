import JsonLdSchema from '@/components/JsonLdSchema';
import { buildContactPageSchema, createPageMetadata } from '@/lib/metadata';

const CONTACT_EMAIL = 'hello@ebikereviewlab.com';

export const metadata = createPageMetadata({
  title: 'Contact EBikeReviewLab',
  description:
    'Get in touch with the EBikeReviewLab team for partnership inquiries, editorial questions, or support.',
  path: '/contact',
});

export default function ContactPage() {
  const contactSchema = buildContactPageSchema({ email: CONTACT_EMAIL });
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 text-[#0C1412] md:px-12 lg:px-0">
      <JsonLdSchema data={contactSchema} />
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Contact EBikeReviewLab
        </h1>
        <p className="text-base leading-relaxed text-[#0C1412]/75 md:text-lg">
          We love hearing from dedicated e-bike riders, brand partners, and readers.
          Send us a note and the right teammate will get back within two
          business days.
        </p>
      </header>

      <section className="mt-10 grid gap-10 rounded-2xl border border-[#3e3ce7]/15 bg-white p-8 shadow-[0_25px_50px_rgba(12,20,18,0.35)] md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#3e3ce7]">
            General Inquiries
          </h2>
          <p className="text-sm leading-relaxed text-[#0C1412]/75">
            For e-bike feedback, editorial ideas, or support questions, email our
            team directly:
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-base font-semibold text-[#3e3ce7] transition hover:opacity-80"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-xs text-[#0C1412]/60">
            We monitor messages Monday–Friday, 9am–5pm Mountain Time.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#3e3ce7]">
            Partnership Requests
          </h2>
          <p className="text-sm leading-relaxed text-[#0C1412]/75">
            Want to collaborate on affiliate campaigns, product launches, or
            field tests? Reach out to our partnerships lead:
          </p>
          <a
            href="mailto:partnerships@ebikereviewlab.com"
            className="text-base font-semibold text-[#3e3ce7] transition hover:opacity-80"
          >
            partnerships@ebikereviewlab.com
          </a>
          <p className="text-xs text-[#0C1412]/60">
            Include product details, timelines, and any affiliate program links.
          </p>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[#0C1412]">
          Mailing Address
        </h2>
        <address className="not-italic text-sm leading-relaxed text-[#0C1412]/75">
          EBikeReviewLab Media<br />
          1450 Ridge Runner Way<br />
          Bozeman, MT 59715<br />
          United States
        </address>
      </section>
    </main>
  );
}

