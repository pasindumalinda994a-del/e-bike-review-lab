import JsonLdSchema from '@/components/JsonLdSchema';
import { createPageMetadata } from '@/lib/metadata';
import { SITE_NAME } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'EBikeReviewLab Insider Brief',
  description:
    'Subscribe to the EBikeReviewLab Insider Brief for weekly electric bike testing notes, launch alerts, and field data.',
  path: '/newsletter',
});

const STATUS_MESSAGES = {
  success:
    'You are on the list! Check your inbox (and spam folder) for a confirmation email within a few minutes.',
  'invalid-email':
    'That email address does not look valid. Please double-check and try again.',
  'missing-email': 'Please provide an email address before submitting the form.',
};

export default function NewsletterPage({ searchParams }) {
  const status = searchParams?.success ? 'success' : searchParams?.error ?? null;
  const statusMessage = status ? STATUS_MESSAGES[status] ?? '' : '';

  const subscribeSchema = {
    '@context': 'https://schema.org',
    '@type': 'SubscribeAction',
    name: 'Join the EBikeReviewLab Insider Brief',
    description:
      'Weekly email briefing with electric bike performance data, price alerts, and field-tested buying advice.',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.ebikereviewlab.com/newsletter',
      actionPlatform: ['https://schema.org/DesktopWebPlatform'],
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 text-[#0C1412] md:px-0">
      <JsonLdSchema data={subscribeSchema} />
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#3e3ce7]">
          Insider Brief
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Stay in the Loop Between Reviews
        </h1>
        <p className="text-base leading-relaxed text-[#0C1412]/75 md:text-lg">
          One thoughtful email each week with the data that did not make it into
          our long-form guides—pricing intel, upgrade alerts, and real-world
          reliability notes from ongoing tests.
        </p>
      </header>

      <section className="mt-10 space-y-6 rounded-3xl border border-[#3e3ce7]/20 bg-white p-10 shadow-[0_20px_40px_rgba(12,20,18,0.35)]">
        <form action="/newsletter/subscribe" method="post" className="space-y-4">
          <label htmlFor="insider-email" className="sr-only">
            Email address
          </label>
          <input
            id="insider-email"
            name="email"
            type="email"
            required
            placeholder="you@outdoorhq.com"
            className="w-full rounded-2xl border border-[#3e3ce7]/30 px-5 py-4 text-base text-[#0C1412] placeholder:text-[#0C1412]/40 focus:border-[#3e3ce7] focus:outline-none focus:ring-2 focus:ring-[#3e3ce7]/30"
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-xl bg-[#3e3ce7] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#3e3ce7]/90"
          >
            Subscribe
          </button>
        </form>

        <div className="space-y-2 text-sm leading-relaxed text-[#0C1412]/75">
          <p>What to expect:</p>
          <ul className="list-inside list-disc space-y-1">
            <li>Early looks at the electric bikes we are currently testing.</li>
            <li>Weekly price drops, rebates, and stackable promo codes.</li>
            <li>No fluff. No daily blasts. Unsubscribe anytime with one click.</li>
          </ul>
        </div>

        {statusMessage ? (
          <p
            role="status"
            className={`rounded-2xl px-4 py-3 text-sm font-medium ${
              status === 'success'
                ? 'bg-emerald-50 text-emerald-800'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {statusMessage}
          </p>
        ) : null}
      </section>
    </main>
  );
}

