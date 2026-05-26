import Script from 'next/script';
import Hero from '@/components/Hero';
import HomeCategories from '@/components/HomeCategories';
import HomeImageGallery from '@/components/HomeImageGallery';
import HomeNewsletter from '@/components/HomeNewsletter';
import HomeShowcase from '@/components/HomeShowcase';
import HomeStoryBanner from '@/components/HomeStoryBanner';
import JsonLdSchema from '@/components/JsonLdSchema';
import LatestPosts from '@/components/LatestPosts';
import { placements as placementConfig } from '@/content/placements';
import { getAllBlogPosts, getHomePlacements } from '@/lib/mock-data';
import { buildWebsiteSchema } from '@/lib/metadata';
import { buildHomeSeo } from '@/lib/seo-helpers';

export const dynamic = 'force-static';

const homeSeo = buildHomeSeo();
export const metadata = homeSeo.metadata;

// Get hero image for the carousel.
const getHeroImage = (post) => post?.heroImage ?? '/default-og.png';

const postGridKey = (post) =>
  `${post?.categorySlug}/${post?.slug}`.toLowerCase();

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
    date: post.publishedAt,
    author: post.author,
    category: post.category,
    sponsored: post.sponsored,
  }));
  const heroImages = heroPosts.map(getHeroImage);

  const defaultHighlight = moneyPosts[0] ?? null;
  const defaultSidebar = moneyPosts.slice(1, 4);

  const homeShowcaseConfig = placementConfig.home?.showcase ?? {};

  const hasCustomHighlight = Object.prototype.hasOwnProperty.call(homeShowcaseConfig, 'highlight');
  const hasCustomSidebar = Object.prototype.hasOwnProperty.call(homeShowcaseConfig, 'sidebar');

  const showcaseHighlight = hasCustomHighlight
    ? homePlacements.showcase.highlight
    : defaultHighlight;

  const showcaseSidebar = hasCustomSidebar
    ? homePlacements.showcase.sidebar ?? []
    : defaultSidebar;

  const galleryPosts = homePlacements.gallery.length
    ? homePlacements.gallery
    : infoPosts.slice(0, 4);

  const curatedLatestPosts = homePlacements.latestPosts ?? [];
  const moneyTypePosts = posts.filter((post) => post.contentType === 'money');

  const latestPostsForGrid =
    curatedLatestPosts.length > 0
      ? (() => {
          const curatedKeys = new Set(curatedLatestPosts.map(postGridKey));
          const moneyLead = moneyTypePosts
            .filter((post) => !curatedKeys.has(postGridKey(post)))
            .slice(0, 2);
          return [...moneyLead, ...curatedLatestPosts];
        })()
      : moneyPosts;

  const latestPostsMax = 6;

  return (
    <main className="flex min-h-screen flex-col bg-[#F5F5F5]">
      <JsonLdSchema data={buildWebsiteSchema()} />
      {heroPrimary ? (
        <Hero
          title={homeSeo.heroHeading}
          description={homeSeo.heroSubheading}
          images={heroImages.length ? heroImages : [getHeroImage(heroPrimary)]}
          slideContent={heroSlideContent}
        />
      ) : null}
      <HomeShowcase
        highlight={showcaseHighlight}
        sidebar={showcaseSidebar}
      />
      <HomeCategories />
      <LatestPosts
        posts={latestPostsForGrid}
        heading="Latest posts"
        maxPosts={latestPostsMax}
      />
      <HomeNewsletter />
      <Script
        src="http://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=9bf780bdf12e6d1f7d42cfdc557706a3fcce6085"
        strategy="afterInteractive"
      />
    </main>
  );
}

