import Image from 'next/image';
import JsonLdSchema from '@/components/JsonLdSchema';
import { buildOrganizationSchema, createPageMetadata } from '@/lib/metadata';
import { SITE_NAME } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'About EBikeReviewLab',
  description:
    'Learn how EBikeReviewLab tests e-bikes, evaluates affiliate products, and helps riders make confident buying decisions.',
  path: '/about',
});

export default function AboutPage() {
  const organizationSchema = buildOrganizationSchema({ logoPath: '/EbikeLogo.png' });
  
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 text-[#0C1412] md:px-12 lg:px-16 lg:py-20">
      <JsonLdSchema data={organizationSchema} />
      
      {/* Hero Welcome Section */}
      <section className="mb-16 lg:mb-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-block">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3e3ce7] bg-[#3e3ce7]/10 px-4 py-2 rounded-full">
                About Us
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[#0C1412] md:text-5xl lg:text-6xl">
              Welcome to our website!
            </h1>
            <p className="text-lg leading-relaxed text-[#0C1412]/80 md:text-xl">
              {SITE_NAME} is a dedicated blog that helps you find the best electric bikes for your specific requirement. We've been in the e-bike industry for many years but have a specific focus on electric bikes.
            </p>
          </div>
          <div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#3e3ce7]/20 to-[#3e3ce7]/5 order-1 lg:order-2 lg:h-[400px]">
            <Image
              src="/images/categories/electric-bikes.jpg"
              alt="Electric bikes showcase"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1412]/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* Main Introduction Section */}
      <section className="mb-16 lg:mb-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="relative h-[350px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#3e3ce7]/20 to-[#3e3ce7]/5 lg:h-[450px] order-1">
            <Image
              src="/images/categories/electric-mountain-bikes.jpg"
              alt="E-bike testing and reviews"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1412]/40 to-transparent" />
          </div>
          <div className="space-y-6 order-2">
            <h2 className="text-3xl font-bold tracking-tight text-[#0C1412] md:text-4xl">
              Our Mission
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-[#0C1412]/80 md:text-lg">
              <p>
                The main goal of this website is to help educate you and guide you to making the best purchase decisions.
              </p>
              <p>
                We understand that choosing the right electric bike can be overwhelming with so many options available. That's why we're committed to providing comprehensive, unbiased reviews and detailed guides that break down everything you need to know.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Product Focus Section */}
      <section className="mb-16 lg:mb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0C1412] via-[#1a1a2e] to-[#16213e] p-10 md:p-16 lg:p-20 shadow-[0_25px_50px_rgba(12,20,18,0.4)]">
          {/* Gradient overlay pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
          
          {/* Content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight mb-6 md:text-4xl lg:text-5xl">
              Always Up-to-Date
            </h2>
            
            <div className="space-y-5 text-base leading-relaxed text-white/95 md:text-lg lg:text-xl">
              <p>
                Our team are always on the look out for new and upcoming electric bikes that enter the market, so rest assured our content will always be relevant and contain the latest product information in the industry.
              </p>
              <p>
                We test ride, compare specifications, analyze user feedback, and keep our finger on the pulse of the e-bike industry to bring you the most current and accurate information.
              </p>
            </div>

            {/* Decorative elements */}
            <div className="mt-10 flex items-center justify-center gap-2 text-white/60">
              <div className="h-px w-12 bg-white/40" />
              <div className="h-2 w-2 rounded-full bg-white/60" />
              <div className="h-px w-12 bg-white/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Closing Message Section */}
      <section className="rounded-3xl border-2 border-[#3e3ce7]/20 bg-gradient-to-br from-[#3e3ce7]/10 via-[#3e3ce7]/5 to-white p-10 md:p-16 text-center shadow-[0_25px_50px_rgba(12,20,18,0.15)]">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3e3ce7] text-white mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.312-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#0C1412] md:text-4xl">
            Thank You for Your Support!
          </h2>
          <p className="text-lg leading-relaxed text-[#0C1412]/80 md:text-xl">
            We hope that you enjoy and support our website! Your trust and engagement drive us to continue providing the best electric bike reviews and buying guides.
          </p>
        </div>
      </section>
    </main>
  );
}

