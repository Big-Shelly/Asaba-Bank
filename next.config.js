/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
module.exports = {
  experimental: {
    esmExternals: false,
  },
  // Optionally disable image caching and other cache controls here if applicable
};

