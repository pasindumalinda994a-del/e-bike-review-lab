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
    <main className="flex min-h-screen flex-col bg-[#F5F5F5]">
      <JsonLdSchema data={organizationSchema} />
      
      <section className="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-12 text-[#0C1412] sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-16">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          {/* Top Heading */}
          <header className="text-center">
            <h1 className="mx-auto max-w-3xl text-2xl font-bold tracking-tight text-[#000000] md:text-3xl lg:text-4xl">
              Connecting riders with expert electric bike reviews, insights, and buying guidance
            </h1>
          </header>

          {/* 14 Column Grid with 3 Image Containers */}
          <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-2 md:gap-3 items-stretch">
            {/* First Image Container - Span 5 */}
            <div className="col-span-14 md:col-span-5 relative h-full min-h-[250px] md:min-h-[400px] overflow-hidden rounded-lg bg-[#0C1412]/5">
              <Image
                src="/images/categories/electric-bikes.webp"
                alt="Community gathering and discussion"
                fill
                sizes="(min-width: 768px) 35.7vw, 100vw"
                className="object-cover"
                priority
                quality={75}
              />
            </div>

            {/* Second Image Container - Span 4 */}
            <div className="col-span-14 md:col-span-4 relative h-full min-h-[250px] md:min-h-[400px] overflow-hidden rounded-lg bg-[#0C1412]/5">
              <Image
                src="/images/categories/electric-mountain-bikes.webp"
                alt="Collaborative work session"
                fill
                sizes="(min-width: 768px) 28.6vw, 100vw"
                className="object-cover"
                loading="lazy"
                quality={75}
              />
            </div>

            {/* Third Image Container - Span 5 */}
            <div className="col-span-14 md:col-span-5 relative h-full min-h-[250px] md:min-h-[400px] overflow-hidden rounded-lg bg-[#0C1412]/5">
              <Image
                src="/images/categories/electric-bikes.webp"
                alt="Relaxed social interaction"
                fill
                sizes="(min-width: 768px) 35.7vw, 100vw"
                className="object-cover"
                loading="lazy"
                quality={75}
              />
            </div>
          </div>

          {/* Text Content Section */}
          <div className="mx-auto space-y-6 md:space-y-8">
            {/* S2: First Paragraph */}
            <p className="mx-auto text-lg font-semibold leading-tight text-black md:text-2xl text-left max-w-2xl">
              EBikeReviewLab is a dedicated electric bike review website created to help riders find the best e-bikes for commuting, city riding, fitness, and everyday use. We provide clear, reliable information that helps people make confident buying decisions in a fast-growing and competitive e-bike market.
            </p>

            {/* S3: Second Paragraph */}
            <p className="mx-auto text-sm leading-normal text-black sm:text-base text-left max-w-2xl">
              Founded by experienced e-bike enthusiasts, EBikeReviewLab began as a small passion project focused on testing and reviewing electric bikes honestly. Over the years, we've grown into a trusted source for in-depth e-bike reviews, comparisons, and buying guides. Our content is built on real test rides, specification analysis, user feedback, and continuous research into the latest electric bike models and technologies. We believe the best reviews put riders first, not brands.
            </p>

            {/* Vision and Mission Cards */}
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12 max-w-4xl">
              {/* Our Vision Card */}
              <div className="bg-white rounded-lg p-6 md:p-8">
                <h3 className="text-sm font-bold uppercase tracking-wide text-[#0C1412] mb-4">
                  OUR VISION
                </h3>
                <p className="mx-auto text-sm leading-normal text-black sm:text-base text-left max-w-2xl">
                  To become a leading global electric bike review platform that empowers riders with accurate information, supports sustainable transportation, and promotes smarter urban mobility through trusted e-bike insights.
                </p>
              </div>

              {/* Our Mission Card */}
              <div className="bg-white rounded-lg p-6 md:p-8">
                <h3 className="text-sm font-bold uppercase tracking-wide text-[#0C1412] mb-4">
                  OUR MISSION
                </h3>
                <p className="mx-auto text-sm leading-normal text-black sm:text-base text-left max-w-2xl">
                  To deliver unbiased electric bike reviews, detailed comparisons, and up-to-date buying guides that help riders choose the right e-bike based on real performance, comfort, value, and long-term reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

