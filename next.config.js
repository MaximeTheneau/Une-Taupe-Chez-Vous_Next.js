const path = require('path');

/** @type {import('next').NextConfig} */

module.exports = {
  output: 'export',
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  //   loader: 'custom',
  //   loaderFile: './src/utils/imageLoaderFull.jsx',
  //   formats: ['image/webp'],
  //   deviceSizes: [320, 420, 768, 1024, 1200, 1920],
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'res.cloudinary.com',
  //       pathname: '/**',
  //       port: '',
  //     },
  //   ],
  },
};
