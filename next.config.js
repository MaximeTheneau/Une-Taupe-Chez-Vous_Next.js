// eslint-disable-next-line no-unused-vars
const path = require('path');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer({})

/** @type {import('next').NextConfig} */

const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // compiler: {
  //   removeConsole: true,
  // },
  images: {
    loader: 'custom',
    loaderFile: './src/utils/imageLoaderFull.jsx',
    deviceSizes: [320, 420, 768, 1024],
    domains: ['localhost', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],

  },

};

module.exports = nextConfig;
