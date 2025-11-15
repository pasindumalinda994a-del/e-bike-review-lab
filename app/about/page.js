import JsonLdSchema from '@/components/JsonLdSchema';
import { buildOrganizationSchema, createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'About EBikeReviewLab',
  description:
    'Learn how EBikeReviewLab tests e-bikes, evaluates affiliate products, and helps riders make confident buying decisions.',
  path: '/about',
});

const milestones = [
  {
    year: "2019",
    title: "Early Field Notes",
    description:
      "Our founder started logging e-bike tests after commuting daily on electric bikes through varied terrain and weather conditions.",
  },
  {
    year: "2021",
    title: "Affiliate Launch",
    description:
      "We formalized EBikeReviewLab with a mission to provide transparent, data-backed electric bike reviews and buyer guides.",
  },
  {
    year: "2024",
    title: "Testing Collective",
    description:
      "A network of commuters, trail riders, cargo haulers, and e-bike enthusiasts joined the fold to expand testing coverage.",
  },
];

const values = [
  {
    name: "Honest Testing",
    description:
      "We log real-world miles on commutes, singletrack trails, and cargo runs before recommending an e-bike.",
  },
  {
    name: "Actionable Insights",
    description:
      "Our guides go beyond specs, surfacing what actually matters when you are choosing battery range, motor power, or safety features.",
  },
  {
    name: "Affiliate Responsibility",
    description:
      "We use affiliate revenue to fund more testing, never to sway results. Every recommendation is earned.",
  },
];

export default function AboutPage() {
  const organizationSchema = buildOrganizationSchema({ logoPath: '/EbikeLogo.png' });
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 text-[#0C1412] md:px-12 lg:px-0">
      <JsonLdSchema data={organizationSchema} />
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#3e3ce7]">
          Our Story
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Built for Serious E-Bike Riders, Guided by Honest Testing
        </h1>
        <p className="text-base leading-relaxed text-[#0C1412]/75 md:text-lg">
          EBikeReviewLab exists to help you choose electric bikes that perform when the
          hills get steep, the battery runs low, and you need reliability. We field
          test, benchmark, and document everything so you can make confident
          buying decisions backed by data—not hype.
        </p>
      </header>

      <section className="mt-12 grid gap-8 rounded-3xl border border-[#3e3ce7]/15 bg-white p-10 shadow-[0_25px_50px_rgba(12,20,18,0.35)] md:grid-cols-3">
        {values.map((value) => (
          <article key={value.name} className="space-y-3">
            <h2 className="text-lg font-semibold text-[#3e3ce7]">
              {value.name}
            </h2>
            <p className="text-sm leading-relaxed text-[#0C1412]/75">
              {value.description}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-[#0C1412]">
          Key Milestones
        </h2>
        <div className="space-y-4">
          {milestones.map((item) => (
            <div
              key={item.year}
              className="flex flex-col gap-4 rounded-2xl border border-[#3e3ce7]/15 bg-[#3e3ce7]/10 p-6 md:flex-row md:items-start md:gap-8"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3e3ce7]">
                {item.year}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#0C1412]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#0C1412]/75">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-[#3e3ce7]/20 bg-[#3e3ce7]/10 p-10 shadow-[0_20px_40px_rgba(12,20,18,0.35)]">
        <h2 className="text-2xl font-semibold tracking-tight text-[#0C1412]">
          What&apos;s Next
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[#0C1412]/75 md:text-base">
          We are expanding our testing program, adding more regional e-bike reviewers,
          and building interactive comparison tools so you can filter products by
          the metrics that matter most for your riding style.
        </p>
      </section>
    </main>
  );
}

