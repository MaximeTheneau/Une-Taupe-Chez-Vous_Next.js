const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  exportTrailingSlash: true,
  future: {
    webpack5: true,
  },
  async rewrites() {
    return [
      {
        source: '/Temoignages',
        destination: '/testimonials',
      },
      {
        source: '/Tarifs',
        destination: '/pricing',
      },
      {
        source: '/sitemap.xml.html',
        destination: '/sitemap.xml',
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',

  images: {
    loader: 'custom',
    path: '/_next/image',
    loaderFile: './src/utils/imageLoaderFull.jsx',
    deviceSizes: [640, 750, 828, 1080],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/image/upload/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
