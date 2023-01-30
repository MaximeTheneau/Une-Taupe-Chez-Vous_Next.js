const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['back.unetaupechezvous.fr'],
    loader: 'custom',
    loaderFile: './src/utils/imageLoaderFull.jsx',
    deviceSizes: [640, 750, 828, 1080],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};


module.exports = nextConfig;