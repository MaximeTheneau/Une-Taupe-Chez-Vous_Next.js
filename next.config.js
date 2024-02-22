const path = require('path');

/** @type {import('next').NextConfig} */

module.exports = {
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

if (process.env.APP_ENV === 'export') {
  module.exports.output = 'export';
}
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
