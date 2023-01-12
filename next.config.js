/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [{
      protocol: 'https',
      hostname: 'localhost/Une-Taupe-Chez-Vous_Symfony',
      port: '',
      pathname: '/public/uploads/images/*',
    }],
  },
}

module.exports = nextConfig
