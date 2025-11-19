import Hero from '@/components/Hero';
import HomeCategories from '@/components/HomeCategories';
import HomeImageGallery from '@/components/HomeImageGallery';
import HomeNewsletter from '@/components/HomeNewsletter';
import HomeShowcase from '@/components/HomeShowcase';
import HomeStoryBanner from '@/components/HomeStoryBanner';
import JsonLdSchema from '@/components/JsonLdSchema';
import { placements as placementConfig } from '@/content/placements';
import { getAllBlogPosts, getHomePlacements } from '@/lib/mock-data';
import { buildWebsiteSchema } from '@/lib/metadata';
import { buildHomeSeo } from '@/lib/seo-helpers';

export const dynamic = 'force-static';

const homeSeo = buildHomeSeo();
export const metadata = homeSeo.metadata;

// Get hero image for the carousel.
const getHeroImage = (post) => post?.heroImage ?? '/default-og.png';

// Homepage aggregates spotlight hero, latest content, gallery, etc.
export default async function HomePage() {
  const posts = await getAllBlogPosts();
  const homePlacements = await getHomePlacements();

  const moneyPosts = posts.filter((post) => post.contentType !== 'information');
  const infoPosts = posts.filter((post) => post.contentType === 'information');

  const defaultHeroPosts = moneyPosts.slice(0, 6);
  const heroPosts = homePlacements.hero.length ? homePlacements.hero : defaultHeroPosts;
  const heroPrimary = heroPosts[0] ?? moneyPosts[0] ?? null;

  const heroSlideContent = heroPosts.map((post) => ({
    title: post.h1,
    description: post.introduction ?? post.metaDescription ?? '',
    href: `/${post.categorySlug}/${post.slug}`,
  }));
  const heroImages = heroPosts.map(getHeroImage);

  const defaultLatest = moneyPosts.slice(0, 4);
  const defaultSidebar = moneyPosts.slice(4, 8);

  const homeShowcaseConfig = placementConfig.home?.showcase ?? {};

  const hasCustomLatest = Object.prototype.hasOwnProperty.call(homeShowcaseConfig, 'latest');
  const hasCustomSidebar = Object.prototype.hasOwnProperty.call(homeShowcaseConfig, 'sidebar');

  const showcaseLatest = hasCustomLatest
    ? homePlacements.showcase.latest ?? []
    : defaultLatest;

  const showcaseSidebar = hasCustomSidebar
    ? homePlacements.showcase.sidebar ?? []
    : (defaultSidebar.length ? defaultSidebar : defaultLatest);

  const galleryPosts = homePlacements.gallery.length
    ? homePlacements.gallery
    : infoPosts.slice(0, 4);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <JsonLdSchema data={buildWebsiteSchema()} />
      {heroPrimary ? (
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
          <Hero
            title={homeSeo.heroHeading}
            description={homeSeo.heroSubheading}
            images={heroImages.length ? heroImages : [getHeroImage(heroPrimary)]}
            slideContent={heroSlideContent}
          />
        </div>
      ) : null}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-12 text-[#0C1412] sm:gap-20 sm:px-6 sm:py-16 md:gap-24 md:px-12 md:py-20 lg:px-16">
      <HomeShowcase
        latest={showcaseLatest}
        sidebarPopular={showcaseSidebar}
      />
      </div>
      <div className="my-8 sm:my-12 md:my-16">
        <HomeStoryBanner 
          video="/videos/ebike-vedio.mp4"
          heading="Experience the Future of Electric Biking"
        />
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-12 text-[#0C1412] sm:gap-20 sm:px-6 sm:py-16 md:gap-24 md:px-12 md:py-20 lg:px-16">
      <HomeCategories />
      <HomeImageGallery posts={galleryPosts} />
      <HomeNewsletter />
      </div>
    </main>
  );
}

