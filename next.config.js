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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // formats: ['image/webp'],
    domains: ['res.cloudinary.com'],
    minimumCacheTTL: 60,
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

// if (process.env.APP_ENV === 'export') {
//   module.exports.output = 'export';
// }
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
//   // compiler: {
//   //   removeConsole: true,
//   // },
//   images: {
//     loader: 'custom',
//     loaderFile: './src/utils/imageLoaderFull.jsx',
//     deviceSizes: [320, 420, 768, 1024],
//     domains: ['localhost', 'res.cloudinary.com'],
//     formats: ['image/avif', 'image/webp'],
//     minimumCacheTTL: 60,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//       },
//     ],

//   },

// };

// module.exports = nextConfig;
