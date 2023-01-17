const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {}
  },
  // reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    // deviceSizes: [640, 750, 828, 1000,],
    // domains: ['back.unetaupechezvous.fr'],
    // remotePatterns: [{
    //   protocol: 'https',
    //   hostname: 'back.unetaupechezvous.fr',
    //   port: '',
    //   pathname: '/public/uploads/images/*',
    // }],
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
