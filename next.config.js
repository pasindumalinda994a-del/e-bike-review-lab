/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [];
  },
  // Required for next-mdx-remote with Next.js 15 (avoids dual React JSX runtimes)
  transpilePackages: ["next-mdx-remote"],
  // Enable compression for better mobile performance
  compress: true,
  // Optimize images for mobile-first approach
  images: {
    formats: ['image/avif', 'image/webp'],
    // Mobile-first device sizes - prioritize smaller sizes
    deviceSizes: [375, 414, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Configure allowed image quality values
    qualities: [70, 75],
    minimumCacheTTL: 31536000, // 1 year cache for better performance
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Enable remote patterns if using external images
    remotePatterns: [],
  },
};

module.exports = nextConfig;
