/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['bcrypt']
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreBuildErrors: true,
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
