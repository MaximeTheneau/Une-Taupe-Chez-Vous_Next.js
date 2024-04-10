const path = require('path');

/** @type {import('next').NextConfig} */

module.exports = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    loader: 'custom',
    loaderFile: './src/utils/imageLoaderFull.jsx',
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
        port: '',
      },
    ],
  },
};
